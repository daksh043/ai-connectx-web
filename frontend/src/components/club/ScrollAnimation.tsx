import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 240;
const getFrameSrc = (index: number) =>
  `/frames/frame_${String(index).padStart(6, "0")}.png`;

export default function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store preloaded image instances
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES + 1).fill(null)
  );

  const [loadedCount, setLoadedCount] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Target and current interpolated progress (0 to 1)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const currentFrameRef = useRef(1);

  // Helper to find the closest available image if target isn't loaded yet
  const findClosestLoadedImage = useCallback((target: number): HTMLImageElement | null => {
    const imgs = imagesRef.current;
    if (imgs[target] && imgs[target]!.complete && imgs[target]!.naturalWidth > 0) {
      return imgs[target];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = target - offset;
      if (prev >= 1 && imgs[prev] && imgs[prev]!.complete && imgs[prev]!.naturalWidth > 0) {
        return imgs[prev];
      }
      const next = target + offset;
      if (next <= TOTAL_FRAMES && imgs[next] && imgs[next]!.complete && imgs[next]!.naturalWidth > 0) {
        return imgs[next];
      }
    }
    return null;
  }, []);

  // Direct canvas render
  const renderCanvasFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = findClosestLoadedImage(frameIndex);
      if (!img) return;

      const dpr = window.devicePixelRatio || 1;
      const clientWidth = window.innerWidth;
      const clientHeight = window.innerHeight;

      const canvasWidth = Math.round(clientWidth * dpr);
      const canvasHeight = Math.round(clientHeight * dpr);

      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      }

      const imgW = img.naturalWidth || 1280;
      const imgH = img.naturalHeight || 720;

      const canvasAspect = canvasWidth / canvasHeight;
      const imgAspect = imgW / imgH;

      let drawW: number;
      let drawH: number;
      let offsetX: number;
      let offsetY: number;

      if (canvasAspect > imgAspect) {
        drawW = canvasWidth;
        drawH = canvasWidth / imgAspect;
        offsetX = 0;
        offsetY = (canvasHeight - drawH) / 2;
      } else {
        drawH = canvasHeight;
        drawW = canvasHeight * imgAspect;
        offsetX = (canvasWidth - drawW) / 2;
        offsetY = 0;
      }

      ctx.fillStyle = "#050507";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    },
    [findClosestLoadedImage]
  );

  // 1. Preload images
  useEffect(() => {
    let isCancelled = false;

    // Load Frame 1 immediately
    const firstImg = new Image();
    firstImg.src = getFrameSrc(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[1] = firstImg;
      setLoadedCount((c) => Math.max(c, 1));
      renderCanvasFrame(1);
    };

    // Load all remaining frames
    let loaded = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);

      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[i] = img;
        loaded++;
        setLoadedCount(loaded);

        // If user is currently near this frame, render it
        const currentTarget = Math.round(
          1 + currentProgressRef.current * (TOTAL_FRAMES - 1)
        );
        if (Math.abs(currentTarget - i) <= 2) {
          renderCanvasFrame(currentTarget);
        }
      };

      img.onerror = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [renderCanvasFrame]);

  // 2. Scroll listener to compute scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      targetProgressRef.current = progress;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 3. Animation loop with resilient lerp (safe across React 19 StrictMode remounts)
  useEffect(() => {
    let animId: number;
    let isActive = true;

    const tick = () => {
      if (!isActive) return;

      // Lerp smoothing towards targetProgress
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0002) {
        currentProgressRef.current += diff * 0.15; // Smooth, responsive 15% step
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const frameIdx = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(1 + currentProgressRef.current * (TOTAL_FRAMES - 1)))
      );

      if (frameIdx !== currentFrameRef.current) {
        currentFrameRef.current = frameIdx;
        setCurrentFrame(frameIdx);
        renderCanvasFrame(frameIdx);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    const handleResize = () => {
      renderCanvasFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isActive = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [renderCanvasFrame]);

  const progressPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
  const scrollPercent = Math.round(scrollProgress * 100);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#050507]"
      style={{ height: "450vh" }}
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#050507]">
        <canvas
          ref={canvasRef}
          className="w-full h-full block select-none pointer-events-none"
        />

        {/* Top Loading Progress Line (auto-fades when fully loaded) */}
        {loadedCount < TOTAL_FRAMES && (
          <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10 z-50 pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-[#CEFD46] to-[#00f2fe] transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Minimal HUD: Frame Telemetry */}
        <div className="absolute top-8 left-8 right-8 flex items-center justify-between text-xs tracking-widest font-mono text-white/50 pointer-events-none z-40 select-none">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#CEFD46] animate-pulse" />
            <span className="text-white/90 font-medium">FRAME SEQUENCE</span>
            <span className="text-white/30">•</span>
            <span className="text-white font-semibold">
              {String(currentFrame).padStart(3, "0")} / {TOTAL_FRAMES}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {loadedCount < TOTAL_FRAMES && (
              <span className="text-[#CEFD46] text-[11px] font-semibold">
                LOADING {progressPercent}%
              </span>
            )}
            <div className="px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-white font-medium">
              {scrollPercent}%
            </div>
          </div>
        </div>

        {/* Scroll Guide (fades out after initial scroll) */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-xs font-mono tracking-widest pointer-events-none z-40 transition-opacity duration-300 ${
            scrollPercent > 2 ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="uppercase text-[11px] text-white/70">Scroll Down</span>
          <div className="w-5 h-8 rounded-full border border-white/40 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-[#CEFD46] animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
