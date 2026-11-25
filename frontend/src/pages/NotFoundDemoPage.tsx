import { useEffect } from "react";
import { NotFound, Illustration } from "@/components/ui/not-found";
import AIConnectXNavbar from "../components/zubox/ZuboxNavbar";

export default function NotFoundDemoPage() {
  useEffect(() => {
    document.title = "Not found (nevsky118) | 21st.dev Component";
  }, []);

  return (
    <div className="relative flex flex-col w-full justify-center min-h-svh bg-background p-6 md:p-10">
      <AIConnectXNavbar />
      <div className="relative max-w-5xl mx-auto w-full">
        <Illustration className="absolute inset-0 w-full h-[50vh] opacity-[0.04] dark:opacity-[0.03] text-foreground" />
        <NotFound
          title="Page not found"
          description="Lost, this page is. In another system, it may be."
        />
      </div>
    </div>
  );
}

