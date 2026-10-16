import { useEffect, useRef } from "react";

/**
 * CustomCursor - Premium Electric-Blue Animated Cursor for AI Connect X
 *
 * Features:
 * - Fluid delayed-follow electric-blue radial aura glow (lerp ~0.12)
 * - Crisp, high-precision central neon dot with core electric illumination
 * - Dynamic interactive expansion over buttons, links, inputs, and clickable elements
 * - Expanding hydrodynamic blue ripple waves on click
 * - Zero React re-render overhead via requestAnimationFrame & direct 3D transform updates
 * - Auto-disabled on touch/coarse pointers and respects prefers-reduced-motion
 * - Non-blocking pointer-events: none with high z-index
 */
export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Accessibility & Device Detection
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0);

    if (isTouch) {
      return; // Leave native touch behavior untouched
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 2. Cursor State Coordinates
    const target = { x: -200, y: -200 };
    const dot = { x: -200, y: -200 };
    const glow = { x: -200, y: -200 };

    let isVisible = false;
    let isHovered = false;
    let isClicking = false;
    let animFrameId: number;

    const GLOW_LERP = prefersReducedMotion ? 1 : 0.12;
    const DOT_LERP = prefersReducedMotion ? 1 : 0.75;

    // 3. Ultra-Fast Mouse Event Listeners (Zero selector overhead in mousemove)
    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
        }
      }
    };

    // Only inspect DOM tree when crossing element boundaries (saves >95% CPU)
    const handleMouseOver = (e: MouseEvent) => {
      const element = e.target as HTMLElement | null;
      if (element) {
        const interactive = element.closest(
          'a, button, input, textarea, select, [role="button"], [role="link"], [role="tab"], [role="menuitem"], [role="switch"], [role="checkbox"], [data-cursor-interactive], .cursor-pointer, [tabindex]:not([tabindex="-1"]), summary, label, [onclick]'
        );
        isHovered = Boolean(interactive);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isClicking = true;
      spawnClickRipple(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      isClicking = false;
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
      }
    };

    // 4. Click Ripple Generator
    const spawnClickRipple = (x: number, y: number) => {
      if (!rippleLayerRef.current) return;

      const ripple = document.createElement("div");
      ripple.className = "cursor-click-ripple";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      rippleLayerRef.current.appendChild(ripple);

      // Remove ripple after animation completes (500ms)
      setTimeout(() => {
        ripple.remove();
      }, 500);
    };

    // 5. High-Performance Render Loop (120 FPS capable, zero React state re-renders)
    const render = () => {
      // Lerp calculations
      glow.x += (target.x - glow.x) * GLOW_LERP;
      glow.y += (target.y - glow.y) * GLOW_LERP;

      dot.x += (target.x - dot.x) * DOT_LERP;
      dot.y += (target.y - dot.y) * DOT_LERP;

      if (glowRef.current) {
        // Base glow size: 210px. When hovering: scale to ~1.35x. When clicking: scale to ~1.15x.
        const glowScale = isHovered ? 1.35 : isClicking ? 1.15 : 1.0;
        const glowOpacity = isHovered ? 0.95 : 0.75;

        glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0) translate(-50%, -50%) scale(${glowScale})`;
        glowRef.current.style.opacity = `${glowOpacity}`;
      }

      if (dotRef.current) {
        const dotScale = isHovered ? 1.35 : isClicking ? 0.8 : 1.0;
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      if (ringRef.current) {
        ringRef.current.style.opacity = isHovered ? "1" : "0";
        ringRef.current.style.transform = isHovered ? "scale(1)" : "scale(0.5)";
      }

      animFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden transition-opacity duration-300 opacity-0 select-none"
      aria-hidden="true"
    >
      {/* ─── 1. Main Smooth Trailing Glow (Electric Blue Radial Gradient) ─── */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[210px] h-[210px] rounded-full pointer-events-none will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(22, 139, 255, 0.28) 0%, rgba(86, 184, 255, 0.16) 38%, rgba(22, 139, 255, 0.05) 68%, transparent 80%)",
          filter: "blur(14px)",
          transition:
            "opacity 0.25s ease-out, transform 0.08s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* ─── 2. Interactive Outer Ring Highlight (Appears on Hover) ─── */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-8 h-8 rounded-full pointer-events-none flex items-center justify-center will-change-transform"
        style={{
          transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Subtle electric cyan target ring on hover */}
        <div
          ref={ringRef}
          className="absolute inset-0 rounded-full border border-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-all duration-200 pointer-events-none opacity-0 scale-50"
        />

        {/* Crisp Center Dot with Electric Core */}
        <div
          className="w-2 h-2 rounded-full relative"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #ffffff 0%, #56B8FF 55%, #168BFF 100%)",
            boxShadow:
              "0 0 8px #168BFF, 0 0 16px rgba(86, 184, 255, 0.8), 0 0 24px rgba(22, 139, 255, 0.4)",
          }}
        >
          {/* Micro pulsing electric halo ring */}
          <div
            className="absolute -inset-1 rounded-full border border-sky-300/40 opacity-70 animate-ping [animation-duration:3s]"
            style={{ pointerEvents: "none" }}
          />
        </div>
      </div>

      {/* ─── 3. Dynamic Click Ripple Layer ─── */}
      <div ref={rippleLayerRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
}
