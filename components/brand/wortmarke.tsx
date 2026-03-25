"use client";

import { WP } from "@/lib/brand-data";

interface WmProps {
  fill?: string;
  w?: number;
}

/** Padded viewBox to prevent stroke clipping at edges */
const PADDED_VIEWBOX = "-2 -2 990.77 178.91";

export function Wm({ fill = "var(--foreground)", w = 100 }: WmProps) {
  return (
    <svg
      viewBox={PADDED_VIEWBOX}
      width={w}
      className="block max-w-full h-auto overflow-visible"
      aria-hidden="true"
    >
      {WP.map((d, i) => (
        <path key={i} d={d} fill={fill} />
      ))}
    </svg>
  );
}

export function WmOutline({ stroke = "#fff", w = 100 }: { stroke?: string; w?: number }) {
  return (
    <svg viewBox={PADDED_VIEWBOX} width={w} className="block overflow-visible" aria-hidden="true">
      {WP.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={stroke} strokeWidth="3" />
      ))}
    </svg>
  );
}
