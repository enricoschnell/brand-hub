/** Hub UI design tokens — used for inline styles during incremental Tailwind migration */
export const C = {
  bg: "#0a0a0b",
  surface: "#141416",
  border: "rgba(255,255,255,0.06)",
  borderActive: "rgba(255,255,255,0.2)",
  hover: "rgba(255,255,255,0.04)",
  active: "rgba(255,255,255,0.08)",
  t1: "#eeeff1",
  t2: "#8b8d94",
  t3: "#4b4d55",
} as const;

/** Spacing scale (px) */
export const S = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40, xxl: 56 } as const;

/** Typography presets for inline styles */
export const T = {
  pageTitle: {
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: "-0.025em",
    color: C.t1,
    margin: 0,
    lineHeight: 1.2,
  },
  pageDesc: { fontSize: 15, color: C.t2, margin: 0, lineHeight: 1.5 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: C.t3,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    lineHeight: 1,
  },
  body: { fontSize: 13, color: C.t2, lineHeight: 1.5 },
  bodyStrong: { fontSize: 13, fontWeight: 500, color: C.t1, lineHeight: 1.4 },
  caption: { fontSize: 11, color: C.t3, lineHeight: 1.4 },
} as const;

/** Font family stacks */
export const ff = "'TikTok Sans Variable','TikTok Sans',system-ui,sans-serif";
export const monoF = "ui-monospace,'SF Mono',Monaco,monospace";
export const brandF = "'Aeonik Pro',Helvetica,Arial,sans-serif";

/** Card base style */
export const cardS = {
  borderRadius: 12,
  border: `1px solid ${C.border}`,
  background: C.surface,
  overflow: "hidden" as const,
};
