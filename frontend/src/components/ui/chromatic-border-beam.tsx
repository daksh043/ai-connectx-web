import React, { useId } from "react";

export interface ChromaticBorderBeamProps {
  children: React.ReactNode;
  className?: string;
  duration?: number; // rotation duration in seconds (default: 8.5)
  hoverDuration?: number; // rotation duration when hovered (default: 13.5)
  borderRadius?: number; // corner radius in px (default: 28)
  strokeWidth?: number; // stroke thickness in px (default: 2.5)
  bloomBlur?: number; // outward glow blur in px (default: 22)
  bloomSpread?: number; // how far outside the card the glow extends in px (default: 15)
  hoverScale?: number; // scale multiplier on hover (default: 1.05)
}

export function ChromaticBorderBeam({
  children,
  className = "",
  duration = 8.5,
  hoverDuration = 13.5,
  borderRadius = 28,
  strokeWidth = 2.5,
  bloomBlur = 22,
  bloomSpread = 15,
  hoverScale = 1.05,
}: ChromaticBorderBeamProps) {
  const id = useId().replace(/:/g, "");
  const beamClass = `chromatic-beam-${id}`;

  return (
    <>
      <style>{`
        @property --beam-angle-${id} {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: true;
        }

        @keyframes beam-spin-${id} {
          0% {
            --beam-angle-${id}: 0deg;
          }
          100% {
            --beam-angle-${id}: 360deg;
          }
        }

        .${beamClass} {
          --chromatic-gradient: conic-gradient(
            from var(--beam-angle-${id}),
            transparent 0deg,
            transparent 235deg,
            rgba(6, 182, 212, 0.45) 260deg,
            rgba(59, 130, 246, 0.85) 282deg,
            rgba(139, 92, 246, 0.95) 305deg,
            rgba(236, 72, 153, 1) 325deg,
            rgba(249, 115, 22, 1) 345deg,
            rgba(251, 191, 36, 1) 357deg,
            transparent 360deg
          );
          animation: beam-spin-${id} ${duration}s linear infinite;
          transform-origin: center center;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .${beamClass}:hover {
          animation-duration: ${hoverDuration}s;
          transform: scale(${hoverScale});
        }

        /* 1. Dynamic Outward Radiant Bloom (Moves with traveling color) */
        .${beamClass} .beam-bloom {
          position: absolute;
          inset: -${bloomSpread}px;
          border-radius: ${borderRadius + bloomSpread}px;
          background: var(--chromatic-gradient);
          filter: blur(${bloomBlur}px) saturate(2) brightness(1.75);
          opacity: 0.92;
          pointer-events: none;
          z-index: 0;
          transition: filter 0.4s ease, opacity 0.4s ease;
        }

        .${beamClass}:hover .beam-bloom {
          opacity: 1;
          filter: blur(${bloomBlur + 6}px) saturate(2.3) brightness(2);
        }

        /* 2. Sharp Traveling Border Stroke (Crisp Perimeter) */
        .${beamClass} .beam-stroke {
          position: absolute;
          inset: 0;
          border-radius: ${borderRadius}px;
          padding: ${strokeWidth}px;
          background: var(--chromatic-gradient);
          pointer-events: none;
          z-index: 25;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
        }

        /* 3. Subtle Dark Hairline Frame (Clean dark outline where beam is absent) */
        .${beamClass} .beam-hairline {
          position: absolute;
          inset: 0;
          border-radius: ${borderRadius}px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          pointer-events: none;
          z-index: 20;
        }
      `}</style>

      <div
        className={`relative ${beamClass} ${className}`}
        style={{
          borderRadius: `${borderRadius}px`,
        }}
      >
        {/* Outward dynamic colored bloom */}
        <div className="beam-bloom" aria-hidden="true" />

        {/* Sharp traveling chromatic stroke */}
        <div className="beam-stroke" aria-hidden="true" />

        {/* Dark subtle hairline boundary */}
        <div className="beam-hairline" aria-hidden="true" />

        {/* Main Content Body */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            borderRadius: `${borderRadius}px`,
            zIndex: 10,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default ChromaticBorderBeam;
