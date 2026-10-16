import { useCallback, useEffect, useState } from "react";
import { outreachAPI } from "../lib/api";
import { Send, Check, X, Mail, MessageSquare, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import InlineError from "../components/InlineError";

interface Message {
  id: number;
  prospect_id: number;
  channel: string;
  subject?: string;
  body: string;
  message_type?: string;
  quality_check?: any;
  status: string;
  created_at?: string;
  sent_at?: string;
}

const statusStyles: Record<string, { color: string; icon: any }> = {
  draft: { color: "badge-purple", icon: Clock },
  pending_approval: { color: "badge-warning", icon: AlertCircle },
  approved: { color: "badge-success", icon: Check },
  sent: { color: "badge-primary", icon: Send },
  delivered: { color: "badge-primary", icon: CheckCircle2 },
};

export default function OutreachPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryLoad, setRetryLoad] = useState(false);

  const fetchMessages = useCallback(() => {
    outreachAPI.messages({ status_filter: filter || undefined }).then((r) => {
      setMessages(r.data);
      setError("");
      setRetryLoad(false);
    }).catch(() => {
      setError("Could not load outreach messages.");
      setRetryLoad(true);
    }).finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const handleApprove = async (id: number) => {
    setActionLoading(true);
    try {
      await outreachAPI.approve(id);
      fetchMessages();
      if (selectedMsg?.id === id) {
        const updated = await outreachAPI.getMessage(id);
        setSelectedMsg(updated.data);
      }
    } catch {
      setError("Could not approve this message.");
      setRetryLoad(false);
    } finally { setActionLoading(false); }
  };

  const handleReject = async (id: number) => {
    setActionLoading(true);
    try {
      await outreachAPI.reject(id);
      fetchMessages();
    } catch {
      setError("Could not reject this message.");
      setRetryLoad(false);
    } finally { setActionLoading(false); }
  };

  const handleSend = async (id: number) => {
    setActionLoading(true);
    try {
      await outreachAPI.send(id);
      fetchMessages();
      if (selectedMsg?.id === id) {
        const updated = await outreachAPI.getMessage(id);
        setSelectedMsg(updated.data);
      }
    } catch {
      setError("Could not send this message.");
      setRetryLoad(false);
    } finally { setActionLoading(false); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {error && <InlineError message={error} onRetry={retryLoad ? () => fetchMessages() : undefined} />}
      <div>
        <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
          <Send className="w-6 h-6 text-primary-400" /> Outreach
        </h1>
        <p className="text-dark-400 text-sm mt-1">Review, approve, and send messages</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["", "draft", "pending_approval", "approved", "sent"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              filter === s ? "bg-primary-500/20 text-primary-400 border border-primary-500/30" : "bg-dark-800/50 text-dark-400 border border-white/5 hover:border-white/10"
            }`}
          >
            {s === "" ? "All" : s.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Message list */}
        <div className="flex-1 space-y-3">
          {loading ? (
            [...Array(4)].map((_, i) => <div key={i} className="h-28 shimmer-loading rounded-2xl" />)
          ) : error && retryLoad ? null : messages.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Send className="w-12 h-12 text-dark-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-dark-300">No messages</h3>
              <p className="text-dark-500 text-sm mt-2">Generate messages from the Companies or Pipeline page</p>
            </div>
          ) : (
            messages.map((msg) => {
              const st = statusStyles[msg.status] || statusStyles.draft;
              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMsg(msg)}
                  className={`glass-card p-5 cursor-pointer ${
                    selectedMsg?.id === msg.id ? "border-primary-500/40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {msg.channel === "linkedin" ? <MessageSquare className="w-4 h-4 text-blue-400" /> : <Mail className="w-4 h-4 text-emerald-400" />}
                      <span className="text-sm font-medium text-dark-200">
                        {msg.channel === "email" && msg.subject ? msg.subject : `${msg.channel} message`}
                      </span>
                    </div>
                    <span className={`badge ${st.color}`}>{msg.status.replace("_", " ")}</span>
                  </div>
                  <p className="text-xs text-dark-400 line-clamp-2">{msg.body}</p>
                  {msg.quality_check?.overall_score && (
                    <div className="mt-2">
                      <span className={`quality-indicator ${msg.quality_check.overall_score >= 70 ? "quality-pass" : "quality-fail"}`}>
                        Quality: {msg.quality_check.overall_score}/100
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Message Detail */}
        {selectedMsg && (
          <div className="w-[440px] flex-shrink-0">
            <div className="glass-card p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-4">
                {selectedMsg.channel === "linkedin" ? <MessageSquare className="w-5 h-5 text-blue-400" /> : <Mail className="w-5 h-5 text-emerald-400" />}
                <h3 className="text-lg font-semibold text-dark-100">
                  {selectedMsg.channel === "email" && selectedMsg.subject ? selectedMsg.subject : "Message Preview"}
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-dark-900/60 border border-white/5 mb-4">
                <p className="text-sm text-dark-200 whitespace-pre-line">{selectedMsg.body}</p>
              </div>

              {/* Quality Check */}
              {selectedMsg.quality_check && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">Quality Check</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedMsg.quality_check).filter(([k]) => !["reasoning", "overall_score"].includes(k)).map(([key, val]) => (
                      <div key={key} className={`quality-indicator ${val === true || val === "appropriate" ? "quality-pass" : val === false ? "quality-fail" : "quality-pass"}`}>
                        {val === true ? <CheckCircle2 className="w-3 h-3" /> : val === false ? <X className="w-3 h-3" /> : null}
                        {key.replace(/_/g, " ")}
                      </div>
                    ))}
                  </div>
                  {selectedMsg.quality_check.reasoning && (
                    <p className="text-xs text-dark-400 mt-3">{selectedMsg.quality_check.reasoning}</p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {(selectedMsg.status === "draft" || selectedMsg.status === "pending_approval") && (
                  <>
                    <button onClick={() => handleApprove(selectedMsg.id)} disabled={actionLoading} className="btn-primary flex-1 justify-center">
                      {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4" /> Approve</>}
                    </button>
                    <button onClick={() => handleReject(selectedMsg.id)} disabled={actionLoading} className="btn-danger flex-1 justify-center">
                      <X className="w-4 h-4" /> Reject
                    </button>
                  </>
                )}
                {selectedMsg.status === "approved" && (
                  <button onClick={() => handleSend(selectedMsg.id)} disabled={actionLoading} className="btn-primary w-full justify-center">
                    {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Send</>}
                  </button>
                )}
                {selectedMsg.status === "sent" && (
                  <div className="w-full text-center text-sm text-success-400 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Sent {selectedMsg.sent_at ? `on ${new Date(selectedMsg.sent_at).toLocaleDateString()}` : ""}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
