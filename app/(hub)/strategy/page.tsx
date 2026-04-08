"use client";

import { Target, Heart, Compass, MessageSquareQuote, Users, Sparkles, Quote } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";
import { brandStrategy, toneOfVoice } from "@/data/casago-guidelines";

export default function StrategyPage() {
  const mobile = useIsMobile();

  return (
    <div>
      <PageHeader
        title="Markenstrategie"
        desc="Fundament der Marke CASAGO — wer wir sind, wie wir arbeiten und was uns antreibt."
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
              {brandStrategy.vision}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-4">
              <Compass size={16} className="text-brand-cyan" />
              <span className="text-[15px] font-medium text-foreground">Mission</span>
            </div>
            <p className="text-[14px] text-muted-foreground leading-relaxed m-0">
              {brandStrategy.mission}
            </p>
          </div>
        </div>
      </Sect>

      {/* Markenwerte — 6 Attribute */}
      <Sect label="Markenwerte" icon={<Heart size={12} />} mobile={mobile}>
        <div className={`grid gap-2.5 ${mobile ? "grid-cols-1" : "grid-cols-2"}`}>
          {brandStrategy.values.map((v) => (
            <div key={v.name} className="rounded-xl border border-border bg-card overflow-hidden p-6">
              <div className="text-[15px] font-medium text-foreground mb-3">{v.name}</div>
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
              Der Claim verdichtet die drei Phasen unseres Versprechens: strategische <strong className="text-foreground">Planung</strong> mit 360-Grad-Blick, professionelle <strong className="text-foreground">Umsetzung</strong> mit Herzblut und die Schaffung von Räumen zum <strong className="text-foreground">Leben</strong> — individuell und zukunftssicher.
            </p>
          </div>
        </div>
      </Sect>

      {/* Fred-Zitate */}
      <Sect label="Stimme der Marke" icon={<Quote size={12} />} mobile={mobile}>
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
          <p className="text-[13px] text-muted-foreground mb-5">
            Diese Leitsätze von Geschäftsführer Fred Fröhlich definieren den Markenkern. Sie dienen als Orientierung für die gesamte Kommunikation.
          </p>
          <div className="flex flex-col gap-4">
            {toneOfVoice.signaturePhrases.map((phrase, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-brand-cyan text-[18px] leading-none mt-0.5 shrink-0">„</span>
                <p className="text-[14px] text-foreground leading-relaxed m-0 font-brand italic">
                  {phrase}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-hub-t3 mt-5 mb-0">— Fred Fröhlich, Geschäftsführer CASAGO GmbH</p>
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
                  'Immer \u201EWir\u201C \u2014 nie \u201Eich\u201C. Immer \u201ESie\u201C \u2014 nie \u201Edu\u201C.',
                  "Professionell-warm: Kompetenz mit Herzblut",
                  "Partner auf Augenhöhe, nicht Dienstleister",
                  "Substanz zeigen \u2014 konkrete Referenzen statt Superlative",
                  'Lösungsorientiert: \u201EObwohl es unmöglich schien, ist es uns gelungen.\u201C',
                  'Einladend: \u201ELassen Sie uns über Ihr Projekt sprechen.\u201C',
                ].map((r) => (
                  <div key={r} className="text-[13px] text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-brand-cyan flex-shrink-0">{"\u2014"}</span>
                    {r}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[13px] font-medium text-foreground mb-3">So klingt CASAGO nicht</div>
              <div className="flex flex-col gap-2">
                {[
                  '\u201EWir sind die besten Bauexperten der Region!\u201C',
                  '\u201EProfitieren Sie jetzt von unserem Angebot!\u201C',
                  "Technokratisch-nüchtern ohne menschliche Wärme",
                  "Unpersönliche Unternehmenssprache in dritter Person",
                  '\u201EIch\u201C statt \u201EWir\u201C, \u201EDu\u201C statt \u201ESie\u201C',
                  'Standardfloskeln \u2014 wir sind \u201Enicht von der Stange\u201C',
                ].map((r) => (
                  <div key={r} className="text-[13px] text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-destructive flex-shrink-0">{"\u2014"}</span>
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
          {brandStrategy.targetGroups.map((z) => (
            <div key={z.name} className="rounded-xl border border-border bg-card overflow-hidden p-6">
              <div className="text-[13px] font-medium text-foreground mb-2">{z.name}</div>
              <p className="text-[13px] text-muted-foreground leading-relaxed m-0">{z.desc}</p>
            </div>
          ))}
        </div>
      </Sect>

      {/* Positionierung */}
      <Sect label="Positionierung" icon={<Target size={12} />} mobile={mobile} last>
        <div className="rounded-xl border border-border bg-card overflow-hidden p-6">
          <p className="text-[14px] text-muted-foreground leading-relaxed m-0">
            {brandStrategy.positioning}
          </p>
        </div>
      </Sect>
    </div>
  );
}
