"use client";

import { useState } from "react";
import { useIsMobile } from "@/lib/hooks";
import { BRAND_COLORS } from "@/lib/brand-data";
import { PageHeader } from "@/components/shared/page-header";
import { Sect } from "@/components/shared/section";
import { cn, needsRing } from "@/lib/utils";

export default function ColorsPage() {
  const mobile = useIsMobile();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <PageHeader title="Farben" desc="Farbpalette aus dem Figma Design-System. Klicke auf einen Wert zum Kopieren." mobile={mobile} />
      {BRAND_COLORS.map((group, gi) => (
        <Sect key={group.group} label={group.group} mobile={mobile} last={gi === BRAND_COLORS.length - 1}>
          <div
            className={cn(
              "grid gap-3",
              mobile
                ? "grid-cols-2"
                : {
                    1: "grid-cols-1",
                    2: "grid-cols-2",
                    3: "grid-cols-3",
                    4: "grid-cols-4",
                  }[Math.min(group.colors.length, 4)] ?? "grid-cols-5"
            )}
          >
            {group.colors.map((c) => {
              const dark = needsRing(c.hex);
              const isAccent = c.accent;
              const active = copied === c.hex;
              return (
                <div key={c.hex + c.name} onClick={() => copy(c.hex)} className="cursor-pointer">
                  <div
                    className={cn(
                      "aspect-square rounded-swatch flex items-center justify-center transition-transform duration-100",
                      dark && "ring-1 ring-inset ring-white/[0.08]",
                      active && "scale-[0.97]"
                    )}
                    style={{ background: isAccent ? "#0a0a0b" : c.hex }}
                  >
                    {isAccent && (
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ background: c.hex }}
                      />
                    )}
                  </div>
                  <div className="pt-2 px-0.5 flex justify-between items-baseline">
                    <span className="text-xs font-medium text-hub-t1">{c.name}</span>
                    <span
                      className={cn(
                        "text-[11px] font-mono transition-colors duration-150",
                        active ? "text-hub-t1" : "text-hub-t3"
                      )}
                    >
                      {active ? "Kopiert" : c.hex}
                    </span>
                  </div>
                  <div className="px-0.5 pt-0.5 text-[11px] text-hub-t3">{c.desc}</div>
                </div>
              );
            })}
          </div>
        </Sect>
      ))}
    </div>
  );
}
