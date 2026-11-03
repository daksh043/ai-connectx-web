"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * =========================================================================
 * SlideShow Component — "Cinematic Wipe with Parallax"
 * =========================================================================
 * 
 * TWEAK GUIDE:
 * - DURATION & TIMING:
 *     - Exit content: duration: 0.5s
 *     - Wipe sweep: duration: 0.8s
 *     - Enter content stagger: delay 0.4s + (0.1s * index), duration 0.7s
 *     - Input lockout timer: 1050ms (transitionLockDurationMs prop)
 * - EASING:
 *     - Cinematic wipe: [0.76, 0, 0.24, 1] (smooth acceleration with deceleration)
 *     - Parallax & Content: [0.25, 1, 0.5, 1] (cubic-out for snappy settle)
 * - DIRECTIONS:
 *     - Forward (next / down scroll / right key): Wipes from bottom (inset(100% 0 0 0) -> inset(0 0 0 0))
 *     - Backward (prev / up scroll / left key): Wipes from top (inset(0 0 100% 0) -> inset(0 0 0 0))
 * - ACCENT COLOR:
 *     - Change `--slide-accent` in `accentColor` prop or pass your hex/rgb/hsl.
 */

export interface SlideItem {
  id: string | number;
  tagline?: string;
  title: string;
  subtext: string;
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  bgImage: string;
}

export interface SlideShowProps {
  slides?: SlideItem[];
  accentColor?: string; // CSS variable or hex (e.g. '#00f0ff' or 'var(--neon-accent)')
  className?: string;
  transitionLockDurationMs?: number; // lock duration to prevent scroll thrashing (default: 1050ms)
}

const DEFAULT_SLIDES: SlideItem[] = [
  {
    id: 1,
    tagline: "Frontier Technology",
    title: "Autonomous Intelligence",
    subtext: "Architecting hyper-scale multi-agent reasoning graphs engineered for real-time edge orchestration.",
    ctaText: "Explore Architecture",
    bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop",
  },
  {
    id: 2,
    tagline: "Universal Synergy",
    title: "Neural Synergy Matrix",
    subtext: "Connecting industry leaders with student innovators across next-generation cognitive computing labs.",
    ctaText: "Discover Ventures",
    bgImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2200&auto=format&fit=crop",
  },
  {
    id: 3,
    tagline: "Spatial Dynamics",
    title: "Volumetric Cybernetics",
    subtext: "Immersion redefined through low-latency WebGL rasterization and continuous spatial simulations.",
    ctaText: "Launch Experience",
    bgImage: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=2187&auto=format&fit=crop",
  },
  {
    id: 4,
    tagline: "Quantum Synthesis",
    title: "Algorithmic Precision",
    subtext: "Pushing computational boundaries with self-healing distributed pipelines and deterministic state machines.",
    ctaText: "Inspect Systems",
    bgImage: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2274&auto=format&fit=crop",
  },
  {
    id: 5,
    tagline: "The Future of Connect",
    title: "Ecosystem Horizon",
    subtext: "A unified collective of visionary engineers shaping tomorrow's human-AI collaboration paradigms.",
    ctaText: "Join The Initiative",
    bgImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2340&auto=format&fit=crop",
  },
];

// Easing cubic-bezier(0.76, 0, 0.24, 1) as defined in specification
const WIPE_EASING = [0.76, 0, 0.24, 1] as const;
const CONTENT_EASING = [0.25, 1, 0.5, 1] as const;

