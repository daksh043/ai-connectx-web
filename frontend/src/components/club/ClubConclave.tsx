import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useClubTheme } from "../../contexts/ClubThemeContext";
import FloatingScrollBadge from "./FloatingScrollBadge";

interface ClubConclaveProps {
  onRegister: () => void;
}

export default function ClubConclave({ onRegister }: ClubConclaveProps) {
  const { isDark } = useClubTheme();
  const [activeDay, setActiveDay] = useState(1);

  const schedule = [
    {
      day: 1,
      title: "Ideations & Keynote Sprints",
      date: "Feb 5, 2024",
      tracks: [
        { time: "09:30 AM", session: "Opening Keynote: Frontier Foundation Models & Agents" },
        { time: "11:30 AM", session: "Ideathon Round 1: Pitching Multi-Agent Solutions" },
        { time: "02:30 PM", session: "Panel Discussion: AI Ethics, Alignment & Open Weights" },
      ],
    },
    {
      day: 2,
      title: "24-Hour AI Buildathon",
      date: "Feb 6, 2024",
      tracks: [
        { time: "10:00 AM", session: "Hackathon Kickoff: Problem Statements Released" },
        { time: "03:00 PM", session: "Hands-on Workshop: Edge MLOps with TensorRT" },
        { time: "09:00 PM", session: "Midway Architectural Code Review & Mentorship" },
      ],
    },
    {
      day: 3,
      title: "Grand Finale & Project Conclave",
      date: "Feb 7, 2024",
      tracks: [
        { time: "11:00 AM", session: "Final Jury Demonstrations & Benchmark Testing" },
        { time: "03:30 PM", session: "Valedictory Ceremony, Cash Prizes & Certificates" },
        { time: "05:00 PM", session: "Networking Gala & AI Club Project Showcase" },
      ],
    },
  ];

  return (
    <section
      id="conclave"
      className={`relative py-20 sm:py-28 px-4 sm:px-8 border-b transition-colors duration-300 ${
        isDark
          ? "bg-[#161719] border-[#2B2D33] text-white bg-ai-dots-dark"
          : "bg-[#f8f9fa] border-[#E5E7EB] text-black bg-ai-dots-light"
      }`}
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Top Header Row matching Pages 5 & 7 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 bg-[#CEFD46] inline-block" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                Flagship Annual Summit
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight uppercase">
              AI CONCLAVE 4.0
            </h2>
          </div>

          <p
            className={`max-w-md text-sm sm:text-base font-sans leading-relaxed ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Welcome to AI Conclave 2024, A 3-day thrill ride from February 5th to 7th,
            hosted by the AI Club at VIT Bhopal University.
          </p>
        </div>

        {/* Main Content Grid (Pages 5, 7, 8, 9, 10) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Highlighted Copy with Neon Lime Pills */}
          <div className="lg:col-span-6 space-y-8">
            <div
              className={`p-6 sm:p-10 rounded-3xl border transition-all ${
                isDark
                  ? "bg-[#1F2023]/80 border-zinc-800 text-zinc-100"
                  : "bg-white border-zinc-200 text-zinc-900"
              } shadow-xl backdrop-blur-md`}
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium leading-relaxed">
                Immerse yourself in{" "}
                <span className="inline-block bg-[#CEFD46] text-black px-3 py-0.5 rounded-full font-bold shadow-sm">
                  industry insights
                </span>{" "}
                through{" "}
                <span className="inline-block bg-[#CEFD46] text-black px-3 py-0.5 rounded-full font-bold shadow-sm">
                  ideations
                </span>
                ,{" "}
                <span className="inline-block bg-[#CEFD46] text-black px-3 py-0.5 rounded-full font-bold shadow-sm">
                  hackathons
                </span>
                , and{" "}
                <span className="inline-block bg-[#CEFD46] text-black px-3 py-0.5 rounded-full font-bold shadow-sm">
                  expert keynotes
                </span>
                . Explore{" "}
                <span className="inline-block bg-[#CEFD46] text-black px-3 py-0.5 rounded-full font-bold shadow-sm">
                  NLP
                </span>
                ,{" "}
                <span className="inline-block bg-[#CEFD46] text-black px-3 py-0.5 rounded-full font-bold shadow-sm">
                  MLOps
                </span>
                ,{" "}
                <span className="inline-block bg-[#CEFD46] text-black px-3 py-0.5 rounded-full font-bold shadow-sm">
                  Computer Vision
                </span>
                , etc. Experience{" "}
                <span className="inline-block bg-[#CEFD46] text-black px-3 py-0.5 rounded-full font-bold shadow-sm">
                  hands-on workshops
                </span>
                .
              </p>

              {/* Action Button: "Register Now •" or "(Coming Soon)" */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={onRegister}
                  className="group flex items-center gap-3 bg-[#CEFD46] text-black font-mono font-bold text-sm sm:text-base px-6 py-3.5 rounded-full hover:bg-[#d6ff4d] transition-all hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(206,253,70,0.4)] cursor-pointer"
                >
                  <span>Register Now</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-black group-hover:scale-125 transition-transform" />
                </button>

                <div
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider ${
                    isDark
                      ? "border-zinc-700 bg-zinc-900/60 text-zinc-300"
                      : "border-zinc-300 bg-zinc-100 text-zinc-700"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Limited Delegate Seats</span>
                </div>
              </div>
            </div>

            {/* Quick Summit Stats Bar */}
            <div className="grid grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-2xl border text-center ${
                  isDark ? "bg-[#18191B] border-zinc-800" : "bg-white border-zinc-200"
                }`}
              >
                <div className="text-2xl sm:text-3xl font-black font-display text-[#CEFD46]">
                  3 Days
                </div>
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-1">
                  Feb 5 - 7, 2024
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border text-center ${
                  isDark ? "bg-[#18191B] border-zinc-800" : "bg-white border-zinc-200"
                }`}
              >
                <div className="text-2xl sm:text-3xl font-black font-display text-[#CEFD46]">
                  ₹1,00,000+
                </div>
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-1">
                  Prize Bounty
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border text-center ${
                  isDark ? "bg-[#18191B] border-zinc-800" : "bg-white border-zinc-200"
                }`}
              >
                <div className="text-2xl sm:text-3xl font-black font-display text-[#CEFD46]">
                  500+
                </div>
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-1">
                  Delegates
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Rounded Lime Showcase Card (Page 5 & Page 7) */}
          <div className="lg:col-span-6 relative">
            <div className="w-full bg-[#D7F771] text-black rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-[#CEFD46] relative overflow-hidden">
              
              {/* Card Header & Day Switcher */}
              <div className="flex items-center justify-between pb-6 border-b border-black/15">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-black/70 font-bold block mb-1">
                    VIT Bhopal University
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight">
                    Conclave Itinerary
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 bg-black/10 p-1 rounded-xl">
                  {[1, 2, 3].map((d) => (
                    <button
                      key={d}
                      onClick={() => setActiveDay(d)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                        activeDay === d
                          ? "bg-black text-[#CEFD46] shadow-sm"
                          : "text-black/80 hover:bg-black/5"
                      }`}
                    >
                      DAY {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Day Track Details */}
              <div className="my-6 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs font-bold text-black/75">
                  <span>{schedule[activeDay - 1].title}</span>
                  <span>{schedule[activeDay - 1].date}</span>
                </div>

                <div className="space-y-3">
                  {schedule[activeDay - 1].tracks.map((t, idx) => (
                    <div
                      key={idx}
                      className="bg-black/5 hover:bg-black/10 transition-colors p-3.5 rounded-xl flex items-start gap-3 border border-black/10"
                    >
                      <span className="font-mono text-xs font-bold bg-black text-[#CEFD46] px-2 py-1 rounded shrink-0">
                        {t.time}
                      </span>
                      <p className="text-sm font-sans font-medium text-black leading-snug">
                        {t.session}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer with Highlights */}
              <div className="pt-6 border-t border-black/15 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span className="font-bold">Offline &amp; Hybrid Sessions</span>
                </div>
                <button
                  onClick={onRegister}
                  className="flex items-center gap-1 text-black font-bold uppercase underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  <span>Download Rulebook</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Floating SCROLL TO EXPLORE Badge positioned as in Page 5 */}
            <div className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-8 z-20">
              <FloatingScrollBadge targetId="events" dark={isDark} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
