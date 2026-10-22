import { budgetService } from '../services/budgetService.js';

export const organizationController = {
  getBudget: async (req, res) => {
    try {
      const budget = await budgetService.getBudget(req.user.organizationId);
      return res.json({ success: true, budget });
    } catch (err) {
      console.error('Get Organization Budget Error:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch organization budget.' });
    }
  },

  updateBudget: async (req, res) => {
    try {
      const { monthly_budget_usd, alert_threshold_percent, hard_limit_enabled } = req.body;

      const updated = await budgetService.updateBudget({
        organizationId: req.user.organizationId,
        actorId: req.user.id,
        monthlyBudgetUsd: monthly_budget_usd,
        alertThresholdPercent: alert_threshold_percent,
        hardLimitEnabled: hard_limit_enabled
      });

      return res.json({
        success: true,
        message: 'Organization budget updated successfully.',
        budget: updated
      });
    } catch (err) {
      console.error('Update Organization Budget Error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({
        success: false,
        message: err.message || 'Failed to update organization budget.'
      });
    }
  }
};
