import { motion, useScroll, useTransform } from "motion/react";

export default function ScrollAtmosphereMorph() {
  const { scrollYProgress } = useScroll();

  // Direct 1:1 hardware scroll transforms without delayed spring physics
  const heroOpacity = useTransform(scrollYProgress, [0.0, 0.30, 0.44], [1, 1, 0]);
  const cylinderOpacity = useTransform(scrollYProgress, [0.32, 0.44, 0.74, 0.86], [0, 1, 1, 0]);
  const contactOpacity = useTransform(scrollYProgress, [0.76, 0.86, 1.0], [0, 1, 1]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          DYNAMIC GLOBAL ATMOSPHERE MORPH LAYER (Zero-overhead radial gradients)
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
        {/* Stage 1: HERO AURORA (Cosmic Cyan & Deep Electric Blue) */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 will-change-transform"
        >
          <div
            className="absolute -top-[15%] -left-[10%] w-[60vw] h-[60vw] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(34,211,238,0.12) 0%, rgba(0,136,255,0.05) 35%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(0,136,255,0.10) 0%, rgba(2,132,199,0.03) 40%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Stage 2: 3D CYLINDER AURORA (High-Tech Studio Spotlight directly behind Ring) */}
        <motion.div
          style={{ opacity: cylinderOpacity }}
          className="absolute inset-0 will-change-transform"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[55vw] max-w-[1200px] max-h-[750px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, rgba(1,75,170,0.12) 40%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Stage 3: TRANSMISSION HUB AURORA (Royal Indigo & Electric Violet Glare) */}
        <motion.div
          style={{ opacity: contactOpacity }}
          className="absolute inset-0 will-change-transform"
        >
          <div
            className="absolute top-[30%] left-[15%] w-[60vw] h-[60vw] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(79,70,229,0.06) 40%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(34,211,238,0.10) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)",
            }}
          />
        </motion.div>
      </div>

      {/* Top Section Progress Bar (Minimalist Header Strip) */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 pointer-events-none bg-white/[0.04]">
        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 via-blue-500 to-indigo-400 shadow-[0_0_12px_rgba(34,211,238,0.9)] will-change-transform"
        />
      </div>
    </>
  );
}
