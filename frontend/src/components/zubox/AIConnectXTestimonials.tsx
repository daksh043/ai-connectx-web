import { motion } from "motion/react";
import { ArrowRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  image: string;
  quote: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    id: "dipan",
    name: "MR. DIPAN MEHTA",
    role: "Founding Engineer & Speaker",
    organization: "ex-Quantiphi · Enterprise AI",
    image: "/gallery/workshop.jpg",
    quote:
      "AI ConnectX bridges what academia often misses: real-world agentic architectures and production LLM orchestration ready for enterprise deployment.",
    highlight: "AI ENGINEERING SPEAKER",
  },
  {
    id: "pranav",
    name: "MR. PRANAV MORE",
    role: "Patron, AI ConnectX",
    organization: "Universal AI University",
    image: "/team/pranav.jpg",
    quote:
      "Our students build industry-grade AI systems from semester one, guided directly by executive conduits, tech leaders, and corporate mentors.",
    highlight: "EXECUTIVE PATRONAGE",
  },
  {
    id: "daksh",
    name: "DAKSH RAJESH KHANDAGALE",
    role: "President & Founder",
    organization: "AI ConnectX · UAI",
    image: "/team/daksh.jpg",
    quote:
      "We don't build toy projects. Every agent loop, hackathon sprint, and workshop is calibrated against what frontier AI startups are shipping right now.",
    highlight: "FOUNDING ARCHITECT",
  },
];

export default function AIConnectXTestimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-10 w-full py-24 sm:py-32 select-none font-['Outfit']"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Generous White Space & Big Headlines */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 font-semibold uppercase block mb-3">
              03 / ENDORSEMENTS &amp; IMPACT
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05]">
              Industry Voices
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              Authentic feedback from our patron, guest masterclass leaders, and founding architects.
            </p>
          </div>

          {/* Unified Signature Single Button per section */}
          <div>
            <a
              href="https://www.linkedin.com/company/ai-connectx-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-cyan-400 to-[#0088ff] text-slate-950 hover:brightness-110 shadow-[0_4px_24px_rgba(0,229,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shrink-0"
            >
              <span>View LinkedIn Recommendations</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform stroke-[2]" />
            </a>
          </div>
        </div>

        {/* 3-Column Strict Mathematical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-3xl p-8 sm:p-9 bg-slate-950/75 backdrop-blur-2xl border border-white/10 hover:border-cyan-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-400/15 transition-all" />

              <div>
                {/* Header Tag & Quote Icon */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <span className="text-[10px] font-mono text-cyan-300 font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/20">
                    {item.highlight}
                  </span>
                  <Quote className="w-5 h-5 text-cyan-400/60 stroke-[1.5]" />
                </div>

                {/* Tight, Punchy Testimonial Quote */}
                <p className="text-base sm:text-lg text-white font-normal leading-relaxed mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Attribution Block */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-cyan-400/30">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-cyan-300 font-mono">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-slate-300 font-light">
                    {item.organization}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
