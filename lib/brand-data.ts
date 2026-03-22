/** CASAGO brand metadata */
export const META = {
  name: "CASAGO",
  legal: "CASAGO GmbH",
  tagline: "Planen. Umsetzen. Leben.",
  claim: "PLANEN. UMSETZEN. LEBEN.",
  website: "casago.de",
  address: "Am Queracker 6\nD-83134 Prutting",
  mapsUrl: "https://maps.google.com/?q=Am+Queracker+6,+83134+Prutting",
} as const;

export interface TeamContact {
  label: "T" | "M" | "E";
  value: string;
  href: string;
}

export interface TeamMember {
  id?: number;
  name: string;
  role: string;
  contacts: TeamContact[];
  ini: string;
  initials?: string;
  sort_order?: number;
}

/** Default team data (fallback if DB unavailable) */
export const TEAM: TeamMember[] = [
  {
    name: "Fred Fröhlich",
    role: "Geschäftsführer",
    contacts: [
      { label: "T", value: "+49 8036 - 908 69 86", href: "tel:+4980369086986" },
      { label: "M", value: "+49 172 - 8 999 111", href: "tel:+491728999111" },
      { label: "E", value: "fred.froehlich@casago.de", href: "mailto:fred.froehlich@casago.de" },
    ],
    ini: "FF",
  },
  {
    name: "Yevheniia Tsaran",
    role: "Diplom-Spezialistin für Architektur (UA)",
    contacts: [
      { label: "M", value: "+49 8036 - 908 69 86", href: "tel:+4980369086986" },
      { label: "E", value: "jane.tsaran@casago.de", href: "mailto:jane.tsaran@casago.de" },
    ],
    ini: "YT",
  },
  {
    name: "Marco Riede",
    role: "Head of Planning and Construction",
    contacts: [
      { label: "M", value: "+49 179 105 72 55", href: "tel:+491791057255" },
      { label: "E", value: "marco.riede@casago.de", href: "mailto:marco.riede@casago.de" },
    ],
    ini: "MR",
  },
  {
    name: "Stephan Freitag",
    role: "Leitung Dachbegrünung & Schwammstadtkonzepte",
    contacts: [
      { label: "M", value: "+49 151 23 77 55 80", href: "tel:+4915123775580" },
      { label: "E", value: "stephan.freitag@casago.de", href: "mailto:stephan.freitag@casago.de" },
    ],
    ini: "SF",
  },
];

/** Signature tokens — two-tier system matching Figma (no #bfc3ca on light!) */
export const SC = {
  light: { p: "#353b43", s: "#868c95", q: "#868c95", lbl: "#868c95" },
  dark: { p: "#f0f0ee", s: "#9a9da4", q: "#868c95", lbl: "#868c95" },
} as const;

export const LOGO_SIZES = { regular: 100, large: 140 } as const;

export interface BrandColor {
  name: string;
  hex: string;
  desc: string;
  dark?: boolean;
  accent?: boolean;
}

export interface BrandColorGroup {
  group: string;
  colors: BrandColor[];
}

export const BRAND_COLORS: BrandColorGroup[] = [
  {
    group: "Hintergründe",
    colors: [
      { name: "Background", hex: "#f8f8f7", desc: "Warmes Off-White" },
      { name: "Surface", hex: "#ffffff", desc: "Cards, Panels" },
      { name: "Dark", hex: "#20252b", desc: "Footer, Menü", dark: true },
      { name: "Page Dark", hex: "#050c11", desc: "Projektseiten-BG", dark: true },
    ],
  },
  {
    group: "Text",
    colors: [
      { name: "Primary", hex: "#353b43", desc: "Headline, Fließtext" },
      { name: "Secondary", hex: "#868c95", desc: "Beschreibungen" },
      { name: "Muted", hex: "#cdcdcd", desc: "Subtitel, Kategorien" },
      { name: "On Dark", hex: "#f8f8f7", desc: "Auf dunklem Grund", dark: true },
      { name: "On Dark Muted", hex: "#bfc3ca", desc: "Footer-Labels", dark: true },
    ],
  },
  {
    group: "Akzent",
    colors: [
      { name: "Cyan", hex: "#59eded", desc: "Highlight, Kennzahlen", accent: true },
      { name: "Dark Teal", hex: "#0b3434", desc: "Akzent-Flächen, Stat-Cards", dark: true },
    ],
  },
  {
    group: "UI",
    colors: [
      { name: "Border", hex: "#e5e5e5", desc: "Trennlinien" },
      { name: "Active", hex: "#353b43", desc: "Aktiver Zustand" },
      { name: "Inactive", hex: "#cac7c6", desc: "Inaktiver Zustand" },
    ],
  },
  {
    group: "Buttons",
    colors: [
      { name: "CTA Background", hex: "#ffffff", desc: "Primär-Button auf Dark" },
      { name: "CTA Text", hex: "#141414", desc: "Button-Schrift" },
      { name: "Outline Border", hex: "#353b43", desc: "Sekundär-Button-Rand" },
    ],
  },
];

