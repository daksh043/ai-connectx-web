import { useEffect, useRef } from "react";
import SoffitGradientCanvas from "../components/zubox/SoffitGradientCanvas";
import "./ShowcasePage.css";

export default function ShowcasePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const STEP_MS = 45;
    const FROM_Y = 14;
    const TENSION = 220;
    const FRICTION = 26;
    const MASS = 1;
    const PRECISION = 0.01;
    const SUBSTEP = 1 / 240;

    const root = document.documentElement;
    root.classList.add("lk-js");

    const container = containerRef.current;
    if (!container) return;

    const nodes = Array.from(container.querySelectorAll<HTMLElement>("[data-rise]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let generation = 0;

    const rest = (el: HTMLElement) => {
      el.style.transform = "";
      el.style.opacity = "1";
      el.style.willChange = "";
    };

    const rise = (el: HTMLElement, delayMs: number, gen: number) => {
      el.style.opacity = "0";
      el.style.transform = `translate3d(0, ${FROM_Y}px, 0)`;
      el.style.willChange = "transform, opacity";

      if (reduced) {
        window.setTimeout(() => {
          if (gen === generation) rest(el);
        }, delayMs);
        return;
      }

      let x = FROM_Y;
      let v = 0;
      let last: number | null = null;

      const frame = (now: number) => {
        if (gen !== generation) return;
        if (last === null) last = now;

        const dt = Math.min((now - last) / 1000, 0.064);
        last = now;

        const steps = Math.max(1, Math.ceil(dt / SUBSTEP));
        const h = dt / steps;
        for (let i = 0; i < steps; i++) {
          const a = (-TENSION * x - FRICTION * v) / MASS;
          v += a * h;
          x += v * h;
        }

        const p = 1 - x / FROM_Y;
        el.style.transform = `translate3d(0, ${x.toFixed(3)}px, 0)`;
        el.style.opacity = String(Math.max(0, Math.min(1, p)));

        if (Math.abs(x) < PRECISION && Math.abs(v) < PRECISION) {
          return rest(el);
        }
        requestAnimationFrame(frame);
      };

      window.setTimeout(() => {
        if (gen === generation) requestAnimationFrame(frame);
      }, delayMs);
    };

    const play = () => {
      const gen = ++generation;
      nodes.forEach((el) => {
        const order = Number(el.dataset.rise) || 0;
        rise(el, order * STEP_MS, gen);
      });
    };

    play();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "r" || e.key === "R") play();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      root.classList.remove("lk-js");
    };
  }, []);

  return (
    <div ref={containerRef} className="lk-stage font-['Outfit']">
      {/* Background WebGL2 Soffit Gradient asset */}
      <div className="lk-bg absolute inset-0 pointer-events-none z-0">
        <SoffitGradientCanvas
          className="w-full h-full block object-cover"
          enableEvents={false}
        />
      </div>

      <div className="sc">
        <header className="sc-nav" data-rise="0">
          <nav className="sc-navlinks">
            <span className="sc-pill">Features</span>
            <span className="sc-pill">Pricing</span>
            <span className="sc-pill">Solutions</span>
          </nav>

          <span className="sc-brand">Creative Agency</span>

          <span className="sc-pill sc-pill-dark cursor-pointer">
            Pioneering motion excellence
            <svg
              className="sc-arrow"
              viewBox="0 0 20 14.7279"
              fill="none"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6.36396C0.447715 6.36396 0 6.81168 0 7.36396C0 7.91625 0.447715 8.36396 1 8.36396V7.36396V6.36396ZM19.7071 8.07107C20.0976 7.68054 20.0976 7.04738 19.7071 6.65685L13.3431 0.292893C12.9526 -0.097631 12.3195 -0.097631 11.9289 0.292893C11.5384 0.683418 11.5384 1.31658 11.9289 1.70711L17.5858 7.36396L11.9289 13.0208C11.5384 13.4113 11.5384 14.0445 11.9289 14.435C12.3195 14.8256 12.9526 14.8256 13.3431 14.435L19.7071 8.07107ZM1 7.36396V8.36396H19V7.36396V6.36396H1V7.36396Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </header>

        {/* The window plate where Soffit shines through */}
        <div className="sc-plate">
          <h1 className="sc-wordmark" data-rise="1">
            <span>O</span>
            <span>N</span>
            <span>D</span>
            <span>A</span>
          </h1>
        </div>

        <div className="sc-bottom">
          <div className="sc-lead">
            <p className="sc-para" data-rise="2">
              Step into a world where ideas are crafted into visual symphonies, and
              where your brand’s story is woven into an unforgettable tapestry of
              design excellence.
            </p>
            <div className="sc-cta" data-rise="3">
              <a className="sc-btn sc-btn-solid" href="#join">
                Get tickets
              </a>
              <a className="sc-btn sc-btn-ghost" href="#explore">
                Explore event
              </a>
            </div>
          </div>

          <div className="sc-card sc-card-stat" data-rise="4">
            <p className="sc-cardtitle">Studio.Design</p>
            <div className="sc-statblock">
              <p className="sc-figure">12k</p>
              <p className="sc-statfoot">Visual evolution</p>
            </div>
          </div>

          <div className="sc-card sc-card-tags" data-rise="5">
            <p className="sc-cardtitle">
              Crafting timeless impressions where beyond limits
            </p>
            <div className="sc-tags">
              <span className="sc-pill sc-pill-chip">Product</span>
              <span className="sc-pill sc-pill-chip">Pioneering motion</span>
              <span className="sc-pill sc-pill-chip">Bringing your ideas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
