import { query } from '../config/db.js';

export const budgetService = {
  /**
   * Retrieves organization budget and current spend
   */
  getBudget: async (organizationId) => {
    // 1. Fetch budget config
    const budgetRes = await query(`
      SELECT 
        monthly_budget_usd,
        alert_threshold_percent,
        hard_limit_enabled,
        current_period_start
      FROM organization_budgets
      WHERE organization_id = $1
      LIMIT 1;
    `, [organizationId]);

    const budget = budgetRes.rows[0] || {
      monthly_budget_usd: 100.00,
      alert_threshold_percent: 80,
      hard_limit_enabled: true,
      current_period_start: new Date()
    };

    const monthlyBudgetUsd = parseFloat(budget.monthly_budget_usd || 100.00);
    const periodStart = budget.current_period_start || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // 2. Derive current spend dynamically from ai_requests
    const spendRes = await query(`
      SELECT COALESCE(SUM(cost_usd), 0)::DECIMAL(10,6) as current_spend
      FROM ai_requests
      WHERE organization_id = $1 AND created_at >= $2;
    `, [organizationId, periodStart]);

    const currentSpendUsd = parseFloat(spendRes.rows[0].current_spend || 0);
    const remainingBudgetUsd = Math.max(0, monthlyBudgetUsd - currentSpendUsd);
    const usagePercent = monthlyBudgetUsd > 0 ? ((currentSpendUsd / monthlyBudgetUsd) * 100).toFixed(2) : '0.00';

    return {
      monthlyBudgetUsd,
      alertThresholdPercent: budget.alert_threshold_percent || 80,
      hardLimitEnabled: budget.hard_limit_enabled ?? true,
      currentPeriodStart: periodStart,
      currentSpendUsd,
      remainingBudgetUsd,
      usagePercent: parseFloat(usagePercent)
    };
  },

  /**
   * Updates organization budget with validation and audit logging
   */
  updateBudget: async ({
    organizationId,
    actorId,
    monthlyBudgetUsd,
    alertThresholdPercent = 80,
    hardLimitEnabled = true
  }) => {
    // Validation
    const parsedBudget = parseFloat(monthlyBudgetUsd);
    if (isNaN(parsedBudget) || parsedBudget < 0) {
      const err = new Error('Monthly budget must be a positive number.');
      err.statusCode = 400;
      throw err;
    }

    const parsedThreshold = parseInt(alertThresholdPercent, 10);
    if (isNaN(parsedThreshold) || parsedThreshold < 1 || parsedThreshold > 100) {
      const err = new Error('Alert threshold must be an integer between 1 and 100.');
      err.statusCode = 400;
      throw err;
    }

    const isHardLimit = Boolean(hardLimitEnabled);

    // Upsert budget record
    const res = await query(`
      INSERT INTO organization_budgets (
        organization_id, monthly_budget_usd, alert_threshold_percent, hard_limit_enabled
      )
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (organization_id)
      DO UPDATE SET
        monthly_budget_usd = EXCLUDED.monthly_budget_usd,
        alert_threshold_percent = EXCLUDED.alert_threshold_percent,
        hard_limit_enabled = EXCLUDED.hard_limit_enabled
      RETURNING monthly_budget_usd, alert_threshold_percent, hard_limit_enabled, current_period_start;
    `, [organizationId, parsedBudget, parsedThreshold, isHardLimit]);

    const updated = res.rows[0];

    // Audit Log
    if (actorId) {
      await query(`
        INSERT INTO audit_logs (organization_id, actor_id, action, details)
        VALUES ($1, $2, 'budget.update', $3);
      `, [
        organizationId,
        actorId,
        JSON.stringify({
          monthlyBudgetUsd: parsedBudget,
          alertThresholdPercent: parsedThreshold,
          hardLimitEnabled: isHardLimit
        })
      ]);
    }

    return {
      monthlyBudgetUsd: parseFloat(updated.monthly_budget_usd),
      alertThresholdPercent: updated.alert_threshold_percent,
      hardLimitEnabled: updated.hard_limit_enabled,
      currentPeriodStart: updated.current_period_start
    };
  },

  /**
   * Fast budget check for gateway proxy execution
   */
  checkBudget: async (organizationId) => {
    const data = await budgetService.getBudget(organizationId);
    
    if (data.hardLimitEnabled && data.currentSpendUsd >= data.monthlyBudgetUsd) {
      return {
        allowed: false,
        reason: `Monthly budget limit ($${data.monthlyBudgetUsd.toFixed(2)}) exceeded. Current spend is $${data.currentSpendUsd.toFixed(4)}.`,
        data
      };
    }

    return {
      allowed: true,
      data
    };
  }
};
