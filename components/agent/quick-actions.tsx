"use client";

import { Palette, Shield, Search, Contrast } from "lucide-react";
import { C, ff } from "@/lib/tokens";

interface QuickActionsProps {
  onAction: (text: string) => void;
  visible: boolean;
}

const actions = [
  { icon: <Palette size={13} />, label: "Farbe nachschlagen", prompt: "Welche Farbe soll ich für Fließtext verwenden?" },
  { icon: <Shield size={13} />, label: "Logo-Regeln", prompt: "Was sind die wichtigsten Logo-Regeln?" },
  { icon: <Search size={13} />, label: "Asset finden", prompt: "Wo finde ich das weiße Logo als SVG?" },
  { icon: <Contrast size={13} />, label: "Kontrast prüfen", prompt: "Hat #868c95 auf weißem Hintergrund genug Kontrast?" },
];

export function QuickActions({ onAction, visible }: QuickActionsProps) {
  if (!visible) return null;

  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
      {actions.map((a) => (
        <button
          key={a.label}
          onClick={() => onAction(a.prompt)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 10,
            border: `1px solid ${C.border}`, background: C.surface,
            color: C.t2, fontSize: 12, fontWeight: 500, fontFamily: ff,
            cursor: "pointer", transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.borderActive; e.currentTarget.style.color = C.t1; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.t2; }}
        >
          {a.icon}
          {a.label}
        </button>
      ))}
    </div>
  );
}
