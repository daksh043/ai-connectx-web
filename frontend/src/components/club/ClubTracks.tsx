import { useState } from "react";
import { Cpu, Eye, Layers, Award, CheckCircle2, ChevronRight } from "lucide-react";
import { useClubTheme } from "../../contexts/ClubThemeContext";

export default function ClubTracks() {
  const [activeTab, setActiveTab] = useState(0);
  const { isDark } = useClubTheme();

  const tracks = [
    {
      id: "agents",
      title: "Autonomous Agents & Swarms",
      icon: Cpu,
      tag: "FLAGSHIP DOMAIN",
      colorDark: "from-blue-500/20 to-sky-500/5",
      colorLight: "from-blue-50 to-amber-50/30",
      accent: "#3b82f6",
      description:
        "Building agentic systems with self-directed tool execution, cognitive memory layers, multi-agent collaboration protocols, and real-world API orchestration.",
      skills: [
        "LangGraph & CrewAI Architectures",
        "Tool Calling & Sandbox Execution",
        "Long-Context Memory & Vector Stores",
        "Agent Evaluation & Evals Benchmarking",
        "Dynamic Task Decomposition",
      ],
      deliverable: "Production AI Agents & Autonomous CLI tools",
    },
    {
      id: "vision",
      title: "Generative Models & Multimodal",
      icon: Eye,
      tag: "RESEARCH & FRONTIER",
      colorDark: "from-purple-500/20 to-pink-500/5",
      colorLight: "from-purple-50 to-pink-50/30",
      accent: "#a855f7",
      description:
        "Fine-tuning open weights models (Llama, DeepSeek, Mistral), real-time computer vision inference, voice generation, and multi-modal sensory pipelines.",
      skills: [
        "LoRA & QLoRA Fine-Tuning",
        "Vision-Language Model Integration",
        "Real-Time Speech & Whisper Pipelines",
        "vLLM & TensorRT Inference Optimization",
        "Synthetic Dataset Distillation",
      ],
      deliverable: "Custom Fine-Tuned Models & Multimodal Apps",
    },
    {
      id: "fullstack",
      title: "Full-Stack & Cloud Architecture",
      icon: Layers,
      tag: "INFRASTRUCTURE",
      colorDark: "from-blue-500/20 to-cyan-500/5",
      colorLight: "from-blue-50 to-cyan-50/30",
      accent: "#3b82f6",
      description:
        "Architecting resilient web systems capable of serving low-latency model streams, scalable SQLite/Postgres data models, and fluid interactive UIs.",
      skills: [
        "FastAPI & Async Python Backends",
        "React 19, TypeScript & Vite Craft",
        "PostgreSQL & Vector Extension Queries",
        "Docker, CI/CD & Cloud Run Deploys",
        "WebSockets & Server-Sent Events",
      ],
      deliverable: "High-Availability SaaS & Developer Portals",
    },
    {
      id: "hackathons",
      title: "Competitive Hackathons & Open Source",
      icon: Award,
      tag: "COMPETITIVE SQUAD",
      colorDark: "from-lime-500/20 to-emerald-500/5",
      colorLight: "from-lime-50 to-emerald-50/30",
      accent: "#83ca16",
      description:
        "Rapid 36-hour product prototyping, pitch deck synthesis, winning Devfolio bounties, and maintaining actively starred GitHub repositories.",
      skills: [
        "Rapid 48-Hour Full-Stack Prototyping",
        "UI Polish & Interactive Micro-Animations",
        "Judging Criteria Optimization",
        "Open-Source Repository Maintenance",
        "DevRel & Technical Documentation",
      ],
      deliverable: "Podium Trophies & High-Star Open Source Repos",
    },
  ];

  return (
    <section
      id="tracks"
      className={`py-24 sm:py-32 px-6 border-t transition-colors duration-500 ${
        isDark ? "bg-[#070709] border-white/8" : "bg-zinc-50/70 border-zinc-200"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[2px] bg-[#3b82f6]" />
          <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#3b82f6]">
            Core Specializations
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2
              className={`font-display font-extrabold text-3xl sm:text-5xl tracking-tight ${
                isDark ? "text-white" : "text-zinc-950"
              }`}
            >
              Four Specialized Tracks. <br />
              <span className={isDark ? "club-blue-gradient-text" : "club-blue-gradient-text-light"}>
                Zero Compromises.
              </span>
            </h2>
          </div>
          <p
            className={`text-sm sm:text-base max-w-md ${
              isDark ? "text-zinc-300" : "text-zinc-600"
            }`}
          >
            Members join a primary squad based on their passion and receive structured roadmaps, mentor reviews, and compute sponsorships.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Track Selector Pills */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {tracks.map((track, idx) => {
              const Icon = track.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTab(idx)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? isDark
                        ? "bg-white/[0.08] border-[#3b82f6] shadow-[0_4px_25px_rgba(59,130,246,0.2)]"
                        : "bg-white border-[#3b82f6] shadow-[0_6px_25px_rgba(59,130,246,0.15)] ring-1 ring-[#3b82f6]/20"
                      : isDark
                      ? "bg-white/[0.02] border-white/8 hover:bg-white/[0.05] hover:border-white/15"
                      : "bg-white/80 border-zinc-200 hover:bg-white hover:border-zinc-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: isActive
                          ? `${track.accent}20`
                          : isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.04)",
                        color: isActive ? track.accent : isDark ? "#a1a1aa" : "#71717a",
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div
                        className={`text-[10px] font-tech font-bold uppercase tracking-wider mb-0.5 ${
                          isDark ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        {track.tag}
                      </div>
                      <div
                        className={`font-display font-bold text-base ${
                          isDark ? "text-white" : "text-zinc-950"
                        }`}
                      >
                        {track.title}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isActive
                        ? "translate-x-1 text-[#3b82f6]"
                        : isDark
                        ? "text-zinc-600"
                        : "text-zinc-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Active Track Showcase Card */}
          <div className="lg:col-span-7">
            {(() => {
              const current = tracks[activeTab];
              const Icon = current.icon;
              return (
                <div
                  className={`rounded-3xl p-8 sm:p-10 border relative overflow-hidden transition-all duration-500 ${
                    isDark
                      ? `club-glass-card border-white/12 bg-gradient-to-br ${current.colorDark}`
                      : `club-light-card border-zinc-200/90 shadow-lg bg-gradient-to-br ${current.colorLight}`
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-tech border ${
                        isDark
                          ? "bg-white/10 border-white/10 text-white"
                          : "bg-white border-zinc-200 text-zinc-900 shadow-sm"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#3b82f6]" />
                      <span>{current.tag}</span>
                    </div>
                    <span
                      className={`text-xs font-tech ${
                        isDark ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      Cohort Capacity: 25 Builders
                    </span>
                  </div>

                  <h3
                    className={`font-display font-black text-2xl sm:text-3xl mb-4 ${
                      isDark ? "text-white" : "text-zinc-950"
                    }`}
                  >
                    {current.title}
                  </h3>

                  <p
                    className={`text-sm sm:text-base leading-relaxed mb-8 ${
                      isDark ? "text-zinc-300" : "text-zinc-600"
                    }`}
                  >
                    {current.description}
                  </p>

                  <div className="mb-8">
                    <h4
                      className={`text-xs font-tech font-bold uppercase tracking-wider mb-3 ${
                        isDark ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      Core Curriculum &amp; Toolkit:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {current.skills.map((skill) => (
                        <div
                          key={skill}
                          className={`flex items-center gap-2 text-xs sm:text-sm ${
                            isDark ? "text-zinc-200" : "text-zinc-700"
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isDark ? "border-white/10" : "border-zinc-200"
                    }`}
                  >
                    <div>
                      <div
                        className={`text-[10px] font-tech uppercase ${
                          isDark ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        Expected Milestone
                      </div>
                      <div
                        className={`text-sm font-display font-bold ${
                          isDark ? "text-white" : "text-zinc-950"
                        }`}
                      >
                        {current.deliverable}
                      </div>
                    </div>
                    <a
                      href="#join"
                      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-tech font-bold text-xs transition-colors ${
                        isDark
                          ? "bg-white text-black hover:bg-[#3b82f6] hover:text-white"
                          : "bg-zinc-950 text-white hover:bg-[#3b82f6]"
                      }`}
                    >
                      Apply for this Track
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
