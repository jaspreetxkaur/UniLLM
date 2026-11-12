import { AuditLog, User } from '../models/index.js';

export const auditService = {
  /**
   * Records a security audit event
   */
  log: async ({ organizationId, actorId = null, action, details = {}, ipAddress = null }) => {
    try {
      const entry = await AuditLog.create({
        organization_id: organizationId,
        actor_id: actorId,
        action,
        details: typeof details === 'string' ? JSON.parse(details) : details,
        ip_address: ipAddress
      });
      return { id: entry._id, created_at: entry.created_at };
    } catch (err) {
      console.warn(`[Audit Log Error]: Failed to write audit event '${action}': ${err.message}`);
      return null;
    }
  },

  /**
   * Retrieves security audit logs for an organization
   */
  listLogs: async (organizationId, limit = 50) => {
    const safeLimit = Math.min(Math.max(1, parseInt(limit, 10) || 50), 200);
    const logs = await AuditLog.find({ organization_id: organizationId })
      .sort({ created_at: -1 })
      .limit(safeLimit)
      .lean();

    if (logs.length === 0) return [];

    const actorIds = [...new Set(logs.map(l => l.actor_id).filter(Boolean))];
    const users = await User.find({ _id: { $in: actorIds } }).lean();
    const userMap = new Map(users.map(u => [u._id, u]));

    return logs.map(a => {
      const u = userMap.get(a.actor_id);
      return {
        id: a._id,
        action: a.action,
        details: a.details,
        ipAddress: a.ip_address || '127.0.0.1',
        timestamp: a.created_at,
        user: u ? u.name : 'System Administrator',
        email: u ? u.email : 'admin@unillm.ai'
      };
    });
  }
};