export default function SlideShow({
  slides = DEFAULT_SLIDES,
  accentColor = "#00f0ff", // Neon Cyan
  className = "",
  transitionLockDurationMs = 1050,
}: SlideShowProps) {
  // Navigation state: [currentSlideIndex, direction (-1 for backward, +1 for forward)]
  const [[currentIdx, direction], setSlideState] = useState<[number, number]>([0, 1]);
  const isTransitioningRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Touch tracking refs
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const totalSlides = slides.length;

  /**
   * Safe slide transition coordinator with hardware-locked transition throttle
   */
  const goToSlide = useCallback(
    (newIndex: number, forcedDir?: number) => {
      if (isTransitioningRef.current) return;
      if (newIndex === currentIdx) return;
      if (newIndex < 0 || newIndex >= totalSlides) return;

      isTransitioningRef.current = true;
      const calculatedDir = forcedDir ?? (newIndex > currentIdx ? 1 : -1);

      setSlideState([newIndex, calculatedDir]);

      // Release lockout after animation cycle finishes
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, transitionLockDurationMs);
    },
    [currentIdx, totalSlides, transitionLockDurationMs]
  );

  const nextSlide = useCallback(() => {
    if (currentIdx < totalSlides - 1) {
      goToSlide(currentIdx + 1, 1);
    } else {
      // Loop or bounce back: loop to first slide
      goToSlide(0, 1);
    }
  }, [currentIdx, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentIdx > 0) {
      goToSlide(currentIdx - 1, -1);
    } else {
      // Loop back to last slide
      goToSlide(totalSlides - 1, -1);
    }
  }, [currentIdx, totalSlides, goToSlide]);

  // Keyboard navigation listener (ArrowUp, ArrowDown, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        nextSlide();
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Wheel / Trackpad event listener with deadzone filtering & lockout protection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelDeltaAccumulator = 0;
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioningRef.current) return;

      wheelDeltaAccumulator += e.deltaY;

      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        wheelDeltaAccumulator = 0;
      }, 250);

      const THRESHOLD = 35;
      if (Math.abs(wheelDeltaAccumulator) >= THRESHOLD) {
        if (wheelDeltaAccumulator > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        wheelDeltaAccumulator = 0;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [nextSlide, prevSlide]);

  // Touch swipe support on mobile (vertical & horizontal gestures)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    if (isTransitioningRef.current) return;

    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;

    const SWIPE_THRESHOLD = 45;

    // Detect dominant swipe axis
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
        if (deltaY > 0) nextSlide();
        else prevSlide();
      }
    } else {
      if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
        if (deltaX > 0) nextSlide();
        else prevSlide();
      }
    }

    touchStartY.current = null;
    touchStartX.current = null;
  };

  const currentSlide = slides[currentIdx];

  // Wipe clip-path definitions based on direction (+1 forward wipes from bottom, -1 backward wipes from top)
  const wipeInitial = direction > 0 ? "inset(100% 0 0% 0)" : "inset(0 0 100% 0)";
  const wipeAnimate = "inset(0 0 0% 0)";

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        ["--slide-accent" as string]: accentColor,
      }}
      className={`relative h-screen w-full overflow-hidden bg-[#07080d] select-none text-white font-sans ${className}`}
      aria-roledescription="carousel"
      aria-label="Full-screen cinematic showcase"
    >
      {/* ========================================================================= */}
      {/* SLIDE TRANSITION VIEWPORT (AnimatePresence with mode="wait")              */}
      {/* ========================================================================= */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`slide-${currentSlide.id}`}
          className="absolute inset-0 h-full w-full will-change-transform"
          // Reduced motion fallback: simple fade opacity
          initial={
            reducedMotion
              ? { opacity: 0 }
              : {
                  clipPath: wipeInitial,
                  opacity: 1,
                }
          }
          animate={
            reducedMotion
              ? { opacity: 1, transition: { duration: 0.5 } }
              : {
                  clipPath: wipeAnimate,
                  opacity: 1,
                  transition: {
                    clipPath: { duration: 0.8, ease: WIPE_EASING },
                  },
                }
          }
          exit={
            reducedMotion
              ? { opacity: 0, transition: { duration: 0.4 } }
              : {
                  opacity: 1,
                  transition: { duration: 0.8 },
                }
          }
        >
          {/* ----------------------------------------------------------------- */}
          {/* BACKGROUND LAYER with Parallax & Exit Scale-Down                  */}
          {/* ----------------------------------------------------------------- */}
          <motion.div
            className="absolute inset-0 h-full w-full overflow-hidden"
            initial={
              reducedMotion
                ? {}
                : {
                    y: direction > 0 ? 60 : -60, // ENTER Parallax: translateY from 60px -> 0
                    scale: 1.08,
                  }
            }
            animate={{
              y: 0,
              scale: 1.1,
              transition: {
                y: { duration: 0.7, delay: 0.4, ease: CONTENT_EASING },
                scale: { duration: 1.2, ease: "easeOut" },
              },
            }}
            exit={{
              scale: 1.0, // EXIT: Scales down from 1.1 to 1.0
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${currentSlide.bgImage})` }}
            />

            {/* Cinematic Gradient Overlays (preserving dark theme & legibility) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-[#07080d]/60 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080d] via-[#07080d]/50 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)]" />
          </motion.div>

          {/* ----------------------------------------------------------------- */}
          {/* WIPING ACCENT LINE HIGHLIGHT                                      */}
          {/* Runs synchronously along the sweep edge of the clip-path          */}
          {/* ----------------------------------------------------------------- */}
          {!reducedMotion && (
            <motion.div
              className="pointer-events-none absolute left-0 right-0 z-30 h-[2px] shadow-[0_0_15px_var(--slide-accent),0_0_30px_var(--slide-accent)]"
              style={{ backgroundColor: "var(--slide-accent)" }}
              initial={{
                top: direction > 0 ? "100%" : "0%",
                opacity: 1,
              }}
              animate={{
                top: direction > 0 ? "0%" : "100%",
                opacity: [0, 1, 1, 0],
                transition: {
                  duration: 0.8,
                  ease: WIPE_EASING,
                  opacity: { times: [0, 0.1, 0.9, 1], duration: 0.8 },
                },
              }}
            />
          )}

          {/* ----------------------------------------------------------------- */}
          {/* SLIDE FOREGROUND CONTENT LAYER                                    */}
          {/* Exit: fades & slides up (y: -40px, opacity: 0)                    */}
          {/* Enter: staggered heading, subtext, button (0.1s stagger, y:30->0) */}
          {/* ----------------------------------------------------------------- */}
          <motion.div
            className="relative z-20 flex h-full w-full items-center px-6 sm:px-12 md:px-20 lg:px-28"
            exit={{
              y: -40, // EXIT: slides up slightly
              opacity: 0, // EXIT: fades out (0.5s)
              transition: { duration: 0.5, ease: "easeIn" },
            }}
          >
            <div className="max-w-3xl">
              {/* Tagline / Category */}
              {currentSlide.tagline && (
                <motion.div
                  initial={reducedMotion ? {} : { y: 25, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.7, delay: 0.4, ease: CONTENT_EASING },
                  }}
                  className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 backdrop-blur-md"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse shadow-[0_0_8px_var(--slide-accent)]"
                    style={{ backgroundColor: "var(--slide-accent)" }}
                  />
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-widest"
                    style={{ color: "var(--slide-accent)" }}
                  >
                    {currentSlide.tagline}
                  </span>
                </motion.div>
              )}

              {/* Main Heading */}
              <motion.h1
                initial={reducedMotion ? {} : { y: 30, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.7, delay: 0.5, ease: CONTENT_EASING },
                }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
              >
                {currentSlide.title}
              </motion.h1>

              {/* Subtext Paragraph */}
              <motion.p
                initial={reducedMotion ? {} : { y: 30, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.7, delay: 0.6, ease: CONTENT_EASING },
                }}
                className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
              >
                {currentSlide.subtext}
              </motion.p>

              {/* CTA Action Button */}
              {currentSlide.ctaText && (
                <motion.div
                  initial={reducedMotion ? {} : { y: 30, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.7, delay: 0.7, ease: CONTENT_EASING },
                  }}
                  className="mt-8 flex items-center gap-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (currentSlide.onCtaClick) currentSlide.onCtaClick();
                      else if (currentSlide.ctaLink) window.location.href = currentSlide.ctaLink;
                    }}
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm sm:text-base font-bold text-slate-950 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    style={{
                      backgroundColor: "var(--slide-accent)",
                      boxShadow: "0 0 25px rgba(0, 240, 255, 0.35)",
                    }}
                  >
                    <span>{currentSlide.ctaText}</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* SLIDE PROGRESS CONTROLS (Counter + Interactive Dots + Nav Buttons)        */}
      {/* ========================================================================= */}

      {/* 1. TOP-RIGHT COUNTER (01 / 05) */}
      <div className="absolute right-6 top-8 z-30 flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-widest text-white/70 backdrop-blur-md bg-black/30 border border-white/10 px-4 py-2 rounded-full">
        <span className="text-white" style={{ color: "var(--slide-accent)" }}>
          {String(currentIdx + 1).padStart(2, "0")}
        </span>
        <span className="text-white/30">/</span>
        <span>{String(totalSlides).padStart(2, "0")}</span>
      </div>

      {/* 2. RIGHT-SIDE VERTICAL PROGRESS TRACKER (Interactive Dots) */}
      <nav
        aria-label="Slide dots"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-3 bg-black/25 backdrop-blur-md p-2.5 rounded-full border border-white/10"
      >
        {slides.map((slide, idx) => {
          const isActive = idx === currentIdx;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex items-center justify-center p-1 cursor-pointer transition-transform duration-200 hover:scale-125"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-6 w-2 shadow-[0_0_12px_var(--slide-accent)]"
                    : "h-2 w-2 bg-white/30 group-hover:bg-white/70"
                }`}
                style={{
                  backgroundColor: isActive ? "var(--slide-accent)" : undefined,
                }}
              />
            </button>
          );
        })}
      </nav>

      {/* 3. BOTTOM-LEFT INTERACTIVE ARROW CONTROLS */}
      <div className="absolute bottom-8 left-6 sm:left-12 md:left-20 lg:left-28 z-30 flex items-center gap-3">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-90 cursor-pointer"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-90 cursor-pointer"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Swipe / Scroll keyboard prompt */}
        <span className="hidden md:inline-block ml-3 font-mono text-xs uppercase tracking-wider text-slate-400">
          Scroll, Swipe, or Keys [↑ / ↓]
        </span>
      </div>

      {/* 4. BOTTOM CONTINUOUS PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/10">
        <motion.div
          className="h-full shadow-[0_0_8px_var(--slide-accent)]"
          style={{ backgroundColor: "var(--slide-accent)" }}
          animate={{
            width: `${((currentIdx + 1) / totalSlides) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
