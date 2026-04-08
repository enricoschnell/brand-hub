"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 px-6 text-center">
      <AlertTriangle size={32} className="text-hub-t3" strokeWidth={1.5} />
      <div>
        <div className="text-[15px] font-medium text-hub-t1 mb-1">Etwas ist schiefgelaufen</div>
        <p className="text-[13px] text-hub-t2 m-0">Diese Seite konnte nicht geladen werden.</p>
      </div>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-button bg-hub-surface border border-hub-border text-hub-t1 text-[13px] font-medium font-hub cursor-pointer hover:border-hub-border-active transition-colors"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
