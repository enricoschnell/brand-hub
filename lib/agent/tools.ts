import { tool } from "ai";
import { z } from "zod";
import brandTokens from "@/data/casago-brand-tokens.json";

// Flatten all brand colors for lookup
const allColors: { name: string; hex: string; desc: string; group: string }[] = [];
const colorMap = brandTokens.color;

function addColor(name: string, hex: string, desc: string, group: string) {
  allColors.push({ name, hex: hex.toLowerCase(), desc, group });
}

addColor("Background", colorMap.background.$value, colorMap.background.$description, "Backgrounds");
addColor("Surface", colorMap.surface.$value, colorMap.surface.$description, "Backgrounds");
addColor("Dark", colorMap.dark.$value, colorMap.dark.$description, "Backgrounds");
addColor("Page Dark", colorMap.pageDark.$value, colorMap.pageDark.$description, "Backgrounds");
addColor("Text Primary", colorMap.text.primary.$value, colorMap.text.primary.$description, "Text");
addColor("Text Secondary", colorMap.text.secondary.$value, colorMap.text.secondary.$description, "Text");
addColor("Text Muted", colorMap.text.muted.$value, colorMap.text.muted.$description, "Text");
addColor("Text On Dark", colorMap.text.onDark.$value, colorMap.text.onDark.$description, "Text");
addColor("Text On Dark Muted", colorMap.text.onDarkMuted.$value, colorMap.text.onDarkMuted.$description, "Text");
addColor("Text On Dark Secondary", colorMap.text.onDarkSecondary.$value, colorMap.text.onDarkSecondary.$description, "Text");
addColor("Accent Cyan", colorMap.accent.cyan.$value, colorMap.accent.cyan.$description, "Accent");
addColor("Accent Dark Teal", colorMap.accent.darkTeal.$value, colorMap.accent.darkTeal.$description, "Accent");
addColor("UI Border", colorMap.ui.border.$value, colorMap.ui.border.$description, "UI");
addColor("UI Active", colorMap.ui.active.$value, colorMap.ui.active.$description, "UI");
addColor("UI Inactive", colorMap.ui.inactive.$value, colorMap.ui.inactive.$description, "UI");
addColor("CTA Background", colorMap.button.ctaBackground.$value, colorMap.button.ctaBackground.$description, "Buttons");
addColor("CTA Text", colorMap.button.ctaText.$value, colorMap.button.ctaText.$description, "Buttons");
addColor("Outline Border", colorMap.button.outlineBorder.$value, colorMap.button.outlineBorder.$description, "Buttons");

function sRGBtoLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b);
}

