import { useCallback, useEffect, useState } from "react";
import { campaignAPI } from "../lib/api";
import InlineError from "../components/InlineError";
import { Plus, Megaphone, Target, MapPin, Trash2, Play, Pause } from "lucide-react";

interface Campaign {
  id: number;
  name: string;
  objective?: string;
  collaboration_type?: string;
  target_industry?: string[];
  target_location?: string;
  tone?: string;
  status: string;
  created_at?: string;
}

const statusColors: Record<string, string> = {
  active: "badge-success",
  paused: "badge-warning",
  completed: "badge-primary",
  draft: "badge-purple",
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryLoad, setRetryLoad] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    name: "",
    objective: "",
    collaboration_type: "",
    target_industry: "",
    target_company_size: "",
    target_location: "",
    target_roles: "",
    tone: "professional",
  });

  const fetchCampaigns = useCallback(async () => {
    try {
      const response = await campaignAPI.list();
      setCampaigns(response.data);
      setError("");
      setRetryLoad(false);
    } catch {
      setError("Could not load campaigns.");
      setRetryLoad(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    campaignAPI.list().then((response) => {
      if (!active) return;
      setCampaigns(response.data);
      setError("");
      setRetryLoad(false);
    }).catch(() => {
      if (!active) return;
      setError("Could not load campaigns.");
      setRetryLoad(true);
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await campaignAPI.create({
        ...form,
        target_industry: form.target_industry.split(",").map((s) => s.trim()).filter(Boolean),
        target_roles: form.target_roles.split(",").map((s) => s.trim()).filter(Boolean),
      });
      setShowCreate(false);
      setForm({ name: "", objective: "", collaboration_type: "", target_industry: "", target_company_size: "", target_location: "", target_roles: "", tone: "professional" });
      fetchCampaigns();
    } catch {
      setError("Could not create the campaign. Please check the details and try again.");
      setRetryLoad(false);
    }
  };

  const toggleStatus = async (id: number, current: string) => {
    const newStatus = current === "active" ? "paused" : "active";
    try {
      await campaignAPI.update(id, { status: newStatus });
      await fetchCampaigns();
    } catch {
      setError("Could not update the campaign status.");
      setRetryLoad(false);
    }
  };

  const deleteCampaign = async (id: number) => {
    if (!confirm("Delete this campaign?")) return;
    try {
      await campaignAPI.delete(id);
      await fetchCampaigns();
    } catch {
      setError("Could not delete the campaign.");
      setRetryLoad(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {error && <InlineError message={error} onRetry={retryLoad ? () => void fetchCampaigns() : undefined} />}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
            <Megaphone className="w-6 h-6 text-primary-400" />
            Campaigns
          </h1>
          <p className="text-dark-400 text-sm mt-1">Create and manage outreach campaigns</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {/* Campaign Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 shimmer-loading rounded-2xl" />
          ))}
        </div>
      ) : error && retryLoad ? null : campaigns.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Megaphone className="w-12 h-12 text-dark-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-dark-300 mb-2">No campaigns yet</h3>
          <p className="text-dark-500 text-sm mb-6">Create your first outreach campaign to start discovering companies</p>
          <button onClick={() => setShowCreate(true)} className="btn-primary">
            <Plus className="w-4 h-4" /> Create Campaign
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {campaigns.map((c) => (
            <div key={c.id} className="glass-card p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-dark-100">{c.name}</h3>
                <span className={`badge ${statusColors[c.status] || "badge-primary"}`}>
                  {c.status}
                </span>
              </div>
              {c.objective && (
                <p className="text-sm text-dark-400 mb-4 line-clamp-2">{c.objective}</p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {c.collaboration_type && (
                  <span className="badge badge-purple">
                    <Target className="w-3 h-3 mr-1" />
                    {c.collaboration_type}
                  </span>
                )}
                {c.target_location && (
                  <span className="badge badge-primary">
                    <MapPin className="w-3 h-3 mr-1" />
                    {c.target_location}
                  </span>
                )}
                {c.target_industry?.map((ind) => (
                  <span key={ind} className="badge badge-success text-xs">{ind}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                <button
                  onClick={() => toggleStatus(c.id, c.status)}
                  className="btn-secondary text-xs py-2 px-3"
                >
                  {c.status === "active" ? (
                    <><Pause className="w-3 h-3" /> Pause</>
                  ) : (
                    <><Play className="w-3 h-3" /> Activate</>
                  )}
                </button>
                <button
                  onClick={() => deleteCampaign(c.id)}
                  className="btn-danger text-xs py-2 px-3"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-dark-100 mb-6">Create Campaign</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Campaign Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="AI Workshop — Industry Partners" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Objective</label>
                <textarea value={form.objective} onChange={(e) => setForm({ ...form, objective: e.target.value })} className="input-field min-h-[80px] resize-none" placeholder="Find companies for a student AI workshop..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Collaboration Type</label>
                  <select value={form.collaboration_type} onChange={(e) => setForm({ ...form, collaboration_type: e.target.value })} className="input-field">
                    <option value="">Select...</option>
                    <option>Workshop</option>
                    <option>Guest Lecture</option>
                    <option>Hackathon</option>
                    <option>Internship</option>
                    <option>Mentorship</option>
                    <option>Sponsorship</option>
                    <option>Company Visit</option>
                    <option>Live Project</option>
                    <option>Industry Outreach</option>
                    <option>Research Collaboration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Company Size</label>
                  <select value={form.target_company_size} onChange={(e) => setForm({ ...form, target_company_size: e.target.value })} className="input-field">
                    <option value="">Any</option>
                    <option>1-10</option>
                    <option>11-50</option>
                    <option>51-200</option>
                    <option>201-500</option>
                    <option>500+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Target Industries (comma-separated)</label>
                <input value={form.target_industry} onChange={(e) => setForm({ ...form, target_industry: e.target.value })} className="input-field" placeholder="AI, SaaS, FinTech" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Location</label>
                <input value={form.target_location} onChange={(e) => setForm({ ...form, target_location: e.target.value })} className="input-field" placeholder="India, Mumbai, Remote" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Target Roles (comma-separated)</label>
                <input value={form.target_roles} onChange={(e) => setForm({ ...form, target_roles: e.target.value })} className="input-field" placeholder="Founder, HR, Engineering Manager" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Tone</label>
                <select value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })} className="input-field">
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="concise">Concise</option>
                  <option value="student-led">Student-led</option>
                  <option value="formal">Formal</option>
                  <option value="conversational">Conversational</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1 justify-center">Create Campaign</button>
                <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
