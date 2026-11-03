"use client";

import { Eye, Trophy, Users, Code, Award, Sparkles, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChatInput } from "@/components/ui/border-beam-demo";

interface ChronicleItem {
  id: number;
  title: string;
  tag: string;
  aspect: string;
  bgGradient: string;
  accentColor: string;
  caption: string;
  icon: React.ElementType;
}

const CHRONICLE_ITEMS: ChronicleItem[] = [
  {
    id: 1,
    title: "AI Conclave Main Stage",
    tag: "FLAGSHIP AUDITORIUM",
    aspect: "col-span-12 md:col-span-8 min-h-[300px] sm:min-h-[340px]",
    bgGradient: "from-cyan-950/40 via-[#070b14]/70 to-[#050507]",
    accentColor: "#00b4d8",
    caption: "500+ student innovators & research architects packed inside the Central Keynote Hall exploring frontier model orchestration.",
    icon: Users,
  },
  {
    id: 2,
    title: "24h Hackathon Midnight Sprints",
    tag: "CODE JAM",
    aspect: "col-span-12 md:col-span-4 min-h-[300px] sm:min-h-[340px]",
    bgGradient: "from-blue-950/40 via-[#070b14]/70 to-[#050507]",
    accentColor: "#38bdf8",
    caption: "High-intensity overnight builds engineering autonomous agent loops, RAG graphs, and edge endpoints.",
    icon: Code,
  },
  {
    id: 3,
    title: "Autonomous Rover Perception Test",
    tag: "ROBOTICS LAB",
    aspect: "col-span-12 md:col-span-4 min-h-[300px] sm:min-h-[340px]",
    bgGradient: "from-teal-950/40 via-[#070b14]/70 to-[#050507]",
    accentColor: "#2dd4bf",
    caption: "Real-time edge testing of point-cloud LiDAR SLAM, computer vision sensor fusion, and zero-shot obstacle avoidance.",
    icon: Eye,
  },
  {
    id: 4,
    title: "Grand Prize Trophy Ceremony",
    tag: "PODIUM CELEBRATION",
    aspect: "col-span-12 md:col-span-5 min-h-[300px] sm:min-h-[340px]",
    bgGradient: "from-sky-950/40 via-[#070b14]/70 to-[#050507]",
    accentColor: "#0ea5e9",
    caption: "Honoring breakthrough autonomous multi-agent systems and student-led production initiatives.",
    icon: Trophy,
  },
  {
    id: 5,
    title: "ArXiv Paper Reading Circle",
    tag: "RESEARCH DISSECTION",
    aspect: "col-span-12 md:col-span-3 min-h-[300px] sm:min-h-[340px]",
    bgGradient: "from-indigo-950/40 via-[#070b14]/70 to-[#050507]",
    accentColor: "#818cf8",
    caption: "Weekly whiteboard dissection of test-time compute, reasoning models, and frontier architectures.",
    icon: Award,
  },
];

export default function AIConnectXChronicles() {
  return (
    <section
      id="chronicles"
      className="relative z-20 py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#050507] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Background glow ambiance */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
                Moments, Sprints & Milestones
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase font-sans">
              CLUB <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">CHRONICLES</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Snapshots and dispatches from our 24h hackathons, paper reading cohorts,
            robotics perception trials, and high-energy developer summits at Universal AI University.
          </p>
        </div>

        {/* ─── Interactive BorderBeam Agent Console ─── */}
        <div className="mb-14 flex flex-col items-center justify-center">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 600,
              maxWidth: "100%",
              minHeight: 260,
              margin: "0 auto",
              background: "#0d0d0f",
              borderRadius: 24,
              border: "1px solid rgba(255, 255, 255, 0.06)",
              padding: "32px 20px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7)",
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-400">
                Autonomous Agent Dispatch
              </span>
            </div>
            <BorderBeam size="md" colorVariant="colorful">
              <ChatInput />
            </BorderBeam>
          </div>
        </div>

        {/* ─── Bento Grid Layout ─── */}
        <div className="grid grid-cols-12 gap-5 sm:gap-6 relative">
          {CHRONICLE_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                className={`${item.aspect} relative rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-cyan-400/40 bg-gradient-to-br ${item.bgGradient} backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between group overflow-hidden transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Subtle cyber grid dot overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-60" />

                {/* Top Badge Row */}
                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className="font-mono text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10 bg-black/40 backdrop-blur-md"
                    style={{ color: item.accentColor }}
                  >
                    {item.tag}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/50 transition-all duration-300">
                    <Icon className="w-4 h-4 text-slate-300 group-hover:text-cyan-300 transition-colors" />
                  </div>
                </div>

                {/* Bottom Narrative / Info */}
                <div className="relative z-10 mt-auto pt-6">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-slate-300/90 leading-relaxed max-w-lg">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

