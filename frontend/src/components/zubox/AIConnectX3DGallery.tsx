import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Sparkles,
  ArrowUpRight,
  X,
} from "lucide-react";

const RAINBOW_CONIC_GRADIENT =
  "conic-gradient(from var(--beam-ambient-angle, 0deg), #ff0055 0deg, #ff3b30 40deg, #ff9500 75deg, #00e676 130deg, #00b0ff 190deg, #2979ff 250deg, #d500f9 305deg, #ff0055 360deg)";

// Helper to parse markdown links [label](url) in event descriptions
function renderFormattedText(text: string) {
  const parts: (string | React.ReactNode)[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const [_, label, url] = match;
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-medium"
      >
        {label}
      </a>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

interface GalleryEvent {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  image: string;
  fullImage?: string;
  date: string;
  location: string;
  highlights: string[];
  panelists?: string[];
  mentors?: string[];
  closingNote?: string;
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

  // Scroll-lock body cleanly when modal is open and portal to document.body
  useEffect(() => {
    if (!selectedEvent) return;

    const scrollY = window.scrollY;
    const originalStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      overflow: document.body.style.overflow,
      width: document.body.style.width,
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";
    document.body.classList.add("media-modal-open");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedEvent(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.position = originalStyles.position;
      document.body.style.top = originalStyles.top;
      document.body.style.left = originalStyles.left;
      document.body.style.right = originalStyles.right;
      document.body.style.overflow = originalStyles.overflow;
      document.body.style.width = originalStyles.width;
      document.body.classList.remove("media-modal-open");
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent]);

  const events: GalleryEvent[] = [
    {
      id: 1,
      tag: "AI ENGINEERING × AGENTIC SYSTEMS",
      title: "AI ENGINEERING ’26",
      subtitle: "MASTERCLASS BY MR. DIPAN MEHTA",
      summary:
        "Frontier Masterclass on AI Engineering & Agentic Systems hosted by Mr. Dipan Mehta at Universal AI University.",
      description:
        "Turning industry expertise into student experiences. 🤝\n\n[AI ConnectX](https://www.linkedin.com/company/ai-connectx-ai/) was proud to support and contribute to the successful execution of the insightful session on AI Engineering × Agentic Systems by Mr. [Dipan Mehta](https://www.linkedin.com/in/dipanmehta/) at [Universal Ai University](https://www.linkedin.com/school/universalaiuniversity/).\n\nFrom coordination to execution, our team worked to create a platform where industry expertise meets student curiosity, enabling meaningful learning and interaction.",
      image: "/gallery/agentic_systems.jpg",
      fullImage: "/gallery/agentic_systems_full.jpg",
      date: "Campus Masterclass · 2026",
      location: "Universal Ai University Auditorium & Innovation Stage",
      highlights: [
        "Insightful session on AI Engineering × Agentic Systems by Mr. Dipan Mehta",
        "Created a collaborative platform where industry expertise meets student curiosity",
        "End-to-end event coordination and seamless execution by the AI ConnectX team",
        "Direct guidance & mentorship by Mr. Pranav More, Patron of AI CONNECTX",
      ],
      panelists: [
        "Mr. Dipan Mehta – Industry Leader & AI Engineering Expert",
      ],
      mentors: [
        "Mr. Pranav More – Patron of AI CONNECTX, for continued guidance & creating industry bridges",
      ],
      closingNote:
        "A special note of appreciation to Mr. [Pranav More](https://www.linkedin.com/in/pranav-more-892a14131/), Patron AI CONNECTX, for his continued support and guidance in creating opportunities that connect students with industry.\n\nAI CONNECTX | Connecting Students • Industry • Ideas • Impact. 🚀",
    },
    {
      id: 2,
      tag: "SIP EVALUATION 2026",
      title: "SIP EVALUATION ’26",
      subtitle: "INDUSTRY JURY & MENTORSHIP",
      summary:
        "Industry Summer Internship Project evaluation session orchestrated by the AI ConnectX team with distinguished corporate jury pioneers.",
      description:
        "🙌 Behind every successful initiative is a team that makes it happen! The successful completion of SIP Evaluation 2026 at Universal Ai University was made possible through the dedication, coordination, and hard work of the Ai ConnectX team.\n\nFrom coordinating with industry professionals to managing evaluation sessions and ensuring smooth execution, our team worked together behind the scenes to make the process successful.",
      image: "/gallery/sip_evaluation.jpg",
      fullImage: "/gallery/sip_evaluation_full.jpg",
      date: "Saturday, 26/09/2026 · 01:00 PM",
      location: "Universal AI University Campus, Kushiwali, Maharashtra",
      highlights: [
        "Dedicated coordination and execution by the AI ConnectX team",
        "Comprehensive Summer Internship Project evaluations by leading industry pioneers",
        "Direct corporate insights, feedback loops and real-world evaluation benchmarks",
      ],
      panelists: [
        "Roshan Joshi – Founder, Value Nova Ventures",
        "Mandar Chiplunkar – Product Manager, Xplor Technologies",
        "Vivek Yadav – Founder, Ocean AI",
        "Varun Mishra – Vice President, Navdhan Capital",
        "Sanket Thete – Senior Software Engineer",
        "Abhijeet Gosavi – Team Lead",
      ],
      mentors: [
        "Dr. Shivaji Pawar for his support and guidance",
        "Mr. Akash Kadam for his valuable support",
        "Mr. Pranav More, Patron of Ai ConnectX, for his continued guidance and encouragement",
      ],
      closingNote:
        "And most importantly, a big shoutout to every member of the Ai ConnectX team who contributed their time, effort, and commitment.\n\nA shared effort, a successful SIP Evaluation, and another step towards stronger industry connections! 🚀\n\nAi ConnectX | Connecting Students • Industry • Ideas • Impact.",
    },
    {
      id: 3,
      tag: "FLAGSHIP ANNUAL CONCLAVE",
      title: "AI CONCLAVE 4.0",
      subtitle: "UNIVERSAL AI AUDITORIUM",
      summary:
        "Marquee annual convention packed with 500+ student innovators, foundation model keynotes, and neural gaming arenas.",
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
      id: 4,
      tag: "24-HOUR BUILDATHON",
      title: "AI CODE SPRINT",
      subtitle: "MIDNIGHT HACK LAB",
      summary:
        "High-intensity 24-hour sprint where student cohorts engineered, fine-tuned, and deployed production-grade AI systems.",
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
      id: 5,
      tag: "AWARD CEREMONY",
      title: "PODIUM CELEBRATION",
      subtitle: "₹1,00,000 GRAND PRIZE",
      summary:
        "Triumphant conclusion to the AI Buildathon honoring breakthrough autonomous cohorts with bounties and incubation fast-tracks.",
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
  ];

  const total = events.length;

  const isDesktop = windowWidth >= 1280;
  const isLaptop = windowWidth >= 1024;
  const isTablet = windowWidth >= 640;

  // Shift card stage toward the right half on tablet/desktop so the left side stays blank
  const baseShiftX = isDesktop
    ? Math.round(windowWidth * 0.14)
    : isLaptop
    ? Math.round(windowWidth * 0.13)
    : isTablet
    ? Math.round(windowWidth * 0.11)
    : 0;
  const stepX = isDesktop ? 250 : isLaptop ? 210 : isTablet ? 165 : 140;
  const outerRadius = isTablet ? 28 : 24;
  const innerRadius = outerRadius - 3;

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
      <span id="chronicles" className="sr-only" />

      {/* ─── Fullscreen Sticky Stage (Creates the clean pause while scrolling) ─── */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex flex-col justify-between py-4 sm:py-8 lg:py-10 px-4 sm:px-12 lg:px-16 overflow-hidden z-20">

        {/* ─── Top Section Header ─── */}
        <div className="w-full max-w-[1600px] mx-auto flex flex-col sm:flex-row items-start justify-between gap-2.5 sm:gap-6 z-20 shrink-0 no-text-shadow [text-shadow:none] [&_*]:[text-shadow:none]" style={{ textShadow: "none" }}>
          <div>
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] shadow-[0_0_8px_rgba(29,78,216,0.5)]" />
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#1D4ED8]" style={{ textShadow: "none" }}>
                MOMENTS &amp; SPRINTS · LINKEDIN ARCHIVE
              </span>
            </div>
            <h2
              className="text-3xl sm:text-5xl lg:text-6xl font-['Outfit',sans-serif] font-extrabold tracking-[-0.03em] text-[#1D4ED8] drop-shadow-none leading-none select-none"
              style={{ textShadow: "none" }}
            >
              Club Chronicles
            </h2>
          </div>

          <div className="flex items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-3.5">
            <p className="max-w-xs sm:max-w-md text-xs sm:text-sm text-[#1D4ED8]/85 font-medium leading-relaxed text-left sm:text-right hidden sm:block" style={{ textShadow: "none" }}>
              Captured moments from our flagship AI Conclaves, hackathons, robotics
              deployments, and technical summits.
            </p>

            {/* Navigation Circular Arrows */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrev}
                aria-label="Previous event"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#1D4ED8]/30 bg-white/95 backdrop-blur-md flex items-center justify-center text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white hover:border-[#1D4ED8] active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next event"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#1D4ED8]/30 bg-white/95 backdrop-blur-md flex items-center justify-center text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white hover:border-[#1D4ED8] active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── 3D Card Stage (Right-aligned deck keeping the left side blank) ─── */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{
            touchAction: "pan-y",
            perspectiveOrigin: windowWidth >= 640 ? "64% 50%" : "50% 50%",
          }}
          className="relative w-full flex-1 flex items-center justify-center [perspective:1400px] overflow-visible my-auto select-none cursor-grab active:cursor-grabbing"
        >
          {events.map((evt, idx) => {
            // Keep active card on the right half and fan upcoming cards rightward,
            // ensuring passed/hidden cards never occupy the blank left side.
            const diff = (idx - activeIdx + total) % total;

            const isCenter = diff === 0;
            const isNextOne = diff === 1;
            const isNextTwo = diff === 2;
            const isExitingPrev = diff === total - 1;

            const relativeX = isExitingPrev
              ? -Math.round(stepX * 0.12)
              : diff >= 3
              ? stepX * 2.35
              : diff * stepX;

            const currentTranslateX = baseShiftX + relativeX + dragOffset;
            const translateZ = isCenter ? 80 : isNextOne ? -50 : -150;
            const rotateY = isCenter ? 0 : isExitingPrev ? 6 : Math.min(diff, 2) * -15;
            const scale = isCenter ? 1.0 : isNextOne ? 0.88 : isNextTwo ? 0.76 : isExitingPrev ? 0.92 : 0.68;
            const opacity = isCenter ? 1 : isNextOne ? 0.78 : isNextTwo ? 0.42 : 0;
            const zIndex = isCenter ? 30 : isNextOne ? 20 : isNextTwo ? 10 : isExitingPrev ? 25 : 5;
            const isInteractiveVisible = isCenter || isNextOne || isNextTwo;

            return (
              <div
                key={evt.id}
                onClick={() => {
                  if (isInteractiveVisible && Math.abs(dragOffset) < 5) setActiveIdx(idx);
                }}
                style={{
                  transform: `translateX(${currentTranslateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  pointerEvents: isInteractiveVisible ? "auto" : "none",
                  borderRadius: `${outerRadius}px`,
                  transition: isDraggingRef.current
                    ? "opacity 0.15s ease-out, transform 0.04s ease-out"
                    : "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className={`absolute w-[310px] sm:w-[440px] md:w-[500px] lg:w-[560px] xl:w-[640px] 2xl:w-[700px] h-[210px] sm:h-[290px] md:h-[330px] lg:h-[360px] xl:h-[410px] 2xl:h-[435px] cursor-pointer group ${
                  isCenter
                    ? "shadow-[0_20px_45px_rgba(0,0,0,0.75)]"
                    : "shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
                }`}
              >
                {isCenter ? (
                  <div
                    style={{
                      animation: "beam-ambient-spin 7s linear infinite",
                    }}
                    className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  >
                    {/* Soft ambient light falloff */}
                    <div
                      className="ambient-beam-shadow-wide absolute -inset-4 sm:-inset-6 rounded-[38px] -z-10 pointer-events-none"
                      style={{
                        background: RAINBOW_CONIC_GRADIENT,
                        filter: "blur(28px) brightness(1.15) saturate(1.35)",
                        opacity: 0.38,
                      }}
                    />
                    {/* Near ambient halo hugging the rounded border */}
                    <div
                      className="ambient-beam-shadow-near absolute -inset-1 sm:-inset-1.5 rounded-[34px] -z-10 pointer-events-none"
                      style={{
                        background: RAINBOW_CONIC_GRADIENT,
                        filter: "blur(10px) brightness(1.25) saturate(1.45)",
                        opacity: 0.5,
                      }}
                    />

                    {/* Crisp concentric 3px rainbow border ring */}
                    <div
                      style={{
                        background: RAINBOW_CONIC_GRADIENT,
                        borderRadius: `${outerRadius}px`,
                        clipPath: `inset(0 round ${outerRadius}px)`,
                        WebkitClipPath: `inset(0 round ${outerRadius}px)`,
                        transform: "translateZ(0)",
                      }}
                      className="relative w-full h-full p-[3px]"
                    >
                      <div
                        style={{
                          borderRadius: `${innerRadius}px`,
                          clipPath: `inset(0 round ${innerRadius}px)`,
                          WebkitClipPath: `inset(0 round ${innerRadius}px)`,
                          transform: "translateZ(0)",
                        }}
                        className="relative w-full h-full bg-zinc-950 overflow-hidden"
                      >
                        {/* Background Image - Positioned to keep people's faces visible in landscape */}
                        <img
                          src={evt.image}
                          alt={evt.title}
                          draggable={false}
                          className="w-full h-full object-cover object-[center_20%] sm:object-[center_25%] pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Top Soft Gradient Scrim for Tag Legibility */}
                        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/75 via-black/25 to-transparent pointer-events-none" />

                        {/* Top Tag Pill */}
                        <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-10 pointer-events-none">
                          <span className="px-3 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase bg-black/75 backdrop-blur-md border border-white/20 text-white font-bold shadow-lg flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-500 via-green-400 to-blue-500 animate-pulse" />
                            #{evt.tag}
                          </span>
                        </div>

                        {/* Bottom Editorial Content Overlay in Landscape Layout (Clean, compact height) */}
                        <div className="absolute bottom-0 left-0 right-0 pt-10 sm:pt-14 pb-3.5 sm:pb-5 px-4 sm:px-6 flex flex-col justify-end z-10 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-6">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base sm:text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-md">
                                {evt.title}
                              </h3>
                              <p className="text-[10px] sm:text-xs font-mono font-bold tracking-wider mt-0.5 uppercase bg-gradient-to-r from-red-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                                // {evt.subtitle}
                              </p>
                              <p className="text-[11px] sm:text-xs text-white/80 line-clamp-1 sm:line-clamp-2 leading-relaxed font-light mt-1 drop-shadow-sm max-w-xl hidden sm:block">
                                {evt.summary}
                              </p>
                            </div>

                            {/* Action CTA Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(evt);
                              }}
                              className="relative group/btn shrink-0 w-full sm:w-auto p-[1px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-[0_0_20px_rgba(255,0,85,0.25),0_0_25px_rgba(0,255,102,0.2),0_0_30px_rgba(0,102,255,0.25)]"
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-emerald-400 to-blue-500 opacity-80 group-hover/btn:opacity-100 transition-opacity" />
                              <div className="relative px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-[11px] bg-zinc-950/90 group-hover/btn:bg-zinc-900/90 flex items-center justify-center gap-2 transition-colors">
                                <span className="text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap">View Event Story</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-white/90 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      borderRadius: `${outerRadius}px`,
                      clipPath: `inset(0 round ${outerRadius}px)`,
                      WebkitClipPath: `inset(0 round ${outerRadius}px)`,
                      transform: "translateZ(0)",
                    }}
                    className="w-full h-full bg-zinc-950 overflow-hidden border border-white/15 hover:border-white/40 transition-all duration-500 ease-out hover:scale-[1.03] relative"
                  >
                    {/* Background Image */}
                    <img
                      src={evt.image}
                      alt={evt.title}
                      draggable={false}
                      className="w-full h-full object-cover object-[center_20%] sm:object-[center_25%] pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle top scrim for tag */}
                    <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

                    {/* Top Tag Pill */}
                    <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-10 pointer-events-none">
                      <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md border border-white/20 text-white/80 font-semibold shadow-md">
                        #{evt.tag}
                      </span>
                    </div>

                    {/* Bottom Editorial Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                      <div className="mb-0.5">
                        <h3 className="text-base sm:text-xl md:text-2xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-md">
                          {evt.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs font-mono font-bold text-white/60 tracking-wider mt-0.5 uppercase">
                          // {evt.subtitle}
                        </p>
                      </div>

                      <span className="text-[10px] text-white/50 font-mono tracking-wider uppercase mt-1">
                        Click to Focus
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ─── Bottom Pagination Dots (Aligned with shifted card focal point) ─── */}
        <div
          style={{
            transform: isTablet ? `translateX(${baseShiftX}px)` : undefined,
          }}
          className="w-full flex items-center justify-center gap-2 pt-2 pb-2 z-20 shrink-0 [text-shadow:none] transition-transform duration-300"
        >
          {events.map((evt, idx) => (
            <button
              key={evt.id}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Go to event ${idx + 1}`}
              className={`transition-all duration-300 cursor-pointer rounded-full ${
                idx === activeIdx
                  ? "w-7 h-1.5 bg-[#1D4ED8] shadow-sm"
                  : "w-1.5 h-1.5 bg-[#1D4ED8]/25 hover:bg-[#1D4ED8]/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─── Event Details Modal Dossier (Portaled to document.body to prevent 3D perspective glitching) ─── */}
      {selectedEvent &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            data-media-modal="true"
            className="media-modal-active fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedEvent(null);
            }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950/95 border border-white/20 p-5 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.95)] text-white focus:outline-none"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-5">
                <div>
                  <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-widest block mb-1">
                    #{selectedEvent.tag}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-xs text-white/60 font-mono mt-0.5">
                    {selectedEvent.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Event Image Banner - Widescreen Landscape */}
                <div className="w-full aspect-[16/9] sm:aspect-[16/10] max-h-80 sm:max-h-96 rounded-2xl overflow-hidden border border-white/10 mb-4 bg-black/80 flex items-center justify-center shadow-inner">
                  <img
                    src={selectedEvent.fullImage || selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-contain object-center"
                  />
                </div>

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

                <p className="text-sm text-white/85 leading-relaxed font-light whitespace-pre-line">
                  {renderFormattedText(selectedEvent.description)}
                </p>

                {/* Key Event Highlights */}
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

                {/* Industry Experts & Jury */}
                {selectedEvent.panelists && (
                  <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-2.5 mt-4">
                    <span className="text-[11px] font-mono uppercase bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent tracking-wider block font-semibold">
                      INDUSTRY EXPERTS &amp; EVALUATION JURY
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {selectedEvent.panelists.map((p, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sincere Gratitude & Mentorship */}
                {selectedEvent.mentors && (
                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2.5 mt-4">
                    <span className="text-[11px] font-mono uppercase bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent tracking-wider block font-semibold">
                      SINCERE GRATITUDE &amp; GUIDANCE
                    </span>
                    <div className="space-y-1.5 pt-1">
                      {selectedEvent.mentors.map((m, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Closing Note */}
                {selectedEvent.closingNote && (
                  <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 text-xs text-blue-200 font-mono leading-relaxed whitespace-pre-line mt-4">
                    {renderFormattedText(selectedEvent.closingNote)}
                  </div>
                )}
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
          </div>,
          document.body
        )}
    </section>
  );
}
