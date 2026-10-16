import { useState } from "react";
import { ArrowUpRight, Cpu, Network, Layers, LayoutGrid, GitCommit } from "lucide-react";
import FloatingScrollBadge from "./FloatingScrollBadge";

export default function ClubProjects() {
  const [viewMode, setViewMode] = useState<"cards" | "timeline">("cards");

  const projects = [
    {
      id: "01",
      number: "01",
      title: "XYZ PROJECTS",
      subname: "Autonomous Spatial Vision & Drone Perception",
      category: "Computer Vision // Edge AI",
      desc: "Immerse yourself in industry insights through ideations, hackathons, and expert keynotes. Explore NLP, MLOps, Computer Vision, etc. Experience hands-on workshops.",
      metrics: "14ms Latency • ONNX Runtime • YOLOv10",
      tech: ["PyTorch", "ROS2", "TensorRT", "C++"],
      accent: "#CEFD46",
      icon: Cpu,
    },
    {
      id: "02",
      number: "02",
      title: "XYZ PROJECTS",
      subname: "Agentic LLM Swarm & Multi-Tool Compiler",
      category: "Generative AI // Autonomous Agents",
      desc: "Immerse yourself in industry insights through ideations, hackathons, and expert keynotes. Explore NLP, MLOps, Computer Vision, etc. Experience hands-on workshops.",
      metrics: "99.4% Eval Pass • Raft Consensus • 25 Agents",
      tech: ["Python", "FastAPI", "LangGraph", "Docker"],
      accent: "#CEFD46",
      icon: Network,
    },
    {
      id: "03",
      number: "03",
      title: "XYZ PROJECTS",
      subname: "Bio-Medical Pathological Diagnostics AI",
      category: "Healthcare // Deep Learning",
      desc: "Immerse yourself in industry insights through ideations, hackathons, and expert keynotes. Explore NLP, MLOps, Computer Vision, etc. Experience hands-on workshops.",
      metrics: "96.2% F1 Accuracy • Regional Triage",
      tech: ["PyTorch", "MONAI", "FastAPI", "React 19"],
      accent: "#CEFD46",
      icon: Layers,
    },
  ];

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 px-4 sm:px-8 bg-[#161719] text-white border-b border-[#2B2D33] overflow-hidden bg-ai-dots-dark"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Top Control Bar with View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16 pb-6 border-b border-zinc-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#CEFD46] block mb-1">
              Engineered In-House
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight">
              Flagship Club Deployments
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-[#1F2023] p-1.5 rounded-full border border-zinc-800">
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                viewMode === "cards"
                  ? "bg-[#CEFD46] text-black font-bold shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards (Page 11)</span>
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                viewMode === "timeline"
                  ? "bg-[#CEFD46] text-black font-bold shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>Timeline (Page 14)</span>
            </button>
          </div>
        </div>

        {/* ─── Mode 1: Cards View matching Page 11 of PDF ─── */}
        {viewMode === "cards" && (
          <div className="relative flex flex-col lg:flex-row gap-8 items-stretch">
            
            {/* Left Edge: Vertical "P R O J E C T S" Typography (Page 11) */}
            <div className="hidden lg:flex flex-col justify-center items-center px-4 py-8 select-none border-r border-zinc-800">
              <span className="font-display font-black text-2xl tracking-[1.2em] uppercase text-zinc-300 writing-mode-vertical rotate-180">
                PROJECTS
              </span>
            </div>

            {/* Project Cards (Page 11) */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projects.map((proj) => {
                const IconComponent = proj.icon;
                return (
                  <div
                    key={proj.id}
                    className="group bg-[#2A2B30] rounded-3xl p-6 sm:p-8 border border-zinc-700/60 hover:border-[#CEFD46] transition-all duration-300 flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      {/* Top Row: Lime Green Circular Preview / Icon */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#D7F771] flex items-center justify-center p-4 transition-transform group-hover:scale-105 shadow-md">
                          <IconComponent className="w-9 h-9 sm:w-11 sm:h-11 text-black stroke-[1.75]" />
                        </div>
                        <span className="text-4xl sm:text-5xl font-black font-display text-zinc-300 group-hover:text-[#CEFD46] transition-colors">
                          {proj.number}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white mb-1">
                        {proj.title}
                      </h3>
                      <div className="text-xs font-mono text-[#CEFD46] mb-4">
                        {proj.subname}
                      </div>

                      {/* Description Matching Page 11 */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mb-6">
                        {proj.desc}
                      </p>
                    </div>

                    {/* Bottom Metadata & Tags */}
                    <div className="pt-4 border-t border-zinc-700/80 space-y-3">
                      <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400">
                        <span>METRICS</span>
                        <span className="text-zinc-200">{proj.metrics}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            className="bg-black/40 text-zinc-300 text-[10px] font-mono px-2 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Action: Big Circular "VIEW MORE PROJECTS ↗" Button (Page 11) */}
            <div className="flex flex-col justify-center items-center lg:items-start lg:pl-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center justify-center text-center w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#1F2023] border-2 border-zinc-600 hover:border-[#CEFD46] transition-all hover:scale-105 active:scale-95 shadow-2xl cursor-pointer"
              >
                <span className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white group-hover:text-[#CEFD46] transition-colors leading-tight px-4">
                  VIEW MORE
                  <br />
                  PROJECTS
                </span>
                <div className="mt-2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#CEFD46] transition-colors">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </div>
          </div>
        )}

        {/* ─── Mode 2: Vertical Roadmap Timeline matching Page 14 of PDF ─── */}
        {viewMode === "timeline" && (
          <div className="relative py-12 max-w-4xl mx-auto">
            {/* Header: "Our Project" from Page 14 */}
            <h3 className="text-center text-4xl sm:text-5xl font-black font-display uppercase tracking-tight mb-16 text-white">
              Our Project
            </h3>

            {/* Center Vertical White Line from Page 14 */}
            <div className="absolute left-1/2 top-32 bottom-8 w-[2px] bg-white -translate-x-1/2 pointer-events-none hidden md:block" />

            <div className="space-y-16 relative">
              {projects.map((proj, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={proj.id}
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Visual Card (Lime Screen Box from Page 14) */}
                    <div className="w-full md:w-1/2">
                      <div className="w-full aspect-[4/3] rounded-3xl bg-[#D7F771] border-4 border-[#CEFD46] p-6 flex flex-col justify-between shadow-xl">
                        <div className="flex items-center justify-between font-mono text-xs text-black font-bold">
                          <span>MILESTONE {proj.number}</span>
                          <span>DEPLOYED</span>
                        </div>
                        <div className="text-center font-display font-black text-3xl sm:text-4xl text-black/80 uppercase">
                          {proj.subname}
                        </div>
                        <div className="font-mono text-xs text-black/70">
                          {proj.metrics}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Dot Node (Page 14) */}
                    <div className="w-6 h-6 rounded-full bg-white border-4 border-[#161719] shadow-lg shrink-0 z-10 hidden md:block" />

                    {/* Description Text Box from Page 14 */}
                    <div className="w-full md:w-1/2 bg-[#1F2023] p-6 sm:p-8 rounded-3xl border border-zinc-800">
                      <span className="font-mono text-xs text-[#CEFD46] block mb-1">
                        PHASE {proj.number} // {proj.category}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold font-display uppercase mb-3">
                        {proj.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                        {proj.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Floating SCROLL TO EXPLORE Badge (Page 11 & Page 14) */}
        <div className="flex justify-end mt-12">
          <FloatingScrollBadge targetId="magazine" dark={true} />
        </div>
      </div>
    </section>
  );
}
