import { RotateCw, TriangleAlert } from "lucide-react";

interface InlineErrorProps {
  message: string;
  onRetry?: () => void;
}

export default function InlineError({ message, onRetry }: InlineErrorProps) {
  return (
    <div role="alert" className="flex items-center justify-between gap-4 rounded-xl border border-danger-400/20 bg-danger-400/5 px-4 py-3 text-sm text-danger-300">
      <span className="flex items-center gap-2"><TriangleAlert className="h-4 w-4 shrink-0" />{message}</span>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-secondary shrink-0 px-3 py-2 text-xs">
          <RotateCw className="h-3.5 w-3.5" /> Try again
        </button>
      )}
    </div>
  );
}
