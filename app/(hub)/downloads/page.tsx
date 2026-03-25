"use client";

import { Download, Image, Type as TypeIcon, FileText, Package } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
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
      { label: "Anthrazit SVG", file: "CASAGO-Wortmarke-Anthrazit.svg", href: "/assets/logos/CASAGO-Wortmarke-Anthrazit.svg" },
      { label: "Anthrazit PNG", file: "CASAGO-Wortmarke-Anthrazit.png", href: "/assets/logos/CASAGO-Wortmarke-Anthrazit.png" },
      { label: "White SVG", file: "CASAGO-Wortmarke-White.svg", href: "/assets/logos/CASAGO-Wortmarke-White.svg" },
      { label: "White PNG", file: "CASAGO-Wortmarke-White.png", href: "/assets/logos/CASAGO-Wortmarke-White.png" },
      { label: "Outline SVG", file: "CASAGO-Wortmarke-Outline.svg", href: "/assets/logos/CASAGO-Wortmarke-Outline.svg" },
      { label: "Outline PNG", file: "CASAGO-Wortmarke-Outline.png", href: "/assets/logos/CASAGO-Wortmarke-Outline.png" },
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
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-[13px] font-medium text-foreground">CASAGO Brand Kit</div>
            <p className="text-[13px] text-muted-foreground mt-1 mb-0">Komplettes Asset-Paket: Logos, Schriften, Farbpalette. ZIP-Download.</p>
          </div>
          <a
            href="/api/download/brand-kit"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-button border-none bg-foreground text-background text-[13px] font-medium cursor-pointer no-underline transition-opacity hover:opacity-90 min-h-[44px]"
            aria-label="CASAGO Brand Kit als ZIP herunterladen"
          >
            <Download size={14} aria-hidden="true" /> ZIP herunterladen
          </a>
        </div>
      </Sect>

      <Sect label="Einzelne Assets" icon={<Download size={12} />} mobile={mobile} last>
        <div className={`grid gap-2.5 ${mobile ? "grid-cols-1" : "grid-cols-3"}`}>
          {assetCategories.map((cat) => (
            <div key={cat.title} className="rounded-xl border border-border bg-card overflow-hidden p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-muted-foreground flex">{cat.icon}</span>
                <span className="text-[13px] font-medium text-foreground">{cat.title}</span>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{cat.desc}</p>
              {cat.files.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {cat.files.map((f) => (
                    <FormatChip key={f.file} label={f.label} filename={f.file} href={f.href} />
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-muted-foreground italic m-0">In Vorbereitung</p>
              )}
            </div>
          ))}
        </div>
      </Sect>
    </div>
  );
}
