import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  X,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import ScrollCanvasBackground from "../components/zubox/ScrollCanvasBackground";
import AIConnectXNavbar from "../components/zubox/ZuboxNavbar";
import HolographicTeamCard, { type TeamMember } from "../components/zubox/HolographicTeamCard";

export default function TeamPage() {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [viewMode, setViewMode] = useState<"featured" | "all">("featured");
  const [hoveredDirectoryId, setHoveredDirectoryId] = useState<string | null>("daksh");

  // Core Leadership Team Members from Official LinkedIn Roster
  const featuredTeam: TeamMember[] = [
    {
      id: "daksh",
      name: "DAKSH RAJESH KHANDAGALE",
      role: "PRESIDENT & FOUNDER",
      title: "Lead Architect",
      dept: "Universal AI University · AI & ML",
      image: "/team/daksh.jpg",
      bio: "President and Founder of AI CONNECTX at Universal AI University. Pioneer in autonomous agentic loops, enterprise industry pipelines, edge model orchestration, and student-to-corporate engineering bridges.",
      contributions: [
        "Founded and architected the AI CONNECTX organization and vision",
        "Conducted industry masterclasses in Agentic AI & Frontier LLM workflows",
        "Engineered the 240-frame high-performance cinematic visualizers",
      ],
      skills: ["PyTorch", "System Architecture", "Agentic Systems", "React & TypeScript"],
      badge: "PRESIDENT",
    },
    {
      id: "pranav",
      name: "MR. PRANAV MORE",
      role: "PATRON, AI CONNECTX",
      title: "Organization Patron",
      dept: "Universal AI University",
      image: "/team/pranav.jpg",
      bio: "Distinguished Patron of AI CONNECTX at Universal AI University. Championing student innovation, strategic industry liaisons, and cross-disciplinary AI initiatives that bridge academic talent with real-world enterprise.",
      contributions: [
        "Executive patronage and institutional backing for AI CONNECTX initiatives",
        "Strategic industry relationship curation and corporate masterclass oversight",
        "Empowering student-led research and live hackathon deployments",
      ],
      skills: ["Strategic Leadership", "Corporate Liaisons", "Institutional Growth", "Mentorship"],
      badge: "PATRON",
    },
    {
      id: "ratnadeep",
      name: "RATNADEEP PATIL",
      role: "OPERATIONS & OUTREACH LEAD",
      title: "Operations Lead",
      dept: "Universal AI University",
      image: "/team/daksh.jpg",
      bio: "Directs organizational operations, industry outreach, external relations, and masterclass coordination across the AI ConnectX ecosystem.",
      contributions: [
        "Managed speaker logistics for AI Engineering & Agentic Systems sessions",
        "Coordinated student participation and corporate partner engagement",
        "Standardized operational workflows across active working tracks",
      ],
      skills: ["Operations", "Strategic Outreach", "Community Management", "Event Logistics"],
      badge: "OPERATIONS",
    },
    {
      id: "purna",
      name: "PURNA SAI VENKAT GODAVARTHI",
      role: "TECHNICAL SYSTEMS LEAD",
      title: "Engineering Lead",
      dept: "Universal AI University",
      image: "/team/yusuf.jpg",
      bio: "Spearheads technical infrastructure, developer tooling, and hands-on system benchmarks for student builders tackling enterprise AI challenges.",
      contributions: [
        "Built distributed compute workflows for student AI models",
        "Led hands-on lab deployments during technical workshops",
        "Authored system evaluation frameworks for project vetting",
      ],
      skills: ["Python", "Cloud Systems", "Model Optimization", "Distributed Inference"],
      badge: "TECH LEAD",
    },
  ];

  // Extended Directory Members (Matching the multi-column directory)
  const directoryMembers: TeamMember[] = [
    ...featuredTeam,
    {
      id: "hemanth",
      name: "HEMANTH HARIHARAN MADDILA",
      role: "AGENTIC ARCHITECTURE LEAD",
      title: "Agentic Systems Specialist",
      dept: "Universal AI University",
      image: "/team/daksh.jpg",
      bio: "Specializes in multi-agent tool execution loops, context grounding, and autonomous engineering frameworks.",
      contributions: ["Designed agentic tool-calling prototypes", "Evaluated frontier LLM reasoning capabilities"],
      skills: ["LangChain", "Autogen", "Python", "Vector Databases"],
      badge: "AGENTIC AI",
    },
    {
      id: "angad",
      name: "ANGAD MISHRA",
      role: "GROWTH & COMMUNITY LEAD",
      title: "Community Director",
      dept: "Universal AI University",
      image: "/team/rhea.jpg",
      bio: "Drives community engagement, hackathon registration pipelines, and corporate branding initiatives.",
      contributions: ["Scaled active student membership across cohorts", "Curated visual identity and media communications"],
      skills: ["Community Building", "Growth Strategy", "Content Curation", "Event Hosting"],
      badge: "COMMUNITY",
    },
    {
      id: "yusuf",
      name: "YUSUF CHOUGLE",
      role: "TECHNICAL CO-LEAD & DEV",
      title: "Technical Co-Lead",
      dept: "Universal AI University · AI & ML",
      image: "/team/yusuf.jpg",
      bio: "Technical co-lead spearheading full-stack web integration, modern UI architecture, interactive 3D components, and high-performance frontend engineering workflows.",
      contributions: [
        "Implemented high-performance interactive animations & state telemetry",
        "Engineered responsive layout breakpoints and animation telemetry",
        "Authored technical project specifications and review criteria",
      ],
      skills: ["Full-Stack Dev", "FastAPI & Python", "Tailwind CSS", "Data Structures"],
      badge: "CO-LEAD",
    },
    {
      id: "aditya-sharma",
      name: "ADITYA SHARMA",
      role: "SYSTEMS & INFRASTRUCTURE",
      title: "DevOps Engineer",
      dept: "Distributed Systems Core",
      image: "/team/daksh.jpg",
      bio: "Oversees containerized deployments, edge model caching, and multi-cloud continuous integration pipelines.",
      contributions: ["Containerized deployment pipelines", "High-availability edge cluster management"],
      skills: ["Docker", "Kubernetes", "Linux Kernel", "CI/CD"],
    },
    {
      id: "ananya-iyer",
      name: "ANANYA IYER",
      role: "NEURAL NLP RESEARCHER",
      title: "NLP Lead",
      dept: "Natural Language Understanding",
      image: "/team/rhea.jpg",
      bio: "Specializes in multi-turn conversational agents, RAG benchmarking, and prompt synthesis optimization.",
      contributions: ["Authored RAG evaluation benchmarks", "Deployed multi-agent conversational testbed"],
      skills: ["Transformers", "HuggingFace", "Vector DBs", "LangChain"],
    },
    {
      id: "rohan-kulkarni",
      name: "ROHAN KULKARNI",
      role: "COMPUTER VISION LEAD",
      title: "CV Fellow",
      dept: "Perception & Spatial Computing",
      image: "/team/yusuf.jpg",
      bio: "Develops real-time object tracking, neural radiance fields (NeRFs), and spatial perception models.",
      contributions: ["Spatial camera tracking module", "Autonomous obstacle classification network"],
      skills: ["OpenCV", "CUDA", "YOLOv9", "NeRF"],
    },
    {
      id: "sneha-patel",
      name: "SNEHA PATEL",
      role: "AI ETHICS & GOVERNANCE",
      title: "Policy Researcher",
      dept: "Algorithmic Fairness",
      image: "/team/rhea.jpg",
      bio: "Audits bias and safety guardrails across autonomous agent pipelines and student open-source models.",
      contributions: ["Safety alignment guideline specification", "Red-teaming autonomous agent outputs"],
      skills: ["Model Alignment", "Governance", "Risk Audit", "AI Ethics"],
    },
    {
      id: "varun-nair",
      name: "VARUN NAIR",
      role: "FULL-STACK AI INTEGRATION",
      title: "Frontend Architect",
      dept: "Human-AI Interfaces",
      image: "/team/yusuf.jpg",
      bio: "Builds tactile WebGL visualizers, WebSocket streams, and latency-optimized interactive client tools.",
      contributions: ["Zero-latency streaming interface", "Interactive canvas shader development"],
      skills: ["TypeScript", "WebGL", "WebSockets", "Three.js"],
    },
    {
      id: "tanya-mehta",
      name: "TANYA MEHTA",
      role: "QUANTUM COMPUTING FELLOW",
      title: "Quantum AI Researcher",
      dept: "Quantum Information Lab",
      image: "/team/rhea.jpg",
      bio: "Researches quantum circuit optimization and variational quantum algorithms for machine learning.",
      contributions: ["VQE algorithm benchmark simulations", "Quantum neural network prototype"],
      skills: ["Qiskit", "Pennylane", "Linear Algebra", "Python"],
    },
    {
      id: "siddharth-rao",
      name: "SIDDHARTH RAO",
      role: "HARDWARE ACCELERATION",
      title: "FPGA / ASIC Specialist",
      dept: "Hardware Systems Engineering",
      image: "/team/daksh.jpg",
      bio: "Designs low-power neural compute accelerators and FPGA bitstreams for embedded robotics.",
      contributions: ["FPGA matrix multiplication systolic array", "Edge inference power profiling"],
      skills: ["Verilog", "FPGA", "Vitis AI", "Embedded C++"],
    },
    {
      id: "meera-deshmukh",
      name: "MEERA DESHMUKH",
      role: "COMMUNITY & PARTNERSHIPS",
      title: "Outreach Lead",
      dept: "Ecosystem Operations",
      image: "/team/rhea.jpg",
      bio: "Manages university hackathon sponsorships, corporate industry mentorship, and guest speaker series.",
      contributions: ["Coordinated 500+ hacker Genesis hackathon", "Secured compute grants for club projects"],
      skills: ["Public Relations", "Community Management", "Event Strategy"],
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#050507] text-white font-['Outfit'] antialiased selection:bg-cyan-400 selection:text-black overflow-x-hidden">
      {/* ─── 1. Signature Website Background (Matching website canvas aesthetic) ─── */}
      <ScrollCanvasBackground />

      {/* ─── 2. Top Navigation Bar ─── */}
      <AIConnectXNavbar />

      {/* ─── 3. Main Team Experience ─── */}
      <main className="relative z-10 pt-28 sm:pt-36 pb-24 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 select-none">
        
        {/* ─── Dragonfly-style Top Technical Glyphs (Matching Video Frame 00:05) ─── */}
        <div className="w-full flex items-center justify-between pb-8 text-xs font-mono text-cyan-200/50 tracking-widest select-none">
          <span className="hover:text-cyan-300 transition-colors cursor-default">[ A ]</span>
          <span className="text-cyan-400 font-bold tracking-[0.35em] drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            &gt; | &lt;
          </span>
          <span className="hover:text-cyan-300 transition-colors cursor-default">[ X ]</span>
        </div>

        {/* ─── Editorial Header (Matching Clean Bespoke Aesthetic) ─── */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 font-semibold uppercase block mb-3">
            03 / CORE LEADERSHIP
          </span>

          {/* Brutalist Title: TEAM */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white uppercase"
          >
            TEAM
          </motion.h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300/80 max-w-xl mx-auto font-light">
            The engineers, researchers, and student visionaries driving frontier autonomous intelligence across the <span className="font-semibold text-white">AI</span> <span className="font-semibold text-[#0088ff]">Connect</span><span className="font-semibold text-cyan-400">X</span> ecosystem.
          </p>

          {/* View Mode Toggle Button: Featured vs Full Directory (Matching Video Interaction) */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === "featured" ? "all" : "featured")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/15 hover:border-white/30 text-white/90 hover:text-white text-xs font-mono tracking-wider uppercase transition-all backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] cursor-pointer"
            >
              <span>{viewMode === "featured" ? "LOAD MORE DIRECTORY" : "SHOW FEATURED ONLY"}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-cyan-400 transition-transform duration-300 ${viewMode === "all" ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* ─── 1. Featured 4-Column Holographic 3D Portrait Grid with Individual Cards & Spaces ─── */}
        <div className="mb-16">
          {/* Top Frame Tech Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-2.5 mb-4 sm:mb-6 rounded-2xl border border-white/[0.12] bg-black/25 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.18)] text-[10px] font-mono text-white/80 select-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>AI CONNECTX // CORE FACULTY &amp; STUDENT ARCHITECTS</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-white/50">
              <span>SEC. 03 // LEADERSHIP</span>
              <span className="text-cyan-300 font-bold font-mono">STATUS: SYNCHRONIZED</span>
            </div>
          </div>

          {/* Individual Cards Grid with spaces in between */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {featuredTeam.map((member, index) => (
              <HolographicTeamCard
                key={member.id}
                member={member}
                index={index}
                onSelect={setSelectedMember}
              />
            ))}
          </div>
        </div>

        {/* ─── 2. Extended Full Directory View (Exact Match to Video Frames 00:00 - 00:02) ─── */}
        <AnimatePresence>
          {viewMode === "all" && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden mb-20"
            >
              <div className="mb-6 flex items-center justify-between border-b border-sky-400/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <h3 className="text-sm font-mono tracking-widest uppercase text-cyan-200">
                    COMPLETE TEAM DIRECTORY [{directoryMembers.length}]
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  CLICK ROW FOR DOSSIER
                </span>
              </div>

              {/* 4-Column Directory Grid (Matching video frames 00:00 - 00:02) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {directoryMembers.map((person) => {
                  const isHovered = hoveredDirectoryId === person.id;
                  return (
                    <motion.div
                      key={person.id}
                      onClick={() => setSelectedMember(person)}
                      onMouseEnter={() => setHoveredDirectoryId(person.id)}
                      className={`relative flex items-center gap-3.5 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isHovered
                          ? "bg-gradient-to-r from-cyan-950/70 via-blue-950/60 to-slate-900/80 border-cyan-400/60 shadow-[0_0_22px_rgba(34,211,238,0.35)] scale-[1.02]"
                          : "bg-slate-950/40 border-sky-400/15 hover:border-cyan-400/40 hover:bg-slate-900/40"
                      }`}
                    >
                      {/* Avatar Thumbnail */}
                      <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-white/10">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0"
                        />
                      </div>

                      {/* Text details */}
                      <div className="flex flex-col min-w-0 pr-2">
                        <span className={`text-xs font-bold tracking-wider truncate uppercase ${isHovered ? "text-cyan-200" : "text-white"}`}>
                          {person.name}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400/80 truncate uppercase">
                          {person.role}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 truncate">
                          {person.title}
                        </span>
                      </div>

                      {/* Micro arrow indicator on active */}
                      {isHovered && (
                        <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300 ml-auto shrink-0" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ─── Dragonfly-style Bottom Technical Glyphs ─── */}
        <div className="w-full flex items-center justify-between pt-16 pb-6 text-xs font-mono text-cyan-200/50 tracking-widest select-none">
          <span className="hover:text-cyan-300 transition-colors cursor-default">[ L ]</span>
          <span className="text-cyan-400 font-bold tracking-[0.35em] drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            &gt; | &lt;
          </span>
          <span className="hover:text-cyan-300 transition-colors cursor-default">[ Y ]</span>
        </div>

        {/* ─── Bottom Technical Footer Bar ─── */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 font-serif">
            <span className="italic font-bold text-base text-cyan-300">Ai</span>
            <span className="font-bold text-sm text-[#0088ff] ml-0.5">Connect</span>
            <span className="font-bold text-base text-cyan-300">X</span>
            <span className="ml-2 font-mono text-[10px] text-slate-400">TEAM ARCHITECTURE · v1.0</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Main Hub
            </button>
            <span>•</span>
            <button
              onClick={() => navigate("/overview")}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Overview &amp; Mission
            </button>
            <span>•</span>
            <button
              onClick={() => navigate("/contact")}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Transmission Hub
            </button>
          </div>
        </div>

      </main>

      {/* ─── 4. Detailed Member Dossier Modal (Triggered on click) ─── */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl -z-10"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl rounded-3xl bg-slate-950/95 border border-cyan-400/35 p-6 sm:p-10 shadow-[0_30px_100px_rgba(2,6,23,0.95)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Photo */}
                <div className="w-28 h-36 sm:w-36 sm:h-48 rounded-2xl overflow-hidden shrink-0 bg-black border border-cyan-400/30 shadow-lg">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Header details */}
                <div className="flex flex-col">
                  {selectedMember.badge && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-400/35 w-max mb-2">
                      {selectedMember.badge}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide uppercase">
                    {selectedMember.name}
                  </h3>
                  <span className="text-xs font-mono font-medium text-cyan-300 mt-1 uppercase tracking-wider">
                    {selectedMember.role}
                  </span>
                  <span className="text-xs font-mono text-slate-400 mt-0.5">
                    {selectedMember.dept}
                  </span>
                  <p className="mt-4 text-xs sm:text-sm text-slate-300/85 font-light leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>
              </div>

              {/* Key Contributions */}
              <div className="mt-6 pt-5 border-t border-sky-400/20">
                <h4 className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Key Project Architecture &amp; Contributions</span>
                </h4>
                <ul className="space-y-2">
                  {selectedMember.contributions.map((c, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-mono font-bold">›</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Tags */}
              <div className="mt-6 pt-5 border-t border-sky-400/20 flex flex-wrap gap-2">
                {selectedMember.skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-[11px] font-mono bg-cyan-950/50 text-cyan-200 border border-cyan-400/30"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
