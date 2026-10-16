import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Bot, Check, LoaderCircle, MessageSquare, Sparkles, UserRound } from "lucide-react";
import { workspaceAPI } from "../lib/api";

type ChatMessage = { role: "assistant" | "user"; content: string; suggestions?: string[] };

const starterPrompts = [
  "Which prospects should I prioritize this week?",
  "Draft a collaboration angle for a fintech company.",
  "Help me design a follow-up workflow for warm leads.",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "I am your outreach copilot. Ask me about campaigns, prospects, positioning, or the next best action.",
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (event?: FormEvent) => {
    event?.preventDefault();
    const message = prompt.trim();
    if (!message || loading) return;
    setPrompt("");
    setMessages((current) => [...current, { role: "user", content: message }]);
    setLoading(true);
    try {
      const response = await workspaceAPI.chat({ message, context: { surface: "assistant" } });
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: response.data.message,
          suggestions: response.data.suggested_actions,
        },
      ]);
    } catch (error: any) {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: error.response?.data?.detail || "I could not reach the AI provider. Try again shortly." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary-400 font-mono">Workspace intelligence</p>
          <h1 className="mt-2 text-3xl font-bold text-dark-100">AI Assistant</h1>
          <p className="mt-2 max-w-2xl text-sm text-dark-400">Turn a plain-language goal into a sharper next move across your outreach workspace.</p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-success-400/20 bg-success-400/5 px-3 py-2 text-xs text-success-400 sm:flex">
          <span className="h-2 w-2 rounded-full bg-success-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" /> Provider connected
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="glass-card flex min-h-[600px] flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400"><Bot className="h-5 w-5" /></div>
              <div><h2 className="font-semibold text-dark-100">Workspace copilot</h2><p className="text-xs text-dark-500">Context-aware guidance for your pipeline</p></div>
            </div>
            <Sparkles className="h-5 w-5 text-accent-400" />
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto p-6">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
                {message.role === "assistant" && <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-500/15 text-primary-400"><Bot className="h-4 w-4" /></div>}
                <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-sm bg-primary-600 text-white" : "rounded-bl-sm border border-white/8 bg-dark-900/60 text-dark-300"}`}>
                  {message.content}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-4 space-y-2 border-t border-white/10 pt-3">
                      {message.suggestions.map((suggestion) => <div key={suggestion} className="flex gap-2 text-xs text-dark-400"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success-400" />{suggestion}</div>)}
                    </div>
                  )}
                </div>
                {message.role === "user" && <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400"><UserRound className="h-4 w-4" /></div>}
              </div>
            ))}
            {loading && <div className="flex items-center gap-3 text-sm text-dark-500"><LoaderCircle className="h-4 w-4 animate-spin text-primary-400" /> Thinking through your workspace...</div>}
          </div>
          <form onSubmit={sendMessage} className="border-t border-white/5 p-5">
            <div className="flex items-end gap-3 rounded-xl border border-white/10 bg-dark-900/70 p-2 focus-within:border-primary-500/50">
              <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} rows={2} className="min-h-12 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-dark-100 outline-none placeholder:text-dark-600" placeholder="Ask about your next outreach move..." />
              <button type="submit" disabled={loading || !prompt.trim()} className="btn-primary h-10 w-10 justify-center p-0 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Send message"><ArrowUpRight className="h-4 w-4" /></button>
            </div>
          </form>
        </section>

        <aside className="space-y-5">
          <div className="glass-card p-5">
            <div className="mb-4 flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary-400" /><h2 className="font-semibold text-dark-100">Start with a prompt</h2></div>
            <div className="space-y-2">{starterPrompts.map((starter) => <button key={starter} onClick={() => setPrompt(starter)} className="w-full rounded-xl border border-white/8 bg-dark-900/50 p-3 text-left text-xs leading-5 text-dark-400 transition hover:border-primary-500/40 hover:text-dark-200">{starter}<ArrowUpRight className="mt-1 h-3.5 w-3.5 text-primary-400" /></button>)}</div>
          </div>
          <div className="rounded-2xl border border-accent-400/15 bg-gradient-to-br from-accent-500/10 to-primary-500/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-300">Approval first</p>
            <p className="mt-3 text-sm leading-6 text-dark-300">The assistant can shape research, drafts, and workflows. Sending remains a deliberate human action.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
