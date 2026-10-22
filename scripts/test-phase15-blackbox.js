import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'http://localhost:5173';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const results = [];

function recordTest(category, name, path, expected, actual, pass, details = '') {
  results.push({ category, name, path, expected, actual, pass: Boolean(pass), details });
  const statusStr = pass ? '✅ PASS' : '❌ FAIL';
  console.log(`[${statusStr}] [${category}] ${name} -> Expected: ${expected}, Got: ${actual} ${details ? '(' + details + ')' : ''}`);
}

async function apiRequest(endpoint, { method = 'GET', headers = {}, body = null } = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const reqHeaders = { ...headers };
  if (body && typeof body === 'object' && !(body instanceof URLSearchParams)) {
    reqHeaders['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }

  const res = await fetch(url, {
    method,
    headers: reqHeaders,
    body
  });

  let data = null;
  const contentType = res.headers.get('content-type') || '';
  const rawText = await res.text();
  if (contentType.includes('application/json')) {
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      data = rawText;
    }
  } else {
    data = rawText;
  }

  const setCookie = res.headers.get('set-cookie');
  let cookie = null;
  if (setCookie) {
    const match = setCookie.match(/unillm_token=([^;]+)/);
    if (match) cookie = `unillm_token=${match[1]}`;
  }

  return { status: res.status, headers: res.headers, data, cookie, rawText };
}

async function run() {
  console.log('====================================================');
  console.log('🚀 STARTING UNI LLM PHASE 15 BLACK-BOX API VERIFICATION');
  console.log('====================================================\n');

  // 1. START SERVER & HEALTH CHECK
  try {
    const rootRes = await apiRequest('/');
    recordTest('1. Server & Startup', 'Root Page Status', '/', '200', String(rootRes.status), rootRes.status === 200);
  } catch (e) {
    recordTest('1. Server & Startup', 'Root Page Status', '/', '200', e.message, false);
  }

  // 2. AUTHENTICATION BLACK-BOX TESTS
  const ts = Date.now();
  const emailA = `tenant_a_${ts}@test.unillm.internal`;
  const emailB = `tenant_b_${ts}@test.unillm.internal`;
  const password = 'SecurePassword123!';

  // A. Signup Tenant A
  const signupA = await apiRequest('/api/auth/signup', {
    method: 'POST',
    body: { name: 'Tenant A Owner', email: emailA, password, company: 'Company A' }
  });
  recordTest('2. Auth', 'Signup Tenant A', '/api/auth/signup', '200 or 201', String(signupA.status), signupA.status === 200 || signupA.status === 201);

  // Unverified Login attempt (returns 400 + requireOtp: true)
  const unverifiedLogin = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email: emailA, password }
  });
  recordTest('2. Auth', 'Unverified User Login Rejection', '/api/auth/login', '400 with requireOtp', `${unverifiedLogin.status}, requireOtp=${unverifiedLogin.data?.requireOtp}`, unverifiedLogin.status === 400 && unverifiedLogin.data?.requireOtp === true);

  // Invalid OTP attempt
  const invalidOtpRes = await apiRequest('/api/auth/verify-otp', {
    method: 'POST',
    body: { email: emailA, otp: '000000' }
  });
  recordTest('2. Auth', 'Invalid OTP Rejection', '/api/auth/verify-otp', '400', String(invalidOtpRes.status), invalidOtpRes.status === 400);

  // Fetch actual OTP from database for valid verification test
  const otpQuery = await pool.query('SELECT otp FROM users WHERE email = $1', [emailA]);
  const realOtpA = otpQuery.rows[0]?.otp;

  // C. Valid OTP verification
  const verifyResA = await apiRequest('/api/auth/verify-otp', {
    method: 'POST',
    body: { email: emailA, otp: realOtpA }
  });
  recordTest('2. Auth', 'Valid OTP Verification', '/api/auth/verify-otp', '200', String(verifyResA.status), verifyResA.status === 200);

  // B. Duplicate Signup on verified user
  const dupSignup = await apiRequest('/api/auth/signup', {
    method: 'POST',
    body: { name: 'Tenant A Dup', email: emailA, password }
  });
  recordTest('2. Auth', 'Duplicate Verified Signup Rejection', '/api/auth/signup', '400', String(dupSignup.status), dupSignup.status === 400);

  // F. Valid Login
  const loginResA = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email: emailA, password }
  });
  const cookieA = loginResA.cookie;
  recordTest('2. Auth', 'Valid Login with Cookie', '/api/auth/login', '200 with unillm_token cookie', `${loginResA.status}, cookie=${Boolean(cookieA)}`, loginResA.status === 200 && Boolean(cookieA));

  // G. Invalid Password
  const invalidPassRes = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email: emailA, password: 'WrongPassword999!' }
  });
  recordTest('2. Auth', 'Invalid Password Rejection', '/api/auth/login', '400 or 401', String(invalidPassRes.status), invalidPassRes.status === 400 || invalidPassRes.status === 401);

  // I. Authenticated session request
  const meResA = await apiRequest('/api/auth/me', {
    headers: { Cookie: cookieA }
  });
  const userA = meResA.data?.user;
  recordTest('2. Auth', 'Authenticated Session (/api/auth/me)', '/api/auth/me', '200 with user data', `${meResA.status}, id=${Boolean(userA?.id)}`, meResA.status === 200 && Boolean(userA?.id));

  // J. Invalid / Expired Session
  const invalidSessionRes = await apiRequest('/api/auth/me', {
    headers: { Cookie: 'unillm_token=invalid.jwt.token' }
  });
  recordTest('2. Auth', 'Invalid Session Token Rejection', '/api/auth/me', '401', String(invalidSessionRes.status), invalidSessionRes.status === 401);

  // 3. ORGANIZATION PROVISIONING VERIFICATION
  const orgAId = userA?.organizationId || userA?.organization_id;
  const workspacesResA = await apiRequest('/api/workspaces', { headers: { Cookie: cookieA } });
  const budgetResA = await apiRequest('/api/organization/budget', { headers: { Cookie: cookieA } });
  const defaultWsA = workspacesResA.data?.workspaces?.[0];
  const budgetA = budgetResA.data?.budget;

  recordTest('3. Provisioning', 'Personal Org Auto-Created', 'DB / session', 'org ID present', orgAId || 'missing', Boolean(orgAId));
  recordTest('3. Provisioning', 'Default Workspace Auto-Created', '/api/workspaces', 'at least 1 workspace', `${workspacesResA.data?.workspaces?.length || 0} workspaces`, workspacesResA.data?.workspaces?.length >= 1);
  recordTest('3. Provisioning', 'Default Budget Auto-Provisioned', '/api/organization/budget', 'budget present', `monthly_budget_usd=$${budgetA?.monthly_budget_usd}`, budgetA !== undefined);
  recordTest('3. Provisioning', 'Sensitive Password/OTP Not Leaked in /me', '/api/auth/me', 'password_hash and otp undefined', `password_hash=${userA?.password_hash}, otp=${userA?.otp}`, userA?.password_hash === undefined && userA?.otp === undefined);

  // Signup & Provision Tenant B for Cross-Tenant tests
  await apiRequest('/api/auth/signup', {
    method: 'POST',
    body: { name: 'Tenant B Owner', email: emailB, password, company: 'Company B' }
  });
  const otpQueryB = await pool.query('SELECT otp FROM users WHERE email = $1', [emailB]);
  await apiRequest('/api/auth/verify-otp', {
    method: 'POST',
    body: { email: emailB, otp: otpQueryB.rows[0]?.otp }
  });
  const loginResB = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email: emailB, password }
  });
  const cookieB = loginResB.cookie;
  const meResB = await apiRequest('/api/auth/me', { headers: { Cookie: cookieB } });
  const userB = meResB.data?.user;
  const orgBId = userB?.organizationId || userB?.organization_id;

  // 4. API KEY BLACK-BOX TESTS
  const createKeyResA = await apiRequest('/api/keys', {
    method: 'POST',
    headers: { Cookie: cookieA },
    body: { name: 'Test Key A', workspace_id: defaultWsA?.id }
  });
  const rawKeyA = createKeyResA.data?.key?.raw_key || createKeyResA.data?.key?.rawKey || createKeyResA.data?.raw_key || createKeyResA.data?.apiKey;
  const keyIdA = createKeyResA.data?.key?.id || createKeyResA.data?.id;

  recordTest('4. API Keys', 'API Key Generation', '/api/keys', '201 with unillm_live_ prefix', `${createKeyResA.status}, rawKey starts with unillm_live_=${rawKeyA?.startsWith('unillm_live_')}`, (createKeyResA.status === 200 || createKeyResA.status === 201) && rawKeyA?.startsWith('unillm_live_'));

  // List keys -> verify raw key is never returned again
  const listKeysRes = await apiRequest('/api/keys', { headers: { Cookie: cookieA } });
  const keysArray = Array.isArray(listKeysRes.data?.keys) ? listKeysRes.data.keys : (Array.isArray(listKeysRes.data) ? listKeysRes.data : []);
  const fetchedKeyA = keysArray.find(k => k.id === keyIdA);
  recordTest('4. API Keys', 'Raw Key Concealment in List', '/api/keys', 'raw_key undefined in list', `raw_key=${fetchedKeyA?.raw_key || fetchedKeyA?.rawKey}`, fetchedKeyA && !fetchedKeyA.raw_key && !fetchedKeyA.rawKey);

  // Database verification: SHA-256 hash stored, not raw key
  const dbKeyCheck = await pool.query('SELECT key_hash, key_prefix FROM api_keys WHERE id = $1', [keyIdA]);
  recordTest('4. API Keys', 'Database Stores SHA-256 Hash Only', 'PostgreSQL api_keys', 'key_hash 64-hex chars', `len=${dbKeyCheck.rows[0]?.key_hash?.length}`, dbKeyCheck.rows[0]?.key_hash?.length === 64);

  // 5. GATEWAY HAPPY PATH
  const gatewayRes = await apiRequest('/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${rawKeyA}` },
    body: {
      model: 'gemini-flash-latest',
      messages: [{ role: 'user', content: 'Say hello in 3 words' }],
      temperature: 0.2
    }
  });

  const gatewayData = gatewayRes.data;
  const hasOpenAIShape = gatewayData?.id && gatewayData?.object === 'chat.completion' && gatewayData?.choices?.length > 0 && gatewayData?.usage;
  recordTest('5. Gateway Happy Path', 'Gateway Live Chat Completion', '/api/v1/chat/completions', '200 with OpenAI format', `${gatewayRes.status}, choices=${gatewayData?.choices?.length}, text="${gatewayData?.choices?.[0]?.message?.content?.trim()}"`, gatewayRes.status === 200 && Boolean(hasOpenAIShape));
  recordTest('5. Gateway Happy Path', 'Gateway Token Usage Present', '/api/v1/chat/completions', 'usage.total_tokens > 0', `total_tokens=${gatewayData?.usage?.total_tokens}`, Boolean(gatewayData?.usage?.total_tokens > 0));

  // 6. GATEWAY VALIDATION TESTS
  const valMissingMessages = await apiRequest('/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${rawKeyA}` },
    body: { model: 'gemini-flash-latest' }
  });
  recordTest('6. Gateway Validation', 'Missing Messages', '/api/v1/chat/completions', '400', String(valMissingMessages.status), valMissingMessages.status === 400);

  const valEmptyMessages = await apiRequest('/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${rawKeyA}` },
    body: { model: 'gemini-flash-latest', messages: [] }
  });
  recordTest('6. Gateway Validation', 'Empty Messages Array', '/api/v1/chat/completions', '400', String(valEmptyMessages.status), valEmptyMessages.status === 400);

  const valInvalidRole = await apiRequest('/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${rawKeyA}` },
    body: { model: 'gemini-flash-latest', messages: [{ role: 'admin_god_mode', content: 'hello' }] }
  });
  recordTest('6. Gateway Validation', 'Invalid Message Role', '/api/v1/chat/completions', '400', String(valInvalidRole.status), valInvalidRole.status === 400);

  const valInvalidTemp = await apiRequest('/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${rawKeyA}` },
    body: { model: 'gemini-flash-latest', messages: [{ role: 'user', content: 'hello' }], temperature: 3.5 }
  });
  recordTest('6. Gateway Validation', 'Invalid Temperature (>2)', '/api/v1/chat/completions', '400', String(valInvalidTemp.status), valInvalidTemp.status === 400);

  const valInvalidTokens = await apiRequest('/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${rawKeyA}` },
    body: { model: 'gemini-flash-latest', messages: [{ role: 'user', content: 'hello' }], max_tokens: -10 }
  });
  recordTest('6. Gateway Validation', 'Invalid Max Tokens (<1)', '/api/v1/chat/completions', '400', String(valInvalidTokens.status), valInvalidTokens.status === 400);

  const valMissingKey = await apiRequest('/api/v1/chat/completions', {
    method: 'POST',
    body: { model: 'gemini-flash-latest', messages: [{ role: 'user', content: 'hello' }] }
  });
  recordTest('6. Gateway Validation', 'Missing API Key / Auth', '/api/v1/chat/completions', '401', String(valMissingKey.status), valMissingKey.status === 401);

  const valMalformedKey = await apiRequest('/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: 'Bearer invalid_key_structure' },
    body: { model: 'gemini-flash-latest', messages: [{ role: 'user', content: 'hello' }] }
  });
  recordTest('6. Gateway Validation', 'Invalid API Key', '/api/v1/chat/completions', '401', String(valMalformedKey.status), valMalformedKey.status === 401);

  // 7. CACHE BLACK-BOX TEST
  const cachePrompt = `Exact cache test prompt unique-${ts}`;
  const cacheReq1 = await apiRequest('/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${rawKeyA}` },
    body: { model: 'gemini-flash-latest', messages: [{ role: 'user', content: cachePrompt }], temperature: 0.0 }
  });
  const cacheReq2 = await apiRequest('/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${rawKeyA}` },
    body: { model: 'gemini-flash-latest', messages: [{ role: 'user', content: cachePrompt }], temperature: 0.0 }
  });

  const isHit2 = cacheReq2.data?.unillm_telemetry?.cacheStatus === 'HIT';
  recordTest('7. Cache', 'Cache Miss on First Request', '/api/v1/chat/completions', 'telemetry.cacheStatus != HIT', `${cacheReq1.status}, cacheStatus=${cacheReq1.data?.unillm_telemetry?.cacheStatus}`, cacheReq1.status === 200 && cacheReq1.data?.unillm_telemetry?.cacheStatus !== 'HIT');
  recordTest('7. Cache', 'Cache Hit on Second Identical Request', '/api/v1/chat/completions', 'telemetry.cacheStatus == HIT', `cacheStatus=${cacheReq2.data?.unillm_telemetry?.cacheStatus}`, isHit2);

  // 8. ROUTING POLICY BLACK-BOX TEST
  const keyword = `routekw_${ts}`;
  const policyRes = await apiRequest('/api/policies', {
    method: 'POST',
    headers: { Cookie: cookieA },
    body: {
      name: `Keyword Route to 3.6 Flash`,
      condition_type: 'keyword',
      condition_config: { keywords: [keyword] },
      action_type: 'route_model',
      action_config: { target_model: 'gemini-3.6-flash' },
      priority: 1,
      enabled: true
    }
  });
  const policyId = policyRes.data?.policy?.id || policyRes.data?.id;
  recordTest('8. Routing Engine', 'Create Keyword Routing Policy', '/api/policies', '201 or 200', `${policyRes.status}, policyId=${policyId}`, (policyRes.status === 200 || policyRes.status === 201) && Boolean(policyId));

  // Send gateway request with keyword matching policy
  const routeGatewayRes = await apiRequest('/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${rawKeyA}` },
    body: {
      model: 'gemini-flash-latest',
      messages: [{ role: 'user', content: `Please execute test for ${keyword}` }]
    }
  });
  const returnedModel = routeGatewayRes.data?.model;
  recordTest('8. Routing Engine', 'Gateway Dynamic Model Resolution', '/api/v1/chat/completions', 'gemini-3.6-flash (routed)', `returned model=${returnedModel}`, returnedModel === 'gemini-3.6-flash');

  // Disable policy & verify return to default
  if (policyId) {
    await apiRequest(`/api/policies/${policyId}`, {
      method: 'PUT',
      headers: { Cookie: cookieA },
      body: { enabled: false }
    });
    const disabledRouteRes = await apiRequest('/api/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${rawKeyA}` },
      body: {
        model: 'gemini-flash-latest',
        messages: [{ role: 'user', content: `Please execute second test for ${keyword}` }]
      }
    });
    recordTest('8. Routing Engine', 'Disabled Policy Ignores Match', '/api/v1/chat/completions', 'gemini-flash-latest (default)', `returned model=${disabledRouteRes.data?.model}`, disabledRouteRes.data?.model === 'gemini-flash-latest');
  }

  // 10. BUDGET BLACK-BOX TEST
  // Set tiny budget limit ($0.000001) to verify 429
  await apiRequest('/api/organization/budget', {
    method: 'PUT',
    headers: { Cookie: cookieA },
    body: { monthly_budget_usd: 0.000001, alert_threshold_percent: 80, hard_limit_enabled: true }
  });

  const budgetExceededRes = await apiRequest('/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${rawKeyA}` },
    body: {
      model: 'gemini-flash-latest',
      messages: [{ role: 'user', content: 'This should be blocked by budget' }]
    }
  });
  recordTest('10. Budget', 'Hard Limit Rejection', '/api/v1/chat/completions', '429 with budget message', `${budgetExceededRes.status}, error=${budgetExceededRes.data?.error?.message || budgetExceededRes.data?.error}`, budgetExceededRes.status === 429);

  // Restore budget for remaining tests
  await apiRequest('/api/organization/budget', {
    method: 'PUT',
    headers: { Cookie: cookieA },
    body: { monthly_budget_usd: 500, alert_threshold_percent: 80, hard_limit_enabled: true }
  });

  // 11. RBAC BLACK-BOX TEST
  // Add Member to Tenant A
  const memberEmail = `member_${ts}@test.unillm.internal`;
  await apiRequest('/api/auth/signup', {
    method: 'POST',
    body: { name: 'Tenant A Member', email: memberEmail, password }
  });
  const memberOtp = (await pool.query('SELECT otp FROM users WHERE email = $1', [memberEmail])).rows[0]?.otp;
  await apiRequest('/api/auth/verify-otp', {
    method: 'POST',
    body: { email: memberEmail, otp: memberOtp }
  });
  const memberLogin = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email: memberEmail, password }
  });
  const memberCookie = memberLogin.cookie;
  const memberUserRes = await apiRequest('/api/auth/me', { headers: { Cookie: memberCookie } });
  const memberUserId = memberUserRes.data?.user?.id || (await pool.query('SELECT id FROM users WHERE email = $1', [memberEmail])).rows[0]?.id;
  
  if (memberUserId) {
    // Have Owner add Member to Org A
    await pool.query('DELETE FROM organization_members WHERE user_id = $1', [memberUserId]);
    await pool.query(
      'INSERT INTO organization_members (organization_id, user_id, role) VALUES ($1, $2, $3)',
      [orgAId, memberUserId, 'member']
    );
  }
  // Log in again to refresh JWT with orgAId and member role
  const refreshedMemberLogin = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email: memberEmail, password }
  });
  const memberActiveCookie = refreshedMemberLogin.cookie;

  // Member attempts to create workspace -> should be 403
  const memberCreateWs = await apiRequest('/api/workspaces', {
    method: 'POST',
    headers: { Cookie: memberActiveCookie },
    body: { name: 'Illegal Member Workspace' }
  });
  recordTest('11. RBAC', 'Member Workspace Creation Rejection', '/api/workspaces', '403', String(memberCreateWs.status), memberCreateWs.status === 403);

  // Member attempts to update budget -> should be 403
  const memberUpdateBudget = await apiRequest('/api/organization/budget', {
    method: 'PUT',
    headers: { Cookie: memberActiveCookie },
    body: { monthly_budget_usd: 999999, alert_threshold_percent: 80, hard_limit_enabled: true }
  });
  recordTest('11. RBAC', 'Member Budget Mutation Rejection', '/api/organization/budget', '403', String(memberUpdateBudget.status), memberUpdateBudget.status === 403);

  // Member attempts to create routing policy -> should be 403
  const memberCreatePolicy = await apiRequest('/api/policies', {
    method: 'POST',
    headers: { Cookie: memberActiveCookie },
    body: { name: 'Illegal Policy', condition_type: 'always', condition_config: {}, action_type: 'route_model', action_config: { target_model: 'gemini-3.6-flash' } }
  });
  recordTest('11. RBAC', 'Member Policy Creation Rejection', '/api/policies', '403', String(memberCreatePolicy.status), memberCreatePolicy.status === 403);

  // 12. CROSS-TENANT BLACK-BOX TESTS
  // Tenant B attempts to read Tenant A's workspace
  const crossWsRes = await apiRequest(`/api/workspaces`, {
    headers: { Cookie: cookieB }
  });
  const tenantBWorkspaces = crossWsRes.data?.workspaces || [];
  const leakedWsA = tenantBWorkspaces.find(w => w.id === defaultWsA?.id);
  recordTest('12. Cross-Tenant', 'Tenant B Cannot List Tenant A Workspaces', '/api/workspaces', 'Tenant A workspace absent', `found=${Boolean(leakedWsA)}`, !leakedWsA);

  // Tenant B attempts to delete Tenant A workspace
  const crossDeleteWs = await apiRequest(`/api/workspaces/${defaultWsA?.id}`, {
    method: 'DELETE',
    headers: { Cookie: cookieB }
  });
  recordTest('12. Cross-Tenant', 'Tenant B Cannot Delete Tenant A Workspace', `/api/workspaces/:id`, '404 (not found in tenant)', String(crossDeleteWs.status), crossDeleteWs.status === 404);

  // Tenant B attempts to delete Tenant A policy
  if (policyId) {
    const crossDeletePolicy = await apiRequest(`/api/policies/${policyId}`, {
      method: 'DELETE',
      headers: { Cookie: cookieB }
    });
    recordTest('12. Cross-Tenant', 'Tenant B Cannot Delete Tenant A Policy', `/api/policies/:id`, '404 (not found in tenant)', String(crossDeletePolicy.status), crossDeletePolicy.status === 404);
  }

  // 13. ANALYTICS VERIFICATION
  const analyticsOverview = await apiRequest('/api/analytics/overview', { headers: { Cookie: cookieA } });
  const analyticsRequests = await apiRequest('/api/analytics/requests', { headers: { Cookie: cookieA } });
  const analyticsCosts = await apiRequest('/api/analytics/costs', { headers: { Cookie: cookieA } });

  const totalReqs = analyticsOverview.data?.overview?.totalRequests ?? analyticsOverview.data?.data?.totalRequests ?? analyticsOverview.data?.totalRequests ?? analyticsOverview.data?.overview?.summary?.total_requests ?? analyticsOverview.data?.summary?.total_requests;
  recordTest('13. Analytics', 'Overview Returns Real Dynamic Aggregate', '/api/analytics/overview', 'total requests > 0', `total_requests=${totalReqs}`, Number(totalReqs) > 0);
  recordTest('13. Analytics', 'Request Logs Returns Real Rows', '/api/analytics/requests', 'rows present', `count=${analyticsRequests.data?.requests?.length || analyticsRequests.data?.length || 0}`, (analyticsRequests.data?.requests?.length || analyticsRequests.data?.length || 0) > 0);
  recordTest('13. Analytics', 'Cost Breakdown Returns Data', '/api/analytics/costs', '200 OK', `status=${analyticsCosts.status}`, analyticsCosts.status === 200);

  // 14. AUDIT LOG VERIFICATION
  const auditLogs = await pool.query(
    'SELECT action, details FROM audit_logs WHERE organization_id = $1 ORDER BY created_at DESC LIMIT 5',
    [orgAId]
  );
  recordTest('14. Audit Logs', 'Audit Log Entries Created for Mutations', 'PostgreSQL audit_logs', 'audit actions recorded', `actions=${auditLogs.rows.map(r => r.action).join(', ')}`, auditLogs.rows.length > 0);

  // 15. CACHE CLEAR VERIFICATION
  const clearCacheRes = await apiRequest('/api/cache/clear', {
    method: 'POST',
    headers: { Cookie: cookieA }
  });
  recordTest('15. Cache Management', 'Tenant Scoped Cache Clear', '/api/cache/clear', '200 OK', `status=${clearCacheRes.status}`, clearCacheRes.status === 200);

  // 18. DATABASE POST-REQUEST VERIFICATION
  const aiReqCheck = await pool.query(
    "SELECT id, organization_id, model, latency_ms, cost_usd, total_tokens, status FROM ai_requests WHERE organization_id = $1 AND status = 'success' ORDER BY created_at DESC LIMIT 1",
    [orgAId]
  );
  const latestReq = aiReqCheck.rows[0];
  recordTest('18. Database Integrity', 'ai_requests Row Correctly Persisted', 'PostgreSQL ai_requests', 'valid row with tokens and cost', `model=${latestReq?.model}, latency=${latestReq?.latency_ms}ms, cost=$${latestReq?.cost_usd}, tokens=${latestReq?.total_tokens}`, Boolean(latestReq && latestReq.latency_ms > 0 && latestReq.total_tokens > 0));

  // Revoke Key Test
  const revokeKeyRes = await apiRequest(`/api/keys/${keyIdA}/revoke`, {
    method: 'POST',
    headers: { Cookie: cookieA }
  });
  recordTest('4. API Keys', 'API Key Revocation', `/api/keys/:id/revoke`, '200 OK', `status=${revokeKeyRes.status}`, revokeKeyRes.status === 200);

  const revokedUseRes = await apiRequest('/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${rawKeyA}` },
    body: { model: 'gemini-flash-latest', messages: [{ role: 'user', content: 'hello' }] }
  });
  recordTest('4. API Keys', 'Revoked Key Rejection on Gateway', '/api/v1/chat/completions', '401', String(revokedUseRes.status), revokedUseRes.status === 401);

  // SUMMARY REPORT
  console.log('\n====================================================');
  console.log('📊 BLACK-BOX API VERIFICATION SUMMARY');
  console.log('====================================================');
  const passedCount = results.filter(r => r.pass).length;
  const totalCount = results.length;
  console.log(`TOTAL TESTS: ${totalCount}`);
  console.log(`PASSED: ${passedCount}`);
  console.log(`FAILED: ${totalCount - passedCount}`);
  console.log(`SUCCESS RATE: ${Math.round((passedCount / totalCount) * 100)}%`);

  await pool.end();
  return { passedCount, totalCount, results };
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  pool.end();
  process.exit(1);
});
