import { T, S } from "@/lib/tokens";

interface PageHeaderProps {
  title: string;
  desc: string;
  mobile: boolean;
}

export function PageHeader({ title, desc, mobile }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: mobile ? S.lg : S.xl }}>
      <h1 style={{ ...T.pageTitle, marginBottom: S.sm }}>{title}</h1>
      <p style={T.pageDesc}>{desc}</p>
    </div>
  );
}
