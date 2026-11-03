"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

interface AskPhillNavbarProps {
  brandName?: string;
  themeColor?: string; // Cyan #00b4d8
  accentColor?: string;
}

interface NavLinkItem {
  label: string;
  href: string;
}

const DEFAULT_LINKS: NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Team", href: "/team" },
  { label: "Featured Projects", href: "/projects" },
  { label: "Industry Voices", href: "/industry-voices" },
  { label: "Club Chronicles", href: "/#chronicles" },
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
  const [isOpen, setIsOpen] = useState(false);
  const [isHoveredPreview, setIsHoveredPreview] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Active path index
  const currentActiveIdx = DEFAULT_LINKS.findIndex((item) => {
    if (item.href === "/" && location.pathname === "/") return true;
    if (item.href !== "/" && location.pathname.startsWith(item.href)) return true;
    return false;
  });

  const activeIdx = hoveredIdx !== null ? hoveredIdx : (currentActiveIdx !== -1 ? currentActiveIdx : 0);

  // Detect whether the navbar is currently scrolling over a light / cream background section
  useEffect(() => {
    let rafId: number;

    const checkLight = () => {
      const headerY = 40;
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
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkLight);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    checkLight();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsHoveredPreview(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  return (
    <>
      {/* ------------------------------------------------------------------------- */}
      {/* 1. TOP CENTER: LOGO (Ask Phill layout: dynamic difference / normal mode)   */}
      {/* ------------------------------------------------------------------------- */}
      <header
        className="pointer-events-none fixed left-1/2 top-4 z-40 flex -translate-x-1/2 justify-center transition-colors duration-300 lg:top-7"
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
      {/* 2. TOP RIGHT: CONTACT PILL BUTTON (Ask Phill layout + BouncyBackground)   */}
      {/* ------------------------------------------------------------------------- */}
      <div className="fixed right-5 top-4 z-40 hidden lg:block lg:top-6">
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
      {/* 3. INTERACTIVE EXPANDING PILL MENU (Ask Phill exact kinematics)           */}
      {/* ------------------------------------------------------------------------- */}
      <div
        ref={containerRef}
        onMouseLeave={() => {
          setIsHoveredPreview(false);
          setHoveredIdx(null);
          // On desktop, collapsing on leave matches Ask Phill's menu pattern
          if (window.innerWidth >= 1024) {
            setIsOpen(false);
          }
        }}
        className={`fixed isolate z-50 transition-transform duration-300 ease-out ${
          isFooterVisible ? "translate-y-[200%] lg:translate-y-0" : "translate-y-0"
        } bottom-5 left-1/2 -translate-x-1/2 lg:bottom-auto lg:left-6 lg:top-6 lg:translate-x-0`}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* COLLAPSED / HOVER-PREVIEW STATE: Width expands 121px -> 161px */
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
              {/* Rotating / Translating circle badge: 0px -> 40px, 0deg -> 90deg */}
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

              {/* Label that fades / shifts out on hover expansion */}
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
          ) : (
            /* EXPANDED MENU DRAWER with Height Expansion & Sliding Link Cursor */
            <motion.div
              key="expanded-menu"
              initial={{ height: 42, width: 124, opacity: 0.8 }}
              animate={{ height: "auto", width: 176, opacity: 1 }}
              exit={{ height: 42, width: 124, opacity: 0 }}
              transition={springPill}
              className="relative overflow-hidden rounded-[26px] p-2 text-slate-950 shadow-[0px_12px_40px_rgba(0,0,0,0.55)] select-none"
              style={{ backgroundColor: themeColor }}
            >
              {/* Header with Close Button on Mobile */}
              <div className="flex items-center justify-between pb-1.5 pt-0.5 px-2 lg:hidden">
                <span className="text-xs font-bold tracking-wider uppercase opacity-75 text-slate-900">
                  Navigation
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
                {/* Ask Phill signature link cursor indicator */}
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
                      onClick={() => setIsOpen(false)}
                      className={`relative z-10 flex h-[38px] w-full items-center justify-center text-center text-[16px] font-bold leading-none tracking-tight transition-colors duration-150 ${
                        isHoveredOrActive ? "text-cyan-300" : "text-slate-950 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="mt-2 border-t border-slate-950/20 pt-2 text-center lg:hidden">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-full bg-[#050507] py-2 text-center text-sm font-bold text-cyan-400 active:scale-95 transition-transform"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
