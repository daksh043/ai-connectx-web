"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type Lenis from "lenis";

interface AskPhillNavbarProps {
  brandName?: string;
  themeColor?: string; // Cyan #00b4d8
  accentColor?: string;
}

interface NavLinkItem {
  label: string;
  href: string;
  sectionId?: string;
}

// Ordered slides & pages so Prev/Next works seamlessly across landing slides and subpages
const SITE_SLIDES: NavLinkItem[] = [
  { label: "Home", href: "/#hero", sectionId: "hero" },
  { label: "Mission", href: "/#text-reveal", sectionId: "text-reveal" },
  { label: "Chronicles", href: "/#gallery", sectionId: "gallery" },
  { label: "Our Team", href: "/#team", sectionId: "team" },
  { label: "Projects", href: "/projects" },
  { label: "Voices", href: "/industry-voices" },
  { label: "Contact", href: "/contact" },
];

const DEFAULT_LINKS: NavLinkItem[] = [
  { label: "Home", href: "/#hero" },
  { label: "Mission", href: "/#text-reveal" },
  { label: "Chronicles", href: "/#gallery" },
  { label: "Our Team", href: "/team" },
  { label: "Featured Projects", href: "/projects" },
  { label: "Industry Voices", href: "/industry-voices" },
  { label: "Contact", href: "/contact" },
];

// Exact spring physics from Ask Phill (ap.main.js: stiffness 400, damping 24 & 29)
const springPill = {
  type: "spring" as const,
  stiffness: 400,
  damping: 24,
  mass: 1,
};

const springCircle = {
  type: "spring" as const,
  stiffness: 400,
  damping: 29,
  mass: 1,
};

// Bouncy hover physics for Contact and Logo buttons (ap.main.js: stiffness 425, damping 18)
const springBouncy = {
  type: "spring" as const,
  stiffness: 425,
  damping: 18,
  mass: 1,
};

