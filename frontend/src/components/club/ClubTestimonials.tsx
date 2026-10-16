import { Quote } from "lucide-react";
import { useClubTheme } from "../../contexts/ClubThemeContext";

export default function ClubTestimonials() {
  const { isDark } = useClubTheme();

  const testimonials = [
    {
      quote:
        "Joining AI ConnectX transformed how I view software. Within 4 months, my team went from toy Python scripts to deploying real agentic systems that won ₹1.5L at the SIH national finals.",
      author: "Priya Nair",
      role: "Alumna • Now SWE at Google Cloud",
      track: "Agentic Systems Track",
    },
    {
      quote:
        "The standard of code review and research depth here rivals top tech teams. If you want to build alongside people who obsess over latency, transformer architectures, and shipping fast, this is it.",
      author: "Rohan Kapoor",
      role: "Founder • AI Infrastructure Startup",
      track: "Deep Learning Track",
    },
    {
      quote:
        "Unlike generic campus clubs with passive lectures, ConnectX forces you into the arena. You build in sprints, ship open source, and present to real investors. Highly recommended.",
      author: "Devansh Patel",
      role: "Fellow • YC S25 Batch Applicant",
      track: "Full-Stack & Cloud Track",
    },
  ];

  return (
    <section
      className={`py-24 px-6 border-t transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-b from-[#08080a] to-[#040405] border-white/8"
          : "bg-zinc-50/60 border-zinc-200"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[2px] bg-[#3b82f6]" />
          <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#3b82f6]">
            Builder Testimonials
          </span>
        </div>

        <h2
          className={`font-display font-extrabold text-3xl sm:text-5xl tracking-tight mb-16 ${
            isDark ? "text-white" : "text-zinc-950"
          }`}
        >
          What Our Alumni &amp; Mentors Say.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 border flex flex-col justify-between transition-all duration-300 ${
                isDark
                  ? "club-glass-card border-white/8"
                  : "club-light-card border-zinc-200/90 shadow-sm"
              }`}
            >
              <div>
                <Quote className="w-8 h-8 text-[#3b82f6]/40 mb-4" />
                <p
                  className={`text-sm sm:text-base leading-relaxed mb-6 font-normal ${
                    isDark ? "text-zinc-200" : "text-zinc-700"
                  }`}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div
                className={`pt-4 border-t ${
                  isDark ? "border-white/8" : "border-zinc-200"
                }`}
              >
                <div
                  className={`font-display font-bold text-base ${
                    isDark ? "text-white" : "text-zinc-950"
                  }`}
                >
                  {t.author}
                </div>
                <div className="text-xs font-tech text-[#3b82f6] mt-0.5">
                  {t.role}
                </div>
                <div
                  className={`text-[11px] mt-0.5 ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {t.track}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
