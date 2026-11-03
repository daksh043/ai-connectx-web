import { useEffect, useState, useCallback, memo } from "react";
import ScrollCanvasBackground from "../components/zubox/ScrollCanvasBackground";
import AIConnectXNavbar from "../components/zubox/ZuboxNavbar";
import AIConnectXHero from "../components/zubox/ZuboxHero";
import ZeroSevenLoadingScreen from "../components/zubox/ZeroSevenLoadingScreen";

import TextRevealScroll from "../components/scroll-effects/TextRevealScroll";
import AIConnectXCylinderSection from "../components/zubox/AIConnectXCylinderSection";
import AIConnectX3DGallery from "../components/zubox/AIConnectX3DGallery";
import AIConnectXContactSection from "../components/zubox/AIConnectXContactSection";
import AIConnectXKilnFooter from "../components/zubox/AIConnectXKilnFooter";
import ScrollAtmosphereMorph from "../components/zubox/ScrollAtmosphereMorph";

const MainSections = memo(function MainSections() {
  return (
    <>
      <main className="relative z-10 flex flex-col pb-0">
        <AIConnectXHero />
        <TextRevealScroll />
        <AIConnectX3DGallery />
        <AIConnectXCylinderSection />
        <AIConnectXContactSection />
      </main>
      <AIConnectXKilnFooter />
    </>
  );
});

export default function ClubPage() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(() => {
    // Show loading screen only on initial landing, avoid annoying repeat delays
    return !sessionStorage.getItem("aiconnectx_loaded");
  });

  const handleComplete = useCallback(() => {
    setShowLoadingScreen(false);
    sessionStorage.setItem("aiconnectx_loaded", "true");
  }, []);

  // Safety fallback: guarantee loading screen closes and reveals website
  useEffect(() => {
    if (!showLoadingScreen) return;
    const safetyTimer = setTimeout(() => {
      setShowLoadingScreen(false);
      sessionStorage.setItem("aiconnectx_loaded", "true");
    }, 1800);
    return () => clearTimeout(safetyTimer);
  }, [showLoadingScreen]);

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
    <div className="relative min-h-screen w-full max-w-full bg-[#050507] text-white selection:bg-teal-400 selection:text-black font-sans antialiased overflow-x-clip">
      {/* 07 Loader: Smooth branded entrance */}
      {showLoadingScreen && (
        <ZeroSevenLoadingScreen
          duration={900}
          onComplete={handleComplete}
        />
      )}

      {/* 1. Cinematic 240-Frame Scroll Animation in the Background */}
      <ScrollCanvasBackground />

      {/* 2. Full-Page Dynamic Section Atmosphere & Journey Tracker HUD */}
      <ScrollAtmosphereMorph />

      {/* 3. Fixed Top Navigation */}
      <AIConnectXNavbar onLoginTrigger={() => setShowLoadingScreen(true)} />

      {/* 4. The Interactive Scroll Animations (Isolated from loading re-renders) */}
      <MainSections />
    </div>
  );
}
