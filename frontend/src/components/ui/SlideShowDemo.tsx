"use client";

import SlideShow, { type SlideItem } from "@/components/ui/SlideShow";

/**
 * 5 Pre-configured Showcase Slides
 */
const SAMPLE_SLIDES: SlideItem[] = [
  {
    id: "01",
    tagline: "Frontier AI Systems",
    title: "Autonomous Intelligence",
    subtext:
      "Architecting hyper-scale multi-agent reasoning graphs engineered for real-time edge orchestration and dynamic self-healing telemetry.",
    ctaText: "Explore Architecture",
    ctaLink: "/projects",
    bgImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop",
  },
  {
    id: "02",
    tagline: "Collaborative Frontier",
    title: "Neural Synergy Matrix",
    subtext:
      "Connecting industry leaders with student innovators across next-generation cognitive computing labs at Universal AI University.",
    ctaText: "Industry Voices",
    ctaLink: "/industry-voices",
    bgImage:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2200&auto=format&fit=crop",
  },
  {
    id: "03",
    tagline: "Spatial Reality",
    title: "Volumetric Cybernetics",
    subtext:
      "Immersion redefined through low-latency WebGL rasterization, continuous 3D spatial cylinder mechanics, and frictionless motion.",
    ctaText: "Launch 3D Gallery",
    ctaLink: "/gallery-preview",
    bgImage:
      "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=2187&auto=format&fit=crop",
  },
  {
    id: "04",
    tagline: "Quantum Synthesis",
    title: "Algorithmic Precision",
    subtext:
      "Pushing computational boundaries with self-healing distributed pipelines and deterministic state machines.",
    ctaText: "Our Team",
    ctaLink: "/team",
    bgImage:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2274&auto=format&fit=crop",
  },
  {
    id: "05",
    tagline: "The Future of Connect",
    title: "Ecosystem Horizon",
    subtext:
      "A unified collective of visionary student engineers shaping tomorrow's human-AI collaboration paradigms.",
    ctaText: "Join The Initiative",
    ctaLink: "/contact",
    bgImage:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2340&auto=format&fit=crop",
  },
];

export default function SlideShowDemo() {
  return (
    <div className="relative w-full h-screen bg-[#07080d]">
      <SlideShow
        slides={SAMPLE_SLIDES}
        accentColor="#00f0ff" // Can be '#00f0ff', '#39ff14', '#ff0055', or 'var(--neon-accent)'
      />
    </div>
  );
}
export { SlideShow, SAMPLE_SLIDES };
