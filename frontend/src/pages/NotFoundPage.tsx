import { useEffect } from "react";
import AIConnectXNavbar from "../components/zubox/ZuboxNavbar";
import AIConnectXFooter from "../components/zubox/AIConnectXFooter";
import { NotFound, Illustration } from "@/components/ui/not-found";

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Page not found | AI ConnectX";
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050507] text-white font-sans antialiased overflow-x-hidden flex flex-col justify-between">
      <AIConnectXNavbar />

      <main className="relative z-10 flex-1 flex flex-col justify-center items-center py-28 px-4 sm:px-6">
        <div className="relative max-w-5xl mx-auto w-full flex items-center justify-center min-h-[50vh]">
          {/* Faint 404 illustration watermark behind the card */}
          <Illustration className="absolute inset-0 w-full h-full max-h-[55vh] opacity-[0.05] dark:opacity-[0.05] text-white pointer-events-none" />

          {/* 21st.dev / nevsky118 Not Found Component */}
          <NotFound
            title="Page not found"
            description="Lost, this page is. In another system, it may be."
            homeUrl="/"
            className="my-auto"
          />
        </div>
      </main>

      <AIConnectXFooter />
    </div>
  );
}
