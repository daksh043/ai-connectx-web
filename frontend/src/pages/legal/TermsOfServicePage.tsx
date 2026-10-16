import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Scale } from "lucide-react";
import AIConnectXNavbar from "../../components/zubox/ZuboxNavbar";
import AIConnectXFooter from "../../components/zubox/AIConnectXFooter";

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Terms of Service: AI ConnectX";
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
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
            Effective Date: October 16, 2026. Please read these Terms of Service carefully before participating in AI ConnectX events, workshops, portals, or communications.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3">1. Nature of the Platform</h2>
            <p className="text-zinc-300">
              AI ConnectX is a student-led educational community operating under the academic auspices of the Undergraduate AI initiatives at Universal AI University (UAI). Our activities include hackathons, educational tutorials, peer mentorship, and project showcases designed to connect aspiring engineers with AI technologies.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3">2. Student &amp; Member Code of Conduct</h2>
            <p className="mb-3">
              By engaging with our platform or attending events, all participants agree to adhere to the following standards:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300 pl-2">
              <li><strong>Zero Harassment:</strong> Maintain a respectful, inclusive environment free from discrimination based on race, gender, sexual orientation, disability, or academic standing.</li>
              <li><strong>Academic Integrity:</strong> Submit original work in hackathons and sprints; properly attribute open-source licenses and collaborative code.</li>
              <li><strong>No Malicious Activity:</strong> Prohibited from attempting unauthorized network penetration, denial-of-service, or data harvesting against club infrastructure.</li>
            </ul>
          </section>

          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3">3. Intellectual Property Rights</h2>
            <p className="mb-3">
              All branding elements, official logos, 3D graphics, website source code, and promotional media belong exclusively to AI ConnectX and its respective creators.
            </p>
            <p className="text-zinc-300">
              Student participants retain 100% intellectual property ownership of the independent project repositories, models, and code artifacts they construct during hackathons and buildathons.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3">4. Disclaimer of Warranties &amp; Limitation of Liability</h2>
            <p className="mb-3">
              Educational materials, software showcases, and AI mentorship are provided on an <em>&quot;as-is&quot;</em> and <em>&quot;as-available&quot;</em> basis without express or implied commercial warranties.
            </p>
            <p className="text-zinc-300">
              AI ConnectX, its student leads, and university faculty advisors shall not be liable for any indirect, incidental, or consequential damages resulting from third-party links, network interruptions, or external hackathon hosting platforms.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3">5. Governing Law &amp; Jurisdiction</h2>
            <p className="text-zinc-300">
              These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts of Madhya Pradesh, India.
            </p>
          </section>
        </div>
      </main>

      <AIConnectXFooter />
    </div>
  );
}
