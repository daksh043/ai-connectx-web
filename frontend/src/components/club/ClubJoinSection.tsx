import { useState } from "react";
import { Send, CheckCircle2, Mail, MapPin, Sparkles, Phone } from "lucide-react";
import { useClubTheme } from "../../contexts/ClubThemeContext";

export default function ClubJoinSection() {
  const { isDark } = useClubTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    year: "2nd Year",
    track: "Autonomous Agents & Swarms",
    portfolio: "",
    statement: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <section
      id="join"
      className={`py-24 sm:py-32 px-6 border-t relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-black border-white/10" : "bg-white border-zinc-200"
      }`}
    >
      {/* Background radial highlight */}
      <div
        className={`absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
          isDark ? "bg-[#3b82f6]/10" : "bg-[#3b82f6]/8"
        }`}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Opraah-Style Office & Info Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#3b82f6]" />
                <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#3b82f6]">
                  Cohort Applications 2026-27
                </span>
              </div>

              <h2
                className={`font-display font-extrabold text-3xl sm:text-5xl tracking-tight mb-6 ${
                  isDark ? "text-white" : "text-zinc-950"
                }`}
              >
                Ready to Build? <br />
                <span className={isDark ? "club-blue-gradient-text" : "club-blue-gradient-text-light"}>
                  Let&apos;s Talk.
                </span>
              </h2>

              <p
                className={`text-sm sm:text-base leading-relaxed mb-10 ${
                  isDark ? "text-zinc-300" : "text-zinc-600"
                }`}
              >
                We accept applications on a rolling basis. Whether you&apos;re an experienced system architect or a first-year builder with extreme curiosity, we evaluate based on passion and proof of work.
              </p>

              {/* Coordinates & Contact Info (Opraah Style) */}
              <div
                className={`flex flex-col gap-6 pt-6 border-t ${
                  isDark ? "border-white/10" : "border-zinc-200"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl text-[#3b82f6] shrink-0 border ${
                      isDark
                        ? "bg-white/[0.04] border-white/8"
                        : "bg-orange-50 border-orange-100"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div
                      className={`text-[11px] font-tech uppercase tracking-wider ${
                        isDark ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      Campus Lab &amp; Hub
                    </div>
                    <div
                      className={`text-sm font-medium mt-0.5 ${
                        isDark ? "text-white" : "text-zinc-950"
                      }`}
                    >
                      Innovation &amp; Incubation Wing, Block B, Tech Hub, Noida, UP
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl text-[#3b82f6] shrink-0 border ${
                      isDark
                        ? "bg-white/[0.04] border-white/8"
                        : "bg-orange-50 border-orange-100"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div
                      className={`text-[11px] font-tech uppercase tracking-wider ${
                        isDark ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      Club Inquiries &amp; Sponsorships
                    </div>
                    <div
                      className={`text-sm font-medium mt-0.5 font-mono ${
                        isDark ? "text-white" : "text-zinc-950"
                      }`}
                    >
                      club@aiconnectx.org
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl text-[#3b82f6] shrink-0 border ${
                      isDark
                        ? "bg-white/[0.04] border-white/8"
                        : "bg-orange-50 border-orange-100"
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div
                      className={`text-[11px] font-tech uppercase tracking-wider ${
                        isDark ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      Direct Lead Desk
                    </div>
                    <div
                      className={`text-sm font-medium mt-0.5 font-mono ${
                        isDark ? "text-white" : "text-zinc-950"
                      }`}
                    >
                      +91 98765 43210
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`mt-8 pt-6 border-t hidden lg:block ${
                isDark ? "border-white/10" : "border-zinc-200"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-tech text-[#83ca16]">
                <Sparkles className="w-4 h-4" />
                <span>Rolling Decisions within 48 Hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-7">
            <div
              className={`rounded-3xl p-8 sm:p-10 border transition-all duration-300 ${
                isDark
                  ? "club-glass-card border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                  : "club-light-card border-zinc-200/90 shadow-xl"
              }`}
            >
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#83ca16]/20 border border-[#83ca16]/40 flex items-center justify-center text-[#83ca16] mb-5">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3
                    className={`font-display font-extrabold text-2xl sm:text-3xl mb-2 ${
                      isDark ? "text-white" : "text-zinc-950"
                    }`}
                  >
                    Application Received!
                  </h3>
                  <p
                    className={`text-sm max-w-md mb-8 ${
                      isDark ? "text-zinc-300" : "text-zinc-600"
                    }`}
                  >
                    Thank you, <strong className={isDark ? "text-white" : "text-zinc-950"}>{formData.name}</strong>. Our core team review board will evaluate your statement and reach out to <span className="text-[#3b82f6]">{formData.email}</span> with your interview slot.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        university: "",
                        year: "2nd Year",
                        track: "Autonomous Agents & Swarms",
                        portfolio: "",
                        statement: "",
                      });
                    }}
                    className={`px-6 py-2.5 rounded-full font-tech text-xs tracking-wider uppercase transition-colors ${
                      isDark
                        ? "bg-white/10 hover:bg-white/20 text-white"
                        : "bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200"
                    }`}
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className={`block text-xs font-tech uppercase tracking-wider mb-2 ${
                          isDark ? "text-zinc-300" : "text-zinc-700 font-semibold"
                        }`}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Daksh Verma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] ${
                          isDark
                            ? "bg-white/[0.04] border-white/10 text-white placeholder:text-zinc-500"
                            : "bg-zinc-50 border-zinc-200 text-zinc-950 placeholder:text-zinc-400"
                        }`}
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-xs font-tech uppercase tracking-wider mb-2 ${
                          isDark ? "text-zinc-300" : "text-zinc-700 font-semibold"
                        }`}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="daksh@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] ${
                          isDark
                            ? "bg-white/[0.04] border-white/10 text-white placeholder:text-zinc-500"
                            : "bg-zinc-50 border-zinc-200 text-zinc-950 placeholder:text-zinc-400"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className={`block text-xs font-tech uppercase tracking-wider mb-2 ${
                          isDark ? "text-zinc-300" : "text-zinc-700 font-semibold"
                        }`}
                      >
                        College / University *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SRM / VIT / DTU / IIT"
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] ${
                          isDark
                            ? "bg-white/[0.04] border-white/10 text-white placeholder:text-zinc-500"
                            : "bg-zinc-50 border-zinc-200 text-zinc-950 placeholder:text-zinc-400"
                        }`}
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-xs font-tech uppercase tracking-wider mb-2 ${
                          isDark ? "text-zinc-300" : "text-zinc-700 font-semibold"
                        }`}
                      >
                        Current Year
                      </label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] ${
                          isDark
                            ? "bg-zinc-900 border-white/10 text-white"
                            : "bg-zinc-50 border-zinc-200 text-zinc-950"
                        }`}
                      >
                        <option value="1st Year">1st Year (Freshman)</option>
                        <option value="2nd Year">2nd Year (Sophomore)</option>
                        <option value="3rd Year">3rd Year (Junior)</option>
                        <option value="4th Year">4th Year (Senior)</option>
                        <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className={`block text-xs font-tech uppercase tracking-wider mb-2 ${
                          isDark ? "text-zinc-300" : "text-zinc-700 font-semibold"
                        }`}
                      >
                        Preferred Track *
                      </label>
                      <select
                        value={formData.track}
                        onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] ${
                          isDark
                            ? "bg-zinc-900 border-white/10 text-white"
                            : "bg-zinc-50 border-zinc-200 text-zinc-950"
                        }`}
                      >
                        <option value="Autonomous Agents & Swarms">Autonomous Agents &amp; Swarms</option>
                        <option value="Generative Models & Multimodal">Generative Models &amp; Multimodal</option>
                        <option value="Full-Stack & Cloud Architecture">Full-Stack &amp; Cloud Architecture</option>
                        <option value="Competitive Hackathons">Competitive Hackathons</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className={`block text-xs font-tech uppercase tracking-wider mb-2 ${
                          isDark ? "text-zinc-300" : "text-zinc-700 font-semibold"
                        }`}
                      >
                        GitHub / Portfolio URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/username"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] ${
                          isDark
                            ? "bg-white/[0.04] border-white/10 text-white placeholder:text-zinc-500"
                            : "bg-zinc-50 border-zinc-200 text-zinc-950 placeholder:text-zinc-400"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-tech uppercase tracking-wider mb-2 ${
                        isDark ? "text-zinc-300" : "text-zinc-700 font-semibold"
                      }`}
                    >
                      What do you want to build with us? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about a technical problem you care about, past projects, or what you want to engineer..."
                      value={formData.statement}
                      onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] resize-none ${
                        isDark
                          ? "bg-white/[0.04] border-white/10 text-white placeholder:text-zinc-500"
                          : "bg-zinc-50 border-zinc-200 text-zinc-950 placeholder:text-zinc-400"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-4 rounded-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(59,130,246,0.4)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit Club Application</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
