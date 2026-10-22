import { analyticsService } from '../services/analyticsService.js';

export const analyticsController = {
  getOverview: async (req, res) => {
    try {
      const range = (req.query.range || '30d').toLowerCase();
      const overview = await analyticsService.getOverview(req.user.organizationId, range);
      return res.json({
        success: true,
        overview
      });
    } catch (err) {
      console.error('Analytics Overview Error:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch analytics overview.' });
    }
  },

  getRequests: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const requests = await analyticsService.getRequestLogs(req.user.organizationId, Math.min(limit, 100));
      return res.json({
        success: true,
        requests
      });
    } catch (err) {
      console.error('Request Logs Error:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch request logs.' });
    }
  },

  getCosts: async (req, res) => {
    try {
      const costs = await analyticsService.getCostAnalytics(req.user.organizationId);
      return res.json({
        success: true,
        costs
      });
    } catch (err) {
      console.error('Cost Analytics Error:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch cost analytics.' });
    }
  }
};
