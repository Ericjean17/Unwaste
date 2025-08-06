import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey});

export const generateRecipeSuggestions = async (input) => {
  try {
    const prompt = `Given this prompt: ${input}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${prompt}`
    });
    return JSON.stringify(response.text);
  } catch (err) {
    console.error("Error generating recipe suggestions:", err);
    throw err;
  }
}