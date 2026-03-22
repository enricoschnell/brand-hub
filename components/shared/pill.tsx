"use client";

import { type ReactNode } from "react";
import { C, ff } from "@/lib/tokens";

interface PillOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface PillProps {
  options: PillOption[];
  value: string;
  onChange: (value: string) => void;
}

export function Pill({ options, value, onChange }: PillProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        gap: 1,
        background: C.bg,
        borderRadius: 8,
        padding: 2,
        border: `1px solid ${C.border}`,
      }}
    >
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          style={{
            padding: "6px 14px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            fontFamily: ff,
            fontSize: 12,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: value === o.value ? C.active : "transparent",
            color: value === o.value ? C.t1 : C.t3,
            minHeight: 32,
          }}
        >
          {o.icon}
          {o.label}
        </button>
      ))}
    </div>
  );
}
