import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectProps {
  label?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  last?: boolean;
  mobile: boolean;
}

export function Sect({ label, icon, children, last = false, mobile }: SectProps) {
  return (
    <div className={cn(!last && (mobile ? "pb-10" : "pb-16"))}>
      {label && (
        <div
          className={cn(
            "flex items-center gap-1.5",
            "text-[11px] font-semibold text-hub-t3 uppercase tracking-[0.08em] leading-none",
            mobile ? "mb-4" : "mb-6"
          )}
        >
          {icon && <span className="opacity-70">{icon}</span>}
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
