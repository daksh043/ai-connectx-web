import { useCallback, useEffect, useRef, useState } from "react";
import { campaignAPI } from "../lib/api";
import { BarChart3, TrendingUp } from "lucide-react";
import InlineError from "../components/InlineError";

interface CampaignAnalytics {
  campaign_id: number;
  campaign_name: string;
  total_prospects: number;
  companies_discovered: number;
  contacts_discovered: number;
  qualified_prospects: number;
  linkedin_drafts: number;
  emails_drafted: number;
  messages_approved: number;
  messages_sent: number;
  replies: number;
  positive_responses: number;
  meetings: number;
  pipeline_breakdown: Record<string, number>;
}

interface Campaign {
  id: number;
  name: string;
}

export default function AnalyticsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [analytics, setAnalytics] = useState<CampaignAnalytics | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [campaignError, setCampaignError] = useState("");
  const [analyticsError, setAnalyticsError] = useState("");
  const analyticsRequestId = useRef(0);

  const fetchCampaigns = useCallback(async () => {
    try {
      const response = await campaignAPI.list();
      setCampaigns(response.data);
      setCampaignError("");
    } catch {
      setCampaignError("Could not load campaigns for analytics.");
    }
  }, []);

  useEffect(() => {
    let active = true;
    campaignAPI.list().then((response) => {
      if (!active) return;
      setCampaigns(response.data);
      setCampaignError("");
    }).catch(() => {
      if (active) setCampaignError("Could not load campaigns for analytics.");
    });
    return () => { active = false; };
  }, []);

  useEffect(() => () => {
    analyticsRequestId.current += 1;
  }, []);

  const selectCampaign = async (campaignId: number) => {
    const requestId = ++analyticsRequestId.current;
    setSelectedCampaign(campaignId);
    setAnalytics(null);
    setAnalyticsError("");
    setLoading(true);

    try {
      const response = await campaignAPI.analytics(campaignId);
      if (analyticsRequestId.current === requestId) setAnalytics(response.data);
    } catch {
      if (analyticsRequestId.current === requestId) {
        setAnalyticsError("Could not load analytics for this campaign. Please try again.");
      }
    } finally {
      if (analyticsRequestId.current === requestId) setLoading(false);
    }
  };

  const metricCards = analytics
    ? [
        { label: "Companies Found", value: analytics.companies_discovered, color: "text-blue-400" },
        { label: "Qualified", value: analytics.qualified_prospects, color: "text-violet-400" },
        { label: "Messages Sent", value: analytics.messages_sent, color: "text-emerald-400" },
        { label: "Replies", value: analytics.replies, color: "text-amber-400" },
        { label: "Positive Responses", value: analytics.positive_responses, color: "text-green-400" },
        { label: "Meetings", value: analytics.meetings, color: "text-pink-400" },
      ]
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-primary-400" /> Analytics
        </h1>
        <p className="text-dark-400 text-sm mt-1">Track outreach performance and outcomes</p>
      </div>
      {campaignError && <InlineError message={campaignError} onRetry={() => void fetchCampaigns()} />}

      {/* Campaign selector */}
      <div className="flex gap-2 flex-wrap">
        {campaigns.map((c) => (
          <button
            key={c.id}
            onClick={() => selectCampaign(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedCampaign === c.id
                ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                : "bg-dark-800/50 text-dark-400 border border-white/5 hover:border-white/10"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {!selectedCampaign ? (
        <div className="glass-card p-12 text-center">
          <BarChart3 className="w-12 h-12 text-dark-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-dark-300">Select a campaign</h3>
          <p className="text-dark-500 text-sm mt-2">Choose a campaign to view its analytics</p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <div key={i} className="h-28 shimmer-loading rounded-2xl" />)}
        </div>
      ) : analyticsError ? (
        <InlineError message={analyticsError} onRetry={selectedCampaign ? () => void selectCampaign(selectedCampaign) : undefined} />
      ) : analytics ? (
        <>
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {metricCards.map((m) => (
              <div key={m.label} className="glass-card p-6">
                <p className="text-dark-400 text-sm font-medium mb-1">{m.label}</p>
                <p className={`text-3xl font-bold ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* Pipeline Breakdown */}
          {analytics.pipeline_breakdown && Object.keys(analytics.pipeline_breakdown).length > 0 && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent-400" />
                Pipeline Breakdown
              </h3>
              <div className="space-y-3">
                {Object.entries(analytics.pipeline_breakdown).map(([stage, count]) => {
                  const total = Object.values(analytics.pipeline_breakdown).reduce((a, b) => a + b, 0);
                  const pct = total > 0 ? (count / total) * 100 : 0;
                  return (
                    <div key={stage} className="flex items-center gap-4">
                      <span className="text-sm text-dark-400 w-28 capitalize">{stage.replace("_", " ")}</span>
                      <div className="flex-1 h-3 bg-dark-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-dark-200 w-10 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Response Rate */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-dark-100 mb-4">Key Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-dark-900/50 border border-white/5 text-center">
                <p className="text-xs text-dark-400 mb-1">Response Rate</p>
                <p className="text-xl font-bold text-primary-400">
                  {analytics.messages_sent > 0
                    ? `${Math.round((analytics.replies / analytics.messages_sent) * 100)}%`
                    : "—"}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-dark-900/50 border border-white/5 text-center">
                <p className="text-xs text-dark-400 mb-1">Positive Rate</p>
                <p className="text-xl font-bold text-success-400">
                  {analytics.replies > 0
                    ? `${Math.round((analytics.positive_responses / analytics.replies) * 100)}%`
                    : "—"}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-dark-900/50 border border-white/5 text-center">
                <p className="text-xs text-dark-400 mb-1">Qualification Rate</p>
                <p className="text-xl font-bold text-accent-400">
                  {analytics.total_prospects > 0
                    ? `${Math.round((analytics.qualified_prospects / analytics.total_prospects) * 100)}%`
                    : "—"}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-dark-900/50 border border-white/5 text-center">
                <p className="text-xs text-dark-400 mb-1">Meeting Conversion</p>
                <p className="text-xl font-bold text-warning-400">
                  {analytics.messages_sent > 0
                    ? `${Math.round((analytics.meetings / analytics.messages_sent) * 100)}%`
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
