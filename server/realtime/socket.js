import { Server as SocketIOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import { User, OrganizationMember, Workspace } from '../models/index.js';

let io = null;

/**
 * Safely parses cookie string from handshake headers
 */
const parseCookies = (cookieHeader) => {
  if (!cookieHeader || typeof cookieHeader !== 'string') return {};
  const cookies = {};
  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.trim().split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      try {
        cookies[key] = decodeURIComponent(val);
      } catch {
        cookies[key] = val;
      }
    }
  });
  return cookies;
};

/**
 * Initializes Socket.io with the underlying HTTP server.
 * Note: Sockets, rooms, and real-time events are instance-local (no Redis or distributed adapter).
 */
export const initRealtimeServer = (httpServer) => {
  const isProduction = process.env.NODE_ENV === 'production';
  let corsOrigin;

  if (isProduction) {
    if (process.env.APP_URL && typeof process.env.APP_URL === 'string' && process.env.APP_URL.trim()) {
      const allowedOrigin = process.env.APP_URL.trim().replace(/\/$/, '');
      corsOrigin = (origin, callback) => {
        if (!origin || origin === allowedOrigin) {
          return callback(null, true);
        }
        return callback(new Error('Cross-origin Socket.io connection rejected.'));
      };
    } else {
      console.warn('⚠️ [Socket CORS Warning]: APP_URL is not configured in production. Cross-origin Socket.io connections are blocked.');
      corsOrigin = (origin, callback) => {
        if (!origin) {
          return callback(null, true);
        }
        return callback(new Error('Cross-origin Socket.io connection rejected: APP_URL is not configured.'));
      };
    }
  } else {
    corsOrigin = true;
  }

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: corsOrigin,
      credentials: true
    },
    serveClient: false,
    pingTimeout: 20000,
    pingInterval: 25000
  });

  // 1. Handshake Authentication Middleware
  io.use(async (socket, next) => {
    try {
      let token = null;

      // Extract from auth object
      if (socket.handshake.auth && typeof socket.handshake.auth.token === 'string') {
        token = socket.handshake.auth.token.trim();
      }

      // Extract from Authorization header
      if (!token && socket.handshake.headers?.authorization?.startsWith('Bearer ')) {
        token = socket.handshake.headers.authorization.split(' ')[1]?.trim();
      }

      // Extract from session cookie
      if (!token && socket.handshake.headers?.cookie) {
        const cookies = parseCookies(socket.handshake.headers.cookie);
        token = cookies.unillm_token;
      }

      if (!token) {
        return next(new Error('Authentication required: No session token provided.'));
      }

      // Verify JWT token
      const secret = process.env.JWT_SECRET || 'unillm_super_secret_jwt_key_development_2026';
      let decoded;
      try {
        decoded = jwt.verify(token, secret);
      } catch (jwtErr) {
        return next(new Error('Authentication failed: Invalid or expired session token.'));
      }

      if (!decoded?.userId) {
        return next(new Error('Authentication failed: Invalid token payload.'));
      }

      // Verify user in MongoDB
      const user = await User.findById(decoded.userId).lean();
      if (!user) {
        return next(new Error('Authentication failed: User account not found.'));
      }

      // Verify organization membership
      const member = await OrganizationMember.findOne({ user_id: user._id }).lean();
      if (!member) {
        return next(new Error('Authentication failed: User does not belong to an active organization.'));
      }

      if (member.status === 'suspended') {
        return next(new Error('Authentication failed: Organization account suspended.'));
      }

      const orgIdStr = member.organization_id.toString();

      // Retrieve authorized workspaces for the tenant
      const workspaces = await Workspace.find({ organization_id: member.organization_id }).select('_id').lean();
      const workspaceIds = new Set(workspaces.map(w => w._id.toString()));

      // Attach authoritative server-verified session state to socket.data
      // NEVER trust client-supplied user, organization, workspace, or role IDs!
      socket.data = {
        userId: user._id.toString(),
        userName: user.name,
        userEmail: user.email,
        organizationId: orgIdStr,
        role: member.role || 'member',
        workspaceIds
      };

      return next();
    } catch (err) {
      console.warn('[Socket Auth Error]:', err.message);
      return next(new Error('Authentication error during socket handshake.'));
    }
  });

  // 2. Connection Lifecycle & Event Authorization
  io.on('connection', (socket) => {
    const { organizationId, workspaceIds, userId } = socket.data;

    // Join authoritative tenant organization room
    socket.join(`org:${organizationId}`);

    // Join authorized workspace rooms
    workspaceIds.forEach((wsId) => {
      socket.join(`workspace:${wsId}`);
    });

    // Rate-limit incoming client-to-server events to prevent flooding
    let clientEventCount = 0;
    let windowResetTime = Date.now() + 60000;

    const checkRateLimit = () => {
      const now = Date.now();
      if (now > windowResetTime) {
        clientEventCount = 0;
        windowResetTime = now + 60000;
      }
      clientEventCount++;
      return clientEventCount <= 60; // Max 60 client events per minute per socket
    };

    // Safe dynamic workspace subscription
    socket.on('workspace:subscribe', async (payload, callback) => {
      try {
        if (!checkRateLimit()) {
          if (typeof callback === 'function') callback({ error: 'Rate limit exceeded' });
          return;
        }

        const workspaceId = payload?.workspaceId;
        if (!workspaceId || typeof workspaceId !== 'string') {
          if (typeof callback === 'function') callback({ error: 'Valid workspaceId string required' });
          return;
        }

        const trimmedId = workspaceId.trim();

        // Check if already authorized or verify against MongoDB
        if (socket.data.workspaceIds.has(trimmedId)) {
          socket.join(`workspace:${trimmedId}`);
          if (typeof callback === 'function') callback({ success: true, workspaceId: trimmedId });
          return;
        }

        const ws = await Workspace.findOne({
          _id: trimmedId,
          organization_id: socket.data.organizationId
        }).lean();

        if (ws) {
          socket.data.workspaceIds.add(trimmedId);
          socket.join(`workspace:${trimmedId}`);
          if (typeof callback === 'function') callback({ success: true, workspaceId: trimmedId });
        } else {
          if (typeof callback === 'function') callback({ error: 'Unauthorized workspace access' });
        }
      } catch (err) {
        if (typeof callback === 'function') callback({ error: 'Subscription error' });
      }
    });

    // Graceful disconnect cleanup
    socket.on('disconnect', (reason) => {
      // Sockets cleanly leave all joined rooms automatically upon disconnect in Socket.io
      socket.removeAllListeners();
    });

    socket.on('error', (err) => {
      console.warn(`[Socket Error] User ${userId}:`, err?.message || err);
    });
  });

  return io;
};

