import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Layers } from "lucide-react";

export default function Spiral3DScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
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
        {/* Ambient Subtle Depth Glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none" />

        {/* Top Header Group with Surrounding Dark Blur Aura */}
        <div className="absolute top-8 sm:top-10 z-20 flex flex-col items-center text-center pointer-events-none px-4">
          <div
            className="absolute -inset-x-12 -inset-y-8 -z-10 pointer-events-none rounded-3xl backdrop-blur-md"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.58) 0%, rgba(0, 0, 0, 0.2) 60%, transparent 85%)",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            }}
          />
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 font-semibold uppercase mb-1">
            02 / SPATIAL HELIX ARCHITECTURE
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-1">
            Spatial 3D Gallery
          </h3>
          <p className="text-xs sm:text-sm text-white/50 font-mono">
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
                  className="absolute w-[280px] sm:w-[380px] h-[180px] sm:h-[240px] rounded-2xl overflow-hidden border border-white/20 bg-zinc-950/90 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group cursor-pointer hover:border-teal-400/60 transition-colors"
                >
                  {/* Card Background Photograph */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Scrim for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 pointer-events-none" />

                  {/* Top Minimal Index */}
                  <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md">
                    <span className="text-[10px] font-mono text-cyan-300 font-bold tracking-wider">
                      0{card.id}
                    </span>
                  </div>

                  {/* Bottom Bold Category & Title (Matching Reference: BRANDING / FAHEY) */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col items-center text-center z-10">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/70 mb-1">
                      {card.category}
                    </span>
                    <h4 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-white drop-shadow-md">
                      {card.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll Prompt Bottom Indicator */}
        <div className="absolute bottom-6 z-20 text-[11px] font-mono text-teal-300/60 uppercase tracking-widest flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
          <span>Scroll down to advance 3D spiral arms</span>
        </div>
      </div>
    </section>
  );
}
