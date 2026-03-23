"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

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
    <div className="inline-flex gap-px bg-background rounded-lg p-0.5 border border-border">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "px-3.5 py-1.5 rounded-md border-none cursor-pointer font-hub text-xs font-medium",
            "flex items-center gap-1 min-h-[32px] transition-colors",
            value === o.value
              ? "bg-hub-active text-hub-t1"
              : "bg-transparent text-hub-t3 hover:text-hub-t2"
          )}
        >
          {o.icon}
          {o.label}
        </button>
      ))}
    </div>
  );
}
