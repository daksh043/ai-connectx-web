import { useState } from "react";
import { ArrowUpRight, X, CheckCircle } from "lucide-react";
import FloatingScrollBadge from "./FloatingScrollBadge";

interface ClubEventsProps {
  onRegister: (eventName: string) => void;
}

export default function ClubEvents({ onRegister }: ClubEventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const events = [
    {
      id: "ai-conclave-2024",
      title: "AI Conclave 2024",
      badgeTags: ["Workshops", "AI Projects", "Games"],
      date: "February 5-7, 2024",
      location: "VIT Bhopal Central Auditorium",
      description:
        "The flagship annual convention of AI Club. Featuring 3 days of intensive hackathons, industry keynotes, paper symposiums, and an experiential AI gaming arena.",
      details: [
        "Keynote lectures by industry leads from Google, Nvidia & OpenAI alumni",
        "24-Hour AI Buildathon with cash bounty over ₹1,00,000",
        "Interactive AI game exhibits: Neural Chess, Vision Pong, Generative Beats",
      ],
      type: "FLAGSHIP CONCLAVE",
    },
    {
      id: "genesis-24",
      title: "Genesis ’24",
      badgeTags: ["NLP", "LLMs", "Workshop"],
      date: "March 15-16, 2024",
      location: "Virtual & Hybrid Lab Room 402",
      description:
        "Deep-dive technical workshop and buildathon focused on modern Natural Language Processing, fine-tuning Llama/Mistral, and architecting autonomous multi-agent tool loops.",
      details: [
        "Hands-on quantization, LoRA adapter training, and vLLM deployment",
        "RAG architecture with vector databases (Qdrant & Chroma)",
        "Automated agentic reasoning benchmark competitions",
      ],
      type: "DEEP-DIVE WORKSHOP",
    },
    {
      id: "aiconic-20",
      title: "AIConic 2.0",
      badgeTags: ["MLOps", "Deep Learning", "Hackathon"],
      date: "April 20-21, 2024",
      location: "VIT Tech Hub & Online",
      description:
        "An inspiring summit exploring cutting-edge AI breakthroughs. Expert speakers shared insights on machine learning, deep neural networks, and scalable model serving.",
      details: [
        "Edge inference optimization with TensorRT & ONNX Runtime",
        "Computer Vision & Multi-Camera Tracking for robotics",
        "Certificate of Merit & Internship fast-tracks for top builders",
      ],
      type: "ANNUAL SUMMIT",
    },
    {
      id: "devvision-ideathon",
      title: "DevVision Ideathon",
      badgeTags: ["GenAI", "Ideathon", "Startup"],
      date: "May 10, 2024",
      location: "Innovation Amphitheater",
      description:
        "Pitch and prototype forward-looking AI products. Teams pitch their multi-modal concepts to a panel of startup founders, angels, and faculty chairs.",
      details: [
        "Seed grant funding opportunities for selected campus projects",
        "Direct 1-on-1 feedback from seed venture investors",
        "Free cloud compute credits provided for winning teams",
      ],
      type: "PITCH COMPETITION",
    },
  ];

  return (
    <section
      id="events"
      className="relative py-24 sm:py-32 px-4 sm:px-8 bg-[#18191B] text-white border-b border-[#2B2D33] overflow-hidden bg-ai-dots-dark"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section Heading matching Page 6 of PDF */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 bg-[#CEFD46]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#CEFD46]">
                Conclaves &amp; Hackathons
              </span>
            </div>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black font-display tracking-tight uppercase">
              EVENTS
            </h2>
          </div>

          <p className="max-w-md text-sm text-zinc-400 font-sans leading-relaxed">
            From premier 3-day conclaves to specialized developer code sprints,
            we empower builders to learn, compete, and deploy production AI.
          </p>
        </div>

        {/* ─── Event Cards Grid (Page 6 of PDF) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="group bg-[#1F2023] rounded-3xl overflow-hidden border border-[#2B2D33] hover:border-[#CEFD46]/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              {/* Top: Lime Green Screen / Thumbnail matching Page 6 */}
              <div className="w-full h-56 sm:h-72 bg-[#D7F771] p-6 relative overflow-hidden flex flex-col justify-between select-none">
                {/* Subtle tech grid inside lime screen */}
                <div className="absolute inset-0 bg-ai-dots-lime opacity-40 pointer-events-none" />

                {/* Top badges inside lime screen */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-black text-[#CEFD46] font-mono text-[11px] font-bold px-2.5 py-1 rounded">
                    {evt.type}
                  </span>
                  <span className="text-black font-mono text-xs font-bold">
                    {evt.date}
                  </span>
                </div>

                {/* Center abstract decorative wireframe typography */}
                <div className="relative z-10 flex items-center justify-center my-auto">
                  <span className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight text-black/20 group-hover:text-black/35 transition-colors">
                    {evt.title}
                  </span>
                </div>

                {/* Bottom indicators */}
                <div className="relative z-10 flex items-center justify-between text-black font-mono text-xs">
                  <span>VIT BHOPAL</span>
                  <span>// REGISTRATIONS LIVE</span>
                </div>
              </div>

              {/* Bottom Dark Panel matching Page 6 */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-6">
                <div>
                  {/* Neon Lime Tag Pills from Page 6 */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {evt.badgeTags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#CEFD46] text-black font-sans font-bold text-xs px-3 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Event Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white mb-2">
                    {evt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans line-clamp-2">
                    {evt.description}
                  </p>
                </div>

                {/* Bottom Action Row: "View Event" Outlined Rounded Button */}
                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">
                    {evt.location}
                  </span>

                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="px-5 py-2 rounded-full border border-zinc-500 text-white font-mono text-xs uppercase tracking-wider hover:border-[#CEFD46] hover:bg-[#CEFD46] hover:text-black transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Event</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Floating SCROLL TO EXPLORE Badge (Page 6) */}
          <div className="absolute -bottom-10 right-4 sm:-bottom-12 sm:right-10 z-20">
            <FloatingScrollBadge targetId="projects" dark={true} />
          </div>
        </div>
      </div>

      {/* ─── Event Detail Modal ─── */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#1F2023] border border-[#2B2D33] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedEvent(null)}
              aria-label="Close modal"
              className="absolute top-6 right-6 w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#CEFD46] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#CEFD46] text-black font-mono text-xs font-bold px-2 py-0.5 rounded">
                {selectedEvent.type}
              </span>
              <span className="text-zinc-400 text-xs font-mono">{selectedEvent.date}</span>
            </div>

            <h3 className="text-3xl font-black font-display uppercase tracking-tight text-white mb-4">
              {selectedEvent.title}
            </h3>

            <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-6">
              {selectedEvent.description}
            </p>

            <div className="space-y-2 mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#CEFD46] block mb-2">
                Event Agenda Highlights:
              </span>
              {selectedEvent.details.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-[#CEFD46] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-zinc-800">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-full border border-zinc-700 text-xs font-mono uppercase text-zinc-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const name = selectedEvent.title;
                  setSelectedEvent(null);
                  onRegister(name);
                }}
                className="px-6 py-2 rounded-full bg-[#CEFD46] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#d6ff4d] transition-all shadow-[0_0_15px_rgba(206,253,70,0.4)]"
              >
                Register for this event
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
