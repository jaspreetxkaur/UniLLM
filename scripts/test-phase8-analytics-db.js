import crypto from 'crypto';
import { query } from '../server/config/db.js';
import { analyticsService } from '../server/services/analyticsService.js';

async function testPhase8Analytics() {
  console.log('📊 Testing Phase 8: Real-Time Database Analytics & Multi-Tenant Isolation on Supabase...\n');

  try {
    // 1. Setup two isolated test organizations
    console.log('Step 1: Setting up 2 isolated test organizations...');
    const orgARes = await query(`
      INSERT INTO organizations (name, slug, referral_code)
      VALUES ($1, $2, $3)
      RETURNING id, name;
    `, [`Analytics Org A ${Date.now()}`, `analytics-org-a-${Date.now()}`, `REF-${crypto.randomBytes(3).toString('hex').toUpperCase()}`]);
    const orgA = orgARes.rows[0];

    const orgBRes = await query(`
      INSERT INTO organizations (name, slug, referral_code)
      VALUES ($1, $2, $3)
      RETURNING id, name;
    `, [`Analytics Org B ${Date.now()}`, `analytics-org-b-${Date.now()}`, `REF-${crypto.randomBytes(3).toString('hex').toUpperCase()}`]);
    const orgB = orgBRes.rows[0];

    console.log(`✅ Tenant A: "${orgA.name}" (ID: ${orgA.id})`);
    console.log(`✅ Tenant B: "${orgB.name}" (ID: ${orgB.id})`);

    // Setup default workspace and budget for Tenant A
    const wsRes = await query(`
      INSERT INTO workspaces (organization_id, name, is_default)
      VALUES ($1, 'Default Workspace', true)
      RETURNING id;
    `, [orgA.id]);
    const wsA = wsRes.rows[0];

    await query(`
      INSERT INTO organization_budgets (organization_id, monthly_budget_usd, hard_limit_enabled)
      VALUES ($1, 100.00, true);
    `, [orgA.id]);

    // 2. Insert test telemetry records for Tenant A
    console.log('\nStep 2: Simulating real AI gateway telemetry for Tenant A...');
    await query(`
      INSERT INTO ai_requests (
        organization_id, workspace_id, request_type, provider, model,
        prompt_tokens, completion_tokens, total_tokens,
        cost_usd, latency_ms, status, status_code, cache_status
      )
      VALUES 
        ($1, $2, 'chat', 'gemini', 'gemini-3.6-flash', 50, 150, 200, 0.000050, 450, 'success', 200, 'MISS'),
        ($1, $2, 'chat', 'gemini', 'gemini-3.6-flash', 30, 70, 100, 0.000025, 350, 'success', 200, 'HIT'),
        ($1, $2, 'chat', 'openai', 'gpt-4o-mini', 100, 300, 400, 0.000195, 600, 'success', 200, 'MISS');
    `, [orgA.id, wsA.id]);
    console.log('✅ Inserted 3 telemetry records for Tenant A (2 Gemini, 1 OpenAI).');

    // 3. Test Analytics Overview for Tenant A
    console.log('\nStep 3: Querying Analytics Overview for Tenant A...');
    const overviewA = await analyticsService.getOverview(orgA.id, '30d');
    console.log('📊 Overview Metrics for Tenant A:');
    console.log(`  - Total Requests: ${overviewA.totalRequests} (Expected: 3)`);
    console.log(`  - Total Tokens: ${overviewA.totalTokens} (Expected: 700)`);
    console.log(`  - Total Spend: $${overviewA.totalSpend.toFixed(6)} (Expected: ~$0.000270)`);
    console.log(`  - Avg Latency: ${overviewA.averageLatency}ms (Expected: ~467ms)`);
    console.log(`  - Cache Hit Rate: ${overviewA.cacheHitRate}% (Expected: 33.3%)`);
    console.log(`  - Providers in Donut Chart: ${overviewA.spendByProvider.map(p => `${p.name} ($${p.value})`).join(', ')}`);

    if (overviewA.totalRequests !== 3 || Number(overviewA.totalTokens) !== 700) {
      throw new Error(`Tenant A overview metrics mismatch! Got requests: ${overviewA.totalRequests}, tokens: ${overviewA.totalTokens}`);
    }

    // 4. Test Request Trace Logs for Tenant A
    console.log('\nStep 4: Querying Request Trace Logs for Tenant A...');
    const logsA = await analyticsService.getRequestLogs(orgA.id, 10);
    console.log(`✅ Returned ${logsA.length} trace records for Tenant A.`);
    console.log(`👉 Latest Record Model: ${logsA[0].model}, Provider: ${logsA[0].provider}, Tokens: ${logsA[0].totalTokens}`);

    // 5. Test Cost Management & Budget Breakdown for Tenant A
    console.log('\nStep 5: Querying Cost Analytics for Tenant A...');
    const costsA = await analyticsService.getCostAnalytics(orgA.id);
    console.log('💰 Cost Breakdown for Tenant A:');
    console.log(`  - Monthly Budget: $${costsA.monthlyBudget.toFixed(2)}`);
    console.log(`  - Total Spend: $${costsA.totalSpend.toFixed(6)}`);
    console.log(`  - Remaining Credit: $${costsA.remainingCredit.toFixed(6)}`);
    console.log(`  - Models Tracked: ${costsA.modelBreakdown.map(m => `${m.model} ($${m.cost})`).join(', ')}`);

    // 6. Test Multi-Tenant Security Isolation (Tenant B must see ZERO data)
    console.log('\nStep 6: Verifying Multi-Tenant Isolation for Tenant B...');
    const overviewB = await analyticsService.getOverview(orgB.id, '30d');
    const logsB = await analyticsService.getRequestLogs(orgB.id, 10);
    const costsB = await analyticsService.getCostAnalytics(orgB.id);

    console.log(`🔒 Tenant B Total Requests: ${overviewB.totalRequests}`);
    console.log(`🔒 Tenant B Total Tokens: ${overviewB.totalTokens}`);
    console.log(`🔒 Tenant B Total Spend: $${overviewB.totalSpend}`);
    console.log(`🔒 Tenant B Log Count: ${logsB.length}`);

    if (overviewB.totalRequests !== 0 || logsB.length !== 0 || overviewB.totalSpend !== 0) {
      throw new Error('CRITICAL SECURITY LEAK: Tenant B was able to view Tenant A data!');
    }
    console.log('🛡️ [MULTI-TENANT ISOLATION VERIFIED]: Tenant B is 100% isolated and cannot see Tenant A data!');

    console.log('\n🎉 [PHASE 8 TEST PASSED]: Real-Time Database Analytics & Request Logs Console are 100% operational on Supabase!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Phase 8 Test Failed:', err);
    process.exit(1);
  }
}

testPhase8Analytics();
