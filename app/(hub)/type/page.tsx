"use client";

import { Type as TypeIcon, Download, Info } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { C, S, T, monoF, brandF, cardS } from "@/lib/tokens";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";
import { FormatChip } from "@/components/shared/format-chip";

const scale = [
  { name: "Display", size: 82, weight: 400, tracking: "normal", sample: "50" },
  { name: "Heading L", size: 40, weight: 400, tracking: "normal", sample: "Geschäftsfelder" },
  { name: "Heading M", size: 34, weight: 500, tracking: "normal", sample: "Wir betrachten Projekte" },
  { name: "Heading S", size: 32, weight: 500, tracking: "normal", sample: "Eckdaten" },
  { name: "Title", size: 28, weight: 400, tracking: "-0.28px", sample: "Grundstücksankauf" },
  { name: "Body L", size: 18, weight: 400, tracking: "0.36px", sample: "Das Team" },
  { name: "Body", size: 16, weight: 400, tracking: "0.32px", sample: "Wir übernehmen" },
  { name: "Caption", size: 14, weight: 400, tracking: "0.28px", sample: "Den ganzen Text lesen" },
  { name: "Claim", size: 14, weight: 400, tracking: "0.84px", sample: "PLANEN. UMSETZEN. LEBEN.", uc: true },
];

const fontFiles = [
  { label: "Aeonik Pro Regular", sub: "OTF", file: "AeonikPro-Regular.otf" },
  { label: "Aeonik Pro Medium", sub: "OTF", file: "AeonikPro-Medium.otf" },
];

export default function TypePage() {
  const mobile = useIsMobile();

  return (
    <div>
      <PageHeader title="Typografie" desc="Aeonik Pro — die Schrift der Marke. Nur Regular (400) und Medium (500)." mobile={mobile} />

      <Sect label="Schriftfamilie" icon={<TypeIcon size={12} />} mobile={mobile}>
        <div style={{ ...cardS, padding: mobile ? S.lg : S.xl }}>
          <div style={{ display: mobile ? "block" : "flex", gap: 48 }}>
            <div style={{ flex: 1, marginBottom: mobile ? S.lg : 0 }}>
              <div style={{ fontSize: mobile ? 36 : 48, fontWeight: 500, color: C.t1, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 20, fontFamily: brandF }}>Aeonik Pro</div>
              <p style={{ ...T.body, maxWidth: 400, lineHeight: 1.7, marginBottom: S.lg }}>
                Primäre Marken-Schrift von CoType Foundry. Zwei Gewichte: Regular (400) für Fließtext und UI, Medium (500) für Headlines und Akzente. Kein Bold, kein SemiBold — die Ruhe der Marke entsteht durch diesen bewussten Verzicht.
              </p>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 2, letterSpacing: "0.02em", fontFamily: brandF }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789 .,;:!? äöüß €
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
                <div>
                  <div style={{ fontSize: 72, fontWeight: 400, color: C.t1, lineHeight: 1, fontFamily: brandF }}>Aa</div>
                  <div style={{ fontSize: 11, fontFamily: monoF, color: C.t3, marginTop: 8 }}>Regular 400</div>
                </div>
                <div>
                  <div style={{ fontSize: 72, fontWeight: 500, color: C.t1, lineHeight: 1, fontFamily: brandF }}>Aa</div>
                  <div style={{ fontSize: 11, fontFamily: monoF, color: C.t3, marginTop: 8 }}>Medium 500</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sect>

      <Sect label="Desktop-Fonts" icon={<Download size={12} />} mobile={mobile}>
        <div style={{ ...cardS, padding: S.lg }}>
          <div style={{ ...T.bodyStrong, marginBottom: S.sm }}>Schriftdateien für Word, PowerPoint, InDesign</div>
          <p style={{ ...T.body, margin: `0 0 ${S.md}px` }}>Installiere beide Gewichte lokal. Commercial License — nur für CASAGO-Mitarbeiter und beauftragte Dienstleister.</p>
          <div style={{ display: "flex", gap: S.sm, flexWrap: "wrap", marginBottom: S.md }}>
            {fontFiles.map((f) => (
              <FormatChip key={f.file} label={f.label} sublabel={f.sub} filename={f.file} href={`/assets/fonts/${f.file}`} />
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: S.sm, padding: S.md, borderRadius: 10, background: C.bg, border: `1px solid ${C.border}` }}>
            <Info size={14} style={{ color: C.t3, marginTop: 2, flexShrink: 0 }} />
            <p style={{ ...T.caption, margin: 0, lineHeight: 1.6 }}>Nach dem Download beide Gewichte lokal installieren. macOS: Doppelklick → „Installieren". Windows: Rechtsklick → „Für alle Benutzer installieren".</p>
          </div>
        </div>
      </Sect>

      <Sect label="Schriftgrößen" mobile={mobile} last>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {scale.map((t, i) => {
            const displaySize = mobile ? Math.min(t.size, 36) : Math.min(t.size, 72);
            return (
              <div
                key={t.name}
                style={{
                  display: mobile ? "block" : "grid", gridTemplateColumns: "140px 1fr", gap: 24, alignItems: "baseline",
                  padding: `${mobile ? 16 : 20}px 0`, borderBottom: i < scale.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <div style={{ marginBottom: mobile ? 6 : 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: C.t2, fontFamily: monoF }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: C.t3, fontFamily: monoF, marginTop: 3 }}>
                    {t.size}px / {t.weight}{t.uc ? " / UC" : ""}{t.tracking !== "normal" ? ` / ${t.tracking}` : ""}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: displaySize, fontWeight: t.weight, color: C.t1,
                    fontFamily: brandF,
                    letterSpacing: t.tracking === "normal" ? undefined : t.tracking,
                    lineHeight: 1.15, textTransform: t.uc ? "uppercase" : undefined,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}
                >
                  {t.sample}
                </div>
              </div>
            );
          })}
        </div>
      </Sect>
    </div>
  );
}