export default function AskPhillNavbar({
  brandName = "AI ConnectX",
  themeColor = "#00b4d8",
  accentColor = "#050507",
}: AskPhillNavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isHoveredPreview, setIsHoveredPreview] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const isLandingRoute = location.pathname === "/" || location.pathname === "/club";

  // Active path index for expanded menu highlight
  const currentMenuIdx = DEFAULT_LINKS.findIndex((item) => {
    const basePath = item.href.split("#")[0] || "/";
    if (isLandingRoute && basePath === "/") {
      const slideLabel = SITE_SLIDES[activeSlideIdx]?.label;
      return item.label === slideLabel;
    }
    if (basePath !== "/" && location.pathname.startsWith(basePath)) return true;
    return false;
  });

  const activeIdx =
    hoveredIdx !== null ? hoveredIdx : currentMenuIdx !== -1 ? currentMenuIdx : 0;

  // Detect light background sections and track the currently visible slide
  useEffect(() => {
    let rafId: number;

    const checkViewportState = () => {
      const headerY = 40;
      const vh = window.innerHeight;
      let overLight = false;

      const gallery = document.getElementById("gallery");
      const team = document.getElementById("team");

      if (gallery) {
        const rect = gallery.getBoundingClientRect();
        if (rect.top <= headerY && rect.bottom >= headerY) {
          overLight = true;
        }
      }

      if (!overLight && team) {
        const rect = team.getBoundingClientRect();
        if (rect.top <= headerY && rect.bottom >= headerY) {
          overLight = true;
        }
      }

      if (!overLight && typeof document.elementFromPoint === "function") {
        const el = document.elementFromPoint(window.innerWidth / 2, headerY);
        if (el?.closest("#gallery, #team, .bg-\\[\\#FAF6EE\\], [data-theme='cream']")) {
          overLight = true;
        }
      }

      setIsLightSection((prev) => (prev !== overLight ? overLight : prev));

      // Determine active slide index
      if (isLandingRoute) {
        const midY = vh * 0.45;
        const contactEl = document.getElementById("contact");
        if (contactEl) {
          const r = contactEl.getBoundingClientRect();
          if (r.top <= midY && r.bottom >= midY) {
            setActiveSlideIdx(6);
            return;
          }
        }
        const slideSections: [string, number][] = [
          ["team", 3],
          ["gallery", 2],
          ["text-reveal", 1],
          ["hero", 0],
        ];
        for (const [id, slideIndex] of slideSections) {
          const el = document.getElementById(id);
          if (el) {
            const r = el.getBoundingClientRect();
            if (r.top <= midY && r.bottom >= midY) {
              setActiveSlideIdx(slideIndex);
              return;
            }
          }
        }
      } else {
        const p = location.pathname;
        if (p.startsWith("/projects") || p.startsWith("/featured-projects")) {
          setActiveSlideIdx(4);
        } else if (p.startsWith("/industry-voices") || p.startsWith("/voices") || p.startsWith("/testimonials")) {
          setActiveSlideIdx(5);
        } else if (p.startsWith("/contact")) {
          setActiveSlideIdx(6);
        } else if (p.startsWith("/team") || p.startsWith("/our-team") || p.startsWith("/cylinder") || p.startsWith("/kinetix") || p.startsWith("/reel-wall")) {
          setActiveSlideIdx(3);
        } else if (p.startsWith("/gallery")) {
          setActiveSlideIdx(2);
        } else {
          setActiveSlideIdx(0);
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkViewportState);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    checkViewportState();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isLandingRoute, location.pathname]);

  // Close when tapping or clicking outside
  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsHoveredPreview(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  // Ask Phill scroll observer: hide mobile menu button when footer is visible
  useEffect(() => {
    const footer = document.querySelector("#footer") || document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleNavigateTo = useCallback(
    (href: string, e?: React.MouseEvent) => {
      setIsOpen(false);
      setIsHoveredPreview(false);

      const [rawPath, hashPart] = href.split("#");
      const targetPath = rawPath || "/";

      if (hashPart && isLandingRoute && targetPath === "/") {
        e?.preventDefault();
        const resolvedId = hashPart === "chronicles" ? "gallery" : hashPart;
        const targetEl = document.getElementById(resolvedId);
        const lenis = (window as unknown as { lenis?: Lenis }).lenis;

        if (targetEl) {
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: 0, duration: 1.15 });
          } else {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
          window.history.replaceState(null, "", `/#${resolvedId}`);
        } else if (resolvedId === "hero") {
          if (lenis) {
            lenis.scrollTo(0, { duration: 1.0 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
        return;
      }

      if (e) e.preventDefault();
      navigate(href);
    },
    [isLandingRoute, navigate]
  );

  const handleStepSlide = useCallback(
    (dir: -1 | 1) => {
      const nextIdx = (activeSlideIdx + dir + SITE_SLIDES.length) % SITE_SLIDES.length;
      const slide = SITE_SLIDES[nextIdx];
      handleNavigateTo(slide.href);
    },
    [activeSlideIdx, handleNavigateTo]
  );

  const currentSlide = SITE_SLIDES[activeSlideIdx] ?? SITE_SLIDES[0];

  return (
    <>
      {/* ------------------------------------------------------------------------- */}
      {/* 1. TOP CENTER: LOGO (Ask Phill layout: dynamic difference / normal mode)   */}
      {/* ------------------------------------------------------------------------- */}
      <header
        data-navbar="true"
        className="pointer-events-none fixed left-1/2 top-[calc(env(safe-area-inset-top,0px)+1rem)] z-40 flex -translate-x-1/2 justify-center transition-colors duration-300 lg:top-7"
        style={{ mixBlendMode: isLightSection ? "normal" : "difference" }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          transition={springBouncy}
          className="pointer-events-auto"
        >
          <Link
            to="/"
            onClick={(e) => {
              if (isLandingRoute) {
                handleNavigateTo("/#hero", e);
              }
            }}
            className="flex items-center gap-2 select-none"
            aria-label={brandName}
          >
            <span
              className={`font-extrabold tracking-tighter text-xl sm:text-2xl uppercase font-sans transition-colors duration-200 ${
                isLightSection
                  ? "text-[#00b4d8] drop-shadow-[0_0_16px_rgba(0,180,216,0.4)]"
                  : "text-white"
              }`}
            >
              {brandName}
            </span>
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              className="inline-block h-2 w-2 rounded-full transition-colors duration-200"
              style={{ backgroundColor: themeColor }}
            />
          </Link>
        </motion.div>
      </header>

      {/* ------------------------------------------------------------------------- */}
      {/* 2. TOP RIGHT: SLIDE SWITCHER + CONTACT PILL (Desktop / Tablet Landscape)  */}
      {/* ------------------------------------------------------------------------- */}
      <div
        data-navbar="true"
        className="fixed right-5 top-[calc(env(safe-area-inset-top,0px)+1rem)] z-40 hidden lg:flex items-center gap-2.5 lg:top-6"
      >
        {/* Slide Switcher Pill */}
        <div className="flex h-10 items-center gap-1 rounded-full bg-[#050507]/80 backdrop-blur-md border border-cyan-400/35 px-1.5 shadow-[0px_4px_18px_rgba(0,0,0,0.3)] select-none">
          <button
            type="button"
            onClick={() => handleStepSlide(-1)}
            aria-label="Previous slide"
            title="Previous slide"
            className="flex h-7 w-7 items-center justify-center rounded-full text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 active:scale-90 transition-all cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className="px-2 text-xs font-mono font-bold uppercase tracking-wider text-white hover:text-cyan-300 transition-colors cursor-pointer min-w-[82px] text-center"
            title="Click to open navigation menu"
          >
            {currentSlide.label}
          </button>
          <button
            type="button"
            onClick={() => handleStepSlide(1)}
            aria-label="Next slide"
            title="Next slide"
            className="flex h-7 w-7 items-center justify-center rounded-full text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 active:scale-90 transition-all cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          transition={springBouncy}
        >
          <Link
            to="/contact"
            className="relative flex h-10 items-center justify-center rounded-full px-5 font-bold tracking-tight text-slate-950 shadow-[0px_4px_18px_rgba(0,180,216,0.35)] transition-shadow duration-300 hover:shadow-[0px_6px_24px_rgba(0,180,216,0.5)] select-none"
            style={{ backgroundColor: themeColor }}
          >
            <span className="text-[1.125rem] leading-none">Contact</span>
          </Link>
        </motion.div>
      </div>

      {/* ------------------------------------------------------------------------- */}
      {/* 3. INTERACTIVE EXPANDING PILL MENU + MOBILE SLIDE CONTROLS                */}
      {/* ------------------------------------------------------------------------- */}
      <div
        ref={containerRef}
        data-navbar="true"
        onMouseLeave={() => {
          setIsHoveredPreview(false);
          setHoveredIdx(null);
          if (window.innerWidth >= 1024) {
            setIsOpen(false);
          }
        }}
        className={`fixed isolate z-50 transition-transform duration-300 ease-out ${
          isFooterVisible ? "translate-y-[200%] lg:translate-y-0" : "translate-y-0"
        } bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] left-1/2 -translate-x-1/2 lg:bottom-auto lg:left-6 lg:top-6 lg:translate-x-0`}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <div className="flex items-center gap-2">
              {/* Mobile Quick Prev Slide Button */}
              <button
                type="button"
                onClick={() => handleStepSlide(-1)}
                aria-label="Previous slide"
                className="flex lg:hidden h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#050507]/90 border border-cyan-400/40 text-cyan-300 shadow-[0px_4px_20px_rgba(0,0,0,0.45)] backdrop-blur-md active:scale-90 transition-transform cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* COLLAPSED / HOVER-PREVIEW STATE */}
              <motion.button
                key="collapsed-button"
                type="button"
                onClick={() => setIsOpen(true)}
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) {
                    setIsHoveredPreview(true);
                  }
                }}
                onMouseLeave={() => setIsHoveredPreview(false)}
                animate={{
                  width: isHoveredPreview ? 168 : 124,
                }}
                transition={springPill}
                className="relative flex h-[42px] items-center rounded-full p-1 text-slate-950 font-bold shadow-[0px_4px_22px_rgba(0,180,216,0.4)] overflow-hidden select-none cursor-pointer"
                style={{ backgroundColor: themeColor }}
                aria-expanded={isOpen}
                aria-label="Open Navigation Menu"
              >
                <motion.div
                  animate={{
                    x: isHoveredPreview ? 40 : 0,
                    rotate: isHoveredPreview ? 90 : 0,
                  }}
                  transition={springCircle}
                  className="relative flex aspect-square h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                  style={{ backgroundColor: accentColor }}
                >
                  <svg
                    className="h-4 w-4"
                    style={{ color: themeColor }}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 8H22M2 16H22" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                </motion.div>

                <motion.div
                  animate={{
                    opacity: isHoveredPreview ? 0 : 1,
                    x: isHoveredPreview ? 18 : 0,
                  }}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                  className="w-full pr-2 text-center text-[1.125rem] font-bold tracking-tight text-slate-950"
                >
                  Menu
                </motion.div>
              </motion.button>

              {/* Mobile Quick Next Slide Button */}
              <button
                type="button"
                onClick={() => handleStepSlide(1)}
                aria-label="Next slide"
                className="flex lg:hidden h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#050507]/90 border border-cyan-400/40 text-cyan-300 shadow-[0px_4px_20px_rgba(0,0,0,0.45)] backdrop-blur-md active:scale-90 transition-transform cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : (
            /* EXPANDED MENU DRAWER with Height Expansion & Sliding Link Cursor */
            <motion.div
              key="expanded-menu"
              initial={{ height: 42, width: 124, opacity: 0.8 }}
              animate={{ height: "auto", width: 184, opacity: 1 }}
              exit={{ height: 42, width: 124, opacity: 0 }}
              transition={springPill}
              data-lenis-prevent
              className="relative max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-[26px] p-2 text-slate-950 shadow-[0px_12px_40px_rgba(0,0,0,0.55)] select-none"
              style={{ backgroundColor: themeColor }}
            >
              {/* Header with Close Button on Mobile */}
              <div className="flex items-center justify-between pb-1.5 pt-0.5 px-2 lg:hidden">
                <span className="text-xs font-bold tracking-wider uppercase opacity-75 text-slate-900">
                  Slides &amp; Pages
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-black/10 p-1 text-slate-950 hover:bg-black/20 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Links list with smooth physics-backed sliding cursor */}
              <nav className="relative flex flex-col py-1">
                <motion.span
                  aria-hidden="true"
                  layoutId="askphill-active-cursor"
                  animate={{
                    y: activeIdx * 38,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 32,
                  }}
                  className="pointer-events-none absolute left-1 right-1 h-[38px] rounded-full bg-[#050507] shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                  style={{ top: "4px" }}
                />

                {DEFAULT_LINKS.map((item, idx) => {
                  const isHoveredOrActive = activeIdx === idx;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onClick={(e) => handleNavigateTo(item.href, e)}
                      className={`relative z-10 flex h-[38px] w-full items-center justify-center text-center text-[15px] font-bold leading-none tracking-tight transition-colors duration-150 ${
                        isHoveredOrActive ? "text-cyan-300" : "text-slate-950 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Quick Prev / Next Bar inside Menu */}
              <div className="mt-1.5 flex items-center justify-between gap-1.5 border-t border-slate-950/20 pt-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => handleStepSlide(-1)}
                  className="flex-1 flex items-center justify-center gap-1 rounded-full bg-[#050507] py-1.5 text-xs font-bold text-cyan-400 active:scale-95 transition-transform"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => handleStepSlide(1)}
                  className="flex-1 flex items-center justify-center gap-1 rounded-full bg-[#050507] py-1.5 text-xs font-bold text-cyan-400 active:scale-95 transition-transform"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
