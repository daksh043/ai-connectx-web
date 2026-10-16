import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 240;
const getFrameSrc = (index: number) =>
  `/frames/frame_${String(index).padStart(6, "0")}.png`;

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
  const requestedRef = useRef<Set<number>>(new Set());

  // Function to load and pre-decode an individual frame
  const loadSingleFrame = useCallback((frameIdx: number) => {
    if (frameIdx < 1 || frameIdx > TOTAL_FRAMES || requestedRef.current.has(frameIdx)) return;
    requestedRef.current.add(frameIdx);

    const img = new Image();
    img.src = getFrameSrc(frameIdx);

    img.onload = async () => {
      try {
        if ("decode" in img) {
          await img.decode();
        }
      } catch {
        // Continue if decode throws (unsupported or aborted)
      }
      imagesRef.current[frameIdx] = img;
      setLoadedCount((c) => c + 1);

      // If this is the current target frame, render immediately
      const currentTarget = Math.round(
        1 + currentProgressRef.current * (TOTAL_FRAMES - 1)
      );
      if (Math.abs(currentTarget - frameIdx) <= 1) {
        renderFrame(currentTarget);
      }
    };
  }, []);

  // Pre-fetch frames surrounding the current scroll target
  const prefetchAroundTarget = useCallback(
    (targetFrame: number) => {
      // Prioritize immediate next and previous frames
      for (let offset = 0; offset <= 10; offset++) {
        const next = targetFrame + offset;
        const prev = targetFrame - offset;
        if (next <= TOTAL_FRAMES) loadSingleFrame(next);
        if (prev >= 1) loadSingleFrame(prev);
      }
    },
    [loadSingleFrame]
  );

  // Radiating local search: checks closest neighbor frames within a tight range
  // without jumping to far-away distant frames
  const findClosestLoadedImage = useCallback(
    (target: number): HTMLImageElement | null => {
      const imgs = imagesRef.current;
      if (imgs[target]?.complete && imgs[target]!.naturalWidth > 0) {
        return imgs[target];
      }

      // Radiate outward within a local neighborhood of ±16 frames
      for (let offset = 1; offset <= 16; offset++) {
        const next = target + offset;
        if (next <= TOTAL_FRAMES && imgs[next]?.complete && imgs[next]!.naturalWidth > 0) {
          return imgs[next];
        }
        const prev = target - offset;
        if (prev >= 1 && imgs[prev]?.complete && imgs[prev]!.naturalWidth > 0) {
          return imgs[prev];
        }
      }

      // Hold current frame if within range, avoiding jarring backwards jumps
      const curr = currentFrameRef.current;
      if (curr >= 1 && imgs[curr]?.complete && imgs[curr]!.naturalWidth > 0) {
        return imgs[curr];
      }

      // Fallback to frame 1 if initial loading
      return imgs[1] || null;
    },
    []
  );

  // Direct aspect-ratio-preserving canvas render (cover)
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = findClosestLoadedImage(frameIndex);
      if (!img) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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

      // High quality smooth image interpolation without black background flash
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    },
    [findClosestLoadedImage]
  );

  // 1. Phased Priority Preload with Controlled Concurrency
  useEffect(() => {
    let isCancelled = false;

    // Load Frame 1 immediately
    loadSingleFrame(1);

    // Initial sequence (frames 1–20) for fluid startup
    for (let i = 2; i <= 20; i++) {
      loadSingleFrame(i);
    }

    // Keyframes stride across the entire 240 frames
    const keyframes: number[] = [];
    for (let i = 24; i <= TOTAL_FRAMES; i += 4) {
      keyframes.push(i);
    }

    // Remaining in-between frames
    const remaining: number[] = [];
    for (let i = 21; i <= TOTAL_FRAMES; i++) {
      if (i % 4 !== 0) remaining.push(i);
    }

    const queue = [...keyframes, ...remaining];
    let qIdx = 0;
    const CONCURRENCY = 6;

    const worker = () => {
      if (isCancelled || qIdx >= queue.length) return;
      const idx = queue[qIdx++];
      if (!requestedRef.current.has(idx)) {
        const img = new Image();
        img.src = getFrameSrc(idx);
        img.onload = async () => {
          if (isCancelled) return;
          try {
            if ("decode" in img) await img.decode();
          } catch {}
          imagesRef.current[idx] = img;
          setLoadedCount((c) => c + 1);
          worker();
        };
        img.onerror = () => {
          if (isCancelled) return;
          worker();
        };
      } else {
        worker();
      }
    };

    for (let w = 0; w < CONCURRENCY; w++) {
      worker();
    }

    return () => {
      isCancelled = true;
    };
  }, [loadSingleFrame]);

  // Sync with overrideProgress when provided (e.g. during loading slide)
  useEffect(() => {
    if (overrideProgress !== null && overrideProgress !== undefined) {
      targetProgressRef.current = overrideProgress;
      const targetFrame = Math.round(1 + overrideProgress * (TOTAL_FRAMES - 1));
      prefetchAroundTarget(targetFrame);
    }
  }, [overrideProgress, prefetchAroundTarget]);

  // 2. Scroll progress tracking: frames end cleanly right above the footer
  useEffect(() => {
    const handleScroll = () => {
      if (overrideProgress !== null && overrideProgress !== undefined) return;

      const footerEl = document.getElementById("footer") || document.querySelector("footer");
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      let maxScroll = 0;

      if (footerEl) {
        const footerTop = footerEl.getBoundingClientRect().top + scrollY;
        // Frames lock in at 1.0 (Frame 240) above the footer
        maxScroll = Math.max(1, footerTop - winHeight);
      } else {
        const docHeight = document.documentElement.scrollHeight;
        maxScroll = Math.max(1, docHeight - winHeight);
      }

      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      targetProgressRef.current = progress;
      const targetFrame = Math.round(1 + progress * (TOTAL_FRAMES - 1));
      prefetchAroundTarget(targetFrame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [overrideProgress, prefetchAroundTarget]);

  // 3. Fluid high-responsiveness lerp requestAnimationFrame loop
  useEffect(() => {
    let animId: number;
    let isActive = true;

    const tick = () => {
      if (!isActive) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        // Fast, buttery lerp (0.24) that follows the scroll gesture closely
        currentProgressRef.current += diff * 0.24;
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

        {/* Cinematic Vignette & Readability Gradient Scrims (Naturally blended with background) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_45%,_rgba(0,0,0,0.45)_100%] pointer-events-none" />
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
