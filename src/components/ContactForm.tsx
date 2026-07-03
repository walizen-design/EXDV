import React, { useState, useMemo } from "react";
import { MODELS_DATA } from "../data";
import { MessageSquare, Mail, ShieldCheck, ClipboardCheck, ArrowUpRight, HelpCircle } from "lucide-react";

interface ContactFormProps {
  isDarkMode?: boolean;
}

export default function ContactForm({ isDarkMode = true }: ContactFormProps) {
  const [selectedModelName, setSelectedModelName] = useState("E-XDV Pro Max");
  const [quantity, setQuantity] = useState(1);
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [extraBattery, setExtraBattery] = useState(false);
  const [triMonitorUpgrade, setTriMonitorUpgrade] = useState(false);
  const [michelinUpgrade, setMichelinUpgrade] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const formattedInquiry = useMemo(() => {
    const upgrades: string[] = [];
    if (extraBattery) upgrades.push("Extra Solid-State Battery module");
    if (triMonitorUpgrade) upgrades.push("Triple TFT Monitoring System");
    if (michelinUpgrade) upgrades.push("Michelin Vacuum Tyres package");

    const upgradeStr = upgrades.length > 0 ? ` with upgrades: (${upgrades.join(", ")})` : "";
    const quantityStr = quantity > 1 ? `${quantity} units of ` : "1 unit of ";

    const messageText = `Hi Zhejiang Easycool Motorcycle export team, I am interested in inquiring about ${quantityStr}${selectedModelName}${upgradeStr}. ${
      companyName ? `My company name is ${companyName}.` : ""
    } Please share the official catalog, B2B pricing sheet, and EEC/EPA homologation details.`;

    const whatsappUrl = `https://wa.me/8615967025453?text=${encodeURIComponent(messageText)}`;
    const emailSubject = `Inquiry: HECHHI ${selectedModelName} Spec Catalog Request`;
    const emailBody = `${messageText}\n\nMy email is: ${businessEmail || "not specified"}`;
    const emailUrl = `mailto:shane@easycool-tech.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    return {
      text: messageText,
      whatsappUrl,
      emailUrl
    };
  }, [selectedModelName, quantity, businessEmail, companyName, extraBattery, triMonitorUpgrade, michelinUpgrade]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(formattedInquiry.text);
    setSuccessMsg("Inquiry request text copied to clipboard! Paste it on WhatsApp or your email client.");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // Theme variable styles
  const textTitle = isDarkMode ? "text-white" : "text-slate-900";
  const textMain = isDarkMode ? "text-white" : "text-slate-800";
  const textMuted = isDarkMode ? "text-brand-muted" : "text-slate-700";
  const borderLight = isDarkMode ? "border-white/5" : "border-slate-200";
  const borderMedium = isDarkMode ? "border-white/10" : "border-slate-300";
  const bgBg = isDarkMode ? "bg-brand-bg" : "bg-slate-50";
  const inputBg = isDarkMode ? "bg-brand-bg text-white focus:border-brand-cyan" : "bg-slate-100 text-slate-900 border-slate-300 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan";

  return (
    <div 
      id="contact-inquiry" 
      className={`p-6 md:p-8 rounded-2xl border relative overflow-hidden transition-all duration-500 ${
        isDarkMode ? "paper-sheet-dark" : "paper-sheet-light"
      }`}
    >
      {/* Decorative gradient backplate */}
      <div className="absolute -top-10 right-0 w-72 h-72 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      {/* Tactile Vermilion Traditional Zhejiang Ink Stamp / Seal Accent */}
      <div 
        className={`absolute bottom-16 right-8 w-24 h-24 rounded-full border-4 flex items-center justify-center font-mono text-[9px] font-extrabold uppercase tracking-widest text-center select-none pointer-events-none rotate-[15deg] transition-all duration-300 ${
          isDarkMode 
            ? "border-brand-cyan/15 text-brand-cyan/20 bg-brand-cyan/[0.01] shadow-[0_0_12px_rgba(0,240,255,0.05)]" 
            : "border-rose-600/30 text-rose-600/35 bg-rose-600/[0.02]"
        }`}
      >
        <div className="leading-tight p-2 border-2 border-dashed rounded-full border-current">
          EASYCOOL
          <br />
          浙江制造
          <br />
          ZHEJIANG
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left column: Form configuration (Col-span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest block mb-1">
              B2B / Retail Hub
            </span>
            <h4 className={`text-2xl font-display font-bold tracking-tight ${textTitle}`}>
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Export Request</span>
            </h4>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Select configurations and instantly generate official channels directly to HECHHI's factory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Model select */}
            <div className="space-y-1.5">
              <label htmlFor="inquiry-model" className={`text-[11px] font-mono tracking-wider uppercase block ${textMuted}`}>
                Target Model Variant
              </label>
              <select
                id="inquiry-model"
                value={selectedModelName}
                onChange={(e) => setSelectedModelName(e.target.value)}
                className={`w-full text-xs border rounded-lg p-2.5 transition-colors focus:outline-none ${inputBg}`}
              >
                {MODELS_DATA.map((m) => (
                  <option key={m.name} value={m.name} className={isDarkMode ? "bg-[#0f172a]" : "bg-white"}>
                    {m.name} ({m.class})
                  </option>
                ))}
              </select>
            </div>

            {/* Target quantity */}
            <div className="space-y-1.5">
              <label htmlFor="inquiry-qty" className={`text-[11px] font-mono tracking-wider uppercase block ${textMuted}`}>
                Quantity Required
              </label>
              <input
                id="inquiry-qty"
                type="number"
                min="1"
                max="500"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className={`w-full text-xs border rounded-lg p-2.5 transition-colors font-mono focus:outline-none ${inputBg}`}
              />
            </div>
          </div>

          {/* Business identity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="inquiry-company" className={`text-[11px] font-mono tracking-wider uppercase block ${textMuted}`}>
                Company Name (Optional)
              </label>
              <input
                id="inquiry-company"
                type="text"
                placeholder="e.g. EuroMoto Distributing LLC"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={`w-full text-xs border rounded-lg p-2.5 transition-colors focus:outline-none ${inputBg}`}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="inquiry-email" className={`text-[11px] font-mono tracking-wider uppercase block ${textMuted}`}>
                Your Email Address (Optional)
              </label>
              <input
                id="inquiry-email"
                type="email"
                placeholder="e.g. buyer@euromoto.com"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                className={`w-full text-xs border rounded-lg p-2.5 transition-colors focus:outline-none ${inputBg}`}
              />
            </div>
          </div>

          {/* Add-ons upgrades checkboxes */}
          <div className="space-y-2">
            <span className={`text-[11px] font-mono tracking-wider uppercase block mb-1 ${textMuted}`}>
              Upgrade Packages & Accessories
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label htmlFor="check-extra-battery" className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-all duration-300 ${
                isDarkMode ? "bg-brand-surface/40 border-white/5 hover:bg-brand-surface" : "bg-white border-slate-200 hover:bg-slate-50"
              }`}>
                <input
                  id="check-extra-battery"
                  type="checkbox"
                  checked={extraBattery}
                  onChange={(e) => setExtraBattery(e.target.checked)}
                  className="rounded border-slate-300 accent-brand-cyan h-3.5 w-3.5 cursor-pointer"
                />
                <span className={`text-[11px] truncate ${textMain}`}>Spare 75V Module</span>
              </label>

              <label htmlFor="check-tri-monitor" className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-all duration-300 ${
                isDarkMode ? "bg-brand-surface/40 border-white/5 hover:bg-brand-surface" : "bg-white border-slate-200 hover:bg-slate-50"
              }`}>
                <input
                  id="check-tri-monitor"
                  type="checkbox"
                  checked={triMonitorUpgrade}
                  onChange={(e) => setTriMonitorUpgrade(e.target.checked)}
                  className="rounded border-slate-300 accent-brand-cyan h-3.5 w-3.5 cursor-pointer"
                />
                <span className={`text-[11px] truncate ${textMain}`}>Tri-Monitor HUD</span>
              </label>

              <label htmlFor="check-michelin" className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-all duration-300 ${
                isDarkMode ? "bg-brand-surface/40 border-white/5 hover:bg-brand-surface" : "bg-white border-slate-200 hover:bg-slate-50"
              }`}>
                <input
                  id="check-michelin"
                  type="checkbox"
                  checked={michelinUpgrade}
                  onChange={(e) => setMichelinUpgrade(e.target.checked)}
                  className="rounded border-slate-300 accent-brand-cyan h-3.5 w-3.5 cursor-pointer"
                />
                <span className={`text-[11px] truncate ${textMain}`}>Michelin Vacuum</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right column: Form output sheet (Col-span 5) */}
        <div className={`lg:col-span-5 w-full border rounded-xl p-5 flex flex-col justify-between gap-5 h-full min-h-[320px] transition-all duration-300 ${
          isDarkMode ? "bg-[#0b0f19] border-white/5" : "bg-slate-50 border-slate-200 shadow-sm"
        }`}>
          <div>
            <div className={`flex items-center justify-between border-b pb-3 ${borderLight}`}>
              <span className={`text-[11px] font-mono tracking-widest uppercase ${textMuted}`}>
                Generated Inquiry Sheet
              </span>
              <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2.5 py-0.5 rounded font-bold uppercase">
                Zhejiang Factory
              </span>
            </div>

            {/* Generated spec-sheet box preview */}
            <div className={`mt-4 border p-4 rounded-lg text-xs font-mono space-y-3 leading-relaxed transition-all duration-300 ${
              isDarkMode ? "bg-brand-surface/60 border-brand-cyan/10 text-brand-muted shadow-inner" : "bg-white border-slate-300 text-slate-600 shadow-inner"
            }`}>
              <p>
                <span className={isDarkMode ? "text-white font-bold" : "text-slate-900 font-bold"}>TO:</span> Zhejiang Easycool Motorcycle Co., Ltd.
              </p>
              <p>
                <span className={isDarkMode ? "text-white font-bold" : "text-slate-900 font-bold"}>SUBJECT:</span> B2B Specs & Quotation Request
              </p>
              <p className={`border-t border-dashed pt-3 italic ${borderLight}`}>
                "{formattedInquiry.text}"
              </p>
            </div>
          </div>

          <div className="space-y-3 z-10">
            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={formattedInquiry.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-emerald-500/15"
              >
                <MessageSquare className="w-4 h-4" />
                Contact WhatsApp
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={formattedInquiry.emailUrl}
                className={`flex-1 inline-flex items-center justify-center gap-2 border text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-lg transition-all ${
                  isDarkMode
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                    : "bg-white hover:bg-slate-100 border-slate-200 text-slate-800 shadow-sm"
                }`}
              >
                <Mail className="w-4 h-4" />
                Email Factory
              </a>
            </div>

            <button
              id="btn-copy-inquiry"
              onClick={handleCopyToClipboard}
              className={`w-full flex items-center justify-center gap-1.5 text-xs font-mono border rounded py-1.5 cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-brand-cyan ${
                isDarkMode
                  ? "text-brand-cyan bg-brand-surface/30 border-brand-cyan/20 hover:text-white"
                  : "text-brand-cyan bg-white border-brand-cyan/20 hover:bg-brand-cyan/5"
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              Copy Raw Inquiry Text
            </button>

            {successMsg && (
              <div className="text-[11px] text-center font-mono text-emerald-400 bg-emerald-400/5 py-1.5 px-2 border border-emerald-400/10 rounded">
                {successMsg}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Security note / Trust footer */}
      <div className={`mt-6 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] ${borderLight} ${textMuted}`}>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Direct Factory Channel: shane@easycool-tech.com · Mobile/WhatsApp +86 15967025453</span>
        </div>
        <span>Luqiao District, Taizhou City, Zhejiang, China</span>
      </div>
    </div>
  );
}
