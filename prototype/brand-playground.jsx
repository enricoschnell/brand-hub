import { useState, useEffect } from "react";

/*
 * CASAGO Brand Playground — Editorial Home
 * Inspired by wise.design: scrollable brand experience
 * Display typography, large logo, color showcase, claim as graphic element
 * Uses CASAGO Figma tokens + dark hub UI
 */

/* ═══ WORTMARKE SVG ═══ */
const WP = ["M907.16,0c-46.15,0-79.61,32.74-79.61,87.31s33.26,87.31,79.61,87.31,79.61-32.74,79.61-87.31S953.32,0,907.16,0ZM908.38,148.64h-2.38c-29.94,0-49.91-22.8-49.91-61.33s19.97-61.33,49.91-61.33h2.38c29.95,0,49.91,22.79,49.91,61.33s-19.95,61.33-49.91,61.33Z","M242.13.47h-.49c-22.25,0-36.13,14.65-45.7,48.35h0s-34.95,123.59-34.95,123.59h29.44l12.7-44.92h77.52l12.68,44.92h29.93l-34.94-123.59C278.69,15.15,264.86.47,242.13.47ZM210.3,101.59l22.27-79.47h18.63l22.28,79.47h-63.18Z","M559.37.46h-.48c-22.26,0-36.14,14.65-45.71,48.35l-34.95,123.59h29.44l12.69-44.91h77.54l12.69,44.91h29.91l-34.94-123.59C595.92,15.13,582.1.46,559.37.46ZM527.54,101.57l22.26-79.45h18.66l22.26,79.45h-63.18Z","M80.01,148.86h-2.33c-29.52,0-49.04-22.84-49.04-61.43s19.51-61.43,49.04-61.43h2.33c20.52,0,36.19,11.41,39.99,31.33h28.58C145.49,24.04,118.58,0,78.79,0,33.08,0,0,32.8,0,87.46s32.84,87.46,78.79,87.46h0c39.76,0,66.74-23.63,69.86-57.4h-28.6c-3.8,20.17-19.53,31.34-40.05,31.34Z","M729.71,101.88h46.84v4.11c-1.45,27.28-22.46,42.01-48.54,42.01-32.35,0-52.63-25.36-52.63-61.57s20.77-61.56,52.88-61.56c23.42,0,39.6,13.03,44.67,34.53h28.74C796.59,23.65,768.1.47,728.98.47c-50.21,0-82.09,34.53-82.09,85.95h0c0,51.43,32.6,85.96,79.92,85.96,26.8,0,44.18-12.07,52.38-24.15l2.43,22.7h21.49v-92.47h-73.4v23.42Z","M410.42,73.95c-26.5-4.58-43.84-8.19-43.84-25.54,0-15.9,13.25-24.08,32.27-24.08,20.48,0,33.97,11.56,36.13,28.66h27.7c-1.21-31.07-25.29-52.02-63.83-52.02-35.89,0-59.97,19.99-59.97,49.37,0,33.49,26.5,42.4,54.43,47.22,26.74,4.81,44.32,8.67,44.32,26.5,0,16.13-14.45,25.05-34.45,25.05h0c-23.6,0-39.01-13.24-40.46-32.99l-27.94-.48c.96,33.72,26.25,56.85,68.16,56.85,37.1,0,62.39-20.96,62.39-51.31.23-33.24-26.99-42.15-54.92-47.2Z"];
const Wm = ({ fill = "#eeeff1", w = 100 }) => <svg viewBox="0 0 986.77 174.91" width={w} style={{ display: "block" }}>{WP.map((d, i) => <path key={i} d={d} fill={fill} />)}</svg>;

