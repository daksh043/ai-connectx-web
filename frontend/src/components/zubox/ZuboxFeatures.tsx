import { useState } from "react";
import { ArrowLeft, ArrowRight, Globe, Cpu, Zap, CheckCircle2 } from "lucide-react";

interface ExperienceItem {
  id: number;
  num: string;
  title: string;
  badge: string;
  summary: string;
  details: string;
  icon: React.ReactNode;
  highlights: string[];
}

export default function AIConnectXExperiences() {
  const [activeIdx, setActiveIdx] = useState(0);

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      num: "01",
      badge: "COMMUNITY & VISIBILITY",
      title: "Open Community Hub",
      summary: "Interactive events, team spotlights, project showcases, and student publications.",
      details:
        "Showcases the technical vitality of the Ai ConnectX student chapter. Spotlights hackathons, AI Conclaves, student open-source repositories, and hands-on workshops.",
      icon: <Globe className="w-6 h-6 text-cyan-300" />,
      highlights: ["Student project showcases", "AI Conclave & workshops", "Open learning resources"],
    },
    {
      id: 2,
      num: "02",
      badge: "AI LABS & RESEARCH",
      title: "Innovation & Model Engineering",
      summary: "Students engineer generative models, autonomous agents, and computer vision systems.",
      details:
        "Empowers student researchers to build production-grade AI solutions, publish open-source models, benchmark neural architectures, and collaborate on cutting-edge machine learning projects.",
      icon: <Cpu className="w-6 h-6 text-teal-300" />,
      highlights: ["Edge model quantization & PyTorch", "Autonomous multi-agent systems", "Open-source GitHub repositories"],
    },
    {
      id: 3,
      num: "03",
      badge: "HACKATHONS & CONCLAVES",
      title: "Competitive Challenges",
      summary: "Flagship 24h hackathons, datathons, industry tech sprints, and guest keynotes.",
      details:
        "Brings together developers, designers, and AI researchers to solve real-world problems under time constraints with mentorship from leading industry technologists.",
      icon: <Zap className="w-6 h-6 text-emerald-300" />,
      highlights: ["Annual Flagship AI Conclave", "24-Hour Datathons & Hackathons", "Industry mentorship & live evaluations"],
    },
  ];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="solution"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 lg:px-16 max-w-7xl mx-auto z-10 select-none"
    >
      {/* Header Row: Title & Right Subtext */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
        <div className="lg:col-span-7">
          <span className="text-teal-400 uppercase tracking-[0.25em] text-xs font-semibold mb-4 block font-mono">
            02 / THE PILLARS
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.05] drop-shadow-sm">
            One platform. <br />
            Three pillars of innovation.
          </h2>
        </div>

        <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between gap-6">
          <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed max-w-sm lg:text-right">
            An open technical ecosystem pairing student community visibility with hands-on AI engineering and high-intensity hackathons.
          </p>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous experience"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all cursor-pointer backdrop-blur-xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next experience"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all cursor-pointer backdrop-blur-xs"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Interactive Cards (PDF Page 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {experiences.map((exp, idx) => {
          const isActive = idx === activeIdx;

          return (
            <div
              key={exp.id}
              onClick={() => setActiveIdx(idx)}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer min-h-[380px] relative overflow-hidden group ${
                isActive
                  ? "bg-[#0b3844]/90 border border-teal-400/40 shadow-2xl scale-[1.02]"
                  : "bg-black/35 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-black/45"
              }`}
            >
              {/* Header: Number + Icon */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-3xl font-light tracking-tight transition-colors ${
                    isActive ? "text-teal-300 font-mono" : "text-white/40 font-mono"
                  }`}
                >
                  {exp.num}
                </span>

                <div
                  className={`p-3 rounded-2xl border transition-all ${
                    isActive
                      ? "bg-teal-400/20 border-teal-400/40 scale-105"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  {exp.icon}
                </div>
              </div>

              {/* Body */}
              <div className="my-auto pt-6">
                <span className="text-[11px] font-mono tracking-widest text-teal-300 uppercase block mb-2 font-semibold">
                  {exp.badge}
                </span>
                <h3
                  className={`text-2xl sm:text-3xl font-medium tracking-tight mb-3 transition-colors ${
                    isActive ? "text-white" : "text-white/90"
                  }`}
                >
                  {exp.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-4 transition-colors ${
                    isActive ? "text-white/95" : "text-white/65"
                  }`}
                >
                  {exp.summary}
                </p>

                {/* Bullets */}
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  {exp.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-white/70"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
                <span className={isActive ? "text-teal-300" : "text-white/60"}>
                  Explore Module
                </span>
                <span className="text-white">→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Target Community Banner */}
      <div className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-white/40 uppercase tracking-widest">
            COMMUNITY:
          </span>
          <span className="text-white/80">AI &amp; ML Students</span>
          <span className="text-white/30">•</span>
          <span className="text-white/80">Core Technical Leads</span>
          <span className="text-white/30">•</span>
          <span className="text-white/80">Research Mentors</span>
          <span className="text-white/30">•</span>
          <span className="text-white/80">Industry Keynote Speakers</span>
        </div>

        <div className="text-teal-300 font-medium">
          Core mission: Accelerating student AI intelligence and engineering excellence.
        </div>
      </div>
    </section>
  );
}
