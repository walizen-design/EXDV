import React, { useState } from "react";
import { ModelSpecs } from "../types";
import { ChevronDown, Sparkles, Scale, Disc, Cpu, ShieldAlert, Layers } from "lucide-react";

interface SpecsDetailCardProps {
  model: ModelSpecs;
  isDarkMode?: boolean;
}

export default function SpecsDetailCard({ model, isDarkMode = true }: SpecsDetailCardProps) {
  const [selectedColor, setSelectedColor] = useState(model.colors[0]);
  const [openAccordion, setOpenAccordion] = useState<string>("powertrain");

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? "" : id);
  };

  // Synchronize color selection when model changes
  React.useEffect(() => {
    setSelectedColor(model.colors[0]);
  }, [model]);

  // Theme variable styles
  const textTitle = isDarkMode ? "text-white" : "text-slate-900";
  const textMain = isDarkMode ? "text-white" : "text-slate-800";
  const textMuted = isDarkMode ? "text-brand-muted" : "text-slate-700";
  const borderLight = isDarkMode ? "border-white/5" : "border-slate-200/85";
  const borderMedium = isDarkMode ? "border-white/10" : "border-slate-300";
  const bgSurface = isDarkMode ? "bg-brand-surface" : "bg-white";
  const bgBg = isDarkMode ? "bg-brand-bg/80" : "bg-slate-50";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Visual Color Customizer / Blueprint Frame (Col-span 5) */}
      <div className={`lg:col-span-5 rounded-2xl border p-6 flex flex-col justify-between gap-6 relative overflow-hidden h-full transition-all duration-300 ${bgSurface} ${borderLight}`}>
        {/* Subtle grid pattern background */}
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none ${isDarkMode ? "opacity-100" : "opacity-30"}`} />

        <div className="relative z-10">
          <span className="text-xs font-mono text-brand-cyan tracking-widest uppercase block mb-1">
            Dynamic Configurator
          </span>
          <h4 className={`text-xl font-display font-bold tracking-tight ${textTitle}`}>
            Chassis & Accent Palette
          </h4>
          <p className={`text-xs mt-1 ${textMuted}`}>
            Select standard Zhejiang manufacturing colors to visualize the alloy chassis and frame.
          </p>
        </div>

        {/* Blueprint Visual mockup representation of the motorcycle */}
        <div className={`relative z-10 w-full h-56 flex flex-col items-center justify-center my-4 border rounded-xl overflow-hidden group transition-all duration-300 ${bgBg} ${borderLight}`}>
          {/* Subtle neon glowing aura behind */}
          <div
            className="absolute w-44 h-24 rounded-full blur-3xl opacity-30 transition-all duration-700 pointer-events-none"
            style={{ backgroundColor: selectedColor.hex }}
          />

          {/* Interactive vector sketch of the E-XDV Adventure Motorcycle */}
          <div className="relative w-full max-w-[280px] h-36 flex items-center justify-center">
            {/* Rear wheel */}
            <div className={`absolute left-4 bottom-2 w-14 h-14 rounded-full border-4 ${isDarkMode ? "border-brand-muted/20" : "border-slate-300/60"} flex items-center justify-center`}>
              <div className={`w-10 h-10 rounded-full border-2 border-dashed ${isDarkMode ? "border-brand-muted/30" : "border-slate-400/40"} animate-spin`} style={{ animationDuration: "12s" }} />
            </div>

            {/* Front wheel */}
            <div className={`absolute right-4 bottom-2 w-16 h-16 rounded-full border-4 ${isDarkMode ? "border-brand-muted/20" : "border-slate-300/60"} flex items-center justify-center`}>
              <div className={`w-12 h-12 rounded-full border-2 border-dashed ${isDarkMode ? "border-brand-muted/30" : "border-slate-400/40"} animate-spin`} style={{ animationDuration: "10s" }} />
            </div>

            {/* Swingarm / Belt Drive line */}
            <div className={`absolute left-10 bottom-6 w-16 h-1.5 rounded-full ${isDarkMode ? "bg-brand-muted/40" : "bg-slate-300"}`} />

            {/* Battery Core block (Colorized) */}
            <div
              className={`absolute left-20 bottom-8 w-16 h-12 rounded-lg border flex flex-col items-center justify-center transition-all duration-500 shadow-lg ${borderMedium}`}
              style={{ backgroundColor: selectedColor.hex === "#1a1a1a" ? "#222" : selectedColor.hex }}
            >
              <span className="text-[7px] font-mono font-bold text-white tracking-widest uppercase">75V PACK</span>
              <div className="w-8 h-1 bg-brand-cyan/80 mt-1 rounded animate-pulse" />
            </div>

            {/* Frame lines overlay (Blueprint feel) */}
            <svg className={`absolute inset-0 w-full h-full ${isDarkMode ? "text-brand-muted/20" : "text-slate-400/20"}`} viewBox="0 0 100 100" fill="none">
              <path d="M 30 75 L 50 45 L 75 45 L 82 72" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 50 45 L 35 30 L 22 45" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 75 45 L 68 20 L 52 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            {/* Front Upside-down Forks (Cyan highlighted or standard) */}
            <div className={`absolute right-12 bottom-4 w-2 h-24 origin-bottom rotate-12 rounded-full ${isDarkMode ? "bg-brand-muted/30" : "bg-slate-300"}`} />
            <div className="absolute right-11 bottom-6 w-1 h-20 bg-brand-cyan/40 origin-bottom rotate-12 rounded-full animate-pulse" />

            {/* Windscreen / Handlebars */}
            <div className={`absolute right-16 top-4 w-4 h-1.5 rounded ${isDarkMode ? "bg-brand-muted/60" : "bg-slate-400"}`} />
            <div className="absolute right-14 top-1 w-1.5 h-6 bg-brand-cyan/20 origin-bottom -rotate-12 rounded-t" />

            {/* Dynamic model badge */}
            <div className={`absolute top-2 left-2 border px-2 py-0.5 rounded text-[8px] font-mono text-brand-cyan uppercase tracking-widest ${isDarkMode ? "bg-brand-bg/90 border-white/10" : "bg-white border-slate-200"}`}>
              {model.name} FRAME
            </div>
          </div>

          <div className="absolute bottom-2 text-center">
            <span className={`text-[10px] font-mono ${textMuted}`}>
              Visualizing <strong className={textMain}>{selectedColor.name}</strong> Alloy Frame Accents
            </span>
          </div>
        </div>

        {/* Color Swatch list */}
        <div className="space-y-3">
          <span className={`text-[11px] font-mono tracking-widest uppercase block ${textMuted}`}>
            Factory Painted Colors
          </span>
          <div className="grid grid-cols-2 gap-2">
            {model.colors.map((col) => (
              <button
                key={col.name}
                id={`swatch-${col.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedColor(col)}
                className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold tracking-wide transition-all border text-left ${
                  selectedColor.name === col.name
                    ? "bg-brand-cyan/10 border-brand-cyan/40 text-brand-cyan shadow-sm font-bold"
                    : `${isDarkMode ? "bg-brand-bg/40 border-transparent text-brand-muted hover:text-white hover:border-white/5" : "bg-slate-100 border-transparent text-slate-600 hover:bg-slate-200 hover:text-slate-950"}`
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-white/20 shadow-inner flex-shrink-0"
                  style={{ backgroundColor: col.hex }}
                />
                <span className="truncate">{col.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accordions Detail Panels (Col-span 7) */}
      <div className="lg:col-span-7 flex flex-col gap-3">
        {/* Accordion 1: Powertrain */}
        <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${bgSurface} ${borderLight}`}>
          <button
            id="acc-powertrain"
            onClick={() => toggleAccordion("powertrain")}
            className={`w-full flex items-center justify-between p-4 text-left text-sm font-display font-semibold transition-colors ${textTitle} hover:bg-black/[0.02] dark:hover:bg-white/[0.02]`}
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand-cyan" />
              Powertrain & Battery Specifications
            </span>
            <ChevronDown
              className={`w-4 h-4 text-brand-muted transition-transform duration-300 ${
                openAccordion === "powertrain" ? "rotate-180" : ""
              }`}
            />
          </button>
          
          <div
            className={`transition-all duration-300 ease-in-out ${
              openAccordion === "powertrain" ? `max-h-[500px] border-t p-4 ${borderLight}` : "max-h-0 overflow-hidden"
            }`}
          >
            <div className="space-y-3 font-sans text-xs">
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Motor Technology</span>
                <span className={`font-medium ${textMain}`}>{model.motorType}</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Rated / Peak Power Output</span>
                <span className="text-brand-cyan font-bold">{model.peakPower} kW</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Removable Battery Module</span>
                <span className={`font-medium ${textMain}`}>{model.batterySpecs}</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Charger Design</span>
                <span className={`font-medium ${textMain}`}>{model.chargerType}</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Charge Duration (0-100%)</span>
                <span className="text-brand-cyan font-bold">{model.chargeTime}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className={textMuted}>Tested Range Portfolio</span>
                <span className={`font-mono text-[11px] ${textMain}`}>
                  {model.range}km @ 50km/h · {model.topSpeed === 130 ? "120" : model.topSpeed === 115 ? "90" : "60"}km @ 100km/h
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 2: Dimensions */}
        <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${bgSurface} ${borderLight}`}>
          <button
            id="acc-dimensions"
            onClick={() => toggleAccordion("dimensions")}
            className={`w-full flex items-center justify-between p-4 text-left text-sm font-display font-semibold transition-colors ${textTitle} hover:bg-black/[0.02] dark:hover:bg-white/[0.02]`}
          >
            <span className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-brand-cyan" />
              Dimensions, Weight & Load Logistics
            </span>
            <ChevronDown
              className={`w-4 h-4 text-brand-muted transition-transform duration-300 ${
                openAccordion === "dimensions" ? "rotate-180" : ""
              }`}
            />
          </button>
          
          <div
            className={`transition-all duration-300 ease-in-out ${
              openAccordion === "dimensions" ? `max-h-[500px] border-t p-4 ${borderLight}` : "max-h-0 overflow-hidden"
            }`}
          >
            <div className="space-y-3 font-sans text-xs">
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Chassis Footprint (L x W x H)</span>
                <span className={`font-medium ${textMain}`}>{model.dimensions}</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Net / Gross Shipping Weight</span>
                <span className={`font-medium ${textMain}`}>{model.weightNetGross}</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Wheelbase Clearance</span>
                <span className={`font-medium ${textMain}`}>{model.wheelbase} mm</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Ground Clearance</span>
                <span className={`font-medium ${textMain}`}>{model.groundClearance} mm</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Saddle Height (Seat Height)</span>
                <span className="text-brand-cyan font-bold">{model.seatHeight} mm</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className={textMuted}>Maximum Certified Cargo Capacity</span>
                <span className={`font-bold ${textMain}`}>{model.maxLoad} kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 3: Brakes */}
        <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${bgSurface} ${borderLight}`}>
          <button
            id="acc-brakes"
            onClick={() => toggleAccordion("brakes")}
            className={`w-full flex items-center justify-between p-4 text-left text-sm font-display font-semibold transition-colors ${textTitle} hover:bg-black/[0.02] dark:hover:bg-white/[0.02]`}
          >
            <span className="flex items-center gap-2">
              <Disc className="w-4 h-4 text-brand-cyan" />
              Braking, Suspension & Tyre Configuration
            </span>
            <ChevronDown
              className={`w-4 h-4 text-brand-muted transition-transform duration-300 ${
                openAccordion === "brakes" ? "rotate-180" : ""
              }`}
            />
          </button>
          
          <div
            className={`transition-all duration-300 ease-in-out ${
              openAccordion === "brakes" ? `max-h-[500px] border-t p-4 ${borderLight}` : "max-h-0 overflow-hidden"
            }`}
          >
            <div className="space-y-3 font-sans text-xs">
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Front & Rear Braking Calipers</span>
                <span className="text-brand-cyan font-bold">{model.brakes}</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Suspension Assembly</span>
                <span className={`font-medium ${textMain}`}>{model.suspension}</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Tyres Footprint</span>
                <span className={`font-medium ${textMain}`}>{model.tyres}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className={textMuted}>Tyre Manufacturer Brand</span>
                <span className="text-brand-cyan font-bold">{model.tyreBrand}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 4: Features */}
        <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${bgSurface} ${borderLight}`}>
          <button
            id="acc-features"
            onClick={() => toggleAccordion("features")}
            className={`w-full flex items-center justify-between p-4 text-left text-sm font-display font-semibold transition-colors ${textTitle} hover:bg-black/[0.02] dark:hover:bg-white/[0.02]`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              Intelligent Smart Systems & Tech
            </span>
            <ChevronDown
              className={`w-4 h-4 text-brand-muted transition-transform duration-300 ${
                openAccordion === "features" ? "rotate-180" : ""
              }`}
            />
          </button>
          
          <div
            className={`transition-all duration-300 ease-in-out ${
              openAccordion === "features" ? `max-h-[500px] border-t p-4 ${borderLight}` : "max-h-0 overflow-hidden"
            }`}
          >
            <div className="space-y-3 font-sans text-xs">
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Smart Vehicle Controller</span>
                <span className={`font-medium ${textMain}`}>{model.smartSystem}</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Dashboard Interface Type</span>
                <span className={`font-medium ${textMain}`}>{model.displayType}</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Waterproof Protection Level</span>
                <span className="text-brand-cyan font-bold">{model.waterproof}</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Tri-Monitor Display Array</span>
                <span className={`font-medium ${textMain}`}>{model.hasTriMonitor ? "Equipped (Yes)" : "Not Available (No)"}</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Dual Camera Track Recording</span>
                <span className={`font-medium ${textMain}`}>{model.hasCameras ? "Integrated (Yes)" : "Not Available (No)"}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className={textMuted}>Keyless System / Windscreen / USB</span>
                <span className={`font-bold ${textMain}`}>Standard Features (Yes)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 5: Logistics & Shipping */}
        <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${bgSurface} ${borderLight}`}>
          <button
            id="acc-logistics"
            onClick={() => toggleAccordion("logistics")}
            className={`w-full flex items-center justify-between p-4 text-left text-sm font-display font-semibold transition-colors ${textTitle} hover:bg-black/[0.02] dark:hover:bg-white/[0.02]`}
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-cyan" />
              Global Shipping & Container Logistics
            </span>
            <ChevronDown
              className={`w-4 h-4 text-brand-muted transition-transform duration-300 ${
                openAccordion === "logistics" ? "rotate-180" : ""
              }`}
            />
          </button>
          
          <div
            className={`transition-all duration-300 ease-in-out ${
              openAccordion === "logistics" ? `max-h-[500px] border-t p-4 ${borderLight}` : "max-h-0 overflow-hidden"
            }`}
          >
            <div className="space-y-3 font-sans text-xs">
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Standard 40HQ Load Capacity</span>
                <span className="text-brand-cyan font-bold">{model.loadingCapacity}</span>
              </div>
              <div className={`flex justify-between py-1.5 border-b ${borderLight}`}>
                <span className={textMuted}>Packaging Safety standards</span>
                <span className={`font-medium ${textMain}`}>Standard Heavy Iron Cage + Carton</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className={textMuted}>Global Certifications Passed</span>
                <span className="text-emerald-400 font-bold">CE, EEC, EPA, DOT, ISO9001, ROHS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
