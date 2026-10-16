import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCw } from "lucide-react";

interface ZeroSevenLoadingScreenProps {
  onComplete?: () => void;
  onProgressUpdate?: (percent: number) => void;
  duration?: number;
  title?: string;
  subtitle?: string;
  autoClose?: boolean;
}

// ─── AI Model Logo Components (Claude, ChatGPT, Antigravity, Gemini, DeepSeek, etc.) ────

function ClaudeLogo() {
  return (
    <div className="w-full h-full rounded-full bg-[#d97706]/20 flex items-center justify-center p-1.5">
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
        <path
          d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"
          stroke="#f59e0b"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3" fill="#f59e0b" />
      </svg>
    </div>
  );
}

function ChatGPTLogo() {
  return (
    <div className="w-full h-full rounded-full bg-[#10a37f]/20 flex items-center justify-center p-1.5">
      <svg viewBox="0 0 24 24" className="w-full h-full text-[#10a37f]" fill="currentColor">
        <path d="M22.28 9.37a5.99 5.99 0 0 0-.52-4.95 6.09 6.09 0 0 0-6.42-2.9 6.04 6.04 0 0 0-4.71-2.27 6.1 6.1 0 0 0-5.83 4.23A6.01 6.01 0 0 0 1.2 6.95a6.08 6.08 0 0 0 .7 6.99 5.98 5.98 0 0 0 .53 4.94 6.09 6.09 0 0 0 6.42 2.91 6.05 6.05 0 0 0 4.72 2.27 6.1 6.1 0 0 0 5.82-4.23 6.02 6.02 0 0 0 3.6-3.47 6.08 6.08 0 0 0-.71-7zM12 14.7a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4z" />
      </svg>
    </div>
  );
}

function AntigravityLogo() {
  return (
    <div className="w-full h-full rounded-full bg-cyan-500/20 flex items-center justify-center p-1.5">
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
        <circle cx="12" cy="12" r="8.5" stroke="#38bdf8" strokeWidth="1.6" strokeDasharray="2 2" />
        <ellipse cx="12" cy="12" rx="8.5" ry="3.5" stroke="#2dd4bf" strokeWidth="1.4" transform="rotate(-30 12 12)" />
        <ellipse cx="12" cy="12" rx="8.5" ry="3.5" stroke="#e879f9" strokeWidth="1.4" transform="rotate(30 12 12)" />
        <circle cx="12" cy="12" r="2.2" fill="#38bdf8" />
      </svg>
    </div>
  );
}

