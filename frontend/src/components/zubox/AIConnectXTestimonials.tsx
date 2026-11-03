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

// Jitter "slideAndMask" kinetic typography word-by-word reveal
function SlideAndMaskText({
  text,
  delay = 0.2,
}: {
  text: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className="inline-flex flex-wrap gap-x-[0.28em] gap-y-1">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-0.5">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.607, // 607ms from Jitter spec
              delay: delay + i * 0.048, // 61ms offset from Jitter spec
              ease: [0.25, 0.1, 0.25, 1], // smooth:standard:v1 easing
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

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
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 font-semibold uppercase block mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              03 / ENDORSEMENTS &amp; IMPACT
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              Industry Voices
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-100 font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
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
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1], // smooth expansion
              }}
              className="relative rounded-3xl p-8 sm:p-9 bg-slate-950/30 backdrop-blur-[6px] border border-white/20 hover:border-cyan-400/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_12px_40px_0_rgba(0,229,255,0.2),inset_0_1px_2px_0_rgba(255,255,255,0.4)] transition-all duration-300 flex flex-col justify-between group overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/[0.12] before:via-white/[0.02] before:to-transparent before:pointer-events-none before:z-10"
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-400/20 transition-all z-0" />

              <div className="relative z-20">
                {/* Header Tag & Quote Icon with Fade In */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 + idx * 0.12 }}
                  className="flex items-center justify-between pb-6 border-b border-white/15 mb-6"
                >
                  <span className="text-[10px] font-mono text-cyan-300 font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-slate-950/40 backdrop-blur-sm border border-cyan-400/30 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                    {item.highlight}
                  </span>
                  <Quote className="w-5 h-5 text-cyan-400/70 stroke-[1.5] drop-shadow-[0_2px_8px_rgba(0,229,255,0.3)]" />
                </motion.div>

                {/* Tight, Punchy Testimonial Quote with Jitter slideAndMask kinetic reveal */}
                <p className="text-base sm:text-lg text-white font-normal leading-relaxed mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                  <span className="text-cyan-400 font-serif mr-1">&ldquo;</span>
                  <SlideAndMaskText text={item.quote} delay={0.25 + idx * 0.12} />
                  <span className="text-cyan-400 font-serif ml-1">&rdquo;</span>
                </p>
              </div>

              {/* Author Attribution Block with Delayed Fade In */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.12, ease: "easeOut" }}
                className="relative z-20 flex items-center gap-4 pt-6 border-t border-white/15"
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-cyan-400/40 shadow-[0_2px_12px_rgba(0,229,255,0.2)]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                    {item.name}
                  </h3>
                  <p className="text-xs text-cyan-300 font-mono">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-slate-300 font-light">
                    {item.organization}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