function wcagContrast(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export const agentTools = {
  lookup_color: tool({
    description: "Look up a brand color by name or hex value. Returns the full token info including description and approved usage.",
    inputSchema: z.object({
      query: z.string().describe("Color name (e.g. 'primary', 'cyan') or hex value (e.g. '#353b43')"),
    }),
    execute: async ({ query }: { query: string }) => {
      const q = query.toLowerCase().replace(/\s+/g, "");
      const match = allColors.find(
        (c) =>
          c.hex === q ||
          c.hex === `#${q}` ||
          c.name.toLowerCase().replace(/\s+/g, "").includes(q)
      );
      if (match) {
        return { found: true, name: match.name, hex: match.hex, description: match.desc, group: match.group };
      }
      return {
        found: false,
        message: `No brand color found for "${query}". Available colors: ${allColors.map((c) => `${c.name} (${c.hex})`).join(", ")}`,
      };
    },
  }),

  check_contrast: tool({
    description: "Calculate the WCAG contrast ratio between two hex colors and determine if it passes AA/AAA.",
    inputSchema: z.object({
      foreground: z.string().describe("Foreground color hex (e.g. '#353b43')"),
      background: z.string().describe("Background color hex (e.g. '#ffffff')"),
    }),
    execute: async ({ foreground, background }: { foreground: string; background: string }) => {
      const ratio = wcagContrast(foreground, background);
      return {
        foreground,
        background,
        ratio: Math.round(ratio * 100) / 100,
        passesAA_normal: ratio >= 4.5,
        passesAA_large: ratio >= 3,
        passesAAA_normal: ratio >= 7,
        passesAAA_large: ratio >= 4.5,
      };
    },
  }),

  lookup_typography: tool({
    description: "Look up a type scale entry by name or approximate size.",
    inputSchema: z.object({
      query: z.string().describe("Type scale name (e.g. 'Body', 'Heading M') or size (e.g. '16')"),
    }),
    execute: async ({ query }: { query: string }) => {
      const scale = brandTokens.typography.scale;
      const q = query.toLowerCase();
      const match = scale.find(
        (s: any) =>
          s.name.toLowerCase() === q ||
          s.name.toLowerCase().includes(q) ||
          String(s.size) === q
      );
      if (match) {
        return { found: true, ...match, fontFamily: brandTokens.typography.fontFamily.$value };
      }
      return {
        found: false,
        message: `No type scale entry for "${query}". Available: ${scale.map((s: any) => `${s.name} (${s.size}px)`).join(", ")}`,
      };
    },
  }),

  find_asset: tool({
    description: "Search for available brand assets by type (logo, font, template) or variant (black, white, etc.).",
    inputSchema: z.object({
      query: z.string().describe("Asset search query (e.g. 'white logo svg', 'font regular', 'logo png')"),
    }),
    execute: async ({ query }: { query: string }) => {
      const q = query.toLowerCase();
      const assets = [
        { name: "Wortmarke Black SVG", url: "/assets/logos/CASAGO-Wortmarke-Black.svg", type: "logo", variant: "black", format: "svg" },
        { name: "Wortmarke Black PNG", url: "/assets/logos/CASAGO-Wortmarke-Black.png", type: "logo", variant: "black", format: "png" },
        { name: "Wortmarke Anthrazit SVG", url: "/assets/logos/CASAGO-Wortmarke-Anthrazit.svg", type: "logo", variant: "anthrazit", format: "svg" },
        { name: "Wortmarke Anthrazit PNG", url: "/assets/logos/CASAGO-Wortmarke-Anthrazit.png", type: "logo", variant: "anthrazit", format: "png" },
        { name: "Wortmarke White SVG", url: "/assets/logos/CASAGO-Wortmarke-White.svg", type: "logo", variant: "white", format: "svg" },
        { name: "Wortmarke White PNG", url: "/assets/logos/CASAGO-Wortmarke-White.png", type: "logo", variant: "white", format: "png" },
        { name: "Wortmarke Outline SVG", url: "/assets/logos/CASAGO-Wortmarke-Outline.svg", type: "logo", variant: "outline", format: "svg" },
        { name: "Wortmarke Outline PNG", url: "/assets/logos/CASAGO-Wortmarke-Outline.png", type: "logo", variant: "outline", format: "png" },
        { name: "Aeonik Pro Regular", url: "/assets/fonts/AeonikPro-Regular.otf", type: "font", variant: "regular", format: "otf" },
        { name: "Aeonik Pro Medium", url: "/assets/fonts/AeonikPro-Medium.otf", type: "font", variant: "medium", format: "otf" },
        { name: "Signature Wortmarke PNG", url: "/sig/wortmarke.png", type: "signature", variant: "email", format: "png" },
      ];

      const matches = assets.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.type.includes(q) ||
          a.variant.includes(q) ||
          a.format.includes(q)
      );

      return matches.length > 0
        ? { found: true, assets: matches.map((a) => ({ name: a.name, url: `https://brand.casago.de${a.url}`, format: a.format })) }
        : { found: false, message: `No assets matching "${query}". Try: logo, font, svg, png, black, white, regular, medium.` };
    },
  }),

  review_colors: tool({
    description: "Check a list of hex colors against the brand palette. Flags non-brand colors and suggests alternatives.",
    inputSchema: z.object({
      colors: z.array(z.string()).describe("Array of hex color values to check (e.g. ['#353b43', '#ff0000'])"),
    }),
    execute: async ({ colors }: { colors: string[] }) => {
      return colors.map((hex) => {
        const normalized = hex.toLowerCase();
        const match = allColors.find((c) => c.hex === normalized);
        if (match) {
          return { hex, status: "brand" as const, name: match.name, description: match.desc };
        }
        const hexToRgb = (h: string) => [
          parseInt(h.slice(1, 3), 16),
          parseInt(h.slice(3, 5), 16),
          parseInt(h.slice(5, 7), 16),
        ];
        const [r, g, b] = hexToRgb(normalized);
        let closest = allColors[0];
        let minDist = Infinity;
        for (const c of allColors) {
          const [cr, cg, cb] = hexToRgb(c.hex);
          const dist = Math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2);
          if (dist < minDist) { minDist = dist; closest = c; }
        }
        return {
          hex,
          status: "non-brand" as const,
          suggestion: `Use ${closest.name} (${closest.hex}) instead — ${closest.desc}`,
        };
      });
    },
  }),
};
