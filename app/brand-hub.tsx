"use client";
import { useState, useRef, useEffect } from "react";

/*
 * CASAGO Brand Hub v16
 * Cinematic SVG draw animation (Herrström-style)
 * Logo: 3-column balanced cards, format chips
 * Colors: Borderless square swatches (eBay/Wise)
 * Type: Real scale, font downloads
 * Sig: Contrast-audited, WCAG AA, two-tier color system
 * Max radius: 12px. All UTF-8 clean.
 */

/* ═══ LUCIDE ICONS (v0.383.0, embedded SVG) ═══ */
const Li = ({ children, size = 15, sw = 1.75, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flexShrink: 0, ...style }}>{children}</svg>
);
const LuHome = (p) => <Li {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Li>;
const LuImage = (p) => <Li {...p}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></Li>;
const LuMail = (p) => <Li {...p}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></Li>;
const LuPalette = (p) => <Li {...p}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></Li>;
const LuChevronRight = (p) => <Li {...p}><path d="m9 18 6-6-6-6"/></Li>;
const LuCopy = (p) => <Li {...p}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></Li>;
const LuCode = (p) => <Li {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></Li>;
const LuCheck = (p) => <Li {...p}><path d="M20 6 9 17l-5-5"/></Li>;
const LuSliders = (p) => <Li {...p}><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></Li>;
const LuUsers = (p) => <Li {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Li>;
const LuShield = (p) => <Li {...p}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></Li>;
const LuMaximize = (p) => <Li {...p}><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></Li>;
const LuSun = (p) => <Li {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></Li>;
const LuMoon = (p) => <Li {...p}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></Li>;
const LuMenu = (p) => <Li {...p}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></Li>;
const LuX = (p) => <Li {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></Li>;
const LuDownload = (p) => <Li {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></Li>;
const LuBookOpen = (p) => <Li {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></Li>;
const LuPrinter = (p) => <Li {...p}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></Li>;
const LuType = (p) => <Li {...p}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></Li>;
const LuInfo = (p) => <Li {...p}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></Li>;

function useIsMobile(bp = 768) { const [m, setM] = useState(false); useEffect(() => { const mq = window.matchMedia(`(max-width:${bp-1}px)`); const h = (e) => setM(e.matches); setM(mq.matches); mq.addEventListener("change", h); return () => mq.removeEventListener("change", h); }, [bp]); return m; }

/* ═══ TOKENS ═══ */
const C = { bg: "#0a0a0b", surface: "#141416", border: "rgba(255,255,255,0.06)", borderActive: "rgba(255,255,255,0.2)", hover: "rgba(255,255,255,0.04)", active: "rgba(255,255,255,0.08)", t1: "#eeeff1", t2: "#8b8d94", t3: "#4b4d55" };
const S = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40, xxl: 56 };
const T = { pageTitle: { fontSize: 24, fontWeight: 600, letterSpacing: "-0.025em", color: C.t1, margin: 0, lineHeight: 1.2 }, pageDesc: { fontSize: 15, color: C.t2, margin: 0, lineHeight: 1.5 }, sectionLabel: { fontSize: 11, fontWeight: 600, color: C.t3, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1 }, body: { fontSize: 13, color: C.t2, lineHeight: 1.5 }, bodyStrong: { fontSize: 13, fontWeight: 500, color: C.t1, lineHeight: 1.4 }, caption: { fontSize: 11, color: C.t3, lineHeight: 1.4 } };
const ff = "'TikTok Sans Variable','TikTok Sans',system-ui,sans-serif";
const monoF = "ui-monospace,'SF Mono',Monaco,monospace";
const brandF = "'Aeonik Pro',Helvetica,Arial,sans-serif";

/* ═══ BRAND DATA ═══ */
const META = { name: "CASAGO", legal: "CASAGO GmbH", tagline: "Planen. Umsetzen. Leben.", claim: "PLANEN. UMSETZEN. LEBEN.", website: "casago.de", address: "Am Queracker 6\nD-83134 Prutting", mapsUrl: "https://maps.google.com/?q=Am+Queracker+6,+83134+Prutting" };
const TEAM = [
  { name: "Fred Fröhlich", role: "Geschäftsführer", contacts: [{ label: "T", value: "+49 8036 - 908 69 86", href: "tel:+4980369086986" },{ label: "M", value: "+49 172 - 8 999 111", href: "tel:+491728999111" },{ label: "E", value: "fred.froehlich@casago.de", href: "mailto:fred.froehlich@casago.de" }], ini: "FF" },
  { name: "Yevheniia Tsaran", role: "Diplom-Spezialistin für Architektur (UA)", contacts: [{ label: "M", value: "+49 8036 - 908 69 86", href: "tel:+4980369086986" },{ label: "E", value: "jane.tsaran@casago.de", href: "mailto:jane.tsaran@casago.de" }], ini: "YT" },
  { name: "Marco Riede", role: "Head of Planning and Construction", contacts: [{ label: "M", value: "+49 179 105 72 55", href: "tel:+491791057255" },{ label: "E", value: "marco.riede@casago.de", href: "mailto:marco.riede@casago.de" }], ini: "MR" },
  { name: "Stephan Freitag", role: "Leitung Dachbegrünung & Schwammstadtkonzepte", contacts: [{ label: "M", value: "+49 151 23 77 55 80", href: "tel:+4915123775580" },{ label: "E", value: "stephan.freitag@casago.de", href: "mailto:stephan.freitag@casago.de" }], ini: "SF" },
];
/* Signature tokens — two-tier system matching Figma (no #bfc3ca on light!) */
const SC = {
  light: { p: "#353b43", s: "#868c95", q: "#868c95", lbl: "#868c95" },
  dark:  { p: "#f0f0ee", s: "#9a9da4", q: "#868c95", lbl: "#868c95" },
};
const LOGO_SIZES = { regular: 100, large: 140 };
const BRAND_COLORS = [
  { group: "Hintergründe", colors: [{ name: "Background", hex: "#f8f8f7", desc: "Warmes Off-White" },{ name: "Surface", hex: "#ffffff", desc: "Cards, Panels" },{ name: "Dark", hex: "#20252b", desc: "Footer, Menü", dark: true },{ name: "Page Dark", hex: "#050c11", desc: "Projektseiten-BG", dark: true }] },
  { group: "Text", colors: [{ name: "Primary", hex: "#353b43", desc: "Headline, Fließtext" },{ name: "Secondary", hex: "#868c95", desc: "Beschreibungen" },{ name: "Muted", hex: "#cdcdcd", desc: "Subtitel, Kategorien" },{ name: "On Dark", hex: "#f8f8f7", desc: "Auf dunklem Grund", dark: true },{ name: "On Dark Muted", hex: "#bfc3ca", desc: "Footer-Labels", dark: true }] },
  { group: "Akzent", colors: [{ name: "Cyan", hex: "#59eded", desc: "Highlight, Kennzahlen", accent: true },{ name: "Dark Teal", hex: "#0b3434", desc: "Akzent-Flächen, Stat-Cards", dark: true }] },
  { group: "UI", colors: [{ name: "Border", hex: "#e5e5e5", desc: "Trennlinien" },{ name: "Active", hex: "#353b43", desc: "Aktiver Zustand" },{ name: "Inactive", hex: "#cac7c6", desc: "Inaktiver Zustand" }] },
  { group: "Buttons", colors: [{ name: "CTA Background", hex: "#ffffff", desc: "Primär-Button auf Dark" },{ name: "CTA Text", hex: "#141414", desc: "Button-Schrift" },{ name: "Outline Border", hex: "#353b43", desc: "Sekundär-Button-Rand" }] },
];

/* ═══ SVG WORTMARKE (viewBox: 986.77 x 174.91 → aspect ~5.64:1) ═══ */
const WP = ["M907.16,0c-46.15,0-79.61,32.74-79.61,87.31s33.26,87.31,79.61,87.31,79.61-32.74,79.61-87.31S953.32,0,907.16,0ZM908.38,148.64h-2.38c-29.94,0-49.91-22.8-49.91-61.33s19.97-61.33,49.91-61.33h2.38c29.95,0,49.91,22.79,49.91,61.33s-19.95,61.33-49.91,61.33Z","M242.13.47h-.49c-22.25,0-36.13,14.65-45.7,48.35h0s-34.95,123.59-34.95,123.59h29.44l12.7-44.92h77.52l12.68,44.92h29.93l-34.94-123.59C278.69,15.15,264.86.47,242.13.47ZM210.3,101.59l22.27-79.47h18.63l22.28,79.47h-63.18Z","M559.37.46h-.48c-22.26,0-36.14,14.65-45.71,48.35l-34.95,123.59h29.44l12.69-44.91h77.54l12.69,44.91h29.91l-34.94-123.59C595.92,15.13,582.1.46,559.37.46ZM527.54,101.57l22.26-79.45h18.66l22.26,79.45h-63.18Z","M80.01,148.86h-2.33c-29.52,0-49.04-22.84-49.04-61.43s19.51-61.43,49.04-61.43h2.33c20.52,0,36.19,11.41,39.99,31.33h28.58C145.49,24.04,118.58,0,78.79,0,33.08,0,0,32.8,0,87.46s32.84,87.46,78.79,87.46h0c39.76,0,66.74-23.63,69.86-57.4h-28.6c-3.8,20.17-19.53,31.34-40.05,31.34Z","M729.71,101.88h46.84v4.11c-1.45,27.28-22.46,42.01-48.54,42.01-32.35,0-52.63-25.36-52.63-61.57s20.77-61.56,52.88-61.56c23.42,0,39.6,13.03,44.67,34.53h28.74C796.59,23.65,768.1.47,728.98.47c-50.21,0-82.09,34.53-82.09,85.95h0c0,51.43,32.6,85.96,79.92,85.96,26.8,0,44.18-12.07,52.38-24.15l2.43,22.7h21.49v-92.47h-73.4v23.42Z","M410.42,73.95c-26.5-4.58-43.84-8.19-43.84-25.54,0-15.9,13.25-24.08,32.27-24.08,20.48,0,33.97,11.56,36.13,28.66h27.7c-1.21-31.07-25.29-52.02-63.83-52.02-35.89,0-59.97,19.99-59.97,49.37,0,33.49,26.5,42.4,54.43,47.22,26.74,4.81,44.32,8.67,44.32,26.5,0,16.13-14.45,25.05-34.45,25.05h0c-23.6,0-39.01-13.24-40.46-32.99l-27.94-.48c.96,33.72,26.25,56.85,68.16,56.85,37.1,0,62.39-20.96,62.39-51.31.23-33.24-26.99-42.15-54.92-47.2Z"];
const Wm = ({ fill = C.t1, w = 100 }) => <svg viewBox="0 0 986.77 174.91" width={w} style={{ display: "block", maxWidth: "100%", height: "auto" }}>{WP.map((d, i) => <path key={i} d={d} fill={fill} />)}</svg>;
const WmOutline = ({ stroke = "#fff", w = 100 }) => <svg viewBox="0 0 986.77 174.91" width={w} style={{ display: "block" }}>{WP.map((d, i) => <path key={i} d={d} fill="none" stroke={stroke} strokeWidth="3" />)}</svg>;

/* ═══ SHARED COMPONENTS ═══ */
const cardS = { borderRadius: 12, border: `1px solid ${C.border}`, background: C.surface, overflow: "hidden" };
function Sect({ label, icon, children, last = false, mobile }: { label: any; icon?: any; children: any; last?: any; mobile: any }) { return <div style={{ paddingBottom: last ? 0 : (mobile ? S.xl : S.xxl) }}>{label && <div style={{ ...T.sectionLabel, marginBottom: mobile ? S.md : 20, display: "flex", alignItems: "center", gap: 6 }}>{icon}{label}</div>}{children}</div>; }
function Pill({ options, value, onChange }) { return <div style={{ display: "inline-flex", gap: 1, background: C.bg, borderRadius: 8, padding: 2, border: `1px solid ${C.border}` }}>{options.map(o => <button key={o.value} onClick={() => onChange(o.value)} style={{ padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: ff, fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 4, background: value === o.value ? C.active : "transparent", color: value === o.value ? C.t1 : C.t3, minHeight: 32 }}>{o.icon}{o.label}</button>)}</div>; }
function PageHeader({ title, desc, mobile }) { return <div style={{ marginBottom: mobile ? S.lg : S.xl }}><h1 style={{ ...T.pageTitle, marginBottom: S.sm }}>{title}</h1><p style={T.pageDesc}>{desc}</p></div>; }
function FormatChip({ label, sublabel, filename, href }: { label: any; sublabel?: any; filename: any; href?: string }) {
  const available = !!href;
  const baseStyle = {
    display: "flex", alignItems: "center", gap: 6, padding: "5px 10px",
    borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent",
    fontSize: 12, fontFamily: ff, minHeight: 30, textDecoration: "none",
  };
  if (available) {
    return (
      <a href={href} download={filename} title={filename} style={{ ...baseStyle, color: C.t2, cursor: "pointer" }}>
        <LuDownload size={11} />
        <span style={{ fontWeight: 500, color: C.t1 }}>{label}</span>
        {sublabel && <span style={{ ...T.caption, fontFamily: monoF }}>{sublabel}</span>}
      </a>
    );
  }
  return (
    <button disabled title="Bald verfügbar" style={{ ...baseStyle, color: C.t3, cursor: "not-allowed", opacity: 0.4 }}>
      <LuDownload size={11} />
      <span style={{ fontWeight: 500, color: C.t3 }}>{label}</span>
      {sublabel && <span style={{ ...T.caption, fontFamily: monoF }}>{sublabel}</span>}
    </button>
  );
}

/* ═══ SIDEBAR ═══ */
function Sidebar({ page, go, mobile, open, setOpen }) {
  const nav = [
    { items: [{ id: "home", label: "Home", icon: <LuHome size={15} /> }] },
    { label: "Assets", items: [{ id: "logo", label: "Logo", icon: <LuImage size={15} /> }, { id: "colors", label: "Farben", icon: <LuPalette size={15} /> }, { id: "type", label: "Typografie", icon: <LuType size={15} /> }] },
    { label: "Tools", items: [{ id: "sig", label: "Email Signatur", icon: <LuMail size={15} /> }] },
  ];
  const handleNav = (id) => { go(id); if (mobile) setOpen(false); };
  const content = (<>
    <div onClick={() => handleNav("home")} style={{ padding: "16px 14px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: C.active, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Wm fill={C.t2} w={18} /></div>
      <div style={{ flex: 1 }}><div style={T.bodyStrong}>Brand Hub</div><div style={T.caption}>{META.name}</div></div>
      {mobile && <button onClick={(e) => { e.stopPropagation(); setOpen(false); }} style={{ background: "none", border: "none", color: C.t2, cursor: "pointer", padding: 4, display: "flex" }}><LuX size={18} /></button>}
    </div>
    <nav style={{ flex: 1, padding: "4px 8px", overflow: "auto" }}>
      {nav.map((s, si) => <div key={si}>{s.label && <div style={{ ...T.sectionLabel, padding: "18px 8px 6px" }}>{s.label}</div>}{s.items.map(n => <button key={n.id} onClick={() => handleNav(n.id)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "7px 10px", borderRadius: 7, border: "none", background: page === n.id ? C.active : "transparent", color: page === n.id ? C.t1 : C.t2, ...T.body, fontWeight: page === n.id ? 500 : 400, fontFamily: ff, cursor: "pointer", textAlign: "left", marginBottom: 1, minHeight: 40 }}><span style={{ opacity: page === n.id ? 0.9 : 0.45, display: "flex" }}>{n.icon}</span>{n.label}</button>)}</div>)}
    </nav>
    <div style={{ padding: "12px 14px", borderTop: `1px solid ${C.border}`, ...T.caption }}>© CASAGO GmbH</div>
  </>);
  if (mobile) return (<>{open && <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 40 }} />}<aside style={{ position: "fixed", left: 0, top: 0, height: "100vh", width: 280, background: C.bg, borderRight: `1px solid ${C.border}`, fontFamily: ff, display: "flex", flexDirection: "column", zIndex: 50, transform: open ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)" }}>{content}</aside></>);
  return <aside style={{ width: 220, background: C.bg, position: "fixed", left: 0, top: 0, height: "100vh", display: "flex", flexDirection: "column", fontFamily: ff, borderRight: `1px solid ${C.border}`, zIndex: 10 }}>{content}</aside>;
}
function MobileHeader({ onMenu, page }) { const t = { home: "Home", logo: "Logo", colors: "Farben", type: "Typografie", sig: "Email Signatur" }; return <div style={{ position: "sticky", top: 0, zIndex: 20, background: C.bg, borderBottom: `1px solid ${C.border}`, padding: "0 16px", height: 52, display: "flex", alignItems: "center", gap: 12 }}><button onClick={onMenu} style={{ background: "none", border: "none", color: C.t1, cursor: "pointer", padding: 8, margin: -8, display: "flex", minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" }}><LuMenu size={20} /></button><div style={T.bodyStrong}>{t[page] || "Brand Hub"}</div></div>; }

/* ═══ HOME — Cinematic logo draw animation (Herrström/Lit Create style) ═══ */
function HomePage({ go, mobile }) {
  const [phase, setPhase] = useState(0);
  /* 0=draw stroke, 1=cross-fade stroke→fill, 2=claim words, 3=buttons */
  const svgRef = useRef(null);
  const [lengths, setLengths] = useState(null);
  const logoW = mobile ? 340 : 620;

  /* Measure actual path lengths on mount for pixel-perfect dasharray */
  useEffect(() => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll("path");
      const measured = Array.from(paths).map((p: SVGPathElement) => Math.ceil(p.getTotalLength()));
      setLengths(measured);
    }
  }, []);

  /* Phase sequencing — deliberate, unhurried */
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 2150),  /* cross-fade begins (last letter finishes at ~2.08s) */
      setTimeout(() => setPhase(2), 2600),  /* claim appears — snappy after fill */
      setTimeout(() => setPhase(3), 3050),  /* buttons appear */
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  /* Reading order stagger: C(3) A(1) S(5) A(2) G(4) O(0) */
  const order = [5, 1, 3, 0, 4, 2];
  /* Left-to-right position of each path index for fill sweep:
     C(3)=pos0, A(1)=pos1, S(5)=pos2, A(2)=pos3, G(4)=pos4, O(0)=pos5 */
  const ltrPos = [5, 1, 3, 0, 4, 2]; /* maps path index → left-to-right position */
  /* Accelerating stagger — letters bunch up toward the end */
  const staggerDelays = [0, 0.14, 0.26, 0.36, 0.43, 0.48];
  const drawDur = 1.6;

  const css = `
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes strokeOut { to { stroke-opacity: 0; } }
    @keyframes fillIn { to { fill-opacity: 1; } }
    @keyframes breathe {
      0% { transform: scale(1); }
      50% { transform: scale(1.006); }
      100% { transform: scale(1); }
    }
  `;

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      flex: 1, width: "100%", textAlign: "center", padding: mobile ? "40px 20px" : 0,
    }}>
      <style>{css}</style>

      {/* Animated Wortmarke */}
      <div style={{
        animation: phase >= 1 ? "breathe 2.4s cubic-bezier(0.37, 0, 0.63, 1) 0.3s 1" : "none",
      }}>
        <svg ref={svgRef} viewBox="0 0 986.77 174.91" width={logoW} style={{ display: "block", overflow: "visible", maxWidth: "100%" }}>
          {WP.map((d, i) => {
            const len = lengths ? lengths[i] : 2400;
            const delay = staggerDelays[order[i]];
            return (
              <path
                key={i}
                d={d}
                fill={C.t1}
                stroke={C.t1}
                strokeWidth={mobile ? "2.8" : "1.6"}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: len,
                  strokeDashoffset: lengths ? len : 0,
                  fillOpacity: 0,
                  strokeOpacity: 1,
                  animation: lengths ? [
                    /* 1. Draw the stroke */
                    `draw ${drawDur}s cubic-bezier(0.45, 0, 0.15, 1) ${delay}s forwards`,
                    /* 2. Fade stroke out — left-to-right sweep */
                    phase >= 1 ? `strokeOut 0.45s cubic-bezier(0.33, 0, 0.67, 1) ${ltrPos[i] * 0.05}s forwards` : "",
                    /* 3. Fade fill in — left-to-right sweep, snappy */
                    phase >= 1 ? `fillIn 0.35s cubic-bezier(0.33, 0, 0.67, 1) ${ltrPos[i] * 0.05}s forwards` : "",
                  ].filter(Boolean).join(", ") : "none",
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Claim — word by word */}
      <div style={{ display: "flex", gap: mobile ? 6 : 8, marginTop: mobile ? 20 : 28, justifyContent: "center" }}>
        {META.tagline.split(" ").map((word, wi) => (
          <span key={wi} style={{
            fontSize: mobile ? 17 : 20, fontWeight: 400, color: C.t2, letterSpacing: "0.04em",
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${wi * 0.12}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${wi * 0.12}s`,
          }}>
            {word}
          </span>
        ))}
      </div>

      {/* Buttons — staggered entrance */}
      <div style={{ display: "flex", gap: S.sm + 2, flexWrap: "wrap", justifyContent: "center", marginTop: mobile ? 40 : 56 }}>
        {[
          { id: "logo", label: "Logo Kit", icon: <LuImage size={14} /> },
          { id: "colors", label: "Farben", icon: <LuPalette size={14} /> },
          { id: "type", label: "Typografie", icon: <LuType size={14} /> },
          { id: "sig", label: "Email Signatur", icon: <LuMail size={14} />, primary: true },
        ].map((b, bi) => (
          <button key={b.id} onClick={() => go(b.id)} style={{
            padding: "11px 22px", borderRadius: 10,
            border: b.primary ? "none" : `1px solid ${phase >= 3 ? C.border : "transparent"}`,
            background: b.primary ? (phase >= 3 ? C.t1 : "transparent") : "transparent",
            color: b.primary ? (phase >= 3 ? C.bg : C.t2) : C.t2,
            fontSize: 13, fontWeight: 500, fontFamily: ff, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 7, minHeight: 44,
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(6px)",
            transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${bi * 0.07}s`,
          }}>
            {b.icon}{b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══ LOGO PAGE — Balanced 3-column cards ═══ */
function LogoPage({ mobile }) {
  const variants = [
    { id: "black", label: "Black", fill: "#000000", bg: "#f8f8f7" },
    { id: "anthrazit", label: "Anthrazit", fill: "#353b43", bg: "#f8f8f7" },
    { id: "white", label: "White", fill: "#ffffff", bg: "#141416" },
    { id: "outline", label: "Outline", bg: "#20252b", isOutline: true },
  ];
  const digitalFormats = [
    { label: "Vektor", sub: "SVG", ext: "svg" },
    { label: "Bild", sub: "PNG", ext: "png" },
    { label: "Dokument", sub: "PDF", ext: "pdf" },
  ];
  const fileName = (variant, ext) => `CASAGO-Wortmarke-${variant}.${ext}`;

  return (
    <div>
      <PageHeader title="Logo" desc="Freigegebene Wortmarke in allen Varianten und Formaten." mobile={mobile} />

      <Sect label="Digital" icon={<LuImage size={12} />} mobile={mobile}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: S.sm + 2 }}>
          {variants.map(v => (
            <div key={v.id} style={cardS}>
              {/* Logo canvas — aspect ratio ~3:1, logo at ~60% width of canvas */}
              <div style={{
                aspectRatio: "3 / 1", background: v.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: S.lg,
              }}>
                {v.isOutline
                  ? <WmOutline stroke="#ffffff" w={mobile ? 160 : 180} />
                  : <Wm fill={v.fill} w={mobile ? 160 : 180} />
                }
              </div>
              <div style={{ padding: `${S.sm + 4}px ${S.md}px`, borderTop: `1px solid ${C.border}` }}>
                <div style={{ ...T.bodyStrong, marginBottom: S.sm }}>Wortmarke — {v.label}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: S.xs }}>
                  {digitalFormats.map(f => {
                    const file = fileName(v.label, f.ext);
                    const href = (f.ext === "svg" || f.ext === "png") ? `/assets/logos/${file}` : undefined;
                    return <FormatChip key={f.ext} label={f.label} sublabel={f.sub} filename={file} href={href} />;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Sect>

      <Sect label="Print (CMYK)" icon={<LuPrinter size={12} />} mobile={mobile}>
        <div style={{ ...cardS, padding: S.lg }}>
          <div style={{ ...T.bodyStrong, marginBottom: S.sm }}>Druckvorlagen für die Vorstufe</div>
          <p style={{ ...T.body, margin: `0 0 ${S.md}px` }}>CMYK-Farbprofil. Vektordateien für professionellen Druck.</p>
          <div style={{ display: "flex", gap: S.sm, flexWrap: "wrap" }}>
            {variants.map(v => (
              <FormatChip key={v.id} label={`Wortmarke ${v.label}`} sublabel="EPS" filename={fileName(v.label, "eps")} />
            ))}
          </div>
        </div>
      </Sect>

      {/* ── VERWENDUNG ── */}
      <Sect label="Verwendung" icon={<LuBookOpen size={12} />} mobile={mobile} last>
        <p style={{ ...T.body, marginBottom: S.lg, maxWidth: 520 }}>
          Die Wortmarke ist das primäre Erkennungszeichen. Halte die Regeln ein, um eine konsistente Markendarstellung zu gewährleisten.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: S.sm + 2 }}>
          {/* Schutzzone — shows clear space with dimension marks */}
          <div style={{ borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, padding: S.lg }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: S.md }}>
              <span style={{ color: C.t2, display: "flex" }}><LuShield size={14} /></span>
              <span style={T.bodyStrong}>Schutzzone</span>
            </div>
            <div style={{ height: 88, borderRadius: 10, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: S.md, position: "relative" }}>
              {/* Clear space visualization: dashed box = clear zone, inner = logo */}
              <div style={{ position: "relative", padding: "14px 22px", border: `1.5px dashed ${C.t3}`, borderRadius: 6 }}>
                <Wm fill={C.t2} w={56} />
                {/* "C" height annotation */}
                <div style={{ position: "absolute", top: 2, right: -20, bottom: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 1, flex: 1, background: C.t3, opacity: 0.5 }} />
                  <span style={{ fontSize: 9, fontFamily: monoF, color: C.t3, padding: "2px 0", whiteSpace: "nowrap" }}>C</span>
                  <div style={{ width: 1, flex: 1, background: C.t3, opacity: 0.5 }} />
                </div>
              </div>
            </div>
            <p style={{ ...T.body, margin: 0, lineHeight: 1.6 }}>Mindestabstand um das Logo = Höhe des Buchstaben C. Gilt für alle Varianten und Hintergründe.</p>
          </div>
          {/* Mindestgröße — shows logo at minimum scale with size annotation */}
          <div style={{ borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, padding: S.lg }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: S.md }}>
              <span style={{ color: C.t2, display: "flex" }}><LuMaximize size={14} /></span>
              <span style={T.bodyStrong}>Mindestgröße</span>
            </div>
            <div style={{ height: 88, borderRadius: 10, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: S.md, gap: 32 }}>
              {/* Minimum size with dimension line below */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <Wm fill={C.t2} w={80} />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 12, height: 1, background: C.t3, opacity: 0.5 }} />
                  <span style={{ fontSize: 9, fontFamily: monoF, color: C.t3, whiteSpace: "nowrap" }}>80px</span>
                  <div style={{ width: 12, height: 1, background: C.t3, opacity: 0.5 }} />
                </div>
              </div>
              {/* Too-small example, struck through */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.35 }}>
                <Wm fill={C.t3} w={40} />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 8, height: 1, background: C.t3, opacity: 0.5 }} />
                  <span style={{ fontSize: 9, fontFamily: monoF, color: C.t3, whiteSpace: "nowrap", textDecoration: "line-through" }}>40px</span>
                  <div style={{ width: 8, height: 1, background: C.t3, opacity: 0.5 }} />
                </div>
              </div>
            </div>
            <p style={{ ...T.body, margin: 0, lineHeight: 1.6 }}>Print: mindestens 25mm Breite. Digital: mindestens 80px Breite. Darunter wird das Logo unleserlich.</p>
          </div>
        </div>
      </Sect>
    </div>
  );
}

/* ═══ COLORS — Borderless blocks (eBay/Wise pattern) ═══ */
function ColorsPage({ mobile }) {
  const [copied, setCopied] = useState(null);
  const copy = (hex) => { navigator.clipboard.writeText(hex); setCopied(hex); setTimeout(() => setCopied(null), 1500); };

  /* Determine if a color needs a subtle inset ring to be visible on #0a0a0b */
  const needsRing = (hex) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    const lum = (0.299*r + 0.587*g + 0.114*b) / 255;
    return lum < 0.12; /* very dark colors on very dark bg */
  };

  return (
    <div>
      <PageHeader title="Farben" desc="Farbpalette aus dem Figma Design-System. Klicke auf einen Wert zum Kopieren." mobile={mobile} />
      {BRAND_COLORS.map((group, gi) => (
        <Sect key={group.group} label={group.group} mobile={mobile} last={gi === BRAND_COLORS.length - 1}>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : `repeat(${Math.min(group.colors.length, 5)}, 1fr)`, gap: mobile ? S.sm : S.sm + 4 }}>
            {group.colors.map(c => {
              const dark = needsRing(c.hex);
              const isAccent = c.accent;
              const swatchBg = isAccent ? C.bg : c.hex;
              const active = copied === c.hex;
              return (
                <div key={c.hex + c.name} onClick={() => copy(c.hex)} style={{ cursor: "pointer" }}>
                  {/* Color block — the color IS the element */}
                  <div style={{
                    aspectRatio: "1 / 1",
                    borderRadius: 8,
                    background: swatchBg,
                    boxShadow: dark ? "inset 0 0 0 1px rgba(255,255,255,0.08)" : "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "transform 0.12s, box-shadow 0.15s",
                    transform: active ? "scale(0.97)" : "none",
                  }}>
                    {isAccent && <div style={{ width: 32, height: 32, borderRadius: "50%", background: c.hex }} />}
                  </div>
                  {/* Label below — no container */}
                  <div style={{ padding: `${S.sm}px 2px 0`, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: C.t1 }}>{c.name}</span>
                    <span style={{ fontSize: 11, fontFamily: monoF, color: active ? C.t1 : C.t3, transition: "color 0.15s" }}>
                      {active ? "Kopiert" : c.hex}
                    </span>
                  </div>
                  <div style={{ padding: "2px 2px 0", fontSize: 11, color: C.t3 }}>{c.desc}</div>
                </div>
              );
            })}
          </div>
        </Sect>
      ))}
    </div>
  );
}

/* ═══ TYPOGRAFIE ═══ */
function TypePage({ mobile }) {
  const scale = [
    { name: "Display", size: 82, weight: 400, tracking: "normal", sample: "50" },
    { name: "Heading L", size: 40, weight: 400, tracking: "normal", sample: "Geschäftsfelder" },
    { name: "Heading M", size: 34, weight: 500, tracking: "normal", sample: "Wir betrachten Projekte" },
    { name: "Heading S", size: 32, weight: 500, tracking: "normal", sample: "Eckdaten" },
    { name: "Title", size: 28, weight: 400, tracking: "-0.28px", sample: "Grundstücksankauf" },
    { name: "Body L", size: 18, weight: 400, tracking: "0.36px", sample: "Das Team" },
    { name: "Body", size: 16, weight: 400, tracking: "0.32px", sample: "Wir übernehmen" },
    { name: "Caption", size: 14, weight: 400, tracking: "0.28px", sample: "Den ganzen Text lesen" },
    { name: "Claim", size: 14, weight: 400, tracking: "0.84px", sample: "PLANEN. UMSETZEN. LEBEN.", uc: true },
  ];

  const fontFiles = [
    { label: "Aeonik Pro Regular", sub: "OTF", file: "AeonikPro-Regular.otf" },
    { label: "Aeonik Pro Medium", sub: "OTF", file: "AeonikPro-Medium.otf" },
  ];

  return (
    <div>
      <PageHeader title="Typografie" desc="Aeonik Pro — die Schrift der Marke. Nur Regular (400) und Medium (500)." mobile={mobile} />

      {/* Font Meta */}
      <Sect label="Schriftfamilie" icon={<LuType size={12} />} mobile={mobile}>
        <div style={{ ...cardS, padding: mobile ? S.lg : S.xl }}>
          <div style={{ display: mobile ? "block" : "flex", gap: 48 }}>
            <div style={{ flex: 1, marginBottom: mobile ? S.lg : 0 }}>
              <div style={{ fontSize: mobile ? 36 : 48, fontWeight: 500, color: C.t1, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 20, fontFamily: brandF }}>Aeonik Pro</div>
              <p style={{ ...T.body, maxWidth: 400, lineHeight: 1.7, marginBottom: S.lg }}>
                Primäre Marken-Schrift von CoType Foundry. Zwei Gewichte: Regular (400) für Fließtext und UI, Medium (500) für Headlines und Akzente. Kein Bold, kein SemiBold — die Ruhe der Marke entsteht durch diesen bewussten Verzicht.
              </p>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 2, letterSpacing: "0.02em", fontFamily: brandF }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789 .,;:!? äöüß €
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
                <div>
                  <div style={{ fontSize: 72, fontWeight: 400, color: C.t1, lineHeight: 1, fontFamily: brandF }}>Aa</div>
                  <div style={{ fontSize: 11, fontFamily: monoF, color: C.t3, marginTop: 8 }}>Regular 400</div>
                </div>
                <div>
                  <div style={{ fontSize: 72, fontWeight: 500, color: C.t1, lineHeight: 1, fontFamily: brandF }}>Aa</div>
                  <div style={{ fontSize: 11, fontFamily: monoF, color: C.t3, marginTop: 8 }}>Medium 500</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sect>

      {/* Font Downloads */}
      <Sect label="Desktop-Fonts" icon={<LuDownload size={12} />} mobile={mobile}>
        <div style={{ ...cardS, padding: S.lg }}>
          <div style={{ ...T.bodyStrong, marginBottom: S.sm }}>Schriftdateien für Word, PowerPoint, InDesign</div>
          <p style={{ ...T.body, margin: `0 0 ${S.md}px` }}>Installiere beide Gewichte lokal. Commercial License — nur für CASAGO-Mitarbeiter und beauftragte Dienstleister.</p>
          <div style={{ display: "flex", gap: S.sm, flexWrap: "wrap", marginBottom: S.md }}>
            {fontFiles.map(f => (
              <FormatChip key={f.file} label={f.label} sublabel={f.sub} filename={f.file} href={`/assets/fonts/${f.file}`} />
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: S.sm, padding: S.md, borderRadius: 10, background: C.bg, border: `1px solid ${C.border}` }}>
            <LuInfo size={14} style={{ color: C.t3, marginTop: 2, flexShrink: 0 }} />
            <p style={{ ...T.caption, margin: 0, lineHeight: 1.6 }}>Nach dem Download beide Gewichte lokal installieren. macOS: Doppelklick → „Installieren". Windows: Rechtsklick → „Für alle Benutzer installieren".</p>
          </div>
        </div>
      </Sect>

      {/* Type Scale — show real sizes */}
      <Sect label="Schriftgrößen" mobile={mobile} last>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {scale.map((t, i) => {
            const displaySize = mobile ? Math.min(t.size, 36) : Math.min(t.size, 72);
            return (
              <div key={t.name} style={{
                display: mobile ? "block" : "grid", gridTemplateColumns: "140px 1fr", gap: 24, alignItems: "baseline",
                padding: `${mobile ? 16 : 20}px 0`, borderBottom: i < scale.length - 1 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{ marginBottom: mobile ? 6 : 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: C.t2, fontFamily: monoF }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: C.t3, fontFamily: monoF, marginTop: 3 }}>
                    {t.size}px / {t.weight}{t.uc ? " / UC" : ""}{t.tracking !== "normal" ? ` / ${t.tracking}` : ""}
                  </div>
                </div>
                <div style={{
                  fontSize: displaySize, fontWeight: t.weight, color: C.t1,
                  fontFamily: brandF,
                  letterSpacing: t.tracking === "normal" ? undefined : t.tracking,
                  lineHeight: 1.15, textTransform: t.uc ? "uppercase" : undefined,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {t.sample}
                </div>
              </div>
            );
          })}
        </div>
      </Sect>
    </div>
  );
}

/* ═══ SIGNATURE ═══ */
function SigPage({ mobile }) {
  const [pi, setPi] = useState(0);
  const [showClaim, setShowClaim] = useState(true);
  const [showAddress, setShowAddress] = useState(true);
  const [logoSize, setLogoSize] = useState("regular");
  const [copied, setCopied] = useState(null);
  const [showSrc, setShowSrc] = useState(false);
  const [mode, setMode] = useState("light");
  const sigRef = useRef(null);
  const p = TEAM[pi];
  const logoW = LOGO_SIZES[logoSize];

  const buildHtml = () => {
    const c = SC.light;
    const contactRows = p.contacts.map(ct =>
      `<tr><td style="font-size:14px;line-height:1.4;padding:2px 0;"><span style="display:inline-block;width:18px;color:${c.lbl};font-weight:500;">${ct.label}</span><a href="${ct.href}" style="color:${ct.label==="E"?c.p:c.s};text-decoration:none;">${ct.value}</a></td></tr>`
    ).join("");
    const hasClosing = showAddress || showClaim;
    return [
      `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Helvetica,Arial,sans-serif;color:${c.p};">`,
      `<tr><td style="padding-bottom:20px;"><a href="https://${META.website}" style="text-decoration:none;"><img src="https://brand.casago.de/sig/wortmarke.png" alt="${META.name}" width="${logoW}" style="display:block;border:0;"/></a></td></tr>`,
      `<tr><td style="padding-bottom:16px;"><p style="margin:0;font-size:17px;font-weight:600;color:${c.p};line-height:1.3;">${p.name}</p><p style="margin:4px 0 0;font-size:14px;color:${c.s};line-height:1.4;">${p.role}</p></td></tr>`,
      `<tr><td><table cellpadding="0" cellspacing="0" border="0">${contactRows}</table></td></tr>`,
      hasClosing ? `<tr><td style="padding-top:16px;border-top:1px solid #e5e5e5;">` +
        (showAddress ? `<p style="margin:0 0 ${showClaim ? "12" : "0"}px;font-size:13px;color:${c.s};line-height:1.5;"><a href="${META.mapsUrl}" style="color:${c.s};text-decoration:none;">${META.legal}<br/>${META.address.replace(/\n/g,"<br/>")}</a></p>` : "") +
        (showClaim ? `<p style="margin:0;font-size:12px;font-weight:400;color:${c.q};letter-spacing:1.2px;text-transform:uppercase;line-height:1;">${META.claim}</p>` : "") +
        `</td></tr>` : "",
      `</table>`,
    ].join("");
  };

  const doCopy = (type) => {
    const html = buildHtml();
    if (type === "html") {
      navigator.clipboard.writeText(html);
    } else {
      /* Render clean HTML in a temporary off-screen container, then copy
         the browser's rich-text interpretation — no dark shell styles. */
      const el = document.createElement("div");
      el.innerHTML = html;
      el.style.cssText = "position:fixed;left:-9999px;top:0;background:#fff;color:#000;font-family:Helvetica,Arial,sans-serif;";
      document.body.appendChild(el);
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand("copy");
      sel.removeAllRanges();
      document.body.removeChild(el);
    }
    setCopied(type); setTimeout(() => setCopied(null), 2200);
  };

  const SigRender = ({ m, innerRef }) => {
    const c = SC[m];
    return (
      <div ref={innerRef} style={{ fontFamily: "Helvetica,Arial,sans-serif", color: c.p, maxWidth: "100%", overflowWrap: "break-word", wordBreak: "break-word" }}>
        {/* ── Wortmarke (standalone, no lockup) ── */}
        <div style={{ marginBottom: 20 }}>
          <Wm fill={c.p} w={Math.min(logoW, 160)} />
        </div>
        {/* ── Person ── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 17, fontWeight: 600, color: c.p, lineHeight: 1.3 }}>{p.name}</div>
          <div style={{ fontSize: 14, color: c.s, marginTop: 4, lineHeight: 1.4 }}>{p.role}</div>
        </div>
        {/* ── Contact ── */}
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          {p.contacts.map((ct, i) => (
            <div key={i} style={{ display: "flex" }}>
              <span style={{ width: 18, flexShrink: 0, color: c.lbl, fontWeight: 500 }}>{ct.label}</span>
              <a href={ct.href} style={{ color: ct.label === "E" ? c.p : c.s, textDecoration: "none", wordBreak: "break-all" }}>{ct.value}</a>
            </div>
          ))}
        </div>
        {/* ── Address + Claim (closing zone) ── */}
        {(showAddress || showClaim) && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${m === "light" ? "#e5e5e5" : "rgba(255,255,255,0.06)"}` }}>
            {showAddress && (
              <div style={{ fontSize: 13, lineHeight: 1.5, color: c.s, marginBottom: showClaim ? 12 : 0 }}>
                <a href={META.mapsUrl} style={{ color: c.s, textDecoration: "none" }}>
                  {META.legal}<br/>
                  {META.address.split("\n").map((line, i) => <span key={i}>{line}<br/></span>)}
                </a>
              </div>
            )}
            {showClaim && (
              <div style={{ fontSize: 12, fontWeight: 400, color: c.q, letterSpacing: "1.2px", textTransform: "uppercase", lineHeight: 1 }}>
                {META.claim}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const email = p.contacts.find(c => c.label === "E")?.value || "";

  return (
    <div>
      <PageHeader title="Email Signatur" desc="On-brand Signaturen für das Team." mobile={mobile} />
      <div style={{ display: mobile ? "block" : "grid", gridTemplateColumns: "280px 1fr", gap: S.lg }}>
        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: S.sm, marginBottom: mobile ? S.md : 0, minWidth: 0 }}>
          <div style={{ ...cardS, padding: S.md + 4, minWidth: 0 }}>
            <div style={{ ...T.sectionLabel, marginBottom: S.md, display: "flex", alignItems: "center", gap: 5 }}><LuUsers size={11} sw={2} /> Person</div>
            <div style={{ display: mobile ? "flex" : "block", gap: 6, overflowX: mobile ? "auto" : "visible", paddingBottom: mobile ? 4 : 0, margin: mobile ? "0 -4px" : 0 }}>
              {TEAM.map((t, i) => (
                <button key={i} onClick={() => setPi(i)} style={{
                  display: "flex", alignItems: "center", gap: 10, width: mobile ? "auto" : "100%", flexShrink: 0,
                  padding: "10px 12px", borderRadius: 10,
                  border: pi === i ? `1.5px solid ${C.borderActive}` : `1px solid ${C.border}`,
                  background: pi === i ? C.active : "transparent",
                  cursor: "pointer", fontFamily: ff, textAlign: "left", marginBottom: mobile ? 0 : 6, minHeight: 48,
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: pi === i ? C.t1 : C.active, color: pi === i ? C.bg : C.t3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{t.ini}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ ...T.bodyStrong, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
                    <div style={{ ...T.caption, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ ...cardS, padding: S.md + 4 }}>
            <div style={{ ...T.sectionLabel, marginBottom: S.md, display: "flex", alignItems: "center", gap: 5 }}><LuSliders size={11} sw={2} /> Optionen</div>
            <div style={{ marginBottom: S.md + 2 }}>
              <div style={{ ...T.body, marginBottom: S.sm }}>Logo</div>
              <Pill options={[{ value: "regular", label: "Regular" }, { value: "large", label: "Large" }]} value={logoSize} onChange={setLogoSize} />
            </div>
            <div onClick={() => setShowClaim(!showClaim)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", ...T.body, minHeight: 36 }}>
              <div style={{ width: 40, height: 22, borderRadius: 11, padding: 2, background: showClaim ? C.t1 : C.active, transition: "background 0.15s", display: "flex", justifyContent: showClaim ? "flex-end" : "flex-start", alignItems: "center" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: showClaim ? C.bg : C.t3, transition: "all 0.15s" }} />
              </div>
              Claim
            </div>
            <div onClick={() => setShowAddress(!showAddress)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", ...T.body, minHeight: 36, marginTop: 4 }}>
              <div style={{ width: 40, height: 22, borderRadius: 11, padding: 2, background: showAddress ? C.t1 : C.active, transition: "background 0.15s", display: "flex", justifyContent: showAddress ? "flex-end" : "flex-start", alignItems: "center" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: showAddress ? C.bg : C.t3, transition: "all 0.15s" }} />
              </div>
              Adresse
            </div>
          </div>
          {!mobile && <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {["Outlook","Gmail","Apple Mail","iOS"].map(c => (
              <span key={c} style={{ fontSize: 10, padding: "3px 7px", borderRadius: 4, background: C.surface, border: `1px solid ${C.border}`, color: C.t3 }}>{c}</span>
            ))}
          </div>}
        </div>

        {/* Preview + Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: S.sm, minWidth: 0 }}>
          <Pill options={[{ value: "light", label: "Light", icon: <LuSun size={11} /> }, { value: "dark", label: "Dark", icon: <LuMoon size={11} /> }]} value={mode} onChange={setMode} />
          <div style={{ ...cardS, minWidth: 0 }}>
            {!mobile && <div style={{ borderBottom: `1px solid ${C.border}` }}>
              {[{ l: "Von", v: `${p.name} <${email}>` }, { l: "An", v: "kunde@beispiel.de" }, { l: "Betreff", v: "Projektupdate" }].map((r, i) => (
                <div key={i} style={{ padding: "7px 18px", fontSize: 12, color: C.t3, borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ display: "inline-block", width: 50 }}>{r.l}</span>
                  <span style={{ color: r.l === "Betreff" ? C.t1 : C.t2, fontWeight: r.l === "Betreff" ? 500 : 400 }}>{r.v}</span>
                </div>
              ))}
            </div>}
            <div style={{ padding: mobile ? S.md : S.lg, background: mode === "light" ? "#fff" : "#1c1c1e", overflow: "hidden" }}>
              {!mobile && <div style={{ fontSize: 14, lineHeight: 1.8, marginBottom: S.lg, color: mode === "light" ? "#555" : "#9a9da4", fontFamily: "Helvetica,Arial,sans-serif" }}>
                Sehr geehrter Herr M{"ü"}ller,<br/><br/>anbei das aktuelle Projektupdate.<br/><br/>Mit freundlichen Gr{"ü"}{"ß"}en
              </div>}
              <div style={!mobile ? { borderTop: `1px solid ${mode === "light" ? "#e5e5e5" : "rgba(255,255,255,0.06)"}`, paddingTop: S.lg } : {}}>
                <SigRender m={mode} innerRef={sigRef} />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: S.sm }}>
            <button onClick={() => doCopy("rich")} style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "none", background: C.t1, color: C.bg, ...T.body, fontWeight: 500, fontFamily: ff, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, minHeight: 44 }}>
              {copied === "rich" ? <LuCheck size={14} /> : <LuCopy size={14} />}{copied === "rich" ? "Kopiert" : mobile ? "Kopieren" : "Formatiert kopieren"}
            </button>
            <button onClick={() => doCopy("html")} style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: "transparent", color: C.t2, ...T.body, fontWeight: 500, fontFamily: ff, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, minHeight: 44 }}>
              {copied === "html" ? <LuCheck size={14} /> : <LuCode size={14} />}{copied === "html" ? "Kopiert" : "HTML"}
            </button>
          </div>
          {!mobile && <>
            <button onClick={() => setShowSrc(!showSrc)} style={{ width: "100%", padding: "9px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", fontFamily: ff, fontSize: 12, textAlign: "left", display: "flex", alignItems: "center", gap: 6, color: C.t3, minHeight: 40 }}>
              <span style={{ display: "flex", transform: showSrc ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}><LuChevronRight size={12} /></span>HTML Source
            </button>
            {showSrc && <div style={{ ...cardS, padding: S.md + 2, maxHeight: 200, overflow: "auto" }}>
              <pre style={{ margin: 0, fontSize: 10, color: C.t3, fontFamily: monoF, whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.6 }}>{buildHtml()}</pre>
            </div>}
            {/* Spec footer */}
            <div style={{ display: "flex", gap: 12, fontSize: 11, color: C.t3, flexWrap: "wrap" }}>
              {[["Gaps","20·16·16"],["Name","17/600"],["Contact","14/400"],["Addr","13/400"],["Claim","12/400 UC"],["Logo", `${logoW}px`]].map(([l,v])=>(
                <span key={l}>{l} <span style={{ fontFamily: monoF, color: C.t2 }}>{v}</span></span>
              ))}
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}

/* ═══ APP ═══ */
export default function App() {
  const [page, setPage] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mobile = useIsMobile();
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: ff, color: C.t1 }}>
      <style>{`@font-face{font-family:'TikTok Sans Variable';font-style:normal;font-display:swap;font-weight:300 900;src:url(https://cdn.jsdelivr.net/fontsource/fonts/tiktok-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations')}@font-face{font-family:'Aeonik Pro';font-style:normal;font-weight:400;font-display:swap;src:url(/assets/fonts/AeonikPro-Regular.otf) format('opentype')}@font-face{font-family:'Aeonik Pro';font-style:normal;font-weight:500;font-display:swap;src:url(/assets/fonts/AeonikPro-Medium.otf) format('opentype')}*{box-sizing:border-box}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:3px}::selection{background:rgba(255,255,255,0.15)}`}</style>
      <Sidebar page={page} go={setPage} mobile={mobile} open={drawerOpen} setOpen={setDrawerOpen} />
      <div style={{ flex: 1, marginLeft: mobile ? 0 : 220, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {mobile && <MobileHeader onMenu={() => setDrawerOpen(true)} page={page} />}
        <main style={{ flex: 1, padding: page === "home" ? 0 : (mobile ? "24px 20px 64px" : "40px 48px 96px"), maxWidth: page === "home" ? "none" : 860, width: "100%", display: page === "home" ? "flex" : "block" }}>
          {page === "home" && <HomePage go={setPage} mobile={mobile} />}
          {page === "logo" && <LogoPage mobile={mobile} />}
          {page === "colors" && <ColorsPage mobile={mobile} />}
          {page === "type" && <TypePage mobile={mobile} />}
          {page === "sig" && <SigPage mobile={mobile} />}
        </main>
      </div>
    </div>
  );
}
