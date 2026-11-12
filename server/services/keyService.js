import crypto from 'crypto';
import { ApiKey, Workspace, User, AuditLog } from '../models/index.js';
import { realtimeService } from '../realtime/socket.js';

export const keyService = {
  /**
   * Generates a new cryptographically secure API key, stores its SHA-256 hash in MongoDB,
   * and returns the raw key ONLY once to the caller.
   */
  createKey: async ({ organizationId, userId, name, workspaceId }) => {
    if (!name || typeof name !== 'string') {
      const err = new Error('API key name is required.');
      err.statusCode = 400;
      throw err;
    }

    // 1. Resolve Workspace ID if not provided (use default workspace) or verify tenant ownership
    let targetWorkspaceId = (workspaceId && typeof workspaceId === 'string') ? workspaceId.trim() : null;
    if (targetWorkspaceId) {
      const checkWs = await Workspace.findOne({
        _id: targetWorkspaceId,
        organization_id: organizationId
      }).lean();
      if (checkWs) {
        targetWorkspaceId = checkWs._id;
      } else {
        targetWorkspaceId = null;
      }
    }

    if (!targetWorkspaceId) {
      const ws = await Workspace.findOne({ organization_id: organizationId })
        .sort({ is_default: -1, created_at: 1 })
        .lean();
      if (!ws) {
        // Fallback: create default workspace if none exists
        const newWs = await Workspace.create({
          organization_id: organizationId,
          name: 'Default Workspace',
          is_default: true
        });
        targetWorkspaceId = newWs._id;
      } else {
        targetWorkspaceId = ws._id;
      }
    }

    // 2. Generate secure random key: unillm_live_<48 hex chars>
    const randomEntropy = crypto.randomBytes(24).toString('hex');
    const rawKey = `unillm_live_${randomEntropy}`;
    const keyPrefix = rawKey.substring(0, 16) + '...';
    
    // 3. Compute SHA-256 hash
    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

    // 4. Store in MongoDB api_keys collection
    const createdKey = await ApiKey.create({
      organization_id: organizationId,
      workspace_id: targetWorkspaceId,
      created_by_user_id: userId,
      name: name.trim(),
      key_prefix: keyPrefix,
      key_hash: keyHash,
      key_secret: rawKey,
      status: 'active'
    });

    // 5. Record Audit Log
    try {
      await AuditLog.create({
        organization_id: organizationId,
        actor_id: userId,
        action: 'API_KEY_CREATED',
        details: { keyId: createdKey._id, keyName: name, keyPrefix, workspaceId: targetWorkspaceId }
      });
    } catch (auditErr) {
      console.warn('Audit log write error (non-fatal):', auditErr.message);
    }

    // Return the raw key ONLY here
    return {
      id: createdKey._id,
      name: createdKey.name,
      keyPrefix: createdKey.key_prefix,
      workspaceId: createdKey.workspace_id,
      rawKey, // Returned once!
      status: createdKey.status,
      createdAt: createdKey.created_at
    };
  },

  /**
   * Lists all API keys for an organization. Never returns the SHA-256 hash or raw key.
   */
  listKeys: async (organizationId, workspaceId = null) => {
    const filter = { organization_id: organizationId };
    if (workspaceId && typeof workspaceId === 'string' && workspaceId.trim()) {
      filter.workspace_id = workspaceId.trim();
    }

    const keys = await ApiKey.find(filter).sort({ created_at: -1 }).lean();
    if (keys.length === 0) return [];

    // Collect distinct workspace and user IDs for resolution
    const wsIds = [...new Set(keys.map(k => k.workspace_id).filter(Boolean))];
    const userIds = [...new Set(keys.map(k => k.created_by_user_id).filter(Boolean))];

    const [workspaces, users] = await Promise.all([
      Workspace.find({ _id: { $in: wsIds } }).lean(),
      User.find({ _id: { $in: userIds } }).lean()
    ]);

    const wsMap = new Map(workspaces.map(w => [w._id, w.name]));
    const userMap = new Map(users.map(u => [u._id, u.name]));

    return keys.map(k => ({
      id: k._id,
      name: k.name,
      keyPrefix: k.key_prefix,
      keySecret: k.key_secret || null,
      status: k.status,
      lastUsedAt: k.last_used_at,
      createdAt: k.created_at,
      workspaceId: k.workspace_id,
      workspaceName: wsMap.get(k.workspace_id) || 'Workspace',
      createdByName: userMap.get(k.created_by_user_id) || 'Member'
    }));
  },

  /**
   * Revokes an API key belonging to the tenant. Ensures cross-organization isolation.
   */
  revokeKey: async (organizationId, keyId, actorId) => {
    if (!keyId || typeof keyId !== 'string') {
      return null;
    }

    const revoked = await ApiKey.findOneAndUpdate(
      { _id: keyId, organization_id: organizationId },
      { $set: { status: 'revoked' } },
      { returnDocument: 'after' }
    ).lean();

    if (!revoked) {
      return null;
    }

    // Record Audit Log
    try {
      await AuditLog.create({
        organization_id: organizationId,
        actor_id: actorId,
        action: 'API_KEY_REVOKED',
        details: { keyId: revoked._id, keyName: revoked.name, keyPrefix: revoked.key_prefix }
      });
    } catch (auditErr) {
      console.warn('Audit log write error (non-fatal):', auditErr.message);
    }

    realtimeService.emitKeyRevoked(organizationId, {
      keyId: revoked._id,
      keyName: revoked.name,
      keyPrefix: revoked.key_prefix
    });

    return {
      id: revoked._id,
      name: revoked.name,
      key_prefix: revoked.key_prefix
    };
  }
};
