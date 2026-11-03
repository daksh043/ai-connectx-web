import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlighted?: boolean;
}

function Word({ children, progress, range, isHighlighted = false }: WordProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.28em] ${
        isHighlighted
          ? "bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent font-medium drop-shadow-[0_0_24px_rgba(65,105,225,0.7)]"
          : "text-white"
      }`}
    >
      {children}
    </motion.span>
  );
}

interface NarrativeLine {
  id: string;
  index: string;
  tag: string;
  text: string;
  highlights: string[];
}

const NARRATIVE_LINES: NarrativeLine[] = [
  {
    id: "line-1",
    index: "01",
    tag: "ORIGIN & ECOSYSTEM",
    text: "AI CONNECTX is an initiative at Universal AI University.",
    highlights: ["AI", "CONNECTX", "Universal", "University."],
  },
  {
    id: "line-2",
    index: "02",
    tag: "STRATEGIC MISSION",
    text: "Bridging ambitious student talent directly with the frontier AI industry.",
    highlights: ["Bridging", "talent", "frontier", "AI", "industry."],
  },
  {
    id: "line-3",
    index: "03",
    tag: "INDUSTRY CONDUITS",
    text: "Connecting student builders with corporate leaders to solve real-world problems.",
    highlights: ["Connecting", "builders", "leaders", "real-world", "problems."],
  },
  {
    id: "line-4",
    index: "04",
    tag: "IMPACT & OPPORTUNITY",
    text: "Empowering the next generation to launch production agents and create opportunities.",
    highlights: ["Empowering", "generation", "production", "agents", "opportunities."],
  },
];

interface RevealLineProps {
  line: NarrativeLine;
  progress: MotionValue<number>;
  enterRange: [number, number];
  revealRange: [number, number];
  exitRange: [number, number];
  isLastLine?: boolean;
  finalLiftY?: MotionValue<string>;
  finalLiftOpacity?: MotionValue<number>;
}

function RevealLine({
  line,
  progress,
  enterRange,
  revealRange,
  exitRange,
  isLastLine = false,
  finalLiftY,
  finalLiftOpacity,
}: RevealLineProps) {
  // Line-level entry, resting center, and exit transition
  const baseOpacity = useTransform(
    progress,
    [enterRange[0], enterRange[1], exitRange[0], exitRange[1]],
    [0, 1, 1, 0]
  );

  const baseY = useTransform(
    progress,
    [enterRange[0], enterRange[1], exitRange[0], exitRange[1]],
    ["40px", "0px", "0px", "-48px"]
  );

  // If this is the last line, optionally blend with the final lift into the 3D cylinder
  const effectiveOpacity = isLastLine && finalLiftOpacity ? finalLiftOpacity : baseOpacity;
  const effectiveY = isLastLine && finalLiftY ? finalLiftY : baseY;

  const pointerEvents = useTransform(effectiveOpacity, (v) =>
    v > 0.05 ? "auto" : "none"
  );

  const words = line.text.split(" ");
  const highlightSet = new Set(line.highlights);

  return (
    <motion.div
      style={{
        opacity: effectiveOpacity,
        y: effectiveY,
        pointerEvents,
      }}
      className="absolute inset-0 flex flex-col justify-center items-start will-change-transform"
    >
      {/* Line Metadata Subhead */}
      <div className="relative mb-4 sm:mb-6 flex items-center gap-3">
        <span className="text-xs sm:text-sm font-['Outfit',sans-serif] font-bold tracking-[0.22em] bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent uppercase">
          {line.index} / {line.tag}
        </span>
        <span className="w-8 h-px bg-gradient-to-r from-cyan-400 to-blue-500" />
      </div>

      {/* Main Kinetic Typography Line */}
      <div className="relative text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light leading-tight sm:leading-tight md:leading-[1.22] tracking-tight text-left drop-shadow-[0_12px_36px_rgba(0,0,0,0.85)] max-w-4xl lg:max-w-5xl">
        {words.map((word, j) => {
          const wStart =
            revealRange[0] + (j / words.length) * (revealRange[1] - revealRange[0]);
          const wEnd =
            wStart + (1.2 / words.length) * (revealRange[1] - revealRange[0]);

          const cleanWord = word.replace(/[.,]/g, "");
          const isHighlighted =
            highlightSet.has(word) || highlightSet.has(cleanWord);

          return (
            <Word
              key={j}
              progress={progress}
              range={[wStart, Math.min(wEnd, revealRange[1])]}
              isHighlighted={isHighlighted}
            >
              {word}
            </Word>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function TextRevealScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Final upward exit float for the 4th line in sync with the horizon wave and 3D cylinder
  const finalLiftY = useTransform(
    scrollYProgress,
    [0.76, 0.80, 0.95, 1.0],
    ["40px", "0px", "0px", "-260px"]
  );
  const finalLiftOpacity = useTransform(
    scrollYProgress,
    [0.76, 0.80, 0.96, 1.0],
    [0, 1, 1, 0]
  );

  // Progressive scroll brackets for the 4 distinct lines:
  // Each line enters -> illuminates word-by-word -> PAUSES (fully illuminated & static) -> dissolves to next
  const lineBrackets: {
    enter: [number, number];
    reveal: [number, number];
    exit: [number, number];
  }[] = [
    // Line 1: Enter 0.01-0.05 -> Reveal 0.04-0.13 -> PAUSE 0.13-0.23 -> Exit 0.23-0.26
    {
      enter: [0.01, 0.05],
      reveal: [0.04, 0.13],
      exit: [0.23, 0.26],
    },
    // Line 2: Enter 0.26-0.30 -> Reveal 0.29-0.38 -> PAUSE 0.38-0.48 -> Exit 0.48-0.51
    {
      enter: [0.26, 0.30],
      reveal: [0.29, 0.38],
      exit: [0.48, 0.51],
    },
    // Line 3: Enter 0.51-0.55 -> Reveal 0.54-0.63 -> PAUSE 0.63-0.73 -> Exit 0.73-0.76
    {
      enter: [0.51, 0.55],
      reveal: [0.54, 0.63],
      exit: [0.73, 0.76],
    },
    // Line 4: Enter 0.76-0.80 -> Reveal 0.79-0.88 -> PAUSE 0.88-0.95 -> Lift into 3D cylinder 0.95-1.0
    {
      enter: [0.76, 0.80],
      reveal: [0.79, 0.88],
      exit: [0.95, 0.99],
    },
  ];

  return (
    <section
      id="text-reveal"
      ref={containerRef}
      className="relative min-h-[360vh] w-full select-none z-10 font-['Outfit',sans-serif]"
    >
      {/* Sticky Viewport Stage - Locks at top-0 across the line transitions */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 text-left pointer-events-none">
        {/* Ambient subtle vignette aura for text legibility without blurring the background */}
        <div
          className="absolute -inset-x-12 inset-y-12 -z-10 pointer-events-none rounded-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 25% 50%, rgba(0, 0, 0, 0.35) 0%, transparent 70%)",
          }}
        />

        <div className="relative w-full max-w-4xl lg:max-w-5xl pointer-events-auto">
          {/* Section Index Header */}
          <div className="relative mb-6 sm:mb-8 z-20">
            <span className="text-xs sm:text-sm font-['Outfit',sans-serif] tracking-[0.22em] bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent font-bold uppercase">
              01 / MISSION &amp; OVERVIEW
            </span>
          </div>

          {/* Central Optical Stage: lines transition in the exact same reading location */}
          <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px]">
            {NARRATIVE_LINES.map((line, i) => {
              const b = lineBrackets[i];
              const isLast = i === NARRATIVE_LINES.length - 1;

              return (
                <RevealLine
                  key={line.id}
                  line={line}
                  progress={scrollYProgress}
                  enterRange={b.enter}
                  revealRange={b.reveal}
                  exitRange={b.exit}
                  isLastLine={isLast}
                  finalLiftY={isLast ? finalLiftY : undefined}
                  finalLiftOpacity={isLast ? finalLiftOpacity : undefined}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
