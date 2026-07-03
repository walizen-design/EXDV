import React, { useState, useMemo } from "react";
import { MODELS_DATA } from "../data";
import { Zap, Gauge, Weight, Sun, Timer, BatteryCharging } from "lucide-react";

interface SpecsSimulatorProps {
  isDarkMode?: boolean;
}

export default function SpecsSimulator({ isDarkMode = true }: SpecsSimulatorProps) {
  const [selectedModelIndex, setSelectedModelIndex] = useState(2); // Default to Pro Max
  const [speed, setSpeed] = useState(50); // km/h
  const [cargoLoad, setCargoLoad] = useState(75); // kg
  const [temperature, setTemperature] = useState(25); // °C
  const [chargingInput, setChargingInput] = useState<"ccs" | "dedicated" | "home">("ccs");

  const selectedModel = MODELS_DATA[selectedModelIndex];

  // Numerical battery capacity estimate in kWh
  const batteryCapacityKWh = useMemo(() => {
    if (selectedModelIndex === 0) return 2.25; // 75V * 30Ah
    if (selectedModelIndex === 1) return 3.24; // 72V * 45Ah
    return 4.5; // 75V * 60Ah
  }, [selectedModelIndex]);

  // Dynamic range calculation based on physical variables
  const computedStats = useMemo(() => {
    const baseKmPerKWh = selectedModel.range / batteryCapacityKWh;

    const r100 = selectedModelIndex === 0 ? 0.4615 : selectedModelIndex === 1 ? 0.50 : 0.5217;
    let speedFactor = 1.0;
    if (speed < 50) {
      const ratio = (50 - speed) / 20;
      speedFactor = 1.0 + ratio * 0.12;
    } else {
      const ratio = (speed - 50) / 50;
      speedFactor = 1.0 - (1.0 - r100) * (ratio * 0.85 + ratio * ratio * 0.15);
    }

    const loadExcess = cargoLoad - 75;
    const loadFactor = 1.0 - (loadExcess / 300) * 0.22;

    let tempFactor = 1.0;
    const isSolidState = selectedModelIndex === 0 || selectedModelIndex === 2;
    
    if (temperature < 25) {
      const coldDelta = (25 - temperature) / 35;
      const maxColdLoss = isSolidState ? 0.12 : 0.28;
      tempFactor = 1.0 - coldDelta * maxColdLoss;
    } else if (temperature > 25) {
      const heatDelta = (temperature - 25) / 20;
      const maxHeatLoss = isSolidState ? 0.03 : 0.08;
      tempFactor = 1.0 - heatDelta * maxHeatLoss;
    }

    const estimatedRange = Math.round(batteryCapacityKWh * baseKmPerKWh * speedFactor * loadFactor * tempFactor);
    const avgPowerConsumption = (speed * (1.1 - speedFactor) * (2 - loadFactor)).toFixed(1);

    // Charge speed simulation
    let chargeMinutes = 180;
    if (chargingInput === "ccs") {
      chargeMinutes = selectedModelIndex === 0 ? 150 : selectedModelIndex === 1 ? 240 : 180;
      if (selectedModelIndex > 0) {
        chargeMinutes = Math.round(chargeMinutes * 0.15);
      }
    } else if (chargingInput === "dedicated") {
      chargeMinutes = selectedModelIndex === 0 ? 40 : selectedModelIndex === 1 ? 30 : 20;
    } else {
      chargeMinutes = selectedModelIndex === 0 ? 150 : selectedModelIndex === 1 ? 300 : 240;
    }

    return {
      range: Math.max(15, estimatedRange),
      consumption: Math.max(0.8, parseFloat(avgPowerConsumption)),
      chargeTimeMinutes: chargeMinutes
    };
  }, [selectedModel, batteryCapacityKWh, speed, cargoLoad, temperature, chargingInput, selectedModelIndex]);

  return (
    <div
      id="specs-simulator"
      className={`p-6 md:p-8 rounded-2xl border shadow-2xl relative overflow-hidden transition-all duration-300 ${
        isDarkMode
          ? "bg-brand-surface border-white/5"
          : "bg-white border-slate-200/80 shadow-slate-100"
      }`}
    >
      {/* Visual background gradient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest block mb-2">Interactive Laboratory</span>
            <h4 className={`text-2xl md:text-3xl font-display font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Real-World <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-cyan/90 to-brand-blue">Telemetry Simulator</span>
            </h4>
            <p className={`text-sm mt-1 ${isDarkMode ? "text-brand-muted" : "text-slate-600"}`}>
              Adjust riding conditions to observe how solid-state & lithium packs adapt dynamically.
            </p>
          </div>

          {/* Model selection buttons */}
          <div className={`flex flex-wrap gap-2 p-1.5 rounded-xl border ${isDarkMode ? "bg-brand-bg border-white/5" : "bg-slate-50 border-slate-200"}`}>
            {MODELS_DATA.map((model, idx) => (
              <button
                key={model.name}
                id={`sim-model-${model.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedModelIndex(idx)}
                className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  selectedModelIndex === idx
                    ? "bg-gradient-to-r from-brand-cyan/20 to-brand-blue/20 text-brand-cyan border border-brand-cyan/30 shadow-[0_0_15px_rgba(0,212,255,0.1)]"
                    : `${isDarkMode ? "text-brand-muted hover:text-white" : "text-slate-600 hover:text-slate-900"} border border-transparent hover:bg-black/5`
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>

          {/* Slider 1: Speed */}
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <label htmlFor="sim-speed" className={`text-xs font-mono font-semibold tracking-wider uppercase flex items-center gap-1.5 ${isDarkMode ? "text-brand-muted" : "text-slate-700"}`}>
                <Gauge className="w-3.5 h-3.5 text-brand-cyan" /> Speed
              </label>
              <span className="text-base font-lcd font-semibold text-brand-cyan">{speed} <span className={`text-[11px] font-mono ${isDarkMode ? "text-brand-muted" : "text-slate-600"}`}>km/h</span></span>
            </div>
            <input
              id="sim-speed"
              type="range"
              min="30"
              max={selectedModel.topSpeed}
              value={speed}
              aria-label="Speed slider"
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full focus:outline-none"
            />
            <div className={`flex justify-between text-[11px] font-mono ${isDarkMode ? "text-brand-muted/60" : "text-slate-500"}`}>
              <span>Eco (30 km/h)</span>
              <span>Sport</span>
              <span>Max ({selectedModel.topSpeed} km/h)</span>
            </div>
          </div>

          {/* Slider 2: Passenger & Cargo Load */}
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <label htmlFor="sim-load" className={`text-xs font-mono font-semibold tracking-wider uppercase flex items-center gap-1.5 ${isDarkMode ? "text-brand-muted" : "text-slate-700"}`}>
                <Weight className="w-3.5 h-3.5 text-brand-cyan" /> Passenger & Cargo Load
              </label>
              <span className="text-base font-lcd font-semibold text-brand-cyan">{cargoLoad} <span className={`text-[11px] font-mono ${isDarkMode ? "text-brand-muted" : "text-slate-600"}`}>kg</span></span>
            </div>
            <input
              id="sim-load"
              type="range"
              min="75"
              max={selectedModel.maxLoad}
              value={cargoLoad}
              aria-label="Load slider"
              onChange={(e) => setCargoLoad(Number(e.target.value))}
              className="w-full focus:outline-none"
            />
            <div className={`flex justify-between text-[11px] font-mono ${isDarkMode ? "text-brand-muted/60" : "text-slate-500"}`}>
              <span>Solo Rider (75 kg)</span>
              <span>With Passenger</span>
              <span>Max Capacity ({selectedModel.maxLoad} kg)</span>
            </div>
          </div>

          {/* Slider 3: Ambient Temperature */}
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <label htmlFor="sim-temp" className={`text-xs font-mono font-semibold tracking-wider uppercase flex items-center gap-1.5 ${isDarkMode ? "text-brand-muted" : "text-slate-700"}`}>
                <Sun className="w-3.5 h-3.5 text-brand-cyan" /> Ambient Temperature
              </label>
              <span className="text-base font-lcd font-semibold text-brand-cyan">{temperature} <span className={`text-[11px] font-mono ${isDarkMode ? "text-brand-muted" : "text-slate-600"}`}>°C</span></span>
            </div>
            <input
              id="sim-temp"
              type="range"
              min="-10"
              max="45"
              value={temperature}
              aria-label="Temperature slider"
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full focus:outline-none"
            />
            <div className={`flex justify-between text-[11px] font-mono ${isDarkMode ? "text-brand-muted/60" : "text-slate-500"}`}>
              <span>Sub-Zero Winter (-10°C)</span>
              <span>Optimal (25°C)</span>
              <span>Extreme Heat (45°C)</span>
            </div>
          </div>

          {/* Charging Method Selector */}
          <div className="mt-2 space-y-2">
            <span className={`text-xs font-mono font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-1.5 ${isDarkMode ? "text-brand-muted" : "text-slate-700"}`}>
              <BatteryCharging className="w-3.5 h-3.5 text-brand-cyan" /> Choose Charging Method
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                id="charge-method-ccs"
                onClick={() => setChargingInput("ccs")}
                className={`px-3 py-2 rounded-lg text-left text-xs transition-all border cursor-pointer focus:ring-2 focus:ring-brand-cyan/50 focus:outline-none ${
                  chargingInput === "ccs"
                    ? "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/40"
                    : `${isDarkMode ? "bg-brand-bg/50 text-brand-muted border-transparent hover:border-white/5 hover:text-white" : "bg-slate-100 text-slate-600 border-transparent hover:border-slate-200"}`
                }`}
              >
                <div className="font-semibold text-[11px] sm:text-xs">CCS Car Pile</div>
                <div className="text-[10px] opacity-70 mt-0.5 font-mono">DC Quick</div>
              </button>
              <button
                id="charge-method-dedicated"
                onClick={() => setChargingInput("dedicated")}
                className={`px-3 py-2 rounded-lg text-left text-xs transition-all border cursor-pointer focus:ring-2 focus:ring-brand-cyan/50 focus:outline-none ${
                  chargingInput === "dedicated"
                    ? "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/40"
                    : `${isDarkMode ? "bg-brand-bg/50 text-brand-muted border-transparent hover:border-white/5 hover:text-white" : "bg-slate-100 text-slate-600 border-transparent hover:border-slate-200"}`
                }`}
              >
                <div className="font-semibold text-[11px] sm:text-xs">HECHHI Pile</div>
                <div className="text-[10px] opacity-70 mt-0.5 font-mono">Dedicated</div>
              </button>
              <button
                id="charge-method-home"
                onClick={() => setChargingInput("home")}
                className={`px-3 py-2 rounded-lg text-left text-xs transition-all border cursor-pointer focus:ring-2 focus:ring-brand-cyan/50 focus:outline-none ${
                  chargingInput === "home"
                    ? "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/40"
                    : `${isDarkMode ? "bg-brand-bg/50 text-brand-muted border-transparent hover:border-white/5 hover:text-white" : "bg-slate-100 text-slate-600 border-transparent hover:border-slate-200"}`
                }`}
              >
                <div className="font-semibold text-[11px] sm:text-xs">220V Home</div>
                <div className="text-[10px] opacity-70 mt-0.5 font-mono">Portable AC</div>
              </button>
            </div>
          </div>
        </div>

        {/* Output Panel & High-tech Radar HUD (Redesigned with LCD fonts, Grid overlay, depth borders) */}
        <div className={`lg:col-span-5 border rounded-2xl p-6 flex flex-col justify-between gap-6 relative transition-all duration-300 ${
          isDarkMode 
            ? "bg-gradient-to-b from-[#0e172a]/95 to-[#0b0f19]/95 border-brand-cyan/15 shadow-2xl shadow-black/80" 
            : "bg-slate-50 border-slate-300 shadow-xl"
        }`}>
          {/* Coordinating Depth Borders */}
          <div className="absolute top-1 right-1 bottom-1 left-1 border border-dashed border-brand-cyan/5 rounded-xl pointer-events-none" />

          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-emerald-500/20 z-10">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Telemetry HUD
          </div>

          <div className="space-y-5 z-10">
            {/* Range output */}
            <div className={`border-b pb-4 ${isDarkMode ? "border-brand-cyan/10" : "border-slate-200"}`}>
              <span className={`text-[10px] font-mono tracking-widest uppercase block mb-1 ${isDarkMode ? "text-brand-cyan/80" : "text-slate-700"}`}>Estimated True Range</span>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-5xl md:text-6xl font-lcd tracking-normal font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${selectedModelIndex === 2 ? 'from-rose-500 to-amber-500' : 'from-brand-cyan to-brand-blue'} animate-pulse`}>
                  {computedStats.range}
                </span>
                <span className="text-lg font-lcd font-bold text-brand-cyan">KM</span>
              </div>
              <p className={`text-[11px] leading-relaxed mt-2 ${isDarkMode ? "text-brand-muted" : "text-slate-600"}`}>
                Derived dynamically from a {batteryCapacityKWh} kWh solid-state cluster. Standard rated range: <strong className={isDarkMode ? "text-white" : "text-slate-800"}>{selectedModel.range} KM</strong>.
              </p>
            </div>

            {/* HIGH-TECH RADAR WIDGET (Aesthetic holographic center) */}
            <div className={`relative w-full h-32 rounded-xl overflow-hidden border ${
              isDarkMode ? "bg-black/60 border-brand-cyan/10" : "bg-white border-slate-200"
            }`}>
              {/* Radar Coordinate Grid */}
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(0,240,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.2)_1px,transparent_1px)] bg-[size:10px_10px]" />
              
              {/* Concentric rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-24 h-24 rounded-full border border-dashed flex items-center justify-center ${isDarkMode ? "border-brand-cyan/20" : "border-brand-cyan/40"}`}>
                  <div className={`w-14 h-14 rounded-full border flex items-center justify-center ${isDarkMode ? "border-brand-cyan/15" : "border-brand-cyan/35"}`}>
                    <div className={`w-6 h-6 rounded-full border ${isDarkMode ? "border-brand-cyan/10" : "border-brand-cyan/25"}`} />
                  </div>
                </div>
              </div>

              {/* Crosshair lines */}
              <div className={`absolute inset-x-0 top-1/2 h-[1px] ${isDarkMode ? "bg-brand-cyan/15" : "bg-brand-cyan/30"}`} />
              <div className={`absolute inset-y-0 left-1/2 w-[1px] ${isDarkMode ? "bg-brand-cyan/15" : "bg-brand-cyan/30"}`} />

              {/* Sweeping scan lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-[spin_4s_linear_infinite]">
                <div className="w-24 h-24 rounded-full overflow-hidden relative">
                  <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-gradient-to-tr from-brand-cyan/25 to-transparent origin-top-left -translate-y-full -translate-x-full rotate-[45deg]" />
                </div>
              </div>

              {/* Active flashing cell clusters */}
              <div className="absolute top-1/4 left-1/4">
                <span className="absolute inline-flex h-2 w-2 rounded-full bg-brand-cyan opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-cyan" />
                <span className={`absolute ml-2.5 -mt-1 text-[8px] font-mono tracking-tighter ${isDarkMode ? "text-brand-cyan/80" : "text-brand-cyan"}`}>BAT_P1</span>
              </div>
              <div className="absolute bottom-1/4 right-1/4">
                <span className="absolute inline-flex h-2 w-2 rounded-full bg-brand-blue opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-blue" />
                <span className={`absolute ml-2.5 -mt-1 text-[8px] font-mono tracking-tighter ${isDarkMode ? "text-brand-blue" : "text-brand-blue"}`}>BAT_P2</span>
              </div>

              {/* Real-time scanning telemetry values */}
              <div className="absolute bottom-2 left-3 font-mono text-[9px] text-brand-cyan font-semibold tracking-wider">
                BAL_CELLS: ONLINE
              </div>
              <div className="absolute top-2 left-3 font-mono text-[9px] text-emerald-400 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> AR_HUD_LINK
              </div>
              <div className={`absolute top-2 right-3 font-mono text-[9px] ${isDarkMode ? "text-brand-muted" : "text-slate-600"}`}>
                TEMP: {temperature}°C
              </div>
            </div>

            {/* Simulated charge time */}
            <div className={`border-b pb-4 ${isDarkMode ? "border-brand-cyan/10" : "border-slate-200"}`}>
              <span className={`text-[10px] font-mono tracking-widest uppercase block mb-1 ${isDarkMode ? "text-brand-muted" : "text-slate-700"}`}>Simulated 0-100% Charge</span>
              <div className="flex items-center gap-3">
                <Timer className="w-5 h-5 text-brand-cyan" />
                <span className="text-2xl font-lcd font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">
                  {computedStats.chargeTimeMinutes >= 60
                    ? `${Math.floor(computedStats.chargeTimeMinutes / 60)}h ${computedStats.chargeTimeMinutes % 60 > 0 ? `${computedStats.chargeTimeMinutes % 60}m` : ""}`
                    : `${computedStats.chargeTimeMinutes} Min`}
                </span>
              </div>
              <p className={`text-[11px] leading-relaxed mt-2 ${isDarkMode ? "text-brand-muted" : "text-slate-600"}`}>
                {chargingInput === "ccs" && selectedModelIndex === 0 ? (
                  <span className="text-amber-500 font-semibold text-[10px] uppercase block">⚠️ STANDARD MODEL DOES NOT SUPPORT CCS DC CAR PILES</span>
                ) : (
                  <span>Using {chargingInput === "ccs" ? "Public High-Voltage DC Station" : chargingInput === "dedicated" ? "HECHHI high-power fast charge station" : "standard household 220V socket"}.</span>
                )}
              </p>
            </div>

            {/* Aerodynamic load bar */}
            <div>
              <span className={`text-[10px] font-mono tracking-widest uppercase block mb-1 ${isDarkMode ? "text-brand-muted" : "text-slate-700"}`}>Aerodynamic Load Index</span>
              <div className="flex items-center gap-2">
                <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-slate-950" : "bg-slate-200"}`}>
                  <div
                    className="h-full bg-gradient-to-r from-brand-cyan to-brand-blue transition-all duration-500"
                    style={{ width: `${Math.min(100, (speed / selectedModel.topSpeed) * 100)}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-brand-cyan font-bold">{Math.round((speed / selectedModel.topSpeed) * 100)}%</span>
              </div>
              <p className={`text-[10px] leading-relaxed mt-2 ${isDarkMode ? "text-brand-muted/70" : "text-slate-600"}`}>
                Higher aerodynamic load increases battery drain quadratically. Speed of 50-60 km/h offers maximum physical range.
              </p>
            </div>
          </div>

          <div className={`p-3 rounded-lg border text-[11px] font-mono z-10 ${
            isDarkMode ? "bg-slate-950/60 border-brand-cyan/15 text-brand-muted" : "bg-white border-slate-200 text-slate-600"
          }`}>
            <div className="flex justify-between mb-1">
              <span>Model Type:</span>
              <span className="text-brand-cyan font-semibold">{selectedModel.name} ({selectedModel.class})</span>
            </div>
            <div className="flex justify-between">
              <span>Motor Rating:</span>
              <span className={isDarkMode ? "text-white" : "text-slate-800"}>{selectedModel.motorType}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
