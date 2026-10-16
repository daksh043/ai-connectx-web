import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function AIConnectXHero() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-16 px-6 lg:px-16 max-w-7xl mx-auto z-10 select-none"
    >
      {/* Main Hero Typography & Animated 4K Logo (Aligned Left with Futuristic Visuals) */}
      <div className="my-auto py-8 relative flex flex-col items-start w-full text-left">
        {/* Ambient Chromatic Glow Field */}
        <div className="absolute -top-16 -left-16 w-[360px] sm:w-[560px] h-[360px] sm:h-[560px] bg-gradient-to-tr from-emerald-500/20 via-cyan-400/25 to-blue-600/25 rounded-full blur-[110px] -z-10 pointer-events-none animate-aurora-spin" />
        <div className="absolute top-1/4 left-1/4 w-[260px] h-[260px] bg-cyan-500/20 rounded-full blur-[90px] -z-10 pointer-events-none animate-glow-pulse" />

        {/* Left-Aligned Clean Logo & Typographic Headline */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 md:gap-10">
          {/* Clean Logo without any effects */}
          <div className="shrink-0">
            <img
              src="/ai-connectx-logo-transparent.png"
              alt="Ai ConnectX Official Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain"
            />
          </div>

          {/* High-Impact Animated Typographic Headline */}
          <div className="relative font-serif">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] flex items-center select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              {/* "Ai" in Elegant Italic Cyan */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="italic text-cyan-300 mr-2 sm:mr-3 drop-shadow-[0_0_45px_rgba(34,211,238,0.85)] filter"
              >
                Ai
              </motion.span>

              {/* "Connect" in Bold Royal Blue */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="text-[#0088ff] drop-shadow-[0_0_50px_rgba(0,136,255,0.85)] mr-0.5 filter"
              >
                Connect
              </motion.span>

              {/* "X" in Bold Cyan */}
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="text-cyan-300 drop-shadow-[0_0_60px_rgba(34,211,238,0.95)] filter"
              >
                X
              </motion.span>
            </h1>

            {/* Sleek High-Tech Accent Bar */}
            <div className="relative mt-3 sm:mt-4 h-1 w-32 sm:w-48 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2.5 h-2.5 rounded-full bg-cyan-300 blur-[1px] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 2-Column Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-6 border-t border-white/10">
        {/* Left Narrative Subtitle */}
        <div className="md:col-span-7 lg:col-span-7">
          <p className="text-white/85 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl drop-shadow-sm">
            A student-led initiative focused on bridging the gap between UAI students
            and the Artificial Intelligence industry through live projects, internships,
            mentorship, and applied innovation.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-teal-300/80 font-mono">
            <span>TALENT.</span>
            <span>•</span>
            <span>TECHNOLOGY.</span>
            <span>•</span>
            <span>INDUSTRY.</span>
            <span>•</span>
            <span>GROW BEYOND CLASSROOM.</span>
          </div>
        </div>

        {/* Right CTA Links */}
        <div className="md:col-span-5 lg:col-span-5 flex flex-wrap md:justify-end items-center gap-4">
          <button
            onClick={() => handleScrollTo("text-reveal")}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-teal-400 hover:bg-teal-300 text-black text-sm font-semibold tracking-wide transition-all shadow-lg shadow-teal-500/20 hover:scale-[1.02] cursor-pointer"
          >
            <span>Explore Mission &amp; Overview</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => handleScrollTo("spiral-3d")}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black/40 hover:bg-white/10 border border-white/20 text-white text-sm font-medium tracking-wide transition-all cursor-pointer backdrop-blur-md"
          >
            <span>3D Spiral Helix</span>
          </button>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <button
          onClick={() => handleScrollTo("text-reveal")}
          aria-label="Scroll down"
          className="p-1 cursor-pointer"
        >
          <ChevronDown className="w-5 h-5 text-white/60 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
