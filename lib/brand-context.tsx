"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { BrandConfig } from "@/lib/types/brand";
import { WP, WORTMARKE_VIEWBOX, BRAND_COLORS, SC, LOGO_SIZES } from "@/lib/brand-data";
import { C } from "@/lib/tokens";

/** CASAGO brand configuration — the default (and currently only) brand */
const casagoBrand: BrandConfig = {
  id: "casago",
  name: "CASAGO",
  legal: "CASAGO GmbH",
  tagline: "Planen. Umsetzen. Leben.",
  claim: "PLANEN. UMSETZEN. LEBEN.",
  website: "casago.de",
  contact: {
    address: "Am Queracker 6, D-83134 Prutting",
    addressMaps: "https://maps.google.com/?q=Am+Queracker+6,+83134+Prutting",
    phone: "+49 8036 908 69 86",
    phoneHref: "+4980369086986",
    email: "info@casago.de",
  },

  tokens: {
    colors: BRAND_COLORS.map((g) => ({
      group: g.group,
      colors: g.colors.map((c) => ({
        name: c.name,
        hex: c.hex,
        description: c.desc,
        dark: c.dark,
        accent: c.accent,
      })),
    })),
    typography: {
      fontFamily: "Aeonik Pro",
      scale: [
        { name: "Display", size: 82, weight: 400, tracking: "normal", sample: "50" },
        { name: "Heading L", size: 40, weight: 400, tracking: "normal", sample: "Geschäftsfelder" },
        { name: "Heading M", size: 34, weight: 500, tracking: "normal", sample: "Wir betrachten Projekte" },
        { name: "Heading S", size: 32, weight: 500, tracking: "normal", sample: "Eckdaten" },
        { name: "Title", size: 28, weight: 400, tracking: "-0.28px", sample: "Grundstücksankauf" },
        { name: "Body L", size: 18, weight: 400, tracking: "0.36px", sample: "Das Team" },
        { name: "Body", size: 16, weight: 400, tracking: "0.32px", sample: "Wir übernehmen" },
        { name: "Caption", size: 14, weight: 400, tracking: "0.28px", sample: "Den ganzen Text lesen" },
        { name: "Claim", size: 14, weight: 400, tracking: "0.84px", transform: "uppercase", sample: "PLANEN. UMSETZEN. LEBEN." },
      ],
    },
    radii: { card: "6px", buttonOutline: "12px", swatch: "8px" },
    signature: SC,
  },

  assets: {
    logoVariants: [
      { id: "black", label: "Black", fill: "#000000", bg: "#f8f8f7" },
      { id: "anthrazit", label: "Anthrazit", fill: "#353b43", bg: "#f8f8f7" },
      { id: "white", label: "White", fill: "#ffffff", bg: "#141416" },
      { id: "outline", label: "Outline", bg: "#20252b", isOutline: true },
    ],
    fontFiles: [
      { label: "Aeonik Pro Regular", sub: "OTF", file: "AeonikPro-Regular.otf" },
      { label: "Aeonik Pro Medium", sub: "OTF", file: "AeonikPro-Medium.otf" },
    ],
    templates: [],
    wortmarkePaths: WP,
    wortmarkeViewBox: WORTMARKE_VIEWBOX,
    logoSizes: LOGO_SIZES,
  },

  guidelines: {
    logoRules: "",
    colorRules: "",
    typographyRules: "",
    toneOfVoice: "",
  },

  ui: { ...C },
};

const BrandContext = createContext<BrandConfig>(casagoBrand);

export function BrandProvider({ children, brand }: { children: ReactNode; brand?: BrandConfig }) {
  return <BrandContext.Provider value={brand ?? casagoBrand}>{children}</BrandContext.Provider>;
}

export function useBrand(): BrandConfig {
  return useContext(BrandContext);
}

export { casagoBrand };
