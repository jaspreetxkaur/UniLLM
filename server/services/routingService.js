import { RoutingPolicy } from '../models/index.js';
import { MODEL_CATALOG } from '../config/models.js';

export const routingService = {
  /**
   * Evaluates request against active routing policies in priority order (priority ASC, created_at ASC)
   * Fails safe to default routing if no policy matches or on evaluation failure.
   */
  evaluateRequest: async ({
    organizationId,
    requestedModel = 'gemini-3.6-flash',
    messages = [],
    requestType = 'chat'
  }) => {
    // Default fallback baseline
    const defaultPrimary = MODEL_CATALOG[requestedModel] ? requestedModel : 'gemini-3.6-flash';
    const defaultFallback = (defaultPrimary === 'gemini-3.6-flash') ? 'gemini-flash-latest' : 'gemini-3.6-flash';
    
    const defaultDecision = {
      matched: false,
      policyId: null,
      policyName: null,
      primaryModel: defaultPrimary,
      fallbackCandidates: [defaultFallback],
      reason: 'Default routing'
    };

    if (!organizationId) {
      return defaultDecision;
    }

    try {
      // 1. Fetch enabled policies for this specific organization ordered by priority
      const policies = await RoutingPolicy.find({
        organization_id: organizationId,
        enabled: true
      })
        .sort({ priority: 1, created_at: 1 })
        .lean();

      if (!policies || policies.length === 0) {
        return defaultDecision;
      }

      // 2. Extract full prompt text from messages
      let promptText = '';
      if (Array.isArray(messages)) {
        promptText = messages.map(m => m.content || '').join(' ');
      } else if (typeof messages === 'string') {
        promptText = messages;
      }
      const lowerPrompt = promptText.toLowerCase();

      // 3. Evaluate policies in deterministic order
      for (const policy of policies) {
        const id = policy._id;
        const name = policy.name;
        const condition_type = policy.condition_type;
        const condition_config = policy.condition_config || {};
        const action_type = policy.action_type;
        const action_config = policy.action_config || {};

        let isMatch = false;

        if (condition_type === 'always') {
          isMatch = true;
        } else if (condition_type === 'model') {
          isMatch = (condition_config.model && condition_config.model.toLowerCase() === (requestedModel || '').toLowerCase());
        } else if (condition_type === 'keyword') {
          if (Array.isArray(condition_config.keywords) && condition_config.keywords.length > 0) {
            isMatch = condition_config.keywords.some(kw => typeof kw === 'string' && lowerPrompt.includes(kw.toLowerCase().trim()));
          }
        } else if (condition_type === 'request_type') {
          isMatch = (condition_config.request_type && condition_config.request_type.toLowerCase() === (requestType || '').toLowerCase());
        }

        if (isMatch) {
          // Resolve Action
          let targetModel = action_config.target_model;
          if (!targetModel || !MODEL_CATALOG[targetModel]) {
            targetModel = defaultPrimary;
          }

          let fallbackCandidates = [];
          if (action_type === 'fallback_chain' && Array.isArray(action_config.fallback_models)) {
            // Deduplicate and filter valid models
            const seen = new Set([targetModel]);
            for (const fb of action_config.fallback_models) {
              if (MODEL_CATALOG[fb] && !seen.has(fb)) {
                seen.add(fb);
                fallbackCandidates.push(fb);
              }
            }
          }

          // If no fallback specified, provide standard default backup
          if (fallbackCandidates.length === 0) {
            const backup = (targetModel === 'gemini-3.6-flash') ? 'gemini-flash-latest' : 'gemini-3.6-flash';
            fallbackCandidates.push(backup);
          }

          return {
            matched: true,
            policyId: id,
            policyName: name,
            primaryModel: targetModel,
            fallbackCandidates,
            reason: `Matched policy: ${name}`
          };
        }
      }

      // No policy condition matched
      return defaultDecision;
    } catch (err) {
      console.warn(`[Routing Service Warning]: Error evaluating policies for org ${organizationId}: ${err.message}. Failing safe to default.`);
      return defaultDecision;
    }
  }
};
