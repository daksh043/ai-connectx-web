import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, ArrowLeft, Settings } from "lucide-react";
import AIConnectXNavbar from "../../components/zubox/ZuboxNavbar";
import AIConnectXFooter from "../../components/zubox/AIConnectXFooter";

export default function CookiePolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Cookie Policy: AI ConnectX";
  }, []);

  const handleResetCookies = () => {
    localStorage.removeItem("aiconnectx_cookie_consent");
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-cyan-500/30 selection:text-cyan-200 font-sans antialiased">
      <AIConnectXNavbar />

      <main className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 pt-32 pb-24">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO HOME</span>
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/30 text-[11px] font-mono text-cyan-300 mb-4 uppercase tracking-wider">
            <Cookie className="w-3.5 h-3.5" />
            <span>Cookie Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
            This Cookie Policy explains how AI ConnectX uses local storage and cookies to provide high-performance, lag-free web experiences while respecting your privacy.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3">1. What Are Cookies &amp; Local Storage?</h2>
            <p className="text-zinc-300">
              Cookies and local storage objects are small text files or key-value entries stored directly within your web browser. They allow our website to remember your session preferences, theme options, and consent state across multiple visits without sending tracking tokens to external advertising networks.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-4">2. Categories of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-base">Strictly Necessary (Always Active)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300">ESSENTIAL</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Required for site security, session tokens, CSRF protection, and storing your cookie preference choice. These cannot be disabled as the site cannot function securely without them.
                </p>
              </div>

              <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-base">Performance &amp; Hardware Acceleration</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-400/20 text-teal-300">PERFORMANCE</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Caches pre-decoded canvas image frame indices and 3D scene parameters to prevent frame drops on mobile and GPU-constrained hardware.
                </p>
              </div>

              <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-base">Advertising &amp; Third-Party Trackers</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300">DISABLED (NONE)</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  We DO NOT partner with ad brokers, cross-site trackers, or commercial data brokers. Your browsing history is never packaged or monetized.
                </p>
              </div>
            </div>
          </section>

          {/* Manage Preferences Action */}
          <section className="bg-gradient-to-br from-cyan-950/30 to-black/50 border border-cyan-400/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Reset Your Cookie Preferences</h3>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Click below to clear stored consent and bring up the cookie banner choice again.
                </p>
              </div>
              <button
                onClick={handleResetCookies}
                className="shrink-0 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer flex items-center gap-2"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Re-configure Consent</span>
              </button>
            </div>
          </section>
        </div>
      </main>

      <AIConnectXFooter />
    </div>
  );
}
