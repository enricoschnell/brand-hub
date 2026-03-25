import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormatChipProps {
  label: string;
  sublabel?: string;
  filename: string;
  href?: string;
}

export function FormatChip({ label, sublabel, filename, href }: FormatChipProps) {
  const base = "inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-border bg-transparent text-xs font-hub min-h-[44px] no-underline transition-colors";

  if (href) {
    return (
      <a
        href={href}
        download={filename}
        title={filename}
        aria-label={`${label} herunterladen`}
        className={cn(base, "text-hub-t2 hover:border-hub-border-active hover:text-hub-t1 cursor-pointer")}
      >
        <Download size={11} aria-hidden="true" />
        <span className="font-medium text-foreground">{label}</span>
        {sublabel && <span className="text-[11px] font-mono text-muted-foreground">{sublabel}</span>}
      </a>
    );
  }

  return (
    <button
      disabled
      title="Bald verfügbar"
      aria-label={`${label} — bald verfügbar`}
      className={cn(base, "text-hub-t3 cursor-not-allowed opacity-40")}
    >
      <Download size={11} aria-hidden="true" />
      <span className="font-medium">{label}</span>
      {sublabel && <span className="text-[11px] font-mono">{sublabel}</span>}
    </button>
  );
}
