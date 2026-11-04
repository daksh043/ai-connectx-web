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

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="instagram-gradient-contact" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill="url(#instagram-gradient-contact)" />
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke="#ffffff" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="3.5" stroke="#ffffff" strokeWidth="1.75" />
      <circle cx="16.5" cy="7.5" r="1" fill="#ffffff" />
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

  // Scroll-linked zoom in / grow larger effect with pinned pause
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth entry and comfortable paused state across the scroll span (solid opacity, no fade-in)
  const rawScale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.98, 1, 1, 0.98]);
  const rawY = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], ["24px", "0px", "0px", "-24px"]);

  // Smooth springs
  const scale = useSpring(rawScale, { stiffness: 120, damping: 24 });
  const y = useSpring(rawY, { stiffness: 120, damping: 24 });

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
      className="relative w-full min-h-[190vh] z-10 select-none scroll-mt-20 font-['Outfit']"
    >
      {/* ─── Pinned Sticky Stage: locks contact card in view for a comfortable pause ─── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl w-full mx-auto">
          {/* ─── Main Content Container (True Glassmorphism Frame) ─── */}
          <motion.div
            style={{ scale, y }}
            className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-slate-950/70 sm:bg-slate-900/50 backdrop-blur-3xl border border-white/20 shadow-[0_35px_100px_-15px_rgba(0,0,0,0.8),inset_0_1.5px_1px_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(255,255,255,0.08),0_0_50px_rgba(34,211,238,0.12)] p-6 sm:p-10 lg:p-12 min-h-[500px] flex items-center will-change-transform max-h-[92vh] overflow-y-auto sm:overflow-visible"
          >
          {/* Frosted Glass Specular Sheen & Atmospheric Overlays */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-cyan-400/25 via-sky-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-blue-600/30 via-indigo-700/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02] pointer-events-none" />

          {/* ════ Content Grid: Left Welcome Column + Right Floating Glass Card ════ */}
          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* ─── LEFT COLUMN: Brand Logo, "Welcome!", Mission & "Learn More" ─── */}
            <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
              {/* Minimalist Brandmark Icon */}
              <div className="mb-6 flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-400/30 text-xs font-mono font-bold tracking-[0.25em] text-cyan-300 uppercase shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  05 / TRANSMISSION HUB
                </span>
              </div>

              {/* Bold Title: "Welcome!" */}
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none">
                Welcome!
              </h2>

              {/* Horizontal Accent Line */}
              <div className="w-20 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent mt-4 sm:mt-5 rounded-full" />

              {/* Description Paragraph (Cut in half for maximum punch) */}
              <p className="text-base sm:text-lg text-slate-200/90 max-w-lg mt-6 leading-relaxed font-light">
                Connect directly with AI ConnectX at Universal AI University. Our transmission lines are open for builders, mentors, and corporate partners.
              </p>

              {/* Quick Contact Micro-Details */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Universal AI University, Karjat, Mumbai, Maharashtra 410201, India</span>
                </div>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => handleCopy("connect@aiconnectx.club", "email")}
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 backdrop-blur-sm"
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
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 text-slate-950 hover:brightness-110 shadow-[0_6px_25px_rgba(65,105,225,0.45)] hover:shadow-[0_8px_32px_rgba(65,105,225,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-slate-950 stroke-[2]" />
                  <span>Direct WhatsApp Channel</span>
                </a>
              </div>
            </div>

            {/* ─── RIGHT COLUMN: High-Definition Frosted Glass Form Card ─── */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-[390px] sm:max-w-[430px] rounded-[28px] sm:rounded-[36px] bg-slate-950/40 backdrop-blur-2xl border border-white/30 shadow-[0_30px_70px_rgba(0,0,0,0.6),inset_0_1.5px_2px_rgba(255,255,255,0.45),inset_0_-1px_2px_rgba(255,255,255,0.1),0_0_40px_rgba(34,211,238,0.2)] p-7 sm:p-9 flex flex-col justify-between overflow-hidden"
              >
                {/* Internal Refraction Glow Orbs */}
                <div className="absolute -top-16 -right-16 w-52 h-52 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent pointer-events-none" />

                <div className="relative z-10">
                  {/* Card Header: "Contact Us" */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)]">
                      Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 underline decoration-blue-500 decoration-2 underline-offset-8">Us</span>
                    </h3>
                  </div>

                  {/* Form with Frosted Glass Capsule Input Fields */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Error Feedback Banner */}
                    {errorMessage && (
                      <div className="p-2.5 rounded-xl bg-rose-500/25 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 backdrop-blur-md shadow-[0_4px_16px_rgba(244,63,94,0.2)]">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* User Name */}
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

                    {/* Email Address */}
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

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5 ml-2 tracking-wide">
                        Your Message
                      </label>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your transmission..."
                        className="w-full px-5 py-2.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.16] backdrop-blur-xl border border-white/25 text-sm text-white placeholder-slate-300/60 outline-none transition-all duration-300 focus:border-cyan-300 focus:shadow-[0_0_24px_rgba(34,211,238,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.35)] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.3)] resize-none"
                      />
                    </div>

                    {/* DPDP Act Explicit Consent Checkbox */}
                    <div className="flex items-start gap-2.5 pt-1 text-left">
                      <input
                        type="checkbox"
                        id="consent-checkbox"
                        required
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/[0.10] text-cyan-400 focus:ring-cyan-400/50 cursor-pointer accent-cyan-400"
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

                    {/* Submit Button - Frosted Glowing Translucent Cyber Pill */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 text-slate-950 hover:brightness-110 shadow-[0_8px_32px_rgba(65,105,225,0.55),inset_0_1.5px_2px_rgba(255,255,255,0.6)] hover:shadow-[0_12px_40px_rgba(65,105,225,0.75)] hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Submit Transmission</span>
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
                          className="pt-1 flex items-center justify-center gap-1.5 text-cyan-300 text-xs font-semibold text-center"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
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
                      href="https://instagram.com/aiconnectx.official"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram profile"
                      className="group p-2.5 rounded-full bg-white/[0.06] hover:bg-[#E1306C]/20 border border-white/20 hover:border-[#E1306C]/70 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-[0_2px_10px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(225,48,108,0.5)] cursor-pointer"
                    >
                      <InstagramIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-105" />
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
        </motion.div>
        </div>
      </div>
    </section>
  );
}
