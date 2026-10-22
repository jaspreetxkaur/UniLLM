import { query } from '../server/config/db.js';
import { keyService } from '../server/services/keyService.js';
import { gatewayService } from '../server/services/gatewayService.js';

async function testGatewayProxyFlow() {
  console.log('⚡ Testing Phase 7: Universal AI Gateway Proxy & Database Logging...\n');

  try {
    // 1. Fetch active organization and user
    console.log('Step 1: Resolving active organization and user from Supabase...');
    const userRes = await query('SELECT id, email FROM users ORDER BY created_at DESC LIMIT 1;');
    if (userRes.rows.length === 0) {
      throw new Error('No user found in database. Run test-auth-db-flow.js first.');
    }
    const user = userRes.rows[0];

    const orgRes = await query('SELECT id, name FROM organizations ORDER BY created_at DESC LIMIT 1;');
    const org = orgRes.rows[0];
    console.log(`✅ Using Tenant: "${org.name}" (User: ${user.email})`);

    // 2. Generate live API Key
    console.log('\nStep 2: Generating live API Key for Gateway proxying...');
    const keyData = await keyService.createKey({
      organizationId: org.id,
      userId: user.id,
      name: 'Phase 7 Gateway Test Key'
    });
    console.log(`✅ Key Generated: ${keyData.keyPrefix} (Raw: ${keyData.rawKey})`);

    // 3. Simulate Gateway Request through gatewayService
    console.log('\nStep 3: Executing Chat Completion through Gateway Engine...');
    const prompt = 'In one short sentence, describe what makes UniLLM unique.';
    console.log(`👉 Prompt: "${prompt}"`);
    console.log('⏳ Forwarding to Google Gemini API (model: gemini-3.6-flash)...');

    const completion = await gatewayService.processChatCompletion({
      gatewayContext: {
        authType: 'api_key',
        apiKeyId: keyData.id,
        organizationId: org.id,
        workspaceId: null,
        userId: user.id
      },
      messages: [
        { role: 'system', content: 'You are UniLLM, a high-performance AI Gateway.' },
        { role: 'user', content: prompt }
      ],
      model: 'gemini-3.6-flash',
      temperature: 0.5
    });

    console.log('\n✅ [GATEWAY RESPONSE RETURNED]:');
    console.log('----------------------------------------------------');
    console.log(completion.choices[0].message.content.trim());
    console.log('----------------------------------------------------');
    console.log('📊 Telemetry Metadata:');
    console.log('  - Request ID:', completion.unillm_telemetry.requestId);
    console.log('  - Total Tokens:', completion.usage.total_tokens);
    console.log('  - Gateway Latency:', completion.unillm_telemetry.latencyMs, 'ms');
    console.log('  - Cost:', `$${completion.unillm_telemetry.costUsd} USD`);

    // 4. Verify Supabase Database Record
    console.log('\nStep 4: Verifying Telemetry Row in Supabase ai_requests table...');
    const reqRes = await query('SELECT * FROM ai_requests WHERE id = $1;', [completion.unillm_telemetry.requestId]);
    const reqRow = reqRes.rows[0];

    console.log('📊 Stored Record in PostgreSQL:');
    console.log(`  - DB ID: ${reqRow.id}`);
    console.log(`  - Organization ID: ${reqRow.organization_id}`);
    console.log(`  - API Key ID: ${reqRow.api_key_id}`);
    console.log(`  - Provider: ${reqRow.provider}`);
    console.log(`  - Model: ${reqRow.model}`);
    console.log(`  - Prompt Tokens: ${reqRow.prompt_tokens}`);
    console.log(`  - Completion Tokens: ${reqRow.completion_tokens}`);
    console.log(`  - Status: ${reqRow.status} (${reqRow.status_code})`);
    console.log(`  - Cost USD: $${reqRow.cost_usd}`);

    console.log('\n🎉 [PHASE 7 TEST PASSED]: Universal AI Gateway Proxy is 100% functional and logging live telemetry to Supabase!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Gateway Test Failed:', err);
    process.exit(1);
  }
}

testGatewayProxyFlow();
