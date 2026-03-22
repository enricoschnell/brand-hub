import { Download } from "lucide-react";
import { C, T, ff } from "@/lib/tokens";

interface FormatChipProps {
  label: string;
  sublabel?: string;
  filename: string;
  href?: string;
}

export function FormatChip({ label, sublabel, filename, href }: FormatChipProps) {
  const available = !!href;
  const monoF = "ui-monospace,'SF Mono',Monaco,monospace";
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 10px",
    borderRadius: 8,
    border: `1px solid ${C.border}`,
    background: "transparent",
    fontSize: 12,
    fontFamily: ff,
    minHeight: 30,
    textDecoration: "none" as const,
  };

  if (available) {
    return (
      <a href={href} download={filename} title={filename} style={{ ...baseStyle, color: C.t2, cursor: "pointer" }}>
        <Download size={11} />
        <span style={{ fontWeight: 500, color: C.t1 }}>{label}</span>
        {sublabel && <span style={{ ...T.caption, fontFamily: monoF }}>{sublabel}</span>}
      </a>
    );
  }

  return (
    <button disabled title="Bald verfügbar" style={{ ...baseStyle, color: C.t3, cursor: "not-allowed", opacity: 0.4 }}>
      <Download size={11} />
      <span style={{ fontWeight: 500, color: C.t3 }}>{label}</span>
      {sublabel && <span style={{ ...T.caption, fontFamily: monoF }}>{sublabel}</span>}
    </button>
  );
}
