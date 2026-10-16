import { useEffect, useState, useCallback, memo } from "react";
import ScrollCanvasBackground from "../components/zubox/ScrollCanvasBackground";
import AIConnectXNavbar from "../components/zubox/ZuboxNavbar";
import AIConnectXHero from "../components/zubox/ZuboxHero";
import ZeroSevenLoadingScreen from "../components/zubox/ZeroSevenLoadingScreen";

import TextRevealScroll from "../components/scroll-effects/TextRevealScroll";
import HorizontalScrollingSection from "../components/scroll-effects/HorizontalScrollingSection";
import AIConnectXTestimonials from "../components/zubox/AIConnectXTestimonials";
import AIConnectXEditorialTeam from "../components/zubox/AIConnectXEditorialTeam";
import AIConnectXContactSection from "../components/zubox/AIConnectXContactSection";
import AIConnectXFooter from "../components/zubox/AIConnectXFooter";

const MainSections = memo(function MainSections() {
  return (
    <>
      <main className="relative z-10 flex flex-col pb-0">
        <AIConnectXHero />
        <TextRevealScroll />
        <div className="flex flex-col space-y-16 md:space-y-28">
          <HorizontalScrollingSection />
          <AIConnectXTestimonials />
          <AIConnectXEditorialTeam />
          <AIConnectXContactSection />
        </div>
      </main>
      <AIConnectXFooter />
    </>
  );
});

export default function ClubPage() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);

  const handleProgress = useCallback((pct: number) => {
    setLoadPercent(pct);
  }, []);

  const handleComplete = useCallback(() => {
    setShowLoadingScreen(false);
    setLoadPercent(0);
  }, []);

  // Safety fallback: guarantee loading screen closes and reveals website
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setShowLoadingScreen(false);
      setLoadPercent(0);
    }, 2200);
    return () => clearTimeout(safetyTimer);
  }, []);

  // During loading:
  // 0% -> 50%: slides all the way down (0.0 -> 1.0)
  // 50% -> 100%: slides all the way back up (1.0 -> 0.0)
  const bgProgress = showLoadingScreen
    ? loadPercent <= 50
      ? loadPercent / 50
      : (100 - loadPercent) / 50
    : null;

  // Spatial translation: slides down up to 120px and returns to 0px
  const slideOffset = showLoadingScreen
    ? Math.sin((loadPercent / 100) * Math.PI) * 120
    : 0;

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && !showLoadingScreen) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, [showLoadingScreen]);

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-teal-400 selection:text-black font-sans antialiased overflow-x-clip">
      {/* 07 Loader: Transparent loading screen where the background slides all down and back again */}
      {showLoadingScreen && (
        <ZeroSevenLoadingScreen
          duration={950}
          onProgressUpdate={handleProgress}
          onComplete={handleComplete}
        />
      )}

      {/* 1. Cinematic 240-Frame Scroll Animation in the Background */}
      <ScrollCanvasBackground
        overrideProgress={bgProgress}
        slideOffset={slideOffset}
      />

      {/* 2. Fixed Top Navigation */}
      <AIConnectXNavbar onLoginTrigger={() => setShowLoadingScreen(true)} />

      {/* 3. The Interactive Scroll Animations (Isolated from loading re-renders) */}
      <MainSections />
    </div>
  );
}
