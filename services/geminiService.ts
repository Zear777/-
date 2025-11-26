import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY || ''; 
  // Note: In a real deployment, we handle the empty key case. 
  // For this demo, we assume the environment is set up or handle errors gracefully.
  return new GoogleGenAI({ apiKey });
};

export const analyzeGameLog = async (logs: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key missing. Please configure environment.";
  }

  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert game automation debugger for "Xiao Yao Qing Yuan". 
      Analyze the following game client logs and identify any errors, bottlenecks, or reasons for disconnection.
      Provide a concise summary and a suggested fix.
      
      Logs:
      ${logs}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "No analysis could be generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to analyze logs via AI service.";
  }
};

export const generateConfigAdvice = async (currentConfig: string): Promise<string> => {
   if (!process.env.API_KEY) {
    return "API Key missing.";
  }

  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Based on the following bot configuration, suggest improvements for gold farming efficiency: ${currentConfig}`,
    });
    return response.text || "No advice generated.";
  } catch (error) {
    return "Service unavailable.";
  }
};
