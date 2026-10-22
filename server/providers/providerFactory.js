import { geminiProvider } from './geminiProvider.js';
import { openaiProvider } from './openaiProvider.js';
import { MODEL_CATALOG, calculateCost } from '../config/models.js';

export const providerFactory = {
  /**
   * Universal Dispatcher: Routes chat requests to the appropriate AI provider adapter
   */
  execute: async ({ prompt, systemPrompt, model = 'gemini-3.6-flash', temperature, maxTokens }) => {
    const normalizedModel = (model || 'gemini-3.6-flash').toLowerCase().trim();
    const modelConfig = MODEL_CATALOG[normalizedModel] || MODEL_CATALOG['gemini-3.6-flash'];
    
    let result;

    if (modelConfig.provider === 'openai') {
      result = await openaiProvider.executeChat({ prompt, systemPrompt, model: normalizedModel, temperature, maxTokens });
    } else {
      // Default to Google Gemini
      result = await geminiProvider.executeChat({ prompt, systemPrompt, model: normalizedModel, temperature, maxTokens });
    }

    // Attach accurate pricing calculation
    const costUsd = calculateCost(normalizedModel, result.promptTokens, result.completionTokens);

    return {
      ...result,
      costUsd
    };
  }
};
