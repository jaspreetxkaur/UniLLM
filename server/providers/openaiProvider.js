import OpenAI from 'openai';

export const openaiProvider = {
  executeChat: async ({ prompt, systemPrompt, model = 'gpt-4o-mini', temperature = 0.7, maxTokens = 1000 }) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not configured in .env');
    }

    const openai = new OpenAI({ apiKey });
    const startTime = Date.now();

    const messages = [];
    if (systemPrompt && systemPrompt.trim()) {
      messages.push({ role: 'system', content: systemPrompt.trim() });
    }
    messages.push({ role: 'user', content: prompt });

    const completion = await openai.chat.completions.create({
      model: model || 'gpt-4o-mini',
      messages,
      temperature,
      max_tokens: maxTokens
    });

    const latencyMs = Date.now() - startTime;
    const text = completion.choices[0]?.message?.content || '';
    
    const usage = completion.usage || {};
    const promptTokens = usage.prompt_tokens || Math.ceil(prompt.length / 4);
    const completionTokens = usage.completion_tokens || Math.ceil(text.length / 4);
    const totalTokens = usage.total_tokens || (promptTokens + completionTokens);

    return {
      text,
      promptTokens,
      completionTokens,
      totalTokens,
      latencyMs,
      provider: 'openai',
      model
    };
  }
};
