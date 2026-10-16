import { ArrowUp } from "lucide-react";

export default function ClubFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="relative pt-20 pb-12 px-4 sm:px-8 bg-[#121315] text-white border-t border-[#2B2D33] overflow-hidden bg-ai-dots-dark select-none"
    >
      <div className="max-w-[1600px] mx-auto">
        
        {/* ─── Centerpiece: Giant Halftone Lime Capsule Badge (Page 18 of PDF) ─── */}
        <div className="relative w-full max-w-5xl mx-auto my-12 rounded-[50px] sm:rounded-[80px] bg-[#CEFD46] p-8 sm:p-16 lg:p-20 overflow-hidden shadow-[0_0_60px_rgba(206,253,70,0.3)] border-4 border-black/10">
          
          {/* Halftone / Dot Grid pattern inside lime pill */}
          <div className="absolute inset-0 bg-ai-dots-lime opacity-40 pointer-events-none" />

          {/* Giant Outlined Cutout Letters: "AI CLUB" (Page 18) */}
          <div className="relative z-10 flex items-center justify-center text-center">
            <span
              className="font-black text-6xl sm:text-9xl md:text-[160px] lg:text-[210px] tracking-tight font-display text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)] leading-none select-none uppercase opacity-95"
              style={{
                WebkitTextStroke: "4px white",
                color: "#CEFD46",
              }}
            >
              AI CLUB
            </span>
          </div>

          {/* Centered Overlay Headline from Page 18: "Where Ideas Spark and vision ignites" */}
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl text-black tracking-tight text-center max-w-2xl drop-shadow-sm">
              Where Ideas Spark and vision ignites
            </h3>
          </div>

          {/* "TOP ↑" Button positioned inside/bottom-right of badge as in Page 18 */}
          <div className="absolute bottom-6 right-8 sm:bottom-10 sm:right-12 z-30">
            <button
              onClick={scrollToTop}
              className="group flex flex-col items-center justify-center text-black font-mono font-black text-xs sm:text-sm tracking-wider uppercase transition-transform hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-[#CEFD46] flex items-center justify-center mb-1 shadow-lg group-hover:bg-zinc-900 transition-colors">
                <ArrowUp className="w-5 h-5 stroke-[3] group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="font-display font-black">TOP</span>
            </button>
          </div>
        </div>

        {/* ─── Bottom Copyright & Links Row (Page 18) ─── */}
        <div className="pt-10 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-400">
          {/* Left Copyright */}
          <div>
            © 2024 AI Club - VIT Bhopal
          </div>

          {/* Center Social Links */}
          <div className="flex items-center gap-6 text-zinc-300">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#CEFD46] transition-colors"
            >
              Linkedin
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#CEFD46] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#CEFD46] transition-colors"
            >
              Github
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#CEFD46] transition-colors"
            >
              Discord
            </a>
          </div>

          {/* Right Credit */}
          <div className="text-zinc-400">
            Developed by <span className="text-[#CEFD46] font-bold">Web Team ’24</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
