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

      <main className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 sm:pt-36 pb-16 w-full my-auto">
        {/* ─── Main Content Container (Sleek Glassmorphic Frame with Zoom-In Animation) ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-white/[0.04] backdrop-blur-2xl border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(255,255,255,0.05)] p-8 sm:p-12 lg:p-16 min-h-[540px] flex items-center will-change-transform"
        >
          {/* Subtle Ambient Glass Glare Overlays */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

          {/* Content Grid */}
          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
                  05 / TRANSMISSION HUB
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none">
                Welcome!
              </h1>

              <div className="w-16 h-[2px] bg-cyan-400 mt-4 sm:mt-5" />

              <p className="text-sm sm:text-base text-slate-300/85 max-w-lg mt-6 leading-relaxed font-light">
                Connect directly with the <span className="font-semibold text-white">AI</span> <span className="font-semibold text-[#0088ff]">Connect</span><span className="font-semibold text-cyan-400">X</span> ecosystem. 
                Whether you're an ambitious student builder, an industry mentor, 
                or a hackathon partner: our transmission lines are open.
              </p>

              <div className="mt-6 flex flex-col gap-2 text-xs text-slate-300/80 font-mono">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Universal AI University, Kushivili, PO Gaurkamath, Vadap, Karjat, Maharashtra 410201, India</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="button"
                    onClick={() => handleCopy("connect@aiconnectx.club", "email")}
                    className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer"
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
                    className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Quick Ping</span>
                  </a>
                </div>
              </div>

              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3">
                <Link
                  to="/"
                  className="px-8 py-3 rounded-xl text-white font-bold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-sky-500 shadow-[0_6px_25px_rgba(14,165,233,0.45)] hover:shadow-[0_8px_32px_rgba(14,165,233,0.65)] hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2 group"
                >
                  <span>Explore Ecosystem</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://wa.me/917556789000?text=Hello%20AI%20ConnectX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl text-white/90 font-medium text-xs sm:text-sm border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-900/30 transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Floating Frosted Glass Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-[420px] rounded-3xl bg-slate-900/40 backdrop-blur-3xl border border-sky-400/25 shadow-[0_30px_90px_rgba(2,6,23,0.85),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(56,189,248,0.1)] p-7 sm:p-9 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-bl from-sky-400/15 to-transparent rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Contact <span className="underline decoration-cyan-400 decoration-2 underline-offset-4">Us</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Data protected under India's DPDP Act 2023</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1 ml-2">
                        User Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full px-5 py-2.5 rounded-full bg-slate-950/50 backdrop-blur-md border border-sky-400/20 text-sm text-white placeholder-slate-400/60 outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-slate-950/70 focus:shadow-[0_0_20px_rgba(56,189,248,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1 ml-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="connect@aiconnectx.club"
                        className="w-full px-5 py-2.5 rounded-full bg-slate-950/50 backdrop-blur-md border border-sky-400/20 text-sm text-white placeholder-slate-400/60 outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-slate-950/70 focus:shadow-[0_0_20px_rgba(56,189,248,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1 ml-2">
                        Your Message
                      </label>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Inquire about membership, hackathons, or tech tracks..."
                        className="w-full px-5 py-2 rounded-2xl bg-slate-950/50 backdrop-blur-md border border-sky-400/20 text-sm text-white placeholder-slate-400/60 outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-slate-950/70 focus:shadow-[0_0_20px_rgba(56,189,248,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] resize-none"
                      />
                    </div>

                    {/* DPDP Act 2023 Explicit Consent Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 text-xs text-slate-300/80 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          className="mt-0.5 h-4 w-4 rounded border-sky-400/30 bg-slate-950 text-cyan-500 focus:ring-cyan-500/50 cursor-pointer accent-cyan-400"
                        />
                        <span className="leading-tight text-[11px]">
                          I consent to AI ConnectX processing my details solely to respond to this transmission in accordance with India's <Link to="/privacy" className="text-cyan-400 underline hover:text-cyan-300">DPDP Act 2023</Link> & <Link to="/terms" className="text-cyan-400 underline hover:text-cyan-300">Terms</Link>.
                        </span>
                      </label>
                    </div>

                    {errorMessage && (
                      <div className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-950/30 border border-rose-500/30 px-3 py-1.5 rounded-lg">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl text-white font-bold text-sm tracking-wide bg-gradient-to-r from-teal-400 via-sky-500 to-blue-600 hover:from-teal-300 hover:to-sky-400 shadow-[0_6px_25px_rgba(14,165,233,0.45)] active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Transmit Inquiry</span>
                            <Send className="w-3.5 h-3.5 opacity-90" />
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
                          className="pt-1 flex items-center justify-center gap-1.5 text-teal-300 text-xs font-medium text-center"
                        >
                          <CheckCircle2 className="w-4 h-4 text-teal-400" />
                          <span>Message Transmitted Successfully!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ─── Global Compliant Legal & Brand Footer ─── */}
      <AIConnectXFooter />
    </div>
  );
}
