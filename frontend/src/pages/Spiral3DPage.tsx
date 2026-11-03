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
import SoffitGradientCanvas from "../components/zubox/SoffitGradientCanvas";

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
    <div className="relative min-h-screen w-full max-w-full bg-[#030306] text-white selection:bg-cyan-500 selection:text-black font-sans antialiased overflow-x-hidden">
      {/* ─── Ambient Living WebGL2 Soffit Background ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <SoffitGradientCanvas enableEvents={false} />
        <div className="absolute inset-0 bg-[#030306]/80" />
      </div>

      {/* ─── Refreshed Global Ambient Atmospheric Mesh & Spatial Grid ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Spatial Coordinate Matrix Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(65, 105, 225, 0.16) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(34, 211, 238, 0.10) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 35%, black 25%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 35%, black 25%, transparent 85%)",
          }}
        />

        {/* Royal Blue Cosmic Spotlight */}
        <div
          className="absolute -top-[12%] -left-[10%] w-[75vw] h-[75vw] max-w-[950px] max-h-[950px] rounded-full blur-[140px] opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(65, 105, 225, 0.45) 0%, rgba(29, 60, 181, 0.22) 45%, transparent 70%)",
          }}
        />
        {/* Cyber Cyan Aura */}
        <div
          className="absolute top-[28%] -right-[15%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-[150px] opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.35) 0%, rgba(2, 132, 199, 0.15) 40%, transparent 70%)",
          }}
        />
        {/* Deep Royal Indigo Floor Refraction */}
        <div
          className="absolute bottom-[-10%] left-[20%] w-[65vw] h-[55vw] max-w-[850px] rounded-full blur-[160px] opacity-35"
          style={{
            background: "radial-gradient(circle, rgba(65, 105, 225, 0.35) 0%, rgba(34, 211, 238, 0.15) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* 1. Global Navigation */}
      <AIConnectXNavbar />

      {/* 2. Hero Introduction Header for 3D Gallery */}
      <header className="relative pt-32 sm:pt-40 pb-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto flex flex-col items-start text-left z-20">
        {/* Back Link */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 mb-6 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-cyan-400" />
          <span className="tracking-widest uppercase">BACK TO HOME HUB</span>
        </button>

        <div className="relative">
          <div
            className="absolute -inset-x-12 -inset-y-8 blur-3xl -z-10 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at left, rgba(34, 211, 238, 0.22) 0%, rgba(65, 105, 225, 0.20) 45%, transparent 75%)",
            }}
          />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>3D SPATIAL ARCHITECTURE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05]">
            3D Spiral{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(65,105,225,0.6)]">
              Helix
            </span>{" "}
            Gallery
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-300 font-light max-w-3xl leading-relaxed">
            Experience student innovations in an interactive 3D spatial cylindrical coordinate space.
            Scroll down to advance the double-helix spiral arms and explore project artifacts rendered in full perspective depth.
          </p>
        </div>

        {/* Quick Interaction Guide with Royal Blue & Cyber Cyan accents */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-3xl">
          <div className="p-4 rounded-xl bg-[#090b16]/80 border border-blue-500/20 hover:border-cyan-500/40 transition-colors flex items-center gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <Compass className="w-5 h-5 text-cyan-400 shrink-0" />
            <div className="text-left">
              <span className="text-xs font-mono text-white/50 block">INTERACTION</span>
              <span className="text-xs text-white font-medium">Scroll to rotate 3D helix</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#090b16]/80 border border-blue-500/20 hover:border-blue-400/50 transition-colors flex items-center gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <Cpu className="w-5 h-5 text-blue-400 shrink-0" />
            <div className="text-left">
              <span className="text-xs font-mono text-white/50 block">PROJECTION</span>
              <span className="text-xs text-white font-medium">1400px Perspective Depth</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#090b16]/80 border border-blue-500/20 hover:border-cyan-400/50 transition-colors flex items-center gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <Sparkles className="w-5 h-5 text-cyan-300 shrink-0" />
            <div className="text-left">
              <span className="text-xs font-mono text-white/50 block">CURATION</span>
              <span className="text-xs text-white font-medium">7 Frontier Student Works</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="mt-10 flex items-center gap-2 text-xs font-mono text-cyan-300/90 animate-pulse">
          <ChevronDown className="w-4 h-4 text-cyan-400" />
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
              <span className="text-xs sm:text-sm font-['Outfit',sans-serif] tracking-[0.22em] text-cyan-400 font-bold uppercase block mb-2">
                CATALOGUE / 07 ARTIFACTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Featured Helix Artifacts
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-['Outfit',sans-serif]">
              Individual project dossiers featured across the spiral stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helixProjects.map((item) => (
              <div
                key={item.id}
                className="group relative p-6 rounded-2xl bg-[#070812]/90 border border-blue-900/30 hover:border-cyan-400/60 transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_40px_rgba(34,211,238,0.2),0_0_24px_rgba(30,64,218,0.2)] flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-blue-300 px-2.5 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 group-hover:border-cyan-400/50 group-hover:text-cyan-300 transition-colors">
                      [ {item.id} ]
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-cyan-300/70 uppercase">
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
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {/* Action Callout */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#071330]/90 via-[#0a1835]/90 to-[#030306]/95 border border-cyan-500/30 shadow-[0_20px_60px_rgba(34,211,238,0.15),0_0_40px_rgba(30,64,218,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:brightness-110 text-slate-950 font-bold text-xs sm:text-sm transition-all hover:scale-[1.02] cursor-pointer shrink-0 shadow-[0_4px_25px_rgba(34,211,238,0.4)]"
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
