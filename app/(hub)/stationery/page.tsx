"use client";

import { FileText, Mail as MailIcon, CreditCard } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";

const items = [
  {
    icon: <FileText size={16} />,
    title: "Briefbogen (DIN A4)",
    desc: "Offizielles Briefpapier mit Wortmarke, Fußzeile und korrektem Satzspiegel. Aeonik Pro Regular/Medium.",
    specs: ["210 × 297 mm", "Falzmarken DIN 5008", "Wortmarke oben rechts"],
  },
  {
    icon: <CreditCard size={16} />,
    title: "Visitenkarten",
    desc: "Zweiseitig: Wortmarke + Kontaktdaten. Standardformat 85 × 55 mm.",
    specs: ["85 × 55 mm", "300 g/m² Bilderdruckpapier", "Vorder- & Rückseite"],
  },
  {
    icon: <MailIcon size={16} />,
    title: "Briefumschläge",
    desc: "DIN lang und C4 Kuvertierhüllen mit Wortmarke und Absenderzone.",
    specs: ["DIN lang (220 × 110 mm)", "C4 (324 × 229 mm)", "Fensterumschlag-kompatibel"],
  },
];

export default function StationeryPage() {
  const mobile = useIsMobile();

  return (
    <div>
      <PageHeader
        title="Briefpapier & Geschäftsausstattung"
        desc="Druckvorlagen für den täglichen Geschäftsverkehr. Vorlagen werden hier bereitgestellt, sobald sie finalisiert sind."
        mobile={mobile}
      />

      <Sect label="Formate" icon={<FileText size={12} />} mobile={mobile} last>
        <div className={`grid gap-2.5 ${mobile ? "grid-cols-1" : "grid-cols-3"}`}>
          {items.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card overflow-hidden p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-muted-foreground flex">{item.icon}</span>
                <span className="text-[13px] font-medium text-foreground">{item.title}</span>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
              <div className="flex flex-col gap-1">
                {item.specs.map((s) => (
                  <div key={s} className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-muted-foreground flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-[10px] bg-background border border-border">
          <p className="text-[11px] text-muted-foreground leading-relaxed m-0">
            Druckfertige Vorlagen (PDF, InDesign) werden hier bereitgestellt, sobald die Abstimmung abgeschlossen ist. Kontaktiere das Design-Team für dringende Anfragen.
          </p>
        </div>
      </Sect>
    </div>
  );
}
