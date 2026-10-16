import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import {
  Send,
  CheckCircle2,
  Check,
  MapPin,
  Mail,
  ArrowRight,
} from "lucide-react";

// Social icon helpers for clean minimalist icons matching reference
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

export default function AIConnectXContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Scroll-linked zoom in / grow larger effect
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.7], [0.3, 1]);
  const rawY = useTransform(scrollYProgress, [0, 1], [100, 0]);

  // Smooth springs for buttery physical zoom-in
  const scale = useSpring(rawScale, { stiffness: 90, damping: 22 });
  const opacity = useSpring(rawOpacity, { stiffness: 90, damping: 22 });
  const y = useSpring(rawY, { stiffness: 90, damping: 22 });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 4000);
    }, 800);
  };

  const handleLearnMore = () => {
    const el = document.getElementById("text-reveal");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-16 sm:py-24 z-10 select-none scroll-mt-20 font-['Outfit'] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        {/* ─── Main Content Container (Sleek Glassmorphic Frame with Scroll Zoom-In Animation) ─── */}
        <motion.div
          style={{ scale, opacity, y }}
          className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-white/[0.04] backdrop-blur-2xl border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(255,255,255,0.05)] p-8 sm:p-12 lg:p-16 min-h-[540px] flex items-center will-change-transform"
        >
          {/* Subtle Ambient Glass Glare Overlays */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

          {/* ════ Content Grid: Left Welcome Column + Right Floating Glass Card ════ */}
          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* ─── LEFT COLUMN: Brand Logo, "Welcome!", Mission & "Learn More" ─── */}
            <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
              {/* Minimalist Brandmark Icon */}
              <div className="mb-8 flex items-center gap-3">
                <div className="flex items-end gap-1.5 p-1.5">
                  <span className="w-3.5 h-8 rounded-sm bg-gradient-to-b from-teal-300 to-cyan-400 shadow-[0_0_12px_rgba(45,212,191,0.6)]" />
                  <div className="flex flex-col gap-1">
                    <span className="w-3.5 h-2.5 rounded-sm bg-gradient-to-b from-cyan-300 to-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
                    <span className="w-3.5 h-4.5 rounded-sm bg-gradient-to-b from-sky-400 to-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                  </div>
                </div>
                <span className="text-xs font-['Space_Grotesk'] font-bold tracking-widest text-cyan-200/90 uppercase">
                  Ai ConnectX · Transmission Hub
                </span>
              </div>

              {/* Bold Title: "Welcome!" */}
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
                Welcome!
              </h2>

              {/* Horizontal Accent Line (Matching Theme Accent) */}
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-400 mt-4 sm:mt-5 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />

              {/* Description Paragraph */}
              <p className="text-sm sm:text-base text-slate-300/85 max-w-lg mt-6 leading-relaxed font-light">
                Connect directly with the <span className="font-serif"><span className="italic text-cyan-300 font-bold">Ai</span> <span className="text-[#0088ff] font-bold">Connect</span><span className="text-cyan-300 font-bold">X</span></span> ecosystem. 
                Whether you're an ambitious builder looking to deploy frontier autonomous agents, an industry mentor, 
                or a hackathon sponsor—our transmission lines are open.
              </p>

              {/* Quick Contact Micro-Details */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300/70 font-mono">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Hyderabad Campus Hub</span>
                </div>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => handleCopy("connect@aiconnectx.club", "email")}
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>connect@aiconnectx.club</span>
                  {copiedKey === "email" && <Check className="w-3 h-3 text-teal-400" />}
                </button>
              </div>

              {/* "Learn More" Pill Button */}
              <div className="mt-8 sm:mt-10">
                <button
                  onClick={handleLearnMore}
                  className="px-8 py-3 rounded-full text-white font-bold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-sky-500 shadow-[0_6px_25px_rgba(14,165,233,0.45)] hover:shadow-[0_8px_32px_rgba(14,165,233,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2 group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* ─── RIGHT COLUMN: Floating Frosted Glass Card ("Sign in" / "Contact Us") ─── */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-[380px] sm:max-w-[420px] rounded-3xl bg-slate-900/40 backdrop-blur-3xl border border-sky-400/25 shadow-[0_30px_90px_rgba(2,6,23,0.85),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(56,189,248,0.1)] p-7 sm:p-9 flex flex-col justify-between overflow-hidden"
              >
                {/* Frosted Specular Glare in Top Corner */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-bl from-sky-400/15 to-transparent rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  {/* Card Header: "Contact Us" (Matching Reference with Underline) */}
                  <div className="text-center mb-7">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Contact <span className="underline decoration-cyan-400 decoration-2 underline-offset-4">Us</span>
                    </h3>
                  </div>

                  {/* Form with Rounded Capsule Input Fields */}
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4">
                    {/* User Name */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-2">
                        User Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="TechTree"
                        className="w-full px-5 py-3 rounded-full bg-slate-950/50 backdrop-blur-md border border-sky-400/20 text-sm text-white placeholder-slate-400/60 outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-slate-950/70 focus:shadow-[0_0_20px_rgba(56,189,248,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="connect@aiconnectx.club"
                        className="w-full px-5 py-3 rounded-full bg-slate-950/50 backdrop-blur-md border border-sky-400/20 text-sm text-white placeholder-slate-400/60 outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-slate-950/70 focus:shadow-[0_0_20px_rgba(56,189,248,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-2">
                        Your Message
                      </label>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your transmission..."
                        className="w-full px-5 py-2.5 rounded-2xl bg-slate-950/50 backdrop-blur-md border border-sky-400/20 text-sm text-white placeholder-slate-400/60 outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-slate-950/70 focus:shadow-[0_0_20px_rgba(56,189,248,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] resize-none"
                      />
                    </div>

                    {/* Submit Pill Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-full text-white font-bold text-sm tracking-wide bg-gradient-to-r from-teal-400 via-sky-500 to-blue-600 hover:from-teal-300 hover:to-sky-400 shadow-[0_6px_25px_rgba(14,165,233,0.45)] active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Submit</span>
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

                  {/* Social Icon Row */}
                  <div className="mt-6 pt-5 border-t border-sky-400/15 flex items-center justify-center gap-6 text-sky-200/80">
                    <a
                      href="#"
                      aria-label="Facebook"
                      className="hover:text-cyan-300 hover:scale-110 transition-all p-1"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      aria-label="Instagram"
                      className="hover:text-cyan-300 hover:scale-110 transition-all p-1"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      aria-label="Pinterest"
                      className="hover:text-cyan-300 hover:scale-110 transition-all p-1"
                    >
                      <PinterestIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
