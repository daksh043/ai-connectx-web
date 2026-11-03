import * as React from "react";
import { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IllustrationProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function Illustration({ className, ...props }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 1000 450"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      {...props}
    >
      <text
        x="50%"
        y="62%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="430"
        fontWeight="900"
        fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        letterSpacing="-0.045em"
      >
        404
      </text>
    </svg>
  );
}

export interface NotFoundProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  searchButtonText?: string;
  backButtonText?: string;
  homeButtonText?: string;
  homeUrl?: string;
  onSearch?: (query: string) => void;
  onBack?: () => void;
}

export function NotFound({
  title = "Page not found",
  description = "Lost, this page is. In another system, it may be.",
  searchPlaceholder = "Search",
  searchButtonText = "Search",
  backButtonText = "Go back",
  homeButtonText = "Take me home",
  homeUrl = "/",
  onSearch,
  onBack,
  className,
  ...props
}: NotFoundProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = homeUrl;
    }
  };

  return (
    <div
      className={cn(
        "relative z-10 flex flex-col items-center text-center max-w-md mx-auto px-4",
        className
      )}
      {...props}
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
        {title}
      </h1>

      {description && (
        <p className="mt-3 text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
          {description}
        </p>
      )}

      <form onSubmit={handleSearch} className="mt-8 flex w-full items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-lg border border-input bg-background/50 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors shadow-xs"
          />
        </div>
        <button
          type="submit"
          className="h-10 px-4 rounded-lg border border-input bg-background hover:bg-muted text-sm font-medium text-foreground transition-colors cursor-pointer select-none shadow-xs"
        >
          {searchButtonText}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="h-10 px-4 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{backButtonText}</span>
        </button>

        <a
          href={homeUrl}
          className="h-10 px-4 rounded-lg bg-foreground text-background hover:bg-foreground/90 text-sm font-medium inline-flex items-center justify-center transition-colors"
        >
          {homeButtonText}
        </a>
      </div>
    </div>
  );
}

export function Demo() {
  return (
    <div className="relative flex flex-col w-full justify-center min-h-svh bg-background p-6 md:p-10">
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

export default NotFound;
