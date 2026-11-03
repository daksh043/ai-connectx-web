import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { motion, useScroll, useTransform } from "motion/react";

export default function AIConnectXHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Elegant scroll exit fade & physical scale-down as user nears the end of the Hero pause
  const contentOpacity = useTransform(scrollYProgress, [0.70, 0.95], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0.70, 0.95], [1, 0.94]);
  const contentY = useTransform(scrollYProgress, [0.70, 0.95], [0, -35]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[220vh] w-full select-none z-10"
    >
      {/* Sticky Viewport Stage - Perfectly locks and pauses at top-0 */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-12 px-6 sm:px-10 lg:px-12 text-left pointer-events-none">
        {/* ─── Hero Left Content Cluster (Clean, fully left-aligned with zero background box) ─── */}
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
          className="my-auto py-6 sm:py-8 relative flex flex-col items-start w-full max-w-3xl text-left pointer-events-auto will-change-transform"
        >
          {/* Seamless Blended Dark Atmosphere (Naturally feathered into canvas background without blurring) */}
          <div
            className="absolute -inset-x-12 -inset-y-10 -z-10 pointer-events-none rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at 20% 50%, rgba(0, 0, 0, 0.35) 0%, transparent 75%)",
            }}
          />

          {/* 1. Logo On Top & Headline Below (Left-Aligned) */}
          <div className="flex flex-col items-start gap-2.5 sm:gap-3">
            {/* Official Clean Transparent Logo & Universal AI University Affiliation */}
            <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">
              <img
                src="/ai-connectx-logo-transparent.png"
                alt="Ai ConnectX Official Logo"
                className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
              />
              <div className="h-8 w-[1px] bg-white/20" />
              <img
                src="/universal-ai-university-logo.png"
                alt="Universal AI University"
                className="h-8 sm:h-9 md:h-10 object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                title="Universal AI University"
              />
            </div>

            {/* High-Impact Modern Typographic Headline (Refined, perfectly scaled) */}
            <div className="relative font-sans">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black tracking-tight leading-[0.95] flex items-center select-none text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)]">
                {/* "AI" in Bold Crisp White */}
                <motion.span
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-white mr-2 sm:mr-2.5 tracking-tighter"
                >
                  AI
                </motion.span>

                {/* "Connect" in Vivid Royal Blue (Solid vibrant high-contrast glyphs) */}
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-[#4169e1] font-black mr-0.5 drop-shadow-[0_0_35px_rgba(65,105,225,0.95)]"
                >
                  Connect
                </motion.span>

                {/* "X" in Iconic Cyber Cyan */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-cyan-400 font-black ml-0.5 drop-shadow-[0_0_25px_rgba(34,211,238,0.85)]"
                >
                  X
                </motion.span>
              </h1>

              {/* Precision Underline */}
              <div className="relative mt-2.5 sm:mt-3.5 h-[2px] w-20 sm:w-32 bg-gradient-to-r from-cyan-400 via-[#4169e1] to-transparent shadow-[0_0_14px_rgba(65,105,225,0.8)]" />
            </div>
          </div>

          {/* 2. Core Focus Statement (Connecting Talent. Technology. Industry.) */}
          <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 md:gap-x-8 gap-y-2 mt-4 sm:mt-5 font-['Outfit',sans-serif] font-bold tracking-tight text-xl sm:text-2xl md:text-3xl select-none text-left">
            <span>
              <span className="text-white">Connecting </span>
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Talent.
              </span>
            </span>

            <span className="bg-gradient-to-r from-blue-500 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
              Technology.
            </span>

            <span className="text-white">
              Industry.
            </span>
          </div>

          {/* 3. Official Condensed Subtitle - Universal AI University */}
          <div className="mt-4 sm:mt-5 max-w-2xl">
            <p className="text-slate-200 text-sm sm:text-base md:text-lg font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Connecting ambitious student builders at Universal AI University with frontier AI technology and industry leadership.
            </p>
          </div>

          {/* 3. Single Primary CTA Button (Standardized Geometry & Style) */}
          <div className="mt-8 sm:mt-10">
            <BorderBeam size="md" colorVariant="colorful">
              <button
                onClick={() => handleScrollTo("cylinder")}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-cyan-400 via-sky-400 to-[#4169e1] text-slate-950 hover:brightness-110 shadow-[0_4px_24px_rgba(65,105,225,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore Ecosystem</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform stroke-[2]" />
              </button>
            </BorderBeam>
          </div>
        </motion.div>

        {/* Subtle Scroll Cue */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity pointer-events-auto"
        >
          <button
            onClick={() => handleScrollTo("cylinder")}
            aria-label="Scroll down"
            className="p-1 cursor-pointer"
          >
            <ChevronDown className="w-5 h-5 text-white/60 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
