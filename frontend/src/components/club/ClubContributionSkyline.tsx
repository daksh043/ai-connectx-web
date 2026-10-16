import { useState } from "react";
import { GitHubActivity, type GitHubActivityVariant } from "../ui/github-activity";
import { useClubTheme } from "../../contexts/ClubThemeContext";
import { Activity, GitCommit } from "lucide-react";

const VARIANTS: { id: GitHubActivityVariant; label: string; gradient: string }[] = [
  {
    id: "calamansi",
    label: "Calamansi",
    gradient: "linear-gradient(135deg, #8fa37d 0%, #5c7a67 50%, #39564a 100%)",
  },
  {
    id: "slate",
    label: "Slate Glass",
    gradient: "linear-gradient(135deg, #a79cb7 0%, #687396 50%, #4a5a7f 100%)",
  },
  {
    id: "citrus",
    label: "Warm Citrus",
    gradient: "linear-gradient(135deg, #d69f7e 0%, #b87152 50%, #7d4128 100%)",
  },
  {
    id: "white",
    label: "Minimal Glass",
    gradient: "linear-gradient(135deg, #ffffff 0%, #e9e9ec 50%, #d4d4d8 100%)",
  },
];

export default function ClubContributionSkyline() {
  const { isDark } = useClubTheme();
  const [variant, setVariant] = useState<GitHubActivityVariant>("calamansi");
  const [months, setMonths] = useState<number>(12);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <section id="skyline" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto transition-colors duration-500">
      {/* Eyebrow */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-[2px] bg-[#3b82f6]" />
        <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#3b82f6] flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          Engineering Velocity &amp; GitHub Activity
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2
            className={`font-display font-extrabold text-3xl sm:text-5xl tracking-tight ${
              isDark ? "text-white" : "text-zinc-950"
            }`}
          >
            Open Source Pulse. <br />
            <span className={isDark ? "club-blue-gradient-text" : "club-blue-gradient-text-light"}>
              Live GitHub Activity &amp; Repositories.
            </span>
          </h2>
        </div>
        <p
          className={`text-xs sm:text-sm max-w-md font-tech ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          Real-time GitHub activity stream for <span className="text-[#3b82f6] font-mono font-semibold">daksh043</span>. Squircle contribution heatmap with expandable repository drawer.
        </p>
      </div>

      {/* Main Glass Shell */}
      <div
        className={`rounded-3xl p-4 sm:p-8 border shadow-2xl transition-all duration-300 ${
          isDark
            ? "club-glass-card border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            : "club-light-card border-zinc-200/90 shadow-xl"
        }`}
      >
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <GitCommit className="w-4 h-4 text-[#3b82f6]" />
            <span className="text-white font-medium">daksh043</span>
            <span>//</span>
            <span className="text-zinc-400 hidden sm:inline">LIVE GITHUB TELEMETRY</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Palette selection */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
              {VARIANTS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariant(v.id)}
                  title={v.label}
                  className={`size-6 rounded-lg transition-transform ${
                    variant === v.id ? "scale-110 ring-2 ring-[#3b82f6]" : "opacity-70 hover:opacity-100"
                  }`}
                  style={{ background: v.gradient }}
                />
              ))}
            </div>

            {/* Months & Drawer controls */}
            <div className="flex items-center gap-1 text-xs font-mono">
              {[12, 6, 3].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMonths(m)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] transition-all ${
                    months === m
                      ? "bg-white/15 border-white/30 text-white font-semibold"
                      : "border-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  {m}M
                </button>
              ))}
              <button
                type="button"
                onClick={() => setOpenDrawer(!openDrawer)}
                className="px-2.5 py-1 rounded-lg border border-white/10 text-[11px] text-zinc-300 hover:text-white bg-white/5 transition-colors"
              >
                {openDrawer ? "Collapse Repos" : "Top Repos"}
              </button>
            </div>
          </div>
        </div>

        {/* GitHub Activity Component */}
        <div className="flex flex-col items-center justify-center py-4 overflow-x-auto min-h-[320px]">
          <GitHubActivity
            username="daksh043"
            variant={variant}
            months={months}
            showMonths={true}
            open={openDrawer}
            onOpenChange={setOpenDrawer}
            cellSize={10}
            className="max-w-full drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
