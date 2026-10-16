import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Sparkles, ArrowUpRight } from "lucide-react";

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
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);

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

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="gallery"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10 select-none overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-teal-300">
              MOMENTS &amp; SPRINTS · LINKEDIN ARCHIVE
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white drop-shadow-sm">
            Club Chronicles
          </h2>
        </div>

        <div className="flex flex-col md:items-end gap-4">
          <p className="max-w-md text-xs sm:text-sm text-white/70 font-light leading-relaxed md:text-right">
            Captured moments from our flagship AI Conclaves, hackathons, robotics
            deployments, and technical summits.
          </p>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous card"
              className="w-11 h-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 hover:border-teal-400/50 transition-all cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next card"
              className="w-11 h-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 hover:border-teal-400/50 transition-all cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── 3D Parallax Curved Card Carousel (Pinterest pin.it/4jcARwJna Style) ─── */}
      <div className="relative w-full h-[540px] sm:h-[600px] flex items-center justify-center [perspective:1400px]">
        {events.map((evt, idx) => {
          // Calculate relative distance with wraparound
          let diff = (idx - activeIdx + total) % total;
          if (diff > total / 2) diff -= total;

          const isCenter = diff === 0;
          const isAbsOne = Math.abs(diff) === 1;

          // Compute 3D translation, rotation, and scaling
          let translateX = diff * 290;
          let translateZ = isCenter ? 80 : isAbsOne ? -60 : -180;
          let rotateY = diff * -22;
          let scale = isCenter ? 1.05 : isAbsOne ? 0.88 : 0.74;
          let opacity = isCenter ? 1 : isAbsOne ? 0.75 : 0.35;
          let zIndex = 30 - Math.abs(diff) * 10;

          // Responsive adjustments for mobile
          if (typeof window !== "undefined" && window.innerWidth < 640) {
            translateX = diff * 180;
            rotateY = diff * -16;
            scale = isCenter ? 1 : isAbsOne ? 0.8 : 0.5;
          }

          return (
            <div
              key={evt.id}
              onClick={() => setActiveIdx(idx)}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
              }}
              className={`absolute w-[280px] sm:w-[340px] md:w-[380px] h-[450px] sm:h-[500px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out shadow-2xl group border ${
                isCenter
                  ? "border-teal-400/60 shadow-teal-500/20 ring-1 ring-teal-400/40"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              {/* Background Image */}
              <img
                src={evt.image}
                alt={evt.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Top Tag Pill */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md border border-white/20 text-teal-300 font-semibold">
                  #{evt.tag}
                </span>

                {isCenter && (
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
                )}
              </div>

              {/* Bottom Editorial Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 flex flex-col justify-end">
                <div className="mb-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase leading-none drop-shadow-md">
                    {evt.title}
                  </h3>
                  <p className="text-xs font-mono text-teal-300 tracking-wider mt-1 uppercase font-semibold">
                    // {evt.subtitle}
                  </p>
                </div>

                {/* Divider Line */}
                <div className="w-12 h-[2px] bg-teal-400/80 my-3" />

                <p className="text-xs text-white/80 line-clamp-3 leading-relaxed font-light mb-4 drop-shadow-xs">
                  {evt.description}
                </p>

                {/* Center Card Interactive Action */}
                {isCenter ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(evt);
                    }}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-teal-400/20 hover:bg-teal-400/30 border border-teal-400/40 text-teal-200 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    <span>View Event Story</span>
                    <ArrowUpRight className="w-4 h-4 text-teal-300" />
                  </button>
                ) : (
                  <span className="text-[11px] text-white/40 font-mono tracking-wider uppercase">
                    Click to Focus
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {events.map((evt, idx) => (
          <button
            key={evt.id}
            onClick={() => setActiveIdx(idx)}
            aria-label={`Go to event ${idx + 1}`}
            className={`transition-all duration-300 cursor-pointer rounded-full ${
              idx === activeIdx
                ? "w-8 h-2 bg-teal-400 shadow-md shadow-teal-400/50"
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-zinc-950/95 border border-teal-500/30 p-6 sm:p-8 shadow-2xl text-white">
            <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-teal-300 font-semibold tracking-widest block mb-1">
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
                className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 font-mono pb-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  {selectedEvent.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  {selectedEvent.location}
                </span>
              </div>

              <p className="text-sm text-white/85 leading-relaxed font-light">
                {selectedEvent.description}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 mt-4">
                <span className="text-[11px] font-mono uppercase text-teal-300 tracking-wider block font-semibold">
                  KEY EVENT HIGHLIGHTS
                </span>
                {selectedEvent.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-2.5 rounded-full bg-teal-400 text-black text-xs font-semibold hover:bg-teal-300 transition-colors cursor-pointer"
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
