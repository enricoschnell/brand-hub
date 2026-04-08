"use client";

import { Target, Heart, Compass, Users, Sparkles } from "lucide-react";
import { useIsMobile } from "@/lib/hooks";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";
import { brandStrategy, toneOfVoice } from "@/data/casago-guidelines";
import { cn } from "@/lib/utils";

export default function StrategyPage() {
  const mobile = useIsMobile();

  return (
    <div>
      <PageHeader
        title="Markenstrategie"
        desc="Fundament der Marke CASAGO — wer wir sind, wie wir arbeiten und was uns antreibt."
        mobile={mobile}
      />

      {/* Claim — Hero Block */}
      <Sect mobile={mobile}>
        <div className="rounded-xl bg-hub-surface overflow-hidden px-8 py-12 text-center">
          <p className="text-[11px] font-semibold text-hub-t3 uppercase tracking-[0.1em] mb-5">Claim</p>
          <div className={cn("font-brand font-medium text-foreground tracking-[0.1em] uppercase mb-6 leading-tight", mobile ? "text-[28px]" : "text-[40px]")}>
            Planen.&ensp;Umsetzen.&ensp;Leben.
          </div>
          <p className="text-[14px] text-muted-foreground leading-relaxed max-w-[480px] mx-auto">
            Drei Phasen — ein Versprechen: strategische <strong className="text-hub-t1 font-medium">Planung</strong> mit 360-Grad-Blick, professionelle <strong className="text-hub-t1 font-medium">Umsetzung</strong> mit Herzblut und Räume zum <strong className="text-hub-t1 font-medium">Leben</strong> — individuell und zukunftssicher.
          </p>
        </div>
      </Sect>

      {/* Vision & Mission */}
      <Sect label="Vision & Mission" icon={<Compass size={12} />} mobile={mobile}>
        <div className={cn("grid gap-px bg-hub-border overflow-hidden rounded-xl", mobile ? "grid-cols-1" : "grid-cols-2")}>
          <div className="bg-hub-bg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target size={14} className="text-brand-cyan" />
              <span className="text-[13px] font-semibold text-hub-t1 uppercase tracking-[0.05em]">Vision</span>
            </div>
            <p className="text-[15px] text-hub-t1 leading-relaxed m-0 font-brand">
              {brandStrategy.vision}
            </p>
          </div>
          <div className="bg-hub-bg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Compass size={14} className="text-brand-cyan" />
              <span className="text-[13px] font-semibold text-hub-t1 uppercase tracking-[0.05em]">Mission</span>
            </div>
            <p className="text-[15px] text-hub-t1 leading-relaxed m-0 font-brand">
              {brandStrategy.mission}
            </p>
          </div>
        </div>
      </Sect>

      {/* Markenwerte — Feature Rows mit Akzentstreifen */}
      <Sect label="Markenwerte" icon={<Heart size={12} />} mobile={mobile}>
        <div className="flex flex-col">
          {brandStrategy.values.map((v, i) => (
            <div
              key={v.name}
              className={cn(
                "flex gap-5 py-5 border-l-2 border-brand-cyan pl-5",
                i < brandStrategy.values.length - 1 && "border-b border-hub-border",
                mobile ? "flex-col gap-1" : "items-start"
              )}
            >
              <div className={cn("shrink-0", mobile ? "w-full" : "w-[200px]")}>
                <span className="text-[14px] font-medium text-hub-t1">{v.name}</span>
              </div>
              <p className="text-[13px] text-hub-t2 leading-relaxed m-0">{v.desc}</p>
            </div>
          ))}
        </div>
      </Sect>

      {/* Stimme der Marke — Zitate */}
      <Sect label="Stimme der Marke" icon={<Sparkles size={12} />} mobile={mobile}>
        <div className="rounded-xl bg-hub-surface overflow-hidden p-6 pb-5">
          <p className="text-[13px] text-hub-t3 mb-6">
            Leitsätze von Fred Fröhlich, Geschäftsführer. Orientierung für alle Kommunikation.
          </p>
          <div className="flex flex-col gap-5">
            {toneOfVoice.signaturePhrases.map((phrase, i) => (
              <p key={i} className={cn("font-brand leading-snug m-0 text-hub-t1", mobile ? "text-[16px]" : "text-[18px]")}>
                <span className="text-brand-cyan mr-1 not-italic">\u201E</span>
                {phrase}
                <span className="text-brand-cyan ml-0.5 not-italic">\u201C</span>
              </p>
            ))}
          </div>
        </div>
      </Sect>

      {/* Markencharakter — Inline Listen ohne Card */}
      <Sect label="Markencharakter" mobile={mobile}>
        <div className={cn("gap-8", mobile ? "flex flex-col" : "grid grid-cols-2")}>
          <div>
            <div className="text-[12px] font-semibold text-hub-t1 uppercase tracking-[0.06em] mb-4">So klingt CASAGO</div>
            <div className="flex flex-col gap-2.5">
              {[
                'Immer \u201EWir\u201C \u2014 nie \u201Eich\u201C. Immer \u201ESie\u201C \u2014 nie \u201Edu\u201C.',
                "Professionell-warm: Kompetenz mit Herzblut",
                "Partner auf Augenhöhe, nicht Dienstleister",
                "Substanz zeigen \u2014 konkrete Referenzen statt Superlative",
                'Lösungsorientiert: \u201EObwohl es unmöglich schien, ...\u201C',
                'Einladend: \u201ELassen Sie uns über Ihr Projekt sprechen.\u201C',
              ].map((r) => (
                <div key={r} className="flex gap-2.5 text-[13px] text-hub-t2 leading-relaxed">
                  <span className="text-brand-cyan shrink-0 mt-px">\u2014</span>
                  {r}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[12px] font-semibold text-hub-t3 uppercase tracking-[0.06em] mb-4">So klingt CASAGO nicht</div>
            <div className="flex flex-col gap-2.5">
              {[
                '\u201EWir sind die besten Bauexperten der Region!\u201C',
                '\u201EProfitieren Sie jetzt von unserem Angebot!\u201C',
                "Technokratisch-nüchtern ohne menschliche Wärme",
                "Unpersönliche Unternehmenssprache in dritter Person",
                '\u201EIch\u201C statt \u201EWir\u201C, \u201EDu\u201C statt \u201ESie\u201C',
                'Standardfloskeln \u2014 wir sind \u201Enicht von der Stange\u201C',
              ].map((r) => (
                <div key={r} className="flex gap-2.5 text-[13px] leading-relaxed">
                  <span className="text-destructive shrink-0 mt-px">\u2014</span>
                  <span className="text-hub-t3 line-through decoration-hub-t3/50">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sect>

      {/* Zielgruppen */}
      <Sect label="Zielgruppen" icon={<Users size={12} />} mobile={mobile}>
        <div className={cn("grid gap-2.5", mobile ? "grid-cols-1" : "grid-cols-2")}>
          {brandStrategy.targetGroups.map((z) => (
            <div key={z.name} className="rounded-xl border border-hub-border bg-hub-bg p-5">
              <div className="text-[13px] font-medium text-hub-t1 mb-2">{z.name}</div>
              <p className="text-[13px] text-hub-t2 leading-relaxed m-0">{z.desc}</p>
            </div>
          ))}
        </div>
      </Sect>

      {/* Positionierung — Inline, kein Card */}
      <Sect label="Positionierung" icon={<Target size={12} />} mobile={mobile} last>
        <p className="text-[15px] text-hub-t1 leading-relaxed font-brand max-w-[640px] m-0">
          {brandStrategy.positioning}
        </p>
      </Sect>
    </div>
  );
}
