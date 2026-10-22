// Automated backend verification script for Workspace and API Key Management
import jwt from 'jsonwebtoken';
import { query } from './server/config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'unillm_super_secret_jwt_key_development_2026';
const BASE_URL = 'http://localhost:5173';

async function runTests() {
  console.log('--- STARTING WORKSPACE & API KEY INTEGRATION TEST ---');
  
  // 1. Get verified user
  console.log('\n[TEST 1] Fetching verified user for test session...');
  const userRes = await query("SELECT id, name, email FROM users WHERE verified = true LIMIT 1;");
  if (userRes.rows.length === 0) {
    console.error('No verified user found in database!');
    process.exit(1);
  }
  const testUser = userRes.rows[0];
  const token = jwt.sign({ userId: testUser.id }, JWT_SECRET, { expiresIn: '7d' });
  console.log(`✓ Token generated for: ${testUser.name} (${testUser.email})`);

  const authHeaders = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // 2. Fetch existing workspaces
  console.log('\n[TEST 2] Fetching existing workspaces...');
  const wsRes = await fetch(`${BASE_URL}/api/workspaces`, { headers: authHeaders });
  const wsData = await wsRes.json();
  const workspaces = wsData.workspaces || wsData;
  console.log(`✓ Retrieved ${workspaces.length} workspaces:`, workspaces.map(w => w.name));

  // 3. Create a brand new workspace
  const testWsName = `Sprint-Test-WS-${Date.now().toString().slice(-4)}`;
  console.log(`\n[TEST 3] Creating new workspace: "${testWsName}"...`);
  const createWsRes = await fetch(`${BASE_URL}/api/workspaces`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ name: testWsName })
  });
  const newWsData = await createWsRes.json();
  const newWs = newWsData.workspace || newWsData;
  console.log('✓ Workspace created successfully! ID:', newWs.id);

  // 4. VERIFY: Does creating a workspace silently create an API key?
  console.log('\n[TEST 4] Checking keys for newly created workspace...');
  const keysForNewWsRes = await fetch(`${BASE_URL}/api/keys?workspaceId=${newWs.id}`, { headers: authHeaders });
  const keysForNewWsData = await keysForNewWsRes.json();
  const keysForNewWs = keysForNewWsData.keys || keysForNewWsData;
  console.log(`Keys found for workspace ${newWs.id}:`, keysForNewWs.length);
  if (keysForNewWs.length === 0) {
    console.log('✓ PASSED: Creating a workspace does NOT silently create an API key!');
  } else {
    console.error('❌ FAILED: Found automatically created keys:', keysForNewWs);
    process.exit(1);
  }

  // 5. Explicitly create an API key scoped to the new workspace
  console.log('\n[TEST 5] Explicitly creating an API key scoped to the new workspace...');
  const createKeyRes = await fetch(`${BASE_URL}/api/keys`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      name: 'Production Worker Key',
      workspaceId: newWs.id
    })
  });
  const keyResult = await createKeyRes.json();
  console.log('Create Key Response Status:', createKeyRes.status);
  
  if (!keyResult.key || !keyResult.key.rawKey) {
    console.error('❌ FAILED: Raw API key not returned in creation response:', keyResult);
    process.exit(1);
  }

  const rawKey = keyResult.key.rawKey;
  const keyId = keyResult.key.id;
  console.log('✓ PASSED: Returned secret API credential (rawKey):', rawKey);
  console.log('✓ Key ID:', keyId, 'Prefix:', keyResult.key.keyPrefix || keyResult.key.key_prefix);

  // 6. Verify that listing keys returns masked metadata and NOT raw secret
  console.log('\n[TEST 6] Listing keys and verifying safe metadata masking...');
  const listRes = await fetch(`${BASE_URL}/api/keys?workspaceId=${newWs.id}`, { headers: authHeaders });
  const listJson = await listRes.json();
  const listedKeys = listJson.keys || listJson;
  const createdKeyInList = listedKeys.find(k => k.id === keyId);

  if (!createdKeyInList) {
    console.error('❌ FAILED: Key not found in workspace list!');
    process.exit(1);
  }

  if (createdKeyInList.rawKey || createdKeyInList.key || createdKeyInList.key_hash?.startsWith('unillm_live')) {
    console.error('❌ FAILED: Unmasked raw key leaked in list response!');
    process.exit(1);
  }
  console.log('✓ PASSED: Safe metadata returned:', {
    name: createdKeyInList.name,
    prefix: createdKeyInList.keyPrefix || createdKeyInList.key_prefix,
    status: createdKeyInList.status,
    workspace: createdKeyInList.workspaceName || createdKeyInList.workspace_id
  });

  // 7. Test Revoking the key
  console.log('\n[TEST 7] Revoking the API key...');
  const revokeRes = await fetch(`${BASE_URL}/api/keys/${keyId}`, {
    method: 'DELETE',
    headers: authHeaders
  });
  const revokeData = await revokeRes.json();
  console.log('✓ Revocation response:', revokeData);

  // Verify key status is revoked
  const afterRevokeJson = await (await fetch(`${BASE_URL}/api/keys?workspaceId=${newWs.id}`, { headers: authHeaders })).json();
  const listAfterRevoke = afterRevokeJson.keys || afterRevokeJson;
  const revokedKey = listAfterRevoke.find(k => k.id === keyId);
  if (revokedKey && revokedKey.status === 'revoked') {
    console.log('✓ PASSED: Key status is confirmed "revoked" in backend!');
  } else {
    console.error('❌ FAILED: Key status not revoked:', revokedKey);
    process.exit(1);
  }

  console.log('\n🎉 ALL WORKSPACE AND API KEY BACKEND TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
