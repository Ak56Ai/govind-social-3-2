import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateContent(prompt: string, platform: string) {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(`
      You are a professional social media manager. Generate engaging content for ${platform} based on the following prompt.
      Follow these guidelines:
      - Keep the tone conversational and authentic
      - Include relevant emojis where appropriate
      - Use hashtags strategically (2-3 relevant hashtags)
      - Keep it concise and impactful (under 280 characters for Twitter)
      - Ensure it's engaging and encourages interaction
      
      Prompt: ${prompt}
    `);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate content. Please try again later.');
  }
}