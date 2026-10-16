import { ArrowUpRight, Users, Trophy, Mic, Award } from "lucide-react";
import { useClubTheme } from "../../contexts/ClubThemeContext";
import FloatingScrollBadge from "./FloatingScrollBadge";

export default function ClubAbout() {
  const { isDark } = useClubTheme();

  const metrics = [
    { value: "280+", label: "Members Community", icon: Users },
    { value: "15+", label: "Events Conducted", icon: Trophy },
    { value: "35+", label: "Speakers Invited", icon: Mic },
    { value: "2+", label: "Competitions", icon: Award },
  ];

  return (
    <section
      id="about"
      className={`relative py-24 sm:py-32 px-4 sm:px-8 border-b transition-colors duration-300 ${
        isDark
          ? "bg-[#18191B] border-[#2B2D33] text-white bg-ai-dots-dark"
          : "bg-white border-[#E5E7EB] text-black bg-ai-dots-light"
      }`}
    >
      <div className="max-w-[1600px] mx-auto">
        
        {/* Top Header matching Page 19 */}
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-zinc-800">
          <h2 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight">
            ABOUT
          </h2>
          <div className="flex items-center gap-2 font-mono text-xs text-[#CEFD46] bg-black px-3 py-1.5 rounded-full border border-zinc-800">
            <span>AI CLUB // VIT BHOPAL</span>
          </div>
        </div>

        {/* ─── Part 1: Top Hero Card & Community Grid (Page 19) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          
          {/* Left Dark Card: "A place to share one's Passion for AI" */}
          <div className="lg:col-span-6 bg-[#202226] text-white rounded-3xl p-8 sm:p-12 border border-zinc-700/60 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Top row with 4-square icon & menu badge */}
            <div className="flex items-center justify-between mb-12">
              {/* 4-square neon app icon from Page 19 */}
              <div className="grid grid-cols-2 gap-1.5 w-10 h-10">
                <div className="w-4 h-4 rounded-md bg-[#CEFD46]" />
                <div className="w-4 h-4 rounded-md bg-[#CEFD46]/60" />
                <div className="w-4 h-4 rounded-md bg-[#CEFD46]/40" />
                <div className="w-4 h-4 rounded-md bg-[#CEFD46]" />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                AI CLUB ETHOS
              </span>
            </div>

            {/* Central Headline */}
            <div className="my-auto py-8">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-zinc-100 leading-tight">
                A place to share one’s
                <br />
                <span className="font-bold font-display italic text-[#CEFD46]">
                  Passion for AI
                </span>
              </h3>

              {/* Know More Button */}
              <div className="mt-8">
                <a
                  href="#conclave"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/60 border border-zinc-700 text-xs sm:text-sm font-mono uppercase tracking-wider text-white hover:border-[#CEFD46] hover:text-[#CEFD46] transition-colors"
                >
                  <span>Know More</span>
                  <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              </div>
            </div>

            {/* Bottom Quote: "We envision a world with no limits." - Andria Shile */}
            <div className="pt-8 border-t border-zinc-800 flex items-baseline justify-between text-xs sm:text-sm">
              <span className="text-zinc-300 italic font-serif">
                &ldquo;We envision a world with <strong className="text-[#CEFD46]">no limits</strong>.&rdquo;
              </span>
              <span className="text-zinc-500 font-mono text-xs">— Andria Shile</span>
            </div>
          </div>

          {/* Right Cards: Join Community, Why Join, Connect, Recent Event */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1: Join our Community */}
            <div className="bg-[#1F2023] rounded-3xl p-6 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#CEFD46] block mb-2">
                  01 // MEMBERSHIP
                </span>
                <h4 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-2">
                  Join our Community
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Explore artificial intelligence through workshops, projects, and discussions.
                  Connect with AI enthusiasts and prepare for AI careers.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800/80 font-mono text-[11px] text-[#CEFD46]">
                Open to all semesters
              </div>
            </div>

            {/* Card 2: Why Join the AI Club? */}
            <div className="bg-[#1F2023] rounded-3xl p-6 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#CEFD46] block mb-2">
                  02 // ADVANTAGE
                </span>
                <h4 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-2">
                  Why Join the AI Club?
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Explore AI through hackathons, workshops, speaker sessions, and more.
                  Learn, innovate, and connect with peers shipping real code.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800/80 font-mono text-[11px] text-[#CEFD46]">
                Compute credits &amp; mentorship
              </div>
            </div>

            {/* Card 3: Connect With Us */}
            <div className="bg-[#1F2023] rounded-3xl p-6 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#CEFD46] block mb-2">
                  03 // OUTREACH
                </span>
                <h4 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-2">
                  Connect With Us
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Have questions or want to join the AI journey? Connect with us for updates,
                  events, and exciting opportunities in modern deep tech.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800/80 font-mono text-[11px] text-[#CEFD46]">
                Active on Discord &amp; LinkedIn
              </div>
            </div>

            {/* Card 4: Our Recent Event */}
            <div className="bg-[#1F2023] rounded-3xl p-6 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#CEFD46] block mb-2">
                  04 // RECENT EVENT
                </span>
                <h4 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-2">
                  AIConic 2.0
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  AIConic 2.0 was an inspiring event where we explored machine learning,
                  deep learning, and large language models (LLMs).
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800/80 font-mono text-[11px] text-[#CEFD46]">
                300+ attendees recorded
              </div>
            </div>
          </div>
        </div>

        {/* ─── Part 2: "WHO ARE WE ?" with Watermark "Club" & Metric Counters (Page 19) ─── */}
        <div className="pt-16 border-t border-zinc-800 relative">
          
          {/* Giant Vertical Outlined Watermark "Club" from Page 19 */}
          <div className="absolute right-0 top-12 -z-0 opacity-10 select-none pointer-events-none hidden lg:block">
            <span className="text-[180px] font-black font-display uppercase tracking-tighter leading-none stroke-white text-transparent" style={{ WebkitTextStroke: "3px rgba(255,255,255,0.4)" }}>
              Club
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column: Who Are We Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white">
                  WHO ARE WE ?
                </h3>
                <span className="h-[2px] flex-1 bg-zinc-700" />
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-zinc-300 font-sans">
                We are a very new club of VIT Bhopal, for all the futuristic ones.
                We promise to make systems adaptive through artificial intelligence.
                We will be organizing webinars, debates, various competitions to show up
                your skills and improve the abilities to analyze, and develop computational
                intelligence.
              </p>

              <div className="p-6 rounded-2xl bg-[#D7F771] text-black border-2 border-[#CEFD46]">
                <h4 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight mb-2">
                  More Than Just Talk: Experience AI Through Events, Competitions &amp; Collaboration
                </h4>
                <p className="text-xs sm:text-sm font-sans font-medium text-black/80">
                  Hands-on hackathons, research publications, autonomous robotic builds,
                  and deep connections with top AI industry pioneers.
                </p>
              </div>
            </div>

            {/* Right Column: Live Metric Stat Cards from Page 19 */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[#24252A] rounded-2xl p-6 border border-zinc-700/80 text-center flex flex-col items-center justify-center hover:border-[#CEFD46] transition-colors"
                >
                  <div className="text-4xl sm:text-5xl font-black font-display text-[#CEFD46] mb-1">
                    {m.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating SCROLL TO EXPLORE Badge (Page 19) */}
          <div className="flex justify-end mt-12">
            <FloatingScrollBadge targetId="footer" dark={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
