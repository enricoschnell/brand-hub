"use client";

import { useState } from "react";
import { useIsMobile } from "@/lib/hooks";
import { BRAND_COLORS } from "@/lib/brand-data";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";
import { cn, needsRing } from "@/lib/utils";

// --- Helpers ---
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function sRGBtoLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b);
}

function wcagRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 10) / 10;
}

function wcagLabel(ratio: number): { label: string; pass: boolean } {
  if (ratio >= 7) return { label: "AAA", pass: true };
  if (ratio >= 4.5) return { label: "AA", pass: true };
  if (ratio >= 3) return { label: "AA+", pass: true };
  return { label: "—", pass: false };
}

// Derive a CSS-variable-style token name from color name + group
function tokenName(group: string, name: string): string {
  const g = group.toLowerCase().replace(/ä/g, "a").replace(/ü/g, "u").replace(/ö/g, "o");
  const n = name.toLowerCase().replace(/\s+/g, "-").replace(/[äÄ]/g, "a").replace(/[üÜ]/g, "u").replace(/[öÖ]/g, "o");
  if (g === "akzent") return `--brand-${n}`;
  if (g === "text") return `--brand-text-${n}`;
  if (g === "hintergrunde") return `--brand-bg-${n}`;
  if (g === "ui") return `--brand-ui-${n}`;
  if (g === "buttons") return `--brand-btn-${n.replace("cta-", "").replace("outline-", "outline-")}`;
  return `--brand-${n}`;
}

// Approved color combinations with WCAG data
const COMBINATIONS = [
  { fg: "#353b43", bg: "#f8f8f7", label: "Text auf Hintergrund", usage: "Fließtext, Body Copy" },
  { fg: "#f8f8f7", bg: "#20252b", label: "Hell auf Dark", usage: "Navigation, Footer" },
  { fg: "#59eded", bg: "#050c11", label: "Cyan auf Page Dark", usage: "Kennzahlen, Highlights" },
  { fg: "#f8f8f7", bg: "#050c11", label: "Hell auf Page Dark", usage: "Hero-Text auf Fotohintergrund" },
  { fg: "#353b43", bg: "#ffffff", label: "Primary auf Weiß", usage: "Cards, Dokumente" },
  { fg: "#868c95", bg: "#f8f8f7", label: "Secondary auf Hintergrund", usage: "Untertitel, Captions" },
];

