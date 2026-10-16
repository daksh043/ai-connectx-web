import { useState, useEffect } from "react";
import { X, Menu, Sun, Moon } from "lucide-react";
import { useClubTheme } from "../../contexts/ClubThemeContext";

interface ClubNavbarProps {
  onOpenJoin: () => void;
}

export default function ClubNavbar({ onOpenJoin }: ClubNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { isDark, toggleTheme } = useClubTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "conclave", "events", "projects", "magazine", "team", "gallery", "about"];
      let current = "home";

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 120) {
            current = sectionId;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "HOME", target: "home" },
    { label: "ABOUT", target: "about" },
    { label: "EVENTS", target: "events" },
    { label: "TEAM", target: "team" },
    { label: "MAGAZINE", target: "magazine" },
    { label: "PROJECTS", target: "projects" },
  ];

  return (
    <>
      {/* ─── Architectural Top Grid Header (Page 1) ─── */}
      <header
        className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 ${
          isDark
            ? "bg-[#121315]/95 backdrop-blur-md border-[#2B2D33] text-white"
            : "bg-white/95 backdrop-blur-md border-[#E5E7EB] text-black"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-6">
          {/* Left: AI Club Minimalist Logo & Title */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => scrollTo("home")}
              className="group flex items-center gap-3 text-left focus:outline-none"
            >
              {/* Abstract Monoline Logo Roundel */}
              <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center p-1 transition-transform group-hover:rotate-12">
                <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-current stroke-2">
                  <circle cx="20" cy="20" r="16" />
                  <path d="M12 28 L20 12 L28 28" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 23 L25 23" />
                  <circle cx="20" cy="9" r="2" fill="currentColor" />
                </svg>
              </div>
              <span className="font-extrabold text-2xl sm:text-3xl tracking-tighter uppercase font-display">
                AI CLUB
              </span>
            </button>
            <span className="hidden md:inline-block text-xs uppercase tracking-widest font-mono text-[#CEFD46] bg-black px-2.5 py-1 rounded">
              VIT Bhopal
            </span>
          </div>

          {/* Center-Right: Club Mission Subtitle from PDF Page 1 */}
          <div className="hidden lg:block max-w-xl text-right">
            <p
              className={`text-[12.5px] leading-relaxed line-clamp-2 ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              The AI Club at VIT Bhopal is a hub for innovators, creators, and dreamers.
              From ideathons to annual conclaves, we drive the frontier of Artificial Intelligence
              through learning, collaboration, and action.
            </p>
          </div>

          {/* Right Action Controls: Theme Toggle & Big MENU Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`p-2 rounded-lg border transition-colors ${
                isDark
                  ? "border-[#2B2D33] hover:border-[#CEFD46] text-zinc-300 hover:text-white"
                  : "border-zinc-200 hover:border-black text-zinc-600 hover:text-black"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 text-[#CEFD46]" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Quick Register Pill */}
            <button
              onClick={onOpenJoin}
              className="hidden sm:flex items-center gap-2 bg-[#CEFD46] text-black font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-full hover:bg-[#d6ff4d] transition-all hover:scale-105 active:scale-95"
            >
              <span>Join Club</span>
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            </button>

            {/* Exact MENU Button from PDF Page 1 */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex items-center gap-2 px-4 py-2 font-mono font-bold text-sm tracking-wider uppercase border-2 transition-all cursor-pointer ${
                menuOpen
                  ? "bg-[#CEFD46] text-black border-[#CEFD46]"
                  : isDark
                  ? "border-zinc-300 text-white hover:border-[#CEFD46] hover:text-[#CEFD46]"
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              <span>MENU</span>
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Full-Screen Slide-in Menu Drawer (Pages 2, 3, 4) ─── */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Menu Container (matching dark dot matrix card from Page 2) */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-md sm:max-w-lg bg-ai-dots-dark border-l border-[#2B2D33] p-8 sm:p-12 flex flex-col justify-between shadow-2xl transition-transform duration-500 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header row with close button */}
          <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
            <span className="text-xs font-mono uppercase tracking-widest text-[#CEFD46]">
              Navigation // AI Club
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#CEFD46] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links with Square Lime Bullets and Horizontal Strike Highlighter */}
          <nav className="my-auto py-8 space-y-6 sm:space-y-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.target;
              return (
                <div key={item.label} className="flex items-center gap-4">
                  {/* Neon Lime Square Bullet from Page 2 */}
                  <span className="w-3.5 h-3.5 bg-[#CEFD46] shrink-0" />

                  {/* Menu text with signature strike-through bar on hover/active (Page 3 & 4) */}
                  <button
                    onClick={() => scrollTo(item.target)}
                    className={`ai-menu-link text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-display uppercase text-left transition-colors ${
                      isActive ? "active text-white" : "text-zinc-200 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="ai-strike-bar" />
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Footer Social Links in 2 Columns (Page 2) */}
          <div className="pt-8 border-t border-zinc-800">
            <div className="grid grid-cols-2 gap-y-3 font-sans text-sm sm:text-base text-zinc-300">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#CEFD46] transition-colors flex items-center gap-2"
              >
                <span>Instagram</span>
                <span className="text-xs opacity-50">↗</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#CEFD46] transition-colors flex items-center gap-2"
              >
                <span>Linkedin</span>
                <span className="text-xs opacity-50">↗</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#CEFD46] transition-colors flex items-center gap-2"
              >
                <span>Github</span>
                <span className="text-xs opacity-50">↗</span>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#CEFD46] transition-colors flex items-center gap-2"
              >
                <span>Discord</span>
                <span className="text-xs opacity-50">↗</span>
              </a>
            </div>

            <p className="mt-6 text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
              © 2024 AI Club - VIT Bhopal
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
