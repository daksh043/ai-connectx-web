import { useNavigate } from "react-router-dom";
import {
  Layers,
  ArrowLeft,
  Sparkles,
  Compass,
  Cpu,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import AIConnectXNavbar from "../components/zubox/ZuboxNavbar";
import Spiral3DScrollAnimation from "../components/scroll-effects/Spiral3DScrollAnimation";
import AIConnectXFooter from "../components/zubox/AIConnectXFooter";

export default function Spiral3DPage() {
  const navigate = useNavigate();

  const helixProjects = [
    {
      id: "01",
      category: "BRANDING",
      title: "FAHEY SPATIAL",
      desc: "Brand identity system engineered for high-dimensional spatial interfaces.",
      tag: "IDENTITY",
    },
    {
      id: "02",
      category: "DEVELOPMENT",
      title: "REYNOLDS ENGINE",
      desc: "Autonomous edge agent pipeline with zero-latency visual computing.",
      tag: "CORE RUNTIME",
    },
    {
      id: "03",
      category: "AI CONNECTX",
      title: "GENESIS CONCLAVE",
      desc: "Flagship hackathon architecture powering multi-agent problem solving.",
      tag: "NATIONAL CHAMPION",
    },
    {
      id: "04",
      category: "INTELLIGENCE",
      title: "WISOKY NEURAL",
      desc: "Large multimodal vision transformer fine-tuned for robotic navigation.",
      tag: "VISION TRANSFORMER",
    },
    {
      id: "05",
      category: "INNOVATION",
      title: "TRANTOW LAB",
      desc: "Synthetic physics training grounds for bipedal robotic stabilization.",
      tag: "MUJOCO RL",
    },
    {
      id: "06",
      category: "ROBOTICS",
      title: "BERGSTROM BOT",
      desc: "Edge-computed SLAM mapping with hardware-accelerated ROS2 nodes.",
      tag: "HARDWARE TRACK",
    },
    {
      id: "07",
      category: "COMMUNITY",
      title: "UAI CONNECT",
      desc: "Student research collective and mentorship bridging campus to frontier tech.",
      tag: "ECOSYSTEM",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-teal-400 selection:text-black font-sans antialiased overflow-x-clip">
      {/* 1. Global Navigation */}
      <AIConnectXNavbar />

      {/* 2. Hero Introduction Header for 3D Gallery */}
      <header className="relative pt-32 sm:pt-40 pb-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto flex flex-col items-start text-left z-20">
        {/* Back Link */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 mb-6 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO HOME HUB</span>
        </button>

        <div className="relative">
          <div className="absolute -inset-x-12 -inset-y-8 bg-radial-[ellipse_at_left,_rgba(34,211,238,0.12)_0%,_transparent_75%] blur-2xl -z-10 pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>3D SPATIAL ARCHITECTURE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05]">
            3D Spiral <span className="text-cyan-400">Helix</span> Gallery
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-300 font-light max-w-3xl leading-relaxed">
            Experience student innovations in an interactive 3D spatial cylindrical coordinate space.
            Scroll down to advance the double-helix spiral arms and explore project artifacts rendered in full perspective depth.
          </p>
        </div>

        {/* Quick Interaction Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-3xl">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <Compass className="w-5 h-5 text-cyan-400 shrink-0" />
            <div className="text-left">
              <span className="text-xs font-mono text-white/50 block">INTERACTION</span>
              <span className="text-xs text-white font-medium">Scroll to rotate 3D helix</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <Cpu className="w-5 h-5 text-teal-400 shrink-0" />
            <div className="text-left">
              <span className="text-xs font-mono text-white/50 block">PROJECTION</span>
              <span className="text-xs text-white font-medium">1400px Perspective Depth</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-sky-400 shrink-0" />
            <div className="text-left">
              <span className="text-xs font-mono text-white/50 block">CURATION</span>
              <span className="text-xs text-white font-medium">7 Frontier Student Works</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="mt-10 flex items-center gap-2 text-xs font-mono text-cyan-300/80 animate-pulse">
          <ChevronDown className="w-4 h-4" />
          <span>Scroll down to initiate 3D spatial rotation</span>
        </div>
      </header>

      {/* 3. The 3D Spiral Helix Scroll Experience */}
      <main className="relative z-10 w-full">
        <Spiral3DScrollAnimation />

        {/* 4. Project Catalogue Directory */}
        <section className="relative py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto z-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 text-left">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 font-semibold uppercase block mb-2">
                CATALOGUE / 07 ARTIFACTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Featured Helix Artifacts
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Individual project dossiers featured across the spiral stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helixProjects.map((item) => (
              <div
                key={item.id}
                className="group relative p-6 rounded-2xl bg-[#0b0c12]/90 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                      [ {item.id} ]
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300/80 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/50 group-hover:text-cyan-300 transition-colors">
                  <span>CATEGORY: {item.category}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

          {/* Action Callout */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-black/60 border border-cyan-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Want to feature your project on the 3D Helix?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-1.5 max-w-xl">
                AI ConnectX accepts project nominations from Universal AI University student researchers and hackathon champions every semester.
              </p>
            </div>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm transition-all hover:scale-[1.02] cursor-pointer shrink-0 shadow-[0_4px_20px_rgba(34,211,238,0.3)]"
            >
              <span>Submit Project Dossier</span>
            </button>
          </div>
        </section>
      </main>

      {/* 5. Return Footer */}
      <AIConnectXFooter />
    </div>
  );
}
