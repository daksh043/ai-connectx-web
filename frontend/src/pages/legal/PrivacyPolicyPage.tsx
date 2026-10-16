import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Lock, CheckCircle, Mail } from "lucide-react";
import AIConnectXNavbar from "../../components/zubox/ZuboxNavbar";
import AIConnectXFooter from "../../components/zubox/AIConnectXFooter";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Privacy Policy: AI ConnectX (DPDP Act & GDPR Compliant)";
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-cyan-500/30 selection:text-cyan-200 font-sans antialiased">
      <AIConnectXNavbar />

      <main className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 pt-32 pb-24">
        {/* Breadcrumb / Return Link */}
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
            <Shield className="w-3.5 h-3.5" />
            <span>DPDP Act 2023 &amp; GDPR Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
            Effective Date: October 16, 2026 • Last Reviewed: October 2026.
            AI ConnectX is committed to protecting your personal data in accordance with India&apos;s Digital Personal Data Protection Act (DPDP Act, 2023) and global data protection standards.
          </p>
        </div>

        {/* Legal Body Sections */}
        <div className="space-y-10 text-sm sm:text-base text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              1. Identity of the Data Fiduciary
            </h2>
            <p className="mb-4 text-zinc-300">
              AI ConnectX operates as a student-led artificial intelligence initiative affiliated with the Undergraduate AI community at Universal AI University (&quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;).
            </p>
            <div className="text-xs font-mono bg-black/40 border border-white/10 rounded-xl p-4 text-zinc-300 space-y-1">
              <p><strong className="text-white">Organization:</strong> AI ConnectX Student Community</p>
              <p><strong className="text-white">Institution:</strong> Universal AI University (UAI)</p>
              <p><strong className="text-white">Address:</strong> Kushivili, PO Gaurkamath, Vadap, Karjat, Maharashtra 410201, India</p>
              <p><strong className="text-white">Official Contact:</strong> connect@aiconnectx.club</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              2. Data We Collect &amp; Principle of Data Minimization
            </h2>
            <p className="mb-4">
              We strictly adhere to the principle of <em>Data Minimization</em>: we only collect the minimum personal data strictly necessary to fulfill your requests (such as responding to inquiries or registering for hackathons):
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300 pl-2">
              <li><strong>Contact Inquiries:</strong> Your full name, email address, and message content submitted through our contact forms.</li>
              <li><strong>Event / Hackathon Registration:</strong> Name, university email, academic year, and project team member details.</li>
              <li><strong>Technical Logs:</strong> Non-identifying technical metadata (browser type, timestamp, page response latency) collected without selling or distributing user profiles.</li>
            </ul>
            <p className="mt-4 text-xs text-cyan-300/90 font-mono bg-cyan-950/20 border border-cyan-400/20 p-3 rounded-lg">
              NOTICE: We DO NOT collect Aadhaar, biometric information, financial passwords, or sensitive personal data.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              3. Purpose of Processing &amp; Lawful Basis
            </h2>
            <p className="mb-3">
              Under Section 6 of the DPDP Act 2023, personal data is processed solely on the basis of your explicit, informed consent:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-black/40 rounded-lg border border-white/10">
                <span className="text-cyan-400 font-semibold block mb-1">COMMUNICATION</span>
                Responding to your queries, corporate sponsorship applications, and mentorship requests.
              </div>
              <div className="p-3 bg-black/40 rounded-lg border border-white/10">
                <span className="text-cyan-400 font-semibold block mb-1">EVENT LOGISTICS</span>
                Verifying attendee credentials for AI Conclaves, workshops, and buildathons.
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              4. Rights of the Data Principal (Your Rights)
            </h2>
            <p className="mb-4">
              As a citizen and Data Principal under the DPDP Act 2023 and GDPR, you have enforceable legal rights regarding your personal information:
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span><strong>Right to Access &amp; Summary:</strong> Request a complete summary of the personal data we hold about you.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span><strong>Right to Correction &amp; Erasure:</strong> Request the prompt correction of inaccuracies or complete deletion of your records.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span><strong>Right to Withdraw Consent:</strong> You may revoke consent at any time without retroactive penalty.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span><strong>Right of Grievance Redressal:</strong> Submit a complaint directly to our Grievance Officer, with an SLA response within 7 business days.</span>
              </div>
            </div>
          </section>

          {/* Section 5 - Data Deletion Action */}
          <section className="bg-gradient-to-br from-cyan-950/30 to-black/50 border border-cyan-400/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-400/10 rounded-xl border border-cyan-400/20 text-cyan-300 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">How to Request Immediate Data Deletion</h3>
                <p className="text-sm text-zinc-300">
                  To permanently delete all contact transmissions, event registrations, or team communications associated with your email address, send an email with the subject line <code>&quot;DPDP Data Deletion Request&quot;</code> to:
                </p>
                <div className="pt-2">
                  <a
                    href="mailto:privacy@aiconnectx.club?subject=DPDP%20Data%20Deletion%20Request"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Deletion Request</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 - Grievance Officer */}
          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              5. Grievance Redressal Officer (DPDP Act Mandate)
            </h2>
            <p className="mb-4">
              In compliance with Section 10 of India&apos;s DPDP Act, AI ConnectX has appointed a dedicated Data Grievance Redressal Officer:
            </p>
            <div className="text-xs font-mono bg-black/40 border border-white/10 rounded-xl p-4 text-zinc-300 space-y-1">
              <p><strong className="text-white">Designation:</strong> Data Protection &amp; Grievance Redressal Officer</p>
              <p><strong className="text-white">Organization:</strong> AI ConnectX, Universal AI University</p>
              <p><strong className="text-white">Email:</strong> grievance@aiconnectx.club / connect@aiconnectx.club</p>
              <p><strong className="text-white">Address:</strong> Student Welfare &amp; Innovation Cell, Universal AI University, Karjat, Maharashtra 410201, India</p>
              <p><strong className="text-white">Resolution Timeline:</strong> Within 7 business days from receipt of grievance.</p>
            </div>
          </section>
        </div>
      </main>

      <AIConnectXFooter />
    </div>
  );
}
