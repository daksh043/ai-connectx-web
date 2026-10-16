import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 240;
const getFrameSrc = (index: number) =>
  `/frames/frame_${String(index).padStart(6, "0")}.jpg`;

interface ScrollCanvasBackgroundProps {
  onProgressChange?: (progress: number, currentFrame: number) => void;
  overrideProgress?: number | null;
  slideOffset?: number;
}

export default function ScrollCanvasBackground({
  onProgressChange,
  overrideProgress = null,
  slideOffset = 0,
}: ScrollCanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES + 1).fill(null)
  );

  const [loadedCount, setLoadedCount] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const currentFrameRef = useRef(1);

  // Find nearest loaded frame if target is still buffering
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

  // Direct aspect-ratio-preserving canvas render (cover)
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = findClosestLoadedImage(frameIndex);
      if (!img) return;

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      const canvasWidth = Math.round(displayWidth * dpr);
      const canvasHeight = Math.round(displayHeight * dpr);

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

  // 1. Parallel Preload
  useEffect(() => {
    let isCancelled = false;

    // Load Frame 1 immediately
    const firstImg = new Image();
    firstImg.src = getFrameSrc(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[1] = firstImg;
      setLoadedCount((c) => Math.max(c, 1));
      renderFrame(1);
    };

    let loaded = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);

      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[i] = img;
        loaded++;
        setLoadedCount(loaded);

        const currentTarget = Math.round(
          1 + currentProgressRef.current * (TOTAL_FRAMES - 1)
        );
        if (Math.abs(currentTarget - i) <= 2) {
          renderFrame(currentTarget);
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
  }, [renderFrame]);

  // Sync with overrideProgress when provided (e.g. during loading slide)
  useEffect(() => {
    if (overrideProgress !== null && overrideProgress !== undefined) {
      targetProgressRef.current = overrideProgress;
    }
  }, [overrideProgress]);

  // 2. Global scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (overrideProgress !== null && overrideProgress !== undefined) return;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;

      if (maxScroll <= 0) return;

      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / maxScroll)
      );

      targetProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [overrideProgress]);

  // 3. Resilient lerp requestAnimationFrame loop
  useEffect(() => {
    let animId: number;
    let isActive = true;

    const tick = () => {
      if (!isActive) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0002) {
        currentProgressRef.current += diff * 0.12;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const frameIdx = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(1 + currentProgressRef.current * (TOTAL_FRAMES - 1)))
      );

      if (frameIdx !== currentFrameRef.current) {
        currentFrameRef.current = frameIdx;
        renderFrame(frameIdx);
        onProgressChange?.(currentProgressRef.current, frameIdx);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isActive = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [renderFrame, onProgressChange]);

  const progressPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <>
      {/* Fixed Fullscreen Background Canvas */}
      <div
        style={{
          transform: slideOffset ? `translateY(${slideOffset}px)` : "translateY(0px)",
          willChange: slideOffset ? "transform" : "auto",
        }}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#050507]"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover select-none"
        />

        {/* Cinematic Vignette & Readability Gradient Scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%] pointer-events-none" />
      </div>

      {/* Subtle Top Loading Line (auto-hides when complete) */}
      {loadedCount < TOTAL_FRAMES && (
        <div className="fixed top-0 left-0 w-full h-[2.5px] bg-white/10 z-[60] pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </>
  );
}
