import { ArrowDown } from "lucide-react";

interface FloatingScrollBadgeProps {
  targetId?: string;
  onClick?: () => void;
  className?: string;
  dark?: boolean;
}

export default function FloatingScrollBadge({
  targetId = "conclave",
  onClick,
  className = "",
  dark = true,
}: FloatingScrollBadgeProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to explore"
      className={`group relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 transition-transform hover:scale-105 active:scale-95 cursor-pointer select-none focus:outline-none ${className}`}
    >
      {/* Outer Rotating SVG Typography Badge */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-spin-slow pointer-events-none"
      >
        <path
          id="scrollBadgePath"
          d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          fill="none"
        />
        <text
          className={`text-[9.5px] font-mono font-bold tracking-[3.8px] uppercase ${
            dark ? "fill-zinc-300 group-hover:fill-white" : "fill-zinc-800 group-hover:fill-black"
          }`}
        >
          <textPath href="#scrollBadgePath" startOffset="0%">
            • SCROLL TO EXPLORE • SCROLL TO EXPLORE
          </textPath>
        </text>
      </svg>

      {/* Inner Neon Lime Disc with Down Arrow */}
      <div className="absolute inset-0 m-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#CEFD46] text-black flex items-center justify-center shadow-lg group-hover:bg-[#d6ff4d] group-hover:shadow-[0_0_20px_rgba(206,253,70,0.6)] transition-all">
        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] transition-transform group-hover:translate-y-0.5" />
      </div>
    </button>
  );
}
