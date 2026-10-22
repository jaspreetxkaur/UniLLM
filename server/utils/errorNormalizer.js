/**
 * Normalizes internal and upstream AI provider errors into standard RFC/OpenAI error format
 */
export const normalizeProviderError = (err) => {
  const message = err.message || 'An unexpected error occurred in AI Gateway.';
  const lowerMsg = message.toLowerCase();

  // 1. Rate Limit / Quota Exceeded
  if (lowerMsg.includes('quota') || lowerMsg.includes('rate limit') || lowerMsg.includes('429') || err.status === 429) {
    return {
      statusCode: 429,
      error: {
        message: 'Upstream AI provider rate limit or quota exceeded. Please retry shortly.',
        type: 'provider_rate_limit_error',
        code: 'rate_limit_exceeded'
      }
    };
  }

  // 2. Authentication / API Key failure
  if (lowerMsg.includes('api key') || lowerMsg.includes('unauthorized') || lowerMsg.includes('401') || err.status === 401) {
    return {
      statusCode: 502,
      error: {
        message: 'Upstream provider authentication failed. Check gateway provider credentials.',
        type: 'provider_auth_error',
        code: 'invalid_provider_credentials'
      }
    };
  }

  // 3. Model not found or unsupported
  if (lowerMsg.includes('not found') || lowerMsg.includes('not supported') || lowerMsg.includes('404') || err.status === 404) {
    return {
      statusCode: 400,
      error: {
        message: message,
        type: 'invalid_model_error',
        code: 'model_not_found'
      }
    };
  }

  // 4. Request Timeout
  if (lowerMsg.includes('timeout') || lowerMsg.includes('econnreset') || lowerMsg.includes('etimedout')) {
    return {
      statusCode: 504,
      error: {
        message: 'Upstream AI provider request timed out.',
        type: 'provider_timeout_error',
        code: 'gateway_timeout'
      }
    };
  }

  // 5. Default Internal Gateway Error
  return {
    statusCode: err.statusCode || 500,
    error: {
      message: message,
      type: err.code || 'gateway_internal_error',
      code: 'internal_error'
    }
  };
};
