"use client";

import { Presentation, FileText } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { C, S, T, cardS } from "@/lib/tokens";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";

const templateCategories = [
  {
    icon: <FileText size={16} />,
    title: "Word Briefvorlage",
    desc: "Offizieller Briefbogen als .dotx-Template. Vorkonfiguriert mit Aeonik Pro, Fußzeile und Wortmarke.",
    format: ".dotx",
    status: "In Vorbereitung",
  },
  {
    icon: <Presentation size={16} />,
    title: "PowerPoint Präsentation",
    desc: "Markenkonformes Folienset: Titelfolie, Inhaltsfolien, Bildfolien, Dankesfolie. CASAGO-Farben und Typografie.",
    format: ".pptx",
    status: "In Vorbereitung",
  },
  {
    icon: <FileText size={16} />,
    title: "Angebot / Proposal",
    desc: "Deckblatt und Angebotsvorlage mit professionellem Layout. Markenfarben und Logo korrekt platziert.",
    format: ".dotx",
    status: "In Vorbereitung",
  },
];

export default function TemplatesPage() {
  const mobile = useIsMobile();

  return (
    <div>
      <PageHeader
        title="Word & PowerPoint"
        desc="Markenvorlagen für den Geschäftsalltag. Templates herunterladen und direkt verwenden."
        mobile={mobile}
      />

      <Sect label="Verfügbare Vorlagen" icon={<Presentation size={12} />} mobile={mobile} last>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: S.sm + 2 }}>
          {templateCategories.map((t) => (
            <div key={t.title} style={{ ...cardS, padding: S.lg }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: S.md }}>
                <span style={{ color: C.t2, display: "flex" }}>{t.icon}</span>
                <span style={T.bodyStrong}>{t.title}</span>
              </div>
              <p style={{ ...T.body, margin: `0 0 ${S.md}px`, lineHeight: 1.6 }}>{t.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ ...T.caption, fontFamily: "ui-monospace,'SF Mono',Monaco,monospace" }}>{t.format}</span>
                <span style={{ ...T.caption, color: C.t3, fontStyle: "italic" }}>{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </Sect>
    </div>
  );
}
