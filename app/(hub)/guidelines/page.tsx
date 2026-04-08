"use client";

import { BookOpen, Shield } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";
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
        desc="So setzen wir die Marke CASAGO konsistent und richtig ein — in allen Materialien und Anwendungen."
        mobile={mobile}
      />

      <Sect label="Markenzeichen" icon={<Shield size={12} />} mobile={mobile}>
        <div className="rounded-xl border border-hub-border bg-hub-surface overflow-hidden p-6">
          <div className={cn(mobile ? "block" : "flex gap-10 items-center")}>
            <div className={cn("bg-hub-bg rounded-[10px] p-6 flex items-center justify-center min-w-[200px]", mobile && "mb-5")}>
              <Wm fill="var(--hub-t1, #eeeff1)" w={160} />
            </div>
            <div>
              <p className="text-[14px] text-hub-t2 leading-relaxed mb-2">
                Die <strong className="text-hub-t1 font-medium">Wortmarke</strong> ist das einzige Markenzeichen von CASAGO. Es gibt keine Bildmarke und keine Wort-Bildmarke.
              </p>
              <p className="text-[14px] text-hub-t2 leading-relaxed m-0">
                Die Wortmarke wird stets als Ganzes verwendet. Sie darf nicht beschnitten, verzerrt oder in Einzelbuchstaben zerlegt werden.
              </p>
            </div>
          </div>
        </div>
      </Sect>

      <Sect label="Schrift" icon={<BookOpen size={12} />} mobile={mobile}>
        <div className="rounded-xl border border-hub-border bg-hub-surface overflow-hidden p-6">
          <div className="mb-4">
            <span className={cn("font-medium text-hub-t1 font-brand", mobile ? "text-[24px]" : "text-[28px]")}>Aeonik Pro</span>
          </div>
          <p className="text-[14px] text-hub-t2 leading-relaxed mb-4">
            Zwei Gewichte — nicht mehr: <strong className="text-hub-t1 font-medium">Regular (400)</strong> für Fließtext und UI-Elemente, <strong className="text-hub-t1 font-medium">Medium (500)</strong> für Headlines und Akzente. Kein Bold, kein SemiBold, kein Light. Die Ruhe der Marke entsteht durch diesen bewussten Verzicht.
          </p>
          <p className="text-[12px] text-hub-t3 m-0">Lizenz: CoType Foundry — nur für CASAGO-Mitarbeiter und beauftragte Dienstleister.</p>
        </div>
      </Sect>

      <Sect label="Richtig & Falsch" mobile={mobile} last>
        <div className={cn("grid gap-4", mobile ? "grid-cols-1" : "grid-cols-2")}>
          {/* Richtig */}
          <div className="rounded-xl border border-hub-border bg-hub-surface overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan block" />
              <span className="text-[12px] font-semibold text-hub-t1 uppercase tracking-[0.08em]">Richtig</span>
            </div>
            <div className="flex flex-col gap-3">
              {dos.map((d, i) => (
                <div key={i} className="flex gap-3 text-[14px] text-hub-t2 leading-relaxed">
                  <span className="text-brand-cyan shrink-0 mt-0.5 font-medium">+</span>
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* Falsch */}
          <div className="rounded-xl border border-hub-border bg-hub-surface overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive block" />
              <span className="text-[12px] font-semibold text-hub-t3 uppercase tracking-[0.08em]">Falsch</span>
            </div>
            <div className="flex flex-col gap-3">
              {donts.map((d, i) => (
                <div key={i} className="flex gap-3 text-[14px] text-hub-t3 leading-relaxed">
                  <span className="text-destructive shrink-0 mt-0.5">—</span>
                  <span className="line-through decoration-hub-t3/40">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sect>
    </div>
  );
}
