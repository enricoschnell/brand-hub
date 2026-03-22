"use client";

import { Type as TypeIcon, Download, Info } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";
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
        <div className={cn("rounded-xl border border-border bg-card overflow-hidden", mobile ? "p-6" : "p-10")}>
          <div className={cn(mobile ? "block" : "flex gap-12")}>
            <div className={cn("flex-1", mobile && "mb-6")}>
              <div
                className={cn(
                  "font-brand font-medium text-foreground leading-tight tracking-tight mb-5",
                  mobile ? "text-4xl" : "text-5xl"
                )}
                style={{ letterSpacing: "-0.02em" }}
              >
                Aeonik Pro
              </div>
              <p className="text-[13px] text-muted-foreground leading-[1.7] max-w-[400px] mb-6">
                Primäre Marken-Schrift von CoType Foundry. Zwei Gewichte: Regular (400) für Fließtext und UI, Medium (500) für Headlines und Akzente. Kein Bold, kein SemiBold — die Ruhe der Marke entsteht durch diesen bewussten Verzicht.
              </p>
              <div className="text-[13px] text-hub-t3 leading-8 tracking-wide font-brand">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789 .,;:!? äöüß €
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex gap-8 mb-8">
                <div>
                  <div className="text-[72px] font-normal text-foreground leading-none font-brand">Aa</div>
                  <div className="text-[11px] font-mono text-hub-t3 mt-2">Regular 400</div>
                </div>
                <div>
                  <div className="text-[72px] font-medium text-foreground leading-none font-brand">Aa</div>
                  <div className="text-[11px] font-mono text-hub-t3 mt-2">Medium 500</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sect>

      <Sect label="Desktop-Fonts" icon={<Download size={12} />} mobile={mobile}>
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
          <div className="text-[13px] font-medium text-foreground leading-snug mb-2">Schriftdateien für Word, PowerPoint, InDesign</div>
          <p className="text-[13px] text-muted-foreground leading-normal mb-4">Installiere beide Gewichte lokal. Commercial License — nur für CASAGO-Mitarbeiter und beauftragte Dienstleister.</p>
          <div className="flex gap-2 flex-wrap mb-4">
            {fontFiles.map((f) => (
              <FormatChip key={f.file} label={f.label} sublabel={f.sub} filename={f.file} href={`/assets/fonts/${f.file}`} />
            ))}
          </div>
          <div className="flex items-start gap-2 p-4 rounded-button bg-background border border-border">
            <Info size={14} className="text-hub-t3 mt-0.5 shrink-0" />
            <p className="text-[11px] text-hub-t3 leading-relaxed m-0">Nach dem Download beide Gewichte lokal installieren. macOS: Doppelklick → „Installieren". Windows: Rechtsklick → „Für alle Benutzer installieren".</p>
          </div>
        </div>
      </Sect>

      <Sect label="Schriftgrößen" mobile={mobile} last>
        <div className="flex flex-col">
          {scale.map((t, i) => {
            const displaySize = mobile ? Math.min(t.size, 36) : Math.min(t.size, 72);
            return (
              <div
                key={t.name}
                className={cn(
                  "items-baseline",
                  mobile ? "block py-4" : "grid py-5",
                  i < scale.length - 1 && "border-b border-border"
                )}
                style={!mobile ? { gridTemplateColumns: "140px 1fr", gap: 24 } : undefined}
              >
                <div className={cn(mobile && "mb-1.5")}>
                  <div className="text-xs font-medium text-hub-t2 font-mono">{t.name}</div>
                  <div className="text-[11px] text-hub-t3 font-mono mt-0.5">
                    {t.size}px / {t.weight}{t.uc ? " / UC" : ""}{t.tracking !== "normal" ? ` / ${t.tracking}` : ""}
                  </div>
                </div>
                <div
                  className="text-foreground font-brand leading-tight overflow-hidden text-ellipsis whitespace-nowrap"
                  style={{
                    fontSize: displaySize,
                    fontWeight: t.weight,
                    letterSpacing: t.tracking === "normal" ? undefined : t.tracking,
                    textTransform: t.uc ? "uppercase" : undefined,
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
