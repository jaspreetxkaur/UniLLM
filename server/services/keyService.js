import crypto from 'crypto';
import { query } from '../config/db.js';

export const keyService = {
  /**
   * Generates a new cryptographically secure API key, stores its SHA-256 hash in PostgreSQL,
   * and returns the raw key ONLY once to the caller.
   */
  createKey: async ({ organizationId, userId, name, workspaceId }) => {
    // 1. Resolve Workspace ID if not provided (use default workspace) or verify tenant ownership
    let targetWorkspaceId = workspaceId;
    if (targetWorkspaceId) {
      const checkWs = await query(
        'SELECT id FROM workspaces WHERE id = $1 AND organization_id = $2 LIMIT 1;',
        [targetWorkspaceId, organizationId]
      );
      if (checkWs.rows.length > 0) {
        targetWorkspaceId = checkWs.rows[0].id;
      } else {
        targetWorkspaceId = null;
      }
    }

    if (!targetWorkspaceId) {
      const wsRes = await query(
        'SELECT id FROM workspaces WHERE organization_id = $1 ORDER BY is_default DESC, created_at ASC LIMIT 1;',
        [organizationId]
      );
      if (wsRes.rows.length === 0) {
        // Fallback: create default workspace if none exists
        const newWs = await query(
          'INSERT INTO workspaces (organization_id, name, is_default) VALUES ($1, $2, true) RETURNING id;',
          [organizationId, 'Default Workspace']
        );
        targetWorkspaceId = newWs.rows[0].id;
      } else {
        targetWorkspaceId = wsRes.rows[0].id;
      }
    }

    // 2. Generate secure random key: unillm_live_<48 hex chars>
    const randomEntropy = crypto.randomBytes(24).toString('hex');
    const rawKey = `unillm_live_${randomEntropy}`;
    const keyPrefix = rawKey.substring(0, 16) + '...';
    
    // 3. Compute SHA-256 hash
    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

    // 4. Store in PostgreSQL api_keys table
    const insertRes = await query(`
      INSERT INTO api_keys (
        organization_id, workspace_id, created_by_user_id,
        name, key_prefix, key_hash, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, 'active')
      RETURNING id, name, key_prefix, workspace_id, status, created_at;
    `, [organizationId, targetWorkspaceId, userId, name.trim(), keyPrefix, keyHash]);

    const createdKey = insertRes.rows[0];

    // 5. Record Audit Log
    try {
      await query(`
        INSERT INTO audit_logs (organization_id, actor_id, action, details)
        VALUES ($1, $2, 'API_KEY_CREATED', $3);
      `, [organizationId, userId, JSON.stringify({ keyId: createdKey.id, keyName: name, keyPrefix, workspaceId: targetWorkspaceId })]);
    } catch (auditErr) {
      console.warn('Audit log write error (non-fatal):', auditErr.message);
    }

    // Return the raw key ONLY here
    return {
      id: createdKey.id,
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
    let sql = `
      SELECT 
        k.id,
        k.name,
        k.key_prefix as "keyPrefix",
        k.status,
        k.last_used_at as "lastUsedAt",
        k.created_at as "createdAt",
        k.workspace_id as "workspaceId",
        w.name as "workspaceName",
        u.name as "createdByName"
      FROM api_keys k
      LEFT JOIN workspaces w ON k.workspace_id = w.id
      LEFT JOIN users u ON k.created_by_user_id = u.id
      WHERE k.organization_id = $1
    `;
    const params = [organizationId];

    if (workspaceId && typeof workspaceId === 'string' && workspaceId.trim()) {
      params.push(workspaceId.trim());
      sql += ` AND k.workspace_id = $${params.length}`;
    }

    sql += ` ORDER BY k.created_at DESC;`;

    const res = await query(sql, params);
    return res.rows;
  },

  /**
   * Revokes an API key belonging to the tenant. Ensures cross-organization isolation.
   */
  revokeKey: async (organizationId, keyId, actorId) => {
    const res = await query(`
      UPDATE api_keys
      SET status = 'revoked'
      WHERE id = $1 AND organization_id = $2
      RETURNING id, name, key_prefix;
    `, [keyId, organizationId]);

    if (res.rows.length === 0) {
      return null;
    }

    const revoked = res.rows[0];

    // Record Audit Log
    try {
      await query(`
        INSERT INTO audit_logs (organization_id, actor_id, action, details)
        VALUES ($1, $2, 'API_KEY_REVOKED', $3);
      `, [organizationId, actorId, JSON.stringify({ keyId: revoked.id, keyName: revoked.name, keyPrefix: revoked.key_prefix })]);
    } catch (auditErr) {
      console.warn('Audit log write error (non-fatal):', auditErr.message);
    }

    return revoked;
  }
};
