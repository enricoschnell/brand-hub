"use client";

import { Palette, Shield, Search, Contrast, PenLine, Mail } from "lucide-react";

interface QuickActionsProps {
  onAction: (text: string) => void;
  visible: boolean;
}

const actions = [
  { icon: <Palette size={13} />, label: "Farbe nachschlagen", prompt: "Welche Farbe soll ich für Fließtext verwenden?" },
  { icon: <Shield size={13} />, label: "Logo-Regeln", prompt: "Was sind die wichtigsten Logo-Regeln?" },
  { icon: <Search size={13} />, label: "Asset finden", prompt: "Wo finde ich das weiße Logo als SVG?" },
  { icon: <Contrast size={13} />, label: "Kontrast prüfen", prompt: "Hat #868c95 auf weißem Hintergrund genug Kontrast?" },
  { icon: <PenLine size={13} />, label: "Text schreiben", prompt: "Schreibe einen Social-Media-Post über unser neues Bauprojekt in Prutting." },
  { icon: <Mail size={13} />, label: "Signatur erstellen", prompt: "Erstelle die Email-Signatur für Fred Fröhlich." },
];

export function QuickActions({ onAction, visible }: QuickActionsProps) {
  if (!visible) return null;

  return (
    <div className="flex gap-1.5 flex-wrap justify-center">
      {actions.map((a) => (
        <button
          key={a.label}
          onClick={() => onAction(a.prompt)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-button border border-hub-border bg-hub-surface text-hub-t2 text-xs font-medium font-hub cursor-pointer transition-all duration-150 hover:border-hub-border-active hover:text-hub-t1"
        >
          {a.icon}
          {a.label}
        </button>
      ))}
    </div>
  );
}
