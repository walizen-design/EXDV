import React, { useState } from "react";
import { ModelSpecs } from "../types";
import { ChevronDown, Sparkles, Scale, Disc, Cpu, ShieldAlert, Layers } from "lucide-react";

interface SpecsDetailCardProps {
  model: ModelSpecs;
}

export default function SpecsDetailCard({ model }: SpecsDetailCardProps) {
  const [selectedColor, setSelectedColor] = useState(model.colors[0]);
  const [openAccordion, setOpenAccordion] = useState<string>("powertrain");

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? "" : id);
  };

  // Synchronize color selection when model changes
  React.useEffect(() => {
    setSelectedColor(model.colors[0]);
  }, [model]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Visual Color Customizer / Blueprint Frame (Col-span 5) */}
      <div className="lg:col-span-5 bg-brand-surface rounded-2xl border border-white/5 p-6 flex flex-col justify-between gap-6 relative overflow-hidden h-full">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <div className="relative z-10">
          <span className="text-xs font-mono text-brand-cyan tracking-widest uppercase block mb-1">
            Dynamic Configurator
          </span>
          <h4 className="text-xl font-display font-bold text-white tracking-tight">
            Chassis & Accent Palette
          </h4>
          <p className="text-xs text-brand-muted mt-1">
            Select standard Zhejiang manufacturing colors to visualize the alloy chassis and frame.
          </p>
        </div>

        {/* Blueprint Visual mockup representation of the motorcycle */}
        <div className="relative z-10 w-full h-56 flex flex-col items-center justify-center my-4 border border-white/5 bg-brand-bg/80 rounded-xl overflow-hidden group">
          {/* Subtle neon glowing aura behind */}
          <div
            className="absolute w-44 h-24 rounded-full blur-3xl opacity-30 transition-all duration-700 pointer-events-none"
            style={{ backgroundColor: selectedColor.hex }}
          />

          {/* Interactive vector sketch of the E-XDV Adventure Motorcycle */}
          <div className="relative w-full max-w-[280px] h-36 flex items-center justify-center">
            {/* Rear wheel */}
            <div className="absolute left-4 bottom-2 w-14 h-14 rounded-full border-4 border-brand-muted/20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-brand-muted/30 animate-spin" style={{ animationDuration: "12s" }} />
            </div>

            {/* Front wheel */}
            <div className="absolute right-4 bottom-2 w-16 h-16 rounded-full border-4 border-brand-muted/20 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-brand-muted/30 animate-spin" style={{ animationDuration: "10s" }} />
            </div>

            {/* Swingarm / Belt Drive line */}
            <div className="absolute left-10 bottom-6 w-16 h-1.5 bg-brand-muted/40 rounded-full" />

            {/* Battery Core block (Colorized) */}
            <div
              className="absolute left-20 bottom-8 w-16 h-12 rounded-lg border border-white/10 flex flex-col items-center justify-center transition-all duration-500 shadow-lg"
              style={{ backgroundColor: selectedColor.hex === "#1a1a1a" ? "#222" : selectedColor.hex }}
            >
              <span className="text-[7px] font-mono font-bold text-white tracking-widest uppercase">75V PACK</span>
              <div className="w-8 h-1 bg-brand-cyan/80 mt-1 rounded animate-pulse" />
            </div>

            {/* Frame lines overlay (Blueprint feel) */}
            <svg className="absolute inset-0 w-full h-full text-brand-muted/20" viewBox="0 0 100 100" fill="none">
              <path d="M 30 75 L 50 45 L 75 45 L 82 72" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 50 45 L 35 30 L 22 45" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 75 45 L 68 20 L 52 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            {/* Front Upside-down Forks (Cyan highlighted or standard) */}
            <div className="absolute right-12 bottom-4 w-2 h-24 bg-brand-muted/30 origin-bottom rotate-12 rounded-full" />
            <div className="absolute right-11 bottom-6 w-1 h-20 bg-brand-cyan/40 origin-bottom rotate-12 rounded-full animate-pulse" />

            {/* Windscreen / Handlebars */}
            <div className="absolute right-16 top-4 w-4 h-1.5 bg-brand-muted/60 rounded" />
            <div className="absolute right-14 top-1 w-1.5 h-6 bg-brand-cyan/20 origin-bottom -rotate-12 rounded-t" />

            {/* Dynamic model badge */}
            <div className="absolute top-2 left-2 bg-brand-bg/90 border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-brand-cyan uppercase tracking-widest">
              {model.name} FRAME
            </div>
          </div>

          <div className="absolute bottom-2 text-center">
            <span className="text-[10px] font-mono text-brand-muted">
              Visualizing <strong className="text-white">{selectedColor.name}</strong> Alloy Frame Accents
            </span>
          </div>
        </div>

        {/* Color Swatch list */}
        <div className="space-y-3">
          <span className="text-[11px] font-mono tracking-widest text-brand-muted uppercase block">
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
                    ? "bg-brand-bg border-brand-cyan/40 text-brand-cyan shadow-sm"
                    : "bg-brand-bg/40 border-transparent text-brand-muted hover:text-white hover:border-white/5"
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
        <div className="bg-brand-surface border border-white/5 rounded-xl overflow-hidden transition-all duration-300">
          <button
            id="acc-powertrain"
            onClick={() => toggleAccordion("powertrain")}
            className="w-full flex items-center justify-between p-4 text-left text-sm font-display font-semibold text-white hover:bg-white/[0.02] transition-colors"
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
              openAccordion === "powertrain" ? "max-h-[500px] border-t border-white/5 p-4" : "max-h-0 overflow-hidden"
            }`}
          >
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Motor Technology</span>
                <span className="text-white font-medium">{model.motorType}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Rated / Peak Power Output</span>
                <span className="text-brand-cyan font-bold">{model.peakPower} kW</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Removable Battery Module</span>
                <span className="text-white font-medium">{model.batterySpecs}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Charger Design</span>
                <span className="text-white font-medium">{model.chargerType}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Charge Duration (0-100%)</span>
                <span className="text-brand-cyan font-bold">{model.chargeTime}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-brand-muted">Tested Range Portfolio</span>
                <span className="text-white font-mono text-[11px]">
                  {model.range}km @ 50km/h · {model.topSpeed === 130 ? "120" : model.topSpeed === 115 ? "90" : "60"}km @ 100km/h
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 2: Dimensions */}
        <div className="bg-brand-surface border border-white/5 rounded-xl overflow-hidden transition-all duration-300">
          <button
            id="acc-dimensions"
            onClick={() => toggleAccordion("dimensions")}
            className="w-full flex items-center justify-between p-4 text-left text-sm font-display font-semibold text-white hover:bg-white/[0.02] transition-colors"
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
              openAccordion === "dimensions" ? "max-h-[500px] border-t border-white/5 p-4" : "max-h-0 overflow-hidden"
            }`}
          >
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Chassis Footprint (L x W x H)</span>
                <span className="text-white font-medium">{model.dimensions}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Net / Gross Shipping Weight</span>
                <span className="text-white font-medium">{model.weightNetGross}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Wheelbase Clearance</span>
                <span className="text-white font-medium">{model.wheelbase} mm</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Ground Clearance</span>
                <span className="text-white font-medium">{model.groundClearance} mm</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Saddle Height (Seat Height)</span>
                <span className="text-brand-cyan font-bold">{model.seatHeight} mm</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-brand-muted">Maximum Certified Cargo Capacity</span>
                <span className="text-white font-bold">{model.maxLoad} kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 3: Brakes */}
        <div className="bg-brand-surface border border-white/5 rounded-xl overflow-hidden transition-all duration-300">
          <button
            id="acc-brakes"
            onClick={() => toggleAccordion("brakes")}
            className="w-full flex items-center justify-between p-4 text-left text-sm font-display font-semibold text-white hover:bg-white/[0.02] transition-colors"
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
              openAccordion === "brakes" ? "max-h-[500px] border-t border-white/5 p-4" : "max-h-0 overflow-hidden"
            }`}
          >
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Front & Rear Braking Calipers</span>
                <span className="text-brand-cyan font-bold">{model.brakes}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Suspension Assembly</span>
                <span className="text-white font-medium">{model.suspension}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Tyres Footprint</span>
                <span className="text-white font-medium">{model.tyres}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-brand-muted">Tyre Manufacturer Brand</span>
                <span className="text-brand-cyan font-bold">{model.tyreBrand}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 4: Features */}
        <div className="bg-brand-surface border border-white/5 rounded-xl overflow-hidden transition-all duration-300">
          <button
            id="acc-features"
            onClick={() => toggleAccordion("features")}
            className="w-full flex items-center justify-between p-4 text-left text-sm font-display font-semibold text-white hover:bg-white/[0.02] transition-colors"
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
              openAccordion === "features" ? "max-h-[500px] border-t border-white/5 p-4" : "max-h-0 overflow-hidden"
            }`}
          >
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Smart Vehicle Controller</span>
                <span className="text-white font-medium">{model.smartSystem}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Dashboard Interface Type</span>
                <span className="text-white font-medium">{model.displayType}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Waterproof Protection Level</span>
                <span className="text-brand-cyan font-bold">{model.waterproof}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Tri-Monitor Display Array</span>
                <span className="text-white font-medium">{model.hasTriMonitor ? "Equipped (Yes)" : "Not Available (No)"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Dual Camera Track Recording</span>
                <span className="text-white font-medium">{model.hasCameras ? "Integrated (Yes)" : "Not Available (No)"}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-brand-muted">Keyless System / Windscreen / USB</span>
                <span className="text-white font-bold">Standard Features (Yes)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 5: Logistics & Shipping */}
        <div className="bg-brand-surface border border-white/5 rounded-xl overflow-hidden transition-all duration-300">
          <button
            id="acc-logistics"
            onClick={() => toggleAccordion("logistics")}
            className="w-full flex items-center justify-between p-4 text-left text-sm font-display font-semibold text-white hover:bg-white/[0.02] transition-colors"
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
              openAccordion === "logistics" ? "max-h-[500px] border-t border-white/5 p-4" : "max-h-0 overflow-hidden"
            }`}
          >
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Standard 40HQ Load Capacity</span>
                <span className="text-brand-cyan font-bold">{model.loadingCapacity}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-brand-muted">Packaging Safety standards</span>
                <span className="text-white font-medium">Standard Heavy Iron Cage + Carton</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-brand-muted">Global Certifications Passed</span>
                <span className="text-emerald-400 font-bold">CE, EEC, EPA, DOT, ISO9001, ROHS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
