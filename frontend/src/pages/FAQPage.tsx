import { useEffect } from "react";
import AIConnectXNavbar from "../components/zubox/ZuboxNavbar";
import AIConnectXFooter from "../components/zubox/AIConnectXFooter";
import { FAQ } from "@/components/ui/faq-1";

export default function FAQPage() {
  useEffect(() => {
    document.title = "Frequently Asked Questions | AI ConnectX";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050507] text-[#fafafa] flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      <AIConnectXNavbar />

      <main className="flex-1 relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/10 via-cyan-500/10 to-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto">
          <FAQ />
        </div>
      </main>

      <AIConnectXFooter />
    </div>
  );
}

