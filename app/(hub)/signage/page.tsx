"use client";

import { Construction, Ruler, MapPin } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { C, S, T, cardS, monoF } from "@/lib/tokens";
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
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: S.sm + 2 }}>
          {formats.map((f) => (
            <div key={f.title} style={{ ...cardS, padding: S.lg }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: S.md }}>
                <span style={T.bodyStrong}>{f.title}</span>
                <span style={{ ...T.caption, fontFamily: monoF }}>{f.dimensions}</span>
              </div>
              <p style={{ ...T.body, margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </Sect>

      <Sect label="Gestaltungsregeln" icon={<Construction size={12} />} mobile={mobile} last>
        <div style={{ ...cardS, padding: S.lg }}>
          <div style={{ display: "flex", flexDirection: "column", gap: S.md }}>
            {[
              { label: "Wortmarke", value: "Mindestens 400 mm Breite auf Standard-Bauzaun. Immer zentriert oder oben links." },
              { label: "Farben", value: "Anthrazit (#353b43) auf weiß, oder weiß auf Bild. Keine Farbverläufe." },
              { label: "Schrift", value: "Aeonik Pro Medium für Headlines, Regular für Infotexte. Mindestgröße 30 pt auf Bauzaun." },
              { label: "Druck", value: "Mesh-Banner (300 dpi), Alu-Dibond (CMYK). UV-beständige Tinte." },
            ].map((rule) => (
              <div key={rule.label}>
                <div style={T.bodyStrong}>{rule.label}</div>
                <p style={{ ...T.body, margin: `4px 0 0`, lineHeight: 1.6 }}>{rule.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Sect>
    </div>
  );
}
