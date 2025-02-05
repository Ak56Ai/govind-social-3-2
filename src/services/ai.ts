import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateContent(prompt: string, platform: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const result = await model.generateContent(`
    You are a social media expert. Generate engaging content for ${platform} based on the following prompt. 
    Follow platform best practices and character limits.
    
    Prompt: ${prompt}
  `);

  const response = await result.response;
  return response.text();
}