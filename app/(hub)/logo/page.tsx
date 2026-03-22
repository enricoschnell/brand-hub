"use client";

import { Image as ImageIcon, Printer, BookOpen, Shield, Maximize } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { C, S, T, monoF } from "@/lib/tokens";
import { cardS } from "@/lib/tokens";
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
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: S.sm + 2 }}>
          {variants.map((v) => (
            <div key={v.id} style={cardS}>
              <div
                style={{
                  aspectRatio: "3 / 1", background: v.bg,
                  display: "flex", alignItems: "center", justifyContent: "center", padding: S.lg,
                }}
              >
                {v.isOutline
                  ? <WmOutline stroke="#ffffff" w={mobile ? 160 : 180} />
                  : <Wm fill={v.fill} w={mobile ? 160 : 180} />}
              </div>
              <div style={{ padding: `${S.sm + 4}px ${S.md}px`, borderTop: `1px solid ${C.border}` }}>
                <div style={{ ...T.bodyStrong, marginBottom: S.sm }}>Wortmarke — {v.label}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: S.xs }}>
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
        <div style={{ ...cardS, padding: S.lg }}>
          <div style={{ ...T.bodyStrong, marginBottom: S.sm }}>Druckvorlagen für die Vorstufe</div>
          <p style={{ ...T.body, margin: `0 0 ${S.md}px` }}>CMYK-Farbprofil. Vektordateien für professionellen Druck.</p>
          <div style={{ display: "flex", gap: S.sm, flexWrap: "wrap" }}>
            {variants.map((v) => (
              <FormatChip key={v.id} label={`Wortmarke ${v.label}`} sublabel="EPS" filename={fileName(v.label, "eps")} />
            ))}
          </div>
        </div>
      </Sect>

      <Sect label="Verwendung" icon={<BookOpen size={12} />} mobile={mobile} last>
        <p style={{ ...T.body, marginBottom: S.lg, maxWidth: 520 }}>
          Die Wortmarke ist das primäre Erkennungszeichen. Halte die Regeln ein, um eine konsistente Markendarstellung zu gewährleisten.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: S.sm + 2 }}>
          <div style={{ borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, padding: S.lg }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: S.md }}>
              <span style={{ color: C.t2, display: "flex" }}><Shield size={14} /></span>
              <span style={T.bodyStrong}>Schutzzone</span>
            </div>
            <div style={{ height: 88, borderRadius: 10, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: S.md, position: "relative" }}>
              <div style={{ position: "relative", padding: "14px 22px", border: `1.5px dashed ${C.t3}`, borderRadius: 6 }}>
                <Wm fill={C.t2} w={56} />
                <div style={{ position: "absolute", top: 2, right: -20, bottom: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 1, flex: 1, background: C.t3, opacity: 0.5 }} />
                  <span style={{ fontSize: 9, fontFamily: monoF, color: C.t3, padding: "2px 0", whiteSpace: "nowrap" }}>C</span>
                  <div style={{ width: 1, flex: 1, background: C.t3, opacity: 0.5 }} />
                </div>
              </div>
            </div>
            <p style={{ ...T.body, margin: 0, lineHeight: 1.6 }}>Mindestabstand um das Logo = Höhe des Buchstaben C. Gilt für alle Varianten und Hintergründe.</p>
          </div>

          <div style={{ borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, padding: S.lg }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: S.md }}>
              <span style={{ color: C.t2, display: "flex" }}><Maximize size={14} /></span>
              <span style={T.bodyStrong}>Mindestgröße</span>
            </div>
            <div style={{ height: 88, borderRadius: 10, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: S.md, gap: 32 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <Wm fill={C.t2} w={80} />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 12, height: 1, background: C.t3, opacity: 0.5 }} />
                  <span style={{ fontSize: 9, fontFamily: monoF, color: C.t3, whiteSpace: "nowrap" }}>80px</span>
                  <div style={{ width: 12, height: 1, background: C.t3, opacity: 0.5 }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.35 }}>
                <Wm fill={C.t3} w={40} />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 8, height: 1, background: C.t3, opacity: 0.5 }} />
                  <span style={{ fontSize: 9, fontFamily: monoF, color: C.t3, whiteSpace: "nowrap", textDecoration: "line-through" }}>40px</span>
                  <div style={{ width: 8, height: 1, background: C.t3, opacity: 0.5 }} />
                </div>
              </div>
            </div>
            <p style={{ ...T.body, margin: 0, lineHeight: 1.6 }}>Print: mindestens 25mm Breite. Digital: mindestens 80px Breite. Darunter wird das Logo unleserlich.</p>
          </div>
        </div>
      </Sect>
    </div>
  );
}
