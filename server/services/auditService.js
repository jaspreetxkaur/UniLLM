import { query } from '../config/db.js';

export const auditService = {
  /**
   * Records a security audit event
   */
  log: async ({ organizationId, actorId = null, action, details = {}, ipAddress = null }) => {
    try {
      const res = await query(`
        INSERT INTO audit_logs (organization_id, actor_id, action, details, ip_address)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, created_at;
      `, [
        organizationId,
        actorId,
        action,
        typeof details === 'string' ? details : JSON.stringify(details),
        ipAddress
      ]);
      return res.rows[0];
    } catch (err) {
      console.warn(`[Audit Log Error]: Failed to write audit event '${action}': ${err.message}`);
      return null;
    }
  },

  /**
   * Retrieves security audit logs for an organization
   */
  listLogs: async (organizationId, limit = 50) => {
    const res = await query(`
      SELECT 
        a.id,
        a.action,
        a.details,
        a.ip_address,
        a.created_at as timestamp,
        COALESCE(u.name, 'System Administrator') as user,
        COALESCE(u.email, 'admin@unillm.ai') as email
      FROM audit_logs a
      LEFT JOIN users u ON a.actor_id = u.id
      WHERE a.organization_id = $1
      ORDER BY a.created_at DESC
      LIMIT $2;
    `, [organizationId, limit]);

    return res.rows.map(r => ({
      id: r.id,
      action: r.action,
      details: r.details,
      ipAddress: r.ip_address || '127.0.0.1',
      timestamp: r.timestamp,
      user: r.user,
      email: r.email
    }));
  }
};
