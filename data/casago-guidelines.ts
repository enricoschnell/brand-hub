/**
 * Consolidated brand knowledge — used by both pages and agent system prompt.
 * Single source of truth for all brand rules beyond color/typo tokens.
 */

export const toneOfVoice = {
  summary: "Professionell, präzise, technisch kompetent. Deutsch-first.",
  rules: [
    "Aktive Sprache bevorzugen, keine Passivkonstruktionen",
    "Technische Kompetenz zeigen, ohne Fachjargon zu übertreiben",
    "Klar und direkt formulieren — keine Marketing-Floskeln",
    "Sentence Case für Headlines, kein ALL CAPS außer dem Claim",
    "Superlative vermeiden ('das beste', 'einzigartig')",
    "Sachlich-warmer Ton — kompetent aber nicht kalt",
    "Projektbeschreibungen betonen: Planung, Umsetzung, Qualität, Nachhaltigkeit",
  ],
  examples: {
    good: [
      "Wir planen und realisieren Bauprojekte mit Präzision.",
      "Von der Idee bis zur Übergabe — alles aus einer Hand.",
      "Nachhaltige Dachbegrünung für urbane Räume.",
    ],
    bad: [
      "Wir sind die besten Bauunternehmer der Region!", // Superlativ
      "JETZT ANFRAGEN!!!", // ALL CAPS, Ausrufezeichen
      "Unsere einzigartigen Lösungen sind unvergleichlich.", // Floskeln
    ],
  },
};

export const signageSpecs = {
  formats: [
    {
      name: "Bauzaun Standard",
      dimensions: "3.450 × 1.760 mm",
      material: "Mesh-Banner, 300 dpi, UV-beständige Tinte",
      logoMinWidth: "400 mm",
      notes: "Wortmarke zentriert oder oben links. Claim optional unten.",
    },
    {
      name: "Bauzaun Kompakt",
      dimensions: "2.000 × 1.000 mm",
      material: "Mesh-Banner, 300 dpi",
      logoMinWidth: "250 mm",
      notes: "Gleiche Gestaltungsprinzipien wie Standard.",
    },
    {
      name: "Baustellenschild",
      dimensions: "800 × 600 mm",
      material: "Alu-Dibond oder PVC-Hartschaum, CMYK",
      logoMinWidth: "150 mm",
      notes: "Wetterfest und UV-beständig. Wortmarke, Projektname, Bauherr-Info.",
    },
    {
      name: "Wegweiser / Infotafel",
      dimensions: "Variabel",
      material: "Alu-Dibond oder Folie auf Träger",
      logoMinWidth: "100 mm",
      notes: "Aeonik Pro Medium für Headlines. Pfeilsymbole, QR-Codes erlaubt.",
    },
  ],
  rules: [
    "Farben: Anthrazit (#353b43) auf weiß, oder weiß auf Bild. Keine Farbverläufe.",
    "Schrift: Aeonik Pro Medium für Headlines, Regular für Infotexte. Mindestgröße 30 pt auf Bauzaun.",
    "Logo: Immer zentriert oder oben links. Mindestbreite je nach Format beachten.",
    "Druck: Mesh-Banner (300 dpi), Alu-Dibond (CMYK). UV-beständige Tinte.",
  ],
};

export const stationerySpecs = {
  formats: [
    {
      name: "Briefbogen (DIN A4)",
      dimensions: "210 × 297 mm",
      notes: "Falzmarken DIN 5008. Wortmarke oben rechts. Aeonik Pro Regular/Medium.",
    },
    {
      name: "Visitenkarten",
      dimensions: "85 × 55 mm",
      paper: "300 g/m² Bilderdruckpapier",
      notes: "Zweiseitig: Wortmarke + Kontaktdaten. Vorder- & Rückseite.",
    },
    {
      name: "Briefumschlag DIN lang",
      dimensions: "220 × 110 mm",
      notes: "Fensterumschlag-kompatibel. Wortmarke in Absenderzone.",
    },
    {
      name: "Briefumschlag C4",
      dimensions: "324 × 229 mm",
      notes: "Für ungefaltete A4-Dokumente. Wortmarke in Absenderzone.",
    },
  ],
};

export const applicationRules = {
  logoPlacement: [
    "Wortmarke immer mit Schutzzone (= Höhe des Buchstaben C) verwenden",
    "Nur freigegebene Varianten: Black, Anthrazit, White, Outline",
    "Mindestgröße Digital: 80 px Breite — Print: 25 mm Breite",
    "Auf dunklem Grund: White-Variante. Auf hellem Grund: Black oder Anthrazit.",
    "Auf Bildern: White-Variante mit ausreichend Kontrast zum Hintergrund.",
  ],
  forbidden: [
    "Logo verzerren, drehen, spiegeln oder mit Effekten versehen",
    "Bildmarke oder Wort-Bildmarke verwenden — nur die Wortmarke existiert",
    "Andere Schriftgewichte als Regular (400) und Medium (500)",
    "#bfc3ca auf hellem Hintergrund (1.77:1 Kontrast — durchfällt WCAG)",
    "Border-Radius über 12 px — die Marke ist technisch, nicht verspielt",
    "Farbverläufe auf dem Logo oder in der primären Farbpalette",
  ],
};
