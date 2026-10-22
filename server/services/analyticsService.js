import { query } from '../config/db.js';

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

    // 2. Aggregate Summary Metrics
    const summaryRes = await query(`
      SELECT 
        COUNT(*)::INTEGER as total_requests,
        COALESCE(SUM(total_tokens), 0)::BIGINT as total_tokens,
        COALESCE(SUM(cost_usd), 0)::DECIMAL(10,6) as total_spend,
        COALESCE(ROUND(AVG(latency_ms)), 0)::INTEGER as avg_latency,
        COUNT(CASE WHEN status_code >= 200 AND status_code < 300 THEN 1 END)::INTEGER as success_count,
        COUNT(CASE WHEN status_code >= 400 THEN 1 END)::INTEGER as failed_count,
        COUNT(CASE WHEN cache_status = 'HIT' THEN 1 END)::INTEGER as cache_hits
      FROM ai_requests
      WHERE organization_id = $1 AND created_at >= $2;
    `, [organizationId, sinceDate]);

    const summary = summaryRes.rows[0];
    const totalRequests = summary.total_requests || 0;
    const cacheHits = summary.cache_hits || 0;
    const cacheHitRate = totalRequests > 0 ? ((cacheHits / totalRequests) * 100).toFixed(1) : '0.0';

    // 3. Aggregate Spend by Provider for Donut Chart
    const providerRes = await query(`
      SELECT 
        provider,
        COALESCE(SUM(cost_usd), 0)::DECIMAL(10,6) as total_cost,
        COUNT(*)::INTEGER as request_count
      FROM ai_requests
      WHERE organization_id = $1 AND created_at >= $2
      GROUP BY provider
      ORDER BY total_cost DESC;
    `, [organizationId, sinceDate]);

    const providerColors = {
      gemini: '#10B981',
      openai: '#4F46E5',
      anthropic: '#6366F1',
      groq: '#3B82F6',
      unillm: '#94A3B8'
    };

    const spendByProvider = providerRes.rows.map(r => ({
      name: r.provider ? (r.provider.charAt(0).toUpperCase() + r.provider.slice(1)) : 'Unknown',
      value: parseFloat(r.total_cost) || 0,
      requests: r.request_count,
      color: providerColors[r.provider] || '#64748B'
    }));

    // 4. Latency Time-Series (Last 7 samples for line/area chart)
    const latencySeriesRes = await query(`
      SELECT latency_ms as avg_lat
      FROM ai_requests
      WHERE organization_id = $1
      ORDER BY created_at DESC
      LIMIT 7;
    `, [organizationId]);

    const latencyHistory = latencySeriesRes.rows.length > 0 
      ? latencySeriesRes.rows.map(r => r.avg_lat).reverse()
      : [0, 0, 0, 0, 0, 0, 0];

    // 5. Recent 5 Request Logs for Overview Table
    const recentRes = await query(`
      SELECT 
        id,
        model,
        provider,
        status_code as status,
        cache_status as cache,
        latency_ms as latency,
        cost_usd as cost,
        created_at as timestamp
      FROM ai_requests
      WHERE organization_id = $1
      ORDER BY created_at DESC
      LIMIT 5;
    `, [organizationId]);

    return {
      totalRequests,
      totalTokens: summary.total_tokens || 0,
      totalSpend: parseFloat(summary.total_spend) || 0,
      averageLatency: summary.avg_latency || 0,
      successfulRequests: summary.success_count || 0,
      failedRequests: summary.failed_count || 0,
      cacheHitRate,
      latencyHistory,
      latencyLabels: ["T-6", "T-5", "T-4", "T-3", "T-2", "T-1", "Now"],
      spendByProvider: spendByProvider.length > 0 ? spendByProvider : [
        { name: "Gemini", value: 0, color: "#10B981" },
        { name: "OpenAI", value: 0, color: "#4F46E5" }
      ],
      recentRequests: recentRes.rows.map(r => ({
        ...r,
        cost: parseFloat(r.cost) || 0,
        status: r.status === 200 ? 'Success' : 'Failed'
      }))
    };
  },

  /**
   * Fetches full request trace logs for an organization
   */
  getRequestLogs: async (organizationId, limit = 50) => {
    const res = await query(`
      SELECT 
        r.id,
        r.model,
        r.provider,
        r.prompt_tokens as "tokensInput",
        r.completion_tokens as "tokensOutput",
        r.total_tokens as "totalTokens",
        r.cost_usd as cost,
        r.latency_ms as latency,
        r.status_code as "statusCode",
        r.status,
        r.cache_status as cache,
        r.is_fallback as "isFallback",
        r.error_message as "errorMessage",
        r.created_at as timestamp,
        COALESCE(u.name, 'API Key User') as user,
        COALESCE(k.name, 'Web Session') as "keyName",
        w.name as "workspaceName"
      FROM ai_requests r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN api_keys k ON r.api_key_id = k.id
      LEFT JOIN workspaces w ON r.workspace_id = w.id
      WHERE r.organization_id = $1
      ORDER BY r.created_at DESC
      LIMIT $2;
    `, [organizationId, limit]);

    return res.rows.map(r => ({
      ...r,
      cost: parseFloat(r.cost) || 0
    }));
  },

  /**
   * Fetches budget and cost breakdown for an organization
   */
  getCostAnalytics: async (organizationId) => {
    // 1. Fetch Budget configuration
    const budgetRes = await query(`
      SELECT monthly_budget_usd, alert_threshold_percent, hard_limit_enabled, current_period_start
      FROM organization_budgets
      WHERE organization_id = $1
      LIMIT 1;
    `, [organizationId]);

    const budget = budgetRes.rows[0] || {
      monthly_budget_usd: 100.00,
      alert_threshold_percent: 80,
      hard_limit_enabled: true
    };

    const monthlyBudget = parseFloat(budget.monthly_budget_usd || 100.00);

    // 2. Calculate Actual Current Spend
    const spendRes = await query(`
      SELECT 
        COALESCE(SUM(cost_usd), 0)::DECIMAL(10,6) as total_spend,
        COUNT(*)::INTEGER as request_count
      FROM ai_requests
      WHERE organization_id = $1;
    `, [organizationId]);

    const totalSpend = parseFloat(spendRes.rows[0].total_spend || 0);
    const remainingCredit = Math.max(0, monthlyBudget - totalSpend);

    // 3. Spend by Model
    const modelRes = await query(`
      SELECT 
        model,
        provider,
        COALESCE(SUM(cost_usd), 0)::DECIMAL(10,6) as cost,
        COUNT(*)::INTEGER as requests,
        COALESCE(SUM(total_tokens), 0)::BIGINT as tokens
      FROM ai_requests
      WHERE organization_id = $1
      GROUP BY model, provider
      ORDER BY cost DESC;
    `, [organizationId]);

    return {
      monthlyBudget,
      totalSpend,
      remainingCredit,
      requestCount: spendRes.rows[0].request_count || 0,
      modelBreakdown: modelRes.rows.map(r => ({
        ...r,
        cost: parseFloat(r.cost) || 0
      }))
    };
  }
};
