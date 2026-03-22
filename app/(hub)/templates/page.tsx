"use client";

import { Presentation, FileText } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
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
        <div className={`grid gap-2.5 ${mobile ? "grid-cols-1" : "grid-cols-3"}`}>
          {templateCategories.map((t) => (
            <div key={t.title} className="rounded-xl border border-border bg-card overflow-hidden p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-muted-foreground flex">{t.icon}</span>
                <span className="text-[13px] font-medium text-foreground">{t.title}</span>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{t.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-mono text-muted-foreground">{t.format}</span>
                <span className="text-[11px] text-muted-foreground italic">{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </Sect>
    </div>
  );
}
