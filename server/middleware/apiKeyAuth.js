import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';

export const authenticateGateway = async (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;
    let cookieToken = req.cookies?.unillm_token;

    // 1. Check for API Key Authentication (Bearer unillm_live_...)
    if (authHeader && authHeader.startsWith('Bearer unillm_live_')) {
      const rawKey = authHeader.split(' ')[1].trim();
      const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

      // Index lookup in api_keys
      const keyRes = await query(`
        SELECT 
          k.id as key_id, k.name as key_name, k.status as key_status,
          k.organization_id, k.workspace_id, k.created_by_user_id,
          o.name as org_name,
          om.status as member_status, om.monthly_token_limit, om.monthly_spend_limit_usd
        FROM api_keys k
        JOIN organizations o ON k.organization_id = o.id
        LEFT JOIN organization_members om ON (k.organization_id = om.organization_id AND k.created_by_user_id = om.user_id)
        WHERE k.key_hash = $1
        LIMIT 1;
      `, [keyHash]);

      if (keyRes.rows.length === 0) {
        return res.status(401).json({ error: { message: 'Invalid API key provided.', type: 'invalid_request_error', code: 'invalid_api_key' } });
      }

      const keyData = keyRes.rows[0];

      if (keyData.key_status === 'revoked') {
        return res.status(401).json({ error: { message: 'This API key has been revoked.', type: 'invalid_request_error', code: 'api_key_revoked' } });
      }

      if (keyData.member_status === 'suspended') {
        return res.status(403).json({ error: { message: 'The organization member who created this key is suspended.', type: 'permission_denied' } });
      }

      // Attach context to request
      req.gatewayContext = {
        authType: 'api_key',
        apiKeyId: keyData.key_id,
        organizationId: keyData.organization_id,
        workspaceId: keyData.workspace_id,
        userId: keyData.created_by_user_id,
        orgName: keyData.org_name,
        monthlyTokenLimit: keyData.monthly_token_limit,
        monthlySpendLimitUsd: keyData.monthly_spend_limit_usd
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
      
      const userRes = await query(`
        SELECT 
          u.id, u.name, om.organization_id, om.status as member_status,
          om.monthly_token_limit, om.monthly_spend_limit_usd,
          w.id as workspace_id
        FROM users u
        JOIN organization_members om ON u.id = om.user_id
        LEFT JOIN workspaces w ON (om.organization_id = w.organization_id AND w.is_default = true)
        WHERE u.id = $1
        LIMIT 1;
      `, [decoded.userId]);

      if (userRes.rows.length > 0) {
        const u = userRes.rows[0];
        req.gatewayContext = {
          authType: 'session_jwt',
          apiKeyId: null,
          organizationId: u.organization_id,
          workspaceId: u.workspace_id,
          userId: u.id,
          monthlyTokenLimit: u.monthly_token_limit,
          monthlySpendLimitUsd: u.monthly_spend_limit_usd
        };
        return next();
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
