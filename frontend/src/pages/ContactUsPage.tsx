import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Mail,
  Send,
  CheckCircle2,
  Check,
  ArrowRight,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import ScrollCanvasBackground from "../components/zubox/ScrollCanvasBackground";
import AIConnectXNavbar from "../components/zubox/ZuboxNavbar";
import AIConnectXFooter from "../components/zubox/AIConnectXFooter";

// Official Brand Logos in their Original Authentic Colors
function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4.5" fill="#0A66C2" />
      <path
        fill="#ffffff"
        d="M5.5 8.7h2.8v8.6H5.5V8.7zm1.4-4.4c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.6 1.6-1.6zM10.2 8.7h2.7v1.2h.04c.38-.72 1.3-1.48 2.68-1.48 2.87 0 3.4 1.89 3.4 4.35v4.53h-2.8v-4c0-.96-.02-2.2-1.34-2.2-1.34 0-1.55 1.05-1.55 2.13v4.07h-2.8V8.7z"
      />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#ffffff"
        d="M16.671 15.469l.532-3.47h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.737V4.922s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.012H7.078v3.47h3.271v8.385a12.083 12.083 0 0 0 3.651 0v-8.385h2.671z"
      />
    </svg>
  );
}

function GmailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path fill="#4285F4" d="M2 7v10a2 2 0 0 0 2 2h3v-8.5L2 7z" />
      <path fill="#34A853" d="M22 7v10a2 2 0 0 1-2 2h-3v-8.5L22 7z" />
      <path fill="#FBBC04" d="M2 7l5 3.5V5H4a2 2 0 0 0-2 2z" />
      <path fill="#C5221F" d="M22 7l-5 3.5V5h3a2 2 0 0 1 2 2z" />
      <path fill="#EA4335" d="M7 5v5.5l5 3.75 5-3.75V5l-5 3.75L7 5z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        fill="#25D366"
        d="M20.52 3.48A11.93 11.93 0 0 0 12.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.19-1.62a11.93 11.93 0 0 0 5.87 1.53h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.21-3.52-8.46z"
      />
      <path
        fill="#ffffff"
        d="M17.47 14.38c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.63-.92-2.23-.25-.6-.5-.5-.68-.52-.18 0-.38-.01-.58-.01-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5 0 1.49 1.08 2.92 1.23 3.12.15.2 2.13 3.24 5.15 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35z"
      />
    </svg>
  );
}

