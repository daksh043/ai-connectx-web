import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import {
  Send,
  CheckCircle2,
  Check,
  MapPin,
  Mail,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { sanitizeInput, isValidEmail } from "../../utils/sanitize";

// Social icon helpers for clean minimalist icons matching reference
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

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


export default function AIConnectXContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    setErrorMessage(null);

    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedEmail = sanitizeInput(formData.email).toLowerCase();
    const sanitizedMessage = sanitizeInput(formData.message);

    if (!sanitizedName) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!isValidEmail(sanitizedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.consent) {
      setErrorMessage("Please agree to the Privacy Policy & Terms of Service to proceed.");
      return;
    }

    // Update with sanitized inputs before submission
    setFormData({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      consent: formData.consent,
    });

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", message: "", consent: false });
      }, 5000);
    }, 800);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full pt-14 sm:pt-20 pb-6 sm:pb-8 z-10 select-none scroll-mt-20 font-['Outfit'] overflow-hidden"
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
              <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
                  05 / TRANSMISSION HUB
                </span>
              </div>

              {/* Bold Title: "Welcome!" */}
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none">
                Welcome!
              </h2>

              {/* Horizontal Accent Line */}
              <div className="w-16 h-[2px] bg-cyan-400 mt-4 sm:mt-5" />

              {/* Description Paragraph (Cut in half for maximum punch) */}
              <p className="text-base sm:text-lg text-slate-100 max-w-lg mt-6 leading-relaxed font-light">
                Connect directly with AI ConnectX at Universal AI University. Our transmission lines are open for builders, mentors, and corporate partners.
              </p>

              {/* Quick Contact Micro-Details */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-200 font-mono">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Universal AI University, Karjat, Mumbai, Maharashtra 410201, India</span>
                </div>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => handleCopy("connect@aiconnectx.club", "email")}
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>connect@aiconnectx.club</span>
                  {copiedKey === "email" && <Check className="w-3 h-3 text-cyan-400" />}
                </button>
              </div>

              {/* Single Primary Action Button (Unified Signature Style) */}
              <div className="mt-8 sm:mt-10">
                <a
                  href="https://wa.me/917556789000?text=Hello%20AI%20ConnectX%20Team%2C%20I%20would%20like%20to%20connect%20regarding%20the%20club."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-cyan-400 to-[#0088ff] text-slate-950 hover:brightness-110 shadow-[0_4px_24px_rgba(0,229,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-slate-950 stroke-[2]" />
                  <span>Direct WhatsApp Channel</span>
                </a>
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
                  <div className="text-center mb-6">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Contact <span className="underline decoration-cyan-400 decoration-2 underline-offset-4">Us</span>
                    </h3>
                  </div>

                  {/* Form with Rounded Capsule Input Fields */}
                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                    {/* Error Feedback Banner */}
                    {errorMessage && (
                      <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

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
                        placeholder="Your Full Name"
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

                    {/* DPDP Act Explicit Consent Checkbox */}
                    <div className="flex items-start gap-2 pt-1 text-left">
                      <input
                        type="checkbox"
                        id="consent-checkbox"
                        required
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 rounded border-sky-400/30 text-cyan-400 focus:ring-cyan-400 bg-slate-950/70 cursor-pointer"
                      />
                      <label htmlFor="consent-checkbox" className="text-[11px] text-slate-300 leading-tight cursor-pointer select-none">
                        I agree to the{" "}
                        <Link to="/terms" className="text-cyan-300 underline hover:text-cyan-200">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-cyan-300 underline hover:text-cyan-200">
                          Privacy Policy
                        </Link>
                        .
                      </label>
                    </div>

                    {/* Submit Button - Standardized Signature Button Style */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-cyan-400 to-[#0088ff] text-slate-950 hover:brightness-110 shadow-[0_4px_24px_rgba(0,229,255,0.3)] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Submit Transmission</span>
                            <Send className="w-4 h-4 text-slate-950 stroke-[2]" />
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
                          className="pt-1 flex items-center justify-center gap-1.5 text-cyan-300 text-xs font-medium text-center"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                          <span>Message Transmitted Successfully!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>

                  {/* Social Icon Row */}
                  <div className="mt-6 pt-5 border-t border-sky-400/15 flex items-center justify-center gap-6 text-sky-200/80">
                    <a
                      href="https://www.linkedin.com/company/ai-connectx-ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn company page"
                      className="hover:text-cyan-300 hover:scale-110 transition-all p-1"
                    >
                      <LinkedInIcon className="w-4 h-4 text-sky-300" />
                    </a>
                    <a
                      href="https://facebook.com/aiconnectx"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook community page"
                      className="hover:text-cyan-300 hover:scale-110 transition-all p-1"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://instagram.com/aiconnectx.official"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram profile"
                      className="hover:text-cyan-300 hover:scale-110 transition-all p-1"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://wa.me/917556789000"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp direct transmission"
                      className="hover:text-emerald-300 hover:scale-110 transition-all p-1"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
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
