import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
  useReducedMotion,
} from "framer-motion";
import {
  SkipForward,
  Code2,
  CheckCircle2,
  Sliders,
  ArrowUpRight,
  Terminal,
} from "lucide-react";

// ============================================================================
// 1. PURE MATHEMATICAL CORE: sceneFromExpansion & reelPose + UNIT TESTS
// ============================================================================

export const NUM_SLOTS = 16;
export const SLOT_STEP = 360 / NUM_SLOTS; // 22.5 degrees per card
export const TOTAL_LIBRARY_REELS = 48; // 48 virtual reels recycled across 16 DOM slots

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const clamp = (v: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, v));
export const easeOutCubic = (t: number): number =>
  1 - Math.pow(1 - clamp(t, 0, 1), 3);

/**
 * Normalizes any angle in degrees into the [-180, 180) range.
 * 0 deg = far center of the cylinder
 * ±180 deg = nearest the camera (back of the ring behind the viewer)
 */
export function normalizeDeg(deg: number): number {
  return ((((deg + 180) % 360) + 360) % 360) - 180;
}

export interface SceneParameters {
  expansion: number;
  radius: number;
  tilt: number;
  roll: number;
  perspective: number;
  cardScale: number;
}

/**
 * Computes interpolated scene parameters purely from expansion (0 to 1).
 * At expansion = 0: radius 460, tilt -22°, roll -20°, perspective 1000px, scale 0.52
 * At expansion = 1: radius 1800, tilt 0°, roll 0°, perspective 450px, scale 2.3
 */
export function sceneFromExpansion(expansion: number): SceneParameters {
  const e = clamp(expansion, 0, 1);
  return {
    expansion: e,
    radius: lerp(460, 1800, e),
    tilt: 0,
    roll: 0,
    perspective: lerp(1000, 450, e),
    cardScale: lerp(0.52, 2.3, e),
  };
}

export interface PoseResult {
  x: number;
  y: number;
  z: number;
  yaw: number;
  scale: number;
  appear: number;
  behindCamera: boolean;
}

/**
 * ONE POSE FUNCTION:
 * Pure function `reelPose(angle, formation, scene)` that returns:
 * `{ x, y, z, yaw, scale, appear, behindCamera }`
 *
 * Formulas required by spec:
 *   x = -sin(a) * radius
 *   z = -cos(a) * radius
 *   yaw = a
 */
export function reelPose(
  angle: number,
  formation: number,
  scene: Partial<SceneParameters>
): PoseResult {
  const f = clamp(formation, 0, 1);
  const radius = scene?.radius ?? 460;
  const baseScale = scene?.cardScale ?? 0.52;
  const perspective = scene?.perspective ?? 1000;
  const expansion = scene?.expansion ?? 0;

  // Normalize target angle to [-180, 180)
  const normAngle = normalizeDeg(angle);

  // Convert normalized angle into a positive travel distance from front stack (180 deg)
  const travelFromFront = (180 - normAngle) % 360;
  const dealOrderProgress = travelFromFront / 360;

  // Staggered deal window
  const windowWidth = 0.32;
  const startF = dealOrderProgress * (1 - windowWidth);

  const isAnchorFrontCard = travelFromFront < 0.001;
  const rawCardProgress = isAnchorFrontCard
    ? 1
    : clamp((f - startF) / windowWidth, 0, 1);

  const easedDeal = easeOutCubic(rawCardProgress);

  // During formation, card swings out from the front stack (180°) along cylinder arc
  const currentTravel = travelFromFront * easedDeal;
  const effectiveAngle =
    f >= 1 ? normAngle : normalizeDeg(180 - currentTravel);

  // Cylindrical trigonometry
  const rad = (effectiveAngle * Math.PI) / 180;
  const x = -Math.sin(rad) * radius + 0;
  const y = 0;
  const z = -Math.cos(rad) * radius + 0;
  const yaw = effectiveAngle + 0;

  // Waiting stack visibility
  const appear = isAnchorFrontCard
    ? 1
    : f >= 1
    ? 1
    : clamp(rawCardProgress * 2.8, 0, 1);

  const scale = baseScale;

  // Behind camera detection
  const behindCamera =
    expansion > 0.45 &&
    (z > perspective - 60 || Math.abs(effectiveAngle) > 128);

  return {
    x,
    y,
    z,
    yaw,
    scale,
    appear,
    behindCamera,
  };
}

export interface UnitTestResult {
  name: string;
  formula: string;
  actual: string;
  expected: string;
  passed: boolean;
}

/**
 * Embedded Unit Test Suite for `reelPose` and `sceneFromExpansion`
 */
