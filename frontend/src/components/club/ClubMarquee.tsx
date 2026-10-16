import { useClubTheme } from "../../contexts/ClubThemeContext";

export default function ClubMarquee() {
  const { isDark } = useClubTheme();

  const row1 = [
    "AGENTIC SYSTEMS",
    "MULTI-AGENT SWARMS",
    "LLM FINE-TUNING",
    "VISION TRANSFORMERS",
    "REINFORCEMENT LEARNING",
    "HIGH-CONCURRENCY BACKENDS",
    "VECTOR EMBEDDINGS",
    "RAG PIPELINES",
    "DEEPSEEK & LLAMA",
    "WEBGL EXPERIENCES",
  ];

  const row2 = [
    "NATIONAL HACKATHON PODIUMS",
    "OPEN SOURCE REPOSITORIES",
    "48-HOUR DEV SPRINTS",
    "INDUSTRY FOUNDER RESIDENCY",
    "Y COMBINATOR ALUMNI TALKS",
    "NEURAL NETWORKS",
    "LATENCY OPTIMIZATION",
    "FASTAPI & REACT ARCHITECTURE",
    "AUTONOMOUS B2B AGENTS",
  ];

  return (
    <div
      className={`py-12 border-y overflow-hidden select-none relative transition-colors duration-500 ${
        isDark ? "bg-black border-white/10" : "bg-zinc-50 border-zinc-200"
      }`}
    >
      {/* Edge gradient masks for smooth fade */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-24 z-10 pointer-events-none transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-r from-black to-transparent"
            : "bg-gradient-to-r from-zinc-50 to-transparent"
        }`}
      />
      <div
        className={`absolute top-0 bottom-0 right-0 w-24 z-10 pointer-events-none transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-l from-black to-transparent"
            : "bg-gradient-to-l from-zinc-50 to-transparent"
        }`}
      />

      {/* Row 1 - Left to Right */}
      <div className="flex overflow-hidden mb-4">
        <div className="animate-club-marquee flex items-center gap-6">
          {[...row1, ...row1, ...row1].map((text, idx) => (
            <div
              key={`r1-${idx}`}
              className={`flex items-center gap-4 text-xs sm:text-sm font-tech font-bold tracking-widest transition-colors cursor-default whitespace-nowrap ${
                isDark
                  ? "text-zinc-300 hover:text-white"
                  : "text-zinc-700 hover:text-black"
              }`}
            >
              <span>{text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="flex overflow-hidden">
        <div className="animate-club-marquee-reverse flex items-center gap-6">
          {[...row2, ...row2, ...row2].map((text, idx) => (
            <div
              key={`r2-${idx}`}
              className={`flex items-center gap-4 text-xs sm:text-sm font-tech font-bold tracking-widest transition-colors cursor-default whitespace-nowrap ${
                isDark
                  ? "text-zinc-300 hover:text-white"
                  : "text-zinc-700 hover:text-black"
              }`}
            >
              <span>{text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#83ca16]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
