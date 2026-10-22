import crypto from 'crypto';
import { query } from '../server/config/db.js';
import { teamService } from '../server/services/teamService.js';
import { workspaceService } from '../server/services/workspaceService.js';

async function testPhase9WorkspacesAndTeam() {
  console.log('👥 Testing Phase 9: Workspaces & Team Member Management on Supabase...\n');

  try {
    // 1. Setup two isolated test organizations
    console.log('Step 1: Setting up 2 isolated test organizations...');
    const orgARes = await query(`
      INSERT INTO organizations (name, slug, referral_code)
      VALUES ($1, $2, $3)
      RETURNING id, name;
    `, [`Enterprise Org A ${Date.now()}`, `enterprise-org-a-${Date.now()}`, `REF-${crypto.randomBytes(3).toString('hex').toUpperCase()}`]);
    const orgA = orgARes.rows[0];

    const orgBRes = await query(`
      INSERT INTO organizations (name, slug, referral_code)
      VALUES ($1, $2, $3)
      RETURNING id, name;
    `, [`Enterprise Org B ${Date.now()}`, `enterprise-org-b-${Date.now()}`, `REF-${crypto.randomBytes(3).toString('hex').toUpperCase()}`]);
    const orgB = orgBRes.rows[0];

    // Create Owner user for Org A
    const ownerRes = await query(`
      INSERT INTO users (email, name, password_hash)
      VALUES ($1, 'Owner Org A', 'HASHED_PASS')
      RETURNING id, email;
    `, [`owner.${Date.now()}@orga.com`]);
    const ownerA = ownerRes.rows[0];

    // Add owner to Org A
    await query(`
      INSERT INTO organization_members (organization_id, user_id, role, status)
      VALUES ($1, $2, 'owner', 'active');
    `, [orgA.id, ownerA.id]);

    console.log(`✅ Tenant A: "${orgA.name}" (Owner: ${ownerA.email})`);
    console.log(`✅ Tenant B: "${orgB.name}"`);

    // 2. Test Workspaces Management for Org A
    console.log('\nStep 2: Testing Workspaces Management for Tenant A...');
    // Create Default Workspace
    const defaultWs = await query(`
      INSERT INTO workspaces (organization_id, name, is_default)
      VALUES ($1, 'Default Workspace', true)
      RETURNING id, name;
    `, [orgA.id]);
    console.log(`✅ Default Workspace created: "${defaultWs.rows[0].name}"`);

    // Create Staging Workspace
    const stagingWs = await workspaceService.createWorkspace({
      organizationId: orgA.id,
      userId: ownerA.id,
      name: 'Staging Environment'
    });
    console.log(`✅ Custom Workspace created: "${stagingWs.name}" (ID: ${stagingWs.id})`);

    const wsListA = await workspaceService.listWorkspaces(orgA.id);
    console.log(`✅ Listed ${wsListA.length} workspace(s) for Tenant A.`);
    if (wsListA.length !== 2) throw new Error('Expected 2 workspaces for Tenant A.');

    // 3. Test Team Member Invitation
    console.log('\nStep 3: Inviting Developer to Tenant A...');
    const inviteRes = await teamService.inviteMember({
      organizationId: orgA.id,
      inviterUserId: ownerA.id,
      email: `dev.${Date.now()}@orga.com`,
      name: 'Alice Developer',
      role: 'developer',
      monthlySpendLimitUsd: 75.00,
      monthlyTokenLimit: 750000
    });
    console.log(`✅ Member invited: "${inviteRes.name}" (${inviteRes.email}), Role: ${inviteRes.role}, Cap: $${inviteRes.monthlySpendLimitUsd}`);

    const membersA = await teamService.listMembers(orgA.id);
    console.log(`✅ Total members in Tenant A: ${membersA.length} (Expected: 2 -> Owner + Dev)`);
    if (membersA.length !== 2) throw new Error('Expected 2 members in Tenant A.');

    // 4. Test Updating & Suspending Member
    console.log('\nStep 4: Suspending Member...');
    const updatedMember = await teamService.updateMember({
      organizationId: orgA.id,
      updaterUserId: ownerA.id,
      memberId: inviteRes.memberId,
      status: 'suspended'
    });
    console.log(`✅ Member status updated: ${updatedMember.status}`);
    if (updatedMember.status !== 'suspended') throw new Error('Member status update failed.');

    // 5. Test Cross-Tenant Isolation (Tenant B cannot see Tenant A's members or workspaces)
    console.log('\nStep 5: Verifying Cross-Tenant Isolation for Tenant B...');
    const wsListB = await workspaceService.listWorkspaces(orgB.id);
    const membersB = await teamService.listMembers(orgB.id);

    console.log(`🔒 Tenant B Workspaces: ${wsListB.length} (Expected: 0)`);
    console.log(`🔒 Tenant B Members: ${membersB.length} (Expected: 0)`);

    if (wsListB.length !== 0 || membersB.length !== 0) {
      throw new Error('CRITICAL SECURITY LEAK: Tenant B accessed Tenant A data!');
    }
    console.log('🛡️ [MULTI-TENANT ISOLATION VERIFIED]: Complete isolation between organizations!');

    // 6. Test Member Removal and Workspace Deletion
    console.log('\nStep 6: Cleaning up custom member and workspace...');
    await teamService.removeMember({
      organizationId: orgA.id,
      removerUserId: ownerA.id,
      memberId: inviteRes.memberId
    });
    console.log('✅ Developer member removed successfully.');

    await workspaceService.deleteWorkspace({
      organizationId: orgA.id,
      userId: ownerA.id,
      workspaceId: stagingWs.id
    });
    console.log('✅ Custom workspace deleted successfully.');

    console.log('\n🎉 [PHASE 9 TEST PASSED]: Workspaces & Team Member Management are 100% operational on Supabase!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Phase 9 Test Failed:', err);
    process.exit(1);
  }
}

testPhase9WorkspacesAndTeam();
