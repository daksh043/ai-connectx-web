import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
  Menu,
} from "lucide-react";

interface GlassyNavbarProps {
  onNavClick?: (sectionId: string) => void;
  onLoginTrigger?: () => void;
}

export interface DropdownItem {
  title: string;
  desc?: string;
  target?: string;
  href?: string;
  badge?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  hasChevron: boolean;
  isOpenUp?: boolean;
  items: DropdownItem[];
}

export default function GlassyNavbar({
  onNavClick,
  onLoginTrigger,
}: GlassyNavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  // Keep a ref to avoid stale state in scroll listeners
  const scrolledRef = useRef(false);
  const tickingRef = useRef(false);

  // 120 FPS High-Performance Passive Scroll Listener
  // Only updates boolean React state when scroll threshold crosses (prevents 99% of useless re-renders)
  useEffect(() => {
    const onScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 25;
          if (isScrolled !== scrolledRef.current) {
            scrolledRef.current = isScrolled;
            setScrolled(isScrolled);
          }
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // High-performance IntersectionObserver for active section (Zero layout thrashing, 0 getBoundingClientRect on scroll)
  useEffect(() => {
    const sectionIds = [
      { id: "hero", label: "Home" },
      { id: "text-reveal", label: "About" },
      { id: "horizontal-scroll", label: "Tracks" },
      { id: "team", label: "Team" },
      { id: "contact", label: "Contact" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = sectionIds.find((s) => s.id === entry.target.id);
            if (match) {
              setActiveSection(match.label);
            }
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard shortcut (Escape) to close open menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLinkClick = useCallback((item: { target?: string; href?: string }) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    if (item.href) {
      navigate(item.href);
      return;
    }

    if (item.target) {
      onNavClick?.(item.target);
      const el = document.getElementById(item.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        if (location.pathname !== "/") {
          navigate(`/#${item.target}`);
        }
      }
    }
  }, [navigate, location.pathname, onNavClick]);

  // Max 5 Focused Links in Menu (Directives Compliant)
  const menuStructure: MenuItem[] = [
    {
      id: "Home",
      label: "Home",
      hasChevron: true,
      isOpenUp: true,
      items: [
        { title: "Hero Landing", desc: "Frontier AI & Neural Canvas", target: "hero" },
        { title: "Overview & Mission", desc: "Bridging Students With Industry", target: "text-reveal" },
      ],
    },
    {
      id: "About",
      label: "About",
      hasChevron: true,
      items: [
        { title: "Strategic Mission & Vision", desc: "Empowering student AI creators", href: "/overview" },
        { title: "Universal AI Community", desc: "Collaborative labs and cohorts", target: "text-reveal" },
      ],
    },
    {
      id: "Tracks",
      label: "Tracks",
      hasChevron: true,
      items: [
        { title: "AI Engineering × Agentic Systems", desc: "Expert masterclass by Dipan Mehta", target: "horizontal-scroll" },
        { title: "Live Industry Projects", desc: "Real enterprise deliverables & internships", target: "horizontal-scroll" },
        { title: "3D Spatial Helix", desc: "Interactive Spatial Double-Helix", href: "/spiral-3d", badge: "3D" },
      ],
    },
    {
      id: "Team",
      label: "Team",
      hasChevron: true,
      items: [
        { title: "Core Faculty & Lead Team", desc: "Patron Pranav More & President Daksh", target: "team", href: "/team" },
        { title: "Leadership Directory", desc: "Operations, tech, and student leads", href: "/team" },
      ],
    },
    {
      id: "Contact",
      label: "Contact",
      hasChevron: true,
      items: [
        { title: "WhatsApp Direct Desk", desc: "Fast direct transmission line", target: "contact" },
        { title: "Join AI ConnectX", desc: "Become a member or partner", target: "contact", href: "/contact" },
      ],
    },
  ];

  return (
    <>
      {/* ─── Floating Glassy Navbar Container (GPU Accelerated, Zero-Lag) ─── */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none select-none">
        <div
          className={`pointer-events-auto relative flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transform-gpu transition-all duration-200 ${
            scrolled
              ? "bg-[#0a0b10]/90 backdrop-blur-xl border border-cyan-400/30 shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(34,211,238,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)]"
              : "bg-[#0c0d12]/75 backdrop-blur-md border border-white/12 shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]"
          }`}
        >
          {/* ─── Left: AI ConnectX Logo Emblem & Brand Typography ─── */}
          <button
            onClick={() => handleLinkClick({ target: "hero" })}
            className="flex items-center gap-2 hover:opacity-95 transition-all cursor-pointer group"
            title="AI ConnectX - Home"
          >
            <img
              src="/ai-connectx-logo-transparent.png"
              alt="AI ConnectX Official Logo"
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="flex items-baseline font-sans font-bold text-sm sm:text-base tracking-tight select-none">
              <span className="text-white group-hover:text-cyan-200 transition-colors">AI</span>
              <span className="text-[#0088ff] ml-1">Connect</span>
              <span className="text-cyan-400 ml-0.5">X</span>
            </div>

            {/* Universal AI University Emblem */}
            <div className="hidden sm:block h-4 w-[1px] bg-white/20 mx-0.5" />
            <img
              src="/universal-ai-university-logo.png"
              alt="Universal AI University"
              className="hidden sm:block h-4.5 rounded px-1.5 py-0.5 bg-white/95 object-contain shrink-0"
              title="Universal AI University"
            />

            {/* Active Section Tag on Scroll */}
            {scrolled && (
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider transition-all ml-1">
                {activeSection}
              </span>
            )}
          </button>

          {/* ─── Center: Navigation Links ─── */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {menuStructure.map((menu) => {
              const isActive = activeSection === menu.id;
              const isDropdownOpen = activeDropdown === menu.id;

              return (
                <div
                  key={menu.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(menu.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => {
                      if (menu.id === "Home") {
                        handleLinkClick({ target: "hero" });
                      } else {
                        setActiveDropdown(isDropdownOpen ? null : menu.id);
                      }
                    }}
                    className={`relative flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? "text-white font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] bg-white/[0.06]"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    <span>{menu.label}</span>

                    {/* Chevron (Up caret for Home like in reference image, down chevron for others) */}
                    {menu.id === "Home" ? (
                      <ChevronUp className="w-3.5 h-3.5 opacity-80" />
                    ) : (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-150 opacity-70 ${
                          isDropdownOpen ? "rotate-180 text-cyan-300" : ""
                        }`}
                      />
                    )}

                    {/* Active Underline Indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    )}
                  </button>

                  {/* Glassy Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[260px] animate-in fade-in duration-150">
                      <div className="p-2 rounded-2xl bg-[#0c0d15]/95 backdrop-blur-xl border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)] flex flex-col gap-1">
                        {menu.items.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleLinkClick(item)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-white/[0.08] transition-colors flex items-start justify-between gap-3 group/item cursor-pointer"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-white group-hover/item:text-cyan-200 transition-colors">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              {item.desc && (
                                <p className="text-[11px] text-white/50 group-hover/item:text-white/70 line-clamp-1 mt-0.5">
                                  {item.desc}
                                </p>
                              )}
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover/item:text-white group-hover/item:translate-x-0.5 transition-transform mt-1" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ─── Right: Log in Button + Mobile Hamburger ─── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* "Log in" Modern Geometric Button */}
            <button
              onClick={() => {
                if (onLoginTrigger) {
                  onLoginTrigger();
                } else {
                  navigate("/login");
                }
              }}
              className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.18] border border-white/[0.14] hover:border-white/30 text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Log in
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-white/80 hover:text-white cursor-pointer ml-1"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Drawer ─── */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-4 right-4 z-50 rounded-2xl bg-[#0c0d14]/95 backdrop-blur-xl border border-white/15 p-5 shadow-2xl lg:hidden flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <img
                src="/ai-connectx-logo-transparent.png"
                alt="AI ConnectX"
                className="w-5 h-5 object-contain"
              />
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider font-semibold">
                AI CONNECTX
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {menuStructure.map((menu) => (
            <div key={menu.id} className="flex flex-col gap-1">
              <button
                onClick={() => {
                  if (menu.id === "Home") {
                    handleLinkClick({ target: "hero" });
                  } else {
                    setActiveDropdown(activeDropdown === menu.id ? null : menu.id);
                  }
                }}
                className="flex items-center justify-between py-2 text-sm text-white/90 font-medium hover:text-white"
              >
                <span>{menu.label}</span>
                <ChevronDown
                  className={`w-4 h-4 text-white/50 transition-transform ${
                    activeDropdown === menu.id ? "rotate-180 text-cyan-300" : ""
                  }`}
                />
              </button>

              {activeDropdown === menu.id && (
                <div className="pl-3 py-1 flex flex-col gap-1.5 border-l border-cyan-400/30 ml-2">
                  {menu.items.map((sub, i) => (
                    <button
                      key={i}
                      onClick={() => handleLinkClick(sub)}
                      className="text-left text-xs text-white/70 hover:text-cyan-200 py-1"
                    >
                      {sub.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-3 border-t border-white/10 flex">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onLoginTrigger) onLoginTrigger();
                else navigate("/login");
              }}
              className="w-full py-2.5 rounded-xl bg-cyan-400/20 border border-cyan-400/40 text-xs text-cyan-300 font-semibold text-center cursor-pointer hover:bg-cyan-400/30 transition-colors"
            >
              Log in
            </button>
          </div>
        </div>
      )}
    </>
  );
}
