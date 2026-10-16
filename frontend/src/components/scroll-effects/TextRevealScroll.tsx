import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import {
  Sparkles,
  Briefcase,
  Users,
  TrendingUp,
  Cpu,
  ArrowUpRight,
} from "lucide-react";

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlighted?: boolean;
}

function Word({ children, progress, range, isHighlighted = false }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const scale = useTransform(progress, range, [0.96, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <motion.span
      style={{ opacity, scale, y }}
      className={`inline-block mr-[0.28em] transition-all duration-150 ${
        isHighlighted
          ? "bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-300 bg-clip-text text-transparent font-medium drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]"
          : "text-white"
      }`}
    >
      {children}
    </motion.span>
  );
}

export default function TextRevealScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Overview Statement provided by user
  const statement =
    "AI CONNECTX is a student-led initiative focused on bridging the gap between UAI students and the Artificial Intelligence industry. We aim to build a strong industry-connected AI community by connecting students with companies, startups, industry professionals, mentors, and alumni. Our mission is to encourage students to apply Artificial Intelligence to real-world problems while building meaningful industry connections and professional networks.";

  const words = statement.split(" ");

  // Highlighting key keywords for cyber aesthetic
  const highlightWords = new Set([
    "AI",
    "CONNECTX",
    "student-led",
    "bridging",
    "UAI",
    "students",
    "Artificial",
    "Intelligence",
    "industry.",
    "community",
    "companies,",
    "startups,",
    "professionals,",
    "mentors,",
    "alumni.",
    "real-world",
    "networks.",
  ]);

  // Transform for secondary feature cards to glide up near the bottom of the section
  const cardsOpacity = useTransform(scrollYProgress, [0.62, 0.78], [0, 1]);
  const cardsY = useTransform(scrollYProgress, [0.62, 0.78], [40, 0]);

  // Humanized, Colorful Pillars with vibrant individual palettes
  const pillars = [
    {
      icon: <Briefcase className="w-5 h-5 text-emerald-300" />,
      iconBox: "bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-transparent border border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.35)]",
      title: "Real-World Experience",
      desc: "Work on genuine partner projects, secure internships, shadow AI engineers, and take company tours that open doors.",
      badge: "INDUSTRY PROJECTS",
      badgeClass: "bg-emerald-400/15 text-emerald-300 border-emerald-400/40 shadow-[0_0_12px_rgba(52,211,153,0.3)]",
      cardBorder: "border-emerald-500/30 hover:border-emerald-400/70 hover:shadow-[0_15px_40px_rgba(16,185,129,0.3)]",
      glowAccent: "from-emerald-500/15 via-teal-500/5 to-transparent",
    },
    {
      icon: <Users className="w-5 h-5 text-cyan-300" />,
      iconBox: "bg-gradient-to-br from-cyan-500/20 via-sky-500/15 to-transparent border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.35)]",
      title: "Strong AI Community",
      desc: "Connect with fellow student innovators, seasoned research mentors, and alumni who genuinely want to see you succeed.",
      badge: "MENTORSHIP & ALUMNI",
      badgeClass: "bg-cyan-400/15 text-cyan-300 border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.3)]",
      cardBorder: "border-cyan-500/30 hover:border-cyan-400/70 hover:shadow-[0_15px_40px_rgba(6,182,212,0.3)]",
      glowAccent: "from-cyan-500/15 via-blue-500/5 to-transparent",
    },
    {
      icon: <Cpu className="w-5 h-5 text-fuchsia-300" />,
      iconBox: "bg-gradient-to-br from-fuchsia-500/20 via-purple-500/15 to-transparent border border-fuchsia-400/40 shadow-[0_0_20px_rgba(217,70,239,0.35)]",
      title: "Applied AI Solutions",
      desc: "Turn textbook algorithms into shipped products. We train, test, and deploy intelligent software that solves tangible problems.",
      badge: "REAL-WORLD IMPACT",
      badgeClass: "bg-fuchsia-400/15 text-fuchsia-300 border-fuchsia-400/40 shadow-[0_0_12px_rgba(232,121,249,0.3)]",
      cardBorder: "border-fuchsia-500/30 hover:border-fuchsia-400/70 hover:shadow-[0_15px_40px_rgba(217,70,239,0.3)]",
      glowAccent: "from-fuchsia-500/15 via-purple-500/5 to-transparent",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-amber-300" />,
      iconBox: "bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-transparent border border-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.35)]",
      title: "Beyond The Classroom",
      desc: "Fuel your curiosity with hackathons, collaborative labs, and creative experiments that turn you into a future-ready creator.",
      badge: "FUTURE-READY",
      badgeClass: "bg-amber-400/15 text-amber-300 border-amber-400/40 shadow-[0_0_12px_rgba(251,191,36,0.3)]",
      cardBorder: "border-amber-500/30 hover:border-amber-400/70 hover:shadow-[0_15px_40px_rgba(245,158,11,0.3)]",
      glowAccent: "from-amber-500/15 via-rose-500/5 to-transparent",
    },
  ];

  return (
    <section
      id="text-reveal"
      ref={containerRef}
      className="relative min-h-[250vh] w-full flex flex-col items-center justify-start py-20 px-4 sm:px-8 lg:px-16 z-10 select-none"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 min-h-screen w-full max-w-6xl flex flex-col items-center justify-center py-12">
        {/* Top Identification Pill with Industry Category */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 sm:mb-8 z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 font-mono text-[11px] sm:text-xs uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(45,212,191,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>02 · OVERVIEW &amp; MISSION</span>
          </div>
        </div>

        {/* Scroll-Illuminated Overview Headline Typography */}
        <div className="text-2xl sm:text-4xl md:text-5xl font-light leading-[1.35] tracking-tight text-center max-w-5xl mb-8 sm:mb-12 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {words.map((word, i) => {
            const start = 0.15 + (i / words.length) * 0.45;
            const end = start + (1 / words.length) * 0.75;
            const cleanWord = word.replace(/[.,]/g, "");
            const isHighlighted =
              highlightWords.has(word) || highlightWords.has(cleanWord);

            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, Math.min(end, 0.72)]}
                isHighlighted={isHighlighted}
              >
                {word}
              </Word>
            );
          })}
        </div>

        {/* Revealable 4-Pillar Glass Cards Grid */}
        <motion.div
          style={{ opacity: cardsOpacity, y: cardsY }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7"
        >
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden p-5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border ${item.cardBorder} shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:bg-slate-900/90 transition-all duration-300 group`}
            >
              {/* Subtle Ambient Radial Highlight */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.glowAccent} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

              <div className="relative z-10 flex items-center justify-between mb-3.5">
                <div className={`p-2.5 rounded-xl border ${item.iconBox} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-mono font-medium tracking-wider px-2.5 py-0.5 rounded-full border ${item.badgeClass}`}>
                  {item.badge}
                </span>
              </div>
              <h4 className="relative z-10 text-base font-semibold text-white mb-2 tracking-tight group-hover:text-cyan-200 transition-colors">
                {item.title}
              </h4>
              <p className="relative z-10 text-xs text-slate-300/85 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Signature Brand Mission Punchline Banner (Real Colorful Logo, Vibrant Brand Font & Humanized Design) */}
        <motion.div
          style={{ opacity: cardsOpacity }}
          className="w-full rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-slate-950/95 via-cyan-950/40 to-blue-950/50 border border-cyan-400/40 backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-[0_20px_70px_rgba(2,6,23,0.85),inset_0_1px_2px_rgba(255,255,255,0.25)] relative overflow-hidden group"
        >
          {/* Ambient Colorful Light Streaks */}
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-gradient-to-tl from-teal-400/30 via-emerald-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Left: Real Colorful Logo + Colorful Serif Typography + Humanized Subtitle */}
          <div className="relative z-10 flex items-center gap-4 sm:gap-5">
            {/* Real Colorful Levitation Logo with Holographic Glowing Halo */}
            <div className="shrink-0 relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-400/50 via-blue-500/40 to-teal-400/50 blur-lg group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative p-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.6)]">
                <img
                  src="/ai-connectx-logo-transparent.png"
                  alt="Ai ConnectX Official Emblem"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-[0_0_20px_rgba(45,212,191,0.8)] group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Colorful Brand Typography & Humanized Mission */}
            <div>
              <div className="flex items-baseline font-serif">
                <span className="italic font-extrabold text-2xl sm:text-3xl text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.9)]">
                  Ai
                </span>
                <span className="font-extrabold text-2xl sm:text-3xl text-[#0088ff] ml-1.5 drop-shadow-[0_0_25px_rgba(0,136,255,0.9)]">
                  Connect
                </span>
                <span className="font-extrabold text-2xl sm:text-3xl text-teal-300 drop-shadow-[0_0_25px_rgba(45,212,191,0.95)]">
                  X
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-100 font-normal mt-1 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Bridging UAI Students With Frontier Artificial Intelligence
              </p>
              <div className="flex flex-wrap items-center gap-2.5 mt-1.5 text-[11px] font-mono text-cyan-300/90">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span>UAI Campus Hub</span>
                </span>
                <span className="text-white/40">·</span>
                <span className="text-slate-300/90 font-sans">
                  Built by students, for students — turning curious minds into confident creators
                </span>
              </div>
            </div>
          </div>

          {/* Right: Real Colorful Interactive Pill Button */}
          <div className="relative z-10 flex items-center gap-3 shrink-0 self-start md:self-center">
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 hover:from-teal-300 hover:to-sky-300 text-slate-950 font-['Space_Grotesk'] font-bold text-xs sm:text-sm shadow-[0_0_30px_rgba(34,211,238,0.55)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
              <span>UAI Student Initiative</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
