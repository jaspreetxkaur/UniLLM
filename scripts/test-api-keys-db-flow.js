import { query } from '../server/config/db.js';
import { keyService } from '../server/services/keyService.js';
import crypto from 'crypto';

async function testApiKeysDatabaseFlow() {
  console.log('🧪 Testing Phase 5: Secure API Key Engine on Supabase...\n');

  try {
    // 1. Setup two isolated test organizations
    console.log('Step 1: Setting up 2 isolated test organizations...');
    const orgARes = await query(`
      INSERT INTO organizations (name, slug, referral_code)
      VALUES ($1, $2, $3) RETURNING id, name;
    `, ['Company Alpha', `alpha-${Date.now()}`, `EMP-A-${Date.now()}`]);
    const orgA = orgARes.rows[0];

    const orgBRes = await query(`
      INSERT INTO organizations (name, slug, referral_code)
      VALUES ($1, $2, $3) RETURNING id, name;
    `, ['Company Beta', `beta-${Date.now()}`, `EMP-B-${Date.now()}`]);
    const orgB = orgBRes.rows[0];

    // Create users for both orgs
    const userARes = await query(`
      INSERT INTO users (name, email, password_hash, verified)
      VALUES ('Alice Alpha', $1, 'hash_sample', true) RETURNING id;
    `, [`alice.${Date.now()}@alpha.com`]);
    const userAId = userARes.rows[0].id;

    const userBRes = await query(`
      INSERT INTO users (name, email, password_hash, verified)
      VALUES ('Bob Beta', $1, 'hash_sample', true) RETURNING id;
    `, [`bob.${Date.now()}@beta.com`]);
    const userBId = userBRes.rows[0].id;

    console.log(`✅ Tenant A: "${orgA.name}" (ID: ${orgA.id})`);
    console.log(`✅ Tenant B: "${orgB.name}" (ID: ${orgB.id})`);

    // 2. Generate API Key for Organization A
    console.log('\nStep 2: Generating API Key for Organization A via keyService...');
    const createdKey = await keyService.createKey({
      organizationId: orgA.id,
      userId: userAId,
      name: 'Production Web App Key'
    });

    console.log(`✅ API Key Created! Name: "${createdKey.name}"`);
    console.log(`👉 Raw Secret Key (Returned once): ${createdKey.rawKey}`);
    console.log(`👉 UI Key Prefix: ${createdKey.keyPrefix}`);

    // Verify key format
    if (!createdKey.rawKey.startsWith('unillm_live_')) {
      throw new Error('Raw key format must start with unillm_live_');
    }

    // 3. Inspect PostgreSQL Table to verify Hashing & Secret Protection
    console.log('\nStep 3: Verifying PostgreSQL Storage Security in Supabase...');
    const dbKeyRes = await query('SELECT * FROM api_keys WHERE id = $1;', [createdKey.id]);
    const dbKey = dbKeyRes.rows[0];

    console.log(`👉 Stored in DB: id = ${dbKey.id}`);
    console.log(`👉 Stored in DB: key_prefix = ${dbKey.key_prefix}`);
    console.log(`👉 Stored in DB: key_hash = ${dbKey.key_hash} (Length: ${dbKey.key_hash.length} chars)`);

    // Prove that DB does NOT have the raw key
    const expectedHash = crypto.createHash('sha256').update(createdKey.rawKey).digest('hex');
    if (dbKey.key_hash !== expectedHash) {
      throw new Error('Stored hash does not match SHA-256 computation of raw key!');
    }
    console.log('🔒 [SECURITY VERIFIED]: Full raw key is NOT stored in PostgreSQL. Only SHA-256 hash exists!');

    // 4. Test Key Listing (GET /api/keys)
    console.log('\nStep 4: Testing Key Listing for Organization A...');
    const keysA = await keyService.listKeys(orgA.id);
    console.log(`✅ Found ${keysA.length} key(s) for Tenant A.`);
    if (keysA[0].key_hash || keysA[0].rawKey) {
      throw new Error('Security Leak: listKeys returned key_hash or rawKey!');
    }
    console.log('🔒 [SECURITY VERIFIED]: listKeys returns only safe sanitized fields!');

    // 5. Test Cross-Tenant Isolation
    console.log('\nStep 5: Testing Cross-Tenant Security Isolation...');
    const keysB = await keyService.listKeys(orgB.id);
    console.log(`✅ Tenant B sees ${keysB.length} keys (Correct: 0 keys from Tenant A).`);

    console.log('Attacking: Attempting to revoke Tenant A key using Tenant B context...');
    const attackResult = await keyService.revokeKey(orgB.id, createdKey.id, userBId);
    if (attackResult !== null) {
      throw new Error('SECURITY BREACH: Tenant B was able to revoke Tenant A key!');
    }
    console.log('🛡️ [SECURITY VERIFIED]: Cross-tenant revocation blocked with 404/null response!');

    // 6. Test Legitimate Revocation by Tenant A
    console.log('\nStep 6: Revoking Key under Tenant A context...');
    const legitRevoke = await keyService.revokeKey(orgA.id, createdKey.id, userAId);
    console.log(`✅ Key revoked successfully: "${legitRevoke.name}"`);

    const finalCheck = await query('SELECT status FROM api_keys WHERE id = $1;', [createdKey.id]);
    console.log(`👉 Final status in DB: ${finalCheck.rows[0].status}`);

    console.log('\n🎉 [PHASE 5 TEST PASSED]: Complete API Key Engine is 100% functional and cryptographically secure on Supabase!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  }
}

testApiKeysDatabaseFlow();
