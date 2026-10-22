import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const list = await ai.models.list();
    console.log('Available Models for your key:');
    for await (const model of list) {
      console.log(' -', model.name);
    }
  } catch (err) {
    console.error('List models failed:', err.message);
  }
}

listModels();
