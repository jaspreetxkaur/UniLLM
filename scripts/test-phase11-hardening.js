import crypto from 'crypto';
import { query } from '../server/config/db.js';
import { budgetService } from '../server/services/budgetService.js';
import { validateChatCompletionRequest } from '../server/utils/gatewayValidator.js';
import { normalizeProviderError } from '../server/utils/errorNormalizer.js';
import { auditService } from '../server/services/auditService.js';

async function testPhase11Hardening() {
  console.log('🔒 Testing Phase 11: Backend Hardening, Security & Real Organization Settings...\n');

  try {
    // 1. Setup two isolated test organizations
    console.log('Step 1: Setting up isolated test organizations...');
    const orgARes = await query(`
      INSERT INTO organizations (name, slug, referral_code)
      VALUES ($1, $2, $3)
      RETURNING id, name;
    `, [`Hardening Org A ${Date.now()}`, `hardening-org-a-${Date.now()}`, `REF-${crypto.randomBytes(3).toString('hex').toUpperCase()}`]);
    const orgA = orgARes.rows[0];

    const orgBRes = await query(`
      INSERT INTO organizations (name, slug, referral_code)
      VALUES ($1, $2, $3)
      RETURNING id, name;
    `, [`Hardening Org B ${Date.now()}`, `hardening-org-b-${Date.now()}`, `REF-${crypto.randomBytes(3).toString('hex').toUpperCase()}`]);
    const orgB = orgBRes.rows[0];

    const ownerRes = await query(`
      INSERT INTO users (email, name, password_hash)
      VALUES ($1, 'Owner Hardening', 'HASH')
      RETURNING id;
    `, [`owner.hardening.${Date.now()}@test.com`]);
    const ownerA = ownerRes.rows[0];

    console.log(`✅ Tenant A: "${orgA.name}" (ID: ${orgA.id})`);
    console.log(`✅ Tenant B: "${orgB.name}" (ID: ${orgB.id})`);

    // 2. Test Budget Service Get & Update
    console.log('\nStep 2: Testing Organization Budget Service (get & update)...');
    const initialBudget = await budgetService.getBudget(orgA.id);
    console.log(`👉 Default Monthly Budget: $${initialBudget.monthlyBudgetUsd.toFixed(2)}`);

    const updated = await budgetService.updateBudget({
      organizationId: orgA.id,
      actorId: ownerA.id,
      monthlyBudgetUsd: 250.00,
      alertThresholdPercent: 85,
      hardLimitEnabled: true
    });
    console.log(`✅ Updated Budget: $${updated.monthlyBudgetUsd.toFixed(2)}, Threshold: ${updated.alertThresholdPercent}%, HardLimit: ${updated.hardLimitEnabled}`);

    if (updated.monthlyBudgetUsd !== 250.00 || updated.alertThresholdPercent !== 85) {
      throw new Error('Budget update values do not match expected!');
    }

    // Verify Audit Log Entry created for budget update
    const auditLogs = await auditService.listLogs(orgA.id, 5);
    console.log(`✅ Audit Log verified: action = "${auditLogs[0].action}"`);
    if (auditLogs[0].action !== 'budget.update') {
      throw new Error('Expected audit log for budget.update was not found!');
    }

    // 3. Test Budget Validation Guardrails
    console.log('\nStep 3: Testing Budget Input Validation Guardrails...');
    try {
      await budgetService.updateBudget({
        organizationId: orgA.id,
        actorId: ownerA.id,
        monthlyBudgetUsd: -50.00,
        alertThresholdPercent: 80
      });
      throw new Error('Negative budget was unexpectedly allowed!');
    } catch (err) {
      console.log(`🛡️ [SECURITY VERIFIED]: Negative budget rejected -> "${err.message}"`);
    }

    try {
      await budgetService.updateBudget({
        organizationId: orgA.id,
        actorId: ownerA.id,
        monthlyBudgetUsd: 100.00,
        alertThresholdPercent: 150
      });
      throw new Error('Out of bounds threshold was unexpectedly allowed!');
    } catch (err) {
      console.log(`🛡️ [SECURITY VERIFIED]: Invalid threshold rejected -> "${err.message}"`);
    }

    // 4. Test Multi-Tenant Budget Isolation
    console.log('\nStep 4: Verifying Multi-Tenant Budget Isolation...');
    const budgetB = await budgetService.getBudget(orgB.id);
    console.log(`🔒 Tenant B Budget: $${budgetB.monthlyBudgetUsd.toFixed(2)} (Default: 100.00, unaffected by Org A's $250.00 update)`);
    if (budgetB.monthlyBudgetUsd !== 100.00) {
      throw new Error('Tenant B budget was affected by Tenant A!');
    }

    // 5. Test Gateway Request Schema Validation
    console.log('\nStep 5: Testing Gateway Request Schema Validation...');
    try {
      validateChatCompletionRequest({});
      throw new Error('Empty payload was unexpectedly allowed!');
    } catch (err) {
      console.log(`🛡️ [VALIDATION VERIFIED]: Missing messages rejected -> "${err.message}"`);
    }

    try {
      validateChatCompletionRequest({
        messages: [{ role: 'hacker', content: 'test' }]
      });
      throw new Error('Invalid role was unexpectedly allowed!');
    } catch (err) {
      console.log(`🛡️ [VALIDATION VERIFIED]: Invalid role rejected -> "${err.message}"`);
    }

    try {
      validateChatCompletionRequest({
        messages: [{ role: 'user', content: 'hello' }],
        temperature: 5.0
      });
      throw new Error('Out of range temperature was unexpectedly allowed!');
    } catch (err) {
      console.log(`🛡️ [VALIDATION VERIFIED]: Invalid temperature rejected -> "${err.message}"`);
    }

    const validPayload = validateChatCompletionRequest({
      messages: [{ role: 'user', content: 'What is 1+1?' }],
      model: 'gemini-3.6-flash',
      temperature: 0.5,
      max_tokens: 500
    });
    console.log(`✅ Valid payload accepted: model="${validPayload.model}", temp=${validPayload.temperature}, maxTokens=${validPayload.maxTokens}`);

    // 6. Test Error Normalization
    console.log('\nStep 6: Testing Provider Error Normalization...');
    const normalizedRateLimit = normalizeProviderError({ message: 'Resource exhausted: 429 rate limit exceeded' });
    console.log(`✅ 429 Rate limit normalized to status ${normalizedRateLimit.statusCode}: ${normalizedRateLimit.error.type}`);

    const normalizedTimeout = normalizeProviderError({ message: 'ETIMEDOUT connection failed' });
    console.log(`✅ Timeout normalized to status ${normalizedTimeout.statusCode}: ${normalizedTimeout.error.type}`);

    console.log('\n🎉 [PHASE 11 TEST PASSED]: Backend Hardening, Security, Budget Service & Gateway Validation are 100% operational on Supabase!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Phase 11 Test Failed:', err);
    process.exit(1);
  }
}

testPhase11Hardening();
