import dotenv from 'dotenv';
import { providerFactory } from '../server/providers/providerFactory.js';

dotenv.config();

async function testRealAiProvider() {
  console.log('🤖 Testing Real AI Provider Integration...\n');

  try {
    const prompt = 'Explain what an AI Gateway is in two clear bullet points.';
    console.log(`👉 Sending Prompt: "${prompt}"`);
    console.log('⏳ Connecting to Google Gemini API (model: gemini-3.6-flash)...');

    const response = await providerFactory.execute({
      prompt,
      model: 'gemini-3.6-flash',
      temperature: 0.5
    });

    console.log('\n✅ [LIVE AI RESPONSE RECEIVED]:');
    console.log('----------------------------------------------------');
    console.log(response.text.trim());
    console.log('----------------------------------------------------');
    console.log(`\n📊 Real Telemetry Data:`);
    console.log(`  - Provider: ${response.provider}`);
    console.log(`  - Model: ${response.model}`);
    console.log(`  - Prompt Tokens: ${response.promptTokens}`);
    console.log(`  - Completion Tokens: ${response.completionTokens}`);
    console.log(`  - Total Tokens: ${response.totalTokens}`);
    console.log(`  - Gateway Latency: ${response.latencyMs} ms`);
    console.log(`  - Estimated Cost: $${response.costUsd.toFixed(6)} USD`);

    console.log('\n🎉 [PHASE 6 TEST PASSED]: Real AI Provider Integration is 100% working!');
    process.exit(0);
  } catch (err) {
    console.error('❌ AI Provider Test Failed:', err.message);
    process.exit(1);
  }
}

testRealAiProvider();
