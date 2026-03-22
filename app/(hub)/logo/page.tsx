"use client";

import { Image as ImageIcon, Printer, BookOpen, Shield, Maximize } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";
import { FormatChip } from "@/components/shared/format-chip";
import { Wm, WmOutline } from "@/components/brand/wortmarke";

export default function LogoPage() {
  const mobile = useIsMobile();

  const variants = [
    { id: "black", label: "Black", fill: "#000000", bg: "#f8f8f7" },
    { id: "anthrazit", label: "Anthrazit", fill: "#353b43", bg: "#f8f8f7" },
    { id: "white", label: "White", fill: "#ffffff", bg: "#141416" },
    { id: "outline", label: "Outline", bg: "#20252b", isOutline: true },
  ];
  const digitalFormats = [
    { label: "Vektor", sub: "SVG", ext: "svg" },
    { label: "Bild", sub: "PNG", ext: "png" },
    { label: "Dokument", sub: "PDF", ext: "pdf" },
  ];
  const fileName = (variant: string, ext: string) => `CASAGO-Wortmarke-${variant}.${ext}`;

  return (
    <div>
      <PageHeader title="Logo" desc="Freigegebene Wortmarke in allen Varianten und Formaten." mobile={mobile} />

      <Sect label="Digital" icon={<ImageIcon size={12} />} mobile={mobile}>
        <div className={cn("grid gap-2.5", mobile ? "grid-cols-1" : "grid-cols-2")}>
          {variants.map((v) => (
            <div key={v.id} className="rounded-xl border border-border bg-card overflow-hidden">
              <div
                className="flex items-center justify-center p-6"
                style={{ aspectRatio: "3 / 1", background: v.bg }}
              >
                {v.isOutline
                  ? <WmOutline stroke="#ffffff" w={mobile ? 160 : 180} />
                  : <Wm fill={v.fill} w={mobile ? 160 : 180} />}
              </div>
              <div className="px-4 py-3 border-t border-border">
                <div className="text-[13px] font-medium text-foreground leading-snug mb-2">Wortmarke — {v.label}</div>
                <div className="flex flex-wrap gap-1">
                  {digitalFormats.map((f) => {
                    const file = fileName(v.label, f.ext);
                    const href = (f.ext === "svg" || f.ext === "png") ? `/assets/logos/${file}` : undefined;
                    return <FormatChip key={f.ext} label={f.label} sublabel={f.sub} filename={file} href={href} />;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Sect>

      <Sect label="Print (CMYK)" icon={<Printer size={12} />} mobile={mobile}>
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
          <div className="text-[13px] font-medium text-foreground leading-snug mb-2">Druckvorlagen für die Vorstufe</div>
          <p className="text-[13px] text-muted-foreground leading-normal mb-4">CMYK-Farbprofil. Vektordateien für professionellen Druck.</p>
          <div className="flex gap-2 flex-wrap">
            {variants.map((v) => (
              <FormatChip key={v.id} label={`Wortmarke ${v.label}`} sublabel="EPS" filename={fileName(v.label, "eps")} />
            ))}
          </div>
        </div>
      </Sect>

      <Sect label="Verwendung" icon={<BookOpen size={12} />} mobile={mobile} last>
        <p className="text-[13px] text-muted-foreground leading-normal mb-6 max-w-[520px]">
          Die Wortmarke ist das primäre Erkennungszeichen. Halte die Regeln ein, um eine konsistente Markendarstellung zu gewährleisten.
        </p>
        <div className={cn("grid gap-2.5", mobile ? "grid-cols-1" : "grid-cols-2")}>
          {/* Schutzzone card */}
          <div className="rounded-xl border border-border bg-background p-6">
            <div className="flex items-center gap-[7px] mb-4">
              <span className="text-hub-t2 flex"><Shield size={14} /></span>
              <span className="text-[13px] font-medium text-foreground leading-snug">Schutzzone</span>
            </div>
            <div className="flex items-center justify-center mb-4 rounded-[10px] bg-hub-surface" style={{ height: 88, position: "relative" }}>
              <div className="relative rounded-md" style={{ padding: "14px 22px", border: "1.5px dashed var(--hub-t3, #4b4d55)" }}>
                <Wm fill="#8b8d94" w={56} />
                <div className="absolute flex flex-col items-center justify-center" style={{ top: 2, right: -20, bottom: 2 }}>
                  <div className="w-px flex-1 bg-hub-t3 opacity-50" />
                  <span className="font-mono text-hub-t3 whitespace-nowrap" style={{ fontSize: 9, padding: "2px 0" }}>C</span>
                  <div className="w-px flex-1 bg-hub-t3 opacity-50" />
                </div>
              </div>
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed m-0">Mindestabstand um das Logo = Höhe des Buchstaben C. Gilt für alle Varianten und Hintergründe.</p>
          </div>

          {/* Mindestgröße card */}
          <div className="rounded-xl border border-border bg-background p-6">
            <div className="flex items-center gap-[7px] mb-4">
              <span className="text-hub-t2 flex"><Maximize size={14} /></span>
              <span className="text-[13px] font-medium text-foreground leading-snug">Mindestgröße</span>
            </div>
            <div className="flex items-center justify-center mb-4 rounded-[10px] bg-hub-surface gap-8" style={{ height: 88 }}>
              <div className="flex flex-col items-center gap-1.5">
                <Wm fill="#8b8d94" w={80} />
                <div className="flex items-center gap-1">
                  <div className="h-px bg-hub-t3 opacity-50" style={{ width: 12 }} />
                  <span className="font-mono text-hub-t3 whitespace-nowrap" style={{ fontSize: 9 }}>80px</span>
                  <div className="h-px bg-hub-t3 opacity-50" style={{ width: 12 }} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5 opacity-35">
                <Wm fill="#4b4d55" w={40} />
                <div className="flex items-center gap-1">
                  <div className="h-px bg-hub-t3 opacity-50" style={{ width: 8 }} />
                  <span className="font-mono text-hub-t3 whitespace-nowrap line-through" style={{ fontSize: 9 }}>40px</span>
                  <div className="h-px bg-hub-t3 opacity-50" style={{ width: 8 }} />
                </div>
              </div>
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed m-0">Print: mindestens 25mm Breite. Digital: mindestens 80px Breite. Darunter wird das Logo unleserlich.</p>
          </div>
        </div>
      </Sect>
    </div>
  );
}
