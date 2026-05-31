import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("API Key loaded (first 7 chars):", apiKey ? apiKey.substring(0, 7) + "..." : "undefined");
  
  if (!apiKey) {
    console.error("No API key found in process.env");
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    console.log("Attempting to call gemini-2.5-flash...");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Hola, responde con una sola palabra.",
    });
    console.log("Success with gemini-2.5-flash! Response:", response.text);
  } catch (error: any) {
    console.error("Error with gemini-2.5-flash:", error.message || error);
    
    // Try gemini-1.5-flash as well
    try {
      console.log("Attempting fallback call to gemini-1.5-flash...");
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: "Hola, responde con una sola palabra.",
      });
      console.log("Success with gemini-1.5-flash! Response:", response.text);
    } catch (err2: any) {
      console.error("Error with gemini-1.5-flash:", err2.message || err2);
    }
  }
}

test();
