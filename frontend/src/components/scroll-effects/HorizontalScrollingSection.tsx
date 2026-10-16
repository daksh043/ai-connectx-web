import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MoveRight, Star } from "lucide-react";

export default function HorizontalScrollingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Vertical scroll translates horizontally along X axis
  const x = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "-68%"]);

  const projects = [
    {
      id: "p1",
      tag: "AUTONOMOUS VISION",
      title: "NeuroNav Spatial SLAM",
      summary: "Real-time edge obstacle avoidance and 3D visual odometry on NVIDIA Jetson Orin.",
      image: "/gallery/robotics.jpg",
      stars: "240 stars",
      tech: ["PyTorch", "CUDA", "ROS2", "SLAM"],
    },
    {
      id: "p2",
      tag: "GENERATIVE AI",
      title: "GaussianSplat Studio",
      summary: "Instant 3D scene reconstruction from high-resolution spatial video captures within 90 seconds.",
      image: "/gallery/hackathon.jpg",
      stars: "185 stars",
      tech: ["3DGS", "CUDA", "WebGL", "TypeScript"],
    },
    {
      id: "p3",
      tag: "BIO-COMPUTING",
      title: "MediScan Multi-Agent",
      summary: "Federated multimodal medical diagnosis assistant assisting radiological workflows.",
      image: "/gallery/workshop.jpg",
      stars: "310 stars",
      tech: ["Vision-LLM", "DICOM", "FastAPI", "Docker"],
    },
    {
      id: "p4",
      tag: "COMPETITIVE AI",
      title: "Genesis Trophy Engine",
      summary: "First prize winning solution at National AI Buildathon with autonomous multi-agent task execution.",
      image: "/gallery/trophy.jpg",
      stars: "420 stars",
      tech: ["LangGraph", "DeepSeek R1", "VectorDB"],
    },
    {
      id: "p5",
      tag: "HUMANOID ROBOTICS",
      title: "RoboConnect Cybernetic",
      summary: "Low-cost bipedal stabilization model trained entirely in synthetic physics simulation.",
      image: "/ai_club_robot.jpg",
      stars: "512 stars",
      tech: ["MuJoCo", "Reinforcement Learning", "C++"],
    },
  ];

  return (
    <section
      id="horizontal-scroll"
      ref={containerRef}
      className="relative min-h-[280vh] w-full z-10 select-none"
    >
      {/* Pinned Sticky Rail Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-6 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 max-w-7xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 font-mono text-[11px] uppercase tracking-widest mb-3 backdrop-blur-md">
              <MoveRight className="w-3.5 h-3.5 text-teal-400" />
              <span>08 · STICKY HORIZONTAL SCROLL RAIL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight">
              Featured Project Showcase
            </h2>
          </div>
          <div className="text-xs font-mono text-white/50 flex items-center gap-2">
            <span>Scroll vertically to pan horizontally</span>
            <span className="text-teal-400">→</span>
          </div>
        </div>

        {/* Horizontal Track */}
        <div className="w-full overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 shrink-0 py-4">
            {projects.map((item) => (
              <div
                key={item.id}
                className="w-[320px] sm:w-[420px] rounded-3xl overflow-hidden bg-zinc-950/85 backdrop-blur-xl border border-white/15 hover:border-teal-400/50 shadow-2xl transition-all duration-300 group flex flex-col justify-between shrink-0"
              >
                {/* Image Header */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-teal-300 uppercase tracking-wider">
                    {item.tag}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/80">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{item.stars}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2 group-hover:text-teal-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed mb-6">
                    {item.summary}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {item.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-[10px] text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
