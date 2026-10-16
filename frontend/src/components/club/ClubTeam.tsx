import FloatingScrollBadge from "./FloatingScrollBadge";

export default function ClubTeam() {
  // Core Leadership Team matching Page 12 of PDF
  const coreLeads = [
    {
      name: "Dr. Faculty Mentor",
      role: "FACULTY COORDINATOR",
      desc: "Distinguished researcher in Cognitive Robotics and Neuromorphic architectures with over 40+ citations.",
      dept: "School of Computing Science",
    },
    {
      name: "Daksh Verma",
      role: "CLUB PRESIDENT & ARCHITECT",
      desc: "Specializing in autonomous multi-agent tool executors, LangGraph reasoning loops, and edge inference pipelines.",
      dept: "Artificial Intelligence & ML",
    },
    {
      name: "Bhavesh Bhakta",
      role: "TECHNICAL & WEB LEAD",
      desc: "Full-stack craftsman leading the AI Club web infrastructure, interactive UI/UX, and real-time backend integrations.",
      dept: "Computer Science Engineering",
    },
    {
      name: "Rhea Sen",
      role: "HEAD OF RESEARCH & GENAI",
      desc: "Leading ArXiv paper reading squads, vision-language model fine-tuning, and open-source benchmark evaluations.",
      dept: "Computational Intelligence",
    },
    {
      name: "Aarav Sharma",
      role: "OPERATIONS & CONCLAVE HEAD",
      desc: "Overseeing AI Conclave 4.0 logistics, national hackathon partnerships, and industry speaker relationships.",
      dept: "Information Technology",
    },
    {
      name: "Ananya Iyer",
      role: "CREATIVE & BRAND LEAD",
      desc: "Directing the visual identity, brutalist design systems, and digital art direction across all club touchpoints.",
      dept: "Digital Design & AI Media",
    },
  ];

  // The Web Team with Speech Bubbles matching Page 15 of PDF
  const webTeamMembers = [
    {
      name: "Bhavesh Bhakta",
      role: "Lead Full-Stack Dev",
      quote: "RCB will win next year\n-Change My Mind",
      avatarBg: "bg-[#CEFD46]",
    },
    {
      name: "Aryan Sharma",
      role: "Frontend Engineer",
      quote: "CSS is my passion,\nbut 1px off ruins my day",
      avatarBg: "bg-[#CEFD46]",
    },
    {
      name: "Riya Patel",
      role: "Backend Architect",
      quote: "It worked on my machine,\nso it works in production",
      avatarBg: "bg-[#CEFD46]",
    },
    {
      name: "Tanmay Gupta",
      role: "DevOps & Docker",
      quote: "Git push --force\nand pray to the server gods",
      avatarBg: "bg-[#CEFD46]",
    },
    {
      name: "Sneha Rao",
      role: "UI/UX Designer",
      quote: "Coffee into code pipeline\nrunning at 100% capacity",
      avatarBg: "bg-[#CEFD46]",
    },
    {
      name: "Rohan Das",
      role: "Systems Integrator",
      quote: "Centered a div on first try\nwithout StackOverflow",
      avatarBg: "bg-[#CEFD46]",
    },
    {
      name: "Karan Johar",
      role: "Performance Lead",
      quote: "Why write 10 lines\nwhen 1 line of regex works?",
      avatarBg: "bg-[#CEFD46]",
    },
  ];

  return (
    <section
      id="team"
      className="relative py-24 sm:py-32 px-4 sm:px-8 bg-[#18191B] text-white border-b border-[#2B2D33] overflow-hidden bg-ai-dots-dark"
    >
      <div className="max-w-[1600px] mx-auto">
        
        {/* ─── Part 1: MEET OUR TEAM (Page 12 of PDF) ─── */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 bg-[#CEFD46]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#CEFD46]">
              People Behind The Vision
            </span>
            <span className="w-2.5 h-2.5 bg-[#CEFD46]" />
          </div>
          <h2 className="text-5xl sm:text-7xl font-black font-display tracking-tight uppercase">
            MEET OUR TEAM
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            Our leadership comprises competitive hackathon champions, ArXiv researchers,
            and passionate developers committed to making AI accessible and impactful.
          </p>
        </div>

        {/* Leadership Cards Grid in Rounded Lime Containers (Page 12) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-28">
          {coreLeads.map((member, i) => (
            <div
              key={i}
              className="group bg-[#D7F771] text-black rounded-3xl p-6 sm:p-8 border-4 border-[#CEFD46] hover:border-white transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between font-mono text-[11px] font-bold text-black/75 mb-6">
                  <span className="bg-black text-[#CEFD46] px-2 py-0.5 rounded">
                    {member.role}
                  </span>
                  <span>AI CLUB &apos;24</span>
                </div>

                {/* Member Name */}
                <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-black mb-3">
                  {member.name}
                </h3>

                {/* Description matching Page 12 style */}
                <p className="text-xs sm:text-sm font-sans font-medium text-black/85 leading-relaxed mb-6">
                  {member.desc}
                </p>
              </div>

              {/* Department pill */}
              <div className="pt-4 border-t border-black/15 flex items-center justify-between font-mono text-xs text-black/70 font-bold">
                <span>{member.dept}</span>
                <span className="w-2 h-2 rounded-full bg-black group-hover:scale-150 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* ─── Part 2: The Web Team Wave / Snake Road (Page 15 of PDF) ─── */}
        <div className="pt-16 border-t border-zinc-800 relative">
          <div className="text-center mb-16">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-zinc-400 block mb-1">
              &quot;Meet the minds behind the magic&quot;
            </span>
            <h3 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight text-[#CEFD46]">
              The Web Team
            </h3>
          </div>

          {/* Undulating Snake / Wave Timeline Container matching Page 15 */}
          <div className="relative overflow-x-auto pb-16 pt-12 select-none no-scrollbar">
            
            {/* The Winding Sine Wave Background Ribbon (Page 15) */}
            <div className="min-w-[1100px] relative py-12">
              <svg
                viewBox="0 0 1100 240"
                className="w-full h-48 fill-none stroke-zinc-700/60 stroke-[40] stroke-linecap-round pointer-events-none"
              >
                <path
                  d="M 20 120 C 150 20, 250 220, 380 120 C 510 20, 610 220, 740 120 C 870 20, 970 220, 1080 120"
                />
              </svg>

              {/* Glowing green centerline */}
              <svg
                viewBox="0 0 1100 240"
                className="w-full h-48 fill-none stroke-[#CEFD46] stroke-[4] stroke-linecap-round pointer-events-none absolute inset-0 m-auto opacity-70"
              >
                <path
                  d="M 20 120 C 150 20, 250 220, 380 120 C 510 20, 610 220, 740 120 C 870 20, 970 220, 1080 120"
                />
              </svg>

              {/* Members Placed Along The Wave with Speech Bubbles (Page 15) */}
              <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
                {webTeamMembers.map((member, idx) => {
                  const isTop = idx % 2 === 0;
                  return (
                    <div
                      key={idx}
                      className="relative flex flex-col items-center pointer-events-auto group cursor-pointer"
                      style={{
                        transform: `translateY(${isTop ? "-28px" : "28px"})`,
                      }}
                    >
                      {/* Top Speech Bubble (for isTop === true) */}
                      {isTop && (
                        <div className="mb-3 px-3 py-2 rounded-xl bg-black border border-[#CEFD46]/60 shadow-lg text-center whitespace-pre-line font-mono text-[10px] sm:text-xs text-[#CEFD46] group-hover:scale-105 transition-transform max-w-[150px]">
                          &ldquo;{member.quote}&rdquo;
                        </div>
                      )}

                      {/* Avatar Circle with Initials / Icon */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D7F771] border-4 border-black flex items-center justify-center font-display font-black text-black text-lg sm:text-xl shadow-[0_0_20px_rgba(206,253,70,0.5)] group-hover:scale-110 transition-transform">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </div>

                      {/* Name Label */}
                      <div className="mt-2 text-center">
                        <div className="font-bold text-xs sm:text-sm text-white font-display">
                          {member.name}
                        </div>
                        <div className="font-mono text-[10px] text-zinc-400">
                          {member.role}
                        </div>
                      </div>

                      {/* Bottom Speech Bubble (for isTop === false) */}
                      {!isTop && (
                        <div className="mt-3 px-3 py-2 rounded-xl bg-black border border-[#CEFD46]/60 shadow-lg text-center whitespace-pre-line font-mono text-[10px] sm:text-xs text-[#CEFD46] group-hover:scale-105 transition-transform max-w-[150px]">
                          &ldquo;{member.quote}&rdquo;
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Floating SCROLL TO EXPLORE Badge (Page 15) */}
          <div className="flex justify-end mt-8">
            <FloatingScrollBadge targetId="gallery" dark={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