export default function ColorsPage() {
  const mobile = useIsMobile();
  const [copied, setCopied] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <PageHeader
        title="Farben"
        desc="Farbpalette aus dem CASAGO Design-System. Klicke auf einen Wert zum Kopieren."
        mobile={mobile}
      />

      {BRAND_COLORS.map((group, gi) => (
        <Sect key={group.group} label={group.group} mobile={mobile} last={gi === BRAND_COLORS.length - 1 && false}>
          <div
            className={cn(
              "grid gap-4",
              mobile
                ? "grid-cols-2"
                : {
                    1: "grid-cols-1",
                    2: "grid-cols-2",
                    3: "grid-cols-3",
                    4: "grid-cols-4",
                  }[Math.min(group.colors.length, 4)] ?? "grid-cols-5"
            )}
          >
            {group.colors.map((c) => {
              const dark = needsRing(c.hex);
              const isAccent = c.accent;
              const active = copied === c.hex;
              const isHovered = hovered === c.hex;
              const [r, g, b] = hexToRgb(c.hex);
              const token = tokenName(group.group, c.name);
              const contrastWhite = wcagRatio(c.hex, "#ffffff");
              const contrastBlack = wcagRatio(c.hex, "#000000");
              const bestContrast = contrastWhite > contrastBlack ? contrastWhite : contrastBlack;
              const { label: wcagLbl, pass } = wcagLabel(bestContrast);

              return (
                <div
                  key={c.hex + c.name}
                  onClick={() => copy(c.hex)}
                  onMouseEnter={() => setHovered(c.hex)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer group"
                >
                  {/* Swatch */}
                  <div
                    className={cn(
                      "aspect-square rounded-[10px] flex items-center justify-center transition-transform duration-100 relative overflow-hidden",
                      dark && "ring-1 ring-inset ring-white/[0.08]",
                      active && "scale-[0.96]"
                    )}
                    style={{ background: isAccent ? "#0a0a0b" : c.hex }}
                  >
                    {isAccent && (
                      <div className="w-8 h-8 rounded-full" style={{ background: c.hex }} />
                    )}

                    {/* RGB overlay on hover */}
                    {isHovered && !active && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] rounded-[10px]">
                        <span className="font-mono text-white text-[10px] text-center leading-loose px-2">
                          {r} {g} {b}
                        </span>
                      </div>
                    )}

                    {/* Copy feedback */}
                    {active && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-[10px]">
                        <span className="text-white text-[11px] font-medium font-hub">Kopiert</span>
                      </div>
                    )}
                  </div>

                  {/* Labels */}
                  <div className="pt-2 px-0.5 flex justify-between items-baseline gap-1">
                    <span className="text-[12px] font-medium text-hub-t1 font-hub truncate">{c.name}</span>
                    {pass && (
                      <span className={cn(
                        "text-[10px] font-mono shrink-0 px-1 rounded",
                        wcagLbl === "AAA" ? "text-brand-cyan" : "text-hub-t2"
                      )}>
                        {wcagLbl}
                      </span>
                    )}
                  </div>
                  <div className="px-0.5 flex justify-between items-baseline">
                    <span className={cn(
                      "text-[11px] font-mono transition-colors duration-150",
                      active ? "text-hub-t1" : "text-hub-t3"
                    )}>
                      {c.hex.toUpperCase()}
                    </span>
                  </div>
                  <div className="px-0.5 pt-0.5">
                    <span className="text-[10px] font-mono text-hub-t3/60 truncate block">{token}</span>
                  </div>
                  <div className="px-0.5 pt-0.5 text-[11px] text-hub-t3 leading-snug">{c.desc}</div>
                </div>
              );
            })}
          </div>
        </Sect>
      ))}

      {/* Empfohlene Kombinationen */}
      <Sect label="Empfohlene Kombinationen" mobile={mobile} last>
        <p className={cn("text-hub-t2 leading-relaxed mb-6 max-w-[520px]", mobile ? "text-[13px]" : "text-[14px]")}>
          Freigegebene Farbpaarungen mit WCAG-Kontrastverhältnis. Für alle anderen Kombinationen bitte den Marken-Assistenten nutzen.
        </p>
        <div className={cn("grid gap-3", mobile ? "grid-cols-1" : "grid-cols-2")}>
          {COMBINATIONS.map((combo) => {
            const ratio = wcagRatio(combo.fg, combo.bg);
            const { label: lbl, pass } = wcagLabel(ratio);
            return (
              <div key={combo.label} className="rounded-xl border border-hub-border bg-hub-surface overflow-hidden">
                {/* Preview bar */}
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{ background: combo.bg }}
                >
                  <span className="text-[14px] font-medium font-brand" style={{ color: combo.fg }}>
                    Aa — {combo.label}
                  </span>
                  <span
                    className={cn("text-[11px] font-mono px-1.5 py-0.5 rounded", pass ? "bg-black/10" : "bg-red-500/20")}
                    style={{ color: combo.fg, opacity: 0.8 }}
                  >
                    {ratio}:1 {lbl}
                  </span>
                </div>
                {/* Meta */}
                <div className="px-4 py-2.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: combo.fg, border: "1px solid rgba(255,255,255,0.1)" }} />
                    <span className="text-[11px] font-mono text-hub-t3">{combo.fg.toUpperCase()}</span>
                    <span className="text-hub-t3 text-[11px]">auf</span>
                    <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: combo.bg, border: "1px solid rgba(255,255,255,0.1)" }} />
                    <span className="text-[11px] font-mono text-hub-t3">{combo.bg.toUpperCase()}</span>
                  </div>
                  <span className="text-[11px] text-hub-t3 shrink-0">{combo.usage}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Sect>
    </div>
  );
}