export default function ContactUsPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!formData.consent) {
      setErrorMessage("Please consent to the processing of your data under the DPDP Act 2023 & Privacy Policy.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", message: "", consent: false });
      }, 4000);
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-white font-['Outfit'] overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between">
      {/* ─── Signature 240-Frame Canvas Scroll Background ─── */}
      <ScrollCanvasBackground />

      {/* ─── Fixed Top Navigation Bar (Exact Website Navbar) ─── */}
      <AIConnectXNavbar />

      {/* ─── Atmospheric Glassmorphism Refraction Orbs (Behind Glass Card) ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Cyan Aurora Orb Top-Left */}
        <div
          className="absolute top-[18%] left-[12%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full blur-[140px] opacity-45 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(34,211,238,0.35) 0%, rgba(1,75,170,0.20) 45%, transparent 70%)",
          }}
        />
        {/* Rose-Pink Cyber Glare Bottom-Right */}
        <div
          className="absolute bottom-[10%] right-[8%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[150px] opacity-40 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(244,63,94,0.30) 0%, rgba(168,85,247,0.18) 45%, transparent 70%)",
          }}
        />
        {/* Royal Blue Center Spotlight */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[45vw] max-w-[900px] max-h-[600px] rounded-full blur-[160px] opacity-30 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(59,130,246,0.25) 0%, rgba(99,102,241,0.12) 50%, transparent 75%)",
          }}
        />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 sm:pt-36 pb-16 w-full my-auto">
        {/* ─── Main Content Container (Premium Glassmorphism Frame) ─── */}
        <div
          className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-slate-950/60 backdrop-blur-3xl border border-white/20 shadow-[0_35px_100px_-15px_rgba(0,0,0,0.8),inset_0_1.5px_1px_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(255,255,255,0.08),0_0_50px_rgba(34,211,238,0.12)] p-8 sm:p-12 lg:p-16 min-h-[540px] flex items-center will-change-transform"
        >
          {/* Frosted Glass Specular Sheen Overlays */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-cyan-400/25 via-sky-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-rose-500/20 via-blue-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02] pointer-events-none" />

          {/* Content Grid */}
          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
              <div className="mb-6 flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-400/30 text-xs font-mono font-bold tracking-[0.25em] text-cyan-300 uppercase shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  05 / TRANSMISSION HUB
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none">
                Welcome!
              </h1>

              {/* Horizontal Accent Line */}
              <div className="w-20 h-[3px] bg-gradient-to-r from-cyan-400 via-sky-400 to-transparent mt-4 sm:mt-5 rounded-full" />

              <p className="text-sm sm:text-base text-slate-200/90 max-w-lg mt-6 leading-relaxed font-light">
                Connect directly with the <span className="font-semibold text-white">AI</span> <span className="font-semibold text-[#0088ff]">Connect</span><span className="font-semibold text-cyan-400">X</span> ecosystem. 
                Whether you're an ambitious student builder, an industry mentor, 
                or a hackathon partner: our transmission lines are open.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 text-xs text-slate-300 font-mono">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Universal AI University, Kushivili, PO Gaurkamath, Vadap, Karjat, Maharashtra 410201, India</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="button"
                    onClick={() => handleCopy("aiconnectx@universalai.in", "email")}
                    className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 backdrop-blur-sm"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>aiconnectx@universalai.in</span>
                    {copiedKey === "email" && <Check className="w-3 h-3 text-teal-400" />}
                  </button>
                  <span>•</span>
                  <a
                    href="https://wa.me/917556789000?text=Hi%20AI%20ConnectX%20Team,%20I'd%20like%20to%20connect!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 backdrop-blur-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Quick Ping</span>
                  </a>
                </div>
              </div>

              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3">
                <Link
                  to="/"
                  className="px-8 py-3 rounded-xl text-slate-950 font-bold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:brightness-110 shadow-[0_6px_25px_rgba(34,211,238,0.45)] hover:shadow-[0_8px_32px_rgba(34,211,238,0.65)] hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2 group"
                >
                  <span>Explore Ecosystem</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://wa.me/917556789000?text=Hello%20AI%20ConnectX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl text-white font-medium text-xs sm:text-sm border border-emerald-400/40 bg-emerald-950/40 hover:bg-emerald-900/50 backdrop-blur-md shadow-[0_4px_16px_rgba(16,185,129,0.2)] transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: High-Definition Frosted Glass Form Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-[390px] sm:max-w-[430px] rounded-[28px] sm:rounded-[36px] bg-slate-950/40 backdrop-blur-2xl border border-white/30 shadow-[0_30px_70px_rgba(0,0,0,0.6),inset_0_1.5px_2px_rgba(255,255,255,0.45),inset_0_-1px_2px_rgba(255,255,255,0.1),0_0_40px_rgba(34,211,238,0.2)] p-7 sm:p-9 flex flex-col justify-between overflow-hidden"
              >
                {/* Internal Refraction Glow Orbs */}
                <div className="absolute -top-16 -right-16 w-52 h-52 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)]">
                      Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 underline decoration-blue-500 decoration-2 underline-offset-8">Us</span>
                    </h2>
                    <p className="text-xs text-slate-300 mt-1">Data protected under India's DPDP Act 2023</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5 ml-2 tracking-wide">
                        User Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Full Name"
                        className="w-full px-5 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.16] backdrop-blur-xl border border-white/25 text-sm text-white placeholder-slate-300/60 outline-none transition-all duration-300 focus:border-cyan-300 focus:shadow-[0_0_24px_rgba(34,211,238,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.35)] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.3)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5 ml-2 tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="aiconnectx@universalai.in"
                        className="w-full px-5 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.16] backdrop-blur-xl border border-white/25 text-sm text-white placeholder-slate-300/60 outline-none transition-all duration-300 focus:border-cyan-300 focus:shadow-[0_0_24px_rgba(34,211,238,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.35)] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.3)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5 ml-2 tracking-wide">
                        Your Message
                      </label>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Inquire about membership, hackathons, or tech tracks..."
                        className="w-full px-5 py-2.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.16] backdrop-blur-xl border border-white/25 text-sm text-white placeholder-slate-300/60 outline-none transition-all duration-300 focus:border-cyan-300 focus:shadow-[0_0_24px_rgba(34,211,238,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.35)] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.3)] resize-none"
                      />
                    </div>

                    {/* DPDP Act 2023 Explicit Consent Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 text-xs text-slate-200 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/[0.10] text-cyan-400 focus:ring-cyan-400/50 cursor-pointer accent-cyan-400"
                        />
                        <span className="leading-tight text-[11px] text-slate-300">
                          I consent to AI ConnectX processing my details solely to respond to this transmission in accordance with India's <Link to="/privacy" className="text-cyan-400 underline hover:text-cyan-300">DPDP Act 2023</Link> & <Link to="/terms" className="text-cyan-400 underline hover:text-cyan-300">Terms</Link>.
                        </span>
                      </label>
                    </div>

                    {errorMessage && (
                      <div className="p-2.5 rounded-xl bg-rose-500/25 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 backdrop-blur-md shadow-[0_4px_16px_rgba(244,63,94,0.2)]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 text-slate-950 hover:brightness-110 shadow-[0_8px_32px_rgba(65,105,225,0.55),inset_0_1.5px_2px_rgba(255,255,255,0.6)] hover:shadow-[0_12px_40px_rgba(65,105,225,0.75)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Transmit Inquiry</span>
                            <Send className="w-4 h-4 text-slate-950 stroke-[2.2]" />
                          </>
                        )}
                      </button>
                    </div>

                    <AnimatePresence>
                      {submitted && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="pt-1 flex items-center justify-center gap-1.5 text-teal-300 text-xs font-semibold text-center"
                        >
                          <CheckCircle2 className="w-4 h-4 text-teal-400" />
                          <span>Message Transmitted Successfully!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>

                  {/* Social Icon Row - Individual Frosted Glass Pills in Original Brand Colors */}
                  <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-center gap-4">
                    <a
                      href="https://www.linkedin.com/company/ai-connectx-ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn company page"
                      className="group p-2.5 rounded-full bg-white/[0.06] hover:bg-[#0A66C2]/20 border border-white/20 hover:border-[#0A66C2]/70 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-[0_2px_10px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(10,102,194,0.5)] cursor-pointer"
                    >
                      <LinkedInIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-105" />
                    </a>
                    <a
                      href="https://facebook.com/aiconnectx"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook community page"
                      className="group p-2.5 rounded-full bg-white/[0.06] hover:bg-[#1877F2]/20 border border-white/20 hover:border-[#1877F2]/70 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-[0_2px_10px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(24,119,242,0.5)] cursor-pointer"
                    >
                      <FacebookIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-105" />
                    </a>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=aiconnectx@universalai.in&su=AI%20ConnectX%20Inquiry"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Send via Gmail"
                      aria-label="Send email directly via Gmail"
                      className="group p-2.5 rounded-full bg-white/[0.06] hover:bg-[#EA4335]/20 border border-white/20 hover:border-[#EA4335]/70 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-[0_2px_10px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(234,67,53,0.5)] cursor-pointer"
                    >
                      <GmailIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-105" />
                    </a>
                    <a
                      href="https://wa.me/917556789000"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp direct transmission"
                      className="group p-2.5 rounded-full bg-white/[0.06] hover:bg-[#25D366]/20 border border-white/20 hover:border-[#25D366]/70 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-[0_2px_10px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-105" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ─── Global Compliant Legal & Brand Footer ─── */}
      <AIConnectXFooter />
    </div>
  );
}
