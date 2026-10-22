import { auditService } from '../services/auditService.js';

export const auditController = {
  list: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const logs = await auditService.listLogs(req.user.organizationId, Math.min(limit, 100));
      return res.json({ success: true, logs });
    } catch (err) {
      console.error('Audit Logs Error:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch audit logs.' });
    }
  }
};
