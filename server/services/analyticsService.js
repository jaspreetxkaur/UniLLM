import { AiRequest, OrganizationBudget, User, ApiKey, Workspace } from '../models/index.js';

export const analyticsService = {
  /**
   * Aggregates telemetry overview metrics for an organization
   */
  getOverview: async (organizationId, range = '30d') => {
    // 1. Calculate time filter threshold
    let intervalHours = 24 * 30; // default 30 days
    if (range === '24h') intervalHours = 24;
    else if (range === '7d') intervalHours = 24 * 7;
    
    const sinceDate = new Date(Date.now() - intervalHours * 60 * 60 * 1000);

    // 2. Aggregate Summary Metrics via MongoDB Aggregation Pipeline
    const summaryAgg = await AiRequest.aggregate([
      { $match: { organization_id: organizationId, created_at: { $gte: sinceDate } } },
      {
        $group: {
          _id: null,
          total_requests: { $sum: 1 },
          total_tokens: { $sum: '$total_tokens' },
          total_spend: { $sum: '$cost_usd' },
          avg_latency: { $avg: '$latency_ms' },
          success_count: {
            $sum: {
              $cond: [{ $and: [{ $gte: ['$status_code', 200] }, { $lt: ['$status_code', 300] }] }, 1, 0]
            }
          },
          failed_count: {
            $sum: {
              $cond: [{ $gte: ['$status_code', 400] }, 1, 0]
            }
          },
          cache_hits: {
            $sum: {
              $cond: [{ $eq: ['$cache_status', 'HIT'] }, 1, 0]
            }
          }
        }
      }
    ]);

    const summary = summaryAgg[0] || {
      total_requests: 0,
      total_tokens: 0,
      total_spend: 0,
      avg_latency: 0,
      success_count: 0,
      failed_count: 0,
      cache_hits: 0
    };

    const totalRequests = summary.total_requests || 0;
    const cacheHits = summary.cache_hits || 0;
    const cacheHitRate = totalRequests > 0 ? ((cacheHits / totalRequests) * 100).toFixed(1) : '0.0';

    // 3. Aggregate Spend by Provider for Donut Chart
    const providerRes = await AiRequest.aggregate([
      { $match: { organization_id: organizationId, created_at: { $gte: sinceDate } } },
      {
        $group: {
          _id: '$provider',
          total_cost: { $sum: '$cost_usd' },
          request_count: { $sum: 1 }
        }
      },
      { $sort: { total_cost: -1 } }
    ]);

    const providerColors = {
      gemini: '#10B981',
      openai: '#4F46E5',
      anthropic: '#6366F1',
      groq: '#3B82F6',
      unillm: '#94A3B8'
    };

    const spendByProvider = providerRes.map(r => ({
      name: r._id ? (r._id.charAt(0).toUpperCase() + r._id.slice(1)) : 'Unknown',
      value: parseFloat((r.total_cost || 0).toFixed(6)),
      requests: r.request_count,
      color: providerColors[r._id] || '#64748B'
    }));

    // 4. Latency Time-Series (Last 7 samples for line/area chart)
    const latencySeriesDocs = await AiRequest.find({ organization_id: organizationId })
      .sort({ created_at: -1 })
      .limit(7)
      .select({ latency_ms: 1 })
      .lean();

    const latencyHistory = latencySeriesDocs.length > 0
      ? latencySeriesDocs.map(r => r.latency_ms || 0).reverse()
      : [0, 0, 0, 0, 0, 0, 0];

    // 5. Recent 5 Request Logs for Overview Table
    const recentDocs = await AiRequest.find({ organization_id: organizationId })
      .sort({ created_at: -1 })
      .limit(5)
      .lean();

    return {
      totalRequests,
      totalTokens: summary.total_tokens || 0,
      totalSpend: parseFloat((summary.total_spend || 0).toFixed(6)),
      averageLatency: Math.round(summary.avg_latency || 0),
      successfulRequests: summary.success_count || 0,
      failedRequests: summary.failed_count || 0,
      cacheHitRate,
      latencyHistory,
      latencyLabels: ["T-6", "T-5", "T-4", "T-3", "T-2", "T-1", "Now"],
      spendByProvider: spendByProvider.length > 0 ? spendByProvider : [
        { name: "Gemini", value: 0, color: "#10B981" },
        { name: "OpenAI", value: 0, color: "#4F46E5" }
      ],
      recentRequests: recentDocs.map(r => ({
        id: r._id,
        model: r.model,
        provider: r.provider,
        status: r.status_code === 200 ? 'Success' : 'Failed',
        cache: r.cache_status,
        latency: r.latency_ms,
        cost: parseFloat((r.cost_usd || 0).toFixed(6)),
        timestamp: r.created_at
      }))
    };
  },

  /**
   * Fetches full request trace logs for an organization
   */
  getRequestLogs: async (organizationId, limit = 50) => {
    const safeLimit = Math.min(Math.max(1, parseInt(limit, 10) || 50), 200);
    const requests = await AiRequest.find({ organization_id: organizationId })
      .sort({ created_at: -1 })
      .limit(safeLimit)
      .lean();

    if (requests.length === 0) return [];

    // Collect distinct reference IDs
    const userIds = [...new Set(requests.map(r => r.user_id).filter(Boolean))];
    const keyIds = [...new Set(requests.map(r => r.api_key_id).filter(Boolean))];
    const wsIds = [...new Set(requests.map(r => r.workspace_id).filter(Boolean))];

    const [users, keys, workspaces] = await Promise.all([
      User.find({ _id: { $in: userIds } }).lean(),
      ApiKey.find({ _id: { $in: keyIds } }).lean(),
      Workspace.find({ _id: { $in: wsIds } }).lean()
    ]);

    const userMap = new Map(users.map(u => [u._id, u.name]));
    const keyMap = new Map(keys.map(k => [k._id, k.name]));
    const wsMap = new Map(workspaces.map(w => [w._id, w.name]));

    return requests.map(r => ({
      id: r._id,
      model: r.model,
      provider: r.provider,
      tokensInput: r.prompt_tokens,
      tokensOutput: r.completion_tokens,
      totalTokens: r.total_tokens,
      cost: parseFloat((r.cost_usd || 0).toFixed(6)),
      latency: r.latency_ms,
      statusCode: r.status_code,
      status: r.status,
      cache: r.cache_status,
      isFallback: r.is_fallback,
      errorMessage: r.error_message,
      timestamp: r.created_at,
      user: (r.user_id && userMap.get(r.user_id)) || 'API Key User',
      keyName: (r.api_key_id && keyMap.get(r.api_key_id)) || 'Web Session',
      workspaceName: (r.workspace_id && wsMap.get(r.workspace_id)) || 'Workspace'
    }));
  },

  /**
   * Fetches budget and cost breakdown for an organization
   */
  getCostAnalytics: async (organizationId) => {
    // 1. Fetch Budget configuration
    const budget = await OrganizationBudget.findOne({ organization_id: organizationId }).lean() || {
      monthly_budget_usd: 100.00,
      alert_threshold_percent: 80,
      hard_limit_enabled: true
    };

    const monthlyBudget = parseFloat(budget.monthly_budget_usd || 100.00);

    // 2. Calculate Actual Current Spend
    const spendAgg = await AiRequest.aggregate([
      { $match: { organization_id: organizationId } },
      {
        $group: {
          _id: null,
          total_spend: { $sum: '$cost_usd' },
          request_count: { $sum: 1 }
        }
      }
    ]);

    const totalSpend = spendAgg.length > 0 ? parseFloat(spendAgg[0].total_spend.toFixed(6)) : 0.0;
    const remainingCredit = Math.max(0, monthlyBudget - totalSpend);
    const requestCount = spendAgg.length > 0 ? spendAgg[0].request_count : 0;

    // 3. Spend by Model
    const modelRes = await AiRequest.aggregate([
      { $match: { organization_id: organizationId } },
      {
        $group: {
          _id: { model: '$model', provider: '$provider' },
          cost: { $sum: '$cost_usd' },
          requests: { $sum: 1 },
          tokens: { $sum: '$total_tokens' }
        }
      },
      { $sort: { cost: -1 } }
    ]);

    return {
      monthlyBudget,
      totalSpend,
      remainingCredit,
      requestCount,
      modelBreakdown: modelRes.map(r => ({
        model: r._id.model,
        provider: r._id.provider,
        cost: parseFloat(r.cost.toFixed(6)),
        requests: r.requests,
        tokens: r.tokens
      }))
    };
  }
};
