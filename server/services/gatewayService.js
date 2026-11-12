import { Workspace, ApiKey, AiRequest } from '../models/index.js';
import { providerFactory } from '../providers/providerFactory.js';
import { cacheService } from './cacheService.js';
import { budgetService } from './budgetService.js';
import { routingService } from './routingService.js';
import { realtimeService } from '../realtime/socket.js';

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
      const ws = await Workspace.findOne({ organization_id: organizationId })
        .sort({ is_default: -1, created_at: 1 })
        .lean();
      if (!ws) {
        const newWs = await Workspace.create({
          organization_id: organizationId,
          name: 'Default Workspace',
          is_default: true
        });
        targetWorkspaceId = newWs._id;
      } else {
        targetWorkspaceId = ws._id;
      }
    }

    // 1. Authoritative Server-Side Budget Check
    const budgetCheck = await budgetService.checkBudget(organizationId);
    if (!budgetCheck.allowed) {
      await AiRequest.create({
        organization_id: organizationId,
        workspace_id: targetWorkspaceId,
        api_key_id: apiKeyId,
        user_id: userId,
        request_type: 'chat',
        provider: 'unillm',
        model,
        status: 'blocked',
        status_code: 429,
        error_message: budgetCheck.reason
      });

      realtimeService.emitGatewayRequest(organizationId, targetWorkspaceId, {
        requestId: null,
        model,
        provider: 'unillm',
        status: 'blocked',
        statusCode: 429,
        cacheStatus: 'MISS',
        isFallback: false,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        costUsd: 0,
        latencyMs: 0
      });

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
        // Log Cache HIT in MongoDB
        const hitDoc = await AiRequest.create({
          organization_id: organizationId,
          workspace_id: targetWorkspaceId,
          api_key_id: apiKeyId,
          user_id: userId,
          request_type: 'chat',
          provider: cachedResponse.unillm_telemetry?.provider || 'cache',
          model: cachedResponse.model || activePrimaryModel,
          prompt_tokens: cachedResponse.usage?.prompt_tokens || 0,
          completion_tokens: cachedResponse.usage?.completion_tokens || 0,
          total_tokens: cachedResponse.usage?.total_tokens || 0,
          cost_usd: 0.000000,
          latency_ms: 12,
          status: 'success',
          status_code: 200,
          cache_status: 'HIT',
          is_fallback: false,
          request_metadata: {
            policyId: routingDecision.policyId,
            policyName: routingDecision.policyName,
            routingMatched: routingDecision.matched,
            requestedModel: model,
            resolvedModel: activePrimaryModel
          }
        });

        if (apiKeyId) {
          ApiKey.updateOne({ _id: apiKeyId }, { $set: { last_used_at: new Date() } }).catch(() => {});
        }

        realtimeService.emitGatewayRequest(organizationId, targetWorkspaceId, {
          requestId: hitDoc._id,
          model: activePrimaryModel,
          provider: cachedResponse.unillm_telemetry?.provider || 'cache',
          status: 'success',
          statusCode: 200,
          cacheStatus: 'HIT',
          isFallback: false,
          promptTokens: cachedResponse.usage?.prompt_tokens || 0,
          completionTokens: cachedResponse.usage?.completion_tokens || 0,
          totalTokens: cachedResponse.usage?.total_tokens || 0,
          costUsd: 0,
          latencyMs: 12
        });

        return {
          ...cachedResponse,
          id: `chatcmpl-${hitDoc._id}`,
          unillm_telemetry: {
            ...cachedResponse.unillm_telemetry,
            requestId: hitDoc._id,
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
      await AiRequest.create({
        organization_id: organizationId,
        workspace_id: targetWorkspaceId,
        api_key_id: apiKeyId,
        user_id: userId,
        request_type: 'chat',
        provider: 'provider',
        model: activePrimaryModel,
        status: 'failed',
        status_code: 502,
        error_message: lastError,
        request_metadata: {
          policyId: routingDecision.policyId,
          policyName: routingDecision.policyName,
          attempts: attemptErrors
        }
      });

      realtimeService.emitGatewayRequest(organizationId, targetWorkspaceId, {
        requestId: null,
        model: activePrimaryModel,
        provider: 'provider',
        status: 'failed',
        statusCode: 502,
        cacheStatus: 'MISS',
        isFallback: false,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        costUsd: 0,
        latencyMs: 0
      });

      const failErr = new Error(lastError);
      failErr.statusCode = 502;
      failErr.code = 'provider_execution_error';
      throw failErr;
    }

    // 6. Record Real Telemetry to MongoDB `ai_requests`
    const reqDoc = await AiRequest.create({
      organization_id: organizationId,
      workspace_id: targetWorkspaceId,
      api_key_id: apiKeyId,
      user_id: userId,
      request_type: 'chat',
      provider: providerResult.provider,
      model: providerResult.model,
      prompt_tokens: providerResult.promptTokens,
      completion_tokens: providerResult.completionTokens,
      total_tokens: providerResult.totalTokens,
      cost_usd: providerResult.costUsd,
      latency_ms: providerResult.latencyMs,
      status: 'success',
      status_code: 200,
      cache_status: 'MISS',
      is_fallback: isFallback,
      request_metadata: {
        policyId: routingDecision.policyId,
        policyName: routingDecision.policyName,
        routingMatched: routingDecision.matched,
        requestedModel: model,
        resolvedModel: activePrimaryModel,
        attemptsCount: attemptErrors.length + 1
      }
    });

    const requestId = reqDoc._id;

    if (apiKeyId) {
      ApiKey.updateOne({ _id: apiKeyId }, { $set: { last_used_at: new Date() } }).catch(() => {});
    }

    realtimeService.emitGatewayRequest(organizationId, targetWorkspaceId, {
      requestId,
      model: providerResult.model,
      provider: providerResult.provider,
      status: 'success',
      statusCode: 200,
      cacheStatus: 'MISS',
      isFallback,
      promptTokens: providerResult.promptTokens,
      completionTokens: providerResult.completionTokens,
      totalTokens: providerResult.totalTokens,
      costUsd: providerResult.costUsd,
      latencyMs: providerResult.latencyMs
    });

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
