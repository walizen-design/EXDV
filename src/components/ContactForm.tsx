import React, { useState, useMemo } from "react";
import { MODELS_DATA } from "../data";
import { MessageSquare, Mail, ShieldCheck, ClipboardCheck, ArrowUpRight, HelpCircle } from "lucide-react";

export default function ContactForm() {
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

  return (
    <div id="contact-inquiry" className="p-6 md:p-8 bg-brand-surface rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient backplate */}
      <div className="absolute -top-10 right-0 w-72 h-72 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left column: Form configuration (Col-span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest block mb-1">
              B2B / Retail Hub
            </span>
            <h4 className="text-2xl font-display font-bold text-white tracking-tight">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Export Request</span>
            </h4>
            <p className="text-xs text-brand-muted mt-1">
              Select configurations and instantly generate official channels directly to HECHHI's factory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Model select */}
            <div className="space-y-1.5">
              <label htmlFor="inquiry-model" className="text-[10px] font-mono tracking-wider text-brand-muted uppercase block">
                Target Model Variant
              </label>
              <select
                id="inquiry-model"
                value={selectedModelName}
                onChange={(e) => setSelectedModelName(e.target.value)}
                className="w-full bg-brand-bg text-xs border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-cyan transition-colors"
              >
                {MODELS_DATA.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name} ({m.class})
                  </option>
                ))}
              </select>
            </div>

            {/* Target quantity */}
            <div className="space-y-1.5">
              <label htmlFor="inquiry-qty" className="text-[10px] font-mono tracking-wider text-brand-muted uppercase block">
                Quantity Required
              </label>
              <input
                id="inquiry-qty"
                type="number"
                min="1"
                max="500"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-brand-bg text-xs border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-cyan transition-colors font-mono"
              />
            </div>
          </div>

          {/* Business identity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="inquiry-company" className="text-[10px] font-mono tracking-wider text-brand-muted uppercase block">
                Company Name (Optional)
              </label>
              <input
                id="inquiry-company"
                type="text"
                placeholder="e.g. EuroMoto Distributing LLC"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-brand-bg text-xs border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-cyan transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="inquiry-email" className="text-[10px] font-mono tracking-wider text-brand-muted uppercase block">
                Your Email Address (Optional)
              </label>
              <input
                id="inquiry-email"
                type="email"
                placeholder="e.g. buyer@euromoto.com"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                className="w-full bg-brand-bg text-xs border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-cyan transition-colors"
              />
            </div>
          </div>

          {/* Add-ons upgrades checkboxes */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase block mb-1">
              Upgrade Packages & Accessories
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label htmlFor="check-extra-battery" className="flex items-center gap-2 p-2.5 bg-brand-bg/50 border border-white/5 rounded-lg cursor-pointer hover:bg-brand-bg transition-colors">
                <input
                  id="check-extra-battery"
                  type="checkbox"
                  checked={extraBattery}
                  onChange={(e) => setExtraBattery(e.target.checked)}
                  className="rounded border-white/10 accent-brand-cyan h-3.5 w-3.5"
                />
                <span className="text-[11px] text-brand-text truncate">Spare 75V Module</span>
              </label>

              <label htmlFor="check-tri-monitor" className="flex items-center gap-2 p-2.5 bg-brand-bg/50 border border-white/5 rounded-lg cursor-pointer hover:bg-brand-bg transition-colors">
                <input
                  id="check-tri-monitor"
                  type="checkbox"
                  checked={triMonitorUpgrade}
                  onChange={(e) => setTriMonitorUpgrade(e.target.checked)}
                  className="rounded border-white/10 accent-brand-cyan h-3.5 w-3.5"
                />
                <span className="text-[11px] text-brand-text truncate">Tri-Monitor HUD</span>
              </label>

              <label htmlFor="check-michelin" className="flex items-center gap-2 p-2.5 bg-brand-bg/50 border border-white/5 rounded-lg cursor-pointer hover:bg-brand-bg transition-colors">
                <input
                  id="check-michelin"
                  type="checkbox"
                  checked={michelinUpgrade}
                  onChange={(e) => setMichelinUpgrade(e.target.checked)}
                  className="rounded border-white/10 accent-brand-cyan h-3.5 w-3.5"
                />
                <span className="text-[11px] text-brand-text truncate">Michelin Vacuum</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right column: Form output sheet (Col-span 5) */}
        <div className="lg:col-span-5 bg-brand-bg border border-white/5 rounded-xl p-5 flex flex-col justify-between gap-5 h-full min-h-[320px]">
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase">
                Generated Inquiry Sheet
              </span>
              <span className="text-[9px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded">
                Official Zhejiang Factory
              </span>
            </div>

            {/* Generated spec-sheet box preview */}
            <div className="mt-4 bg-brand-surface/60 border border-white/5 p-4 rounded-lg text-[11px] font-mono text-brand-muted space-y-3 leading-relaxed">
              <p>
                <span className="text-white">TO:</span> Zhejiang Easycool Motorcycle Co., Ltd.
              </p>
              <p>
                <span className="text-white">SUBJECT:</span> B2B Specs & Quotation Request
              </p>
              <p className="border-t border-dashed border-white/10 pt-3 italic">
                "{formattedInquiry.text}"
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={formattedInquiry.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-brand-bg text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-emerald-500/15"
              >
                <MessageSquare className="w-4 h-4" />
                Contact WhatsApp
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={formattedInquiry.emailUrl}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-lg transition-all"
              >
                <Mail className="w-4 h-4" />
                Email Factory
              </a>
            </div>

            <button
              id="btn-copy-inquiry"
              onClick={handleCopyToClipboard}
              className="w-full flex items-center justify-center gap-1.5 text-[11px] font-mono text-brand-cyan hover:text-white transition-colors py-1 bg-brand-surface/30 rounded border border-brand-cyan/20 cursor-pointer"
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              Copy Raw Inquiry Text
            </button>

            {successMsg && (
              <div className="text-[10px] text-center font-mono text-emerald-400 bg-emerald-400/5 py-1 px-2 border border-emerald-400/10 rounded">
                {successMsg}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Security note / Trust footer */}
      <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-brand-muted/70">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Direct Factory Channel: shane@easycool-tech.com · Mobile/WhatsApp +86 15967025453</span>
        </div>
        <span>Luqiao District, Taizhou City, Zhejiang, China</span>
      </div>
    </div>
  );
}
