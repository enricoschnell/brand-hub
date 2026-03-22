import { type ReactNode } from "react";
import { T, S } from "@/lib/tokens";

interface SectProps {
  label?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  last?: boolean;
  mobile: boolean;
}

export function Sect({ label, icon, children, last = false, mobile }: SectProps) {
  return (
    <div style={{ paddingBottom: last ? 0 : mobile ? S.xl : S.xxl }}>
      {label && (
        <div
          style={{
            ...T.sectionLabel,
            marginBottom: mobile ? S.md : 20,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {icon}
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
