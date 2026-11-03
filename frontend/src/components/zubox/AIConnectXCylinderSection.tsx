import { useEffect, useRef } from "react";
import KinetixCylinder16 from "./KinetixCylinder16";


export default function AIConnectXCylinderSection() {
  const stageRef = useRef<HTMLDivElement>(null);

  // Fade-in / fade-out driven by the stage's own live geometry, computed directly
  // in the scroll handler (no rAF dependency): opacity ramps 0→1 across the entry
  // glide (stage top: viewport bottom → viewport top, i.e. pinned) and back to 0
  // across the section's final scroll span — a friendly materialize-in / dissolve-out.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
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
  }, []);

  return (
    <section
      id="team"
      className="relative z-30 w-full min-h-[185vh] bg-transparent select-none pointer-events-none"
    >
      <span id="cylinder" className="sr-only" />
      {/* ─── Cylinder Stage: scrolls in joined with the Hero canvas lift ─── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          ref={stageRef}
          style={{ opacity: 0 }}
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
