"use client";

import { C } from "@/lib/tokens";
import { WP, WORTMARKE_VIEWBOX } from "@/lib/brand-data";

interface WmProps {
  fill?: string;
  w?: number;
}

/** Padded viewBox to prevent stroke clipping at edges */
const PADDED_VIEWBOX = "-2 -2 990.77 178.91";

export function Wm({ fill = C.t1, w = 100 }: WmProps) {
  return (
    <svg
      viewBox={PADDED_VIEWBOX}
      width={w}
      style={{ display: "block", maxWidth: "100%", height: "auto", overflow: "visible" }}
    >
      {WP.map((d, i) => (
        <path key={i} d={d} fill={fill} />
      ))}
    </svg>
  );
}

export function WmOutline({ stroke = "#fff", w = 100 }: { stroke?: string; w?: number }) {
  return (
    <svg viewBox={PADDED_VIEWBOX} width={w} style={{ display: "block", overflow: "visible" }}>
      {WP.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={stroke} strokeWidth="3" />
      ))}
    </svg>
  );
}
