import { Link } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  Shield,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function AIConnectXFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="relative z-20 w-full bg-[#07080d]/95 backdrop-blur-2xl border-t border-white/10 text-white font-sans select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/ai-connectx-logo-transparent.png"
                alt="AI ConnectX Emblem"
                className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] group-hover:scale-105 transition-transform"
              />
              <div className="flex items-baseline font-sans font-bold text-lg tracking-tight">
                <span className="text-white">AI</span>
                <span className="text-[#0088ff] ml-1">Connect</span>
                <span className="text-cyan-400 ml-0.5">X</span>
              </div>
            </Link>

            <p className="text-sm text-slate-200 leading-relaxed max-w-sm font-light">
              <span className="text-white font-medium">Connecting Students with Industry. Creating Opportunities.</span> Official initiative at Universal AI University bridging talent with frontier AI technology.
            </p>

            {/* University & Business Details */}
            <div className="space-y-1.5 text-xs text-slate-200 font-mono pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Universal AI University, Kushivili, PO Gaurkamath, Vadap, Karjat, Maharashtra 410201, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a
                  href="mailto:connect@aiconnectx.club"
                  className="hover:text-cyan-300 hover:underline transition-colors"
                >
                  connect@aiconnectx.club
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a
                  href="tel:+917556789000"
                  className="hover:text-cyan-300 hover:underline transition-colors"
                >
                  +91 755 678 9000
                </a>
              </div>
            </div>

            {/* Single Primary Action Button in Footer (Unified Signature Style) */}
            <div className="pt-3">
              <a
                href="https://www.linkedin.com/company/ai-connectx-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-cyan-400 to-[#0088ff] text-slate-950 hover:brightness-110 shadow-[0_4px_20px_rgba(0,229,255,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <LinkedInIcon className="w-4 h-4 text-slate-950 stroke-[2]" />
                <span>Connect on Official LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation & Exploration (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
              Exploration
            </span>
            <ul className="space-y-2 text-xs font-medium text-zinc-300">
              <li>
                <Link to="/" className="hover:text-cyan-300 transition-colors">
                  Home Landing
                </Link>
              </li>
              <li>
                <Link to="/overview" className="hover:text-cyan-300 transition-colors">
                  Mission &amp; Vision
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-cyan-300 transition-colors">
                  Lead Team
                </Link>
              </li>
              <li>
                <Link to="/gallery-preview" className="hover:text-cyan-300 transition-colors">
                  Spatial 3D Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-300 transition-colors">
                  Contact &amp; Join
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Initiatives (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
              Initiatives
            </span>
            <ul className="space-y-2 text-xs font-medium text-zinc-300">
              <li>
                <span className="text-zinc-300">AI Conclave 4.0</span>
              </li>
              <li>
                <span className="text-zinc-300">24-Hour Code Sprint</span>
              </li>
              <li>
                <span className="text-zinc-300">Rover Perception Lab</span>
              </li>
              <li>
                <span className="text-zinc-300">Industry AI Mentorship</span>
              </li>
              <li>
                <Link to="/login" className="text-cyan-300 hover:underline">
                  CRM Outreach Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              <span>Compliance &amp; Trust</span>
            </div>
            <ul className="space-y-2 text-xs font-medium text-zinc-300">
              <li>
                <Link to="/privacy-policy" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>Privacy Policy (DPDP 2023)</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-cyan-300 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>Terms of Service</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-cyan-300 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>Cookie Policy</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-cyan-300 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>Refund &amp; Cancellation</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-cyan-300 transition-colors" />
                </Link>
              </li>
              <li>
                <a
                  href="mailto:privacy@aiconnectx.club?subject=DPDP%20Data%20Deletion%20Request"
                  className="hover:text-cyan-300 transition-colors flex items-center justify-between group text-zinc-400"
                >
                  <span>Data Deletion Request</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-cyan-300 transition-colors" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & DPDP Badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} AI ConnectX.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5 text-cyan-300/80">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>DPDP ACT 2023 COMPLIANT</span>
            </span>
            <span>•</span>
            <span>UAI STUDENT INITIATIVE</span>
            <span>•</span>
            <span>UNIVERSAL AI UNIVERSITY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
