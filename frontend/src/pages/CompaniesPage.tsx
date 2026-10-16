import { useCallback, useEffect, useState } from "react";
import { companyAPI } from "../lib/api";
import {
  Building2, Plus, Search, Globe, MapPin, Users, Sparkles,
  ExternalLink, Trash2, Beaker, Loader2,
} from "lucide-react";
import InlineError from "../components/InlineError";

interface Company {
  id: number;
  name: string;
  website?: string;
  industry?: string;
  location?: string;
  size?: string;
  description?: string;
  technologies?: string[];
  linkedin_url?: string;
  research_summary?: string;
  relevance_score?: number;
  relevance_reasoning?: string;
  collaboration_areas?: string[];
  source?: string;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryLoad, setRetryLoad] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDiscover, setShowDiscover] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [researching, setResearching] = useState<number | null>(null);
  const [discoverForm, setDiscoverForm] = useState({ industry: "", location: "", size: "", collaboration_type: "", count: 10 });
  const [discovering, setDiscovering] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", website: "", industry: "", location: "", size: "", description: "", linkedin_url: "" });

  const fetchCompanies = useCallback(() => {
    companyAPI
      .list({ search: searchQuery || undefined })
      .then((res) => {
        setCompanies(res.data);
        setError("");
        setRetryLoad(false);
      })
      .catch(() => {
        setError("Could not load companies.");
        setRetryLoad(true);
      })
      .finally(() => setLoading(false));
  }, [searchQuery]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleDiscover = async (e: React.FormEvent) => {
    e.preventDefault();
    setDiscovering(true);
    try {
      await companyAPI.discover(discoverForm);
      setShowDiscover(false);
      fetchCompanies();
    } catch {
      setError("Company discovery failed. Please try again.");
      setRetryLoad(false);
    } finally {
      setDiscovering(false);
    }
  };

  const handleResearch = async (id: number) => {
    setResearching(id);
    try {
      const res = await companyAPI.research(id);
      setCompanies((prev) => prev.map((c) => (c.id === id ? res.data : c)));
      if (selectedCompany?.id === id) setSelectedCompany(res.data);
    } catch {
      setError("Could not research this company. Please try again.");
      setRetryLoad(false);
    } finally {
      setResearching(null);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await companyAPI.create(addForm);
      setShowAdd(false);
      setAddForm({ name: "", website: "", industry: "", location: "", size: "", description: "", linkedin_url: "" });
      fetchCompanies();
    } catch {
      setError("Could not add the company. Please check the details and try again.");
      setRetryLoad(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this company?")) return;
    try {
      await companyAPI.delete(id);
      setSelectedCompany(null);
      fetchCompanies();
    } catch {
      setError("Could not delete this company.");
      setRetryLoad(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {error && <InlineError message={error} onRetry={retryLoad ? () => void fetchCompanies() : undefined} />}
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
            <Building2 className="w-6 h-6 text-primary-400" />
            Companies
          </h1>
          <p className="text-dark-400 text-sm mt-1">{companies.length} companies discovered</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowDiscover(true)} className="btn-primary">
            <Sparkles className="w-4 h-4" /> AI Discover
          </button>
          <button onClick={() => setShowAdd(true)} className="btn-secondary">
            <Plus className="w-4 h-4" /> Add Manually
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-11"
          placeholder="Search companies..."
        />
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* Company list */}
        <div className="flex-1 space-y-3">
          {loading ? (
            [...Array(5)].map((_, i) => <div key={i} className="h-24 shimmer-loading rounded-2xl" />)
          ) : error && retryLoad ? null : companies.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Building2 className="w-12 h-12 text-dark-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-dark-300 mb-2">No companies yet</h3>
              <p className="text-dark-500 text-sm mb-6">Use AI Discover to find relevant companies</p>
              <button onClick={() => setShowDiscover(true)} className="btn-primary">
                <Sparkles className="w-4 h-4" /> Discover Companies
              </button>
            </div>
          ) : (
            companies.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCompany(c)}
                className={`glass-card p-5 cursor-pointer transition-all ${
                  selectedCompany?.id === c.id ? "border-primary-500/40 bg-primary-500/5" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-dark-100">{c.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-dark-400">
                      {c.industry && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{c.industry}</span>}
                      {c.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</span>}
                      {c.size && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.size}</span>}
                    </div>
                  </div>
                  {c.relevance_score && (
                    <div className={`text-xs font-bold px-2 py-1 rounded-lg ${
                      c.relevance_score >= 70 ? "bg-success-400/15 text-success-400" :
                      c.relevance_score >= 40 ? "bg-warning-400/15 text-warning-400" :
                      "bg-dark-600/30 text-dark-400"
                    }`}>
                      {Math.round(c.relevance_score)}%
                    </div>
                  )}
                </div>
                {c.collaboration_areas && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {c.collaboration_areas.slice(0, 3).map((a) => (
                      <span key={a} className="badge badge-primary text-[10px]">{a}</span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Company Detail */}
        {selectedCompany && (
          <div className="w-[420px] flex-shrink-0">
            <div className="glass-card p-6 sticky top-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-dark-100">{selectedCompany.name}</h2>
                  <p className="text-sm text-dark-400">{selectedCompany.industry} · {selectedCompany.location}</p>
                </div>
                <div className="flex gap-2">
                  {selectedCompany.website && (
                    <a href={selectedCompany.website} target="_blank" rel="noreferrer" className="btn-secondary p-2">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button onClick={() => handleDelete(selectedCompany.id)} className="btn-danger p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {selectedCompany.description && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">About</h4>
                  <p className="text-sm text-dark-300">{selectedCompany.description}</p>
                </div>
              )}

              {selectedCompany.technologies && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCompany.technologies.map((t) => (
                      <span key={t} className="badge badge-purple text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedCompany.research_summary ? (
                <>
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">AI Research Brief</h4>
                    <p className="text-sm text-dark-300 whitespace-pre-line">{selectedCompany.research_summary}</p>
                  </div>
                  {selectedCompany.relevance_reasoning && (
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Why Relevant</h4>
                      <p className="text-sm text-dark-300">{selectedCompany.relevance_reasoning}</p>
                    </div>
                  )}
                  {selectedCompany.collaboration_areas && (
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Collaboration Ideas</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompany.collaboration_areas.map((a) => (
                          <span key={a} className="badge badge-success">{a}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button onClick={() => handleResearch(selectedCompany.id)} disabled={researching === selectedCompany.id} className="btn-primary w-full justify-center">
                  {researching === selectedCompany.id ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Researching...</>
                  ) : (
                    <><Beaker className="w-4 h-4" /> Generate AI Research</>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* AI Discover Modal */}
      {showDiscover && (
        <div className="modal-overlay" onClick={() => setShowDiscover(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-dark-100 mb-2">AI Company Discovery</h2>
            <p className="text-sm text-dark-400 mb-6">Let AI find companies matching your criteria</p>
            <form onSubmit={handleDiscover} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Industry *</label>
                <input value={discoverForm.industry} onChange={(e) => setDiscoverForm({ ...discoverForm, industry: e.target.value })} className="input-field" placeholder="AI, SaaS, FinTech..." required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Location</label>
                  <input value={discoverForm.location} onChange={(e) => setDiscoverForm({ ...discoverForm, location: e.target.value })} className="input-field" placeholder="India, Mumbai..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Size</label>
                  <select value={discoverForm.size} onChange={(e) => setDiscoverForm({ ...discoverForm, size: e.target.value })} className="input-field">
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
                <label className="block text-sm font-medium text-dark-300 mb-1">Collaboration Type</label>
                <input value={discoverForm.collaboration_type} onChange={(e) => setDiscoverForm({ ...discoverForm, collaboration_type: e.target.value })} className="input-field" placeholder="Workshop, Guest Lecture..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Number of companies</label>
                <input type="number" value={discoverForm.count} onChange={(e) => setDiscoverForm({ ...discoverForm, count: parseInt(e.target.value) })} className="input-field" min={1} max={50} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={discovering} className="btn-primary flex-1 justify-center">
                  {discovering ? <><Loader2 className="w-4 h-4 animate-spin" /> Discovering...</> : <><Sparkles className="w-4 h-4" /> Discover</>}
                </button>
                <button type="button" onClick={() => setShowDiscover(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Company Modal */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-dark-100 mb-6">Add Company</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Company Name *</label>
                <input value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Website</label>
                  <input value={addForm.website} onChange={(e) => setAddForm({ ...addForm, website: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Industry</label>
                  <input value={addForm.industry} onChange={(e) => setAddForm({ ...addForm, industry: e.target.value })} className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Location</label>
                  <input value={addForm.location} onChange={(e) => setAddForm({ ...addForm, location: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1">Size</label>
                  <input value={addForm.size} onChange={(e) => setAddForm({ ...addForm, size: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Description</label>
                <textarea value={addForm.description} onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} className="input-field min-h-[80px] resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 justify-center">Add Company</button>
                <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
