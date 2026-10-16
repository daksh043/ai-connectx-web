import { useCallback, useEffect, useState } from "react";
import { prospectAPI, campaignAPI } from "../lib/api";
import { ChevronRight, Building2, User, Sparkles, Loader2 } from "lucide-react";
import InlineError from "../components/InlineError";

interface Prospect {
  id: number;
  campaign_id: number;
  company_id: number;
  contact_id?: number;
  qualification_score?: number;
  qualification_reasoning?: string;
  collaboration_ideas?: string[];
  status: string;
  company?: { id: number; name: string; industry?: string; location?: string };
  contact?: { id: number; name: string; title?: string };
}

interface Campaign {
  id: number;
  name: string;
}

const PIPELINE_STAGES = [
  { key: "discovered", label: "Discovered", color: "bg-dark-600" },
  { key: "researched", label: "Researched", color: "bg-blue-600" },
  { key: "qualified", label: "Qualified", color: "bg-violet-600" },
  { key: "contacted", label: "Contacted", color: "bg-amber-600" },
  { key: "follow_up", label: "Follow Up", color: "bg-orange-600" },
  { key: "replied", label: "Replied", color: "bg-emerald-600" },
  { key: "discussion", label: "Discussion", color: "bg-cyan-600" },
  { key: "collaboration", label: "Collaboration", color: "bg-green-600" },
  { key: "completed", label: "Completed", color: "bg-primary-600" },
];

export default function PipelinePage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [qualifying, setQualifying] = useState<number | null>(null);
  const [prospectsError, setProspectsError] = useState("");
  const [campaignsError, setCampaignsError] = useState("");
  const [retryLoad, setRetryLoad] = useState(false);

  const fetchProspects = useCallback(() => {
    prospectAPI
      .list({ campaign_id: selectedCampaign || undefined })
      .then((r) => {
        setProspects(r.data);
        setProspectsError("");
        setRetryLoad(false);
      })
      .catch(() => {
        setProspectsError("Could not load prospects for this pipeline.");
        setRetryLoad(true);
      })
      .finally(() => setLoading(false));
  }, [selectedCampaign]);

  const fetchCampaigns = useCallback(() => {
    campaignAPI.list().then((r) => setCampaigns(r.data)).catch(() => setCampaignsError("Could not load campaign filters."));
  }, []);

  useEffect(() => { fetchCampaigns(); }, [fetchCampaigns]);
  useEffect(() => { fetchProspects(); }, [fetchProspects]);

  const handleQualify = async (id: number) => {
    setQualifying(id);
    try {
      await prospectAPI.qualify(id);
      fetchProspects();
    } catch {
      setProspectsError("Could not qualify this prospect. Please try again.");
      setRetryLoad(false);
    } finally { setQualifying(null); }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await prospectAPI.update(id, { status: newStatus });
      fetchProspects();
    } catch {
      setProspectsError("Could not update this prospect's pipeline stage.");
      setRetryLoad(false);
    }
  };

  const grouped = PIPELINE_STAGES.map((stage) => ({
    ...stage,
    prospects: prospects.filter((p) => p.status === stage.key),
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {prospectsError && <InlineError message={prospectsError} onRetry={retryLoad ? fetchProspects : undefined} />}
      {campaignsError && <InlineError message={campaignsError} />}
      <div>
        <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
          <ChevronRight className="w-6 h-6 text-primary-400" /> Pipeline
        </h1>
        <p className="text-dark-400 text-sm mt-1">Track prospects through the outreach pipeline</p>
      </div>

      {/* Campaign filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCampaign(null)}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            !selectedCampaign ? "bg-primary-500/20 text-primary-400 border border-primary-500/30" : "bg-dark-800/50 text-dark-400 border border-white/5"
          }`}
        >
          All Campaigns
        </button>
        {campaigns.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCampaign(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedCampaign === c.id ? "bg-primary-500/20 text-primary-400 border border-primary-500/30" : "bg-dark-800/50 text-dark-400 border border-white/5"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Pipeline Board */}
      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[...Array(5)].map((_, i) => <div key={i} className="w-72 h-64 shimmer-loading rounded-2xl flex-shrink-0" />)}
        </div>
      ) : prospectsError && retryLoad ? null : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {grouped.map((stage) => (
            <div key={stage.key} className="w-72 flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                <h3 className="text-sm font-semibold text-dark-300">{stage.label}</h3>
                <span className="text-xs text-dark-500 ml-auto">{stage.prospects.length}</span>
              </div>
              <div className="space-y-2.5">
                {stage.prospects.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-dark-700 text-center text-xs text-dark-600">
                    No prospects
                  </div>
                ) : (
                  stage.prospects.map((p) => (
                    <div key={p.id} className="pipeline-stage">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-3.5 h-3.5 text-dark-400" />
                        <span className="text-sm font-medium text-dark-100 truncate">
                          {p.company?.name || `Company #${p.company_id}`}
                        </span>
                      </div>
                      {p.contact && (
                        <div className="flex items-center gap-1.5 text-xs text-dark-400 mb-2">
                          <User className="w-3 h-3" />
                          {p.contact.name} · {p.contact.title}
                        </div>
                      )}
                      {p.qualification_score != null && (
                        <div className="text-xs text-dark-500 mb-2">
                          Score: <span className="text-primary-400 font-semibold">{Math.round(p.qualification_score)}/100</span>
                        </div>
                      )}
                      {p.collaboration_ideas && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {p.collaboration_ideas.slice(0, 2).map((idea, i) => (
                            <span key={i} className="badge badge-primary text-[10px]">
                              {typeof idea === "string" ? idea.substring(0, 20) : "Idea"}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-1.5 mt-2">
                        {stage.key === "discovered" && (
                          <button onClick={() => handleQualify(p.id)} disabled={qualifying !== null} className="text-[10px] px-2 py-1 rounded-lg bg-accent-500/15 text-accent-400 hover:bg-accent-500/25 transition-colors">
                            {qualifying === p.id ? <Loader2 className="w-3 h-3 animate-spin inline" /> : <><Sparkles className="w-3 h-3 inline mr-1" />Qualify</>}
                          </button>
                        )}
                        {PIPELINE_STAGES.findIndex((s) => s.key === stage.key) < PIPELINE_STAGES.length - 1 && (
                          <button
                            onClick={() => handleStatusChange(p.id, PIPELINE_STAGES[PIPELINE_STAGES.findIndex((s) => s.key === stage.key) + 1].key)}
                            className="text-[10px] px-2 py-1 rounded-lg bg-primary-500/15 text-primary-400 hover:bg-primary-500/25 transition-colors"
                          >
                            Move →
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
