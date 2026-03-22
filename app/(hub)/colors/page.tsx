"use client";

import { useState } from "react";
import { useIsMobile } from "@/lib/hooks";
import { C, S, T } from "@/lib/tokens";
import { BRAND_COLORS } from "@/lib/brand-data";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";
import { needsRing } from "@/lib/utils";

export default function ColorsPage() {
  const mobile = useIsMobile();
  const [copied, setCopied] = useState<string | null>(null);
  const monoF = "ui-monospace,'SF Mono',Monaco,monospace";

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <PageHeader title="Farben" desc="Farbpalette aus dem Figma Design-System. Klicke auf einen Wert zum Kopieren." mobile={mobile} />
      {BRAND_COLORS.map((group, gi) => (
        <Sect key={group.group} label={group.group} mobile={mobile} last={gi === BRAND_COLORS.length - 1}>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : `repeat(${Math.min(group.colors.length, 5)}, 1fr)`, gap: mobile ? S.sm : S.sm + 4 }}>
            {group.colors.map((c) => {
              const dark = needsRing(c.hex);
              const isAccent = c.accent;
              const swatchBg = isAccent ? C.bg : c.hex;
              const active = copied === c.hex;
              return (
                <div key={c.hex + c.name} onClick={() => copy(c.hex)} style={{ cursor: "pointer" }}>
                  <div
                    style={{
                      aspectRatio: "1 / 1", borderRadius: 8,
                      background: swatchBg,
                      boxShadow: dark ? "inset 0 0 0 1px rgba(255,255,255,0.08)" : "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "transform 0.12s, box-shadow 0.15s",
                      transform: active ? "scale(0.97)" : "none",
                    }}
                  >
                    {isAccent && <div style={{ width: 32, height: 32, borderRadius: "50%", background: c.hex }} />}
                  </div>
                  <div style={{ padding: `${S.sm}px 2px 0`, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: C.t1 }}>{c.name}</span>
                    <span style={{ fontSize: 11, fontFamily: monoF, color: active ? C.t1 : C.t3, transition: "color 0.15s" }}>
                      {active ? "Kopiert" : c.hex}
                    </span>
                  </div>
                  <div style={{ padding: "2px 2px 0", fontSize: 11, color: C.t3 }}>{c.desc}</div>
                </div>
              );
            })}
          </div>
        </Sect>
      ))}
    </div>
  );
}