export function runReelPoseUnitTests(): UnitTestResult[] {
  const results: UnitTestResult[] = [];
  const approxEqual = (a: number, b: number, eps = 1e-2) =>
    Math.abs(a - b) <= eps;

  const assert = (
    name: string,
    formula: string,
    actual: unknown,
    expected: unknown,
    passCondition: boolean
  ) => {
    results.push({
      name,
      formula,
      actual:
        typeof actual === "object" ? JSON.stringify(actual) : String(actual),
      expected:
        typeof expected === "object"
          ? JSON.stringify(expected)
          : String(expected),
      passed: Boolean(passCondition),
    });
  };

  // Test 1: Far center card (0°, formation=1, exp=0)
  const scene0 = sceneFromExpansion(0);
  const poseFar0 = reelPose(0, 1, scene0);
  assert(
    "Far Center Card (0°, formation=1, exp=0)",
    "x = -sin(0)*460 = 0, z = -cos(0)*460 = -460, yaw = 0",
    { x: Math.round(poseFar0.x), z: Math.round(poseFar0.z), yaw: poseFar0.yaw },
    { x: 0, z: -460, yaw: 0 },
    approxEqual(poseFar0.x, 0) &&
      approxEqual(poseFar0.z, -460) &&
      approxEqual(poseFar0.yaw, 0)
  );

  // Test 2: Front card nearest camera (180°, formation=0, exp=0)
  const poseFrontStart = reelPose(180, 0, scene0);
  assert(
    "Front Anchor Card at Start (180°, formation=0)",
    "x = 0, z = +460, appear = 1 (visible single front card)",
    {
      x: Math.round(poseFrontStart.x),
      z: Math.round(poseFrontStart.z),
      appear: poseFrontStart.appear,
    },
    { x: 0, z: 460, appear: 1 },
    approxEqual(poseFrontStart.x, 0) &&
      approxEqual(poseFrontStart.z, 460) &&
      poseFrontStart.appear === 1
  );

  // Test 3: Waiting stack cards hidden at formation = 0
  const poseWaiting = reelPose(45, 0, scene0);
  assert(
    "Waiting Stack Hidden at Formation=0 (angle=45°)",
    "Stacked at z = +460 with appear = 0 so stack is never visible",
    {
      x: Math.round(poseWaiting.x),
      z: Math.round(poseWaiting.z),
      appear: poseWaiting.appear,
    },
    { x: 0, z: 460, appear: 0 },
    approxEqual(poseWaiting.x, 0) &&
      approxEqual(poseWaiting.z, 460) &&
      poseWaiting.appear === 0
  );

  // Test 4: Quadrant Trigonometry at ±90°
  const pose90 = reelPose(90, 1, scene0);
  const poseNeg90 = reelPose(-90, 1, scene0);
  assert(
    "Quadrant Trigonometry (±90°, formation=1, radius=460)",
    "x(90°) = -sin(90°)*460 = -460; x(-90°) = +460; z = 0",
    {
      x90: Math.round(pose90.x),
      xNeg90: Math.round(poseNeg90.x),
      z: Math.round(pose90.z),
    },
    { x90: -460, xNeg90: 460, z: 0 },
    approxEqual(pose90.x, -460) &&
      approxEqual(poseNeg90.x, 460) &&
      approxEqual(pose90.z, 0)
  );

  // Test 5: Sequential Deal Ordering (formation=0.5)
  const poseEarlySlot = reelPose(135, 0.5, scene0);
  const poseLateSlot = reelPose(-135, 0.5, scene0);
  assert(
    "Sequential Deal Ordering (formation=0.5)",
    "Card at 135° (early in deal) has appear > Card at -135° (late in deal)",
    {
      earlyAppear: Number(poseEarlySlot.appear.toFixed(2)),
      lateAppear: Number(poseLateSlot.appear.toFixed(2)),
    },
    { earlyAppear: 1, lateAppear: 0 },
    poseEarlySlot.appear > poseLateSlot.appear && poseLateSlot.appear === 0
  );

  // Test 6: Full Expansion Scene Parameters (expansion = 1)
  const scene1 = sceneFromExpansion(1);
  const poseExpandedFar = reelPose(0, 1, scene1);
  assert(
    "Expansion=1 Scene & Far Center Pose",
    "radius=1800, tilt=0, roll=0, perspective=450, scale=2.3, z=-1800",
    {
      radius: scene1.radius,
      perspective: scene1.perspective,
      scale: poseExpandedFar.scale,
      z: Math.round(poseExpandedFar.z),
      behindCamera: poseExpandedFar.behindCamera,
    },
    {
      radius: 1800,
      perspective: 450,
      scale: 2.3,
      z: -1800,
      behindCamera: false,
    },
    scene1.radius === 1800 &&
      scene1.perspective === 450 &&
      approxEqual(poseExpandedFar.scale, 2.3) &&
      approxEqual(poseExpandedFar.z, -1800) &&
      poseExpandedFar.behindCamera === false
  );

  // Test 7: Behind-Camera Detection at ±180° (expansion=1)
  const poseExpandedBack = reelPose(180, 1, scene1);
  assert(
    "Behind-Camera Detection at ±180° (expansion=1)",
    "z = +1800 > perspective (450) => behindCamera = true",
    {
      z: Math.round(poseExpandedBack.z),
      behindCamera: poseExpandedBack.behindCamera,
    },
    { z: 1800, behindCamera: true },
    poseExpandedBack.behindCamera === true
  );

  return results;
}

// ============================================================================
// 2. CURATED 48-REEL LIBRARY (Recycled across 16 DOM slots)
// ============================================================================

export const BASE_VIDEO_SOURCES = [
  "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-dancing-40033-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-with-a-cold-and-serious-look-41793-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-woman-running-above-the-camera-on-a-running-track-32807-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-skater-doing-tricks-in-a-skatepark-41762-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-nightclub-43442-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-traffic-at-night-34565-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-statues-32646-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
];

export const BASE_COVERS = [
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=540&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=540&q=80",
];

export const REEL_TITLES = [
  "CHROMATIC PULSE",
  "NEON DRIFT // 02",
  "KINETIC ARCHIVE",
  "SOLAR FLARE 99",
  "HYPERION ECHO",
  "VELVET GRAVITY",
  "MONOLITH ZERO",
  "CYBERNETIC BLOOM",
  "AETHER VORTEX",
  "SUBSONIC WAVE",
  "OBSIDIAN MIRAGE",
  "PRISM HORIZON",
  "QUANTUM SILK",
  "LUCID SPECTRUM",
  "PARALLAX NOIR",
  "ORBITAL SYNTH",
];

export const REEL_DIRECTORS = [
  "Studio Kinetix",
  "Sora Takahashi",
  "Elena Rostova",
  "Marcus Vance",
  "Atelier Noir",
  "Kuroda Lab",
  "Vesper Collective",
  "Nadia Lindqvist",
];

export const ACCENT_PALETTES = [
  ["#014BAA", "#F8F3F0"],
  ["#F8F3F0", "#014BAA"],
];

export interface ReelItem {
  id: string;
  index: number;
  code: string;
  title: string;
  director: string;
  duration: string;
  fps: string;
  coverUrl: string;
  videoUrl: string;
  accentA: string;
  accentB: string;
  href: string;
}

