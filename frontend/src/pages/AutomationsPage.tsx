import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, Bot, Check, GitBranch, LoaderCircle, Plus, ShieldCheck, Trash2, WandSparkles } from "lucide-react";
import { workspaceAPI } from "../lib/api";
import InlineError from "../components/InlineError";

type Automation = {
  id: number;
  name: string;
  description?: string;
  trigger_type: string;
  actions?: Array<Record<string, string>>;
  approval_mode: string;
  status: string;
};

type AutomationDraft = {
  name: string;
  description: string;
  trigger_type: string;
  conditions: Array<Record<string, string>>;
  actions: Array<Record<string, unknown>>;
  approval_mode: string;
  confidence_threshold: number;
  status: string;
};

const emptyDraft: AutomationDraft = {
  name: "",
  description: "",
  trigger_type: "new_prospect",
  conditions: [],
  actions: [],
  approval_mode: "approval_required",
  confidence_threshold: 85,
  status: "draft",
};

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [draft, setDraft] = useState<AutomationDraft>(emptyDraft);
  const [prompt, setPrompt] = useState("");
  const [showBuilder, setShowBuilder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [retryLoad, setRetryLoad] = useState(false);

  const loadAutomations = useCallback(() => {
    workspaceAPI.automations().then((response) => {
      setAutomations(response.data);
      setError("");
      setRetryLoad(false);
    }).catch(() => {
      setError("Could not load workflows.");
      setRetryLoad(true);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadAutomations(); }, [loadAutomations]);

  const generateDraft = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    try {
      const response = await workspaceAPI.generateAutomation({ prompt });
      setDraft(response.data);
    } catch {
      setError("AI workflow generation is unavailable; you can still edit the suggested draft.");
      setRetryLoad(false);
      setDraft({ ...emptyDraft, name: "New outreach workflow", description: prompt, actions: [{ action_type: "generate_draft", config: { instruction: prompt } }] });
    } finally {
      setGenerating(false);
      setShowBuilder(true);
    }
  };

  const saveAutomation = async () => {
    try {
      await workspaceAPI.createAutomation(draft);
      setDraft(emptyDraft);
      setPrompt("");
      setShowBuilder(false);
      loadAutomations();
    } catch {
      setError("Could not save this workflow.");
      setRetryLoad(false);
    }
  };

  const toggleAutomation = async (automation: Automation) => {
    try {
      await workspaceAPI.updateAutomation(automation.id, { status: automation.status === "active" ? "paused" : "active" });
      loadAutomations();
    } catch {
      setError("Could not update this workflow.");
      setRetryLoad(false);
    }
  };

  const deleteAutomation = async (id: number) => {
    try {
      await workspaceAPI.deleteAutomation(id);
      loadAutomations();
    } catch {
      setError("Could not delete this workflow.");
      setRetryLoad(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {error && <InlineError message={error} onRetry={retryLoad ? () => loadAutomations() : undefined} />}
      <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-400">Workflow studio</p>
          <h1 className="mt-2 text-3xl font-bold text-dark-100">Automations</h1>
          <p className="mt-2 max-w-2xl text-sm text-dark-400">Design repeatable outreach workflows while keeping every external action reviewable.</p>
        </div>
        <button onClick={() => { setDraft(emptyDraft); setShowBuilder(true); }} className="btn-primary"><Plus className="h-4 w-4" /> New workflow</button>
      </header>

      <section className="glass-card overflow-hidden border-primary-500/20 bg-gradient-to-br from-primary-500/10 via-dark-900/50 to-accent-500/5 p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-accent-300"><WandSparkles className="h-5 w-5" /><span className="font-mono text-xs font-semibold uppercase tracking-[0.18em]">Describe the outcome</span></div>
            <h2 className="max-w-xl text-2xl font-bold text-dark-100">Let AI sketch the first version of your workflow.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-dark-400">Example: "When a new qualified fintech prospect appears, research the company and prepare a personalized email draft for approval."</p>
          </div>
          <div className="w-full lg:w-[430px]">
            <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={3} className="input-field min-h-24 resize-none bg-dark-950/60" placeholder="Describe what you want to automate..." />
            <button onClick={generateDraft} disabled={generating || !prompt.trim()} className="btn-primary mt-3 w-full justify-center disabled:cursor-not-allowed disabled:opacity-40">{generating ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <WandSparkles className="h-4 w-4" />} Generate workflow</button>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="grid gap-5 md:grid-cols-2"><div className="h-48 shimmer-loading rounded-2xl" /><div className="h-48 shimmer-loading rounded-2xl" /></div>
      ) : error && retryLoad ? null : automations.length === 0 ? (
        <div className="glass-card p-12 text-center"><GitBranch className="mx-auto mb-4 h-10 w-10 text-dark-600" /><h2 className="text-lg font-semibold text-dark-300">No workflows yet</h2><p className="mx-auto mt-2 max-w-md text-sm text-dark-500">Start with a plain-language goal above. Your workflows will appear here with their approval rules and actions.</p></div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {automations.map((automation) => (
            <article key={automation.id} className="glass-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400"><GitBranch className="h-5 w-5" /></div><div><h2 className="font-semibold text-dark-100">{automation.name}</h2><p className="mt-1 text-xs text-dark-500">{automation.description || "Outreach workflow"}</p></div></div>
                <span className={`badge ${automation.status === "active" ? "badge-success" : "badge-warning"}`}>{automation.status}</span>
              </div>
              <div className="my-5 grid grid-cols-2 gap-3"><div className="rounded-xl border border-white/5 bg-dark-900/50 p-3"><p className="text-[10px] uppercase tracking-wider text-dark-600">Trigger</p><p className="mt-1 text-xs capitalize text-dark-300">{automation.trigger_type.replaceAll("_", " ")}</p></div><div className="rounded-xl border border-white/5 bg-dark-900/50 p-3"><p className="text-[10px] uppercase tracking-wider text-dark-600">Actions</p><p className="mt-1 text-xs text-dark-300">{automation.actions?.length || 0} configured</p></div></div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4"><div className="flex items-center gap-2 text-xs capitalize text-dark-500"><ShieldCheck className="h-3.5 w-3.5 text-success-400" /> {automation.approval_mode.replaceAll("_", " ")}</div><div className="flex gap-2"><button onClick={() => toggleAutomation(automation)} className="btn-secondary px-3 py-2 text-xs">{automation.status === "active" ? "Pause" : "Activate"}</button><button onClick={() => deleteAutomation(automation.id)} className="btn-danger px-3 py-2" aria-label="Delete workflow"><Trash2 className="h-3.5 w-3.5" /></button></div></div>
            </article>
          ))}
        </div>
      )}

      {showBuilder && (
        <div className="modal-overlay" onClick={() => setShowBuilder(false)}>
          <div className="modal-content max-w-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-400">Workflow draft</p><h2 className="mt-2 text-xl font-bold text-dark-100">Review before saving</h2></div><Bot className="h-5 w-5 text-accent-400" /></div>
            <div className="mt-6 space-y-4">
              <div><label className="auth-label">Name</label><input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className="input-field" /></div>
              <div><label className="auth-label">Description</label><textarea value={draft.description || ""} onChange={(event) => setDraft({ ...draft, description: event.target.value })} rows={3} className="input-field resize-none" /></div>
              <div className="grid gap-4 md:grid-cols-2"><div><label className="auth-label">Trigger</label><select value={draft.trigger_type} onChange={(event) => setDraft({ ...draft, trigger_type: event.target.value })} className="input-field"><option value="new_prospect">New prospect</option><option value="message_received">Message received</option><option value="followup_due">Follow-up due</option><option value="campaign_match">Campaign match</option></select></div><div><label className="auth-label">Approval mode</label><select value={draft.approval_mode} onChange={(event) => setDraft({ ...draft, approval_mode: event.target.value })} className="input-field"><option value="approval_required">Approval required</option><option value="draft_only">Draft only</option></select></div></div>
              <div className="rounded-xl border border-success-400/15 bg-success-400/5 p-4 text-sm text-dark-300"><div className="flex items-center gap-2 font-medium text-success-400"><Check className="h-4 w-4" /> Human approval stays enabled</div><p className="mt-2 text-xs leading-5 text-dark-500">This workflow can prepare research and drafts, but it cannot send outreach automatically.</p></div>
            </div>
            <div className="mt-7 flex gap-3"><button onClick={saveAutomation} className="btn-primary flex-1 justify-center">Save workflow <ArrowUpRight className="h-4 w-4" /></button><button onClick={() => setShowBuilder(false)} className="btn-secondary flex-1 justify-center">Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
