import dotenv from 'dotenv';
dotenv.config();
import { connectMongo, disconnectMongo } from '../server/config/mongo.js';
import { User } from '../server/models/index.js';

const PORT = process.env.PORT || 5173;
const BASE_URL = `http://localhost:${PORT}`;

let totalPassed = 0;
let totalFailed = 0;

function logResult(section, testName, passed, detail = '') {
  if (passed) {
    totalPassed++;
    console.log(`[✅ PASS] [${section}] ${testName} ${detail ? '-> ' + detail : ''}`);
  } else {
    totalFailed++;
    console.log(`[❌ FAIL] [${section}] ${testName} ${detail ? '-> ' + detail : ''}`);
  }
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = { ...options.headers };
  let body = options.body;
  if (body && typeof body === 'object') {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body
  });

  let data = null;
  const rawText = await res.text();
  try {
    data = JSON.parse(rawText);
  } catch (_) {
    data = rawText;
  }

  return {
    status: res.status,
    headers: res.headers,
    cookie: res.headers.get('set-cookie'),
    data
  };
}

async function runTests() {
  console.log('====================================================');
  console.log('🚀 RUNNING PHASE 16B LIVE FRONTEND INTEGRATION TESTS');
  console.log('====================================================');

  await connectMongo();

  const ts = Date.now();
  const testEmail = `frontend_test_${ts}@unillm.internal`;
  const testPassword = 'Password123!Secure';

  // 1. AUTH FLOW: Signup -> Get OTP from DB -> Verify -> Login
  const signupRes = await request('/api/auth/signup', {
    method: 'POST',
    body: { name: 'Integration Tester', email: testEmail, password: testPassword }
  });
  logResult('1. Auth', 'Signup API Contract', signupRes.status === 200 || signupRes.status === 201, `Status: ${signupRes.status}`);

  const userDoc = await User.findOne({ email: testEmail }).lean();
  const otpCode = userDoc?.otp;

  const verifyRes = await request('/api/auth/verify-otp', {
    method: 'POST',
    body: { email: testEmail, otp: otpCode }
  });
  logResult('1. Auth', 'OTP Verification Contract', verifyRes.status === 200, `Verified: ${verifyRes.data?.message}`);

  const loginRes = await request('/api/auth/login', {
    method: 'POST',
    body: { email: testEmail, password: testPassword }
  });
  const cookieHeader = loginRes.cookie || '';
  const hasCookie = cookieHeader.includes('unillm_token');
  const authHeaders = {
    'Cookie': cookieHeader
  };
  logResult('1. Auth', 'Login Cookie Handshake (httpOnly)', loginRes.status === 200 && hasCookie && loginRes.data?.token === undefined, `Cookie: ${hasCookie ? 'Set' : 'Missing'}, Body Token Omitted: ${loginRes.data?.token === undefined}`);

  // 2. GET CURRENT USER SESSION (/api/auth/me)
  const meRes = await request('/api/auth/me', { headers: authHeaders });
  logResult('2. Session', 'GET /api/auth/me Contract', meRes.status === 200 && meRes.data?.user?.email === testEmail, `Email: ${meRes.data?.user?.email}, Role: ${meRes.data?.user?.role}`);

  // 3. API KEYS: List, Create, Revoke
  const listKeysRes = await request('/api/keys', { headers: authHeaders });
  logResult('3. API Keys', 'GET /api/keys List', listKeysRes.status === 200 && Array.isArray(listKeysRes.data?.keys), `Keys found: ${listKeysRes.data?.keys?.length}`);

  const createKeyRes = await request('/api/keys', {
    method: 'POST',
    headers: authHeaders,
    body: { name: 'Integration Test Key' }
  });
  const rawKey = createKeyRes.data?.key?.rawKey || createKeyRes.data?.raw_key || createKeyRes.data?.rawKey;
  const keyId = createKeyRes.data?.key?.id || createKeyRes.data?.id;
  logResult('3. API Keys', 'POST /api/keys Create with Live Prefix', createKeyRes.status === 201 && rawKey?.startsWith('unillm_live_'), `Key: ${rawKey?.substring(0, 16)}...`);

  // 4. WORKSPACES: List, Create, Delete
  const listWorkspacesRes = await request('/api/workspaces', { headers: authHeaders });
  logResult('4. Workspaces', 'GET /api/workspaces List', listWorkspacesRes.status === 200 && Array.isArray(listWorkspacesRes.data?.workspaces), `Count: ${listWorkspacesRes.data?.workspaces?.length}`);

  const createWorkspaceRes = await request('/api/workspaces', {
    method: 'POST',
    headers: authHeaders,
    body: { name: 'Integration Staging' }
  });
  const newWorkspaceId = createWorkspaceRes.data?.workspace?.id || createWorkspaceRes.data?.id;
  logResult('4. Workspaces', 'POST /api/workspaces Create', createWorkspaceRes.status === 201 && Boolean(newWorkspaceId), `ID: ${newWorkspaceId}`);

  // 5. TEAM MANAGEMENT: List, Invite, Update
  const listTeamRes = await request('/api/team', { headers: authHeaders });
  logResult('5. Team', 'GET /api/team List', listTeamRes.status === 200 && Array.isArray(listTeamRes.data?.members), `Members: ${listTeamRes.data?.members?.length}`);

  const inviteTeamRes = await request('/api/team/invite', {
    method: 'POST',
    headers: authHeaders,
    body: { email: `invited_${ts}@unillm.internal`, role: 'developer', name: 'Invited Member' }
  });
  logResult('5. Team', 'POST /api/team/invite Contract', inviteTeamRes.status === 200 || inviteTeamRes.status === 201, `Status: ${inviteTeamRes.status}`);

  // 6. BUDGET / SPEND MANAGEMENT
  const getBudgetRes = await request('/api/organization/budget', { headers: authHeaders });
  const currentBudget = getBudgetRes.data?.budget?.monthlyBudgetUsd ?? getBudgetRes.data?.budget?.monthly_budget_usd;
  logResult('6. Budget', 'GET /api/organization/budget', getBudgetRes.status === 200 && currentBudget !== undefined, `Budget: $${currentBudget}`);

  const updateBudgetRes = await request('/api/organization/budget', {
    method: 'PUT',
    headers: authHeaders,
    body: { monthly_budget_usd: 7500.00 }
  });
  const updatedBudget = updateBudgetRes.data?.budget?.monthlyBudgetUsd ?? updateBudgetRes.data?.budget?.monthly_budget_usd;
  logResult('6. Budget', 'PUT /api/organization/budget Update', updateBudgetRes.status === 200 && Number(updatedBudget) === 7500, `New Budget: $${updatedBudget}`);

  // 7. POLICIES: List, Create, Toggle, Delete
  const listPoliciesRes = await request('/api/policies', { headers: authHeaders });
  logResult('7. Policies', 'GET /api/policies List', listPoliciesRes.status === 200 && Array.isArray(listPoliciesRes.data?.policies), `Count: ${listPoliciesRes.data?.policies?.length}`);

  const createPolicyRes = await request('/api/policies', {
    method: 'POST',
    headers: authHeaders,
    body: {
      name: 'Dynamic Fallback Policy',
      priority: 5,
      condition_type: 'always',
      condition_config: {},
      action_type: 'route_model',
      action_config: { target_model: 'gemini-3.6-flash' },
      is_active: true
    }
  });
  const policyId = createPolicyRes.data?.policy?.id || createPolicyRes.data?.id;
  logResult('7. Policies', 'POST /api/policies Create Contract', createPolicyRes.status === 201 && Boolean(policyId), `Policy ID: ${policyId}`);

  // 8. CACHE MANAGEMENT
  const cacheMetricsRes = await request('/api/cache/metrics', { headers: authHeaders });
  const hitRate = cacheMetricsRes.data?.metrics?.hitRate ?? cacheMetricsRes.data?.hitRate;
  logResult('8. Cache', 'GET /api/cache/metrics', cacheMetricsRes.status === 200, `Hit Rate: ${hitRate}%`);

  const clearCacheRes = await request('/api/cache/clear', {
    method: 'POST',
    headers: authHeaders
  });
  logResult('8. Cache', 'POST /api/cache/clear Org Scoped', clearCacheRes.status === 200, `Status: ${clearCacheRes.status}`);

  // 9. GATEWAY PLAYGROUND REQUEST (/api/v1/chat/completions)
  const gatewayRes = await request('/api/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${rawKey}` },
    body: {
      model: 'gemini-3.6-flash',
      messages: [{ role: 'user', content: 'Say OK' }],
      temperature: 0.1
    }
  });
  const telemetry = gatewayRes.data?.unillm_telemetry;
  logResult('9. Gateway', 'POST /api/v1/chat/completions Real Execution', gatewayRes.status === 200 && Boolean(telemetry), `Model: ${gatewayRes.data?.model}, Latency: ${telemetry?.latencyMs}ms, Cost: $${telemetry?.costUsd}`);

  // 10. ANALYTICS
  const overviewRes = await request('/api/analytics/overview?range=30d', { headers: authHeaders });
  const totalRequests = overviewRes.data?.overview?.totalRequests ?? overviewRes.data?.data?.totalRequests ?? overviewRes.data?.totalRequests;
  logResult('10. Analytics', 'GET /api/analytics/overview Aggregates', overviewRes.status === 200 && Number(totalRequests) >= 1, `Total Requests: ${totalRequests}`);

  const requestsLogRes = await request('/api/analytics/requests', { headers: authHeaders });
  logResult('10. Analytics', 'GET /api/analytics/requests Log Feed', requestsLogRes.status === 200 && requestsLogRes.data?.requests?.length >= 1, `Requests Recorded: ${requestsLogRes.data?.requests?.length}`);

  const costsRes = await request('/api/analytics/costs', { headers: authHeaders });
  logResult('10. Analytics', 'GET /api/analytics/costs Breakdown', costsRes.status === 200, `Costs Status: ${costsRes.status}`);

  // 11. CLEANUP & REVOCATION
  const revokeRes = await request(`/api/keys/${keyId}/revoke`, {
    method: 'POST',
    headers: authHeaders
  });
  logResult('11. Cleanup', 'POST /api/keys/:id/revoke Key Revocation', revokeRes.status === 200, `Revoked: ${revokeRes.data?.message}`);

  const deleteWorkspaceRes = await request(`/api/workspaces/${newWorkspaceId}`, {
    method: 'DELETE',
    headers: authHeaders
  });
  logResult('11. Cleanup', 'DELETE /api/workspaces/:id Cleanup', deleteWorkspaceRes.status === 200, `Deleted Workspace: ${newWorkspaceId}`);

  const deletePolicyRes = await request(`/api/policies/${policyId}`, {
    method: 'DELETE',
    headers: authHeaders
  });
  logResult('11. Cleanup', 'DELETE /api/policies/:id Cleanup', deletePolicyRes.status === 200, `Deleted Policy: ${policyId}`);

  await disconnectMongo();

  console.log('====================================================');
  console.log(`📊 INTEGRATION SUMMARY: ${totalPassed} PASSED, ${totalFailed} FAILED (${Math.round(totalPassed / (totalPassed + totalFailed) * 100)}%)`);
  console.log('====================================================');
  process.exit(totalFailed === 0 ? 0 : 1);
}

runTests().catch(err => {
  console.error('Fatal Test Error:', err);
  process.exit(1);
});