export const REEL_LIBRARY: ReelItem[] = Array.from(
  { length: TOTAL_LIBRARY_REELS },
  (_, i) => {
    const palette = ACCENT_PALETTES[i % ACCENT_PALETTES.length];
    return {
      id: `reel-${i + 1}`,
      index: i,
      code: `RL—${String(i + 1).padStart(2, "0")}`,
      title: `${REEL_TITLES[i % REEL_TITLES.length]}${
        i >= 16 ? ` Vol.${Math.floor(i / 16) + 1}` : ""
      }`,
      director: REEL_DIRECTORS[i % REEL_DIRECTORS.length],
      duration: `00:${String(14 + ((i * 7) % 45)).padStart(2, "0")}`,
      fps: i % 2 === 0 ? "60 FPS" : "120 FPS",
      coverUrl: BASE_COVERS[i % BASE_COVERS.length],
      videoUrl: BASE_VIDEO_SOURCES[i % BASE_VIDEO_SOURCES.length],
      accentA: palette[0],
      accentB: palette[1],
      href: `#reel-${i + 1}`,
    };
  }
);

// ============================================================================
// 3. LOADER UI SUBCOMPONENTS: Odometer Counter & Scrambled Caption
// ============================================================================

function RollingDigitColumn({ digit }: { digit: number }) {
  return (
    <div className="relative h-[1em] w-[0.64em] overflow-hidden inline-flex justify-center">
      <motion.div
        className="flex flex-col items-center will-change-transform"
        animate={{ y: `${-digit * 10}%` }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 28,
          mass: 0.6,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span
            key={n}
            className="h-[1em] flex items-center justify-center leading-none select-none"
          >
            {n}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ScrambledCaption({
  text = "Loading Reels",
  progress = 0,
}: {
  text?: string;
  progress?: number;
}) {
  const [display, setDisplay] = useState(text);
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#%&*+=-";

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const lockRatio = clamp(progress * 0.92 + (frame > 24 ? 0.15 : 0), 0, 1);
      const next = text
        .split("")
        .map((ch, idx) => {
          if (ch === " ") return " ";
          if (idx / text.length < lockRatio && frame % 7 !== 0) {
            return ch;
          }
          return glyphs[(idx * 13 + frame * 7) % glyphs.length];
        })
        .join("");
      setDisplay(next);
    }, 55);

    return () => clearInterval(interval);
  }, [text, progress]);

  return (
    <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#014BAA]/75">
      {display}
    </span>
  );
}

// ============================================================================
// 4. MAIN COMPONENT: KinetixCylinder16
// ============================================================================

export interface KinetixCylinderProps {
  embedded?: boolean;
  fullscreen?: boolean;
}

