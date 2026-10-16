import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Compass,
  Layers,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Zap,
  Network,
  ExternalLink,
} from "lucide-react";
import ScrollCanvasBackground from "../components/zubox/ScrollCanvasBackground";
import AIConnectXNavbar from "../components/zubox/ZuboxNavbar";

export default function OverviewMissionPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "mission" | "architecture" | "ecosystem">("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Compass },
    { id: "mission", label: "Strategic Mission", icon: Sparkles },
    { id: "architecture", label: "3D & Neural Architecture", icon: Layers },
    { id: "ecosystem", label: "Ecosystem & Stats", icon: Network },
  ] as const;

  const corePillars = [
    {
      icon: Cpu,
      title: "Frontier Agent Orchestration",
      description:
        "High-performance autonomous intelligence coordination with multi-agent consensus and deterministic task dispatching.",
      accent: "from-cyan-500 to-blue-600",
      border: "border-cyan-500/30",
    },
    {
      icon: Layers,
      title: "Atmospheric 3D Canvas",
      description:
        "Cinematic 240-frame dynamic scroll renderer seamlessly blending hardware-accelerated WebGL with ultra-fluid responsive DOM layers.",
      accent: "from-blue-600 to-indigo-600",
      border: "border-blue-500/30",
    },
    {
      icon: ShieldCheck,
      title: "Zero-Trust Deterministic Security",
      description:
        "Industrial-grade cryptographic auth and safe-execution guardrails ensuring airtight privacy and compliance across model pipelines.",
      accent: "from-sky-500 to-teal-400",
      border: "border-teal-500/30",
    },
    {
      icon: Zap,
      title: "Sub-Millisecond Neural Pipeline",
      description:
        "Real-time token streaming and vectorized memory retrieval built for latency-critical enterprise and research workflows.",
      accent: "from-indigo-500 to-cyan-400",
      border: "border-indigo-500/30",
    },
  ];

  const missionGoals = [
    {
      number: "01",
      title: "Democratize Frontier AI Engineering",
      detail:
        "Transform complex model architectures into accessible, modular, and deployable primitives for creators and institutions worldwide.",
    },
    {
      number: "02",
      title: "Pioneer Physical & Spatial Interaction",
      detail:
        "Bridge digital neural agents with physical visual dimensions through immersive WebGL, 3D helical lattices, and spatial audio feedback.",
    },
    {
      number: "03",
      title: "Empower Next-Gen Developers",
      detail:
        "Cultivate a borderless community of AI builders, researchers, and engineers driving breakthrough solutions in open and collaborative sandboxes.",
    },
  ];

  const metrics = [
    { value: "240", unit: "Frames", label: "Smooth Canvas Synchronization" },
    { value: "< 12", unit: "ms", label: "Ultra-Low Event Latency" },
    { value: "100%", unit: "Liquid", label: "Glassmorphic Theme Alignment" },
    { value: "v1.0", unit: "Engine", label: "Ai ConnectX Core Protocol" },
  ];

  return (
    <div className="relative min-h-screen bg-[#050507] text-white font-['Outfit'] antialiased selection:bg-cyan-400 selection:text-black overflow-x-hidden">
      {/* ─── 1. Signature 240-Frame Canvas Scroll Background ─── */}
      <ScrollCanvasBackground />

      {/* ─── 2. Fixed Top Navigation (Exact match to theme & screenshot) ─── */}
      <AIConnectXNavbar />

      {/* ─── 3. Main Page Content ─── */}
      <main className="relative z-10 pt-28 sm:pt-36 pb-20 max-w-6xl mx-auto px-5 lg:px-8">
        
        {/* Hero Header Marker & Title */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 font-semibold uppercase mb-4">
            01 / SYSTEM OVERVIEW &amp; STRATEGIC MISSION
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.1]"
          >
            Empowering the Next Wave of{" "}
            <span className="text-cyan-400">
              Autonomous Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-300/85 max-w-2xl leading-relaxed font-light"
          >
            Discover the technology, mathematical foundation, and strategic vision powering{" "}
            <span className="font-semibold text-white">AI</span>{" "}
            <span className="font-semibold text-[#0088ff]">Connect</span>
            <span className="font-semibold text-cyan-400">X</span>: uniting
            cutting-edge 3D visualization, autonomous workflows, and interactive developer ecosystems.
          </motion.p>

          {/* Quick Action Navigation Buttons - Clean Modern Engineered Radii */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            <button
              onClick={() => navigate("/#spiral-3d")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs sm:text-sm font-semibold shadow-[0_0_24px_rgba(37,99,235,0.45)] hover:shadow-[0_0_32px_rgba(59,130,246,0.7)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-blue-300/30"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Explore 3D Helix</span>
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900/80 border border-sky-400/30 hover:border-cyan-400 text-cyan-200 hover:text-white text-xs sm:text-sm font-semibold backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <span>Transmission Hub</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>

            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-slate-300 hover:text-white text-xs sm:text-sm font-medium backdrop-blur-md transition-all cursor-pointer"
            >
              <span>Back to Home</span>
            </button>
          </motion.div>
        </div>

        {/* ─── Interactive Tab Bar (Matching Navbar Capsule Aesthetic) ─── */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-1 sm:gap-2 bg-zinc-950/75 backdrop-blur-2xl p-1.5 rounded-full border border-blue-500/25 shadow-[0_12px_40px_rgba(15,23,42,0.85)] max-w-full overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeOverviewTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 -z-10 border border-cyan-300/40"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-200" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Tab Content Panels (Sleek Glassmorphism with Smooth Transitions) ─── */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {corePillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className={`relative rounded-3xl p-7 bg-slate-900/40 backdrop-blur-3xl border ${pillar.border} shadow-[0_20px_60px_rgba(2,6,23,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] group hover:scale-[1.01] transition-transform duration-300`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${pillar.accent} text-white shadow-lg`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-300/80 leading-relaxed font-light">
                        {pillar.description}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {activeTab === "mission" && (
              <motion.div
                key="mission"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl p-8 sm:p-12 bg-slate-900/40 backdrop-blur-3xl border border-blue-500/30 shadow-[0_25px_70px_rgba(2,6,23,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)]"
              >
                <div className="max-w-2xl mb-8">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Our Mission Statement
                  </h3>
                  <div className="w-16 h-1 rounded-full bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-400 mt-3" />
                  <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                    At <span className="font-semibold text-white">AI</span> <span className="font-semibold text-[#0088ff]">Connect</span><span className="font-semibold text-cyan-400">X</span>, we believe autonomous artificial intelligence should be intuitive, highly responsive, and deeply grounded in real-world application.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                  {missionGoals.map((goal) => (
                    <div
                      key={goal.number}
                      className="rounded-2xl p-6 bg-slate-950/50 border border-sky-400/20 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
                          {goal.number}
                        </span>
                        <h4 className="text-lg font-bold text-white mt-2 mb-3">
                          {goal.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed font-light">
                          {goal.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "architecture" && (
              <motion.div
                key="architecture"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl p-8 sm:p-12 bg-slate-900/40 backdrop-blur-3xl border border-sky-400/25 shadow-[0_25px_70px_rgba(2,6,23,0.8)]"
              >
                <div className="lg:col-span-7">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-300">
                    Dual Pipeline Matrix
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2 mb-4">
                    Cinematic 3D Helix &amp; Synchronized Scroll Engine
                  </h3>
                  <p className="text-sm text-slate-300/85 leading-relaxed font-light mb-6">
                    Our interface leverages a zero-jank dual pipeline: a 240-frame pre-buffered hardware canvas driving the spatial atmospheric background, harmonized with Three.js WebGL geometry for real-time procedural spiral twisting.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300">
                      WebGL 2.0
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-950/60 border border-blue-400/30 text-blue-300">
                      Three.js Fiber
                    </span>
                    <span className="px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-400/30 text-indigo-300">
                      TailwindCSS Glassmorphism
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-sm rounded-2xl bg-slate-950/80 border border-cyan-400/30 p-6 shadow-2xl flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white mb-4 shadow-[0_0_25px_rgba(34,211,238,0.5)]">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      Experience 3D Spiral
                    </h4>
                    <p className="text-xs text-slate-400 mb-5">
                      Interact with the living geometric helix powered by scroll velocity.
                    </p>
                    <button
                      onClick={() => navigate("/#spiral-3d")}
                      className="w-full py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Jump to 3D Spiral</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "ecosystem" && (
              <motion.div
                key="ecosystem"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-5"
              >
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-3xl p-6 bg-slate-900/40 backdrop-blur-3xl border border-sky-400/20 shadow-[0_20px_50px_rgba(2,6,23,0.7)] flex flex-col items-center text-center"
                  >
                    <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 font-mono">
                      {m.value}
                    </span>
                    <span className="text-xs uppercase font-mono tracking-wider text-cyan-200 mt-1 mb-2">
                      {m.unit}
                    </span>
                    <p className="text-xs text-slate-300/80 font-light">
                      {m.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Footer Return Bar ─── */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-serif">
            <span className="italic font-bold text-base text-cyan-300">Ai</span>
            <span className="font-bold text-sm text-[#0088ff] ml-0.5">Connect</span>
            <span className="font-bold text-base text-cyan-300">X</span>
            <span className="ml-2 font-mono text-[10px] text-slate-400">© 2026 Ai ConnectX. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Home Hub
            </button>
            <span>•</span>
            <button
              onClick={() => navigate("/contact")}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <span>•</span>
            <button
              onClick={() => navigate("/spiral-3d")}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              3D Spiral Helix
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
