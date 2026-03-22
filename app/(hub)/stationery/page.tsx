"use client";

import { FileText, Mail as MailIcon, CreditCard } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { C, S, T, cardS } from "@/lib/tokens";
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
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: S.sm + 2 }}>
          {items.map((item) => (
            <div key={item.title} style={{ ...cardS, padding: S.lg }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: S.md }}>
                <span style={{ color: C.t2, display: "flex" }}>{item.icon}</span>
                <span style={T.bodyStrong}>{item.title}</span>
              </div>
              <p style={{ ...T.body, margin: `0 0 ${S.md}px`, lineHeight: 1.6 }}>{item.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {item.specs.map((s) => (
                  <div key={s} style={{ ...T.caption, display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 4, height: 4, borderRadius: 2, background: C.t3, flexShrink: 0 }} />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: S.lg, padding: S.md, borderRadius: 10, background: C.bg, border: `1px solid ${C.border}` }}>
          <p style={{ ...T.caption, margin: 0, color: C.t3, lineHeight: 1.6 }}>
            Druckfertige Vorlagen (PDF, InDesign) werden hier bereitgestellt, sobald die Abstimmung abgeschlossen ist. Kontaktiere das Design-Team für dringende Anfragen.
          </p>
        </div>
      </Sect>
    </div>
  );
}
