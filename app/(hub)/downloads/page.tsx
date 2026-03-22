"use client";

import { Download, Image, Type as TypeIcon, FileText, Package } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { C, S, T, cardS } from "@/lib/tokens";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";
import { FormatChip } from "@/components/shared/format-chip";

const assetCategories = [
  {
    icon: <Image size={16} />,
    title: "Logo-Kit",
    desc: "Wortmarke in allen Varianten und Formaten.",
    files: [
      { label: "Black SVG", file: "CASAGO-Wortmarke-Black.svg", href: "/assets/logos/CASAGO-Wortmarke-Black.svg" },
      { label: "Black PNG", file: "CASAGO-Wortmarke-Black.png", href: "/assets/logos/CASAGO-Wortmarke-Black.png" },
      { label: "White SVG", file: "CASAGO-Wortmarke-White.svg", href: "/assets/logos/CASAGO-Wortmarke-White.svg" },
      { label: "White PNG", file: "CASAGO-Wortmarke-White.png", href: "/assets/logos/CASAGO-Wortmarke-White.png" },
    ],
  },
  {
    icon: <TypeIcon size={16} />,
    title: "Schriften",
    desc: "Aeonik Pro Desktop-Fonts (Regular + Medium).",
    files: [
      { label: "Aeonik Pro Regular", file: "AeonikPro-Regular.otf", href: "/assets/fonts/AeonikPro-Regular.otf" },
      { label: "Aeonik Pro Medium", file: "AeonikPro-Medium.otf", href: "/assets/fonts/AeonikPro-Medium.otf" },
    ],
  },
  {
    icon: <FileText size={16} />,
    title: "Vorlagen",
    desc: "Word- und PowerPoint-Templates (in Vorbereitung).",
    files: [],
  },
];

export default function DownloadsPage() {
  const mobile = useIsMobile();

  return (
    <div>
      <PageHeader
        title="Downloads"
        desc="Alle Markenassets an einem Ort. Logo-Kit, Schriften, Vorlagen."
        mobile={mobile}
      />

      <Sect label="Brand Kit" icon={<Package size={12} />} mobile={mobile}>
        <div style={{ ...cardS, padding: S.lg, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: S.md }}>
          <div>
            <div style={T.bodyStrong}>CASAGO Brand Kit</div>
            <p style={{ ...T.body, margin: `4px 0 0` }}>Komplettes Asset-Paket: Logos, Schriften, Farbpalette. ZIP-Download.</p>
          </div>
          <button
            disabled
            title="Bald verfügbar"
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "10px 20px", borderRadius: 10, border: "none",
              background: C.t1, color: C.bg,
              fontSize: 13, fontWeight: 500, cursor: "not-allowed", opacity: 0.4,
            }}
          >
            <Download size={14} /> ZIP herunterladen
          </button>
        </div>
      </Sect>

      <Sect label="Einzelne Assets" icon={<Download size={12} />} mobile={mobile} last>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: S.sm + 2 }}>
          {assetCategories.map((cat) => (
            <div key={cat.title} style={{ ...cardS, padding: S.lg }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: S.md }}>
                <span style={{ color: C.t2, display: "flex" }}>{cat.icon}</span>
                <span style={T.bodyStrong}>{cat.title}</span>
              </div>
              <p style={{ ...T.body, margin: `0 0 ${S.md}px`, lineHeight: 1.6 }}>{cat.desc}</p>
              {cat.files.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: S.xs }}>
                  {cat.files.map((f) => (
                    <FormatChip key={f.file} label={f.label} filename={f.file} href={f.href} />
                  ))}
                </div>
              ) : (
                <p style={{ ...T.caption, margin: 0, fontStyle: "italic" }}>In Vorbereitung</p>
              )}
            </div>
          ))}
        </div>
      </Sect>
    </div>
  );
}
