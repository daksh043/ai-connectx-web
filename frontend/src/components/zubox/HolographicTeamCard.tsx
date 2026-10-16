import { useState, useRef, type MouseEvent } from "react";
import { ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  dept: string;
  image: string;
  bio: string;
  contributions: string[];
  skills: string[];
  badge?: string;
  codename?: string;
  stats?: { label: string; value: string }[];
}

interface HolographicTeamCardProps {
  member: TeamMember;
  index: number;
  onSelect: (m: TeamMember) => void;
  isScrollFocused?: boolean;
}

export default function HolographicTeamCard({
  member,
  index,
  onSelect,
  isScrollFocused = false,
}: HolographicTeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for fluid physics damping
  const springX = useSpring(mouseX, { stiffness: 220, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const glareX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current && cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    const rect = rectRef.current;
    if (!rect) return;
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    setIsHovered(false);
    setIsImageHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const isCardActive = isScrollFocused || isHovered;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(member)}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={`group relative flex flex-col justify-between p-6 lg:p-7 transition-all duration-400 cursor-pointer overflow-hidden rounded-3xl select-none border backdrop-blur-md ${
        isCardActive
          ? "bg-black/40 border-cyan-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(34,211,238,0.2),inset_0_1px_1px_rgba(255,255,255,0.22)]"
          : "bg-black/30 border-white/[0.14] hover:bg-black/40 hover:border-cyan-400/40 shadow-[0_15px_35px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.18)]"
      }`}
    >
      {/* ─── Frosted Glass Individual Card Highlight Shimmer ─── */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl ${
          isCardActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <div className="absolute inset-0 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] rounded-3xl" />
      </div>

      {/* 3D Motion Wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transform: isCardActive ? "translateZ(15px)" : "translateZ(0px)",
          transition: "transform 0.4s ease-out",
        }}
        className="w-full h-full flex flex-col justify-between transform-gpu will-change-transform"
      >
        {/* Dynamic Specular Glass Glare */}
        <motion.div
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle 260px at ${gx} ${gy}, rgba(255, 255, 255, 0.14), transparent 70%)`
            ),
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30 rounded-2xl"
        />

        {/* Top Header Status & Soundwave */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="flex items-center justify-between mb-4 z-20 text-[10px] font-mono"
        >
          <div className="flex items-center gap-1.5 text-white/80 group-hover:text-cyan-200">
            <span className={`w-1.5 h-1.5 rounded-full ${isCardActive ? "bg-cyan-300 animate-ping" : "bg-white/40"}`} />
            <span className="tracking-widest font-bold">
              {member.codename || `UNIT-0${index + 1}`}
            </span>
            {isScrollFocused && !isHovered && (
              <span className="ml-1 px-1.5 py-0.2 rounded bg-white/10 text-cyan-200 text-[8px] tracking-wider border border-white/20">
                SYNCED
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Equalizer mini soundwave */}
            <div className="flex items-end gap-[2px] h-3 w-3">
              <span className={`w-[2px] h-full rounded-full transition-colors ${isCardActive ? "bg-cyan-300 animate-pulse" : "bg-white/40"}`} />
              <span className={`w-[2px] h-2/3 rounded-full transition-colors ${isCardActive ? "bg-cyan-300 animate-pulse [animation-delay:150ms]" : "bg-white/40"}`} />
              <span className={`w-[2px] h-4/5 rounded-full transition-colors ${isCardActive ? "bg-cyan-300 animate-pulse [animation-delay:300ms]" : "bg-white/40"}`} />
            </div>
            {/* Small Blue Status Dot */}
            <span className={`w-1.5 h-1.5 rounded-full transition-all ${isCardActive ? "bg-cyan-300 shadow-[0_0_8px_#22d3ee]" : "bg-white/30"}`} />
          </div>
        </div>

        {/* ─── Transparent Frosted Glass Portrait Image Frame ─── */}
        <div
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
          style={{
            transform: isImageHovered
              ? "translateZ(55px) scale(1.03)"
              : isCardActive
              ? "translateZ(26px) scale(1.01)"
              : "translateZ(18px) scale(1)",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
          }}
          className={`relative w-full aspect-[3/4] mb-5 overflow-hidden rounded-2xl bg-black/35 backdrop-blur-xs border transition-all duration-400 ${
            isImageHovered
              ? "border-cyan-300 shadow-[0_15px_40px_rgba(34,211,238,0.35),inset_0_0_15px_rgba(255,255,255,0.2)] ring-1 ring-cyan-300/50"
              : isCardActive
              ? "border-white/30 shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
              : "border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
          }`}
        >

          {/* Cybernetic Laser Scanline Animation */}
          <div
            className={`absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_#22d3ee] pointer-events-none z-20 transition-opacity duration-300 ${
              isCardActive ? "opacity-100 animate-scanline" : "opacity-0"
            }`}
          />

          {/* Member Photo with Smooth Enlarge on Hover */}
          <img
            src={member.image}
            alt={member.name}
            style={{
              transform: isImageHovered
                ? "scale(1.24)"
                : isCardActive
                ? "scale(1.06)"
                : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease",
            }}
            className={`w-full h-full object-cover will-change-transform ${
              isImageHovered
                ? "grayscale-0 contrast-105 brightness-110"
                : isCardActive
                ? "grayscale-0 contrast-100 brightness-105"
                : "grayscale contrast-110 brightness-95"
            }`}
          />

          {/* Transparent soft gradient vignetting (preserves background visibility) */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${
              isImageHovered ? "opacity-20" : isCardActive ? "opacity-35" : "opacity-55"
            }`}
          />

          {/* Holographic Badge Floating in 3D */}
          {member.badge && (
            <div
              style={{ transform: "translateZ(35px)" }}
              className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-black/40 backdrop-blur-md text-cyan-200 border border-white/20 shadow-[0_0_12px_rgba(0,0,0,0.5)] flex items-center gap-1.5 pointer-events-none"
            >
              <ShieldCheck className="w-3 h-3 text-cyan-300" />
              <span>{member.badge}</span>
            </div>
          )}

          {/* Hover Floating CTA Button */}
          <div
            style={{ transform: "translateZ(45px)" }}
            className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1 shadow-[0_0_20px_rgba(34,211,238,0.7)] transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <span>VIEW DOSSIER</span>
            <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
          </div>
        </div>

        {/* ─── Typography & Info ─── */}
        <div style={{ transform: "translateZ(25px)" }} className="flex flex-col justify-end">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`text-sm sm:text-base font-bold tracking-wider uppercase transition-colors drop-shadow-sm line-clamp-1 ${isCardActive ? "text-white" : "text-white/90"}`}>
              {member.name}
            </h3>
            <ArrowUpRight className={`w-4 h-4 transition-all shrink-0 ml-1 ${isCardActive ? "text-cyan-300 translate-x-0.5 -translate-y-0.5" : "text-white/40"}`} />
          </div>

          <p className="text-[11px] font-mono tracking-widest text-cyan-300/90 uppercase mb-1.5 font-medium flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>{member.role}</span>
          </p>

          <p className="text-[11px] text-white/60 font-mono line-clamp-1">
            {member.dept}
          </p>

          {/* Quick Skill Chips preview on hover */}
          <div className="flex flex-wrap gap-1 mt-3">
            {member.skills.slice(0, 2).map((skill, sIdx) => (
              <span
                key={sIdx}
                className={`text-[9px] font-mono px-2 py-0.5 rounded-full border transition-colors ${
                  isCardActive
                    ? "bg-white/10 border-white/20 text-cyan-200"
                    : "bg-white/[0.04] border-white/10 text-white/60"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Decorative Corner Small Dots */}
      <div className={`absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full transition-all ${isCardActive ? "bg-cyan-300 shadow-[0_0_8px_#22d3ee]" : "bg-white/20"}`} />
      <div className={`absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full transition-all ${isCardActive ? "bg-cyan-300 shadow-[0_0_8px_#22d3ee]" : "bg-white/20"}`} />
    </motion.div>
  );
}
