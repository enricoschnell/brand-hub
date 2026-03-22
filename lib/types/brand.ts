export interface BrandContact {
  address: string;
  addressMaps: string;
  phone: string;
  phoneHref: string;
  email: string;
}

export interface BrandColorToken {
  name: string;
  hex: string;
  description: string;
  dark?: boolean;
  accent?: boolean;
}

export interface BrandColorGroup {
  group: string;
  colors: BrandColorToken[];
}

export interface TypeScaleEntry {
  name: string;
  size: number;
  weight: number;
  tracking: string;
  transform?: string;
  sample?: string;
}

export interface SignatureTokens {
  light: { p: string; s: string; q: string; lbl: string };
  dark: { p: string; s: string; q: string; lbl: string };
}

export interface LogoVariant {
  id: string;
  label: string;
  fill?: string;
  bg: string;
  isOutline?: boolean;
}

export interface FontFile {
  label: string;
  sub: string;
  file: string;
}

export interface TemplateFile {
  label: string;
  description: string;
  file: string;
  format: string;
}

export interface BrandConfig {
  id: string;
  name: string;
  legal: string;
  tagline: string;
  claim: string;
  website: string;
  contact: BrandContact;

  tokens: {
    colors: BrandColorGroup[];
    typography: {
      fontFamily: string;
      scale: TypeScaleEntry[];
    };
    radii: Record<string, string>;
    signature: SignatureTokens;
  };

  assets: {
    logoVariants: LogoVariant[];
    fontFiles: FontFile[];
    templates: TemplateFile[];
    wortmarkePaths: string[];
    wortmarkeViewBox: string;
    logoSizes: { regular: number; large: number };
  };

  guidelines: {
    logoRules: string;
    colorRules: string;
    typographyRules: string;
    toneOfVoice: string;
  };

  ui: {
    bg: string;
    surface: string;
    border: string;
    borderActive: string;
    hover: string;
    active: string;
    t1: string;
    t2: string;
    t3: string;
  };
}
