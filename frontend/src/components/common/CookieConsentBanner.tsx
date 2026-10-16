import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a cookie choice
    const savedConsent = localStorage.getItem("aiconnectx_cookie_consent");
    if (!savedConsent) {
      // Delay showing banner slightly for smooth initial entrance
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (level: "accepted" | "necessary") => {
    localStorage.setItem("aiconnectx_cookie_consent", level);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 rounded-2xl bg-[#0a0b12]/95 backdrop-blur-2xl border border-cyan-400/30 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(34,211,238,0.15)] text-left select-none pointer-events-auto"
        >
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
                <Cookie className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-white tracking-tight">
                Privacy &amp; Cookie Consent
              </span>
            </div>
            <button
              onClick={() => handleConsent("necessary")}
              aria-label="Close cookie consent banner"
              className="text-white/40 hover:text-white transition-colors cursor-pointer p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-zinc-300 leading-relaxed mb-4">
            We use strictly necessary local storage to provide lag-free canvas acceleration and session safety. No advertising trackers are deployed. Compliant with India&apos;s DPDP Act 2023.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1 border-t border-white/10">
            <button
              onClick={() => handleConsent("accepted")}
              className="flex-1 py-2 px-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] cursor-pointer text-center"
            >
              Accept All
            </button>

            <button
              onClick={() => handleConsent("necessary")}
              className="py-2 px-3 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white/90 text-xs font-semibold tracking-wide transition-all cursor-pointer text-center"
            >
              Essential Only
            </button>

            <Link
              to="/cookie-policy"
              className="py-2 px-2.5 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
              Policy
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
