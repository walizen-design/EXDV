import React, { useState, useMemo } from "react";
import { MODELS_DATA } from "../data";
import { Check, X, Search, Sparkles } from "lucide-react";

interface SpecRow {
  label: string;
  category: "Performance" | "Battery & Range" | "Chassis & Control" | "Technology" | "Logistics";
  standardVal: string;
  proVal: string;
  proMaxVal: string;
  isDifferent: boolean;
}

const SPEC_ROWS: SpecRow[] = [
  // Performance
  { label: "Max Speed", category: "Performance", standardVal: "100 km/h", proVal: "115 km/h", proMaxVal: "130 km/h", isDifferent: true },
  { label: "0–50 km/h Acceleration", category: "Performance", standardVal: "4.0s", proVal: "3.75s", proMaxVal: "3.0s", isDifferent: true },
  { label: "Motor Drive Architecture", category: "Performance", standardVal: "6000W Mid-Mounted Mild Drive", proVal: "6000W Mid-Mounted Mild Drive", proMaxVal: "11000W Water-Cooled Mid Drive", isDifferent: true },
  { label: "Peak Output Power", category: "Performance", standardVal: "15 kW", proVal: "15 kW", proMaxVal: "29 kW", isDifferent: true },
  
  // Battery & Range
  { label: "Battery Chemistry", category: "Battery & Range", standardVal: "Solid-state Lithium 2×75V 30Ah", proVal: "LG 21700 Cylindrical 2×72V 45Ah", proMaxVal: "Solid-state Paralleling 2×75V 60Ah", isDifferent: true },
  { label: "Tested Range @ 50 km/h", category: "Battery & Range", standardVal: "130 km", proVal: "180 km", proMaxVal: "230 km", isDifferent: true },
  { label: "Tested Range @ 100 km/h", category: "Battery & Range", standardVal: "60 km", proVal: "90 km", proMaxVal: "120 km", isDifferent: true },
  { label: "Tested Range (2-Up @ 90km/h)", category: "Battery & Range", standardVal: "60 km", proVal: "90 km", proMaxVal: "120 km", isDifferent: true },
  { label: "Car Station Charger Support", category: "Battery & Range", standardVal: "No (Home Outlet only)", proVal: "Yes (CCS1 / CCS2 compatibility)", proMaxVal: "Yes (CCS1 / CCS2 compatibility)", isDifferent: true },
  { label: "Full Charging Time (OBC/Car Station)", category: "Battery & Range", standardVal: "2.5 Hours", proVal: "4 Hours", proMaxVal: "3 Hours", isDifferent: true },

  // Chassis & Control
  { label: "Brake Caliper Assembly", category: "Chassis & Control", standardVal: "Disc + Dual Channel CBS", proVal: "Nissin Calipers + Dual Channel ABS", proMaxVal: "Nissin Calipers + Dual Channel ABS", isDifferent: true },
  { label: "Front Suspension System", category: "Chassis & Control", standardVal: "Upright Absorber", proVal: "Upside Down Front Forks", proMaxVal: "Upside Down Front Forks", isDifferent: true },
  { label: "Rear Suspension System", category: "Chassis & Control", standardVal: "Gas Absorber", proVal: "Gas Absorber", proMaxVal: "Gas Absorber", isDifferent: false },
  { label: "Vacuum Tyres Brand", category: "Chassis & Control", standardVal: "CST Vacuum Tyres", proVal: "CST Vacuum Tyres", proMaxVal: "Michelin Vacuum Tyres", isDifferent: true },
  { label: "Seat Height", category: "Chassis & Control", standardVal: "800 mm", proVal: "800 mm", proMaxVal: "800 mm", isDifferent: false },
  { label: "Max Certified Load", category: "Chassis & Control", standardVal: "300 kg", proVal: "300 kg", proMaxVal: "300 kg", isDifferent: false },
  { label: "Wheelbase", category: "Chassis & Control", standardVal: "1325 mm", proVal: "1325 mm", proMaxVal: "1325 mm", isDifferent: false },
  { label: "Ground Clearance", category: "Chassis & Control", standardVal: "165 mm", proVal: "165 mm", proMaxVal: "165 mm", isDifferent: false },

  // Technology
  { label: "Smart IoT System", category: "Technology", standardVal: "HECHHI Intelligence + Go APP", proVal: "HECHHI Intelligence + Go APP", proMaxVal: "Easycool Intelligence + Go APP", isDifferent: true },
  { label: "Tri-monitor Display Panel", category: "Technology", standardVal: "No", proVal: "Yes", proMaxVal: "Yes", isDifferent: true },
  { label: "Front & Rear Cameras", category: "Technology", standardVal: "No", proVal: "Yes", proMaxVal: "Yes", isDifferent: true },
  { label: "IP67 Waterproof Certification", category: "Technology", standardVal: "Yes", proVal: "Yes", proMaxVal: "Yes", isDifferent: false },
  { label: "Keyless / Windscreen / USB", category: "Technology", standardVal: "Yes", proVal: "Yes", proMaxVal: "Yes", isDifferent: false },

  // Logistics
  { label: "Container Loading Capacity (40HQ)", category: "Logistics", standardVal: "48 PCS", proVal: "48 PCS", proMaxVal: "48 PCS", isDifferent: false }
];

