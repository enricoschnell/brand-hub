"use client";

import { BookOpen, CheckCircle, XCircle, Shield } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
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
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
          <div className={`${mobile ? "" : "flex gap-10 items-center"}`}>
            <div className={`bg-background rounded-[10px] p-6 flex items-center justify-center ${mobile ? "mb-4" : ""} min-w-[200px]`}>
              <Wm fill="var(--foreground)" w={160} />
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-2">
                Die <strong className="text-foreground">Wortmarke</strong> ist das einzige Markenzeichen von CASAGO. Es gibt keine Bildmarke und keine Wort-Bildmarke.
              </p>
              <p className="text-[13px] text-muted-foreground leading-relaxed m-0">
                Die Wortmarke wird stets als Ganzes verwendet. Sie darf nicht beschnitten, verzerrt oder in Einzelbuchstaben zerlegt werden.
              </p>
            </div>
          </div>
        </div>
      </Sect>

      <Sect label="Schrift" icon={<BookOpen size={12} />} mobile={mobile}>
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
          <div className="mb-4">
            <span className="text-[28px] font-medium text-foreground font-brand">Aeonik Pro</span>
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
            Zwei Gewichte — nicht mehr: <strong className="text-foreground">Regular (400)</strong> für Fließtext und UI-Elemente, <strong className="text-foreground">Medium (500)</strong> für Headlines und Akzente. Kein Bold, kein SemiBold, kein Light. Die Ruhe der Marke entsteht durch diesen bewussten Verzicht.
          </p>
          <p className="text-[11px] text-muted-foreground m-0">Lizenz: CoType Foundry — nur für CASAGO-Mitarbeiter und beauftragte Dienstleister.</p>
        </div>
      </Sect>

      <Sect label="Do's & Don'ts" mobile={mobile} last>
        <div className={`grid gap-2.5 ${mobile ? "grid-cols-1" : "grid-cols-2"}`}>
          <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
            <div className="flex items-center gap-[7px] mb-4">
              <CheckCircle size={14} className="text-green-500" />
              <span className="text-[13px] font-medium text-green-500">Do</span>
            </div>
            <div className="flex flex-col gap-2">
              {dos.map((d, i) => (
                <div key={i} className="text-[13px] text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-0.5">+</span>
                  {d}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
            <div className="flex items-center gap-[7px] mb-4">
              <XCircle size={14} className="text-red-500" />
              <span className="text-[13px] font-medium text-red-500">Don't</span>
            </div>
            <div className="flex flex-col gap-2">
              {donts.map((d, i) => (
                <div key={i} className="text-[13px] text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-red-500 flex-shrink-0 mt-0.5">-</span>
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
