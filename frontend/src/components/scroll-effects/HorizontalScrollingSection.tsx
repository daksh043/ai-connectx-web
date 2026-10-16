import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Terminal } from "lucide-react";

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
      tag: "EXPERT MASTERCLASS",
      title: "AI Engineering × Agentic Systems",
      summary: "Masterclass by Mr. Dipan Mehta at Universal AI University, exploring LLMs, RAG, and production agent loops.",
      image: "/gallery/workshop.jpg",
      status: "Flagship Session",
      tech: ["Agentic AI", "RAG", "LLM Workflows", "Universal AI University"],
    },
    {
      id: "p2",
      tag: "LEADERSHIP & PATRONAGE",
      title: "Patron Guidance & Industry Liaison",
      summary: "Curated by Patron Mr. Pranav More, establishing direct conduits between UAI students and corporate executives.",
      image: "/gallery/robotics.jpg",
      status: "Active Initiative",
      tech: ["Corporate Mentorship", "Executive Network", "Startup Conduits", "UAI Network"],
    },
    {
      id: "p3",
      tag: "EXPERIENTIAL LEARNING",
      title: "Live Industry Projects & Internships",
      summary: "Connecting students with live enterprise deliverables, shadow engineering, and corporate mentorship.",
      image: "/gallery/hackathon.jpg",
      status: "Ongoing Intake",
      tech: ["Live Projects", "Internships", "Company Visits", "Applied Engineering"],
    },
    {
      id: "p4",
      tag: "STUDENT INNOVATION",
      title: "UAI AI Innovators Collective",
      summary: "A future-ready student collective building breakthrough hackathon prototypes and collaborative systems.",
      image: "/gallery/trophy.jpg",
      status: "Community Hub",
      tech: ["Hackathons", "Alumni Connect", "Collaborative Labs", "Workshops"],
    },
    {
      id: "p5",
      tag: "FRONTIER TECH",
      title: "From Answering to Acting: Agentic AI",
      summary: "Hands-on explorations into autonomous multi-agent task execution, tool use, and deterministic dispatching.",
      image: "/ai_club_robot.jpg",
      status: "Research Track",
      tech: ["Multi-Agent", "Autonomous Workflows", "Tool Execution", "AI Systems"],
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
        {/* Section Header with Surrounding Dark Blur Aura */}
        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 max-w-7xl">
          <div
            className="absolute -inset-x-12 -inset-y-8 -z-10 pointer-events-none rounded-3xl backdrop-blur-md"
            style={{
              background: "radial-gradient(ellipse at 25% 50%, rgba(0, 0, 0, 0.58) 0%, rgba(0, 0, 0, 0.2) 55%, transparent 85%)",
              maskImage: "radial-gradient(ellipse at 25% 50%, black 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at 25% 50%, black 30%, transparent 80%)",
            }}
          />
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 font-semibold uppercase block mb-2">
              02 / INNOVATION LABS
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight">
              Featured Projects
            </h2>
          </div>

          {/* Unified Signature CTA Button */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/ai-connectx-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-cyan-400 to-[#0088ff] text-slate-950 hover:brightness-110 shadow-[0_4px_20px_rgba(0,229,255,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shrink-0"
            >
              <span>Explore Masterclasses</span>
              <Terminal className="w-4 h-4 text-slate-950 stroke-[2]" />
            </a>
          </div>
        </div>

        {/* Horizontal Track */}
        <div className="w-full overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 shrink-0 py-4">
            {projects.map((item) => (
              <div
                key={item.id}
                className="w-[320px] sm:w-[420px] rounded-3xl overflow-hidden bg-slate-950/85 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 shadow-2xl transition-all duration-300 group flex flex-col justify-between shrink-0"
              >
                {/* Image Header */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-cyan-300 uppercase tracking-wider">
                    {item.tag}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-cyan-300">
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    <span>{item.status}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed mb-6">
                    {item.summary}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {item.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-[10px] text-slate-200"
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
