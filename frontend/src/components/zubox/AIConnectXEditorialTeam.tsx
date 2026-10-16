import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, X, Sparkles, ChevronDown, Cpu } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import HolographicTeamCard, { type TeamMember } from "./HolographicTeamCard";

export default function AIConnectXEditorialTeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showDirectory, setShowDirectory] = useState(false);
  const [hoveredDirId, setHoveredDirId] = useState<string | null>("daksh");
  const [activeSpotlight, setActiveSpotlight] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);

  // ─── Scroll-Pinning & Animation Hook ───
  // Creates a pinned pause while the background canvas keeps moving
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Dynamic transforms while scrolling:
  // While scrolling: Team becomes smaller (1.02 -> 0.82)
  const cardsScale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [1.02, 0.94, 0.86, 0.80]);
  const cardsY = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -25]);
  const headerScale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [1.0, 0.95, 0.90, 0.86]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.85, 1, 1, 0.85]);

  const lastPctRef = useRef(0);
  const lastIdxRef = useRef(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      const pct = Math.min(100, Math.max(0, Math.round(latest * 100)));
      if (pct !== lastPctRef.current) {
        lastPctRef.current = pct;
        setScrollPct(pct);
      }
      const idx = Math.min(3, Math.max(0, Math.floor(latest * 4)));
      if (idx !== lastIdxRef.current) {
        lastIdxRef.current = idx;
        setActiveSpotlight(idx);
      }
    });

    return () => unsub();
  }, [scrollYProgress]);

  const featuredTeam: TeamMember[] = [
    {
      id: "daksh",
      name: "DAKSH RAJESH KHANDAGALE",
      role: "CLUB PRESIDENT & ARCHITECT",
      title: "Lead Architect",
      dept: "B.Tech · AI & Machine Learning",
      image: "/team/daksh.jpg",
      codename: "ARCHITECT-01",
      bio: "Visionary founder and architect of Ai ConnectX. Specializes in autonomous multi-agent tool execution, edge model quantization, and production-grade intelligent machine learning systems.",
      contributions: [
        "Architected core club web systems & 3D cinematic visualizers",
        "Engineered the 240-frame smooth cinematic canvas animation",
        "Designed the 3D curved parallax event gallery and design system",
      ],
      skills: ["PyTorch", "System Architecture", "React & TypeScript", "Agentic Workflows"],
      badge: "PRESIDENT",
      stats: [
        { label: "NEURAL PIPELINES", value: "24+" },
        { label: "SYS PERFORMANCE", value: "99.8%" },
        { label: "PROJECTS DIRECTED", value: "14" },
      ],
    },
    {
      id: "yusuf",
      name: "YUSUF CHOUGLE",
      role: "TECHNICAL CO-LEAD & DEV",
      title: "Technical Co-Lead",
      dept: "B.Tech · AI & Machine Learning",
      image: "/team/yusuf.jpg",
      codename: "DEV-LEAD-02",
      bio: "Technical co-lead spearheading full-stack web integration, modern UI architecture, interactive 3D components, and high-performance frontend engineering workflows.",
      contributions: [
        "Implemented high-performance interactive animations & state telemetry",
        "Engineered responsive layout breakpoints and animation telemetry",
        "Authored technical project specifications and review criteria",
      ],
      skills: ["Full-Stack Dev", "FastAPI & Python", "Tailwind CSS", "Data Structures"],
      badge: "CO-LEAD",
      stats: [
        { label: "COMPONENTS SHIPPED", value: "65+" },
        { label: "FPS TARGET", value: "120 FPS" },
        { label: "MODULE INTEGRITY", value: "100%" },
      ],
    },
    {
      id: "pranav",
      name: "PRANAV SIR",
      role: "FACULTY GUIDE & ADVISOR",
      title: "Faculty Guide",
      dept: "School of Computing Science · AI Systems",
      image: "/team/pranav.jpg",
      codename: "ADVISOR-03",
      bio: "Distinguished academic advisor providing guidance across software engineering methodologies, AI curriculum standards, and intelligent interactive systems.",
      contributions: [
        "Academic supervision of AI ConnectX Club Initiatives",
        "Advisory on ethical AI practices, open-source compliance, and student innovation",
        "Course guidance on scalable web architecture and state management",
      ],
      skills: ["Web Programming", "Software Engineering", "System Design", "Academic Mentorship"],
      badge: "MENTOR",
      stats: [
        { label: "STUDENTS GUIDED", value: "350+" },
        { label: "ACADEMIC PAPERS", value: "28" },
        { label: "INDUSTRY LIASONS", value: "12+" },
      ],
    },
    {
      id: "rhea",
      name: "RHEA SEN",
      role: "HEAD OF RESEARCH & GENAI",
      title: "Research Lead",
      dept: "Computational Intelligence & AI",
      image: "/team/rhea.jpg",
      codename: "RESEARCH-04",
      bio: "Leads the club's frontier research paper reading groups, benchmarking multimodal LLMs, and curating competitive student AI hackathon challenges.",
      contributions: [
        "Organized Genesis '24 LLM Quantization & Reasoning Masterclass",
        "Curated evaluation rubrics for club technical interviews",
        "Mentored student teams in national AI hackathons and paper submissions",
      ],
      skills: ["LLM Fine-Tuning", "TensorRT", "Vision-Language Models", "Prompt Synthesis"],
      badge: "RESEARCH",
      stats: [
        { label: "PAPERS REVIEWED", value: "48+" },
        { label: "BENCHMARK ACCURACY", value: "94.2%" },
        { label: "HACKATHON WINS", value: "6" },
      ],
    },
  ];

  const directoryMembers: TeamMember[] = [
    ...featuredTeam,
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
      bio: "Develops real-time object tracking algorithms, edge vision pipelines, and 3D spatial reconstruction models.",
      contributions: ["Edge vision acceleration pipeline", "Robotics perception lab integration"],
      skills: ["OpenCV", "YOLOv9", "NeRFs", "Edge TPU"],
    },
    {
      id: "tanvi-deshmukh",
      name: "TANVI DESHMUKH",
      role: "DATA ETHICS & GOVERNANCE",
      title: "AI Ethics Specialist",
      dept: "Applied AI Ethics & Policy",
      image: "/team/rhea.jpg",
      bio: "Researches dataset bias mitigation, privacy-preserving machine learning, and transparent algorithmic standards.",
      contributions: ["Model safety and bias audit framework", "Responsible AI student handbook"],
      skills: ["Fairness Metrics", "Federated Learning", "Data Auditing", "GDPR-AI"],
    },
  ];

  return (
    <section
      id="team"
      ref={containerRef}
      className="relative min-h-[220vh] w-full z-10 select-none scroll-mt-20 font-['Outfit']"
    >
      {/* ─── Sticky Viewport Stage: Creates the pause in Team while background continues animating ─── */}
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center items-center py-8 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto">
          {/* Top Technical Glyphs */}
          <div className="w-full flex items-center justify-between pb-4 text-xs font-mono text-white/50 tracking-widest select-none">
            <span className="hover:text-cyan-300 transition-colors cursor-default">[ A ]</span>
            <span className="text-cyan-400 font-bold tracking-[0.35em] drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
              &gt; | &lt;
            </span>
            <span className="hover:text-cyan-300 transition-colors cursor-default">[ X ]</span>
          </div>

          {/* Editorial Header */}
          <motion.div style={{ opacity: headerOpacity, scale: headerScale }} className="text-center mb-6 sm:mb-8 origin-center">
            <div className="inline-flex items-center gap-2 mb-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/35 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/90 font-medium">
                CORE LEADERSHIP &amp; RESEARCH ARCHITECTS
              </span>
            </div>

            <div className="text-cyan-400 font-mono text-xs sm:text-sm tracking-[0.35em] font-bold mb-0.5 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]">
              03
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              TEAM
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-300/80 max-w-xl mx-auto font-light line-clamp-2">
              The engineers, researchers, and student visionaries driving frontier autonomous intelligence across the{" "}
              <span className="font-serif">
                <span className="italic text-cyan-300 font-bold">Ai</span>{" "}
                <span className="text-[#0088ff] font-bold">Connect</span>
                <span className="text-cyan-300 font-bold">X</span>
              </span>{" "}
              ecosystem.
            </p>
          </motion.div>

          {/* ─── 4-Column Holographic 3D Interactive Cards Grid ─── */}
          <motion.div
            style={{ scale: cardsScale, y: cardsY }}
            className="w-full mb-6 origin-center will-change-transform"
          >
            {/* Standalone Tech Telemetry Status Pill */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-2.5 mb-4 sm:mb-6 rounded-2xl border border-white/[0.12] bg-black/25 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.18)] text-[10px] font-mono text-white/80 select-none">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>AI CONNECTX // CORE FACULTY &amp; STUDENT ARCHITECTS</span>
                <span className="hidden md:inline text-white/30">·</span>
                <span className="hidden md:inline text-cyan-300 font-bold uppercase">
                  SPOTLIGHT: {featuredTeam[activeSpotlight].name.split(" ")[0]}
                </span>
              </div>

              <div className="flex items-center gap-3 text-white/50">
                <div className="w-20 sm:w-28 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 transition-all duration-100"
                    style={{ width: `${scrollPct}%` }}
                  />
                </div>
                <span className="text-cyan-300 font-bold font-mono">
                  SYNC: {scrollPct}%
                </span>
              </div>
            </div>

            {/* Individual Cards Grid with spaces/gaps between each card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {featuredTeam.map((member, index) => (
                <HolographicTeamCard
                  key={member.id}
                  member={member}
                  index={index}
                  onSelect={setSelectedMember}
                  isScrollFocused={activeSpotlight === index}
                />
              ))}
            </div>
          </motion.div>

          {/* Directory Toggle Sub-Bar */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] font-mono text-white/40">
              SCROLL THROUGH TO INSPECT ALL LEAD UNITS
            </span>

            <button
              onClick={() => setShowDirectory(!showDirectory)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/15 hover:border-white/30 text-white/90 hover:text-white text-[11px] font-mono tracking-wider uppercase transition-all backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] cursor-pointer"
            >
              <span>{showDirectory ? "HIDE DIRECTORY" : "COMPLETE DIRECTORY"}</span>
              <ChevronDown
                className={`w-3 h-3 text-cyan-400 transition-transform duration-300 ${
                  showDirectory ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Expandable Full Directory Grid (Slides down smoothly when opened) ─── */}
      <AnimatePresence>
        {showDirectory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-16"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-sky-400/20">
              {directoryMembers.map((person) => {
                const isHovered = hoveredDirId === person.id;
                return (
                  <div
                    key={person.id}
                    onClick={() => setSelectedMember(person)}
                    onMouseEnter={() => setHoveredDirId(person.id)}
                    className={`relative flex items-center gap-3.5 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isHovered
                        ? "bg-gradient-to-r from-cyan-950/70 via-blue-950/60 to-slate-900/80 border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-[1.01]"
                        : "bg-slate-950/40 border-sky-400/15 hover:border-cyan-400/40 hover:bg-slate-900/40"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-white/10">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                    <div className="flex flex-col min-w-0 pr-2">
                      <span
                        className={`text-xs font-bold tracking-wider truncate uppercase ${
                          isHovered ? "text-cyan-200" : "text-white"
                        }`}
                      >
                        {person.name}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400/80 truncate uppercase">
                        {person.role}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 truncate">
                        {person.dept}
                      </span>
                    </div>
                    {isHovered && (
                      <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300 ml-auto shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Detailed Cyber Dossier Modal ─── */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl -z-10"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl rounded-3xl bg-slate-950/95 border border-cyan-400/40 p-6 sm:p-10 shadow-[0_30px_100px_rgba(2,6,23,0.95)] overflow-hidden"
            >
              {/* Ambient radial accent inside modal */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-28 h-36 sm:w-36 sm:h-48 rounded-2xl overflow-hidden shrink-0 bg-black border border-cyan-400/40 shadow-lg">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    {selectedMember.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-400/35">
                        {selectedMember.badge}
                      </span>
                    )}
                    {selectedMember.codename && (
                      <span className="text-[10px] font-mono text-cyan-400/80">
                        // {selectedMember.codename}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide uppercase">
                    {selectedMember.name}
                  </h3>
                  <span className="text-xs font-mono font-medium text-cyan-300 mt-1 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>{selectedMember.role}</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400 mt-0.5">
                    {selectedMember.dept}
                  </span>
                  <p className="mt-4 text-xs sm:text-sm text-slate-300/85 font-light leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>
              </div>

              {/* Stats telemetry */}
              {selectedMember.stats && (
                <div className="mt-6 grid grid-cols-3 gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  {selectedMember.stats.map((st, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-lg sm:text-xl font-bold text-cyan-300 font-mono">
                        {st.value}
                      </span>
                      <span className="text-[9px] font-mono text-white/50 uppercase tracking-wider mt-0.5">
                        {st.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

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
    </section>
  );
}
