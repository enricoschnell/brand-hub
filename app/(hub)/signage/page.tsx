"use client";

import { Construction, Ruler } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";

const formats = [
  {
    title: "Bauzaun Standard",
    dimensions: "3.450 × 1.760 mm",
    desc: "Großformat-Banner für Bauzäune. Wortmarke zentriert, Claim optional unten. Weiß auf anthrazit oder bildbasiert.",
  },
  {
    title: "Bauzaun Kompakt",
    dimensions: "2.000 × 1.000 mm",
    desc: "Kleineres Bauzaun-Format für engere Baustellen. Gleiche Gestaltungsprinzipien wie Standard.",
  },
  {
    title: "Baustellenschild",
    dimensions: "800 × 600 mm",
    desc: "Alu-Dibond oder PVC-Hartschaum. Wortmarke, Projektname, Bauherr-Info. Wetterfest und UV-beständig.",
  },
  {
    title: "Wegweiser / Infotafel",
    dimensions: "Variabel",
    desc: "Orientierungsschilder mit CASAGO-Branding. Klare Typografie (Aeonik Pro Medium), Pfeilsymbole, QR-Codes.",
  },
];

export default function SignagePage() {
  const mobile = useIsMobile();

  return (
    <div>
      <PageHeader
        title="Beschilderung & Bauzaun"
        desc="Vorgaben für Bauzaunbanner, Bauschilder und Wegweiser. Maße, Gestaltung und Druckspezifikationen."
        mobile={mobile}
      />

      <Sect label="Formate & Maße" icon={<Ruler size={12} />} mobile={mobile}>
        <div className={`grid gap-2.5 ${mobile ? "grid-cols-1" : "grid-cols-2"}`}>
          {formats.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card overflow-hidden p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] font-medium text-foreground">{f.title}</span>
                <span className="text-[11px] font-mono text-muted-foreground">{f.dimensions}</span>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed m-0">{f.desc}</p>
            </div>
          ))}
        </div>
      </Sect>

      <Sect label="Gestaltungsregeln" icon={<Construction size={12} />} mobile={mobile} last>
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
          <div className="flex flex-col gap-4">
            {[
              { label: "Wortmarke", value: "Mindestens 400 mm Breite auf Standard-Bauzaun. Immer zentriert oder oben links." },
              { label: "Farben", value: "Anthrazit (#353b43) auf weiß, oder weiß auf Bild. Keine Farbverläufe." },
              { label: "Schrift", value: "Aeonik Pro Medium für Headlines, Regular für Infotexte. Mindestgröße 30 pt auf Bauzaun." },
              { label: "Druck", value: "Mesh-Banner (300 dpi), Alu-Dibond (CMYK). UV-beständige Tinte." },
            ].map((rule) => (
              <div key={rule.label}>
                <div className="text-[13px] font-medium text-foreground">{rule.label}</div>
                <p className="text-[13px] text-muted-foreground leading-relaxed mt-1 mb-0">{rule.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Sect>
    </div>
  );
}
