import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Layers, X } from "lucide-react";

export default function Spiral3DScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    id: number;
    category: string;
    title: string;
    image: string;
    desc?: string;
  } | null>(null);

  // Toggle media-modal-open to hide the taskbar/navbar when photo preview is open
  useEffect(() => {
    if (selectedPhoto) {
      document.body.classList.add("media-modal-open");
    } else {
      document.body.classList.remove("media-modal-open");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("media-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth continuous 3D rotation along the spiral helix as the user scrolls
  const rotateY = useTransform(scrollYProgress, [0.15, 0.85], [0, -300]);
  const translateY = useTransform(scrollYProgress, [0.15, 0.85], [40, -40]);

  // Framer University Spiral 3D Cards with centered vertical helical distribution
  const spiralCards = [
    {
      id: 1,
      category: "BRANDING",
      title: "FAHEY",
      image: "/images/feature_1.jpg",
      angle: 0,
      yOffset: 180,
      radius: 400,
    },
    {
      id: 2,
      category: "DEVELOPMENT",
      title: "REYNOLDS",
      image: "/gallery/hackathon.jpg",
      angle: 50,
      yOffset: 120,
      radius: 400,
    },
    {
      id: 3,
      category: "AI CONNECTX",
      title: "GENESIS",
      image: "/gallery/trophy.jpg",
      angle: 100,
      yOffset: 60,
      radius: 400,
    },
    {
      id: 4,
      category: "INTELLIGENCE",
      title: "WISOKY",
      image: "/images/feature_2.jpg",
      angle: 150,
      yOffset: 0,
      radius: 400,
    },
    {
      id: 5,
      category: "INNOVATION",
      title: "TRANTOW",
      image: "/gallery/workshop.jpg",
      angle: 200,
      yOffset: -60,
      radius: 400,
    },
    {
      id: 6,
      category: "ROBOTICS",
      title: "BERGSTROM",
      image: "/ai_club_robot.jpg",
      angle: 250,
      yOffset: -120,
      radius: 400,
    },
    {
      id: 7,
      category: "COMMUNITY",
      title: "UAI CONNECT",
      image: "/images/feature_3.jpg",
      angle: 300,
      yOffset: -180,
      radius: 400,
    },
  ];

  return (
    <section
      id="spiral-3d"
      ref={containerRef}
      className="relative min-h-[260vh] w-full flex flex-col items-center justify-start z-10 select-none"
    >
      {/* Sticky 3D Viewport Anchor */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 [perspective:1400px]">
        {/* Ambient Royal Blue + Cyber Cyan Depth Glow Matrix */}
        <div
          className="absolute -left-20 top-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-45"
          style={{
            background: "radial-gradient(circle, rgba(65, 105, 225, 0.45) 0%, rgba(30, 64, 175, 0.20) 45%, transparent 70%)",
          }}
        />
        <div
          className="absolute -right-20 bottom-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.35) 0%, rgba(2, 132, 199, 0.15) 45%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(65, 105, 225, 0.35) 0%, rgba(34, 211, 238, 0.15) 40%, transparent 70%)",
          }}
        />

        {/* 3D Spatial Cylindrical Coordinate Orbit Rings (Behind rotating helix) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-30 select-none">
          <div className="w-[500px] h-[500px] rounded-full border border-cyan-400/25 [transform:rotateX(75deg)]" />
          <div className="absolute w-[750px] h-[750px] rounded-full border border-blue-500/20 [transform:rotateX(75deg)] border-dashed" />
          <div className="absolute w-[1000px] h-[1000px] rounded-full border border-cyan-300/15 [transform:rotateX(75deg)]" />
        </div>

        {/* Top Header Group with Surrounding Dark Blur Aura */}
        <div className="absolute top-8 sm:top-10 z-20 flex flex-col items-center text-center pointer-events-none px-4">
          <div
            className="absolute -inset-x-12 -inset-y-8 -z-10 pointer-events-none rounded-3xl backdrop-blur-md"
            style={{
              background: "radial-gradient(ellipse at center, rgba(3, 3, 6, 0.75) 0%, rgba(3, 3, 6, 0.3) 60%, transparent 85%)",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            }}
          />
          <span className="text-xs sm:text-sm font-['Outfit',sans-serif] tracking-[0.22em] bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent font-bold uppercase mb-1">
            02 / SPATIAL HELIX ARCHITECTURE
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-1">
            Spatial 3D Gallery
          </h3>
          <p className="text-xs sm:text-sm text-white/50 font-['Outfit',sans-serif]">
            Scroll to rotate student works across the spatial dimension.
          </p>
        </div>

        {/* 3D Spiral Helix Container: Perfectly centered with generous vertical clearance */}
        <div className="relative w-full max-w-5xl h-[460px] sm:h-[520px] flex items-center justify-center [perspective:1400px] mt-16 sm:mt-20">
          <motion.div
            style={{
              rotateY,
              y: translateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-[320px] sm:w-[420px] h-[200px] sm:h-[260px] flex items-center justify-center"
          >
            {spiralCards.map((card) => {
              return (
                <div
                  key={card.id}
                  style={{
                    transform: `rotateY(${card.angle}deg) translateZ(${card.radius}px) translateY(${card.yOffset}px)`,
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => setSelectedPhoto(card)}
                  className="absolute w-[280px] sm:w-[380px] h-[180px] sm:h-[240px] rounded-2xl overflow-hidden border border-blue-500/30 bg-[#05060e]/95 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group cursor-pointer hover:border-cyan-400/80 hover:shadow-[0_0_35px_rgba(34,211,238,0.45),0_0_70px_rgba(30,64,218,0.3)] transition-all duration-300"
                >
                  {/* Card Background Photograph */}
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Scrim for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#0e0716]/40 to-black/10 pointer-events-none" />

                  {/* Top Minimal Index */}
                  <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-black/80 border border-blue-500/40 backdrop-blur-md shadow-[0_0_12px_rgba(30,64,218,0.3)]">
                    <span className="text-[10px] font-mono text-cyan-300 font-bold tracking-wider">
                      0{card.id}
                    </span>
                  </div>

                  {/* Bottom Bold Category & Title */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col items-center text-center z-10">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 mb-1 font-semibold">
                      {card.category}
                    </span>
                    <h4 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-white drop-shadow-md group-hover:text-cyan-100 transition-colors">
                      {card.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll Prompt Bottom Indicator */}
        <div className="absolute bottom-6 z-20 text-[11px] font-mono text-cyan-300/80 uppercase tracking-widest flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Scroll down to advance 3D spiral arms</span>
        </div>
      </div>

      {/* ─── FULL PHOTO / ARTIFACT MODAL (TASKBAR HIDDEN) ─── */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            data-media-modal="true"
            className="media-modal-active fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-2xl"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-[#060712] border border-cyan-500/40 shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_80px_rgba(34,211,238,0.25)] flex flex-col"
            >
              {/* Media Image Showcase */}
              <div className="relative w-full h-[340px] sm:h-[420px] bg-black overflow-hidden flex items-center justify-center">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060712] via-transparent to-black/40 pointer-events-none" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-cyan-500/30 transition-all cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5 text-cyan-300" />
                </button>

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 border border-cyan-500/40 backdrop-blur-md">
                  <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                    ARTIFACT #{selectedPhoto.id}
                  </span>
                </div>
              </div>

              {/* Media Metadata Dossier */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#060712]">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                    CATEGORY / {selectedPhoto.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light mt-1 max-w-lg">
                    Full-resolution student research artifact rendered inside high-dimensional spatial cylindrical coordinates.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:brightness-110 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-[0_4px_20px_rgba(34,211,238,0.35)]"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
