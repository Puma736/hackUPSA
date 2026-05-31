import { useState } from "react";
import { Sparkles, Loader2, RefreshCw, ChefHat, Heart, HelpCircle, UtensilsCrossed } from "lucide-react";
import { Product } from "../types";

interface AiChefProps {
  products: Product[];
}

export default function AiChef({ products }: AiChefProps) {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    products.slice(0, 2).map((p) => p.id)
  );
  const [chefStyle, setChefStyle] = useState<string>("Alta Cocina Contemporánea de Autor");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const chefStyles = [
    { value: "Alta Cocina Contemporánea de Autor", label: "Contemporáneo de Autor" },
    { value: "Repostería y Pastelería de Vanguardia", label: "Pastelería Vanguardia" },
    { value: "Cocina Rústica Campestre y de Brasa", label: "Rústica de Campaña" },
    { value: "Coctelería de Origen y Mixología Botánica", label: "Mixología de Origen" }
  ];

  const handleToggleProduct = (id: string) => {
    if (selectedProductIds.includes(id)) {
      if (selectedProductIds.length > 1) {
        setSelectedProductIds(selectedProductIds.filter((pId) => pId !== id));
      }
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResponse("");

    const selectedProds = products.filter((p) => selectedProductIds.includes(p.id));
    const productsPayload = selectedProds.map((p) => ({
      name: p.name,
      description: p.description,
      uses: p.gastronomicUses.join(", ")
    }));

    try {
      const res = await fetch("/api/gemini/gastronomy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          products: productsPayload,
          style: chefStyle
        })
      });

      if (!res.ok) {
        throw new Error("No se pudo obtener la recomendación culinaria. Intenta de nuevo.");
      }

      const data = await res.json();
      if (data.success) {
        let text = data.text || "";
        
        // Clean up conversational greetings and fluff from the beginning
        const startPatterns = ["###", "**", "1.", "Maridaje", "Concepto"];
        let bestIndex = -1;
        for (const pattern of startPatterns) {
          const idx = text.indexOf(pattern);
          if (idx !== -1 && (bestIndex === -1 || idx < bestIndex)) {
            bestIndex = idx;
          }
        }
        if (bestIndex > 0 && bestIndex < 400) {
          text = text.substring(bestIndex).trim();
        }
        
        // Clean up conversational outro fluff from the end
        const outroPatterns = ["¡Buen provecho!", "¡Disfrute!", "Espero que", "Que disfrute", "Viva la Chiquitania"];
        for (const pattern of outroPatterns) {
          const idx = text.lastIndexOf(pattern);
          if (idx !== -1 && idx > text.length - 250) {
            text = text.substring(0, idx).trim();
          }
        }

        setResponse(text);
      } else {
        throw new Error(data.error || "Error al procesar la inteligencia artificial.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al conectar con el servidor culinario.");
    } finally {
      setLoading(false);
    }
  };

  // Convert raw markdown to standard JSX styling
  const renderMarkdown = (text: string) => {
    if (!text) return null;

    return text.split("\n").map((line, i) => {
      // Bold Headers
      if (line.startsWith("###")) {
        return (
          <h4 key={i} className="text-sm font-extrabold text-[#0f4c3a] mt-5 border-b border-stone-250 pb-1 mb-2 font-sans tracking-tight">
            {line.replace("###", "").trim()}
          </h4>
        );
      }
      // Subtitles
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={i} className="text-xs font-black text-[#a07c39] mt-2 font-serif">
            {line.replaceAll("**", "").trim()}
          </p>
        );
      }
      // Bullet items
      if (line.startsWith("-")) {
        return (
          <li key={i} className="text-xs ml-4 list-disc text-stone-750 py-0.5 leading-relaxed font-sans">
            {line.replace("-", "").trim()}
          </li>
        );
      }
      // Horizontal ruler
      if (line.trim() === "---") {
        return <hr key={i} className="border-stone-200 my-4" />;
      }
      // Standard line formatting with custom bold highlights
      const formattedLine = line.split("**").map((part, index) => {
        if (index % 2 === 1) {
          return <strong key={index} className="text-[#0f4c3a] font-black">{part}</strong>;
        }
        return part;
      });

      return line.trim() === "" ? (
        <div key={i} className="h-2"></div>
      ) : (
        <p key={i} className="text-xs text-stone-800 leading-relaxed my-1 font-serif">
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <div className="bg-white border border-stone-200 rounded-3xl shadow-xs overflow-hidden">
      {/* Banner */}
      <div className="bg-stone-50 p-5 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="bg-amber-50 text-[#a07c39] p-2 rounded-xl border border-amber-205">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-wider font-extrabold bg-emerald-50 text-emerald-805 px-2.5 py-0.5 rounded-full border border-emerald-100">
                Punto Extra: Inteligencia Artificial
              </span>
            </div>
            <h3 className="text-lg font-black text-stone-900 mt-1">Sugerencia Gastronómica con Gemini AI</h3>
            <p className="text-xs text-stone-600">
              Genera recetas de autor inéditas basadas en productos forestales sostenibles de la Chiquitania.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Control Panel */}
        <div className="p-5 border-r border-stone-200 flex flex-col justify-between bg-white">
          <div>
            <h4 className="text-xs font-black text-[#0f4c3a] uppercase tracking-widest mb-3.5 font-mono">
              1. Selecciona ingredientes silvestres:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-5">
              {products.map((p) => {
                const isSelected = selectedProductIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    id={`chef-product-chk-${p.id}`}
                    onClick={() => handleToggleProduct(p.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${isSelected
                        ? "bg-[#eef6f2] border-emerald-500/80 ring-1 ring-emerald-500/20"
                        : "bg-white border-stone-200 text-stone-600 hover:border-stone-400"
                      }`}
                  >
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="mt-0.5 rounded border-stone-300 text-emerald-700 focus:ring-emerald-600 accent-emerald-600"
                      />
                      <div>
                        <p className={`text-xs font-bold ${isSelected ? "text-emerald-900" : "text-stone-700"}`}>
                          {p.name}
                        </p>
                        <p className="text-[10px] text-stone-500 truncate max-w-[120px] font-serif italic">
                          {p.scientificName}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <h4 className="text-xs font-black text-[#0f4c3a] uppercase tracking-widest mb-3.5 font-mono">
              2. Elige el estilo del plato:
            </h4>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {chefStyles.map((style) => (
                <button
                  key={style.value}
                  id={`chef-style-btn-${style.label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setChefStyle(style.value)}
                  className={`p-2.5 rounded-xl border text-center transition-all text-xs font-bold cursor-pointer ${chefStyle === style.value
                      ? "bg-[#0f4c3a] border-[#0f4c3a] text-white"
                      : "bg-stone-50 border-stone-200 text-stone-750 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <button
            id="chef-submit-btn"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-[#0f4c3a] hover:bg-[#0c3e2f] text-white font-extrabold py-3 px-4 rounded-xl shadow-xs transition-all duration-350 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Chef de la FAN ideando plato...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 fill-current" />
                <span>Generar Creación Gourmet</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Terminal */}
        <div className="p-5 bg-stone-50 min-h-[350px] flex flex-col justify-between border-t md:border-t-0 border-stone-200">
          <div className="overflow-y-auto max-h-[380px] pr-2 custom-scrollbar">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-800 text-xs text-center">
                {error}
              </div>
            )}

            {!response && !loading && !error && (
              <div className="text-center py-10 flex flex-col items-center justify-center">
                <ChefHat className="w-12 h-12 text-stone-300 stroke-1 mb-3" />
                <h5 className="text-sm font-extrabold text-stone-700">¿Listo para innovar en cocina?</h5>
                <p className="text-[11px] text-stone-500 max-w-xs mt-1 leading-relaxed">
                  Elige los ingredientes nativos que quieras combinar, selecciona un estilo culinario y presiona generar. Gemini creará una receta exclusiva y explicará el impacto de sustentabilidad.
                </p>
                <div className="flex items-center gap-1.5 mt-5 text-[10px] bg-emerald-50 text-emerald-805 px-3 py-1 rounded-full border border-emerald-100 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Modelo Recomendado: Gemini 1.5 Flash</span>
                </div>
              </div>
            )}

            {loading && (
              <div className="text-center py-12 flex flex-col items-center">
                <Loader2 className="w-10 h-10 text-[#a07c39] animate-spin mb-3" />
                <span className="text-xs font-semibold text-stone-700">Consultando recetario vivo...</span>
                <p className="text-[10px] text-stone-500 mt-1 max-w-[240px] leading-relaxed">
                  Buscando coincidencias moleculares y tradiciones de la Chiquitania para crear una fusión respetuosa de la biodiversidad.
                </p>
              </div>
            )}

            {response && (
              <div id="chef-response-container" className="prose prose-stone max-w-none">
                {renderMarkdown(response)}
              </div>
            )}
          </div>

          {response && (
            <div className="flex items-center justify-between border-t border-stone-200 pt-3 mt-4 text-[10px] text-stone-500">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-600 fill-current" />
                Innova Hack - Conservación Participativa
              </span>
              <span>Propulsado por Inteligencia Artificial de Google</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
