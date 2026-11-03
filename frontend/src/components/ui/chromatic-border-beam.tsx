import React, { useId } from "react";

export interface ChromaticBorderBeamProps {
  children: React.ReactNode;
  className?: string;
  duration?: number; // rotation duration in seconds (default: 8.5)
  hoverDuration?: number; // rotation duration when hovered (default: 14)
  borderRadius?: number; // corner radius in px (default: 28)
  strokeWidth?: number; // stroke thickness in px (default: 3.5)
  beamLength?: number; // length of traveling beam in px (default: 340)
  hoverScale?: number; // scale multiplier on hover (default: 1.05)
}

export function ChromaticBorderBeam({
  children,
  className = "",
  duration = 8.5,
  hoverDuration = 14,
  borderRadius = 28,
  strokeWidth = 3.5,
  beamLength = 340,
  hoverScale = 1.05,
}: ChromaticBorderBeamProps) {
  const id = useId().replace(/:/g, "");
  const scopeClass = `chromatic-flow-${id}`;

  return (
    <>
      <style>{`
        @keyframes perimeter-travel-${id} {
          0% {
            offset-distance: 0%;
            -webkit-offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
            -webkit-offset-distance: 100%;
          }
        }

        .${scopeClass} {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center center;
          border-radius: ${borderRadius}px;
        }

        .${scopeClass}:hover {
          transform: scale(${hoverScale});
        }

        /* Dense chromatic pigment ribbon */
        .${scopeClass} .chromatic-ribbon {
          background: linear-gradient(
            to left,
            #facc15 0%,
            #fb923c 14%,
            #f43f5e 30%,
            #ec4899 48%,
            #a855f7 68%,
            #3b82f6 84%,
            rgba(59, 130, 246, 0) 100%
          );
        }

        /* Shared motion path settings for uniform perimeter speed */
        .${scopeClass} .path-tracker {
          offset-path: inset(0 round ${borderRadius}px);
          -webkit-offset-path: inset(0 round ${borderRadius}px);
          offset-anchor: 100% 50%;
          offset-rotate: auto;
          animation: perimeter-travel-${id} ${duration}s linear infinite;
          will-change: offset-distance;
          pointer-events: none;
        }

        .${scopeClass}:hover .path-tracker {
          animation-duration: ${hoverDuration}s;
        }

        /* 1. Deep Atmospheric Outward Glow */
        .${scopeClass} .bloom-deep {
          position: absolute;
          width: ${beamLength}px;
          height: 90px;
          border-radius: 45px;
          filter: blur(28px) saturate(2.6) brightness(1.95);
          opacity: 0.88;
          z-index: 1;
        }

        /* 2. Tight Concentrated Core Glow (High Density) */
        .${scopeClass} .bloom-tight {
          position: absolute;
          width: ${Math.round(beamLength * 0.72)}px;
          height: 48px;
          border-radius: 24px;
          filter: blur(13px) saturate(2.4) brightness(2.2);
          opacity: 0.95;
          z-index: 2;
        }

        .${scopeClass}:hover .bloom-deep {
          opacity: 1;
          filter: blur(34px) saturate(2.8) brightness(2.1);
        }

        .${scopeClass}:hover .bloom-tight {
          opacity: 1;
          filter: blur(15px) saturate(2.6) brightness(2.3);
        }

        /* 3. Sharp High-Density Perimeter Stroke (3.5px) */
        .${scopeClass} .stroke-mask-wrap {
          position: absolute;
          inset: 0;
          border-radius: ${borderRadius}px;
          padding: ${strokeWidth}px;
          pointer-events: none;
          z-index: 25;
          overflow: hidden;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
        }

        .${scopeClass} .stroke-element {
          position: absolute;
          width: ${beamLength}px;
          height: 120px;
          border-radius: 60px;
        }

        /* 4. Dark subtle hairline boundary */
        .${scopeClass} .hairline-boundary {
          position: absolute;
          inset: 0;
          border-radius: ${borderRadius}px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          pointer-events: none;
          z-index: 20;
        }
      `}</style>

      <div className={`relative ${scopeClass} ${className}`}>
        {/* Tier 1: Deep atmospheric dynamic bloom */}
        <div className="bloom-deep chromatic-ribbon path-tracker" aria-hidden="true" />

        {/* Tier 2: Tight concentrated high-density core bloom */}
        <div className="bloom-tight chromatic-ribbon path-tracker" aria-hidden="true" />

        {/* Tier 3: Sharp high-density perimeter stroke */}
        <div className="stroke-mask-wrap" aria-hidden="true">
          <div className="stroke-element chromatic-ribbon path-tracker" />
        </div>

        {/* Tier 4: Dark subtle hairline boundary */}
        <div className="hairline-boundary" aria-hidden="true" />

        {/* Inner Content Card Body */}
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
