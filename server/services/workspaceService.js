import { query } from '../config/db.js';

export const workspaceService = {
  /**
   * Lists all workspaces for an organization with usage aggregates
   */
  listWorkspaces: async (organizationId) => {
    const res = await query(`
      SELECT 
        w.id,
        w.name,
        w.is_default,
        w.created_at,
        COUNT(DISTINCT k.id)::INTEGER as key_count,
        COUNT(r.id)::INTEGER as request_count,
        COALESCE(SUM(r.cost_usd), 0)::DECIMAL(10,6) as total_spend
      FROM workspaces w
      LEFT JOIN api_keys k ON w.id = k.workspace_id
      LEFT JOIN ai_requests r ON w.id = r.workspace_id
      WHERE w.organization_id = $1
      GROUP BY w.id, w.name, w.is_default, w.created_at
      ORDER BY w.is_default DESC, w.created_at ASC;
    `, [organizationId]);

    return res.rows.map(w => ({
      id: w.id,
      name: w.name,
      isDefault: w.is_default,
      keyCount: w.key_count,
      requestCount: w.request_count,
      totalSpend: parseFloat(w.total_spend) || 0,
      createdAt: w.created_at
    }));
  },

  /**
   * Creates a new workspace in an organization
   */
  createWorkspace: async ({ organizationId, userId, name }) => {
    if (!name || !name.trim()) {
      const err = new Error('Workspace name is required.');
      err.statusCode = 400;
      throw err;
    }

    const res = await query(`
      INSERT INTO workspaces (organization_id, name, is_default)
      VALUES ($1, $2, false)
      RETURNING id, name, is_default, created_at;
    `, [organizationId, name.trim()]);

    const ws = res.rows[0];

    // Audit log
    await query(`
      INSERT INTO audit_logs (organization_id, actor_id, action, details)
      VALUES ($1, $2, 'workspace.create', $3);
    `, [organizationId, userId, JSON.stringify({ workspaceId: ws.id, name: ws.name })]);

    return {
      id: ws.id,
      name: ws.name,
      isDefault: ws.is_default,
      keyCount: 0,
      requestCount: 0,
      totalSpend: 0,
      createdAt: ws.created_at
    };
  },

  /**
   * Deletes a workspace (prevent deleting default workspace)
   */
  deleteWorkspace: async ({ organizationId, userId, workspaceId }) => {
    const wsRes = await query(`
      SELECT is_default FROM workspaces
      WHERE id = $1 AND organization_id = $2
      LIMIT 1;
    `, [workspaceId, organizationId]);

    if (wsRes.rows.length === 0) {
      const err = new Error('Workspace not found.');
      err.statusCode = 404;
      throw err;
    }

    if (wsRes.rows[0].is_default) {
      const err = new Error('Cannot delete the organization default workspace.');
      err.statusCode = 400;
      throw err;
    }

    await query('DELETE FROM workspaces WHERE id = $1 AND organization_id = $2;', [workspaceId, organizationId]);

    // Audit log
    await query(`
      INSERT INTO audit_logs (organization_id, actor_id, action, details)
      VALUES ($1, $2, 'workspace.delete', $3);
    `, [organizationId, userId, JSON.stringify({ workspaceId })]);

    return { success: true };
  }
};
