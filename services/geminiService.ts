import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateReport = async (contextData: string, pageTitle: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Unable to generate report: API Key missing.";

  try {
    const prompt = `
      You are an expert ERP analyst for an Aquaculture company named "AquaERP".
      Analyze the following data from the "${pageTitle}" dashboard.
      
      Data Context:
      ${contextData}
      
      Please provide:
      1. A concise executive summary (max 50 words).
      2. Three brief, actionable insights or recommendations based on the data (bullet points).
      
      Format the output as valid HTML (using <p>, <ul>, <li>, <strong> tags only) suitable for rendering inside a div. Do not use markdown backticks.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while analyzing the data. Please try again.";
  }
};

export const askAssistant = async (question: string, contextData: string): Promise<string> => {
    const ai = getAiClient();
    if (!ai) return "AI unavailable.";
  
    try {
      const prompt = `
        You are AquaAI, a helpful assistant for AquaERP.
        Context Data from current view:
        ${contextData}
  
        User Question: ${question}
  
        Answer concisely and professionally.
      `;
  
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
  
      return response.text || "I couldn't process that request.";
    } catch (error) {
      return "Sorry, I encountered an error.";
    }
  };