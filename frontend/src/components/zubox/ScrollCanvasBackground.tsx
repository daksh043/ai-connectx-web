import { useEffect, useRef, useState, useCallback, memo } from "react";

const TOTAL_FRAMES = 240;
const getFrameSrc = (index: number) =>
  `/frames/frame_${String(index).padStart(6, "0")}.jpg`;

interface ScrollCanvasBackgroundProps {
  onProgressChange?: (progress: number, currentFrame: number) => void;
  overrideProgress?: number | null;
  slideOffset?: number;
}

function ScrollCanvasBackgroundComponent({
  onProgressChange,
  overrideProgress = null,
  slideOffset = 0,
}: ScrollCanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES + 1).fill(null)
  );

  const [loadedCount, setLoadedCount] = useState(0);
  const loadedCountRef = useRef(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const targetLiftYRef = useRef(0);
  const currentLiftYRef = useRef(0);
  const currentFrameRef = useRef(1);
  const requestedRef = useRef<Set<number>>(new Set());
  const scheduleTickRef = useRef<(() => void) | null>(null);
  const blackOverlayRef = useRef<HTMLDivElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const lastPrefetchedFrameRef = useRef(-1);
  const cachedLayoutRef = useRef<{ maxScroll: number; boundaryTop: number; winHeight: number } | null>(null);
  const scrollPendingRef = useRef(false);

  // Function to load an individual frame
  const loadSingleFrame = useCallback((frameIdx: number) => {
    if (frameIdx < 1 || frameIdx > TOTAL_FRAMES || requestedRef.current.has(frameIdx)) return;
    requestedRef.current.add(frameIdx);

    const img = new Image();
    img.src = getFrameSrc(frameIdx);

    img.onload = () => {
      imagesRef.current[frameIdx] = img;
      loadedCountRef.current++;
      const count = loadedCountRef.current;
      if (count % 30 === 0 || count === TOTAL_FRAMES) {
        setLoadedCount(count);
      }

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
      for (let offset = 0; offset <= 6; offset++) {
        const next = targetFrame + offset;
        const prev = targetFrame - offset;
        if (next <= TOTAL_FRAMES) loadSingleFrame(next);
        if (prev >= 1) loadSingleFrame(prev);
      }
    },
    [loadSingleFrame]
  );

  // Fast local search within a tight range
  const findClosestLoadedImage = useCallback(
    (target: number): HTMLImageElement | null => {
      const imgs = imagesRef.current;
      if (imgs[target]?.complete && imgs[target]!.naturalWidth > 0) {
        return imgs[target];
      }

      for (let offset = 1; offset <= 10; offset++) {
        const next = target + offset;
        if (next <= TOTAL_FRAMES && imgs[next]?.complete && imgs[next]!.naturalWidth > 0) {
          return imgs[next];
        }
        const prev = target - offset;
        if (prev >= 1 && imgs[prev]?.complete && imgs[prev]!.naturalWidth > 0) {
          return imgs[prev];
        }
      }

      const curr = currentFrameRef.current;
      if (curr >= 1 && imgs[curr]?.complete && imgs[curr]!.naturalWidth > 0) {
        return imgs[curr];
      }

      return imgs[1] || null;
    },
    []
  );

  // Direct aspect-ratio-preserving canvas render (1.0 DPR for max GPU throughput)
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const img = findClosestLoadedImage(frameIndex);
      if (!img) return;

      const displayWidth = canvas.width;
      const displayHeight = canvas.height;
      if (displayWidth === 0 || displayHeight === 0) return;

      const imgW = img.naturalWidth || 1280;
      const imgH = img.naturalHeight || 720;

      const canvasAspect = displayWidth / displayHeight;
      const imgAspect = imgW / imgH;

      let drawW: number;
      let drawH: number;
      let offsetX: number;
      let offsetY: number;

      if (canvasAspect > imgAspect) {
        drawW = displayWidth;
        drawH = displayWidth / imgAspect;
        offsetX = 0;
        offsetY = (displayHeight - drawH) / 2;
      } else {
        drawH = displayHeight;
        drawW = displayHeight * imgAspect;
        offsetX = (displayWidth - drawW) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    },
    [findClosestLoadedImage]
  );

  // Handle canvas resize cleanly
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "low";
      }
      renderFrame(currentFrameRef.current);
    }
  }, [renderFrame]);

  // 1. Staged Priority Preload with Controlled Concurrency
  useEffect(() => {
    let isCancelled = false;

    // Load Frame 1 immediately
    loadSingleFrame(1);

    // Initial sequence (frames 1–20) for fluid startup
    for (let i = 2; i <= 20; i++) {
      loadSingleFrame(i);
    }

    // Keyframes stride (every 6 frames) so user can scrub smoothly
    const keyframes: number[] = [];
    for (let i = 24; i <= TOTAL_FRAMES; i += 6) {
      keyframes.push(i);
    }

    // Remaining in-between frames
    const remaining: number[] = [];
    for (let i = 21; i <= TOTAL_FRAMES; i++) {
      if (i % 6 !== 0) remaining.push(i);
    }

    const queue = [...keyframes, ...remaining];
    let qIdx = 0;
    const CONCURRENCY = 2; // Controlled concurrency to prevent network & GPU queue starvation

    const worker = () => {
      if (isCancelled || qIdx >= queue.length) return;
      const idx = queue[qIdx++];
      if (!requestedRef.current.has(idx)) {
        const img = new Image();
        img.src = getFrameSrc(idx);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[idx] = img;
          loadedCountRef.current++;
          const count = loadedCountRef.current;
          if (count % 30 === 0 || count === TOTAL_FRAMES) {
            setLoadedCount(count);
          }
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

  // Sync with overrideProgress when provided
  useEffect(() => {
    if (overrideProgress !== null && overrideProgress !== undefined) {
      targetProgressRef.current = overrideProgress;
      const targetFrame = Math.round(1 + overrideProgress * (TOTAL_FRAMES - 1));
      prefetchAroundTarget(targetFrame);
      scheduleTickRef.current?.();
    }
  }, [overrideProgress, prefetchAroundTarget]);

  // 2. High-performance scroll tracking (rAF-throttled to eliminate layout thrashing)
  useEffect(() => {
    const updateLayoutMetrics = () => {
      // The 240-frame sequence finishes before Chronicles & Team
      const boundaryEl =
        document.getElementById("gallery") ||
        document.getElementById("chronicles") ||
        document.getElementById("cylinder") ||
        document.getElementById("team");
      const footerEl =
        document.getElementById("footer") || document.querySelector("footer");
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      let maxScroll = 0;
      let boundaryTop = 0;

      if (boundaryEl) {
        boundaryTop = boundaryEl.getBoundingClientRect().top + scrollY;
        maxScroll = Math.max(1, boundaryTop - winHeight);
      } else if (footerEl) {
        const footerTop = footerEl.getBoundingClientRect().top + scrollY;
        maxScroll = Math.max(1, footerTop - winHeight);
      } else {
        const docHeight = document.documentElement.scrollHeight;
        maxScroll = Math.max(1, docHeight - winHeight);
      }

      cachedLayoutRef.current = { maxScroll, boundaryTop, winHeight };
    };

    const processScroll = () => {
      scrollPendingRef.current = false;
      if (!cachedLayoutRef.current) {
        updateLayoutMetrics();
      }

      const metrics = cachedLayoutRef.current!;
      const scrollY = window.scrollY;
      const winHeight = metrics.winHeight || window.innerHeight;
      const maxScroll = metrics.maxScroll;

      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      targetProgressRef.current = progress;
      const targetFrame = Math.round(1 + progress * (TOTAL_FRAMES - 1));

      if (targetFrame !== lastPrefetchedFrameRef.current) {
        lastPrefetchedFrameRef.current = targetFrame;
        prefetchAroundTarget(targetFrame);
      }

      let liftY = 0;
      if (metrics.boundaryTop > 0) {
        const currentBoundaryTop = metrics.boundaryTop - scrollY;
        if (currentBoundaryTop <= winHeight) {
          liftY = Math.max(0, winHeight - currentBoundaryTop);
        }
      }

      targetLiftYRef.current = liftY;
      scheduleTickRef.current?.();
    };

    const handleScroll = () => {
      if (!scrollPendingRef.current) {
        scrollPendingRef.current = true;
        requestAnimationFrame(processScroll);
      }
    };

    const handleResize = () => {
      updateLayoutMetrics();
      resizeCanvas();
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    updateLayoutMetrics();
    resizeCanvas();
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [overrideProgress, prefetchAroundTarget, resizeCanvas]);

  // 3. Low-overhead requestAnimationFrame loop with physics lerp for silk-smooth frames & lift
  useEffect(() => {
    let animId: number;
    let isActive = true;
    let isLooping = false;

    const tick = () => {
      if (!isActive) return;

      // Smooth progress lerp for video frames
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0004) {
        currentProgressRef.current += diff * 0.35;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      // Smooth physics lerp for background lift (60-120fps silk smoothness)
      const liftDiff = targetLiftYRef.current - currentLiftYRef.current;
      if (Math.abs(liftDiff) > 0.4) {
        currentLiftYRef.current += liftDiff * 0.28;
      } else {
        currentLiftYRef.current = targetLiftYRef.current;
      }

      const activeLift = currentLiftYRef.current;

      // Hardware-accelerated translate3d on compositor thread
      if (videoLayerRef.current) {
        const totalY = (slideOffset || 0) - activeLift;
        videoLayerRef.current.style.transform = `translate3d(0, ${totalY.toFixed(1)}px, 0)`;

        // Smooth cross-dissolve: softly fade canvas opacity so there is zero hard cut edge
        const fadeOut = Math.min(1, Math.max(0, activeLift / 340));
        videoLayerRef.current.style.opacity = String((1 - fadeOut).toFixed(3));
      }

      // Smoothly update cream backing opacity on scroll
      if (blackOverlayRef.current) {
        const t = Math.min(1, Math.max(0, activeLift / 260));
        blackOverlayRef.current.style.opacity = String(t.toFixed(3));
      }

      const frameIdx = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(1 + currentProgressRef.current * (TOTAL_FRAMES - 1)))
      );

      const winH = cachedLayoutRef.current?.winHeight || window.innerHeight;
      const isCanvasVisible = activeLift < winH;

      if (frameIdx !== currentFrameRef.current && isCanvasVisible) {
        currentFrameRef.current = frameIdx;
        renderFrame(frameIdx);
        onProgressChange?.(currentProgressRef.current, frameIdx);
      }

      // Continue loop while either frame progress or lift is animating
      if (
        Math.abs(targetProgressRef.current - currentProgressRef.current) > 0.0004 ||
        Math.abs(targetLiftYRef.current - currentLiftYRef.current) > 0.4
      ) {
        animId = requestAnimationFrame(tick);
      } else {
        isLooping = false;
      }
    };

    const scheduleTick = () => {
      if (!isLooping && isActive) {
        isLooping = true;
        animId = requestAnimationFrame(tick);
      }
    };
    scheduleTickRef.current = scheduleTick;

    // Initial tick
    scheduleTick();

    return () => {
      isActive = false;
      cancelAnimationFrame(animId);
    };
  }, [renderFrame, onProgressChange, slideOffset]);

  const progressPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <>
      {/* Layer 0 (Underneath): Elegant Light Cream Backing (Revealed after 240 frames) */}
      <div
        ref={blackOverlayRef}
        style={{ opacity: 0 }}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#FAF6EE] will-change-[opacity]"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 25%, #FFFDF9 0%, #FAF6EE 55%, #F4ECE1 100%)",
          }}
        />
        {/* Subtle luminous warm ambient accents */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[55vw] max-w-[1100px] max-h-[700px] rounded-full blur-[100px] pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(1, 75, 170, 0.10) 0%, rgba(244, 63, 94, 0.06) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Layer 1 (Top): 240 Video Frames Canvas that translates UP in lockstep with Hero */}
      <div
        ref={videoLayerRef}
        style={{
          transform: slideOffset ? `translate3d(0, ${slideOffset}px, 0)` : "translate3d(0, 0px, 0)",
          willChange: "transform, opacity",
          maskImage: "linear-gradient(to bottom, black 0%, black calc(100% - 220px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black calc(100% - 220px), transparent 100%)",
        }}
        className="fixed inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden bg-[#050507]"
      >
        <div className="relative w-full h-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full block object-cover select-none will-change-transform"
          />

          {/* Cinematic Vignette & Readability Gradient Scrims (Hardware-friendly, zero composite penalties) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/65 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/15 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
        </div>
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

const ScrollCanvasBackground = memo(ScrollCanvasBackgroundComponent);
export default ScrollCanvasBackground;