/* ═══ BRAND TOKENS (from Figma extraction) ═══ */
const brand = {
  bg: "#f8f8f7", surface: "#ffffff", dark: "#20252b",
  text: "#353b43", muted: "#868c95", faint: "#bfc3ca",
  onDark: "#f8f8f7", onDarkMuted: "#bfc3ca",
  border: "#e5e5e5",
};
const hub = {
  bg: "#0a0a0b", surface: "#141416",
  border: "rgba(255,255,255,0.06)",
  t1: "#eeeff1", t2: "#8b8d94", t3: "#4b4d55",
};
const colors = [
  { hex: "#f8f8f7", name: "Background" },
  { hex: "#ffffff", name: "Surface" },
  { hex: "#353b43", name: "Primary" },
  { hex: "#868c95", name: "Secondary" },
  { hex: "#bfc3ca", name: "Muted" },
  { hex: "#20252b", name: "Dark" },
  { hex: "#e5e5e5", name: "Border" },
  { hex: "#141414", name: "CTA Text" },
];
const ff = "'TikTok Sans Variable','TikTok Sans',system-ui,sans-serif";
const monoF = "ui-monospace,'SF Mono',Monaco,monospace";

/* ═══ SECTION LABEL ═══ */
function Label({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, color: hub.t3, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 32 }}>{children}</div>
  );
}

