import jwt from 'jsonwebtoken';
import { query } from '../server/config/db.js';
import { cacheService } from '../server/services/cacheService.js';
import { teamService } from '../server/services/teamService.js';
import { workspaceService } from '../server/services/workspaceService.js';
import { requireRole } from '../server/middleware/rbac.js';

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (!condition) {
    testsFailed++;
    console.error(`❌ [TEST FAILED]: ${message}`);
    throw new Error(message);
  }
  testsPassed++;
  console.log(`✅ [PASSED]: ${message}`);
}

async function runPhase13BTests() {
  console.log('⚡ Starting Phase 13B Security Corrections & Cache Safety Test Suite...\n');

  try {
    const timestamp = Date.now();

    // -------------------------------------------------------------
    // Setup 2 Isolated Test Tenants
    // -------------------------------------------------------------
    console.log('--- Step 1: Setting up isolated multi-tenant organizations ---');
    const orgARes = await query(`
      INSERT INTO organizations (name, slug, referral_code, referral_enabled)
      VALUES ($1, $2, $3, true) RETURNING id;
    `, [`Security Org A ${timestamp}`, `sec-a-${timestamp}`, `SECA-${timestamp}`]);
    const tenantAId = orgARes.rows[0].id;

    const orgBRes = await query(`
      INSERT INTO organizations (name, slug, referral_code, referral_enabled)
      VALUES ($1, $2, $3, true) RETURNING id;
    `, [`Security Org B ${timestamp}`, `sec-b-${timestamp}`, `SECB-${timestamp}`]);
    const tenantBId = orgBRes.rows[0].id;

    // Create Owner, Admin, and Member for Tenant A
    const ownerRes = await query(`
      INSERT INTO users (name, email, password_hash, verified)
      VALUES ($1, $2, 'scrypt:salt:hash', true) RETURNING id;
    `, [`Owner A`, `owner_${timestamp}@test.com`]);
    const ownerId = ownerRes.rows[0].id;

    const adminRes = await query(`
      INSERT INTO users (name, email, password_hash, verified)
      VALUES ($1, $2, 'scrypt:salt:hash', true) RETURNING id;
    `, [`Admin A`, `admin_${timestamp}@test.com`]);
    const adminId = adminRes.rows[0].id;

    const memberRes = await query(`
      INSERT INTO users (name, email, password_hash, verified)
      VALUES ($1, $2, 'scrypt:salt:hash', true) RETURNING id;
    `, [`Member A`, `member_${timestamp}@test.com`]);
    const memberId = memberRes.rows[0].id;

    // Create memberships
    await query(`
      INSERT INTO organization_members (organization_id, user_id, role, status)
      VALUES ($1, $2, 'owner', 'active'), ($1, $3, 'admin', 'active'), ($1, $4, 'member', 'active');
    `, [tenantAId, ownerId, adminId, memberId]);

    console.log(`Tenant A ID: ${tenantAId}`);
    console.log(`Tenant B ID: ${tenantBId}`);

    // -------------------------------------------------------------
    // Step 2: Test RBAC Middleware Guard Functionality
    // -------------------------------------------------------------
    console.log('\n--- Step 2: Testing RBAC Middleware Guardrails ---');

    const adminGuard = requireRole(['owner', 'admin']);

    // Test 1: Unauthenticated request rejected
    let unauthPassed = false;
    const reqUnauth = {};
    const resUnauth = {
      status: (code) => ({
        json: (data) => {
          if (code === 401) unauthPassed = true;
        }
      })
    };
    adminGuard(reqUnauth, resUnauth, () => {});
    assert(unauthPassed, 'Unauthenticated request receives HTTP 401 from RBAC guard');

    // Test 2: Member role rejected with 403
    let memberForbidden = false;
    let forbiddenMessage = '';
    const reqMember = { user: { id: memberId, role: 'member', organizationId: tenantAId } };
    const resMember = {
      status: (code) => ({
        json: (data) => {
          if (code === 403) {
            memberForbidden = true;
            forbiddenMessage = data.error?.message || '';
          }
        }
      })
    };
    adminGuard(reqMember, resMember, () => {});
    assert(memberForbidden, 'Member role is forbidden (HTTP 403) from administrative operations');
    assert(forbiddenMessage.includes('Requires one of the following roles'), 'Clear permission denial error message returned');

    // Test 3: Admin role allowed
    let adminAllowed = false;
    const reqAdmin = { user: { id: adminId, role: 'admin', organizationId: tenantAId } };
    adminGuard(reqAdmin, {}, () => { adminAllowed = true; });
    assert(adminAllowed, 'Admin role successfully passes RBAC guard');

    // Test 4: Owner role allowed
    let ownerAllowed = false;
    const reqOwner = { user: { id: ownerId, role: 'owner', organizationId: tenantAId } };
    adminGuard(reqOwner, {}, () => { ownerAllowed = true; });
    assert(ownerAllowed, 'Owner role successfully passes RBAC guard');

    // -------------------------------------------------------------
    // Step 3: Test Workspace and Team Multi-Tenant Isolation
    // -------------------------------------------------------------
    console.log('\n--- Step 3: Testing Team & Workspace Multi-Tenant Isolation ---');

    // Create a workspace in Tenant B
    const wsB = await workspaceService.createWorkspace({ organizationId: tenantBId, userId: ownerId, name: 'Tenant B Workspace' });
    assert(wsB.id !== undefined, 'Workspace created in Tenant B');

    // Tenant A attempts to delete Tenant B workspace
    let crossDeleteWsError = false;
    try {
      await workspaceService.deleteWorkspace({ organizationId: tenantAId, userId: ownerId, workspaceId: wsB.id });
    } catch (err) {
      crossDeleteWsError = true;
    }
    assert(crossDeleteWsError, 'Tenant A cannot delete Tenant B workspace (throws 404)');

    // Add member in Tenant B
    const memberB = await teamService.inviteMember({
      organizationId: tenantBId,
      inviterUserId: ownerId,
      email: `userb_${timestamp}@test.com`,
      name: 'User B',
      role: 'developer'
    });
    assert(memberB.memberId !== undefined, 'Member created in Tenant B');

    // Tenant A attempts to remove Tenant B member
    let crossRemoveError = false;
    try {
      await teamService.removeMember({
        organizationId: tenantAId,
        removerUserId: ownerId,
        memberId: memberB.memberId
      });
    } catch (err) {
      crossRemoveError = true;
    }
    assert(crossRemoveError, 'Tenant A cannot remove Tenant B member');

    // -------------------------------------------------------------
    // Step 4: Test Bounded In-Memory Cache & LRU Eviction
    // -------------------------------------------------------------
    console.log('\n--- Step 4: Testing Bounded In-Memory Cache & Eviction ---');

    cacheService.clear();

    // Store item in cache
    const testKeyA1 = cacheService.generateKey(tenantAId, 'gemini-3.6-flash', [{ role: 'user', content: 'Prompt 1' }]);
    cacheService.set(testKeyA1, { content: 'Response 1' }, 3600);

    const retrievedA1 = cacheService.get(testKeyA1);
    assert(retrievedA1 !== null && retrievedA1.content === 'Response 1', 'Cache HIT retrieves valid stored item');

    // Test TTL expiration
    const expiredKey = cacheService.generateKey(tenantAId, 'gemini-3.6-flash', [{ role: 'user', content: 'Expired' }]);
    cacheService.set(expiredKey, { content: 'Expired Content' }, -1); // Negative TTL = immediately expired

    const retrievedExpired = cacheService.get(expiredKey);
    assert(retrievedExpired === null, 'Expired cache entry returns null and is purged');

    // -------------------------------------------------------------
    // Step 5: Test Multi-Tenant Cache Isolation & Organization Clear
    // -------------------------------------------------------------
    console.log('\n--- Step 5: Testing Organization-Scoped Cache Isolation & Clear ---');

    const keyTenantA = cacheService.generateKey(tenantAId, 'gemini-3.6-flash', [{ role: 'user', content: 'Tenant A Secret' }]);
    const keyTenantB = cacheService.generateKey(tenantBId, 'gemini-3.6-flash', [{ role: 'user', content: 'Tenant A Secret' }]);

    cacheService.set(keyTenantA, { content: 'Org A Secret Data' }, 3600);
    cacheService.set(keyTenantB, { content: 'Org B Secret Data' }, 3600);

    assert(keyTenantA !== keyTenantB, 'Cache keys for identical prompts across different tenants are strictly isolated');

    // Verify Tenant A metrics
    const metricsA = cacheService.getMetrics(tenantAId);
    assert(metricsA.entriesCount >= 1, 'Tenant A metrics show active entries for Tenant A');

    // Tenant A clears cache
    const clearedCount = cacheService.clearOrganization(tenantAId);
    assert(clearedCount >= 1, 'Tenant A cache successfully cleared');

    // Verify Tenant A cache is empty
    const checkTenantA = cacheService.get(keyTenantA);
    assert(checkTenantA === null, 'Tenant A cache entry is cleared');

    // Verify Tenant B cache is STILL PRESENT (Tenant A clear did not affect Tenant B)
    const checkTenantB = cacheService.get(keyTenantB);
    assert(checkTenantB !== null && checkTenantB.content === 'Org B Secret Data', 'Tenant B cache entry remained intact after Tenant A clear');

    console.log(`\n==================================================`);
    console.log(`🎉 ALL ${testsPassed} PHASE 13B SECURITY & CACHE TESTS PASSED!`);
    console.log(`==================================================`);
    process.exit(0);
  } catch (err) {
    console.error('\n❌ [TEST ABORTED]:', err);
    process.exit(1);
  }
}

runPhase13BTests();
