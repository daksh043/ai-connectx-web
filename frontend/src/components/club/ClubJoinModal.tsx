import { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";

interface ClubJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEvent?: string;
}

export default function ClubJoinModal({ isOpen, onClose, defaultEvent }: ClubJoinModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "VIT Bhopal University",
    track: "Machine Learning & NLP",
    statement: defaultEvent ? `Registering for: ${defaultEvent}` : "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleModalClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-zinc-700 bg-[#1A1B1E] text-white shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#CEFD46] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-[#CEFD46]" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#CEFD46]">
                AI Club VIT Bhopal // Registration
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white mb-2">
              {defaultEvent ? `Register: ${defaultEvent}` : "Join The AI Club"}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mb-6">
              Connect with fellow builders, work on autonomous systems, and compete in premier national conclaves.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-black/40 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#CEFD46]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@vitbhopal.ac.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-black/40 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#CEFD46]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                  College / Institute *
                </label>
                <input
                  type="text"
                  required
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-black/40 text-sm text-white focus:outline-none focus:border-[#CEFD46]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                  Primary Specialization Track
                </label>
                <select
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-sm text-white focus:outline-none focus:border-[#CEFD46]"
                >
                  <option value="Machine Learning & NLP">Machine Learning &amp; Natural Language Processing</option>
                  <option value="Generative AI & LLMs">Generative AI &amp; Large Language Models</option>
                  <option value="Computer Vision & Robotics">Computer Vision &amp; Autonomous Robotics</option>
                  <option value="Full-Stack Web & Cloud Infrastructure">Full-Stack Web &amp; Cloud Infrastructure</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                  Note / Experience / GitHub Link
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you're excited to build..."
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-black/40 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#CEFD46] resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 rounded-full border border-zinc-700 text-xs font-mono uppercase text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#CEFD46] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#d6ff4d] transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#CEFD46] text-black flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(206,253,70,0.5)]">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-3xl font-black font-display uppercase tracking-tight text-white">
              Application Received!
            </h3>
            <p className="text-sm text-zinc-300 font-sans max-w-sm mx-auto leading-relaxed">
              Thanks for reaching out, <strong>{formData.name}</strong>. The AI Club web team will review your application and send Discord invites to <strong>{formData.email}</strong> shortly.
            </p>
            <div className="pt-6">
              <button
                onClick={handleModalClose}
                className="px-6 py-2.5 rounded-full bg-[#CEFD46] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#d6ff4d]"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
