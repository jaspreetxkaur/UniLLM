import dotenv from 'dotenv';
dotenv.config();
import { connectMongo, disconnectMongo } from '../server/config/mongo.js';
import { Organization, User, Workspace, OrganizationBudget, AuditLog, AiRequest } from '../server/models/index.js';
import { policyService } from '../server/services/policyService.js';
import { policyValidator } from '../server/utils/policyValidator.js';
import { routingService } from '../server/services/routingService.js';
import { gatewayService } from '../server/services/gatewayService.js';
import { cacheService } from '../server/services/cacheService.js';

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

async function runPhase12Tests() {
  console.log('⚡ Starting Comprehensive Phase 12 Dynamic Routing Engine Test Suite...\n');

  try {
    await connectMongo();
    const timestamp = Date.now();

    // -------------------------------------------------------------
    // Setup 2 Isolated Test Tenants
    // -------------------------------------------------------------
    console.log('--- Step 1: Setting up isolated multi-tenant organizations ---');
    const orgA = await Organization.create({
      name: `Routing Tenant A ${timestamp}`,
      slug: `tenant-a-${timestamp}`,
      referral_code: `ROUTA-${timestamp}`,
      referral_enabled: true
    });
    const tenantAId = orgA._id;

    const orgB = await Organization.create({
      name: `Routing Tenant B ${timestamp}`,
      slug: `tenant-b-${timestamp}`,
      referral_code: `ROUTB-${timestamp}`,
      referral_enabled: true
    });
    const tenantBId = orgB._id;

    const userA = await User.create({
      name: 'User A',
      email: `usera_${timestamp}@test.com`,
      password_hash: 'scrypt:salt:hash',
      verified: true
    });
    const userAId = userA._id;

    await Workspace.create({
      organization_id: tenantAId,
      name: 'Default Workspace',
      is_default: true
    });

    await Workspace.create({
      organization_id: tenantBId,
      name: 'Default Workspace',
      is_default: true
    });

    // Initialize budgets for both
    await OrganizationBudget.create({
      organization_id: tenantAId,
      monthly_budget_usd: 500.00,
      alert_threshold_percent: 80,
      hard_limit_enabled: true
    });

    console.log(`Tenant A ID: ${tenantAId}`);
    console.log(`Tenant B ID: ${tenantBId}`);

    // -------------------------------------------------------------
    // Step 2: Policy Validation Guardrails
    // -------------------------------------------------------------
    console.log('\n--- Step 2: Testing Policy Schema Validation Guardrails ---');
    
    // Invalid condition_type
    const invalidCond = policyValidator.validate({
      name: 'Bad Condition Policy',
      condition_type: 'astrology',
      action_type: 'route_model',
      action_config: { target_model: 'gemini-3.6-flash' }
    });
    assert(!invalidCond.valid, 'Rejected invalid condition_type');

    // Invalid action_type
    const invalidAct = policyValidator.validate({
      name: 'Bad Action Policy',
      condition_type: 'keyword',
      condition_config: { keywords: ['code'] },
      action_type: 'quantum_leap'
    });
    assert(!invalidAct.valid, 'Rejected invalid action_type');

    // Unsupported model
    const invalidModel = policyValidator.validate({
      name: 'Bad Model Policy',
      condition_type: 'always',
      action_type: 'route_model',
      action_config: { target_model: 'non-existent-claude-99' }
    });
    assert(!invalidModel.valid, 'Rejected unsupported model in action_config');

    // Empty keywords
    const emptyKw = policyValidator.validate({
      name: 'Empty Keywords Policy',
      condition_type: 'keyword',
      condition_config: { keywords: [] },
      action_type: 'route_model',
      action_config: { target_model: 'gemini-3.6-flash' }
    });
    assert(!emptyKw.valid, 'Rejected empty keywords array');

    // Valid Policy
    const validPol = policyValidator.validate({
      name: 'Valid Keyword Policy',
      priority: 10,
      condition_type: 'keyword',
      condition_config: { keywords: ['python', 'code'] },
      action_type: 'route_model',
      action_config: { target_model: 'gemini-3.7-flash' }
    });
    assert(validPol.valid, 'Accepted valid keyword routing policy');

    // -------------------------------------------------------------
    // Step 3: Policy CRUD in PostgreSQL & Audit Logging
    // -------------------------------------------------------------
    console.log('\n--- Step 3: Testing Policy CRUD & Audit Logs in Supabase ---');
    
    const createdP1 = await policyService.createPolicy(tenantAId, userAId, {
      name: 'Coding Assistant Router',
      priority: 10,
      condition_type: 'keyword',
      condition_config: { keywords: ['python', 'java', 'algorithm'] },
      action_type: 'route_model',
      action_config: { target_model: 'gemini-3.7-flash' }
    }, '127.0.0.1');

    assert(createdP1.id !== undefined, 'Created policy persisted in database');
    assert(createdP1.name === 'Coding Assistant Router', 'Policy name stored correctly');

    // Check Audit Log for create
    const auditRes = await AuditLog.find({ organization_id: tenantAId, action: 'policy.create' }).lean();
    assert(auditRes.length > 0, 'Audit log recorded for policy.create');

    // Update Policy
    const updatedP1 = await policyService.updatePolicy(tenantAId, createdP1.id, userAId, {
      name: 'Updated Coding Assistant Router',
      priority: 5
    }, '127.0.0.1');
    assert(updatedP1.name === 'Updated Coding Assistant Router', 'Policy name updated');
    assert(updatedP1.priority === 5, 'Policy priority updated');

    // Toggle Policy
    const toggledP1 = await policyService.togglePolicy(tenantAId, createdP1.id, userAId, '127.0.0.1');
    assert(toggledP1.enabled === false, 'Policy toggled to disabled');

    // Toggle back to true
    await policyService.togglePolicy(tenantAId, createdP1.id, userAId, '127.0.0.1');

    // Delete Policy
    const deletedP1 = await policyService.deletePolicy(tenantAId, createdP1.id, userAId, '127.0.0.1');
    assert(deletedP1 === true, 'Policy successfully deleted from database');

    // -------------------------------------------------------------
    // Step 4: Multi-Tenant CRUD Isolation
    // -------------------------------------------------------------
    console.log('\n--- Step 4: Testing Multi-Tenant Policy CRUD Isolation ---');

    // Create fresh Tenant A policy for isolation testing
    const tenantAPol = await policyService.createPolicy(tenantAId, userAId, {
      name: 'Tenant A Private Policy',
      priority: 10,
      condition_type: 'always',
      action_type: 'route_model',
      action_config: { target_model: 'gemini-3.6-flash' }
    });
    
    // Tenant B attempts to read Tenant A policy
    const crossRead = await policyService.getPolicyById(tenantBId, tenantAPol.id);
    assert(crossRead === null, 'Tenant B cannot read Tenant A policy');

    // Tenant B attempts to update Tenant A policy
    const crossUpdate = await policyService.updatePolicy(tenantBId, tenantAPol.id, userAId, { name: 'Hacked' });
    assert(crossUpdate === null, 'Tenant B cannot update Tenant A policy');

    // Tenant B attempts to delete Tenant A policy
    const crossDelete = await policyService.deletePolicy(tenantBId, tenantAPol.id, userAId);
    assert(crossDelete === false, 'Tenant B cannot delete Tenant A policy');

    // Clean up
    await policyService.deletePolicy(tenantAId, tenantAPol.id, userAId);

    // -------------------------------------------------------------
    // Step 5: Priority-Based Evaluation & Matching Rules
    // -------------------------------------------------------------
    console.log('\n--- Step 5: Testing Priority-Based Routing & Condition Matching ---');

    // Create Policy 2 with Priority 20 (Lower precedence)
    const createdP2 = await policyService.createPolicy(tenantAId, userAId, {
      name: 'General Python Rule (P20)',
      priority: 20,
      condition_type: 'keyword',
      condition_config: { keywords: ['python'] },
      action_type: 'route_model',
      action_config: { target_model: 'gemini-flash-latest' }
    });

    // Create Policy 3 with Priority 5 (Higher precedence)
    const createdP3 = await policyService.createPolicy(tenantAId, userAId, {
      name: 'High Priority Python Rule (P5)',
      priority: 5,
      condition_type: 'keyword',
      condition_config: { keywords: ['python'] },
      action_type: 'route_model',
      action_config: { target_model: 'gemini-3.7-flash' }
    });

    // Test Priority Matching
    const dec1 = await routingService.evaluateRequest({
      organizationId: tenantAId,
      requestedModel: 'gemini-3.6-flash',
      messages: [{ role: 'user', content: 'Write a python script to parse CSV files.' }]
    });

    assert(dec1.matched === true, 'Matching policy selected');
    assert(dec1.policyId === createdP3.id, 'Higher priority policy (Priority 5) beat Priority 20');
    assert(dec1.primaryModel === 'gemini-3.7-flash', 'Routed to target model from winning policy');

    // Test Disabled Policy Ignored
    await policyService.togglePolicy(tenantAId, createdP3.id, userAId); // Disable P3
    const dec2 = await routingService.evaluateRequest({
      organizationId: tenantAId,
      requestedModel: 'gemini-3.6-flash',
      messages: [{ role: 'user', content: 'Write a python script to parse CSV files.' }]
    });
    assert(dec2.matched === true, 'Next active matching policy selected');
    assert(dec2.policyId === createdP2.id, 'Priority 20 selected after Priority 5 was disabled');

    // Test Non-matching prompt falls back to default
    const decNonMatch = await routingService.evaluateRequest({
      organizationId: tenantAId,
      requestedModel: 'gemini-3.6-flash',
      messages: [{ role: 'user', content: 'Tell me a story about a dragon.' }]
    });
    assert(decNonMatch.matched === false, 'Non-matching prompt produces default decision');
    assert(decNonMatch.primaryModel === 'gemini-3.6-flash', 'Default primary model preserved');

    // -------------------------------------------------------------
    // Step 6: Multi-Tenant Gateway Execution Isolation
    // -------------------------------------------------------------
    console.log('\n--- Step 6: Testing Multi-Tenant Gateway Policy Isolation ---');

    // Tenant B sends the exact same Python prompt: Tenant B has NO policies
    const decTenantB = await routingService.evaluateRequest({
      organizationId: tenantBId,
      requestedModel: 'gemini-3.6-flash',
      messages: [{ role: 'user', content: 'Write a python script to parse CSV files.' }]
    });
    assert(decTenantB.matched === false, 'Tenant B request did NOT trigger Tenant A policy');
    assert(decTenantB.primaryModel === 'gemini-3.6-flash', 'Tenant B used its own default route');

    // -------------------------------------------------------------
    // Step 7: Gateway Dynamic Execution & Fallback Chain
    // -------------------------------------------------------------
    console.log('\n--- Step 7: Testing Gateway Execution with Dynamic Routing & Telemetry ---');

    // Enable fallback chain policy on Tenant A
    const fbPolicy = await policyService.createPolicy(tenantAId, userAId, {
      name: 'Fallback Chain Policy',
      priority: 1,
      condition_type: 'keyword',
      condition_config: { keywords: ['resilience'] },
      action_type: 'fallback_chain',
      action_config: {
        target_model: 'gemini-3.6-flash',
        fallback_models: ['gemini-flash-latest']
      }
    });

    const completionRes = await gatewayService.processChatCompletion({
      gatewayContext: { organizationId: tenantAId, userId: userAId },
      messages: [{ role: 'user', content: 'Explain network resilience in two words.' }],
      model: 'gemini-3.6-flash',
      bypassCache: true
    });

    assert(completionRes.choices[0].message.content.length > 0, 'Gateway executed and returned text');
    assert(completionRes.unillm_telemetry.policyId === fbPolicy.id, 'Gateway telemetry recorded policyId');

    // Verify Telemetry in `ai_requests`
    const reqLog = await AiRequest.findById(completionRes.unillm_telemetry.requestId).lean();
    assert(reqLog !== null, 'Single telemetry record logged for request');
    assert(reqLog.request_metadata.policyId === fbPolicy.id, 'request_metadata contains policyId');
    assert(reqLog.request_metadata.attemptsCount === 1, 'attemptsCount recorded accurately');

    // -------------------------------------------------------------
    // Step 8: Cache Key Model Isolation
    // -------------------------------------------------------------
    console.log('\n--- Step 8: Testing Cache Key Model Isolation ---');

    cacheService.clear();
    const keyGemini36 = cacheService.generateKey(tenantAId, 'gemini-3.6-flash', [{ role: 'user', content: 'Test' }]);
    const keyGemini37 = cacheService.generateKey(tenantAId, 'gemini-3.7-flash', [{ role: 'user', content: 'Test' }]);
    assert(keyGemini36 !== keyGemini37, 'Cache keys for different resolved models are strictly isolated');

    console.log(`\n==================================================`);
    console.log(`🎉 ALL ${testsPassed} PHASE 12 TESTS PASSED WITH 0 FAILURES!`);
    console.log(`==================================================`);
    await disconnectMongo();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ [TEST ABORTED]:', err);
    await disconnectMongo();
    process.exit(1);
  }
}

runPhase12Tests();
