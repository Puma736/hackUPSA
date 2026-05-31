import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client
let aiInstance: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. Using graceful fallback.");
      return null;
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// REST API for Gastronomic Recommendations using Gemini
app.post("/api/gemini/gastronomy", async (req: Request, res: Response) => {
  try {
    const { products, style } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      res.status(400).json({ error: "Debe proporcionar una lista de productos del bosque chiquitano." });
      return;
    }

    const ai = getAI();
    const stylePrompt = style || "Alta Cocina Contemporánea";
    const prompt = `Actúa como un Chef Ejecutivo de la Fundación Amigos de la Naturaleza (FAN).
Tengo disponibles los siguientes productos del Bosque Seco Chiquitano:
${products.map(p => `- ${p.name}`).join("\n")}

Estilo gastronómico solicitado: ${stylePrompt}.

Por favor, crea una recomendación culinaria breve y de rápida lectura. Sé sumamente directo y conciso, usando descripciones muy cortas. Devuelve obligatoriamente este formato estructurado:
1. **Maridaje Conceptual**: (Máximo 2 frases sencillas).
2. **Receta de Autor**: Nombre creativo, lista de ingredientes resumida, y un máximo de 3 pasos cortos de preparación.
3. **Valor Ecológico**: (Máximo 2 frases breves sobre la conservación del bosque).

Regla: No incluyas saludos, introducciones largas, reflexiones ni despedidas. Ve directo al grano.`;

    if (!ai) {
      // Fallback rule-based description if GEMINI_API_KEY is not defined
      console.log("No Gemini API Key found. Returning mock gastronomic advice.");
      const fallbackRecipes: Record<string, any> = {
        "Almendra Chiquitana": {
          concept: "Pesto Crujiente de Mupu y Aceite de Copaibo",
          recipeName: "Piquillos rellenos de charque con costra de Almendra Chiquitana",
          ingredients: ["100g Almendra Chiquitana tostada", "Charque desmenuzado", "Pimentones piquillo", "Queso de cabra de la Chiquitania", "Hojas de albahaca silvestre"],
          instructions: ["Tostar las almendras chiquitanas hasta que desprendan su aroma a cacao y almendrado.", "Rellenar los pimientos piquillo con el charque sofrito y queso.", "Cubrir con almendra triturada y gratinar al horno a 180°C durante 10 minutos."],
          conservation: "Comprar almendra chiquitana incentiva a las comunidades campesinas e indígenas a proteger los árboles en pie contra los chaqueos irracionales."
        },
        "default": {
          concept: "Fusión de Sabores Ancestrales Chiquitanos",
          recipeName: "Mousse Cremoso de Totaí con Crujiente Silvestre",
          ingredients: ["Pulpa fresca de Totaí", "Leche de coco", "Almendra chiquitana molida", "Azúcar orgánica o miel de copaibo"],
          instructions: ["Licuar la pulpa de totaí con la leche de coco hasta obtener una emulsión lisa.", "Montar claras a punto de nieve e incorporar la mezcla con movimientos envolventes.", "Servir bien frío coronado con trozos crujientes de almendras tostadas."],
          conservation: "El aprovechamiento sostenible de palmeras nativas como el totaí y motacú provee alternativas económicas tangibles que frenan la expansión ganadera extensiva."
        }
      };

      const matchedName = products[0]?.name || "default";
      const fallback = fallbackRecipes[matchedName] || fallbackRecipes["default"];

      res.json({
        success: true,
        isFallback: true,
        text: `### 🌿 Alta Gastronomía Silvestre: Sabor del Bosque

**Combinación Estrella Conceptual:**
${fallback.concept}. Este plato une la untuosidad o textura de los frutos nativos seleccionados con notas de la cocina local de Santa Cruz.

---

### 🍳 Receta de Autor: ${fallback.recipeName}

**Ingredientes Requeridos:**
${fallback.ingredients.map((i: string) => `- ${i}`).join("\n")}

**Método de Elaboración:**
${fallback.instructions.map((step: string, index: number) => `${index + 1}. **${step.split(" ")[0]}** ${step.substring(step.indexOf(" ") + 1)}`).join("\n")}

---

###  Mensaje de Conservación de la FAN
*${fallback.conservation}*

*(Nota: Esta recomendación utiliza el algoritmo del sistema debido a la falta de credenciales de IA. Para activar la creatividad ilimitada de la Inteligencia Artificial de Gemini, ingresa tu API Key en la configuración).*`
      });
      return;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 400
      }
    });

    res.json({
      success: true,
      isFallback: false,
      text: response.text
    });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Error interno al generar recomendaciones astronómicas automáticas.", details: error.message });
  }
});

// Vite server integrations
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Dynamically import Vite only in development to keep production bundle lean
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FAN - Bosque Chiquitano] Servidor de hackathon listo en puerto: http://0.0.0.0:${PORT}`);
  });
}

startServer();