/* ═══ HERO — Full viewport, oversized logo ═══ */
function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      padding: "80px 40px", position: "relative", overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(53,59,67,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <Wm fill={hub.t1} w={Math.min(480, typeof window !== "undefined" ? window.innerWidth * 0.7 : 480)} />
      </div>

      <div style={{
        marginTop: 48, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
      }}>
        <p style={{ fontSize: 18, fontWeight: 400, color: hub.t2, letterSpacing: "0.02em", lineHeight: 1.5, margin: 0 }}>
          Planen. Umsetzen. Leben.
        </p>
      </div>

      <div style={{
        marginTop: 64, opacity: visible ? 0.3 : 0,
        transition: "opacity 1.2s ease 0.6s",
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={hub.t3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}

/* ═══ CLAIM — Typographic statement ═══ */
function ClaimSection() {
  return (
    <section style={{ padding: "120px 40px", borderTop: `1px solid ${hub.border}` }}>
      <Label>Claim</Label>
      <div style={{ maxWidth: 720 }}>
        <h2 style={{
          fontSize: "clamp(36px, 6vw, 62px)", fontWeight: 500, color: hub.t1,
          letterSpacing: "-0.02em", lineHeight: 1.08, margin: "0 0 32px",
        }}>
          Planen.<br />Umsetzen.<br />Leben.
        </h2>
        <p style={{ fontSize: 16, color: hub.t2, lineHeight: 1.6, maxWidth: 440, margin: 0 }}>
          Der Claim vereint die drei Kernwerte des Unternehmens in einer klaren Sequenz. Immer in dieser Reihenfolge, immer mit Punkt.
        </p>
      </div>
    </section>
  );
}

/* ═══ TYPOGRAPHY — Display scale from Figma ═══ */
function TypeSection() {
  const scale = [
    { name: "Display", size: 62, weight: 500, tracking: "0", sample: "Bauen mit Haltung" },
    { name: "Heading L", size: 40, weight: 500, tracking: "0", sample: "Projektentwicklung" },
    { name: "Heading M", size: 36, weight: 500, tracking: "0", sample: "Sanierungsphase" },
    { name: "Heading S", size: 32, weight: 500, tracking: "-0.01em", sample: "Eckdaten" },
    { name: "Title", size: 28, weight: 400, tracking: "-0.01em", sample: "Baubetreuung Plus" },
    { name: "Body L", size: 18, weight: 400, tracking: "0.02em", sample: "Wir begleiten Sie durch den gesamten Bauprozess." },
    { name: "Body", size: 16, weight: 400, tracking: "0.02em", sample: "Von der ersten Idee bis zur Schl\u00fcsssel\u00fcbergabe." },
  ];

  return (
    <section style={{ padding: "120px 40px", borderTop: `1px solid ${hub.border}` }}>
      <Label>Typografie \u2014 Aeonik Pro</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {scale.map((t, i) => (
          <div key={t.name} style={{
            display: "grid", gridTemplateColumns: "140px 1fr", gap: 24, alignItems: "baseline",
            padding: "28px 0", borderBottom: i < scale.length - 1 ? `1px solid ${hub.border}` : "none",
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 500, color: hub.t3, fontFamily: monoF }}>{t.name}</div>
              <div style={{ fontSize: 11, color: hub.t3, fontFamily: monoF, marginTop: 4 }}>{t.size}px / {t.weight}</div>
            </div>
            <div style={{
              fontSize: Math.min(t.size, 52), fontWeight: t.weight, color: hub.t1,
              letterSpacing: t.tracking, lineHeight: 1.15,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: t.size > 24 ? "nowrap" : "normal",
            }}>
              {t.sample}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══ COLORS — Large swatches ═══ */
function ColorSection() {
  const [copied, setCopied] = useState(null);
  const copy = (hex) => { navigator.clipboard.writeText(hex); setCopied(hex); setTimeout(() => setCopied(null), 1200); };

  const primary = [
    { hex: "#f8f8f7", name: "Background", dark: false },
    { hex: "#ffffff", name: "Surface", dark: false },
    { hex: "#353b43", name: "Anthrazit", dark: true },
    { hex: "#20252b", name: "Dark", dark: true },
  ];
  const secondary = [
    { hex: "#868c95", name: "Secondary", dark: false },
    { hex: "#bfc3ca", name: "Muted", dark: false },
    { hex: "#e5e5e5", name: "Border", dark: false },
    { hex: "#cac7c6", name: "Inactive", dark: false },
  ];

  const Swatch = ({ c, large }) => (
    <div onClick={() => copy(c.hex)} style={{ cursor: "pointer" }}>
      <div style={{
        height: large ? 140 : 80, borderRadius: 14, background: c.hex,
        border: `1px solid ${c.dark ? "transparent" : hub.border}`,
        display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: 12,
        transition: "transform 0.15s",
      }}>
        {c.dark && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />}
      </div>
      <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: hub.t1 }}>{c.name}</span>
        <span style={{ fontSize: 11, fontFamily: monoF, color: copied === c.hex ? hub.t1 : hub.t3, transition: "color 0.15s" }}>
          {copied === c.hex ? "Kopiert" : c.hex}
        </span>
      </div>
    </div>
  );

  return (
    <section style={{ padding: "120px 40px", borderTop: `1px solid ${hub.border}` }}>
      <Label>Farbpalette</Label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 48 }}>
        {primary.map(c => <Swatch key={c.hex} c={c} large />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {secondary.map(c => <Swatch key={c.hex + c.name} c={c} />)}
      </div>
    </section>
  );
}

/* ═══ LOGO SHOWCASE — Large on brand backgrounds ═══ */
function LogoShowcase() {
  return (
    <section style={{ padding: "120px 40px", borderTop: `1px solid ${hub.border}` }}>
      <Label>Wortmarke</Label>

      {/* Light canvas */}
      <div style={{
        borderRadius: 16, background: brand.bg, padding: "80px 60px",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 12, border: `1px solid ${hub.border}`,
      }}>
        <Wm fill={brand.text} w={360} />
      </div>

      {/* Dark canvas */}
      <div style={{
        borderRadius: 16, background: brand.dark, padding: "80px 60px",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Wm fill={brand.onDark} w={360} />
      </div>
    </section>
  );
}

/* ═══ SPACING + RADII — Visual reference ═══ */
function SystemSection() {
  const radii = [
    { name: "Card", value: "6px" },
    { name: "Image", value: "4px" },
    { name: "Button Outline", value: "12px" },
    { name: "Input", value: "8px" },
  ];
  const spacing = [
    { name: "Mobile Margin", value: "24px" },
    { name: "Tablet Margin", value: "16px" },
    { name: "Desktop Margin", value: "124px" },
  ];

  return (
    <section style={{ padding: "120px 40px", borderTop: `1px solid ${hub.border}` }}>
      <Label>System</Label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, color: hub.t1, marginBottom: 20 }}>Radii</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {radii.map((r, i) => (
              <div key={r.name} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 0", borderBottom: i < radii.length - 1 ? `1px solid ${hub.border}` : "none",
              }}>
                <span style={{ fontSize: 13, color: hub.t2 }}>{r.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: r.value, background: hub.surface, border: `1px solid ${hub.border}` }} />
                  <span style={{ fontSize: 12, fontFamily: monoF, color: hub.t3, width: 40, textAlign: "right" }}>{r.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, color: hub.t1, marginBottom: 20 }}>Spacing</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {spacing.map((s, i) => (
              <div key={s.name} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 0", borderBottom: i < spacing.length - 1 ? `1px solid ${hub.border}` : "none",
              }}>
                <span style={{ fontSize: 13, color: hub.t2 }}>{s.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: parseInt(s.value), maxWidth: 80, height: 8, borderRadius: 4, background: `linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))` }} />
                  <span style={{ fontSize: 12, fontFamily: monoF, color: hub.t3, width: 48, textAlign: "right" }}>{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ FONT META ═══ */
function FontMeta() {
  return (
    <section style={{ padding: "120px 40px", borderTop: `1px solid ${hub.border}` }}>
      <Label>Schrift</Label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <div>
          <div style={{ fontSize: 48, fontWeight: 500, color: hub.t1, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 20 }}>
            Aeonik Pro
          </div>
          <p style={{ fontSize: 15, color: hub.t2, lineHeight: 1.6, margin: 0, maxWidth: 380 }}>
            Prim\u00e4re Marken-Schrift. Zwei Gewichte: Regular (400) f\u00fcr Flie\u00dftext, Medium (500) f\u00fcr Headlines. Kein Bold. Commercial License, CoType Foundry.
          </p>
        </div>
        <div>
          <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 72, fontWeight: 400, color: hub.t1, lineHeight: 1 }}>Aa</div>
              <div style={{ fontSize: 11, fontFamily: monoF, color: hub.t3, marginTop: 8 }}>Regular 400</div>
            </div>
            <div>
              <div style={{ fontSize: 72, fontWeight: 500, color: hub.t1, lineHeight: 1 }}>Aa</div>
              <div style={{ fontSize: 11, fontFamily: monoF, color: hub.t3, marginTop: 8 }}>Medium 500</div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: hub.t3, lineHeight: 2, letterSpacing: "0.04em" }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
            abcdefghijklmnopqrstuvwxyz<br />
            0123456789 .,;:!? \u00e4\u00f6\u00fc\u00df \u20ac
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  return (
    <section style={{
      padding: "64px 40px", borderTop: `1px solid ${hub.border}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: hub.t2 }}>CASAGO GmbH</div>
        <div style={{ fontSize: 12, color: hub.t3, marginTop: 4 }}>Am Queracker 6, D-83134 Prutting</div>
      </div>
      <div style={{ fontSize: 11, color: hub.t3 }}>Brand Hub \u00b7 eschnell.design</div>
    </section>
  );
}

/* ═══ APP ═══ */
export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: hub.bg, fontFamily: ff, color: hub.t1 }}>
      <style>{`@font-face{font-family:'TikTok Sans Variable';font-style:normal;font-display:swap;font-weight:300 900;src:url(https://cdn.jsdelivr.net/fontsource/fonts/tiktok-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations')}*{box-sizing:border-box;margin:0}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:3px}::selection{background:rgba(255,255,255,0.15)}html{scroll-behavior:smooth}`}</style>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <Hero />
        <ClaimSection />
        <LogoShowcase />
        <ColorSection />
        <FontMeta />
        <TypeSection />
        <SystemSection />
        <Footer />
      </div>
    </div>
  );
}
