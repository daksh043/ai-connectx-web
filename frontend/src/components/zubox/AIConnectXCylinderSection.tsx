import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import KinetixCylinder16 from "./KinetixCylinder16";


export default function AIConnectXCylinderSection() {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  // Fade-in driven by live geometry unless reduced motion is active (always opacity 1)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      el.style.opacity = "1";
      el.style.pointerEvents = "";
      return;
    }

    const section = el.parentElement?.parentElement as HTMLElement | null;
    if (!section) return;

    let last = -1;

    const update = () => {
      const vh = window.innerHeight;
      // Fade-in: 0 when the sticky stage's top is at the viewport bottom,
      // 1 once it reaches the viewport top (pinned).
      const stageTop = el.getBoundingClientRect().top;
      const inP = Math.min(1, Math.max(0, (vh - stageTop) / vh));
      // Keep fully visible without fading out on scroll exit
      const op = Math.round(inP * 1000) / 1000;
      if (op !== last) {
        last = op;
        el.style.opacity = String(op);
        el.style.pointerEvents = op < 0.05 ? "none" : "";
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="team"
      className={`relative z-30 w-full bg-transparent select-none pointer-events-none ${
        prefersReducedMotion ? "min-h-screen min-h-[100dvh]" : "min-h-[185vh]"
      }`}
    >
      <span id="cylinder" className="sr-only" />
      {/* ─── Cylinder Stage: scrolls in joined with the Hero canvas lift ─── */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <div
          ref={stageRef}
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          className="relative flex h-full w-full flex-col items-center justify-center will-change-[opacity] overflow-hidden"
        >
          {/* Unified 3D Cylinder Matrix */}
          <div className="flex h-full w-full items-center justify-center">
            <KinetixCylinder16 fullscreen={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
