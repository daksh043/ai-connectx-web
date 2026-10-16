import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Compass, PhoneCall } from "lucide-react";
import AIConnectXNavbar from "../components/zubox/ZuboxNavbar";
import AIConnectXFooter from "../components/zubox/AIConnectXFooter";

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "404: Neural Node Not Found | AI ConnectX";
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-cyan-500/30 selection:text-cyan-200 font-sans antialiased overflow-x-hidden flex flex-col justify-between">
      <AIConnectXNavbar />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-36 pb-20 text-center max-w-2xl mx-auto">
        {/* Glow ambient background aura */}
        <div className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none -z-10" />

        {/* 404 High-Tech Number */}
        <div className="relative mb-6">
          <span className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-500/30 select-none">
            404
          </span>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[10px] font-mono text-cyan-300 uppercase tracking-widest whitespace-nowrap">
            SIGNAL LOSS • NEURAL ROUTE UNRESOLVED
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          Vector Coordinate Does Not Exist
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-lg mb-8 leading-relaxed font-light">
          The requested path could not be located in our frontier routing table. It may have been moved, updated, or temporarily disconnected.
        </p>

        {/* Action Buttons - Clean Modern Engineered Radii */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:scale-[1.02]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Landing</span>
          </Link>

          <Link
            to="/overview"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-all backdrop-blur-md"
          >
            <Compass className="w-4 h-4 text-cyan-300" />
            <span>Explore Mission</span>
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-all backdrop-blur-md"
          >
            <PhoneCall className="w-4 h-4 text-cyan-300" />
            <span>Support Desk</span>
          </Link>
        </div>
      </main>

      <AIConnectXFooter />
    </div>
  );
}