function GeminiLogo() {
  return (
    <div className="w-full h-full rounded-full bg-blue-500/20 flex items-center justify-center p-1.5">
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="gemGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="0.5" stopColor="#818cf8" />
            <stop offset="1" stopColor="#c084fc" />
          </linearGradient>
        </defs>
        <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" fill="url(#gemGrad)" />
      </svg>
    </div>
  );
}

function DeepSeekLogo() {
  return (
    <div className="w-full h-full rounded-full bg-[#1e40af]/20 flex items-center justify-center p-1.5">
      <svg viewBox="0 0 24 24" className="w-full h-full text-blue-400" fill="currentColor">
        <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L3.6 20.4a1 1 0 0 0 1.25 1.25l2.79-1.37A8.96 8.96 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm4 10.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    </div>
  );
}

function MetaLlamaLogo() {
  return (
    <div className="w-full h-full rounded-full bg-indigo-500/20 flex items-center justify-center p-1.5">
      <svg viewBox="0 0 24 24" className="w-full h-full text-indigo-400" fill="currentColor">
        <path d="M12 3C6.48 3 2 7.48 2 13s4.48 10 10 10 10-4.48 10-10S17.52 3 12 3zm-2 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm4-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
      </svg>
    </div>
  );
}

function MistralLogo() {
  return (
    <div className="w-full h-full rounded-full bg-orange-500/20 flex items-center justify-center p-1.5">
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
        <rect x="3" y="4" width="4" height="4" fill="#ea580c" />
        <rect x="17" y="4" width="4" height="4" fill="#ea580c" />
        <rect x="3" y="9" width="7" height="4" fill="#f97316" />
        <rect x="14" y="9" width="7" height="4" fill="#f97316" />
        <rect x="3" y="14" width="18" height="4" fill="#fb923c" />
      </svg>
    </div>
  );
}

function HuggingFaceLogo() {
  return (
    <div className="w-full h-full rounded-full bg-yellow-500/20 flex items-center justify-center p-1.5">
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
        <circle cx="12" cy="12" r="9" fill="#facc15" />
        <circle cx="9" cy="10" r="1.5" fill="#0f172a" />
        <circle cx="15" cy="10" r="1.5" fill="#0f172a" />
        <path d="M8.5 14.5c1 1.5 6 1.5 7 0" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function PerplexityLogo() {
  return (
    <div className="w-full h-full rounded-full bg-teal-500/20 flex items-center justify-center p-1.5">
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
        <rect x="5.5" y="5.5" width="13" height="13" rx="2" stroke="#2dd4bf" strokeWidth="2" />
        <path d="M12 2v20M2 12h20" stroke="#2dd4bf" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function GrokLogo() {
  return (
    <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center p-1.5">
      <span className="font-sans font-black text-xs text-white">xAI</span>
    </div>
  );
}

function PyTorchLogo() {
  return (
    <div className="w-full h-full rounded-full bg-rose-500/20 flex items-center justify-center p-1.5">
      <svg viewBox="0 0 24 24" className="w-full h-full text-rose-500" fill="currentColor">
        <path d="M13.5 2.5a.5.5 0 0 0-.85-.35l-2.4 2.4a8 8 0 1 0 5.4 13.65l-1.42-1.42a6 6 0 1 1-4.24-10.24l2.1-2.1c.32-.31.86-.09.86.36v7.2a1 1 0 0 0 2 0v-9.5z" />
      </svg>
    </div>
  );
}

function MidjourneyLogo() {
  return (
    <div className="w-full h-full rounded-full bg-violet-500/20 flex items-center justify-center p-1.5">
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
        <path d="M3 17l8-14 4 14-6-3-6 3z" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round" />
        <path d="M15 17l6-6-6-2" stroke="#c4b5fd" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ─── Main ZeroSevenLoadingScreen Component ──────────────────────────

export default function ZeroSevenLoadingScreen({
  onComplete,
  onProgressUpdate,
  duration = 1000,
  title = "Ai ConnectX",
  subtitle = "Neural Matrix Synchronizing...",
  autoClose = true,
}: ZeroSevenLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isZoomingIn, setIsZoomingIn] = useState(false);

  const onProgressUpdateRef = useRef(onProgressUpdate);
  onProgressUpdateRef.current = onProgressUpdate;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // 3 Concentric Orbit Rings of AI Model Logos
  const ring1Models = [
    { name: "Claude", logo: <ClaudeLogo /> },
    { name: "ChatGPT", logo: <ChatGPTLogo /> },
    { name: "Antigravity", logo: <AntigravityLogo /> },
    { name: "Gemini", logo: <GeminiLogo /> },
    { name: "DeepSeek", logo: <DeepSeekLogo /> },
    { name: "Meta Llama", logo: <MetaLlamaLogo /> },
    { name: "Mistral", logo: <MistralLogo /> },
    { name: "Hugging Face", logo: <HuggingFaceLogo /> },
    { name: "Perplexity", logo: <PerplexityLogo /> },
    { name: "xAI Grok", logo: <GrokLogo /> },
    { name: "PyTorch", logo: <PyTorchLogo /> },
    { name: "Midjourney", logo: <MidjourneyLogo /> },
  ];

  const ring2Models = [
    { name: "Antigravity", logo: <AntigravityLogo /> },
    { name: "Claude", logo: <ClaudeLogo /> },
    { name: "ChatGPT", logo: <ChatGPTLogo /> },
    { name: "Gemini", logo: <GeminiLogo /> },
    { name: "DeepSeek", logo: <DeepSeekLogo /> },
    { name: "PyTorch", logo: <PyTorchLogo /> },
    { name: "Mistral", logo: <MistralLogo /> },
    { name: "Perplexity", logo: <PerplexityLogo /> },
    { name: "Hugging Face", logo: <HuggingFaceLogo /> },
    { name: "Meta Llama", logo: <MetaLlamaLogo /> },
    { name: "xAI Grok", logo: <GrokLogo /> },
    { name: "Midjourney", logo: <MidjourneyLogo /> },
    { name: "Claude", logo: <ClaudeLogo /> },
    { name: "Antigravity", logo: <AntigravityLogo /> },
    { name: "ChatGPT", logo: <ChatGPTLogo /> },
    { name: "Gemini", logo: <GeminiLogo /> },
  ];

  const ring3Models = [
    { name: "Gemini", logo: <GeminiLogo /> },
    { name: "Antigravity", logo: <AntigravityLogo /> },
    { name: "Claude", logo: <ClaudeLogo /> },
    { name: "ChatGPT", logo: <ChatGPTLogo /> },
    { name: "DeepSeek", logo: <DeepSeekLogo /> },
    { name: "Meta Llama", logo: <MetaLlamaLogo /> },
    { name: "Mistral", logo: <MistralLogo /> },
    { name: "Hugging Face", logo: <HuggingFaceLogo /> },
    { name: "Perplexity", logo: <PerplexityLogo /> },
    { name: "PyTorch", logo: <PyTorchLogo /> },
    { name: "xAI Grok", logo: <GrokLogo /> },
    { name: "Midjourney", logo: <MidjourneyLogo /> },
    { name: "Antigravity", logo: <AntigravityLogo /> },
    { name: "Claude", logo: <ClaudeLogo /> },
    { name: "ChatGPT", logo: <ChatGPTLogo /> },
    { name: "Gemini", logo: <GeminiLogo /> },
    { name: "DeepSeek", logo: <DeepSeekLogo /> },
    { name: "Mistral", logo: <MistralLogo /> },
    { name: "Hugging Face", logo: <HuggingFaceLogo /> },
    { name: "Perplexity", logo: <PerplexityLogo /> },
  ];

  // 60/120fps requestAnimationFrame loop for ultra-smooth & fast progress
  useEffect(() => {
    let animId: number;
    const startTime = performance.now();
    let hasCompleted = false;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progressRaw = Math.min(1, elapsed / duration);
      // Clean, linear progress increment mapped to integer 0-100
      const pct = Math.min(100, Math.round(progressRaw * 100));
      setProgress(pct);
      onProgressUpdateRef.current?.(pct);

      if (progressRaw >= 1 && !hasCompleted) {
        hasCompleted = true;
        if (autoClose) {
          setIsZoomingIn(true);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(() => {
              onCompleteRef.current?.();
            }, 40);
          }, 420);
        }
        return;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [duration, autoClose]);

  const handleSkip = () => {
    onProgressUpdateRef.current?.(100);
    setProgress(100);
    setIsZoomingIn(true);
    setTimeout(() => {
      setIsFinished(true);
      setTimeout(() => {
        onCompleteRef.current?.();
      }, 30);
    }, 220);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="07-rainbow-matrix-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.25, filter: "blur(22px)" }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-black/25 backdrop-blur-[2px] text-white flex flex-col items-center justify-center p-4 select-none overflow-hidden"
        >
          {/* Top Identifier Badge */}
          <motion.div
            animate={isZoomingIn ? { opacity: 0, y: -25, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute top-5 z-30 flex flex-col items-center gap-1 pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 font-mono text-[11px] uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(45,212,191,0.25)]">
              <RotateCw className="w-3.5 h-3.5 text-teal-400 animate-spin" />
              <span>07 · {title}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
            </div>
            <p className="text-[10px] font-mono text-white/50 tracking-wider uppercase">{subtitle}</p>
          </motion.div>

          {/* Concentric Rotating Galaxy of AI Model Logos Orbiting Central ConnectX Logo */}
          <div className="relative w-full max-w-4xl h-[480px] sm:h-[580px] flex items-center justify-center">
            {/* Ambient Chromatic Core Halo */}
            <motion.div
              animate={isZoomingIn ? { scale: 3, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full bg-gradient-to-tr from-teal-500/20 via-cyan-500/20 to-fuchsia-500/20 blur-[130px] pointer-events-none animate-aurora-spin"
            />

            {/* Orbit Ring 1 (Inner, Radius ~200px): Clockwise continuous rotation */}
            <motion.div
              animate={
                isZoomingIn
                  ? { scale: 2.2, opacity: 0, filter: "blur(12px)" }
                  : { rotate: 360, scale: 1, opacity: 1, filter: "blur(0px)" }
              }
              transition={
                isZoomingIn
                  ? { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                  : { repeat: Infinity, duration: 24, ease: "linear" }
              }
              className="absolute w-[380px] sm:w-[440px] h-[380px] sm:h-[440px] rounded-full border border-dashed border-white/10 flex items-center justify-center pointer-events-none"
            >
              {ring1Models.map((item, idx) => {
                const angle = (idx * 360) / ring1Models.length;
                const r = 190;
                const x = Math.cos((angle * Math.PI) / 180) * r;
                const y = Math.sin((angle * Math.PI) / 180) * r;
                return (
                  <div
                    key={idx}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className="absolute w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-zinc-950/90 border border-white/20 shadow-xl flex items-center justify-center pointer-events-auto hover:scale-125 transition-transform"
                    title={item.name}
                  >
                    {item.logo}
                  </div>
                );
              })}
            </motion.div>

            {/* Orbit Ring 2 (Middle, Radius ~275px): Counter-Clockwise continuous rotation */}
            <motion.div
              animate={
                isZoomingIn
                  ? { scale: 2.5, opacity: 0, filter: "blur(14px)" }
                  : { rotate: -360, scale: 1, opacity: 1, filter: "blur(0px)" }
              }
              transition={
                isZoomingIn
                  ? { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                  : { repeat: Infinity, duration: 34, ease: "linear" }
              }
              className="absolute w-[510px] sm:w-[580px] h-[510px] sm:h-[580px] rounded-full border border-dashed border-teal-500/20 flex items-center justify-center pointer-events-none"
            >
              {ring2Models.map((item, idx) => {
                const angle = (idx * 360) / ring2Models.length;
                const r = 265;
                const x = Math.cos((angle * Math.PI) / 180) * r;
                const y = Math.sin((angle * Math.PI) / 180) * r;
                return (
                  <div
                    key={idx}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className="absolute w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-zinc-950/90 border border-teal-400/30 shadow-xl flex items-center justify-center pointer-events-auto hover:scale-125 transition-transform"
                    title={item.name}
                  >
                    {item.logo}
                  </div>
                );
              })}
            </motion.div>

            {/* Orbit Ring 3 (Outer, Radius ~350px): Clockwise continuous rotation */}
            <motion.div
              animate={
                isZoomingIn
                  ? { scale: 2.8, opacity: 0, filter: "blur(16px)" }
                  : { rotate: 360, scale: 1, opacity: 0.75, filter: "blur(0px)" }
              }
              transition={
                isZoomingIn
                  ? { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                  : { repeat: Infinity, duration: 46, ease: "linear" }
              }
              className="absolute w-[650px] sm:w-[730px] h-[650px] sm:h-[730px] rounded-full border border-dashed border-white/5 flex items-center justify-center pointer-events-none"
            >
              {ring3Models.map((item, idx) => {
                const angle = (idx * 360) / ring3Models.length;
                const r = 340;
                const x = Math.cos((angle * Math.PI) / 180) * r;
                const y = Math.sin((angle * Math.PI) / 180) * r;
                return (
                  <div
                    key={idx}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className="absolute w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-zinc-950/80 border border-white/10 shadow-lg flex items-center justify-center pointer-events-auto hover:scale-125 transition-transform"
                    title={item.name}
                  >
                    {item.logo}
                  </div>
                );
              })}
            </motion.div>

            {/* Central Ai ConnectX Logo with Cinematic Zoom-In Animated Effect */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={
                isZoomingIn
                  ? {
                      scale: 14,
                      opacity: 0,
                      filter: "blur(18px)",
                    }
                  : {
                      scale: [1, 1.04, 1],
                      opacity: 1,
                      filter: "blur(0px)",
                    }
              }
              transition={
                isZoomingIn
                  ? {
                      duration: 0.42,
                      ease: [0.16, 1, 0.3, 1],
                    }
                  : {
                      scale: {
                        duration: 2.4,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      },
                      opacity: { duration: 0.35, ease: "easeOut" },
                    }
              }
              className="z-30 relative flex flex-col items-center justify-center pointer-events-none select-none"
            >
              {/* Radial Energy Pedestal & Glow Halo */}
              <div className="absolute inset-0 -m-14 bg-gradient-to-tr from-teal-400/30 via-cyan-400/25 to-fuchsia-500/25 rounded-full blur-3xl pointer-events-none animate-aurora-spin" />

              <div className="relative p-7 sm:p-9 rounded-full bg-zinc-950/70 backdrop-blur-xl border border-teal-400/35 shadow-[0_0_80px_rgba(45,212,191,0.45)] flex flex-col items-center justify-center group">
                {/* 4K Ai ConnectX Transparent Logo */}
                <img
                  src="/ai-connectx-logo-transparent.png"
                  alt="Ai ConnectX Logo"
                  className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 object-contain drop-shadow-[0_0_45px_rgba(45,212,191,0.8)]"
                />

                {/* Animated Brand Typography */}
                <motion.div
                  animate={isZoomingIn ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 flex flex-col items-center"
                >
                  <div className="flex items-baseline gap-1 font-serif">
                    <span className="text-xl sm:text-2xl font-bold italic text-cyan-300 drop-shadow-[0_0_12px_rgba(45,212,191,0.6)]">
                      Ai
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-[#0088ff] drop-shadow-[0_0_12px_rgba(0,136,255,0.6)] ml-0.5">
                      Connect
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-cyan-300 drop-shadow-[0_0_14px_rgba(45,212,191,0.8)]">
                      X
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Telemetry & Progress Bar */}
          <motion.div
            animate={isZoomingIn ? { opacity: 0, y: 25, scale: 0.95 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center mt-3 z-30 max-w-sm w-full"
          >
            {/* High-Tech Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-2 p-0.5 border border-white/10 overflow-hidden relative shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-fuchsia-400 animate-shimmer-flow transition-[width] duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Telemetry Counter */}
            <div className="flex items-center justify-between mt-2.5 font-mono text-[11px] text-white/50">
              <span>07_NEURAL_UPLINK</span>
              <span className="text-teal-300 font-semibold text-xs">{progress}%</span>
              <span>SYNCHRONIZED</span>
            </div>

            {/* Quick Skip Button */}
            <button
              onClick={handleSkip}
              className="mt-3 text-[11px] font-mono text-white/40 hover:text-white/90 underline-offset-4 hover:underline transition-colors cursor-pointer"
            >
              Skip loading &amp; open now →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
