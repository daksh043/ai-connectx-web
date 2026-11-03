import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScrollContext } from "./lenis-context";
import "lenis/dist/lenis.css";

export { useLenis } from "./lenis-context";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with lerp ~0.08 and gentle multipliers for reduced sensitivity
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.75, // Reduced from 1.0 for softer, less twitchy wheel scroll
      touchMultiplier: 0.9,  // Reduced from 1.5 to prevent hyper-sensitive trackpad/touch scrolls
      autoRaf: false, // GSAP ticker drives the RAF loop
    });

    lenisRef.current = lenis;
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // 1. Sync Lenis scroll events to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Drive Lenis updates directly from GSAP's ticker (seconds * 1000 -> ms)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    // 3. Prevent sudden jumps on lag/tab focus
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      if ((window as unknown as { lenis?: Lenis }).lenis === lenis) {
        delete (window as unknown as { lenis?: Lenis }).lenis;
      }
    };
  }, []);

  // Handle route and hash changes with smooth scroll
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        const timeout = setTimeout(() => {
          lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.2 });
        }, 120);
        return () => clearTimeout(timeout);
      }
    } else {
      lenis.scrollTo(0, { immediate: true });
    }

    // Refresh ScrollTrigger calculations after DOM updates
    ScrollTrigger.refresh();
  }, [location.pathname, location.hash]);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

