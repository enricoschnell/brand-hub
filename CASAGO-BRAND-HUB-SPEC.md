# CASAGO Brand Hub — Design Specification v2

## Overview
Internal brand hub for CASAGO GmbH, Prutting. Single source of truth for brand assets, colors, typography, and email signatures. Designed by eschnell.design.

## Hub UI System

### Shell
Fully dark UI (Lovable/Linear-style). Neutral monochrome — no colored accent.

| Token | Value | Usage |
|---|---|---|
| bg | `#0a0a0b` | App background |
| surface | `#141416` | Cards, panels |
| border | `rgba(255,255,255,0.06)` | Subtle dividers |
| borderActive | `rgba(255,255,255,0.2)` | Selected state borders |
| active | `rgba(255,255,255,0.08)` | Active backgrounds |
| t1 | `#eeeff1` | Primary text |
| t2 | `#8b8d94` | Secondary text |
| t3 | `#4b4d55` | Tertiary/labels |

### Typography (Hub UI)
Font: TikTok Sans Variable (SIL OFL, Fontsource CDN).

| Role | Size | Weight | Tracking | Color |
|---|---|---|---|---|
| Page Title | 24px | 600 | -0.025em | t1 |
| Page Desc | 15px | 400 | — | t2 |
| Section Label | 11px | 600 | UC 0.06em | t3 |
| Body | 13px | 400 | — | t2 |
| Body Strong | 13px | 500 | — | t1 |
| Caption | 11px | 400 | — | t3 |

### Radius
Max `12px` for cards. `8px` for swatches and inputs. `10px` for buttons. No value above `12px`.

### Icons
Lucide v0.383.0, embedded inline SVG components. No lucide-react import.

---

## Pages

### Home (`/`)
Cinematic SVG path-drawing animation (Herrström/Lit Create style):
- Phase 1 (0–1.9s): Stroke draw, letter-by-letter (C→A→S→A→G→O), 0.14s stagger
- Phase 2 (1.9–2.6s): Cross-fade stroke→fill, subtle scale breath (1.006)
- Phase 3 (2.6s): Claim word-by-word fade-up
- Phase 4 (3.2s): Buttons staggered entrance
- Path lengths measured via `getTotalLength()` for pixel-perfect animation

### Logo (`/logo`)
Three-column grid (mobile: 1-col). Cards with `aspectRatio: 3/1` canvas.

| Variant | Fill | Background |
|---|---|---|
| Black | `#353b43` | `#f8f8f7` |
| White | `#ffffff` | `#141416` |
| Outline | stroke `#fff` / 3px | `#20252b` |

Format chips (visible, no dropdown): Vektor (SVG), Bild (PNG), Dokument (PDF).
Print section: EPS CMYK per variant.
Verwendung: Separated guide section with Schutzzone + Mindestgröße rules.

### Farben (`/colors`)
Borderless square swatches (eBay/Wise pattern). `aspectRatio: 1/1`, `borderRadius: 8px`.
Dark colors get `inset box-shadow: 0 0 0 1px rgba(255,255,255,0.08)` via luminance check.
Click-to-copy with `scale(0.97)` feedback.

Groups: Hintergründe (4), Text (5), Akzent (2), UI (3), Buttons (3).

### Typografie (`/type`)
- Schriftfamilie card: Aeonik Pro at 48px, two "Aa" specimens (72px), alphabet set
- Desktop-Fonts: OTF download chips (active when hosted)
- Schriftgrößen: 9 steps from Display (82px) to Claim (14px/UC)

### Email Signatur (`/sig`)
Two-column layout (280px controls + preview).

**Controls**: Person picker (4 team), Logo size pill (Regular 100px / Large 140px), Claim toggle, Address toggle.

**Signature Structure**:
```
Wortmarke                     (standalone)
── 20px ──
Name                          17/600/#353b43
Role                          14/400/#868c95
── 16px ──
T  phone                     14/400, label 14/500/#868c95
M  mobile
E  email                     14/400/#353b43
── 16px + 1px line ──
Address (optional)            13/400/#868c95
Claim (optional)              12/400/UC/#868c95
```

**Contrast (audited)**:
- Light: primary `#353b43` on `#fff` = 11.3:1 AAA, secondary `#868c95` = 3.4:1
- Dark: primary `#f0f0ee` on `#1c1c1e` = 14.9:1 AAA, secondary `#9a9da4` = 6.3:1
- `#bfc3ca` is NEVER used on light backgrounds (1.77:1 = invisible)

---

## Brand Assets

### Wortmarke
viewBox: `0 0 986.77 174.91` (aspect ~5.64:1). Six SVG paths.
Variants: Black, White, Outline (stroke only).

### Colors (Figma-sourced)
| Name | Hex | Context |
|---|---|---|
| Background | `#f8f8f7` | Light pages |
| Surface | `#ffffff` | Cards |
| Dark | `#20252b` | Footer, dark sections |
| Page Dark | `#050c11` | Project pages |
| Primary | `#353b43` | Headlines, body |
| Secondary | `#868c95` | Descriptions |
| Muted | `#cdcdcd` | Subtitles on dark |
| On Dark | `#f8f8f7` | Text on dark bg |
| On Dark Muted | `#bfc3ca` | Footer labels (dark bg ONLY) |
| Cyan | `#59eded` | Highlight accent |
| Dark Teal | `#0b3434` | Accent surfaces |
| Border | `#e5e5e5` | Dividers |
| CTA BG | `#ffffff` | Primary button on dark |
| CTA Text | `#141414` | Button label |

### Typography
Aeonik Pro by CoType Foundry. Regular (400) + Medium (500). No Bold.

---

## Key Decisions

1. Bildmarke rejected — only Wortmarke remains
2. Fully dark hub UI, neutral monochrome
3. Max radius 12px (CASAGO is technical)
4. Borderless color swatches (eBay/Wise pattern)
5. Signature claim at bottom (matching website footer), not as logo lockup
6. Signature contrast: two-tier color system, no #bfc3ca on light
7. Format chips: human-readable (Vektor/Bild/Dokument), not technical (SVG/PNG/PDF)
8. Font downloads: placeholder until hosted at brand.casago.de
