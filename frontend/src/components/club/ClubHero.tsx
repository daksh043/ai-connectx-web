import { useState } from "react";
import { Terminal, CornerDownLeft } from "lucide-react";
import { useClubTheme } from "../../contexts/ClubThemeContext";

interface ClubHeroProps {
  onOpenJoin: () => void;
}

export default function ClubHero({ onOpenJoin }: ClubHeroProps) {
  const { isDark } = useClubTheme();
  const [activeDomain, setActiveDomain] = useState<string>("Machine Learning");
  const [chatPrompt, setChatPrompt] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: "Hello! Welcome to AI Club at VIT Bhopal. How can I help you explore our research, upcoming conclaves, or membership?",
    },
  ]);

  const domains = [
    {
      name: "Machine Learning",
      desc: "Supervised & unsupervised systems, gradient boosting, probabilistic modeling, and scalable feature engineering.",
      stats: "24+ Model Architectures",
    },
    {
      name: "Natural Language Processing",
      desc: "LLMs, attention mechanisms, RAG pipelines, fine-tuning LoRA adapters, and multilingual tokenizers.",
      stats: "12 Research Papers Analyzed",
    },
    {
      name: "Generative AI",
      desc: "Diffusion models, multimodal agents, latent consistency engines, and autonomous code generation loops.",
      stats: "8 Production Pipelines",
    },
    {
      name: "Computer Vision",
      desc: "Real-time YOLO object detection, 3D point cloud synthesis, semantic segmentation, and robotic perception.",
      stats: "14ms Edge Latency",
    },
    {
      name: "Robotics",
      desc: "ROS2 control nodes, kinematics simulation, autonomous navigation algorithms, and hardware-in-the-loop testing.",
      stats: "Autonomous Rover Active",
    },
  ];

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatPrompt.trim()) return;

    const userText = chatPrompt.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatPrompt("");

    setTimeout(() => {
      let reply = "That's exciting! Join us at AI Conclave 4.0 or connect with our leads in the Discord server.";
      const lower = userText.toLowerCase();
      if (lower.includes("join") || lower.includes("register")) {
        reply = "You can register right away for AI Club recruitments! Click the 'Join Club' button above to get started.";
      } else if (lower.includes("conclave") || lower.includes("event")) {
        reply = "AI Conclave 4.0 is our flagship 3-day thrill ride featuring ideathons, 24h hackathons, and keynotes by industry pioneers!";
      } else if (lower.includes("project") || lower.includes("vision")) {
        reply = "Our projects span from Autonomous Drone Nav, Multimodal Agentic Suites, to Bio-Medical AI. Check out the Projects section below!";
      }
      setChatMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 450);
  };

  return (
    <section
      id="home"
      className={`relative w-full border-b transition-colors duration-300 ${
        isDark
          ? "bg-[#121315] border-[#2B2D33] text-white"
          : "bg-white border-[#E5E7EB] text-black"
      }`}
    >
      {/* ─── Architectural 4-Quadrant Grid (Page 1 of PDF) ─── */}
      <div className="max-w-[1600px] mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 border-x border-[#2B2D33]/40">
          
          {/* ─── Column 1: Domains & "Let's talk about AI" (Cols 1-5) ─── */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#2B2D33]/40">
            {/* Domain Stack */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 bg-[#CEFD46]" />
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  Core Specializations
                </span>
              </div>

              <div className="space-y-4">
                {domains.map((item) => {
                  const isSelected = activeDomain === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setActiveDomain(item.name)}
                      className={`group w-full text-left py-2 px-3 rounded-lg transition-all flex items-center justify-between ${
                        isSelected
                          ? isDark
                            ? "bg-white/10 text-[#CEFD46] font-bold pl-4"
                            : "bg-black/5 text-black font-bold pl-4"
                          : isDark
                          ? "text-zinc-400 hover:text-white hover:pl-4"
                          : "text-zinc-600 hover:text-black hover:pl-4"
                      }`}
                    >
                      <span className="text-xl sm:text-2xl md:text-3xl font-display tracking-tight">
                        {item.name}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#CEFD46] animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active domain quick info pill */}
              <div
                className={`mt-6 p-4 rounded-xl border text-xs sm:text-sm font-sans transition-all ${
                  isDark
                    ? "bg-[#18191B] border-zinc-800 text-zinc-300"
                    : "bg-zinc-50 border-zinc-200 text-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1 font-mono text-[11px] text-[#CEFD46]">
                  <span>ACTIVE TRACK</span>
                  <span>{domains.find((d) => d.name === activeDomain)?.stats}</span>
                </div>
                <p className="leading-relaxed">
                  {domains.find((d) => d.name === activeDomain)?.desc}
                </p>
              </div>
            </div>

            {/* Bottom-Left: "Let's talk about AI" Interactive Area */}
            <div className="mt-10 pt-6 border-t border-[#2B2D33]/40">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
                  Let’s talk about <span className="text-[#CEFD46] drop-shadow-[0_0_12px_rgba(206,253,70,0.4)]">AI</span>
                </h2>
                <button
                  onClick={onOpenJoin}
                  className="text-xs font-mono text-[#CEFD46] underline hover:text-white transition-colors"
                >
                  Join Us ↗
                </button>
              </div>
              <p
                className={`text-xs sm:text-sm mb-4 ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Have a question about our projects, neural architectures, or recruitment? Chat directly:
              </p>

              {/* Interactive Micro-Chat Terminal */}
              <div
                className={`rounded-xl border p-3 font-mono text-xs ${
                  isDark
                    ? "bg-black/60 border-zinc-800 text-zinc-300"
                    : "bg-white border-zinc-200 text-zinc-800"
                }`}
              >
                <div className="max-h-28 overflow-y-auto space-y-2 mb-3 pr-1">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded ${
                        msg.sender === "ai"
                          ? isDark
                            ? "bg-[#1f2023] text-zinc-200 border-l-2 border-[#CEFD46]"
                            : "bg-zinc-100 text-zinc-900 border-l-2 border-black"
                          : isDark
                          ? "bg-[#CEFD46]/10 text-[#CEFD46] text-right"
                          : "bg-black/5 text-black text-right"
                      }`}
                    >
                      {msg.sender === "ai" ? "● AI: " : "> "}
                      {msg.text}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatPrompt}
                    onChange={(e) => setChatPrompt(e.target.value)}
                    placeholder="Ask about AI Club..."
                    className="flex-1 bg-transparent border-0 focus:outline-none text-xs text-inherit placeholder:text-zinc-500"
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    className="p-1.5 rounded-lg bg-[#CEFD46] text-black hover:bg-[#d6ff4d] transition-colors"
                  >
                    <CornerDownLeft className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* ─── Column 2: Center Vertical Divider & Rotating Error Badge (Cols 6-7) ─── */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col items-center justify-between p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#2B2D33]/40 bg-zinc-900/10 relative overflow-hidden">
            
            {/* The Vertical "sudo rm -rf System32" Black Ribbon (Page 1) */}
            <div className="bg-black text-white px-3 py-6 rounded-md shadow-md border border-zinc-800 flex items-center justify-center">
              <span className="font-mono text-xs tracking-widest uppercase writing-mode-vertical rotate-180 text-[#CEFD46] font-bold select-none whitespace-nowrap">
                sudo rm -rf System32
              </span>
            </div>

            {/* Rotating Typography Badge: "Runtime Error Compiling And Compiling" (Page 1) */}
            <div className="relative w-44 h-44 my-4 flex items-center justify-center select-none">
              <svg
                viewBox="0 0 160 160"
                className="w-full h-full animate-spin-reverse-slow pointer-events-none"
              >
                <path
                  id="errorCirclePath"
                  d="M 80, 80 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                  fill="none"
                />
                <text
                  className={`text-[10px] font-mono font-bold tracking-[3.2px] uppercase ${
                    isDark ? "fill-zinc-300" : "fill-zinc-800"
                  }`}
                >
                  <textPath href="#errorCirclePath" startOffset="0%">
                    Runtime Error &quot; Compiling And Compiling &quot;
                  </textPath>
                </text>
              </svg>

              {/* Dashed outer orbital ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-zinc-600/60 pointer-events-none" />

              {/* Core pulsing terminal symbol */}
              <div className="w-12 h-12 rounded-full bg-[#18191B] border border-[#CEFD46]/50 flex items-center justify-center shadow-[0_0_16px_rgba(206,253,70,0.25)]">
                <Terminal className="w-5 h-5 text-[#CEFD46]" />
              </div>
            </div>

            {/* Quick stats note */}
            <div className="text-center font-mono text-[10px] text-zinc-500 uppercase tracking-widest hidden lg:block">
              // RUNTIME: OPTIMAL
            </div>
          </div>

          {/* ─── Column 3: 3D Robot Assistant (Page 1) (Cols 8-12) ─── */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center items-center relative overflow-hidden bg-dot-matrix-light dark:bg-dot-matrix-dark">
            <div className="relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden border border-[#2B2D33] shadow-2xl group">
              {/* Image from generation matching Page 1 */}
              <img
                src="/ai_club_robot.jpg"
                alt="AI Club Futuristic Cybernetic Assistant typing at laptop"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Glowing Purple Visor Accent Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-white font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#CEFD46] animate-ping" />
                  <span className="font-bold text-[#CEFD46]">AI COGNITION UNIT-7</span>
                </div>
                <span className="text-zinc-400">STATUS: DEPLOYED</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Bottom Ticker Ribbon (Page 1 of PDF) ─── */}
        <div className="w-full bg-black text-white border-t border-zinc-800 overflow-hidden py-3.5 select-none">
          <div className="animate-marquee-infinite text-lg sm:text-2xl font-display font-extrabold tracking-widest uppercase flex items-center gap-8 whitespace-nowrap">
            <span>Hackathons</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Projects</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Workshops</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Webinars</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Sessions</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Ideathons</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Research Papers</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Conclaves</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Hackathons</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Projects</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Workshops</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Webinars</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Sessions</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Ideathons</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Research Papers</span>
            <span className="text-[#CEFD46]">/</span>
            <span>Conclaves</span>
            <span className="text-[#CEFD46]">/</span>
          </div>
        </div>
      </div>
    </section>
  );
}
