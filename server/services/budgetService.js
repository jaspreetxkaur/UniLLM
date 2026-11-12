import { OrganizationBudget, AiRequest, AuditLog } from '../models/index.js';
import { realtimeService } from '../realtime/socket.js';

export const budgetService = {
  /**
   * Retrieves organization budget and current spend
   */
  getBudget: async (organizationId) => {
    // 1. Fetch budget config
    const budget = await OrganizationBudget.findOne({ organization_id: organizationId }).lean() || {
      monthly_budget_usd: 100.00,
      alert_threshold_percent: 80,
      hard_limit_enabled: true,
      current_period_start: new Date()
    };

    const monthlyBudgetUsd = parseFloat(budget.monthly_budget_usd || 100.00);
    const periodStart = budget.current_period_start || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // 2. Derive current spend dynamically from ai_requests
    const spendAgg = await AiRequest.aggregate([
      {
        $match: {
          organization_id: organizationId,
          created_at: { $gte: new Date(periodStart) }
        }
      },
      {
        $group: {
          _id: null,
          spend: { $sum: '$cost_usd' }
        }
      }
    ]);

    const currentSpendUsd = spendAgg.length > 0 ? parseFloat(spendAgg[0].spend.toFixed(6)) : 0.0;
    const remainingBudgetUsd = Math.max(0, monthlyBudgetUsd - currentSpendUsd);
    const usagePercent = monthlyBudgetUsd > 0 ? ((currentSpendUsd / monthlyBudgetUsd) * 100).toFixed(2) : '0.00';

    return {
      monthlyBudgetUsd,
      alertThresholdPercent: budget.alert_threshold_percent || 80,
      hardLimitEnabled: budget.hard_limit_enabled !== false,
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

    // Upsert budget record in MongoDB
    const updated = await OrganizationBudget.findOneAndUpdate(
      { organization_id: organizationId },
      {
        $set: {
          monthly_budget_usd: parsedBudget,
          alert_threshold_percent: parsedThreshold,
          hard_limit_enabled: isHardLimit
        },
        $setOnInsert: {
          current_period_start: new Date()
        }
      },
      { returnDocument: 'after', upsert: true }
    ).lean();

    realtimeService.emitBudgetUpdated(organizationId, updated);

    // Audit Log
    if (actorId) {
      try {
        await AuditLog.create({
          organization_id: organizationId,
          actor_id: actorId,
          action: 'budget.update',
          details: {
            monthlyBudgetUsd: parsedBudget,
            alertThresholdPercent: parsedThreshold,
            hardLimitEnabled: isHardLimit
          }
        });
      } catch (auditErr) {
        console.warn('Audit log write error (non-fatal):', auditErr.message);
      }
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
