import { query } from '../config/db.js';
import { providerFactory } from '../providers/providerFactory.js';
import { cacheService } from './cacheService.js';
import { budgetService } from './budgetService.js';
import { routingService } from './routingService.js';

export const gatewayService = {
  /**
   * Main Gateway Proxy Executor with Dynamic Policy Routing, Smart Caching, Budget Enforcement, and Failover
   */
  processChatCompletion: async ({
    gatewayContext,
    messages,
    model = 'gemini-3.6-flash',
    temperature = 0.7,
    maxTokens = 1000,
    bypassCache = false
  }) => {
    const { organizationId, apiKeyId, userId } = gatewayContext;

    // Resolve Workspace ID if missing
    let targetWorkspaceId = gatewayContext.workspaceId;
    if (!targetWorkspaceId) {
      const wsRes = await query(
        'SELECT id FROM workspaces WHERE organization_id = $1 ORDER BY is_default DESC, created_at ASC LIMIT 1;',
        [organizationId]
      );
      if (wsRes.rows.length === 0) {
        const newWs = await query(
          'INSERT INTO workspaces (organization_id, name, is_default) VALUES ($1, $2, true) RETURNING id;',
          [organizationId, 'Default Workspace']
        );
        targetWorkspaceId = newWs.rows[0].id;
      } else {
        targetWorkspaceId = wsRes.rows[0].id;
      }
    }

    // 1. Authoritative Server-Side Budget Check
    const budgetCheck = await budgetService.checkBudget(organizationId);
    if (!budgetCheck.allowed) {
      await query(`
        INSERT INTO ai_requests (
          organization_id, workspace_id, api_key_id, user_id,
          request_type, provider, model, status, status_code, error_message
        )
        VALUES ($1, $2, $3, $4, 'chat', 'unillm', $5, 'blocked', 429, $6);
      `, [organizationId, targetWorkspaceId, apiKeyId, userId, model, budgetCheck.reason]);

      const err = new Error(budgetCheck.reason);
      err.statusCode = 429;
      err.code = 'budget_exceeded';
      throw err;
    }

    // 2. Dynamic Routing Policy Evaluation
    const routingDecision = await routingService.evaluateRequest({
      organizationId,
      requestedModel: model,
      messages,
      requestType: 'chat'
    });

    const activePrimaryModel = routingDecision.primaryModel;
    const fallbackCandidates = routingDecision.fallbackCandidates || [];

    // 3. Check Smart Cache with Resolved Primary Model
    const cacheKey = cacheService.generateKey(organizationId, activePrimaryModel, messages, temperature);
    if (!bypassCache) {
      const cachedResponse = cacheService.get(cacheKey);
      if (cachedResponse) {
        // Log Cache HIT in PostgreSQL
        const hitRes = await query(`
          INSERT INTO ai_requests (
            organization_id, workspace_id, api_key_id, user_id,
            request_type, provider, model,
            prompt_tokens, completion_tokens, total_tokens,
            cost_usd, latency_ms, status, status_code, cache_status, is_fallback, request_metadata
          )
          VALUES ($1, $2, $3, $4, 'chat', $5, $6, $7, $8, $9, 0.000000, 12, 'success', 200, 'HIT', false, $10)
          RETURNING id;
        `, [
          organizationId,
          targetWorkspaceId,
          apiKeyId,
          userId,
          cachedResponse.unillm_telemetry?.provider || 'cache',
          cachedResponse.model || activePrimaryModel,
          cachedResponse.usage?.prompt_tokens || 0,
          cachedResponse.usage?.completion_tokens || 0,
          cachedResponse.usage?.total_tokens || 0,
          JSON.stringify({
            policyId: routingDecision.policyId,
            policyName: routingDecision.policyName,
            routingMatched: routingDecision.matched,
            requestedModel: model,
            resolvedModel: activePrimaryModel
          })
        ]);

        if (apiKeyId) {
          query('UPDATE api_keys SET last_used_at = NOW() WHERE id = $1;', [apiKeyId]).catch(() => {});
        }

        return {
          ...cachedResponse,
          id: `chatcmpl-${hitRes.rows[0].id}`,
          unillm_telemetry: {
            ...cachedResponse.unillm_telemetry,
            requestId: hitRes.rows[0].id,
            cacheStatus: 'HIT',
            latencyMs: 12,
            costUsd: 0,
            policyId: routingDecision.policyId,
            policyName: routingDecision.policyName
          }
        };
      }
    }

    // 4. Parse Prompt and System Prompt from Messages Array
    let prompt = '';
    let systemPrompt = '';

    if (Array.isArray(messages)) {
      for (const msg of messages) {
        if (msg.role === 'system') {
          systemPrompt += (systemPrompt ? '\n' : '') + msg.content;
        } else if (msg.role === 'user') {
          prompt += (prompt ? '\n' : '') + msg.content;
        } else if (msg.role === 'assistant') {
          prompt += (prompt ? '\nAssistant: ' : 'Assistant: ') + msg.content;
        }
      }
    } else if (typeof messages === 'string') {
      prompt = messages;
    }

    if (!prompt.trim()) {
      prompt = 'Hello!';
    }

    // 5. Dispatch with Dynamic Policy-Based Fallback Chain
    const candidateModels = [activePrimaryModel, ...fallbackCandidates.filter(m => m !== activePrimaryModel)];
    let providerResult = null;
    let successfulModel = activePrimaryModel;
    let isFallback = false;
    const attemptErrors = [];

    for (let i = 0; i < candidateModels.length; i++) {
      const candidate = candidateModels[i];
      try {
        providerResult = await providerFactory.execute({
          prompt,
          systemPrompt,
          model: candidate,
          temperature,
          maxTokens
        });
        successfulModel = candidate;
        isFallback = (i > 0);
        break; // Successfully executed
      } catch (err) {
        console.warn(`[Gateway Notice]: Execution attempt on model '${candidate}' failed: ${err.message}`);
        attemptErrors.push({ model: candidate, error: err.message });
      }
    }

    // If all candidate models failed, record failure telemetry and throw
    if (!providerResult) {
      const lastError = attemptErrors[attemptErrors.length - 1]?.error || 'All candidate providers failed.';
      await query(`
        INSERT INTO ai_requests (
          organization_id, workspace_id, api_key_id, user_id,
          request_type, provider, model, status, status_code, error_message, request_metadata
        )
        VALUES ($1, $2, $3, $4, 'chat', 'provider', $5, 'failed', 502, $6, $7);
      `, [
        organizationId,
        targetWorkspaceId,
        apiKeyId,
        userId,
        activePrimaryModel,
        lastError,
        JSON.stringify({
          policyId: routingDecision.policyId,
          policyName: routingDecision.policyName,
          attempts: attemptErrors
        })
      ]);

      const failErr = new Error(lastError);
      failErr.statusCode = 502;
      failErr.code = 'provider_execution_error';
      throw failErr;
    }

    // 6. Record Real Telemetry to PostgreSQL `ai_requests`
    const insertRes = await query(`
      INSERT INTO ai_requests (
        organization_id, workspace_id, api_key_id, user_id,
        request_type, provider, model,
        prompt_tokens, completion_tokens, total_tokens,
        cost_usd, latency_ms, status, status_code, cache_status, is_fallback, request_metadata
      )
      VALUES ($1, $2, $3, $4, 'chat', $5, $6, $7, $8, $9, $10, $11, 'success', 200, 'MISS', $12, $13)
      RETURNING id, created_at;
    `, [
      organizationId,
      targetWorkspaceId,
      apiKeyId,
      userId,
      providerResult.provider,
      providerResult.model,
      providerResult.promptTokens,
      providerResult.completionTokens,
      providerResult.totalTokens,
      providerResult.costUsd,
      providerResult.latencyMs,
      isFallback,
      JSON.stringify({
        policyId: routingDecision.policyId,
        policyName: routingDecision.policyName,
        routingMatched: routingDecision.matched,
        requestedModel: model,
        resolvedModel: activePrimaryModel,
        attemptsCount: attemptErrors.length + 1
      })
    ]);

    const requestId = insertRes.rows[0].id;

    if (apiKeyId) {
      query('UPDATE api_keys SET last_used_at = NOW() WHERE id = $1;', [apiKeyId]).catch(() => {});
    }

    const standardResponse = {
      id: `chatcmpl-${requestId}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: providerResult.model,
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: providerResult.text
          },
          finish_reason: 'stop'
        }
      ],
      usage: {
        prompt_tokens: providerResult.promptTokens,
        completion_tokens: providerResult.completionTokens,
        total_tokens: providerResult.totalTokens
      },
      unillm_telemetry: {
        requestId,
        provider: providerResult.provider,
        latencyMs: providerResult.latencyMs,
        costUsd: providerResult.costUsd,
        cacheStatus: 'MISS',
        isFallback,
        policyId: routingDecision.policyId,
        policyName: routingDecision.policyName
      }
    };

    // 7. Store in Smart Cache with resolved primary model key
    cacheService.set(cacheKey, standardResponse, 3600);

    return standardResponse;
  }
};
