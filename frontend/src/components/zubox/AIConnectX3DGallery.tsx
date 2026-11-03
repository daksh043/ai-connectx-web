import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

interface GalleryEvent {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  date: string;
  location: string;
  highlights: string[];
}

export default function AIConnectX3DGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);

  // Drag interaction states for left-to-right gesture tracking
  const [dragOffset, setDragOffset] = useState(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle media-modal-open to hide the taskbar/navbar when event modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.classList.add("media-modal-open");
    } else {
      document.body.classList.remove("media-modal-open");
    }
    return () => {
      document.body.classList.remove("media-modal-open");
    };
  }, [selectedEvent]);

  const events: GalleryEvent[] = [
    {
      id: 1,
      tag: "FLAGSHIP ANNUAL CONCLAVE",
      title: "AI CONCLAVE 4.0",
      subtitle: "UNIVERSAL AI AUDITORIUM",
      description:
        "The marquee annual convention of the AI Club. Packed auditorium with 500+ builders, industry keynotes from Google & Nvidia alumni, and our interactive neural gaming arena.",
      image: "/gallery/conclave.jpg",
      date: "February 5–7, 2024",
      location: "Central Auditorium & Innovation Amphitheater",
      highlights: [
        "500+ student attendees & delegates",
        "Keynotes on Frontier Foundation Models & Multi-Agent Loops",
        "Interactive Neural Chess & Vision Pong exhibits",
      ],
    },
    {
      id: 2,
      tag: "24-HOUR BUILDATHON",
      title: "AI CODE SPRINT",
      subtitle: "MIDNIGHT HACK LAB",
      description:
        "Non-stop 24-hour sprint where student teams architected, fine-tuned, and served production-grade AI systems under strict latency and accuracy benchmarks.",
      image: "/gallery/hackathon.jpg",
      date: "March 15–16, 2024",
      location: "Tech Hub High-Performance Computing Lab",
      highlights: [
        "42 teams submitted functional open-source prototypes",
        "Direct midway architectural code reviews with senior mentors",
        "Cloud compute GPU credits provided for all participants",
      ],
    },
    {
      id: 3,
      tag: "ROBOTICS & EMBEDDED AI",
      title: "ROVER PERCEPTION",
      subtitle: "EDGE SENSING BENCHMARKS",
      description:
        "Live obstacle avoidance, 3D LiDAR point-cloud SLAM, and TensorRT edge inference testing on custom-built multi-sensor autonomous rovers.",
      image: "/gallery/robotics.jpg",
      date: "April 20, 2024",
      location: "Robotics Perception & Edge Testing Track",
      highlights: [
        "LiDAR SLAM and multi-camera stereo tracking",
        "Sub-15ms edge inference with Jetson Orin & TensorRT",
        "Published real-time indoor obstacle avoidance dataset",
      ],
    },
    {
      id: 4,
      tag: "AWARD CEREMONY",
      title: "PODIUM CELEBRATION",
      subtitle: "₹1,00,000 GRAND PRIZE",
      description:
        "Triumphant conclusion to the AI Buildathon with cash bounties, certificates of merit, and direct internship fast-tracks for the winning autonomous diagnostic team.",
      image: "/gallery/trophy.jpg",
      date: "April 21, 2024",
      location: "Main Stage Auditorium & Valedictory Arena",
      highlights: [
        "₹1,00,000 prize pool awarded to top 3 winning cohorts",
        "Direct incubator mentorship & industry fast-tracks",
        "Seed grant opportunities with university incubator",
      ],
    },
    {
      id: 5,
      tag: "RESEARCH SEMINAR",
      title: "GENESIS ’24 LLMS",
      subtitle: "REASONING AGENTS WORKSHOP",
      description:
        "Intensive whiteboard workshop breaking down frontier reasoning architectures, tool-calling loops, test-time compute, and quantization on commodity hardware.",
      image: "/gallery/workshop.jpg",
      date: "May 10, 2024",
      location: "Advanced AI Seminar Hall 402",
      highlights: [
        "Hands-on LoRA adapter training & 4-bit quantization",
        "Agentic tool-use loops with structured JSON schemas",
        "Vector database RAG retrieval optimization",
      ],
    },
  ];

  const total = events.length;

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // ─── HORIZONTAL WHEEL SCROLL (Snappy response) ───
  const isWheelingRef = useRef(false);
  const wheelCooldownTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // ONLY trigger when horizontally dominant (scrolling left or right)
      // Scrolling down is completely ignored so page scrolls down naturally
      if (absX > 10 && absX > absY) {
        e.preventDefault();

        if (isWheelingRef.current) return;
        isWheelingRef.current = true;

        if (e.deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }

        if (wheelCooldownTimerRef.current) clearTimeout(wheelCooldownTimerRef.current);
        wheelCooldownTimerRef.current = setTimeout(() => {
          isWheelingRef.current = false;
        }, 220);
      }
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      if (wheelCooldownTimerRef.current) clearTimeout(wheelCooldownTimerRef.current);
    };
  }, [handleNext, handlePrev]);

  // ─── DRAG / SWIPE GESTURE SUPPORT ───
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const diff = e.clientX - dragStartXRef.current;
    setDragOffset(diff * 0.6);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const threshold = 35;
    if (dragOffset < -threshold) {
      handleNext();
    } else if (dragOffset > threshold) {
      handlePrev();
    }

    setDragOffset(0);
  };

  const handlePointerCancel = () => {
    isDraggingRef.current = false;
    setDragOffset(0);
  };

  // ─── Keyboard Arrow Navigation ───
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative w-full min-h-[160vh] bg-transparent text-neutral-900 select-none scroll-mt-0 font-sans z-30"
    >
      <style>{`
        @property --rgb-beam-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: true;
        }

        @keyframes rgb-beam-spin {
          to {
            --rgb-beam-angle: 360deg;
          }
        }

        .rgb-beam-animated {
          animation: rgb-beam-spin 7s linear infinite;
        }

        .group:hover .rgb-beam-animated {
          animation-duration: 14s;
        }
      `}</style>
      <span id="chronicles" className="sr-only" />

      {/* ─── Fullscreen Sticky Stage (Creates the clean pause while scrolling) ─── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-6 sm:px-12 lg:px-16 overflow-hidden z-20">

        {/* ─── Top Section Header (Matches Screenshot Exactly) ─── */}
        <div className="w-full max-w-[1600px] mx-auto flex items-start justify-between gap-6 z-20 shrink-0 [text-shadow:none] [&_*]:[text-shadow:none]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#014BAA]" />
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#014BAA]">
                MOMENTS &amp; SPRINTS · LINKEDIN ARCHIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-['Space_Grotesk',sans-serif] font-bold tracking-tight text-[#014BAA]">
              Club Chronicles
            </h2>
          </div>

          <div className="flex flex-col items-end gap-3.5">
            <p className="max-w-xs sm:max-w-md text-xs sm:text-sm text-[#014BAA]/80 font-normal leading-relaxed text-right">
              Captured moments from our flagship AI Conclaves, hackathons, robotics
              deployments, and technical summits.
            </p>

            {/* Navigation Circular Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous event"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#014BAA]/25 bg-white/90 backdrop-blur-md flex items-center justify-center text-[#014BAA] hover:bg-[#014BAA] hover:text-white hover:border-[#014BAA] active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next event"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#014BAA]/25 bg-white/90 backdrop-blur-md flex items-center justify-center text-[#014BAA] hover:bg-[#014BAA] hover:text-white hover:border-[#014BAA] active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── 3D Card Stage (Vertical Portrait Cards in 3D Perspective) ─── */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ touchAction: "pan-y" }}
          className="relative w-full flex-1 flex items-center justify-center [perspective:1400px] overflow-visible my-auto select-none cursor-grab active:cursor-grabbing"
        >
          {events.map((evt, idx) => {
            let diff = (idx - activeIdx + total) % total;
            if (diff > total / 2) diff -= total;

            const isCenter = diff === 0;
            const isAbsOne = Math.abs(diff) === 1;

            const isDesktop = windowWidth >= 1280;
            const isLaptop = windowWidth >= 1024;
            const isTablet = windowWidth >= 640;
            const stepX = isDesktop ? 320 : isLaptop ? 290 : isTablet ? 240 : 170;

            const currentTranslateX = diff * stepX + dragOffset;
            const translateZ = isCenter ? 80 : isAbsOne ? -60 : -160;
            const rotateY = diff * -20;
            const scale = isCenter ? 1.0 : isAbsOne ? 0.88 : 0.74;
            const opacity = isCenter ? 1 : isAbsOne ? 0.7 : 0.3;
            const zIndex = 30 - Math.abs(diff) * 10;

            return (
              <div
                key={evt.id}
                onClick={() => {
                  if (Math.abs(dragOffset) < 5) setActiveIdx(idx);
                }}
                style={{
                  transform: `translateX(${currentTranslateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: isDraggingRef.current
                    ? "opacity 0.15s ease-out, transform 0.04s ease-out"
                    : "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className={`absolute w-[280px] sm:w-[330px] md:w-[370px] lg:w-[400px] h-[460px] sm:h-[510px] md:h-[550px] lg:h-[580px] rounded-[28px] cursor-pointer shadow-2xl group ${
                  isCenter
                    ? "z-30"
                    : "shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
                }`}
              >
                {isCenter ? (
                  <div className="relative w-full h-full transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.05]">
                    {/* 1. Dynamic RGB Ambient Glow — Bleeds 28-32px outside the card, fading smoothly along the traveling RGB light */}
                    <div
                      className="rgb-beam-animated absolute -inset-7 sm:-inset-9 rounded-[52px] pointer-events-none z-0 transition-opacity duration-500 opacity-90 group-hover:opacity-100"
                      style={{
                        background: `conic-gradient(
                          from var(--rgb-beam-angle, 0deg),
                          transparent 0deg,
                          transparent 165deg,
                          rgba(255, 0, 85, 0) 185deg,
                          rgba(255, 0, 85, 0.45) 220deg,
                          rgba(255, 120, 0, 0.6) 250deg,
                          rgba(0, 255, 100, 0.75) 280deg,
                          rgba(0, 210, 255, 0.85) 315deg,
                          rgba(40, 100, 255, 0.95) 345deg,
                          rgba(255, 255, 255, 1) 360deg
                        )`,
                        filter: "blur(32px) saturate(2.5) brightness(1.7)",
                      }}
                    />

                    {/* 2. Concentrated Soft Bloom — Atmospheric edge aura hugging the perimeter */}
                    <div
                      className="rgb-beam-animated absolute -inset-1.5 sm:-inset-2 rounded-[34px] pointer-events-none z-10 transition-opacity duration-500 opacity-95 group-hover:opacity-100"
                      style={{
                        background: `conic-gradient(
                          from var(--rgb-beam-angle, 0deg),
                          transparent 0deg,
                          transparent 175deg,
                          rgba(255, 0, 85, 0) 195deg,
                          rgba(255, 0, 85, 0.7) 235deg,
                          rgba(255, 140, 0, 0.85) 265deg,
                          rgba(0, 255, 120, 0.92) 295deg,
                          rgba(0, 220, 255, 0.98) 325deg,
                          rgba(60, 120, 255, 1) 348deg,
                          rgba(255, 255, 255, 1) 360deg
                        )`,
                        filter: "blur(12px) saturate(2.3) brightness(2.1)",
                      }}
                    />

                    {/* 3. Razor-Sharp 3.5px Perimeter Stroke with Directional Faded Trail */}
                    <div
                      className="rgb-beam-animated absolute inset-0 rounded-[28px] p-[3.5px] pointer-events-none z-20"
                      style={{
                        background: `conic-gradient(
                          from var(--rgb-beam-angle, 0deg),
                          transparent 0deg,
                          transparent 175deg,
                          rgba(255, 0, 85, 0) 195deg,
                          rgba(255, 0, 85, 0.85) 235deg,
                          rgba(255, 130, 0, 0.95) 265deg,
                          rgba(0, 255, 100, 1) 295deg,
                          rgba(0, 220, 255, 1) 325deg,
                          rgba(60, 120, 255, 1) 348deg,
                          #ffffff 360deg
                        )`,
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "exclude",
                      }}
                    />

                    {/* 4. Subtle Base Hairline Frame */}
                    <div className="absolute inset-0 rounded-[28px] border border-white/15 pointer-events-none z-10" />

                    {/* 5. Center Card Content */}
                    <div className="relative w-full h-full rounded-[28px] overflow-hidden z-15 bg-[#121214] shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
                      {/* Background Image */}
                      <img
                        src={evt.image}
                        alt={evt.title}
                        draggable={false}
                        className="w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Cybernetic Dark Gradient Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

                      {/* Top Tag Pill */}
                      <div className="absolute top-5 left-5 z-10 pointer-events-none">
                        <span className="px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase bg-black/75 backdrop-blur-md border border-white/20 text-white font-bold shadow-lg flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-500 via-green-400 to-blue-500 animate-pulse" />
                          #{evt.tag}
                        </span>
                      </div>

                      {/* Bottom Editorial Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex flex-col justify-end z-10">
                        <div className="mb-2">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-md">
                            {evt.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs font-mono font-bold tracking-wider mt-1 uppercase bg-gradient-to-r from-red-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                            // {evt.subtitle}
                          </p>
                        </div>

                        <p className="text-xs sm:text-[13px] text-white/75 line-clamp-3 leading-relaxed font-light mb-4 drop-shadow-sm">
                          {evt.description}
                        </p>

                        {/* Action CTA Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(evt);
                          }}
                          className="relative group/btn w-full p-[1px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_0_20px_rgba(255,0,85,0.25),0_0_25px_rgba(0,255,102,0.2),0_0_30px_rgba(0,102,255,0.25)]"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-emerald-400 to-blue-500 opacity-80 group-hover/btn:opacity-100 transition-opacity" />
                          <div className="relative px-5 py-2.5 rounded-[11px] bg-zinc-950/90 group-hover/btn:bg-zinc-900/90 flex items-center justify-between transition-colors">
                            <span className="text-white text-xs font-bold tracking-wider uppercase">View Event Story</span>
                            <ArrowUpRight className="w-4 h-4 text-white/90 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full rounded-[28px] overflow-hidden border border-white/15 hover:border-white/40 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) hover:scale-[1.03] relative">
                    {/* Background Image */}
                    <img
                      src={evt.image}
                      alt={evt.title}
                      draggable={false}
                      className="w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Cybernetic Dark Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

                    {/* Top Tag Pill */}
                    <div className="absolute top-5 left-5 z-10 pointer-events-none">
                      <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md border border-white/20 text-white/80 font-semibold shadow-md">
                        #{evt.tag}
                      </span>
                    </div>

                    {/* Bottom Editorial Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex flex-col justify-end z-10">
                      <div className="mb-2">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-md">
                          {evt.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs font-mono font-bold text-white/60 tracking-wider mt-1 uppercase">
                          // {evt.subtitle}
                        </p>
                      </div>

                      <p className="text-xs sm:text-[13px] text-white/75 line-clamp-3 leading-relaxed font-light mb-4 drop-shadow-sm">
                        {evt.description}
                      </p>

                      <span className="text-[10px] text-white/40 font-mono tracking-wider uppercase">
                        Click to Focus
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ─── Bottom Pagination Dots (Matches Screenshot) ─── */}
        <div className="w-full flex items-center justify-center gap-2 pt-2 pb-2 z-20 shrink-0 [text-shadow:none]">
          {events.map((evt, idx) => (
            <button
              key={evt.id}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Go to event ${idx + 1}`}
              className={`transition-all duration-300 cursor-pointer rounded-full ${
                idx === activeIdx
                  ? "w-7 h-1.5 bg-[#014BAA] shadow-sm"
                  : "w-1.5 h-1.5 bg-[#014BAA]/25 hover:bg-[#014BAA]/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─── Event Details Modal Dossier ─── */}
      {selectedEvent && (
        <div
          data-media-modal="true"
          className="media-modal-active fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl rounded-3xl bg-zinc-950/95 border border-white/20 p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.9)] text-white">
            <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-widest block mb-1">
                  #{selectedEvent.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs text-white/60 font-mono">
                  {selectedEvent.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 font-mono pb-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-red-400" />
                  {selectedEvent.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  {selectedEvent.location}
                </span>
              </div>

              <p className="text-sm text-white/85 leading-relaxed font-light">
                {selectedEvent.description}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 mt-4">
                <span className="text-[11px] font-mono uppercase bg-gradient-to-r from-red-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent tracking-wider block font-semibold">
                  KEY EVENT HIGHLIGHTS
                </span>
                {selectedEvent.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 via-emerald-500 to-blue-500 text-white font-bold text-xs tracking-wide hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,0,85,0.4)]"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
