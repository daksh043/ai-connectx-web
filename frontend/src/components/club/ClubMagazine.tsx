import { Download } from "lucide-react";
import FloatingScrollBadge from "./FloatingScrollBadge";

export default function ClubMagazine() {
  return (
    <section
      id="magazine"
      className="relative py-24 sm:py-32 px-4 sm:px-8 bg-[#18191B] text-white border-b border-[#2B2D33] overflow-hidden bg-ai-dots-dark"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section Heading & Reader Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 bg-[#CEFD46]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#CEFD46]">
                Official AI Club Publication
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight uppercase">
              THE TECH DAIGEST
            </h2>
            <p className="text-xs font-mono text-zinc-400 mt-2">
              EDITION 1 // RESEARCH PAPERS, EDITORIAL ESSAYS &amp; DEEP-TECH DISSECTIONS
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/ai_club_website.pdf"
              download="AI_Club_Tech_DAigest.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900/80 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:border-[#CEFD46] transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#CEFD46]" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* ─── Dual-Page Editorial Magazine Spread (Exact Page 13 of PDF) ─── */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border-2 border-zinc-700/80 shadow-2xl bg-white text-black p-6 sm:p-10 lg:p-12">
          
          {/* Subtle paper texture overlay */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
            
            {/* Center Book Spine Divider */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-300 -translate-x-1/2 shadow-inner" />

            {/* ─── Left Page (Page 03 of Edition 1) ─── */}
            <div className="flex flex-col justify-between space-y-6 md:pr-4">
              <div>
                {/* Article 1 Title */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm font-serif italic text-zinc-600">The</span>
                  <h3 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-[#c52828] flex items-center gap-1">
                    Origin <span className="text-sm text-black font-serif italic font-normal">of</span>{" "}
                    <span className="text-5xl sm:text-6xl text-[#c52828] font-black">AI</span>
                  </h3>
                </div>
                <div className="text-xs font-sans text-zinc-500 mb-4 pb-2 border-b border-zinc-200">
                  by <span className="font-semibold text-black">Shivangi Padhy</span>
                </div>

                {/* Article 1 Body Columns */}
                <div className="text-[11px] sm:text-xs leading-relaxed text-zinc-700 font-serif space-y-3">
                  <p>
                    The branch of computer science which is concerned with the automation of
                    intelligent behavior is <strong>Artificial Intelligence</strong>. Way back from
                    the middle of 20th century till this modern era we live in, we have seen how
                    far humanity has progressed in terms of Technology and Quality of Life, but
                    it does not end here. In fact, we have just scratched the surface of endless
                    possibilities with the latest developments in the field of AI.
                  </p>
                  <p>
                    When AI first emerged: It was <strong>1943</strong>. We are at Chicago
                    University of Illinois, USA and there are our star scientists,{" "}
                    <strong>Warren McCulloch</strong>, whose expertise lies in neurology &amp;
                    psychology, along with <strong>Walter Pitts</strong>, whose brilliance lies in
                    mathematics and cyber technology. Both of them combined their knowledge and
                    experience together to publish <em>&quot;The logical calculus of the ideas eminent in nervous activity&quot;</em>.
                  </p>
                  <p>
                    By the 1950s, we had a generation of scientists, mathematicians, and
                    philosophers with the concept of artificial intelligence culturally assimilated.
                    One such person was <strong>Alan Turing</strong>, a young British polymath who
                    explored the mathematical possibility of artificial intelligence.
                  </p>
                </div>
              </div>

              {/* Left Page Footer (Page 03) */}
              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase">
                <span>AI Club VIT Bhopal</span>
                <span>The Tech DAigest • Edition 1</span>
                <span className="font-bold text-black text-sm">03</span>
              </div>
            </div>

            {/* ─── Right Page (Page 04 of Edition 1) ─── */}
            <div className="flex flex-col justify-between space-y-6 md:pl-4">
              <div>
                <div className="text-[11px] sm:text-xs leading-relaxed text-zinc-700 font-serif space-y-3 mb-6">
                  <p>
                    Almost after five years, in <strong>1956</strong>, <strong>John McCarthy</strong>{" "}
                    and <strong>Marvin Minsky</strong> hosted the first AI program. In 1997, IBM&apos;s
                    Deep Blue beats the Chess world champion Garry Kasparov. In 2011, IBM Watson
                    wins against human competitors in Jeopardy.
                  </p>
                  <p>
                    In 2016, one of the most advanced feats in the field of AI was achieved by{" "}
                    <strong>DeepMind&apos;s AlphaGo</strong>, a reinforcement learning based
                    algorithm that managed to beat Lee Sedol, a 9-dan rank GO player with 18
                    international GO titles.
                  </p>
                </div>

                {/* Article 2: Are we even close to the AI shown in Movies? */}
                <div className="pt-3 border-t border-zinc-200">
                  <h4 className="text-lg sm:text-xl font-bold font-display text-black mb-1">
                    Are we even close to the Artificial Intelligence shown in Movies?
                  </h4>
                  <div className="text-xs font-sans text-zinc-500 mb-3">
                    by <span className="font-semibold text-black">Sneha Herlekar</span>
                  </div>

                  {/* Matrix Revolutions Graphic Visual (Page 13) */}
                  <div className="relative h-28 sm:h-32 rounded-xl bg-black overflow-hidden mb-3 flex items-center justify-center p-4 border border-zinc-900 shadow-md">
                    <div className="absolute inset-0 bg-green-500/10 font-mono text-[9px] text-green-500/30 overflow-hidden leading-tight p-1 select-none pointer-events-none">
                      01001001 01001110 01010100 01000101 01001100 01001100 01001001 01000111 01000101 01001110 01000011 01000101
                    </div>
                    <div className="relative text-center">
                      <span className="font-mono text-xs tracking-widest text-green-400 block mb-1">
                        THE MATRIX
                      </span>
                      <span className="font-black text-xl sm:text-2xl tracking-tighter text-white font-display uppercase">
                        REVOLUTIONS
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] leading-relaxed text-zinc-700 font-serif">
                    Back in the 1950s, a computer scientist named John McCarthy coined the term
                    Artificial Intelligence. Although back in 1927, it was Fritz Lang&apos;s
                    visionary film Metropolis that first depicted the idea of intelligent androids.
                  </p>
                </div>
              </div>

              {/* Right Page Footer (Page 04) */}
              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase">
                <span className="font-bold text-black text-sm">04</span>
                <span>The Tech DAigest • Edition 1</span>
                <span>AI Club VIT Bhopal</span>
              </div>
            </div>
          </div>

          {/* Floating SCROLL TO EXPLORE Badge (Page 13) */}
          <div className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-8 z-20">
            <FloatingScrollBadge targetId="team" dark={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
