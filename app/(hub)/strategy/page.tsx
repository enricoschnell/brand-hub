"use client";

import { Target, Heart, Compass, MessageSquareQuote, Users, Sparkles } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";

export default function StrategyPage() {
  const mobile = useIsMobile();

  return (
    <div>
      <PageHeader
        title="Markenstrategie"
        desc="Fundament der Marke CASAGO — Positionierung, Werte, Story und Charakter."
        mobile={mobile}
      />

      {/* Vision & Mission */}
      <Sect label="Vision & Mission" icon={<Compass size={12} />} mobile={mobile}>
        <div className={`grid gap-2.5 ${mobile ? "grid-cols-1" : "grid-cols-2"}`}>
          <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target size={16} className="text-brand-cyan" />
              <span className="text-[15px] font-medium text-foreground">Vision</span>
            </div>
            <p className="text-[14px] text-muted-foreground leading-relaxed m-0">
              CASAGO gestaltet Lebensräume, die Bestand haben — durch durchdachte Planung, präzise Umsetzung und den Anspruch, dass jedes Projekt die Lebensqualität seiner Nutzer nachhaltig verbessert.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-4">
              <Compass size={16} className="text-brand-cyan" />
              <span className="text-[15px] font-medium text-foreground">Mission</span>
            </div>
            <p className="text-[14px] text-muted-foreground leading-relaxed m-0">
              Wir begleiten Bauprojekte ganzheitlich — von der ersten Idee über die Planung und Konstruktion bis zur Übergabe. Unser Team vereint Architektur, Bauingenieurwesen und nachhaltige Konzepte unter einem Dach.
            </p>
          </div>
        </div>
      </Sect>

      {/* Markenwerte */}
      <Sect label="Markenwerte" icon={<Heart size={12} />} mobile={mobile}>
        <div className={`grid gap-2.5 ${mobile ? "grid-cols-1" : "grid-cols-3"}`}>
          {[
            {
              title: "Präzision",
              desc: "Jedes Detail zählt. Von der Planung bis zur Ausführung arbeiten wir mit höchster Genauigkeit — in der Kommunikation wie im Bau.",
            },
            {
              title: "Ganzheitlichkeit",
              desc: "Wir denken Projekte von Anfang bis Ende. Keine isolierten Gewerke, sondern ein integrierter Ansatz aus Architektur, Ingenieurwesen und Nachhaltigkeit.",
            },
            {
              title: "Nachhaltigkeit",
              desc: "Dachbegrünung, Schwammstadtkonzepte, langlebige Materialien — Nachhaltigkeit ist kein Add-on, sondern Grundprinzip jeder Entscheidung.",
            },
          ].map((v) => (
            <div key={v.title} className="rounded-xl border border-border bg-card overflow-hidden p-6">
              <div className="text-[15px] font-medium text-foreground mb-3">{v.title}</div>
              <p className="text-[13px] text-muted-foreground leading-relaxed m-0">{v.desc}</p>
            </div>
          ))}
        </div>
      </Sect>

      {/* Claim */}
      <Sect label="Claim" icon={<MessageSquareQuote size={12} />} mobile={mobile}>
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
          <div className="text-center py-6">
            <div className="text-[28px] font-brand font-medium text-foreground tracking-[0.08em] uppercase mb-6">
              Planen. Umsetzen. Leben.
            </div>
            <p className="text-[14px] text-muted-foreground leading-relaxed max-w-[520px] mx-auto m-0">
              Der Claim verdichtet die drei Phasen des CASAGO-Versprechens: strategische <strong className="text-foreground">Planung</strong>, professionelle <strong className="text-foreground">Umsetzung</strong> und die Schaffung von Räumen zum <strong className="text-foreground">Leben</strong>. Er steht immer in Versalien mit erweitertem Zeichenabstand (tracking 0.84px).
            </p>
          </div>
        </div>
      </Sect>

      {/* Markencharakter */}
      <Sect label="Markencharakter" icon={<Sparkles size={12} />} mobile={mobile}>
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
          <div className={`${mobile ? "block" : "grid grid-cols-2 gap-8"}`}>
            <div className={mobile ? "mb-6" : ""}>
              <div className="text-[13px] font-medium text-foreground mb-3">So klingt CASAGO</div>
              <div className="flex flex-col gap-2">
                {[
                  "Professionell, aber nicht steif",
                  "Technisch kompetent, ohne zu belehren",
                  "Sachlich-warm — Vertrauen durch Klarheit",
                  "Direkte Ansprache, aktive Sprache",
                  "Keine Superlative, keine Marketing-Floskeln",
                ].map((r) => (
                  <div key={r} className="text-[13px] text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-brand-cyan flex-shrink-0">—</span>
                    {r}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[13px] font-medium text-foreground mb-3">So klingt CASAGO nicht</div>
              <div className="flex flex-col gap-2">
                {[
                  "\"Wir sind die besten Bauexperten!\"",
                  "\"Einzigartige Premium-Qualität\"",
                  "\"JETZT ANFRAGEN!!!\"",
                  "Emotionale Appelle oder Dringlichkeit",
                  "Buzzwords ohne Substanz",
                ].map((r) => (
                  <div key={r} className="text-[13px] text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-destructive flex-shrink-0">—</span>
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Sect>

      {/* Zielgruppen */}
      <Sect label="Zielgruppen" icon={<Users size={12} />} mobile={mobile}>
        <div className={`grid gap-2.5 ${mobile ? "grid-cols-1" : "grid-cols-2"}`}>
          {[
            {
              title: "Bauherren & Projektentwickler",
              desc: "Private und gewerbliche Auftraggeber, die ein Bauprojekt von der Planung bis zur Übergabe aus einer Hand realisieren wollen.",
            },
            {
              title: "Kommunen & öffentliche Träger",
              desc: "Städte und Gemeinden mit Bedarf an nachhaltigen Baukonzepten, Dachbegrünung und Schwammstadt-Lösungen.",
            },
            {
              title: "Architekten & Planungsbüros",
              desc: "Kooperationspartner, die CASAGO für Bauingenieurleistungen, Bauleitung oder spezialisierte Gewerke hinzuziehen.",
            },
            {
              title: "Investoren & Immobiliengesellschaften",
              desc: "Kapitalgeber, die Wert auf qualitätsgesicherte, nachhaltige und termingerechte Projektrealisierung legen.",
            },
          ].map((z) => (
            <div key={z.title} className="rounded-xl border border-border bg-card overflow-hidden p-6">
              <div className="text-[13px] font-medium text-foreground mb-2">{z.title}</div>
              <p className="text-[13px] text-muted-foreground leading-relaxed m-0">{z.desc}</p>
            </div>
          ))}
        </div>
      </Sect>

      {/* Markenpositionierung */}
      <Sect label="Positionierung" icon={<Target size={12} />} mobile={mobile} last>
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
            CASAGO positioniert sich als <strong className="text-foreground">ganzheitlicher Partner für anspruchsvolle Bauprojekte</strong> — nicht als reiner Generalunternehmer und nicht als reines Planungsbüro, sondern als integrierter Anbieter, der Architektur, Bauingenieurwesen und nachhaltige Innovation unter einem Dach vereint.
          </p>
          <p className="text-[14px] text-muted-foreground leading-relaxed m-0">
            Die Abgrenzung entsteht durch die Kombination aus technischer Tiefe (Dachbegrünung, Schwammstadtkonzepte) und der Fähigkeit, Projekte ganzheitlich zu steuern — von der ersten Idee bis zum bezugsfertigen Objekt.
          </p>
        </div>
      </Sect>
    </div>
  );
}
