import { Eye, Trophy, Users, Code, Award } from "lucide-react";
import FloatingScrollBadge from "./FloatingScrollBadge";

export default function ClubGallery() {
  const galleryItems = [
    {
      id: 1,
      title: "AI Conclave Main Stage",
      tag: "FLAGSHIP AUDITORIUM",
      aspect: "col-span-12 md:col-span-8 h-64 sm:h-80",
      bgClass: "bg-[#D7F771]",
      caption: "500+ student builders packed inside Central Auditorium during keynote.",
      icon: Users,
    },
    {
      id: 2,
      title: "24h Hackathon Midnight Sprints",
      tag: "CODE JAM",
      aspect: "col-span-12 md:col-span-4 h-64 sm:h-80",
      bgClass: "bg-[#CEFD46]",
      caption: "Teams tuning neural architectures and shipping fast API endpoints at 3 AM.",
      icon: Code,
    },
    {
      id: 3,
      title: "Autonomous Rover Perception Test",
      tag: "ROBOTICS LAB",
      aspect: "col-span-12 md:col-span-4 h-64 sm:h-80",
      bgClass: "bg-[#E2FF66]",
      caption: "Real-time edge testing of point-cloud LiDAR slam and obstacle avoidance.",
      icon: Eye,
    },
    {
      id: 4,
      title: "Grand Prize Trophy Ceremony",
      tag: "PODIUM CELEBRATION",
      aspect: "col-span-12 md:col-span-5 h-64 sm:h-80",
      bgClass: "bg-[#D7F771]",
      caption: "₹1,00,000 cash prize handed to winning autonomous multi-agent health diagnostic team.",
      icon: Trophy,
    },
    {
      id: 5,
      title: "ArXiv Paper Reading Circle",
      tag: "RESEARCH DISSECTION",
      aspect: "col-span-12 md:col-span-3 h-64 sm:h-80",
      bgClass: "bg-[#CEFD46]",
      caption: "Weekly whiteboard dissection of test-time compute & reasoning models.",
      icon: Award,
    },
  ];

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 px-4 sm:px-8 bg-[#161719] text-white border-b border-[#2B2D33] overflow-hidden bg-ai-dots-dark"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section Heading matching Pages 16 & 17 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 bg-[#CEFD46]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#CEFD46]">
                Moments &amp; Sprints
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight uppercase">
              CLUB CHRONICLES
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            Snapshots from our hackathons, paper reading cohorts, robotics deployments,
            and high-energy developer summits.
          </p>
        </div>

        {/* ─── Bento Grid Layout (Pages 16 & 17 of PDF) ─── */}
        <div className="grid grid-cols-12 gap-6 relative">
          {galleryItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`${item.aspect} ${item.bgClass} rounded-3xl p-6 sm:p-8 text-black border-4 border-black/20 hover:border-black transition-all duration-300 shadow-xl flex flex-col justify-between group overflow-hidden relative cursor-pointer`}
              >
                {/* Background dot pattern inside lime cards */}
                <div className="absolute inset-0 bg-ai-dots-lime opacity-30 pointer-events-none" />

                {/* Top Row: Tag & Icon */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-black text-[#CEFD46] font-mono text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded">
                    {item.tag}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-black" />
                  </div>
                </div>

                {/* Center / Bottom Info */}
                <div className="relative z-10 mt-auto">
                  <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans font-medium text-black/80 leading-relaxed max-w-lg">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Floating SCROLL TO EXPLORE Badge (Pages 16 & 17) */}
          <div className="absolute -bottom-10 right-4 sm:-bottom-12 sm:right-8 z-20">
            <FloatingScrollBadge targetId="about" dark={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
