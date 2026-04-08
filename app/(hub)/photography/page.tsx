"use client";

import { Camera, Check, X, Sun, Layers, Frame } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";

export default function PhotographyPage() {
  const mobile = useIsMobile();

  return (
    <div>
      <PageHeader
        title="Bildsprache & Fotografie"
        desc="Art Direction für Projektfotos, Teambilder und Social Media. Stilrichtung, Farbstimmung und Anwendungsregeln."
        mobile={mobile}
      />

      {/* Stilrichtung */}
      <Sect label="Stilrichtung" icon={<Camera size={12} />} mobile={mobile}>
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">
            Unsere Bildsprache ist <strong className="text-foreground">klar, authentisch und sachlich</strong> — weil wir Kompetenz durch Substanz zeigen, nicht durch Inszenierung. Keine gestellten Stock-Fotos, sondern echte Projektdokumentation mit Herzblut. Unsere Bilder spiegeln wider, was uns ausmacht: Ganzheitlichkeit, Qualität und echte Partnerschaft auf Augenhöhe.
          </p>
          <div className={`grid gap-2.5 ${mobile ? "grid-cols-1" : "grid-cols-3"}`}>
            {[
              {
                icon: <Sun size={16} />,
                title: "Lichtstimmung",
                desc: "Natürliches Licht bevorzugt. Warme Tageslichtstimmung für Außenaufnahmen. Innenräume mit vorhandenem Licht + punktueller Aufhellung.",
              },
              {
                icon: <Layers size={16} />,
                title: "Farbstimmung",
                desc: "Entsättigte, ruhige Farben. Keine knalligen Filter. Subtile Wärme in den Schatten. Die Architektur steht im Vordergrund, nicht die Nachbearbeitung.",
              },
              {
                icon: <Frame size={16} />,
                title: "Komposition",
                desc: "Ruhige, geometrische Bildkomposition. Gerade Linien, bewusster Weißraum. Menschen im Kontext des Projekts, nie isoliert vor weißem Hintergrund.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-background p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-muted-foreground">{item.icon}</span>
                  <span className="text-[13px] font-medium text-foreground">{item.title}</span>
                </div>
                <p className="text-[13px] text-muted-foreground leading-relaxed m-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Sect>

      {/* Kategorien */}
      <Sect label="Bildkategorien" icon={<Layers size={12} />} mobile={mobile}>
        <div className={`grid gap-2.5 ${mobile ? "grid-cols-1" : "grid-cols-2"}`}>
          {[
            {
              title: "Projektfotografie",
              desc: "Dokumentation von Bauprojekten in verschiedenen Phasen: Rohbau, Ausbau, Fertigstellung. Zeigt den Fortschritt und die Qualität der Arbeit.",
              rules: ["Immer mit Kontext (Umgebung sichtbar)", "Baufortschritt chronologisch dokumentieren", "Weitwinkel für Gesamtansichten, Details für Materialqualität"],
            },
            {
              title: "Teamfotos",
              desc: "Authentische Portraits des Teams — auf der Baustelle oder im Büro. Keine Studio-Portraits mit weißem Hintergrund.",
              rules: ["Natürliches Licht, echte Arbeitsumgebung", "Arbeitskleidung / Helm auf der Baustelle", "Blickkontakt, offene Körpersprache"],
            },
            {
              title: "Architekturfotos",
              desc: "Fertiggestellte Objekte in ihrer Umgebung. Zeigt die architektonische Qualität und Integration in den Kontext.",
              rules: ["Golden Hour oder bewölkt (weiches Licht)", "Geometrische Komposition, gerade Linien", "Mit und ohne Menschen — beides wichtig"],
            },
            {
              title: "Social Media",
              desc: "Projektupdates, Behind-the-Scenes, Team-Momente. Authentischer als klassische Projektfotos, aber immer professionell.",
              rules: ["Hochformat bevorzugt (9:16 oder 4:5)", "Keine übertriebenen Filter oder Presets", "Text-Overlays in Aeonik Pro Medium, max 12px Radius"],
            },
          ].map((cat) => (
            <div key={cat.title} className="rounded-xl border border-border bg-card overflow-hidden p-6">
              <div className="text-[15px] font-medium text-foreground mb-2">{cat.title}</div>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{cat.desc}</p>
              <div className="flex flex-col gap-1.5">
                {cat.rules.map((r) => (
                  <div key={r} className="text-[12px] text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-brand-cyan flex-shrink-0 mt-0.5">+</span>
                    {r}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Sect>

      {/* Richtig & Falsch */}
      <Sect label="Richtig & Falsch" mobile={mobile}>
        <div className={`grid gap-2.5 ${mobile ? "grid-cols-1" : "grid-cols-2"}`}>
          <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-4">
              <Check size={14} className="text-green-500" />
              <span className="text-[13px] font-medium text-green-500">Richtig</span>
            </div>
            <div className="flex flex-col gap-2">
              {[
                "Echte Projekte und echte Menschen zeigen",
                "Natürliches Licht und authentische Situationen",
                "Ruhige, geometrische Komposition",
                "Konsistente Nachbearbeitung (nicht überbelichtet)",
                "Kontext zeigen — Gebäude in der Umgebung",
                "Logo als Wortmarke einsetzen (White auf dunklem Bild)",
              ].map((d, i) => (
                <div key={i} className="text-[13px] text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-green-500 flex-shrink-0">+</span>
                  {d}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-4">
              <X size={14} className="text-red-500" />
              <span className="text-[13px] font-medium text-red-500">Falsch</span>
            </div>
            <div className="flex flex-col gap-2">
              {[
                "Stock-Fotos mit gestellten Szenen",
                "Übersättigte Farben oder HDR-Look",
                "Drohnenaufnahmen ohne Genehmigung",
                "Personen ohne Einverständnis zeigen",
                "Logo auf unruhigem Hintergrund ohne Kontrast",
                "Bildausschnitte die Baustellenchaos betonen",
              ].map((d, i) => (
                <div key={i} className="text-[13px] text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-red-500 flex-shrink-0">-</span>
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sect>

      {/* Logo auf Bildern */}
      <Sect label="Logo auf Fotografien" icon={<Frame size={12} />} mobile={mobile} last>
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
          <div className="flex flex-col gap-4">
            {[
              { label: "Variante", value: "Wortmarke White auf dunklen/bildbasierten Hintergründen. Black oder Anthrazit auf hellen Bereichen." },
              { label: "Platzierung", value: "Unten rechts oder unten links. Immer innerhalb der Schutzzone (Höhe C)." },
              { label: "Mindestgröße", value: "80 px digital. Auf Druckmedien: 25 mm Breite." },
              { label: "Kontrast", value: "Das Logo muss immer lesbar sein. Im Zweifel: halbtransparenten dunklen Balken hinterlegen (rgba(0,0,0,0.4), max 12px Radius)." },
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
