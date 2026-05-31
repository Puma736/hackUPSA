import { useState, useEffect, useRef } from "react";
import { Info, ArrowRight, ShieldCheck, MapPin, ExternalLink, ChevronRight, Globe } from "lucide-react";
import { Product } from "../types";

declare global {
  interface Window { L?: any }
}

interface InteractiveMapProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
  onChangeTab?: (tab: "home" | "catalog" | "map" | "chef" | "admin") => void;
}

// Load Leaflet (CSS + JS) from CDN once, resolve when window.L is available.
let leafletPromise: Promise<any> | null = null;
function loadLeaflet(): Promise<any> {
  if (typeof window !== "undefined" && window.L) return Promise.resolve(window.L);
  if (leafletPromise) return leafletPromise;
  leafletPromise = new Promise((resolve, reject) => {
    const cssId = "leaflet-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = reject;
    document.body.appendChild(script);
  });
  return leafletPromise;
}

export default function InteractiveMap({ products, selectedProduct, onSelectProduct, onChangeTab }: InteractiveMapProps) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  // keep latest selection accessible inside marker click closures
  const selectedRef = useRef(selectedProduct);
  selectedRef.current = selectedProduct;

  const makeIcon = (L: any, active: boolean) => {
    const size = active ? 40 : 30;
    const color = active ? "#a07c39" : "#0f4c3a";
    return L.divIcon({
      className: "",
      html: `<div style="position:relative;width:${size}px;height:${size}px;${active ? "filter:drop-shadow(0 4px 6px rgba(160,124,57,.45));" : "filter:drop-shadow(0 3px 4px rgba(15,76,58,.35));"}">
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}" stroke="#fff" stroke-width="1.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.6" fill="#fff" stroke="none"/>
        </svg>
      </div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
      popupAnchor: [0, -size + 4]
    });
  };

  // Initialise map once Leaflet is loaded
  useEffect(() => {
    let cancelled = false;
    loadLeaflet().then((L) => {
      if (cancelled || !mapEl.current || mapRef.current) return;

      const map = L.map(mapEl.current, {
        scrollWheelZoom: true,
        zoomControl: true,
        attributionControl: true
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        minZoom: 4,
        attribution: "&copy; OpenStreetMap"
      }).addTo(map);

      // Add marker for each product
      products.forEach((p) => {
        if (typeof p.origin.lat !== "number" || typeof p.origin.lng !== "number") return;
        const marker = L.marker([p.origin.lat, p.origin.lng], {
          icon: makeIcon(L, selectedRef.current ? p.id === selectedRef.current.id : false)
        }).addTo(map);
        marker.bindTooltip(`${p.name} (${p.origin.town})`, { direction: "top", offset: [0, -28], opacity: 0.95 });
        marker.on("click", () => onSelectProduct(p));
        markersRef.current[p.id] = marker;
      });

      // Fit bounds to product coordinates
      const coords = products
        .filter(p => typeof p.origin.lat === "number" && typeof p.origin.lng === "number")
        .map(p => [p.origin.lat, p.origin.lng]);

      if (coords.length > 0) {
        const bounds = L.latLngBounds(coords);
        map.fitBounds(bounds, { padding: [40, 40] });
      } else {
        // Fallback Chiquitania center
        map.setView([-16.5, -61.0], 7);
      }

      setReady(true);
      setTimeout(() => map.invalidateSize(), 200);
    }).catch(() => setFailed(true));

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update marker icons + pan when selection changes
  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    if (!L || !map || !ready) return;

    Object.entries(markersRef.current).forEach(([id, marker]: [string, any]) => {
      marker.setIcon(makeIcon(L, selectedProduct ? id === selectedProduct.id : false));
    });

    if (selectedProduct && typeof selectedProduct.origin.lat === "number" && typeof selectedProduct.origin.lng === "number") {
      map.panTo([selectedProduct.origin.lat, selectedProduct.origin.lng], { animate: true });
    }
  }, [selectedProduct, ready, products]);

  return (
    <div className="bg-white text-stone-800 p-6 rounded-3xl shadow-xs border border-stone-200">
      <div className="mb-5">
        <span className="text-[10px] uppercase tracking-widest text-[#a07c39] font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Exploración de Origen Ecológico
        </span>
        <h3 className="text-xl font-extrabold mt-2 pb-0.5 text-[#0f4c3a]">Mapa de Biodiversidad Chiquitana</h3>
        <p className="text-xs text-stone-550 mt-1">
          Mapa geográfico interactivo: usa la rueda del ratón o los botones + / − para acercar y alejar, y presiona un punto o selecciona un insumo del listado para ver su ubicación de procedencia exacta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ===== Geographic Map (Leaflet) ===== */}
        <div className="lg:col-span-7 rounded-2xl border border-stone-250/70 relative overflow-hidden min-h-[380px] bg-stone-100">
          <div ref={mapEl} className="absolute inset-0 w-full h-full z-0" />

          {!ready && !failed && (
            <div className="absolute inset-0 grid place-items-center text-stone-400 text-xs z-10 pointer-events-none">
              Cargando mapa geográfico…
            </div>
          )}
          {failed && (
            <div className="absolute inset-0 grid place-items-center text-center text-stone-500 text-xs z-10 p-6">
              No se pudo cargar el mapa (sin conexión). Revisa tu internet e inténtalo de nuevo.
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between text-[11px] text-stone-700 bg-white/85 backdrop-blur-sm border-t border-stone-200/80 px-3 py-1.5 z-20">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 bg-[#a07c39] rounded-full inline-block ring-2 ring-amber-200"></span> Insumo Seleccionado
            </span>
            <span>Bosque Seco Chiquitano, Bolivia</span>
          </div>
        </div>

        {/* ===== Product Origin Details ===== */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-stone-50 p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
          {selectedProduct ? (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between border-b border-stone-200 pb-3 mb-3">
                  <div>
                    <h4 className="font-extrabold text-lg text-[#0f4c3a]">{selectedProduct.name}</h4>
                    <p className="text-[10px] text-stone-500 font-serif italic mt-0.5">{selectedProduct.scientificName}</p>
                    <p className="text-[11px] text-stone-500 font-sans mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#a07c39]" />
                      {selectedProduct.origin.town}, {selectedProduct.origin.department}
                    </p>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                </div>

                <p className="text-xs text-stone-750 leading-relaxed mb-4">
                  {selectedProduct.description}
                </p>

                {/* Google Maps link block */}
                {selectedProduct.origin.mapsUrl && (
                  <div className="mb-4">
                    <a
                      href={selectedProduct.origin.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-850 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Ver ubicación exacta en Google Maps
                    </a>
                  </div>
                )}

                {/* Contact info */}
                {selectedProduct.contacts.length > 0 && (
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs">
                    <p className="font-bold text-[#a07c39] uppercase tracking-wider text-[9px] mb-1.5 font-mono">Coordinador de Suministro Directo:</p>
                    <p className="font-bold text-stone-900">{selectedProduct.contacts[0].name}</p>
                    <p className="text-stone-500 italic text-[11px] mt-0.5">{selectedProduct.contacts[0].role}</p>
                    <p className="font-mono text-stone-700 mt-1 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-[#0f4c3a]" />
                      {selectedProduct.contacts[0].phone} ({selectedProduct.contacts[0].location})
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  if (onChangeTab) onChangeTab("catalog");
                }}
                className="w-full mt-4 bg-white hover:bg-stone-100 text-[#0f4c3a] font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#0f4c3a]/30 shadow-2xs"
              >
                Ver Ficha Técnica Completa <ChevronRight className="w-4 h-4 text-[#0f4c3a]" />
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-6 border border-dashed border-stone-300 rounded-xl bg-white min-h-[220px]">
              <MapPin className="w-10 h-10 text-stone-400 mb-2 stroke-[1.5]" />
              <h4 className="text-xs font-bold text-stone-700">Explora la procedencia</h4>
              <p className="text-[11px] text-stone-500 mt-1">
                Haz clic en cualquier pin en el mapa o selecciona un producto de la lista a continuación para ver su origen exacto en el bosque chiquitano.
              </p>
            </div>
          )}

          {/* ===== List of all products to navigate quickly ===== */}
          <div className="border-t border-stone-200 pt-3.5">
            <h5 className="text-[9.5px] font-bold uppercase tracking-wider text-stone-500 block mb-2 font-mono">
              Insumos del Bosque Chiquitano:
            </h5>
            <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1.5 custom-scrollbar">
              {products.map(prod => {
                const isSelected = selectedProduct?.id === prod.id;
                return (
                  <button
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0f4c3a]/10 border-[#0f4c3a] text-[#0f4c3a] font-bold shadow-2xs"
                        : "bg-white border-stone-200 hover:border-stone-300 text-stone-700"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold block">{prod.name}</span>
                      <span className="text-[9.5px] text-stone-500 font-serif italic block mt-0.5">{prod.origin.town}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "text-[#0f4c3a] translate-x-0.5" : "text-stone-400"}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
