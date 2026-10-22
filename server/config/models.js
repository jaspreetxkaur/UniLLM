// Centralized Model Catalog & Pricing Matrix (USD per 1 Million Tokens)
export const MODEL_CATALOG = {
  // Google Gemini Models (2026 Generation)
  'gemini-3.6-flash': {
    name: 'Gemini 3.6 Flash',
    provider: 'gemini',
    inputCostPer1M: 0.075,
    outputCostPer1M: 0.30,
    contextWindow: 1048576,
    default: true
  },
  'gemini-3.7-flash': {
    name: 'Gemini 3.7 Flash',
    provider: 'gemini',
    inputCostPer1M: 0.075,
    outputCostPer1M: 0.30,
    contextWindow: 1048576
  },
  'gemini-flash-latest': {
    name: 'Gemini Flash (Latest)',
    provider: 'gemini',
    inputCostPer1M: 0.075,
    outputCostPer1M: 0.30,
    contextWindow: 1048576
  },

  // OpenAI Models
  'gpt-4o-mini': {
    name: 'GPT-4o Mini',
    provider: 'openai',
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.60,
    contextWindow: 128000
  },
  'gpt-4o': {
    name: 'GPT-4o',
    provider: 'openai',
    inputCostPer1M: 5.00,
    outputCostPer1M: 15.00,
    contextWindow: 128000
  }
};

/**
 * Calculates exact cost in USD given model ID and token counts
 */
export const calculateCost = (modelId, promptTokens, completionTokens) => {
  const model = MODEL_CATALOG[modelId] || MODEL_CATALOG['gemini-3.6-flash'] || MODEL_CATALOG['gemini-flash-latest'];
  const inputCost = (promptTokens / 1_000_000) * model.inputCostPer1M;
  const outputCost = (completionTokens / 1_000_000) * model.outputCostPer1M;
  return Number((inputCost + outputCost).toFixed(6));
};
