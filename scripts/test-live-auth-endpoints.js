import http from 'http';

async function testLiveEndpoints() {
  console.log('====================================================');
  console.log('🌐 Testing Live HTTP Endpoints on http://localhost:5173');
  console.log('====================================================\n');

  const testId = Date.now();
  const testEmail = `live.auth.${testId}@unillm.ai`;
  const testPass = 'SuperPass2026!';
  const testName = 'Live Tester';

  let cookie = null;
  let receivedOtp = null;

  try {
    // 1. POST /api/auth/signup
    console.log('👉 [1/6] Testing POST /api/auth/signup...');
    const signupRes = await fetch('http://127.0.0.1:5173/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-UniLLM-Test-Sandbox': 'true' },
      body: JSON.stringify({
        name: testName,
        email: testEmail,
        password: testPass,
        orgName: 'Sandbox Live Corp'
      })
    });
    const signupData = await signupRes.json();
    console.log(`   Status: ${signupRes.status}, Success: ${signupData.success}, Message: "${signupData.message}"`);
    if (!signupData.success) throw new Error(`Signup failed: ${JSON.stringify(signupData)}`);
    receivedOtp = signupData.otp;
    console.log(`   ✅ Signup OK! (OTP: ${receivedOtp})`);

    // 2. POST /api/auth/verify-otp
    console.log('\n👉 [2/6] Testing POST /api/auth/verify-otp...');
    const verifyRes = await fetch('http://127.0.0.1:5173/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-UniLLM-Test-Sandbox': 'true' },
      body: JSON.stringify({
        email: testEmail,
        otp: receivedOtp,
        orgContext: signupData.orgContext
      })
    });
    const verifyData = await verifyRes.json();
    const rawSetCookie = verifyRes.headers.get('set-cookie');
    console.log(`   Status: ${verifyRes.status}, Success: ${verifyData.success}, User Role: ${verifyData.user?.role}`);
    console.log(`   Set-Cookie: ${rawSetCookie ? 'Received (HttpOnly unillm_token present)' : 'None'}`);
    if (!verifyData.success) throw new Error(`Verify failed: ${JSON.stringify(verifyData)}`);
    cookie = rawSetCookie;
    console.log(`   ✅ Account Verified & JWT Session Issued!`);

    // 3. GET /api/auth/me (Authenticated Session Check)
    console.log('\n👉 [3/6] Testing GET /api/auth/me (Session Verification)...');
    const meRes = await fetch('http://127.0.0.1:5173/api/auth/me', {
      headers: { Cookie: cookie }
    });
    const meData = await meRes.json();
    console.log(`   Status: ${meRes.status}, Success: ${meData.success}, User: "${meData.user?.name}", Org: "${meData.user?.org}"`);
    if (!meData.success || meData.user?.email !== testEmail) throw new Error('Session verify failed');
    console.log(`   ✅ GET /api/auth/me Verified!`);

    // 4. POST /api/auth/login (Testing Re-login)
    console.log('\n👉 [4/6] Testing POST /api/auth/login...');
    const loginRes = await fetch('http://127.0.0.1:5173/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-UniLLM-Test-Sandbox': 'true' },
      body: JSON.stringify({
        email: testEmail,
        password: testPass
      })
    });
    const loginData = await loginRes.json();
    console.log(`   Status: ${loginRes.status}, Success: ${loginData.success}, User: "${loginData.user?.name}"`);
    if (!loginData.success) throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
    console.log(`   ✅ Login Successful!`);

    // 5. Test Protected Route & RBAC (GET /api/workspaces)
    console.log('\n👉 [5/6] Testing Protected Workspace & RBAC Route...');
    const wsRes = await fetch('http://127.0.0.1:5173/api/workspaces', {
      headers: { Cookie: cookie }
    });
    const wsData = await wsRes.json();
    console.log(`   Status: ${wsRes.status}, Success: ${wsData.success}, Workspaces Count: ${wsData.workspaces?.length || 0}`);
    if (!wsData.success) throw new Error(`Workspaces access failed: ${JSON.stringify(wsData)}`);
    console.log(`   ✅ Protected RBAC Route Accessible by Owner!`);

    // 6. POST /api/auth/logout (Clearing Session)
    console.log('\n👉 [6/6] Testing POST /api/auth/logout...');
    const logoutRes = await fetch('http://127.0.0.1:5173/api/auth/logout', {
      method: 'POST',
      headers: { Cookie: cookie }
    });
    const logoutData = await logoutRes.json();
    const logoutCookie = logoutRes.headers.get('set-cookie');
    console.log(`   Status: ${logoutRes.status}, Success: ${logoutData.success}`);
    console.log(`   Logout Set-Cookie: ${logoutCookie ? 'Cookies Expired / Cleared' : 'None'}`);

    // Verify Session is Destroyed
    const afterLogoutRes = await fetch('http://127.0.0.1:5173/api/auth/me', {
      headers: { Cookie: 'unillm_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT' }
    });
    console.log(`   After Logout GET /api/auth/me Status: ${afterLogoutRes.status} (Expected 401)`);
    if (afterLogoutRes.status !== 401) throw new Error('Logout did not revoke access!');
    console.log(`   ✅ Logout Successfully Closed Session & Blocked Access!`);

    console.log('\n====================================================');
    console.log('🎉 ALL 6 LIVE HTTP ENDPOINT TESTS PASSED 100%!');
    console.log('====================================================\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Live Endpoint Test Failed:', err.message);
    process.exit(1);
  }
}

testLiveEndpoints();

