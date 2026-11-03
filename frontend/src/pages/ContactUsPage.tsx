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
                    onClick={() => handleCopy("connect@aiconnectx.club", "email")}
                    className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 backdrop-blur-sm"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>connect@aiconnectx.club</span>
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
                        placeholder="connect@aiconnectx.club"
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