/**
 * Returns the active Socket.io instance, or null if not yet initialized.
 */
export const getIO = () => io;

/**
 * Safe Emitters: Broadcast only after successful operations and only safe telemetry/metadata.
 * Never broadcasts prompt text, response completions, API keys, credentials, or secrets.
 */
export const realtimeService = {
  /**
   * Broadcast telemetry status for an AI Gateway request to organization & workspace rooms
   */
  emitGatewayRequest: (organizationId, workspaceId, eventData) => {
    if (!io || !organizationId) return;

    // Strict payload filtering: safe telemetry only
    const payload = {
      requestId: String(eventData.requestId || ''),
      workspaceId: workspaceId ? String(workspaceId) : null,
      model: String(eventData.model || ''),
      provider: String(eventData.provider || ''),
      status: String(eventData.status || 'success'),
      statusCode: Number(eventData.statusCode || 200),
      cacheStatus: String(eventData.cacheStatus || 'MISS'),
      isFallback: Boolean(eventData.isFallback),
      tokens: {
        prompt: Number(eventData.promptTokens || 0),
        completion: Number(eventData.completionTokens || 0),
        total: Number(eventData.totalTokens || 0)
      },
      costUsd: parseFloat(Number(eventData.costUsd || 0).toFixed(6)),
      latencyMs: Number(eventData.latencyMs || 0),
      timestamp: eventData.timestamp || new Date().toISOString()
    };

    io.to(`org:${organizationId}`).emit('gateway:request', payload);
  },

  /**
   * Broadcast budget update event to organization room
   */
  emitBudgetUpdated: (organizationId, budgetData) => {
    if (!io || !organizationId) return;

    const payload = {
      monthlyBudgetUsd: parseFloat(Number(budgetData.monthly_budget_usd || budgetData.monthlyBudgetUsd || 0).toFixed(2)),
      alertThresholdPercent: Number(budgetData.alert_threshold_percent || budgetData.alertThresholdPercent || 80),
      hardLimitEnabled: Boolean(budgetData.hard_limit_enabled ?? budgetData.hardLimitEnabled ?? true),
      timestamp: new Date().toISOString()
    };

    io.to(`org:${organizationId}`).emit('budget:updated', payload);
  },

  /**
   * Broadcast new workspace creation to organization room
   */
  emitWorkspaceCreated: (organizationId, workspace) => {
    if (!io || !organizationId || !workspace) return;

    const payload = {
      id: String(workspace._id || workspace.id),
      name: String(workspace.name || ''),
      isDefault: Boolean(workspace.is_default || workspace.isDefault),
      createdAt: workspace.created_at || new Date().toISOString()
    };

    io.to(`org:${organizationId}`).emit('workspace:created', payload);
  },

  /**
   * Broadcast workspace deletion to organization room
   */
  emitWorkspaceDeleted: (organizationId, workspaceId) => {
    if (!io || !organizationId || !workspaceId) return;

    const payload = {
      workspaceId: String(workspaceId),
      timestamp: new Date().toISOString()
    };

    io.to(`org:${organizationId}`).emit('workspace:deleted', payload);
  },

  /**
   * Broadcast routing policy change (created, updated, toggled, deleted) to organization room
   */
  emitPolicyChanged: (organizationId, { action, policyId, policyName, enabled, priority }) => {
    if (!io || !organizationId) return;

    const payload = {
      action: String(action),
      policyId: String(policyId || ''),
      policyName: policyName ? String(policyName) : null,
      enabled: typeof enabled === 'boolean' ? enabled : null,
      priority: typeof priority === 'number' ? priority : null,
      timestamp: new Date().toISOString()
    };

    io.to(`org:${organizationId}`).emit('policy:changed', payload);
  },

  /**
   * Broadcast API key revocation to organization room
   */
  emitKeyRevoked: (organizationId, { keyId, keyName, keyPrefix }) => {
    if (!io || !organizationId) return;

    const payload = {
      keyId: String(keyId || ''),
      keyName: String(keyName || ''),
      keyPrefix: String(keyPrefix || ''),
      status: 'revoked',
      timestamp: new Date().toISOString()
    };

    io.to(`org:${organizationId}`).emit('key:revoked', payload);
  }
};