interface SpecsMatrixProps {
  isDarkMode?: boolean;
}

export default function SpecsMatrix({ isDarkMode = true }: SpecsMatrixProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightDiff, setHighlightDiff] = useState(false);

  // Group rows or filter
  const filteredRows = useMemo(() => {
    return SPEC_ROWS.filter((row) => {
      const matchesSearch =
        row.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDiff = !highlightDiff || row.isDifferent;
      return matchesSearch && matchesDiff;
    });
  }, [searchQuery, highlightDiff]);

  const categories = ["Performance", "Battery & Range", "Chassis & Control", "Technology", "Logistics"] as const;

  // Theme styles
  const bgCard = isDarkMode ? "bg-brand-surface" : "bg-white";
  const borderLight = isDarkMode ? "border-white/5" : "border-slate-200/85";
  const borderMedium = isDarkMode ? "border-white/10" : "border-slate-300";
  const bgBg = isDarkMode ? "bg-brand-bg/80" : "bg-slate-50";
  const textTitle = isDarkMode ? "text-white" : "text-slate-900";
  const textMain = isDarkMode ? "text-white" : "text-slate-800";
  const textMuted = isDarkMode ? "text-brand-muted" : "text-slate-700";

  return (
    <div className={`rounded-2xl border overflow-hidden shadow-xl transition-all duration-300 ${bgCard} ${borderLight}`}>
      {/* Search & Toggle header */}
      <div className={`p-4 md:p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300 ${bgCard} ${borderLight}`}>
        <div>
          <h4 className={`text-lg font-display font-bold flex items-center gap-2 ${textTitle}`}>
            Model Comparison Matrix
          </h4>
          <p className="text-xs text-brand-muted">Search specifications or highlight key variant differences.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="spec-search"
              type="text"
              placeholder="Search specifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`border rounded-lg pl-9 pr-4 py-1.5 text-xs placeholder-brand-muted/70 focus:outline-none focus:border-brand-cyan/60 transition-colors w-full sm:w-48 ${
                isDarkMode ? "bg-brand-bg/80 border-white/10 text-white" : "bg-slate-50 border-slate-300 text-slate-900 focus:ring-1 focus:ring-brand-cyan"
              }`}
            />
          </div>

          {/* Highlight Diff Button */}
          <button
            id="btn-highlight-diff"
            onClick={() => setHighlightDiff(!highlightDiff)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase border transition-all duration-300 ${
              highlightDiff
                ? "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30"
                : `${isDarkMode ? "bg-brand-bg/50 text-brand-muted border-white/5 hover:border-white/15 hover:text-white" : "bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-950"}`
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {highlightDiff ? "Showing Differences" : "Highlight Differences"}
          </button>
        </div>
      </div>

      {/* Responsive table container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className={`border-b transition-colors duration-300 ${isDarkMode ? "bg-brand-bg/60 border-white/5" : "bg-slate-50 border-slate-200"}`}>
              <th className="p-4 text-xs font-mono font-bold text-brand-muted uppercase tracking-wider w-[30%]">Specification Field</th>
              <th className={`p-4 text-xs font-display font-bold tracking-wider w-[23%] ${textTitle}`}>
                <span className="block text-[9px] font-mono font-semibold tracking-widest text-brand-cyan uppercase">01 / Urban</span>
                E-XDV
              </th>
              <th className={`p-4 text-xs font-display font-bold tracking-wider w-[23%] ${textTitle}`}>
                <span className="block text-[9px] font-mono font-semibold tracking-widest text-brand-cyan uppercase">02 / Advanced</span>
                E-XDV Pro
              </th>
              <th className="p-4 text-xs font-display font-bold text-brand-cyan tracking-wider w-[24%]">
                <span className="block text-[9px] font-mono font-semibold tracking-widest text-brand-cyan uppercase">03 / Flagship</span>
                E-XDV Pro Max
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const rowsInCat = filteredRows.filter((r) => r.category === cat);
              if (rowsInCat.length === 0) return null;

              return (
                <React.Fragment key={cat}>
                  {/* Category Header Row */}
                  <tr className={`border-y transition-colors duration-300 ${isDarkMode ? "bg-brand-bg/30 border-white/5" : "bg-slate-100/50 border-slate-200"}`}>
                    <td colSpan={4} className="px-4 py-2 text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-widest">
                      {cat} Specifications
                    </td>
                  </tr>
                  
                  {rowsInCat.map((row) => (
                    <tr
                      key={row.label}
                      className={`border-b transition-colors duration-300 ${
                        isDarkMode ? "border-white/5 hover:bg-white/[0.02]" : "border-slate-100 hover:bg-slate-50"
                      } ${
                        row.isDifferent && highlightDiff ? "bg-brand-cyan/5" : ""
                      }`}
                    >
                      {/* Label */}
                      <td className="p-4 text-xs font-semibold text-brand-muted">
                        {row.label}
                        {row.isDifferent && !highlightDiff && (
                          <span className="inline-block ml-1.5 w-1 h-1 bg-brand-cyan rounded-full" title="Varies across models" />
                        )}
                      </td>

                      {/* Standard Model Value */}
                      <td className={`p-4 text-xs ${isDarkMode ? "text-brand-text" : "text-slate-700"}`}>
                        {row.standardVal === "Yes" ? (
                          <Check className="w-4 h-4 text-brand-cyan" />
                        ) : row.standardVal === "No" ? (
                          <span className="text-brand-muted/40 font-mono">-</span>
                        ) : (
                          row.standardVal
                        )}
                      </td>

                      {/* Pro Model Value */}
                      <td className={`p-4 text-xs ${isDarkMode ? "text-brand-text" : "text-slate-700"}`}>
                        {row.proVal === "Yes" ? (
                          <Check className="w-4 h-4 text-brand-cyan" />
                        ) : row.proVal === "No" ? (
                          <span className="text-brand-muted/40 font-mono">-</span>
                        ) : (
                          row.proVal
                        )}
                      </td>

                      {/* Pro Max Model Value */}
                      <td className="p-4 text-xs text-brand-cyan font-semibold">
                        {row.proMaxVal === "Yes" ? (
                          <Check className="w-4 h-4 text-brand-cyan" />
                        ) : row.proMaxVal === "No" ? (
                          <span className="text-brand-muted/40 font-mono">-</span>
                        ) : (
                          row.proMaxVal
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        
        {filteredRows.length === 0 && (
          <div className="p-8 text-center text-xs text-brand-muted">
            No specifications matches your current search criteria.
          </div>
        )}
      </div>

      <div className={`p-4 border-t text-[10px] font-mono flex flex-wrap justify-between gap-2 transition-colors duration-300 ${
        isDarkMode ? "bg-brand-bg/40 border-white/5 text-brand-muted/60" : "bg-slate-50 border-slate-200 text-slate-500"
      }`}>
        <span>* Solid-state packs provide stable chemistry across sub-zero climates.</span>
        <span>Zhejiang Easycool Motor Lab Co., Ltd.</span>
      </div>
    </div>
  );
}
