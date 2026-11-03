import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Sparkles,
  ExternalLink,
  ArrowUpRight,
  CheckCircle2,
  Users,
  Layers,
  Rotate3d,
} from "lucide-react";
import AIConnectXNavbar from "../components/zubox/ZuboxNavbar";
import AIConnectXFooter from "../components/zubox/AIConnectXFooter";
import HorizontalScrollingSection from "../components/scroll-effects/HorizontalScrollingSection";
import SoffitGradientCanvas from "../components/zubox/SoffitGradientCanvas";

interface ProjectItem {
  id: string;
  tag: string;
  category: "masterclass" | "agentic" | "industry" | "student";
  title: string;
  summary: string;
  image: string;
  status: string;
  tech: string[];
  mentor: string;
  deliverables: string[];
  link?: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "p1",
    tag: "EXPERT MASTERCLASS",
    category: "masterclass",
    title: "AI Engineering × Agentic Systems",
    summary:
      "Exclusive masterclass by Mr. Dipan Mehta at Universal AI University. Deep dive into production LLM routing, Retrieval-Augmented Generation (RAG), and deterministic multi-agent loop architectures.",
    image: "/gallery/workshop.jpg",
    status: "Flagship Session",
    tech: ["Agentic AI", "RAG Pipelines", "LLM Workflows", "Prompt Chains", "Vector DBs"],
    mentor: "Mr. Dipan Mehta (Industry Leader)",
    deliverables: [
      "Production-grade agent loop design patterns",
      "Vector database indexing & hybrid retrieval strategies",
      "Hands-on live deployment at Universal AI University",
    ],
    link: "https://www.linkedin.com/company/ai-connectx-ai/",
  },
  {
    id: "p2",
    tag: "LEADERSHIP & PATRONAGE",
    category: "industry",
    title: "Patron Guidance & Industry Liaison",
    summary:
      "Curated directly by Patron Mr. Pranav More, establishing direct conduits between UAI students and Fortune 500 tech leadership, tech accelerators, and executive mentoring circles.",
    image: "/gallery/robotics.jpg",
    status: "Active Initiative",
    tech: ["Corporate Mentorship", "Executive Network", "Startup Conduits", "UAI Network"],
    mentor: "Mr. Pranav More (Patron, AI ConnectX)",
    deliverables: [
      "Direct 1-on-1 mentorship with corporate executives",
      "Exclusive access to corporate innovation challenges",
      "Fast-track recommendations for high-growth AI roles",
    ],
    link: "https://www.linkedin.com/company/ai-connectx-ai/",
  },
  {
    id: "p3",
    tag: "EXPERIENTIAL LEARNING",
    category: "industry",
    title: "Live Industry Projects & Internships",
    summary:
      "Bridging classroom theory with commercial production. Students collaborate directly on live enterprise deliverables, shadow senior engineers, and gain battle-tested internship experience.",
    image: "/gallery/hackathon.jpg",
    status: "Ongoing Intake",
    tech: ["Live Projects", "Internships", "Company Visits", "Applied Engineering"],
    mentor: "Daksh Khandagale & Corporate Partners",
    deliverables: [
      "Verifiable corporate project contributions on GitHub",
      "Official certificate of industry completion",
      "Pre-placement interview pipelines with partner firms",
    ],
    link: "https://www.linkedin.com/company/ai-connectx-ai/",
  },
  {
    id: "p4",
    tag: "STUDENT INNOVATION",
    category: "student",
    title: "UAI AI Innovators Collective",
    summary:
      "A fast-paced student collective creating breakthrough hackathon prototypes, automated robotics vision systems, and collaborative neural labs across cohorts.",
    image: "/gallery/trophy.jpg",
    status: "Community Hub",
    tech: ["Hackathons", "Alumni Connect", "Collaborative Labs", "Workshops"],
    mentor: "AI ConnectX Core Committee",
    deliverables: [
      "National and global hackathon competition teams",
      "Internal 24-hour sprint hackathons with sponsor bounties",
      "Cross-disciplinary peer code reviews & open-source releases",
    ],
    link: "https://www.linkedin.com/company/ai-connectx-ai/",
  },
  {
    id: "p5",
    tag: "FRONTIER TECH",
    category: "agentic",
    title: "From Answering to Acting: Agentic AI",
    summary:
      "Hands-on exploratory track researching autonomous multi-agent systems, tool execution frameworks, stateful memory consolidation, and deterministic dispatching.",
    image: "/ai_club_robot.jpg",
    status: "Research Track",
    tech: ["Multi-Agent Loops", "Tool Execution", "Deterministic Dispatch", "Autonomous Systems"],
    mentor: "AI ConnectX Research Lab",
    deliverables: [
      "Autonomous tool-calling agents for CRM & outreach automation",
      "Benchmarking report on multi-agent consensus vs single LLMs",
      "Production-ready open-source agent starters",
    ],
    link: "https://www.linkedin.com/company/ai-connectx-ai/",
  },
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeView, setActiveView] = useState<"rail" | "grid">("rail");

  const filteredProjects =
    selectedCategory === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-teal-400 selection:text-black font-sans antialiased overflow-x-hidden">
      {/* Ambient living Soffit WebGL2 background at low opacity for stunning aesthetic */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <SoffitGradientCanvas enableEvents={false} />
        <div className="absolute inset-0 bg-[#050507]/80 backdrop-blur-3xl" />
      </div>

      {/* Fixed Navigation */}
      <AIConnectXNavbar />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <div className="flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-wider text-cyan-300 uppercase">
                02 / INNOVATION LABS &amp; ENGINEERING
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
              Featured Projects &amp; <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Frontier AI Tracks
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
              Hands-on engineering tracks, student-built agentic architectures,
              industry masterclasses with corporate executives, and real-world
              enterprise deliverables at Universal AI University.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">5+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">
                  Active Tracks
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">100+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">
                  Student Builders
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">12+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">
                  Industry Liaisons
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">
                  Applied Practice
                </div>
              </div>
            </div>

            {/* Interactive 3D Spatial Spaces Banner */}
            <div className="w-full mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#014BAA]/30 via-cyan-950/40 to-blue-950/30 border border-cyan-400/35 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#014BAA] border border-[#F8F3F0]/40 flex items-center justify-center text-[#F8F3F0] shadow-[0_0_15px_rgba(1,75,170,0.6)]">
                  <Rotate3d className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white tracking-wide">
                      3D Living Cylinder Reel Wall
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-mono font-bold uppercase tracking-wider">
                      NEW 3D
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    16-card living cylinder transitioning from stacked deal into an interior 1800px wall recycling 48 reels.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Link
                  to="/cylinder"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-[#0088ff] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all cursor-pointer"
                >
                  <span>Launch 3D Cylinder</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
                <Link
                  to="/spiral-3d"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 transition-all cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-300" />
                  <span>3D Helix</span>
                </Link>
              </div>
            </div>

            {/* View Switcher & Category Filter */}
            <div className="flex flex-wrap items-center justify-between gap-4 w-full mt-6 pt-6 border-t border-white/10">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All Tracks" },
                  { id: "masterclass", label: "Masterclasses" },
                  { id: "agentic", label: "Agentic Systems" },
                  { id: "industry", label: "Industry Conduits" },
                  { id: "student", label: "Student Labs" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      selectedCategory === tab.id
                        ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                        : "bg-white/[0.05] text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-white/[0.04] p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setActiveView("rail")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeView === "rail"
                      ? "bg-white/20 text-white font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Kinetic Rail View
                </button>
                <button
                  onClick={() => setActiveView("grid")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeView === "grid"
                      ? "bg-white/20 text-white font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Detailed Grid View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode 1: Kinetic Rail View (The Iconic Horizontal Scroll) */}
        {activeView === "rail" && (
          <div className="w-full">
            <HorizontalScrollingSection />
          </div>
        )}

        {/* View Mode 2: Detailed Matrix Grid */}
        {activeView === "grid" && (
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col justify-between rounded-3xl p-6 bg-slate-950/70 border border-white/15 backdrop-blur-xl hover:border-cyan-400/50 hover:shadow-[0_8px_30px_rgba(34,211,238,0.15)] transition-all overflow-hidden"
                >
                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Image Thumbnail */}
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                          {project.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="text-xs font-mono font-medium text-white/90">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Title & Summary */}
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    {/* Mentor & Outcomes */}
                    <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Lead / Patron: <strong className="text-white font-medium">{project.mentor}</strong></span>
                      </div>
                      <div className="space-y-1 pt-1">
                        {project.deliverables.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-slate-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.06] text-slate-300 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer CTA */}
                  <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400">
                      Universal AI University
                    </span>
                    <a
                      href={project.link || "https://www.linkedin.com/company/ai-connectx-ai/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-cyan-300 group/btn"
                    >
                      <span>Explore Initiative</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Callout: Propose an Initiative */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20">
          <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-blue-950/40 border border-cyan-500/30 backdrop-blur-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase block mb-2">
                HACKATHONS · LABS · COLLABORATION
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Have an AI Project Idea or Corporate Challenge?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
                Connect directly with the AI CONNECTX engineering team to pitch research tracks, sponsor student hackathon challenges, or propose enterprise internships.
              </p>
            </div>
            <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.linkedin.com/company/ai-connectx-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-400 to-[#0088ff] text-slate-950 hover:brightness-110 shadow-[0_4px_20px_rgba(0,229,255,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Propose Track on LinkedIn</span>
                <ExternalLink className="w-4 h-4 text-slate-950 stroke-[2]" />
              </a>
              <a
                href="mailto:connect@aiconnectx.club"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              >
                <span>Email Lab Lead</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <AIConnectXFooter />
    </div>
  );
}
