import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

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
          ? "bg-gradient-to-r from-cyan-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent font-medium drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]"
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
    offset: ["start start", "end end"],
  });

  // Condensed high-impact statement (Cut in half for maximum punch)
  const statement =
    "AI CONNECTX is an initiative at Universal AI University bridging talent with the AI industry. We connect builders with industry leaders to solve real-world problems and create opportunities.";

  const words = statement.split(" ");

  // Highlighting key keywords for cyber aesthetic
  const highlightWords = new Set([
    "AI",
    "CONNECTX",
    "Universal",
    "bridging",
    "talent",
    "industry.",
    "industry",
    "builders",
    "leaders",
    "real-world",
    "opportunities.",
  ]);

  return (
    <section
      id="text-reveal"
      ref={containerRef}
      className="relative min-h-[260vh] w-full select-none z-10"
    >
      {/* Sticky Viewport Stage - Perfectly locks and pauses at top-0, left-aligned */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-start justify-center px-6 sm:px-10 lg:px-12 text-left pointer-events-none">
        <div className="w-full max-w-4xl lg:max-w-5xl pointer-events-auto">
          {/* Section Index Marker (Clean, no cheesy badge) */}
          <div className="relative mb-6 sm:mb-8 text-left z-20">
            <div className="absolute -inset-x-8 -inset-y-3 bg-radial-[ellipse_at_left,_rgba(0,0,0,0.85)_0%,_transparent_80%] blur-xl -z-10 pointer-events-none" />
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 font-semibold uppercase">
              01 / MISSION &amp; OVERVIEW
            </span>
          </div>

          {/* Scroll-Illuminated Overview Headline Typography with Surrounding Dark Blur Aura */}
          <div className="relative text-lg sm:text-2xl md:text-3xl lg:text-[2rem] font-light leading-relaxed sm:leading-relaxed md:leading-[1.45] tracking-tight text-left drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {/* Seamless blended dark blur atmosphere */}
            <div
              className="absolute -inset-x-16 -inset-y-12 -z-10 pointer-events-none rounded-3xl backdrop-blur-md"
              style={{
                background: "radial-gradient(ellipse at 20% 50%, rgba(0, 0, 0, 0.58) 0%, rgba(0, 0, 0, 0.22) 55%, transparent 80%)",
                maskImage: "radial-gradient(ellipse at 25% 50%, black 35%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(ellipse at 25% 50%, black 35%, transparent 80%)",
              }}
            />
            {words.map((word, i) => {
              const start = 0.05 + (i / words.length) * 0.70;
              const end = start + (1 / words.length) * 0.85;
              const cleanWord = word.replace(/[.,]/g, "");
              const isHighlighted =
                highlightWords.has(word) || highlightWords.has(cleanWord);

              return (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[start, Math.min(end, 0.90)]}
                  isHighlighted={isHighlighted}
                >
                  {word}
                </Word>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
