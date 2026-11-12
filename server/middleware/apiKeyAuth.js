import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { ApiKey, Organization, OrganizationMember, User, Workspace } from '../models/index.js';

export const authenticateGateway = async (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;
    let cookieToken = req.cookies?.unillm_token;

    // 1. Check for API Key Authentication (Bearer unillm_live_...)
    if (authHeader && authHeader.startsWith('Bearer unillm_live_')) {
      const rawKey = authHeader.split(' ')[1].trim();
      const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

      // Indexed lookup in api_keys
      const keyData = await ApiKey.findOne({ key_hash: keyHash }).lean();

      if (!keyData) {
        return res.status(401).json({ error: { message: 'Invalid API key provided.', type: 'invalid_request_error', code: 'invalid_api_key' } });
      }

      if (keyData.status === 'revoked') {
        return res.status(401).json({ error: { message: 'This API key has been revoked.', type: 'invalid_request_error', code: 'api_key_revoked' } });
      }

      // Check organization and creator status
      const [org, member] = await Promise.all([
        Organization.findById(keyData.organization_id).lean(),
        OrganizationMember.findOne({
          organization_id: keyData.organization_id,
          user_id: keyData.created_by_user_id
        }).lean()
      ]);

      if (member && member.status === 'suspended') {
        return res.status(403).json({ error: { message: 'The organization member who created this key is suspended.', type: 'permission_denied' } });
      }

      // Attach context to request preserving exact contract
      req.gatewayContext = {
        authType: 'api_key',
        apiKeyId: keyData._id,
        organizationId: keyData.organization_id,
        workspaceId: keyData.workspace_id,
        userId: keyData.created_by_user_id,
        orgName: org ? org.name : 'Personal Space',
        monthlyTokenLimit: member ? member.monthly_token_limit : null,
        monthlySpendLimitUsd: member ? member.monthly_spend_limit_usd : null
      };

      return next();
    }

    // 2. Check for Session JWT Authentication (for Web UI Playground)
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1].trim();
    } else if (cookieToken) {
      token = cookieToken;
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'unillm_super_secret_jwt_key_development_2026');
      
      const user = await User.findById(decoded.userId).lean();
      if (user) {
        const member = await OrganizationMember.findOne({ user_id: user._id }).lean();
        if (member) {
          const defaultWs = await Workspace.findOne({
            organization_id: member.organization_id,
            is_default: true
          }).lean();

          req.gatewayContext = {
            authType: 'session_jwt',
            apiKeyId: null,
            organizationId: member.organization_id,
            workspaceId: defaultWs ? defaultWs._id : null,
            userId: user._id,
            monthlyTokenLimit: member.monthly_token_limit,
            monthlySpendLimitUsd: member.monthly_spend_limit_usd
          };
          return next();
        }
      }
    }

    return res.status(401).json({
      error: {
        message: 'Authentication required. Please provide a valid Authorization: Bearer <unillm_live_key> header or session token.',
        type: 'authentication_error'
      }
    });
  } catch (err) {
    return res.status(401).json({ error: { message: 'Authentication verification failed: ' + err.message, type: 'invalid_token' } });
  }
};
