import { useCallback, useEffect, useState } from "react";
import { dashboardAPI } from "../lib/api";
import InlineError from "../components/InlineError";
import {
  ArrowUpRight,
  Activity,
  Building2,
  Users,
  Megaphone,
  Send,
  MessageSquare,
  CalendarCheck,
  Clock,
  CheckCircle2,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Stats {
  total_companies: number;
  total_contacts: number;
  total_campaigns: number;
  active_campaigns: number;
  total_prospects: number;
  messages_sent: number;
  replies_received: number;
  meetings_booked: number;
  pending_approvals: number;
  pending_followups: number;
  today_actions: string[];
}

const statCards = [
  { key: "total_companies", label: "Companies", icon: Building2, gradient: "from-blue-600 to-blue-400" },
  { key: "total_contacts", label: "Contacts", icon: Users, gradient: "from-indigo-600 to-blue-500" },
  { key: "messages_sent", label: "Messages Sent", icon: Send, gradient: "from-sky-600 to-cyan-400" },
  { key: "replies_received", label: "Replies", icon: MessageSquare, gradient: "from-cyan-600 to-sky-400" },
  { key: "meetings_booked", label: "Meetings", icon: CalendarCheck, gradient: "from-blue-700 to-indigo-500" },
  { key: "active_campaigns", label: "Active Campaigns", icon: Megaphone, gradient: "from-indigo-600 to-sky-500" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const fetchStats = useCallback(async () => {
    try {
      const response = await dashboardAPI.stats();
      setStats(response.data);
      setLoadError("");
    } catch {
      setLoadError("Could not load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    dashboardAPI.stats().then((response) => {
      if (!active) return;
      setStats(response.data);
      setLoadError("");
    }).catch(() => {
      if (active) setLoadError("Could not load dashboard data.");
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 shimmer-loading rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 shimmer-loading rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7 animate-fade-in dashboard-surface">
      {loadError && <InlineError message={loadError} onRetry={() => { setLoading(true); void fetchStats(); }} />}
      <section className="dashboard-hero">
        <div className="dashboard-hero-grid" />
        <div className="dashboard-hero-copy">
          <p className="dashboard-eyebrow"><Sparkles className="h-3.5 w-3.5" /> AI CONNECT X / COMMAND CENTER</p>
          <h1>Build a pipeline<br /><span>that moves.</span></h1>
          <p className="dashboard-hero-description">Research better partners, write with intent, and keep every relationship moving from first signal to real collaboration.</p>
          <div className="dashboard-hero-actions">
            <Link to="/assistant" className="dashboard-primary-action">Open AI assistant <ArrowUpRight className="h-4 w-4" /></Link>
            <Link to="/campaigns" className="dashboard-secondary-action">Create campaign</Link>
          </div>
        </div>
        <div className="dashboard-light-orbit" aria-hidden="true"><div className="dashboard-orbit-line dashboard-orbit-line-one" /><div className="dashboard-orbit-line dashboard-orbit-line-two" /><div className="dashboard-light-core"><Activity className="h-7 w-7" /></div><span className="dashboard-orbit-label dashboard-orbit-label-one">SIGNAL</span><span className="dashboard-orbit-label dashboard-orbit-label-two">MOMENTUM</span></div>
        <div className="dashboard-hero-footer"><span>01</span><span>Human-led outreach intelligence</span><span className="dashboard-live-dot" /> Live workspace</div>
      </section>

      {/* Stat Cards */}
      <div className="dashboard-stat-grid">
        {statCards.map((card) => {
          const value = stats ? (stats as any)[card.key] : "—";
          return (
            <div key={card.key} className="dashboard-stat-card group cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-dark-400 text-sm font-medium mb-1">{card.label}</p>
                  <p className="text-3xl font-bold text-dark-100">{value}</p>
                </div>
                <div className={`dashboard-stat-icon bg-gradient-to-br ${card.gradient}`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-dark-500">
                <TrendingUp className="w-3 h-3" />
                <span>Updated just now</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Actions + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Actions */}
        <div className="dashboard-panel p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-400" />
            Today&apos;s Actions
          </h2>
          {stats?.today_actions && stats.today_actions.length > 0 ? (
            <div className="space-y-3">
              {stats.today_actions.map((action, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-dark-900/50 border border-white/5"
                >
                  <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                  <span className="text-sm text-dark-300">{action}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-dark-500">
              <CheckCircle2 className="w-10 h-10 mb-3 text-success-400/50" />
              <p className="text-sm">All caught up! No pending actions.</p>
            </div>
          )}
        </div>

        {/* Quick Overview */}
        <div className="dashboard-panel p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent-400" />
            Quick Overview
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl bg-dark-900/50 border border-white/5">
              <span className="text-sm text-dark-400">Total Prospects</span>
              <span className="text-lg font-bold text-dark-100">{stats?.total_prospects || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-dark-900/50 border border-white/5">
              <span className="text-sm text-dark-400">Pending Approvals</span>
              <span className="badge badge-warning">{stats?.pending_approvals || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-dark-900/50 border border-white/5">
              <span className="text-sm text-dark-400">Pending Follow-ups</span>
              <span className="badge badge-purple">{stats?.pending_followups || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-dark-900/50 border border-white/5">
              <span className="text-sm text-dark-400">Response Rate</span>
              <span className="text-sm font-semibold text-success-400">
                {stats && stats.messages_sent > 0
                  ? `${Math.round((stats.replies_received / stats.messages_sent) * 100)}%`
                  : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
