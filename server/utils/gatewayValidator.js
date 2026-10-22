/**
 * Validates OpenAI-compatible chat completion payload before upstream dispatch
 */
export const validateChatCompletionRequest = (body) => {
  const { messages, model, temperature, max_tokens, maxTokens } = body;

  // 1. Validate Messages Array
  if (!messages) {
    const err = new Error("Missing required field 'messages'.");
    err.statusCode = 400;
    err.code = 'invalid_request_error';
    throw err;
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    const err = new Error("Field 'messages' must be a non-empty array of message objects.");
    err.statusCode = 400;
    err.code = 'invalid_request_error';
    throw err;
  }

  const validRoles = ['system', 'user', 'assistant'];
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (!msg || typeof msg !== 'object') {
      const err = new Error(`Message at index ${i} must be an object with 'role' and 'content'.`);
      err.statusCode = 400;
      err.code = 'invalid_request_error';
      throw err;
    }

    if (!msg.role || !validRoles.includes(msg.role.toLowerCase())) {
      const err = new Error(`Invalid role '${msg.role}' at index ${i}. Allowed roles: [${validRoles.join(', ')}].`);
      err.statusCode = 400;
      err.code = 'invalid_request_error';
      throw err;
    }

    if (typeof msg.content !== 'string' || !msg.content.trim()) {
      const err = new Error(`Message at index ${i} must contain non-empty string content.`);
      err.statusCode = 400;
      err.code = 'invalid_request_error';
      throw err;
    }
  }

  // 2. Validate Temperature
  const temp = typeof temperature === 'number' ? temperature : 0.7;
  if (temp < 0 || temp > 2.0) {
    const err = new Error("Field 'temperature' must be a number between 0.0 and 2.0.");
    err.statusCode = 400;
    err.code = 'invalid_request_error';
    throw err;
  }

  // 3. Validate Max Tokens
  const limit = max_tokens || maxTokens;
  if (limit !== undefined) {
    const num = parseInt(limit, 10);
    if (isNaN(num) || num < 1 || num > 32000) {
      const err = new Error("Field 'max_tokens' must be an integer between 1 and 32000.");
      err.statusCode = 400;
      err.code = 'invalid_request_error';
      throw err;
    }
  }

  return {
    messages,
    model: (model || 'gemini-3.6-flash').trim(),
    temperature: temp,
    maxTokens: limit ? parseInt(limit, 10) : 1000
  };
};
