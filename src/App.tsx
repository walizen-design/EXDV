import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MODELS_DATA,
  CHARGING_SOLUTIONS,
  STORY_BLOCKS,
  CERTIFICATIONS
} from "./data";
import SpecsSimulator from "./components/SpecsSimulator";
import SpecsMatrix from "./components/SpecsMatrix";
import SpecsDetailCard from "./components/SpecsDetailCard";
import ContactForm from "./components/ContactForm";
import {
  Zap,
  Gauge,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Award,
  BookOpen,
  Anchor,
  HelpCircle
} from "lucide-react";

export default function App() {
  const [selectedModelIdx, setSelectedModelIdx] = useState(2); // Pro Max default
  const [showMatrix, setShowMatrix] = useState(false);
  const [copiedContact, setCopiedContact] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  
  const currentModel = MODELS_DATA[selectedModelIdx];

  // Ambient mouse light tracker
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(label);
    setTimeout(() => setCopiedContact(""), 3000);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-cyan/30 selection:text-white font-sans relative overflow-x-hidden">
      
      {/* BACKGROUND ELEMENTS: Carbon weave overlay + grain */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.01)_0_2px,transparent_2px_6px),linear-gradient(-45deg,rgba(255,255,255,0.01)_0_2px,transparent_2px_6px)]" />
        <div className="absolute inset-0 bg-repeat bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.015%22/%3E%3C/svg%3E')]" />
      </div>

      {/* TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-brand-bg/80 border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 text-brand-cyan fill-current" viewBox="0 0 68 40" aria-hidden="true">
            <path d="M0 0 L26 0 L34 10 L42 0 L68 0 L44 28 L34 40 L24 28 Z M28 14 L34 22 L40 14 L34 6 Z" />
          </svg>
          <div>
            <span className="font-display font-black text-lg tracking-wider text-white">HECHHI</span>
            <span className="text-[9px] font-mono tracking-widest text-brand-cyan block -mt-1 uppercase">E-XDV SERIES</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-brand-muted">
          <a href="#flagship-metrics" className="hover:text-brand-cyan transition-colors">Performance</a>
          <a href="#specs-simulator" className="hover:text-brand-cyan transition-colors">Telemetry Simulator</a>
          <a href="#charging-trio" className="hover:text-brand-cyan transition-colors">Charging solutions</a>
          <a href="#easycool-story" className="hover:text-brand-cyan transition-colors">The Story</a>
          <a href="#range-matrix" className="hover:text-brand-cyan transition-colors">Specs Matrix</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact-inquiry"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan font-mono text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>B2B Inquiry</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative pt-12 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10 border-b border-white/5 overflow-hidden"
      >
        {/* Cursor light tracking background glow */}
        <div
          className="absolute w-[60%] h-[50%] rounded-full blur-3xl opacity-15 pointer-events-none transition-all duration-300 bg-gradient-to-r from-brand-cyan to-brand-blue"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: "translate(-50%, -50%)"
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          
          {/* Left Column: Title & Slogan */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-cyan/10 rounded-full border border-brand-cyan/20">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-widest">
                Zhejiang Easycool homologation v3
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-tight tracking-tighter uppercase">
              Uncompromising Speed<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-cyan/90 to-brand-blue animate-pulse">
                Unstoppable Range
              </span>
            </h1>

            <p className="text-sm md:text-base text-brand-muted max-w-xl leading-relaxed">
              Zhejiang Easycool Motorcycle Co., Ltd. presents the HECHHI E-XDV Adventure Crossover series. 
              Engineered with dual removable solid-state parallel battery technology and synchronous mid-mounted mild drive rated for 50,000 km. 
              Export certified with CE, EEC, EPA, DOT, and ISO9001 homologation standards for distribution globally.
            </p>

            {/* Certifications row */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block">
                Export & Homologation Standards
              </span>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATIONS.map((cert) => (
                  <span
                    key={cert}
                    className="text-[10px] font-mono font-bold text-white bg-brand-surface/80 border border-white/10 px-3 py-1.5 rounded-md tracking-wider shadow-sm hover:border-brand-cyan/40 transition-colors"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact-inquiry"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-cyan to-brand-cyan/80 hover:scale-[1.02] text-brand-bg font-bold font-display uppercase text-xs tracking-wider px-6 py-4 rounded-xl shadow-lg shadow-brand-cyan/15 transition-all"
              >
                <span>Request B2B Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#specs-simulator"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono uppercase text-xs tracking-wider px-5 py-4 rounded-xl transition-all"
              >
                <span>Launch Telemetry Lab</span>
              </a>
            </div>
          </div>

          {/* Right Column: Mini Interactive Visual Selector Frame */}
          <div className="lg:col-span-5 bg-brand-surface border border-white/5 rounded-2xl p-6 shadow-2xl relative">
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-brand-cyan/15 text-brand-cyan text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-brand-cyan/20">
              <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse" /> Live Configurator
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-brand-cyan uppercase">
                  Step 01 / Choose Variant
                </span>
                <h3 className="text-xl font-display font-bold text-white mt-1">
                  Configure Your Power
                </h3>
              </div>

              {/* Toggle switch */}
              <div className="flex flex-col gap-2.5">
                {MODELS_DATA.map((model, idx) => (
                  <button
                    key={model.name}
                    id={`hero-model-select-${model.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setSelectedModelIdx(idx)}
                    className={`group w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      selectedModelIdx === idx
                        ? "bg-brand-bg border-brand-cyan/40 text-brand-cyan shadow-lg"
                        : "bg-brand-bg/40 border-transparent text-brand-muted hover:text-white hover:border-white/10 hover:bg-brand-bg/80"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand-muted group-hover:text-brand-cyan/80 block">
                          {model.class} Crossover
                        </span>
                        <span className="text-base font-display font-bold text-white group-hover:text-brand-cyan transition-colors">
                          {model.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-mono font-bold text-brand-cyan">{model.topSpeed} km/h</span>
                        <span className="text-[10px] text-brand-muted block font-mono">{model.range} km Range</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-brand-bg/80 p-4 rounded-xl border border-white/5 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-brand-muted">Motor Spec:</span>
                  <span className="text-white text-right font-medium truncate max-w-[180px]">{currentModel.motorType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Battery Module:</span>
                  <span className="text-white text-right font-medium truncate max-w-[180px]">{currentModel.batterySpecs}</span>
                </div>
                <div className="flex justify-between text-brand-cyan font-bold">
                  <span>Peak Power output:</span>
                  <span>{currentModel.peakPower} kW</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DYNAMIC METRICS SHOWCASE */}
      <section id="flagship-metrics" className="py-16 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest block mb-2">Flagship Telemetry</span>
          <h2 className="text-3xl font-display font-extrabold uppercase text-white tracking-tight">
            High-Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Metrics HUD</span>
          </h2>
          <p className="text-xs text-brand-muted mt-2">
            Zhejiang Easycool Motor Lab certified performance metrics for the selected <strong className="text-brand-cyan">{currentModel.name}</strong>.
          </p>
        </div>

        {/* BENTO STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          {/* Card 1: Top Speed */}
          <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-brand-cyan/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/5 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-cyan/10 transition-colors" />
            <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block mb-3">Peak Speed Rating</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tighter">
                {currentModel.topSpeed}
              </span>
              <span className="text-sm font-mono font-bold text-brand-cyan">km/h</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-brand-muted">Windscreen Up</span>
              <span className="text-brand-cyan font-mono font-bold">Tested max</span>
            </div>
          </div>

          {/* Card 2: Range */}
          <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-brand-cyan/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-blue/10 transition-colors" />
            <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block mb-3">Max Tested Range</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tighter">
                {currentModel.range}
              </span>
              <span className="text-sm font-mono font-bold text-brand-cyan">km</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-brand-muted">@ 50 km/h average</span>
              <span className="text-brand-cyan font-mono font-bold">Tested max</span>
            </div>
          </div>

          {/* Card 3: Acceleration */}
          <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-brand-cyan/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/5 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-cyan/10 transition-colors" />
            <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block mb-3">0-50 km/h Launch</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tighter">
                {currentModel.accel}
              </span>
              <span className="text-sm font-mono font-bold text-brand-cyan">s</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-brand-muted">Mid-mounted belt</span>
              <span className="text-brand-cyan font-mono font-bold">Instant torque</span>
            </div>
          </div>

          {/* Card 4: Peak Power */}
          <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-brand-cyan/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-blue/10 transition-colors" />
            <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block mb-3">Peak Power Output</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tighter">
                {currentModel.peakPower}
              </span>
              <span className="text-sm font-mono font-bold text-brand-cyan">kW</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-brand-muted">Brushless mild drive</span>
              <span className="text-brand-cyan font-mono font-bold">Peak capacity</span>
            </div>
          </div>

        </div>

        {/* Tiny strip facts */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-brand-surface/40 border border-white/5 rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-white/5 font-mono text-xs">
          <div className="p-4 flex justify-between items-center">
            <span className="text-brand-muted">Motor Efficiency:</span>
            <span className="text-white font-bold text-brand-cyan">93% Max</span>
          </div>
          <div className="p-4 flex justify-between items-center">
            <span className="text-brand-muted">Belt Durability:</span>
            <span className="text-white font-bold">50,000 km</span>
          </div>
          <div className="p-4 flex justify-between items-center">
            <span className="text-brand-muted">Waterproof Rating:</span>
            <span className="text-emerald-400 font-bold">IP67 Waterproof</span>
          </div>
          <div className="p-4 flex justify-between items-center">
            <span className="text-brand-muted">Max Discharge current:</span>
            <span className="text-white font-bold">160A Peak</span>
          </div>
        </div>
      </section>

      {/* TELEMETRY LAB SIMULATOR SECTION */}
      <section className="py-12 bg-brand-bg/50 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SpecsSimulator />
        </div>
      </section>

      {/* THREE PATHS TO FULL POWER (CHARGING TRIO) */}
      <section id="charging-trio" className="py-20 max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest block mb-2">Energy homologation</span>
          <h2 className="text-3xl font-display font-extrabold uppercase text-white tracking-tight">
            Three Paths to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Full Power</span>
          </h2>
          <p className="text-xs text-brand-muted mt-2">
            The HECHHI high-voltage architecture allows flexible charging at home or at standard automotive DC fast charging networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHARGING_SOLUTIONS.map((sol) => (
            <div
              key={sol.id}
              className="bg-brand-surface border border-white/5 hover:border-brand-cyan/20 rounded-2xl p-6 flex flex-col justify-between gap-6 relative overflow-hidden group transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                  <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">{sol.num}</span>
                  <span className="text-2xl font-display font-extrabold text-brand-cyan">{sol.timeLabel}</span>
                </div>
                <h3 className="text-lg font-display font-bold text-white uppercase group-hover:text-brand-cyan transition-colors">
                  {sol.title}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {sol.desc}
                </p>
              </div>

              {/* Progress Bar representation */}
              <div>
                <div className="flex justify-between text-[10px] font-mono text-brand-muted/70 mb-1.5">
                  <span>Charge simulated limit</span>
                  <span>{sol.fillPercentage}%</span>
                </div>
                <div className="h-1.5 bg-brand-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-cyan to-brand-blue rounded-full transition-all duration-1000 group-hover:opacity-100"
                    style={{ width: `${sol.fillPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE E-XDV STORY BLOCK */}
      <section id="easycool-story" className="py-20 bg-brand-surface/40 border-y border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Sticky info block */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest block">
                Zhejiang manufacturing craft
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white uppercase leading-tight">
                Built for Riders Who <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Refuse to Compromise</span>
              </h2>
              <div className="w-12 h-1 bg-brand-cyan rounded" />
              <p className="text-sm text-brand-muted leading-relaxed">
                The HECHHI E-XDV journey is structured around removing every engineering limitation from electric motorcycle layouts. 
                Hundreds of motorcycles sold across Europe on the strength of robust mechanical design and European EEC homologation credentials.
              </p>

              <div className="p-4 bg-brand-bg/80 border border-white/5 rounded-xl space-y-2">
                <span className="text-[10px] font-mono font-bold text-brand-cyan uppercase block">
                  Factory Location & Details
                </span>
                <p className="text-xs text-brand-muted leading-relaxed">
                  <strong>Zhejiang Easycool Motorcycle Co., Ltd.</strong> operates from China's premier two-wheeler industrial belt in Taizhou, Zhejiang.
                </p>
              </div>
            </div>

            {/* Right side: Detailed story blocks */}
            <div className="lg:col-span-7 space-y-6">
              {STORY_BLOCKS.map((story) => (
                <div
                  key={story.id}
                  id={`story-block-${story.id}`}
                  className="p-6 bg-brand-surface rounded-xl border border-white/5 hover:border-brand-cyan/20 transition-all group"
                >
                  <span className="text-[10px] font-mono font-bold text-brand-cyan block mb-2 tracking-widest">
                    {story.num}
                  </span>
                  <h4 className="text-base font-display font-bold text-white uppercase group-hover:text-brand-cyan transition-colors mb-3">
                    {story.title}
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {story.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* TABS INTERACTIVE CUSTOMIZER PALETTE & ACCORDIONS */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest block mb-2">Technical Dossier</span>
          <h2 className="text-3xl font-display font-extrabold uppercase text-white tracking-tight">
            Detailed <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Specifications Specs</span>
          </h2>
          <p className="text-xs text-brand-muted mt-2">
            Inspect individual dimensions, brakes, electrical components, and loading safety standards.
          </p>
        </div>

        {/* Model Tabs Selection */}
        <div className="flex border-b border-white/5 mb-8 overflow-x-auto">
          {MODELS_DATA.map((m, idx) => (
            <button
              key={m.name}
              id={`tab-select-${m.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedModelIdx(idx)}
              className={`flex-1 min-w-[180px] text-left p-4 relative transition-colors ${
                selectedModelIdx === idx ? "bg-brand-surface/40" : "hover:bg-brand-surface/20"
              }`}
            >
              <div className="space-y-1">
                <span className={`text-[10px] font-mono uppercase tracking-widest ${
                  selectedModelIdx === idx ? "text-brand-cyan" : "text-brand-muted"
                }`}>
                  {m.class} Variant
                </span>
                <h4 className="text-lg font-display font-bold text-white">{m.name}</h4>
                <span className="text-[10px] font-mono text-brand-muted block">{m.topSpeed} km/h · {m.range} km Range</span>
              </div>
              
              {selectedModelIdx === idx && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-cyan to-brand-blue shadow-[0_2px_15px_rgba(0,212,255,0.4)]" />
              )}
            </button>
          ))}
        </div>

        {/* Interactive Customizer and Accordion details block */}
        <SpecsDetailCard model={currentModel} />
      </section>

      {/* MATRIX COMPARE SECTION */}
      <section id="range-matrix" className="py-20 bg-brand-surface/20 border-t border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest block mb-2">Variant Matrix</span>
            <h2 className="text-3xl font-display font-extrabold uppercase text-white tracking-tight">
              Compare <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">All Models Side-by-Side</span>
            </h2>
            <p className="text-xs text-brand-muted mt-2">
              Browse exact differences in motors, batteries, suspension forks, tyre brands, display systems, and cameras.
            </p>
          </div>

          <SpecsMatrix />
        </div>
      </section>

      {/* EXPORT INQUIRY BUILDER (CONTACT FORM) */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        <ContactForm />
      </section>

      {/* FOOTER & ACCREDITATION INFO */}
      <footer className="border-t border-white/5 bg-brand-bg py-12 px-6 md:px-12 text-xs text-brand-muted">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Col 1: Brand details (Col-span 4) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-brand-cyan fill-current" viewBox="0 0 68 40" aria-hidden="true">
                <path d="M0 0 L26 0 L34 10 L42 0 L68 0 L44 28 L34 40 L24 28 Z M28 14 L34 22 L40 14 L34 6 Z" />
              </svg>
              <span className="font-display font-black text-base text-white tracking-wider uppercase">
                HECHHI
              </span>
            </div>
            <p className="leading-relaxed">
              Zhejiang Easycool Motorcycle Co., Ltd. is a leading high-tech manufacturer of electric two-wheelers, adventure scooters, and custom lithium battery management systems. 
              Delivering craftsmanship and premium aesthetic value to international markets.
            </p>
            <div className="text-[10px] font-mono text-brand-muted/70">
              © {new Date().getFullYear()} Zhejiang Easycool Motorcycle Co., Ltd. All rights reserved.
            </div>
          </div>

          {/* Col 2: Quick Links (Col-span 4) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-brand-muted">
              <a href="#flagship-metrics" className="hover:text-brand-cyan transition-colors">Telemetry HUD</a>
              <a href="#specs-simulator" className="hover:text-brand-cyan transition-colors">Condition Simulator</a>
              <a href="#charging-trio" className="hover:text-brand-cyan transition-colors">CCS Charging</a>
              <a href="#easycool-story" className="hover:text-brand-cyan transition-colors">The Story</a>
              <a href="#range-matrix" className="hover:text-brand-cyan transition-colors">Model Matrix</a>
              <a href="#contact-inquiry" className="hover:text-brand-cyan transition-colors">Contact Hub</a>
            </div>
          </div>

          {/* Col 3: Direct contact details (Col-span 4) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-white uppercase tracking-wider">
              Official Factory Contacts
            </h4>
            <ul className="space-y-3 font-mono text-[11px]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                <span>689# Xin'an South Street, Luqiao District, Taizhou City, Zhejiang Province, China</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <button
                  id="footer-email-copy"
                  onClick={() => handleCopyText("shane@easycool-tech.com", "Email")}
                  className="hover:text-brand-cyan text-left focus:outline-none cursor-pointer"
                >
                  shane@easycool-tech.com {copiedContact === "Email" ? "✓ Copied" : "📋"}
                </button>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <button
                  id="footer-phone-copy"
                  onClick={() => handleCopyText("+8615967025453", "Phone")}
                  className="hover:text-brand-cyan text-left focus:outline-none cursor-pointer"
                >
                  +86 15967025453 {copiedContact === "Phone" ? "✓ Copied" : "📋"}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Schema.org product group Microdata schema structured markup inside script */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "ProductGroup",
            "name": "HECHHI E-XDV Electric Motorcycle",
            "brand": { "@type": "Brand", "name": "HECHHI" },
            "manufacturer": { 
              "@type": "Organization", 
              "name": "Zhejiang Easycool Motorcycle Co., Ltd.", 
              "address": "689# Xin'an South Street, Luqiao District, Taizhou City, Zhejiang Province, China" 
            },
            "description": "Electric adventure motorcycle with up to 130 km/h top speed, 230 km range, removable solid-state batteries, and 30-minute fast charging at CCS car charging stations.",
            "url": "https://hechhi.com",
            "hasVariant": [
              { "@type": "Product", "name": "HECHHI E-XDV", "description": "6000W mid drive motor, 15 kW peak, 100 km/h, 130 km range at 50 km/h" },
              { "@type": "Product", "name": "HECHHI E-XDV Pro", "description": "6000W mid drive motor, LG 21700 battery, 115 km/h, 180 km range, Nissin dual-channel ABS" },
              { "@type": "Product", "name": "HECHHI E-XDV Pro Max", "description": "11000W water-cooled motor, 29 kW peak, 130 km/h, 230 km range, Michelin tyres" }
            ]
          }
          `}
        </script>

        {/* Back to top row */}
        <div className="border-t border-white/5 pt-6 text-center text-brand-muted/50 text-[10px]">
          "Uncompromising Speed, Unstoppable Range" · Developed for easycool-tech.com Zhejiang export homologation networks.
        </div>
      </footer>

    </div>
  );
}
