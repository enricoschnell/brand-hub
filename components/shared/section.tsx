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
    <div className={cn(!last && (mobile ? "pb-10" : "pb-14"))}>
      {label && (
        <div
          className={cn(
            "text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.06em] leading-none",
            "flex items-center gap-1.5",
            mobile ? "mb-4" : "mb-5"
          )}
        >
          {icon}
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
