import { motion } from "motion/react";
import {
  Quote,
  Sparkles,
  ExternalLink,
  Award,
  Calendar,
  Building2,
} from "lucide-react";
import AIConnectXNavbar from "../components/zubox/ZuboxNavbar";
import AIConnectXFooter from "../components/zubox/AIConnectXFooter";
import AIConnectXTestimonials from "../components/zubox/AIConnectXTestimonials";
import SoffitGradientCanvas from "../components/zubox/SoffitGradientCanvas";

interface ExtendedVoice {
  id: string;
  name: string;
  title: string;
  org: string;
  image: string;
  badge: string;
  topic: string;
  date: string;
  quote: string;
  keyTakeaway: string;
  linkedInUrl: string;
}

const EXTENDED_VOICES: ExtendedVoice[] = [
  {
    id: "dipan-full",
    name: "Mr. Dipan Mehta",
    title: "Founding Engineer & Speaker",
    org: "ex-Quantiphi · Enterprise AI",
    image: "/gallery/workshop.jpg",
    badge: "FLAGSHIP MASTERCLASS",
    topic: "AI Engineering × Agentic Systems",
    date: "Universal AI University Campus",
    quote:
      "AI ConnectX bridges what academia often misses: real-world agentic architectures and production LLM orchestration ready for enterprise deployment. The level of curiosity and hands-on depth in the student cohort is truly remarkable.",
    keyTakeaway: "Production agent loops require deterministic fallbacks, rigorous evaluation benchmarks, and continuous feedback cycles.",
    linkedInUrl: "https://www.linkedin.com/company/ai-connectx-ai/",
  },
  {
    id: "pranav-full",
    name: "Mr. Pranav More",
    title: "Distinguished Patron",
    org: "Patron, AI ConnectX · Universal AI University",
    image: "/team/pranav.jpg",
    badge: "EXECUTIVE PATRONAGE",
    topic: "Industry Liaison & Institutional Growth",
    date: "Strategic Advisory Roster",
    quote:
      "Our students build industry-grade AI systems from semester one, guided directly by executive conduits, tech leaders, and corporate mentors. Our mission is to make UAI graduates the most sought-after AI practitioners in the nation.",
    keyTakeaway: "Direct corporate relationships and real project deliverables unlock exponential career velocity for ambitious student engineers.",
    linkedInUrl: "https://www.linkedin.com/company/ai-connectx-ai/",
  },
  {
    id: "daksh-full",
    name: "Daksh Rajesh Khandagale",
    title: "President & Founder",
    org: "AI ConnectX · Universal AI University",
    image: "/team/daksh.jpg",
    badge: "FOUNDING ARCHITECT",
    topic: "Frontier Autonomous Loops & Student Empowerment",
    date: "Founding Vision",
    quote:
      "We don't build toy projects. Every agent loop, hackathon sprint, and workshop is calibrated against what frontier AI startups are shipping right now. We are proving what an empowered student body can create when given industrial-grade challenges.",
    keyTakeaway: "Applied engineering outpaces passive learning every time. Build, deploy, break, and iterate in public.",
    linkedInUrl: "https://www.linkedin.com/company/ai-connectx-ai/",
  },
];

export default function IndustryVoicesPage() {
  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-teal-400 selection:text-black font-sans antialiased overflow-x-hidden">
      {/* Ambient living Soffit WebGL2 background at low opacity */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <SoffitGradientCanvas enableEvents={false} />
        <div className="absolute inset-0 bg-[#050507]/80 backdrop-blur-3xl" />
      </div>

      {/* Fixed Navigation */}
      <AIConnectXNavbar />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20">
        {/* Page Hero Header */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-8">
          <div className="flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-wider text-cyan-300 uppercase">
                03 / ENDORSEMENTS &amp; PERSPECTIVES
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
              Industry Voices &amp; <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Leadership Endorsements
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
              Direct perspectives from guest masterclass leaders, our institutional patron,
              corporate executive partners, and founding architects championing the next
              generation of AI engineers at Universal AI University.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">100%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">
                  Verified Insights
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">500+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">
                  Engineers Mentored
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">12+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">
                  Corporate Conduits
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">Tier-1</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">
                  Industry Leaders
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Interactive Kinetic Typography Testimonials Section */}
        <AIConnectXTestimonials />

        {/* Extended Executive Quotes & Takeaway Matrix */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-12">
          <div className="flex flex-col gap-3 mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              DEEP-DIVE PERSPECTIVES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Featured Speaker Sessions &amp; Strategic Notes
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {EXTENDED_VOICES.map((voice) => (
              <motion.div
                key={voice.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col justify-between rounded-3xl p-7 bg-slate-950/75 border border-white/15 backdrop-blur-xl hover:border-cyan-400/50 hover:shadow-[0_8px_30px_rgba(34,211,238,0.15)] transition-all overflow-hidden"
              >
                <div>
                  {/* Top Badge & Session Date */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                      {voice.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{voice.date}</span>
                    </div>
                  </div>

                  {/* Speaker Header with Avatar */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/20 shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={voice.image}
                        alt={voice.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {voice.name}
                      </h3>
                      <p className="text-xs text-cyan-400 font-medium">
                        {voice.title}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{voice.org}</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Quote Block */}
                  <div className="relative pl-4 border-l-2 border-cyan-500/40 my-4">
                    <Quote className="w-4 h-4 text-cyan-400/60 mb-1" />
                    <p className="text-sm text-slate-200 leading-relaxed italic">
                      "{voice.quote}"
                    </p>
                  </div>

                  {/* Key Takeaway Highlight */}
                  <div className="mt-5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-semibold mb-1 font-mono uppercase tracking-wider text-[11px]">
                      <Award className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Key Takeaway:</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {voice.keyTakeaway}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    Topic: {voice.topic}
                  </span>
                  <a
                    href={voice.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white transition-colors group/btn"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Callout: Invite a Speaker / Share Endorsement */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-20">
          <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-blue-950/40 border border-cyan-500/30 backdrop-blur-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase block mb-2">
                EXECUTIVE NETWORK · GUEST MASTERCLASSES
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Want to Host a Masterclass or Mentor Students?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
                We welcome corporate leaders, AI founders, and research practitioners to lead
                exclusive technical sessions, mentor hackathon teams, and review student projects.
              </p>
            </div>
            <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.linkedin.com/company/ai-connectx-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-400 to-[#0088ff] text-slate-950 hover:brightness-110 shadow-[0_4px_20px_rgba(0,229,255,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Connect with Leadership</span>
                <ExternalLink className="w-4 h-4 text-slate-950 stroke-[2]" />
              </a>
              <a
                href="mailto:connect@aiconnectx.club"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              >
                <span>Email Speaker Desk</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <AIConnectXFooter />
    </div>
  );
}
