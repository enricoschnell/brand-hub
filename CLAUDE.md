# CASAGO Brand Hub

## What this is
Internal brand hub for CASAGO GmbH. Serves as the single source of truth for logo assets, color palette, typography, and email signatures.

## Tech Stack
- **Framework**: Next.js 14+ App Router
- **UI**: shadcn/ui (New York), Tailwind CSS
- **Hub Font**: TikTok Sans Variable (SIL OFL, via Fontsource CDN)
- **Brand Font**: Aeonik Pro — Regular (400) + Medium (500) only. No Bold.
- **Hosting**: Vercel, subdomain `brand.casago.de` (CNAME)
- **Prototype**: `brand-hub.jsx` — single-file React artifact (all inline styles)

## Architecture
Five pages, dark UI shell (Lovable/Linear-style), sidebar navigation:

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Animated Wortmarke (SVG path draw), nav buttons |
| Logo | `/logo` | 3-column cards (Black/White/Outline), format chips (SVG/PNG/PDF/EPS) |
| Farben | `/colors` | Borderless square swatches, click-to-copy hex |
| Typografie | `/type` | Aeonik Pro specimen, type scale, font downloads |
| Email Signatur | `/sig` | Person picker, logo size, claim/address toggles, HTML export |

## Design Tokens
- **Hub UI**: `bg:#0a0a0b`, `surface:#141416`, `border:rgba(255,255,255,0.06)`, max radius `12px`
- **Brand Colors**: See `casago-brand-tokens.json`
- **Signature**: Two-tier system (`#353b43`/`#868c95` on light, `#f0f0ee`/`#9a9da4` on dark). `#bfc3ca` is dark-bg ONLY.

## Critical Rules
- **Bildmarke removed** — client rejected the geometric icon. Only Wortmarke exists.
- **No Wortbildmarke** — Wortmarke is the only logo form.
- **Max radius 12px** — CASAGO is technical, no rounded pill shapes.
- **Aeonik Pro**: Regular + Medium only. No Bold, no SemiBold.
- **Signature contrast**: All elements WCAG AA minimum. See contrast audit in session notes.

## Team (from business cards — authoritative)
- Fred Fröhlich — Geschäftsführer
- Yevheniia Tsaran — Diplom-Spezialistin für Architektur (UA)
- Marco Riede — Head of Planning and Construction
- Stephan Freitag — Leitung Dachbegrünung & Schwammstadtkonzepte

## File Structure (target)
```
app/
  layout.tsx          # TikTok Sans font, dark shell
  page.tsx            # Home — animated Wortmarke
  logo/page.tsx       # Logo assets + Verwendung
  colors/page.tsx     # Color palette
  type/page.tsx       # Typography + font downloads
  sig/page.tsx        # Email signature generator
public/
  assets/
    logos/             # SVG, PNG, PDF, EPS per variant
    fonts/             # AeonikPro-Regular.otf, AeonikPro-Medium.otf
  sig/
    wortmarke.png      # Hosted logo for email signatures
```
