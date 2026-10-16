import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, ArrowLeft, CheckCircle, Mail } from "lucide-react";
import AIConnectXNavbar from "../../components/zubox/ZuboxNavbar";
import AIConnectXFooter from "../../components/zubox/AIConnectXFooter";

export default function RefundPolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Refund & Cancellation Policy: AI ConnectX";
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-cyan-500/30 selection:text-cyan-200 font-sans antialiased">
      <AIConnectXNavbar />

      <main className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 pt-32 pb-24">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO HOME</span>
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/30 text-[11px] font-mono text-cyan-300 mb-4 uppercase tracking-wider">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Transparency &amp; Fair Access</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
            Effective Date: October 16, 2026. This policy governs registrations, ticketed event entries, and student participation for AI ConnectX initiatives.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3">1. Free Student Membership Policy</h2>
            <p className="text-zinc-300">
              General membership in AI ConnectX, access to open GitHub repositories, peer mentorship sessions, and student community labs are <strong>100% free of charge</strong>. We never charge hidden recurring subscription fees or membership enrollment dues.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3">2. Hackathons, Workshops &amp; Ticketed Conclaves</h2>
            <p className="mb-4">
              For marquee events that require external venue booking, catering, or hardware kit provisioning (e.g. AI Conclave, Rover SLAM Lab), nominal registration fees may apply. The following refund terms govern those registrations:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span><strong>Cancellations &gt; 48 Hours Before Event:</strong> 100% full refund issued within 5–7 working days via original payment method.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span><strong>Cancellations &lt; 48 Hours Before Event:</strong> 50% partial refund, or complete transfer of ticket reservation to another student delegate upon written notice.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span><strong>Event Cancellation by AI ConnectX:</strong> If an event or workshop is rescheduled or cancelled by the organizing committee, 100% of collected fees will be refunded unconditionally.</span>
              </div>
            </div>
          </section>

          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3">3. How to Request a Refund</h2>
            <p className="mb-3">
              To request a refund or ticket transfer, send your ticket booking ID and transaction receipt to:
            </p>
            <div className="inline-flex items-center gap-2 text-cyan-300 font-mono text-sm bg-black/40 border border-white/10 px-4 py-2 rounded-xl">
              <Mail className="w-4 h-4" />
              <a href="mailto:refunds@aiconnectx.club" className="hover:underline">
                refunds@aiconnectx.club
              </a>
            </div>
          </section>
        </div>
      </main>

      <AIConnectXFooter />
    </div>
  );
}
