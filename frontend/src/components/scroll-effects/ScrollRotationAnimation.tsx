import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RotateCw, Cpu, Brain, Sparkles, Terminal, Code2, Globe, Database, Network } from "lucide-react";

export default function ScrollRotationAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Dual rotation: Clockwise for inner, counter-clockwise for outer
  const rotateClockwise = useTransform(scrollYProgress, [0.1, 0.9], [0, 360]);
  const rotateCounter = useTransform(scrollYProgress, [0.1, 0.9], [0, -360]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.85, 1, 0.85]);

  const innerIcons = [
    { icon: <Cpu className="w-5 h-5 text-teal-300" />, label: "PyTorch" },
    { icon: <Brain className="w-5 h-5 text-cyan-300" />, label: "TensorRT" },
    { icon: <Sparkles className="w-5 h-5 text-amber-300" />, label: "Transformers" },
    { icon: <Terminal className="w-5 h-5 text-emerald-300" />, label: "CUDA" },
  ];

  const outerIcons = [
    { icon: <Code2 className="w-5 h-5 text-pink-300" />, label: "FastAPI" },
    { icon: <Globe className="w-5 h-5 text-blue-300" />, label: "React" },
    { icon: <Database className="w-5 h-5 text-orange-300" />, label: "VectorDB" },
    { icon: <Network className="w-5 h-5 text-cyan-300" />, label: "LangGraph" },
    { icon: <Cpu className="w-5 h-5 text-green-300" />, label: "ONNX" },
    { icon: <Brain className="w-5 h-5 text-yellow-300" />, label: "HuggingFace" },
  ];

  return (
    <section
      id="scroll-rotation"
      ref={containerRef}
      className="relative min-h-[170vh] w-full flex flex-col items-center justify-start z-10 select-none"
    >
      {/* Sticky Orbit Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Effect Indicator Pill */}
        <div className="absolute top-20 sm:top-24 z-30 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 font-mono text-[11px] uppercase tracking-widest backdrop-blur-md">
          <RotateCw className="w-3.5 h-3.5 text-teal-400" />
          <span>07 · DUAL CONCENTRIC SCROLL ROTATION</span>
        </div>

        <div className="text-center mb-6 z-20">
          <h3 className="text-3xl sm:text-5xl font-normal text-white tracking-tight mb-2">
            Orbiting Intelligence Matrix
          </h3>
          <p className="text-xs sm:text-sm text-white/50 font-mono">
            Scroll down to drive the multi-axis rotational transform of our core stack.
          </p>
        </div>

        {/* Orbit Visualization Container */}
        <motion.div
          style={{ scale }}
          className="relative w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] flex items-center justify-center"
        >
          {/* Static Center Badge */}
          <div className="z-20 w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
            <img
              src="/ai-connectx-logo-transparent.png"
              alt="Ai ConnectX"
              className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(45,212,191,0.65)] hover:scale-110 transition-transform"
            />
          </div>

          {/* Inner Orbital Ring */}
          <motion.div
            style={{ rotate: rotateClockwise }}
            className="absolute inset-[15%] rounded-full border border-dashed border-teal-400/30 flex items-center justify-center pointer-events-none"
          >
            {innerIcons.map((node, i) => {
              const angle = (i * 360) / innerIcons.length;
              const radius = 95; // px from center
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <div
                  key={i}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  className="absolute p-3 rounded-2xl bg-black/80 border border-teal-400/40 shadow-lg flex items-center justify-center pointer-events-auto hover:scale-125 transition-transform"
                >
                  {node.icon}
                </div>
              );
            })}
          </motion.div>

          {/* Outer Orbital Ring */}
          <motion.div
            style={{ rotate: rotateCounter }}
            className="absolute inset-0 rounded-full border border-dashed border-white/20 flex items-center justify-center pointer-events-none"
          >
            {outerIcons.map((node, i) => {
              const angle = (i * 360) / outerIcons.length;
              const radius = 180; // px from center
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <div
                  key={i}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  className="absolute p-3 rounded-2xl bg-black/80 border border-white/20 shadow-lg flex items-center justify-center pointer-events-auto hover:scale-125 transition-transform"
                >
                  {node.icon}
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