export default function KinetixCylinder16({
  embedded = false,
  fullscreen = false,
}: KinetixCylinderProps) {
  const isPageEmbedded = embedded || fullscreen;
  const prefersReducedMotionOS = useReducedMotion();
  const [simulateReducedMotion, setSimulateReducedMotion] = useState(false);
  const isReducedMotion = Boolean(
    prefersReducedMotionOS || simulateReducedMotion
  );
  const isInstantReady = isReducedMotion || isPageEmbedded;

  // Two Motion Values drive everything
  const formation = useMotionValue(isInstantReady ? 1 : 0);
  const expansion = useMotionValue(isInstantReady ? 1 : 0);

  // Ring rotation
  const targetRingAngle = useMotionValue(0);
  const smoothRingAngle = useSpring(targetRingAngle, {
    stiffness: 75,
    damping: 22,
    mass: 0.9,
  });

  // Real Asset Preloading State
  const TOTAL_REAL_ASSETS = 24;
  const [loadedAssetCount, setLoadedAssetCount] = useState(isInstantReady ? 24 : 0);
  const [assetsReady, setAssetsReady] = useState(isInstantReady);
  const [formationDone, setFormationDone] = useState(isInstantReady);
  const [entrancePhase, setEntrancePhase] = useState<
    "forming" | "expanding" | "settled"
  >(isInstantReady ? "settled" : "forming");
  const [handoffActive, setHandoffActive] = useState(isInstantReady);

  // Interactive UI / Inspector state
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [inspectorTab, setInspectorTab] = useState<"pose" | "scrubber">("pose");
  const [manualScrubMode, setManualScrubMode] = useState(false);
  const [scrubFormation, setScrubFormation] = useState(1);
  const [scrubExpansion, setScrubExpansion] = useState(1);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [activeReelModal, setActiveReelModal] = useState<ReelItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;
  const muted = true;

  // Toggle media-modal-open on body to hide the taskbar/navbar when reel video is open
  useEffect(() => {
    if (activeReelModal) {
      document.body.classList.add("media-modal-open");
    } else {
      document.body.classList.remove("media-modal-open");
    }
    return () => {
      document.body.classList.remove("media-modal-open");
    };
  }, [activeReelModal]);

  // Unit tests memoized & runnable on demand
  const [unitTestResults, setUnitTestResults] = useState(() =>
    runReelPoseUnitTests()
  );

  // DOM & Cache Refs
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const loaderBackdropRef = useRef<HTMLDivElement | null>(null);
  const wordmarkFlightRef = useRef<HTMLAnchorElement | null>(null);
  const cardDomRefs = useRef<(HTMLAnchorElement | null)[]>(
    Array(NUM_SLOTS).fill(null)
  );
  const videoDomRefs = useRef<(HTMLVideoElement | null)[]>(
    Array(NUM_SLOTS).fill(null)
  );
  const styleCacheRef = useRef<{
    ring: Record<string, string>;
    cards: Record<string, string>[];
    videoPlaying: boolean[];
  }>({
    ring: {},
    cards: Array.from({ length: NUM_SLOTS }, () => ({})),
    videoPlaying: Array(NUM_SLOTS).fill(false),
  });

  // Virtualized Reel Recycling State
  const slotWrapsRef = useRef<number[]>(Array(NUM_SLOTS).fill(0));
  const totalRecyclesRef = useRef(0);
  const [slotReelIndices, setSlotReelIndices] = useState<number[]>(() =>
    Array.from({ length: NUM_SLOTS }, (_, i) => i)
  );

  // Pointer & Drag Refs
  const pointerCoordsRef = useRef({ x: -9999, y: -9999, active: false });
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartAngleRef = useRef(0);
  const dragMovedDistanceRef = useRef(0);
  const hoveredSlotRef = useRef<number | null>(null);
  const frameCounterRef = useRef(0);
  const animControlsRef = useRef<{
    formation: { stop: () => void } | null;
    expansion: { stop: () => void } | null;
  }>({ formation: null, expansion: null });

  const inspectorOpenRef = useRef(inspectorOpen);
  inspectorOpenRef.current = inspectorOpen;

  const telemetryYawRef = useRef<HTMLElement | null>(null);
  const telemetryVideosRef = useRef<HTMLElement | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Pause videos and background activities during active page scrolling for 60fps smoothness
  useEffect(() => {
    const onScroll = () => {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const isInViewRef = useRef(false);
  const [sectionInView, setSectionInView] = useState(false);

  // IntersectionObserver to pause loop and video decoders when off-screen
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries[0]?.isIntersecting ?? false;
        isInViewRef.current = inView;
        setSectionInView(inView);
        if (!inView) {
          videoDomRefs.current.forEach((v) => v?.pause());
        }
      },
      { rootMargin: "350px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Preload real assets when near or in view
  useEffect(() => {
    if (isReducedMotion) {
      setLoadedAssetCount(TOTAL_REAL_ASSETS);
      setAssetsReady(true);
      return;
    }

    if (!sectionInView) return;

    let isCancelled = false;
    let loaded = 0;

    const recordAssetLoad = () => {
      if (isCancelled) return;
      loaded += 1;
      setLoadedAssetCount((prev) =>
        Math.min(TOTAL_REAL_ASSETS, Math.max(prev, loaded))
      );
      if (loaded >= TOTAL_REAL_ASSETS) {
        setAssetsReady(true);
      }
    };

    BASE_COVERS.slice(0, 16).forEach((url) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = recordAssetLoad;
      img.onerror = recordAssetLoad;
      img.src = url;
    });

    BASE_VIDEO_SOURCES.slice(0, 8).forEach((url) => {
      const vid = document.createElement("video");
      vid.preload = "metadata";
      vid.muted = true;
      vid.playsInline = true;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        recordAssetLoad();
      };
      vid.onloadeddata = finish;
      vid.onloadedmetadata = finish;
      vid.onerror = finish;
      setTimeout(finish, 2100);
      vid.src = url;
    });

    return () => {
      isCancelled = true;
    };
  }, [isReducedMotion, sectionInView]);

  // Skip entrance instantly
  const skipEntranceInstantly = useCallback(() => {
    animControlsRef.current.formation?.stop?.();
    animControlsRef.current.expansion?.stop?.();
    setManualScrubMode(false);
    formation.set(1);
    expansion.set(1);
    setScrubFormation(1);
    setScrubExpansion(1);
    setLoadedAssetCount(TOTAL_REAL_ASSETS);
    setAssetsReady(true);
    setFormationDone(true);
    setHandoffActive(true);
    setEntrancePhase("settled");
  }, [formation, expansion]);

  // Replay entrance
  const replayEntrance = useCallback(() => {
    animControlsRef.current.formation?.stop?.();
    animControlsRef.current.expansion?.stop?.();
    setManualScrubMode(false);
    setSimulateReducedMotion(false);

    formation.set(0);
    expansion.set(0);
    setScrubFormation(0);
    setScrubExpansion(0);
    setFormationDone(false);
    setHandoffActive(false);
    setEntrancePhase("forming");

    animControlsRef.current.formation = animate(formation, 1, {
      duration: 2.6,
      ease: "linear",
      onComplete: () => {
        setFormationDone(true);
      },
    });
  }, [formation, expansion]);

  // Mount animation
  useEffect(() => {
    if (isInstantReady) {
      skipEntranceInstantly();
      return;
    }

    formation.set(0);
    expansion.set(0);
    setFormationDone(false);
    setHandoffActive(false);
    setEntrancePhase("forming");

    animControlsRef.current.formation = animate(formation, 1, {
      duration: 2.6,
      ease: "linear",
      onComplete: () => {
        setFormationDone(true);
      },
    });

    return () => {
      animControlsRef.current.formation?.stop?.();
      animControlsRef.current.expansion?.stop?.();
    };
  }, [isInstantReady, formation, expansion, skipEntranceInstantly]);

  // Expansion animation
  useEffect(() => {
    if (isReducedMotion || manualScrubMode) return;
    if (formationDone && assetsReady && entrancePhase === "forming") {
      setEntrancePhase("expanding");
      setHandoffActive(true);

      animControlsRef.current.expansion = animate(expansion, 1, {
        duration: 1.9,
        ease: [0.5, 0, 0.15, 1],
        onComplete: () => {
          setEntrancePhase("settled");
        },
      });
    }
  }, [
    formationDone,
    assetsReady,
    entrancePhase,
    isReducedMotion,
    manualScrubMode,
    expansion,
  ]);

  // Keydown accessibility & Pause toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        setIsPaused((p) => !p);
        return;
      }
      if (entrancePhase !== "settled") {
        if (e.key === "Escape" || e.key === "Tab") {
          skipEntranceInstantly();
        }
      } else if (e.key === "Escape" && activeReelModal) {
        setActiveReelModal(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [entrancePhase, skipEntranceInstantly, activeReelModal]);

  // Wheel handling: allow website scrolling when embedded on the page!
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (isPageEmbedded) {
        // Natural page scrolling on the website: vertical wheel moves the website, NOT the cylinder
        if (
          Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5 &&
          Math.abs(e.deltaX) > 4
        ) {
          targetRingAngle.set(targetRingAngle.get() + e.deltaX * 0.065);
        }
        return;
      }

      e.preventDefault();
      if (entrancePhase !== "settled" && !manualScrubMode) return;
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      targetRingAngle.set(targetRingAngle.get() + delta * 0.065);
    };

    el.addEventListener("wheel", handleWheel, { passive: isPageEmbedded });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [entrancePhase, manualScrubMode, targetRingAngle, isPageEmbedded]);

  // Master 60FPS Render Loop (Only runs when section is visible or near viewport)
  useEffect(() => {
    if (!sectionInView) return;
    let rafId: number;

    const writeStyleIfChanged = (
      el: HTMLElement | null,
      cacheObj: Record<string, string>,
      prop: string,
      nextVal: string,
      isCssVar = false
    ) => {
      if (!el || cacheObj[prop] === nextVal) return;
      cacheObj[prop] = nextVal;
      if (isCssVar) {
        el.style.setProperty(prop, nextVal);
      } else {
        (el.style as unknown as Record<string, string>)[prop] = nextVal;
      }
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!isInViewRef.current) return;

      frameCounterRef.current += 1;
      const frame = frameCounterRef.current;

      const isAutoSpinPaused =
        isPausedRef.current ||
        hoveredSlotRef.current !== null ||
        isDraggingRef.current ||
        Boolean(activeReelModal);

      if (!isAutoSpinPaused) {
        const spinSpeed = entrancePhase === "settled" ? 0.055 : 0.032;
        targetRingAngle.set(targetRingAngle.get() + spinSpeed);
      }

      const f = formation.get();
      const e = expansion.get();
      const ringAngle = smoothRingAngle.get();
      const scene = sceneFromExpansion(e);

      // Shared ring CSS variables
      const ringEl = ringRef.current;
      const ringCache = styleCacheRef.current.ring;
      if (ringEl) {
        writeStyleIfChanged(
          ringEl,
          ringCache,
          "--ring-perspective",
          `${scene.perspective.toFixed(1)}px`,
          true
        );
        writeStyleIfChanged(
          ringEl,
          ringCache,
          "--ring-tilt",
          `${scene.tilt.toFixed(2)}deg`,
          true
        );
        writeStyleIfChanged(
          ringEl,
          ringCache,
          "--ring-roll",
          `${scene.roll.toFixed(2)}deg`,
          true
        );
        writeStyleIfChanged(
          ringEl,
          ringCache,
          "--card-scale",
          scene.cardScale.toFixed(4),
          true
        );
      }

      // Loader backdrop opacity
      const backdropEl = loaderBackdropRef.current;
      if (backdropEl) {
        const backdropOpacity = clamp(1 - e * 1.45, 0, 1);
        writeStyleIfChanged(
          backdropEl,
          ringCache,
          "opacity",
          backdropOpacity.toFixed(3)
        );
        writeStyleIfChanged(
          backdropEl,
          ringCache,
          "pointerEvents",
          backdropOpacity > 0.05 ? "auto" : "none"
        );
      }

      // Wordmark flight
      const wordmarkEl = wordmarkFlightRef.current;
      if (wordmarkEl) {
        const wmScale = lerp(1.75, 1, clamp(e * 1.25, 0, 1));
        const wmY = lerp(8, 0, clamp(e * 1.25, 0, 1));
        writeStyleIfChanged(
          wordmarkEl,
          ringCache,
          "transform",
          `translate3d(0px, ${wmY.toFixed(1)}px, 0px) scale(${wmScale.toFixed(
            3
          )})`
        );
      }

      // Cards pose & video playback
      let wrapsChanged = false;
      let activeVideoCount = 0;

      for (let slot = 0; slot < NUM_SLOTS; slot++) {
        const restingAngle = slot * SLOT_STEP;
        const unwrappedAngle = restingAngle + ringAngle;

        const wrapCount = Math.floor((unwrappedAngle + 180) / 360);
        if (wrapCount !== slotWrapsRef.current[slot]) {
          slotWrapsRef.current[slot] = wrapCount;
          totalRecyclesRef.current += 1;
          wrapsChanged = true;
        }

        const pose = reelPose(unwrappedAngle, f, scene);
        const cardEl = cardDomRefs.current[slot];
        const cardCache = styleCacheRef.current.cards[slot];

        if (cardEl) {
          const isHovered = hoveredSlotRef.current === slot && e > 0.8;
          const hoverBoost = isHovered ? 1.05 : 1;

          const transformStr = `translate3d(${pose.x.toFixed(
            1
          )}px, ${pose.y.toFixed(1)}px, ${pose.z.toFixed(
            1
          )}px) rotateY(${pose.yaw.toFixed(
            2
          )}deg) scale(calc(var(--card-scale) * ${hoverBoost}))`;

          const effectiveOpacity = pose.behindCamera ? 0 : pose.appear;
          const visibilityStr =
            effectiveOpacity <= 0.005 || pose.behindCamera
              ? "hidden"
              : "visible";
          const pointerEventsStr =
            pose.behindCamera || effectiveOpacity < 0.5 ? "none" : "auto";

          writeStyleIfChanged(cardEl, cardCache, "transform", transformStr);
          writeStyleIfChanged(
            cardEl,
            cardCache,
            "opacity",
            effectiveOpacity.toFixed(3)
          );
          writeStyleIfChanged(cardEl, cardCache, "visibility", visibilityStr);
          writeStyleIfChanged(
            cardEl,
            cardCache,
            "pointerEvents",
            pointerEventsStr
          );
        }

        const normA = normalizeDeg(unwrappedAngle);
        const isCentered = e >= 0.5 ? Math.abs(normA) < 22 : Math.abs(normA) > 158;
        const shouldPlayVideo =
          !isScrollingRef.current &&
          !pose.behindCamera &&
          pose.appear > 0.65 &&
          isCentered;

        if (shouldPlayVideo) activeVideoCount++;

        const videoEl = videoDomRefs.current[slot];
        if (
          videoEl &&
          styleCacheRef.current.videoPlaying[slot] !== shouldPlayVideo
        ) {
          styleCacheRef.current.videoPlaying[slot] = shouldPlayVideo;
          if (shouldPlayVideo) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        }
      }

      if (wrapsChanged) {
        setSlotReelIndices(
          slotWrapsRef.current.map((wrap, slot) => {
            const idx =
              (((slot + wrap * NUM_SLOTS) % TOTAL_LIBRARY_REELS) +
                TOTAL_LIBRARY_REELS) %
              TOTAL_LIBRARY_REELS;
            return idx;
          })
        );
      }

      // Direct DOM updates for telemetry without triggering React re-renders
      if (frame % 15 === 0) {
        if (telemetryYawRef.current) {
          telemetryYawRef.current.textContent = `${normalizeDeg(ringAngle).toFixed(1)}°`;
        }
        if (telemetryVideosRef.current) {
          telemetryVideosRef.current.textContent = `${activeVideoCount}`;
        }
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [
    sectionInView,
    formation,
    expansion,
    smoothRingAngle,
    targetRingAngle,
    entrancePhase,
    activeReelModal,
  ]);

  // Pointer drag & swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, input, [data-no-drag]"))
      return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    dragStartAngleRef.current = targetRingAngle.get();
    dragMovedDistanceRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    pointerCoordsRef.current = { x: e.clientX, y: e.clientY, active: true };
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    const dy = e.clientY - dragStartYRef.current;

    if (isPageEmbedded && Math.abs(dy) > Math.abs(dx) * 1.2 && Math.abs(dy) > 8) {
      isDraggingRef.current = false;
      return;
    }

    dragMovedDistanceRef.current = Math.abs(dx);
    const sensitivity = expansion.get() > 0.5 ? 0.14 : 0.28;
    targetRingAngle.set(dragStartAngleRef.current - dx * sensitivity);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Loader progress
  const assetProgressRatio = clamp(loadedAssetCount / TOTAL_REAL_ASSETS, 0, 1);
  const loaderPercent = useMemo(() => {
    if (entrancePhase !== "forming") return 100;
    const combined = Math.round(
      (assetProgressRatio * 0.65 + formation.get() * 0.35) * 100
    );
    return clamp(combined, 0, 100);
  }, [assetProgressRatio, formation, entrancePhase]);

  const hundredsDigit = Math.floor(loaderPercent / 100);
  const tensDigit = Math.floor((loaderPercent % 100) / 10);
  const onesDigit = loaderPercent % 10;

  const passedTestsCount = unitTestResults.filter((t) => t.passed).length;
  const pos = isPageEmbedded ? "absolute" : "fixed";

  return (
    <div
      ref={viewportRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={() => {
        pointerCoordsRef.current.active = false;
        isDraggingRef.current = false;
      }}
      className={`relative overflow-hidden bg-transparent text-[#F8F3F0] select-none cursor-grab active:cursor-grabbing font-sans touch-pan-y ${
        isPageEmbedded ? "w-full h-full min-h-[750px]" : "w-screen h-screen"
      }`}
    >
      {/* Hidden backdrop ref to satisfy animation hooks without an opaque layer */}
      <div ref={loaderBackdropRef} aria-hidden="true" className="hidden pointer-events-none" />

      {/* UNIFIED 3D CYLINDER STAGE */}
      <div
        ref={ringRef}
        style={{
          perspective: isReducedMotion ? "450px" : "1000px",
        }}
        className={`${pos} inset-0 z-20 flex items-center justify-center pointer-events-none overflow-hidden`}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateZ(var(--ring-roll)) rotateX(var(--ring-tilt))",
          }}
          className="relative w-0 h-0 flex items-center justify-center will-change-transform"
        >
          {Array.from({ length: NUM_SLOTS }, (_, slot) => {
            const reelIndex = slotReelIndices[slot] ?? slot;
            const reel = REEL_LIBRARY[reelIndex];
            const isSlotHovered = hoveredSlot === slot;

            return (
              <a
                key={slot}
                ref={(el) => {
                  cardDomRefs.current[slot] = el;
                }}
                href={reel.href}
                data-slot-index={slot}
                aria-label={`${reel.title} by ${reel.director}, duration ${
                  reel.duration
                }. Slot ${slot + 1} of ${NUM_SLOTS}.`}
                onClick={(e) => {
                  e.preventDefault();
                  if (dragMovedDistanceRef.current > 8) return;
                  setActiveReelModal(reel);
                }}
                onPointerEnter={() => {
                  hoveredSlotRef.current = slot;
                  setHoveredSlot(slot);
                }}
                onPointerLeave={() => {
                  if (hoveredSlotRef.current === slot) {
                    hoveredSlotRef.current = null;
                    setHoveredSlot(null);
                  }
                }}
                style={{
                  width: "270px",
                  height: "480px",
                  marginLeft: "-135px",
                  marginTop: "-240px",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                className={`group absolute left-0 top-0 rounded-2xl overflow-hidden bg-black border transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[#F8F3F0] pointer-events-auto ${
                  isSlotHovered
                    ? "border-[#F8F3F0] shadow-[0_24px_60px_rgba(1,75,170,0.85),0_0_0_2px_rgba(248,243,240,0.9)]"
                    : "border-[#F8F3F0]/35 shadow-[0_24px_56px_rgba(1,75,170,0.65)]"
                }`}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ filter: "none", mixBlendMode: "normal" }}
                >
                  <img
                    src={reel.coverUrl}
                    alt=""
                    loading="eager"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover object-center select-none"
                  />
                  <video
                    ref={(el) => {
                      videoDomRefs.current[slot] = el;
                    }}
                    src={reel.videoUrl}
                    poster={reel.coverUrl}
                    muted={muted}
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 pointer-events-none">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#F8F3F0]/75">
                    <span>{reel.director}</span>
                    <span>{reel.duration}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold tracking-tight text-[#F8F3F0] truncate">
                      {reel.title}
                    </h3>
                    <span className="w-6 h-6 rounded-full bg-[#F8F3F0]/15 border border-[#F8F3F0]/40 backdrop-blur-md flex items-center justify-center text-[#F8F3F0] group-hover:bg-[#F8F3F0] group-hover:text-[#014BAA] transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>


      {/* LOADER FOREGROUND UI */}
      <motion.div
        initial={false}
        animate={{
          opacity: handoffActive ? 0 : 1,
          y: handoffActive ? 24 : 0,
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: handoffActive ? "none" : "auto" }}
        className={`${pos} inset-x-0 bottom-0 z-40 p-6 md:p-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 text-[#014BAA]`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#014BAA] animate-ping" />
            <ScrambledCaption
              text="Loading Reels"
              progress={loaderPercent / 100}
            />
          </div>
          <p className="text-xs font-mono text-[#014BAA]/80 max-w-xs">
            Real asset buffer: {loadedAssetCount}/{TOTAL_REAL_ASSETS} streams
            verified · Dealing 16 cards around 360° ring
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              data-no-drag
              onClick={skipEntranceInstantly}
              className="px-4 py-2 rounded-full bg-[#014BAA] text-[#F8F3F0] text-xs font-mono uppercase tracking-wider hover:bg-[#014BAA]/90 transition flex items-center gap-1.5 border border-[#014BAA]"
            >
              <SkipForward className="w-3.5 h-3.5" />
              Skip Entrance (Esc / Tab)
            </button>
          </div>
        </div>

        <div
          aria-live="polite"
          className="flex flex-col items-end self-end font-mono text-[#014BAA]"
        >
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#014BAA]/70 mb-1">
            REAL ASSET TELEMETRY
          </div>
          <div className="flex items-baseline text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter tabular-nums text-[#014BAA] leading-none">
            <RollingDigitColumn digit={hundredsDigit} />
            <RollingDigitColumn digit={tensDigit} />
            <RollingDigitColumn digit={onesDigit} />
            <span className="text-2xl md:text-3xl ml-1 text-[#014BAA]/60 font-normal">
              %
            </span>
          </div>
        </div>
      </motion.div>

      {/* Viewport Frame & Center Headline */}
      <motion.div
        initial={false}
        animate={{
          opacity: handoffActive ? 1 : 0,
          scale: handoffActive ? 1 : 0.96,
        }}
        transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-none ${pos} inset-4 md:inset-6 z-30 flex flex-col justify-center p-6 md:p-8`}
      >

        <div className="my-auto relative flex flex-col items-center text-center max-w-2xl mx-auto pointer-events-none px-6 sm:px-10 py-6 sm:py-8">
          <h1 className="relative text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] leading-[0.94] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Our team.
          </h1>
          <p className="relative mt-4 text-xs sm:text-sm md:text-base font-extrabold tracking-[0.18em] uppercase bg-gradient-to-r from-cyan-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)] max-w-xl">
            Empowering the Next Wave of Autonomous Intelligence
          </p>
        </div>
      </motion.div>

      {/* FLOATING QUICK-INSPECT BUTTON */}
      {!handoffActive && (
        <div className={`${pos} top-6 right-6 z-50`} data-no-drag>
          <button
            type="button"
            onClick={() => setInspectorOpen((o) => !o)}
            className="px-4 py-2 rounded-full bg-[#014BAA] text-[#F8F3F0] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 border border-[#014BAA]"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Inspect `reelPose` & Tests</span>
          </button>
        </div>
      )}

      {/* REEL DETAIL MODAL */}
      {activeReelModal && (
        <div
          data-no-drag
          data-media-modal="true"
          className="media-modal-active fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveReelModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#014BAA] border-2 border-[#F8F3F0] rounded-3xl overflow-hidden shadow-[0_28px_80px_rgba(1,75,170,0.95)] text-[#F8F3F0]"
          >
            <div className="relative aspect-[9/12] w-full bg-black">
              <div
                className="absolute inset-0"
                style={{ filter: "none", mixBlendMode: "normal" }}
              >
                <video
                  src={activeReelModal.videoUrl}
                  poster={activeReelModal.coverUrl}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => setActiveReelModal(null)}
                className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#F8F3F0] text-[#014BAA] text-xs font-mono font-bold uppercase border border-[#F8F3F0] hover:bg-[#014BAA] hover:text-[#F8F3F0] transition"
              >
                Close [Esc]
              </button>
            </div>
            <div className="p-6 flex items-center justify-between bg-[#014BAA] border-t border-[#F8F3F0]/25">
              <div>
                <div className="text-xs font-mono text-[#F8F3F0]/75">
                  {activeReelModal.code} · {activeReelModal.director}
                </div>
                <h2 className="text-xl font-bold text-[#F8F3F0] mt-0.5">
                  {activeReelModal.title}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#F8F3F0] text-[#014BAA] text-xs font-mono font-bold">
                {activeReelModal.duration}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ARCHITECTURE DRAWER */}
      {inspectorOpen && (
        <div
          data-no-drag
          className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-[#014BAA] border-l-2 border-[#F8F3F0] text-[#F8F3F0] flex flex-col shadow-[0_0_80px_rgba(1,75,170,0.95)]"
        >
          <div className="p-5 border-b border-[#F8F3F0]/25 flex items-center justify-between bg-[#F8F3F0] text-[#014BAA]">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-[#014BAA]" />
              <div>
                <h2 className="text-sm font-bold tracking-wide uppercase">
                  Architecture & Pure `reelPose` Inspector
                </h2>
                <p className="text-[11px] font-mono text-[#014BAA]/75">
                  1 Pose Function · 2 Motion Values (`formation`, `expansion`)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setInspectorOpen(false)}
              className="px-3.5 py-1.5 rounded-lg bg-[#014BAA] text-[#F8F3F0] text-xs font-mono font-bold uppercase hover:opacity-90"
            >
              Close
            </button>
          </div>

          <div className="px-5 pt-3 border-b border-[#F8F3F0]/25 flex items-center gap-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => setInspectorTab("pose")}
              className={`px-3 py-2 border-b-2 transition ${
                inspectorTab === "pose"
                  ? "border-[#F8F3F0] text-[#F8F3F0] font-bold"
                  : "border-transparent text-[#F8F3F0]/60 hover:text-[#F8F3F0]"
              }`}
            >
              1. `reelPose()` & Tests
            </button>
            <button
              type="button"
              onClick={() => setInspectorTab("scrubber")}
              className={`px-3 py-2 border-b-2 transition ${
                inspectorTab === "scrubber"
                  ? "border-[#F8F3F0] text-[#F8F3F0] font-bold"
                  : "border-transparent text-[#F8F3F0]/60 hover:text-[#F8F3F0]"
              }`}
            >
              2. Live Motion Scrubber
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {inspectorTab === "pose" ? (
              <>
                <div className="rounded-2xl bg-[#F8F3F0]/10 border border-[#F8F3F0]/30 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F8F3F0]" />
                      <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#F8F3F0]">
                        Unit Test Suite ({passedTestsCount}/
                        {unitTestResults.length} Passing)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUnitTestResults(runReelPoseUnitTests())}
                      className="px-3 py-1 rounded-full bg-[#F8F3F0] text-[#014BAA] text-[11px] font-mono font-bold hover:opacity-90"
                    >
                      Re-run Tests
                    </button>
                  </div>

                  <div className="space-y-2">
                    {unitTestResults.map((t, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#014BAA] border border-[#F8F3F0]/30 text-xs font-mono space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#F8F3F0]">
                            {t.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              t.passed
                                ? "bg-[#F8F3F0] text-[#014BAA]"
                                : "border border-[#F8F3F0] text-[#F8F3F0]"
                            }`}
                          >
                            {t.passed ? "PASS" : "FAIL"}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#F8F3F0]/80">
                          {t.formula}
                        </div>
                        <div className="text-[10px] text-[#F8F3F0]/65 flex flex-wrap gap-3">
                          <span>Actual: {t.actual}</span>
                          <span>Expected: {t.expected}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#F8F3F0]/80">
                    Pure Function Implementation
                  </div>
                  <pre className="p-4 rounded-2xl bg-[#F8F3F0] text-[#014BAA] border border-[#F8F3F0] text-[11px] font-mono overflow-x-auto leading-relaxed font-medium">
                    {`export function reelPose(angle, formation, scene) {
  const f = clamp(formation, 0, 1);
  const { radius = 460, cardScale = 0.52, perspective = 1000, expansion = 0 } = scene;

  // 0 deg = far center of ring, ±180 deg = nearest camera
  const normAngle = normalizeDeg(angle);
  const travelFromFront = (180 - normAngle) % 360;
  const dealOrderProgress = travelFromFront / 360;

  // Staggered ease-out cubic swing around cylinder
  const windowWidth = 0.32;
  const startF = dealOrderProgress * (1 - windowWidth);
  const isAnchor = travelFromFront < 0.001;
  const rawProgress = isAnchor ? 1 : clamp((f - startF) / windowWidth, 0, 1);
  const easedDeal = 1 - Math.pow(1 - rawProgress, 3);

  const effectiveAngle = f >= 1
    ? normAngle
    : normalizeDeg(180 - travelFromFront * easedDeal);

  const rad = (effectiveAngle * Math.PI) / 180;
  const x = -Math.sin(rad) * radius;
  const y = 0;
  const z = -Math.cos(rad) * radius;
  const yaw = effectiveAngle;

  const appear = isAnchor ? 1 : f >= 1 ? 1 : clamp(rawProgress * 2.8, 0, 1);
  const behindCamera = expansion > 0.45 &&
    (z > perspective - 60 || Math.abs(effectiveAngle) > 128);

  return { x, y, z, yaw, scale: cardScale, appear, behindCamera };
}`}
                  </pre>
                </div>
              </>
            ) : (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-[#F8F3F0] text-[#014BAA] text-xs space-y-2">
                  <div className="font-bold flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    <span>
                      Direct Two-Value Scrubber (`formation` & `expansion`)
                    </span>
                  </div>
                  <p className="text-[#014BAA]/85 leading-relaxed">
                    Drag the sliders below to manually scrub the two motion
                    values that drive the entire 3D scene, camera tilt/roll,
                    radius interpolation, and backdrop handoff.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F3F0]/10 border border-[#F8F3F0]/30 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span>FORMATION (The Loader Deal)</span>
                    <span className="font-bold text-[#F8F3F0]">
                      {scrubFormation.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.005"
                    value={scrubFormation}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      animControlsRef.current.formation?.stop?.();
                      animControlsRef.current.expansion?.stop?.();
                      setManualScrubMode(true);
                      setScrubFormation(val);
                      formation.set(val);
                    }}
                    className="w-full accent-[#F8F3F0]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#F8F3F0]/70">
                    <span>0.0 (Stacked at 180°)</span>
                    <span>1.0 (Dealt 360° around ring)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F3F0]/10 border border-[#F8F3F0]/30 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span>EXPANSION (The Camera Dive & Reveal)</span>
                    <span className="font-bold text-[#F8F3F0]">
                      {scrubExpansion.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.005"
                    value={scrubExpansion}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      animControlsRef.current.formation?.stop?.();
                      animControlsRef.current.expansion?.stop?.();
                      setManualScrubMode(true);
                      setScrubExpansion(val);
                      expansion.set(val);
                      setHandoffActive(val > 0.15);
                    }}
                    className="w-full accent-[#F8F3F0]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#F8F3F0]/70">
                    <span>0.0 (R=460, Tilt=-22°, Roll=-20°)</span>
                    <span>1.0 (R=1800, Level Inside, Persp=450)</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={replayEntrance}
                    className="flex-1 py-2.5 rounded-xl bg-[#F8F3F0] text-[#014BAA] font-bold hover:opacity-90 text-xs font-mono uppercase tracking-wider"
                  >
                    Play Full Automated Entrance
                  </button>
                  <button
                    type="button"
                    onClick={skipEntranceInstantly}
                    className="px-4 py-2.5 rounded-xl border border-[#F8F3F0] text-[#F8F3F0] hover:bg-[#F8F3F0] hover:text-[#014BAA] text-xs font-mono uppercase tracking-wider transition"
                  >
                    Jump to 1.0
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