/** SVG Wortmarke path data (viewBox: 986.77 x 174.91 → aspect ~5.64:1) */
export const WP = [
  "M907.16,0c-46.15,0-79.61,32.74-79.61,87.31s33.26,87.31,79.61,87.31,79.61-32.74,79.61-87.31S953.32,0,907.16,0ZM908.38,148.64h-2.38c-29.94,0-49.91-22.8-49.91-61.33s19.97-61.33,49.91-61.33h2.38c29.95,0,49.91,22.79,49.91,61.33s-19.95,61.33-49.91,61.33Z",
  "M242.13.47h-.49c-22.25,0-36.13,14.65-45.7,48.35h0s-34.95,123.59-34.95,123.59h29.44l12.7-44.92h77.52l12.68,44.92h29.93l-34.94-123.59C278.69,15.15,264.86.47,242.13.47ZM210.3,101.59l22.27-79.47h18.63l22.28,79.47h-63.18Z",
  "M559.37.46h-.48c-22.26,0-36.14,14.65-45.71,48.35l-34.95,123.59h29.44l12.69-44.91h77.54l12.69,44.91h29.91l-34.94-123.59C595.92,15.13,582.1.46,559.37.46ZM527.54,101.57l22.26-79.45h18.66l22.26,79.45h-63.18Z",
  "M80.01,148.86h-2.33c-29.52,0-49.04-22.84-49.04-61.43s19.51-61.43,49.04-61.43h2.33c20.52,0,36.19,11.41,39.99,31.33h28.58C145.49,24.04,118.58,0,78.79,0,33.08,0,0,32.8,0,87.46s32.84,87.46,78.79,87.46h0c39.76,0,66.74-23.63,69.86-57.4h-28.6c-3.8,20.17-19.53,31.34-40.05,31.34Z",
  "M729.71,101.88h46.84v4.11c-1.45,27.28-22.46,42.01-48.54,42.01-32.35,0-52.63-25.36-52.63-61.57s20.77-61.56,52.88-61.56c23.42,0,39.6,13.03,44.67,34.53h28.74C796.59,23.65,768.1.47,728.98.47c-50.21,0-82.09,34.53-82.09,85.95h0c0,51.43,32.6,85.96,79.92,85.96,26.8,0,44.18-12.07,52.38-24.15l2.43,22.7h21.49v-92.47h-73.4v23.42Z",
  "M410.42,73.95c-26.5-4.58-43.84-8.19-43.84-25.54,0-15.9,13.25-24.08,32.27-24.08,20.48,0,33.97,11.56,36.13,28.66h27.7c-1.21-31.07-25.29-52.02-63.83-52.02-35.89,0-59.97,19.99-59.97,49.37,0,33.49,26.5,42.4,54.43,47.22,26.74,4.81,44.32,8.67,44.32,26.5,0,16.13-14.45,25.05-34.45,25.05h0c-23.6,0-39.01-13.24-40.46-32.99l-27.94-.48c.96,33.72,26.25,56.85,68.16,56.85,37.1,0,62.39-20.96,62.39-51.31.23-33.24-26.99-42.15-54.92-47.2Z",
];

export const WORTMARKE_VIEWBOX = "0 0 986.77 174.91";
