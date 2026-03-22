"use client";

import { BookOpen, CheckCircle, XCircle, Shield } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { C, S, T, cardS, brandF } from "@/lib/tokens";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";
import { Wm } from "@/components/brand/wortmarke";

const dos = [
  "Wortmarke immer mit ausreichend Freiraum (Schutzzone = Höhe C) verwenden",
  "Nur freigegebene Farbvarianten nutzen: Black, Anthrazit, White, Outline",
  "Aeonik Pro ausschließlich in Regular (400) und Medium (500)",
  "Mindestgröße Digital: 80 px Breite — Print: 25 mm Breite",
  "WCAG AA Kontrast für alle Textelemente einhalten",
];

const donts = [
  "Logo verzerren, drehen, spiegeln oder mit Effekten versehen",
  "Andere Schriftgewichte (Bold, SemiBold, Light) verwenden",
  "#bfc3ca auf hellem Hintergrund verwenden (1.77:1 Kontrast — durchfällt)",
  "Borderradius über 12 px — die Marke ist technisch, nicht verspielt",
  "Bildmarke oder Wort-Bildmarke verwenden — nur die Wortmarke existiert",
];

export default function GuidelinesPage() {
  const mobile = useIsMobile();

  return (
    <div>
      <PageHeader
        title="Markenrichtlinien"
        desc="Regeln für die korrekte Anwendung der CASAGO-Marke. Verbindlich für alle Materialien."
        mobile={mobile}
      />

      <Sect label="Markenzeichen" icon={<Shield size={12} />} mobile={mobile}>
        <div style={{ ...cardS, padding: S.lg }}>
          <div style={{ display: mobile ? "block" : "flex", gap: S.xl, alignItems: "center" }}>
            <div style={{ background: C.bg, borderRadius: 10, padding: S.lg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: mobile ? S.md : 0, minWidth: 200 }}>
              <Wm fill={C.t1} w={160} />
            </div>
            <div>
              <p style={{ ...T.body, margin: `0 0 ${S.sm}px`, lineHeight: 1.7 }}>
                Die <strong style={{ color: C.t1 }}>Wortmarke</strong> ist das einzige Markenzeichen von CASAGO. Es gibt keine Bildmarke und keine Wort-Bildmarke.
              </p>
              <p style={{ ...T.body, margin: 0, lineHeight: 1.7 }}>
                Die Wortmarke wird stets als Ganzes verwendet. Sie darf nicht beschnitten, verzerrt oder in Einzelbuchstaben zerlegt werden.
              </p>
            </div>
          </div>
        </div>
      </Sect>

      <Sect label="Schrift" icon={<BookOpen size={12} />} mobile={mobile}>
        <div style={{ ...cardS, padding: S.lg }}>
          <div style={{ marginBottom: S.md }}>
            <span style={{ fontSize: 28, fontWeight: 500, color: C.t1, fontFamily: brandF }}>Aeonik Pro</span>
          </div>
          <p style={{ ...T.body, margin: `0 0 ${S.md}px`, lineHeight: 1.7 }}>
            Zwei Gewichte — nicht mehr: <strong style={{ color: C.t1 }}>Regular (400)</strong> für Fließtext und UI-Elemente, <strong style={{ color: C.t1 }}>Medium (500)</strong> für Headlines und Akzente. Kein Bold, kein SemiBold, kein Light. Die Ruhe der Marke entsteht durch diesen bewussten Verzicht.
          </p>
          <p style={{ ...T.caption, margin: 0 }}>Lizenz: CoType Foundry — nur für CASAGO-Mitarbeiter und beauftragte Dienstleister.</p>
        </div>
      </Sect>

      <Sect label="Do's & Don'ts" mobile={mobile} last>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: S.sm + 2 }}>
          <div style={{ ...cardS, padding: S.lg }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: S.md }}>
              <CheckCircle size={14} style={{ color: "#22c55e" }} />
              <span style={{ ...T.bodyStrong, color: "#22c55e" }}>Do</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: S.sm }}>
              {dos.map((d, i) => (
                <div key={i} style={{ ...T.body, lineHeight: 1.6, display: "flex", gap: 8 }}>
                  <span style={{ color: "#22c55e", flexShrink: 0, marginTop: 2 }}>+</span>
                  {d}
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...cardS, padding: S.lg }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: S.md }}>
              <XCircle size={14} style={{ color: "#ef4444" }} />
              <span style={{ ...T.bodyStrong, color: "#ef4444" }}>Don't</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: S.sm }}>
              {donts.map((d, i) => (
                <div key={i} style={{ ...T.body, lineHeight: 1.6, display: "flex", gap: 8 }}>
                  <span style={{ color: "#ef4444", flexShrink: 0, marginTop: 2 }}>-</span>
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sect>
    </div>
  );
}
