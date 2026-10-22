import { gatewayService } from '../services/gatewayService.js';
import { validateChatCompletionRequest } from '../utils/gatewayValidator.js';
import { normalizeProviderError } from '../utils/errorNormalizer.js';

export const gatewayController = {
  createChatCompletion: async (req, res) => {
    try {
      // 1. Strict Schema Validation
      const validatedPayload = validateChatCompletionRequest(req.body);

      // 2. Gateway Execution
      const completion = await gatewayService.processChatCompletion({
        gatewayContext: req.gatewayContext,
        messages: validatedPayload.messages,
        model: validatedPayload.model,
        temperature: validatedPayload.temperature,
        maxTokens: validatedPayload.maxTokens,
        bypassCache: req.body.bypass_cache || req.body.bypassCache || false
      });

      return res.json(completion);
    } catch (err) {
      const { statusCode, error } = normalizeProviderError(err);
      return res.status(statusCode).json({ error });
    }
  }
};
