import { GoogleGenAI } from '@google/genai';

export const geminiProvider = {
  executeChat: async ({ prompt, systemPrompt, model = 'gemini-3.6-flash', temperature = 0.7, maxTokens = 1000 }) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured in .env');
    }

    const ai = new GoogleGenAI({ apiKey });
    const startTime = Date.now();

    const config = {
      temperature,
      maxOutputTokens: maxTokens
    };

    if (systemPrompt && systemPrompt.trim()) {
      config.systemInstruction = systemPrompt.trim();
    }

    const targetModel = model || 'gemini-3.6-flash';

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: prompt,
      config
    });

    const latencyMs = Date.now() - startTime;
    const text = response.text || '';
    
    // Extract real token usage metadata from Gemini response
    const usage = response.usageMetadata || {};
    const promptTokens = usage.promptTokenCount || Math.ceil(prompt.length / 4);
    const completionTokens = usage.candidatesTokenCount || Math.ceil(text.length / 4);
    const totalTokens = usage.totalTokenCount || (promptTokens + completionTokens);

    return {
      text,
      promptTokens,
      completionTokens,
      totalTokens,
      latencyMs,
      provider: 'gemini',
      model: targetModel
    };
  }
};
