/**
 * Consolidated brand knowledge — used by both pages and agent system prompt.
 * Single source of truth for all brand rules beyond color/typo tokens.
 * Aligned with the CASAGO Brand Voice Skill (casago-brand-voice.skill).
 */

export const toneOfVoice = {
  summary: "Professionell-warm, partnerschaftlich, wertschätzend. Wir kommunizieren auf Augenhöhe — mit Substanz und Herzblut.",
  rules: [
    "Immer 'Sie' und 'Wir' — niemals 'du' oder 'ich'",
    "Partner auf Augenhöhe, nicht Dienstleister — nie Auftragnehmer-Sprache",
    "Professionell-warm: Kompetenz zeigen, aber mit menschlicher Wärme",
    "Konkrete Referenzen statt leere Superlative — Substanz zeigt Kompetenz",
    "Aktive Sprache, keine Passivkonstruktionen",
    "Kernvokabular verwenden: 'ganzheitlich', 'aus einer Hand', 'Partnerschaft auf Augenhöhe', 'Herzblut', 'lösungsorientiert', 'wertschätzendes Miteinander'",
    "Sentence Case für Headlines, kein ALL CAPS außer dem Claim",
    "Langer Satz → kurzer Anker. Aufzählung → Statement. Detail → Verdichtung.",
    "Lösungsorientiert: Probleme benennen, aber nie ohne Lösung stehen lassen",
    "Projektbeschreibungen betonen: Partnerschaft, ganzheitlichen Ansatz, Qualität, Zukunftssicherheit",
  ],
  examples: {
    good: [
      "Wir betrachten Ihr Projekt ganzheitlich — von der ersten Idee bis zur Übergabe.",
      "Mit Partnerschaften auf Augenhöhe zum gemeinsamen Projekt.",
      "Es muss etwas Besonderes entstehen. Individuell und nicht von der Stange.",
      "Von der Idee bis zur Übergabe — alles aus einer Hand.",
      "Lassen Sie uns über Ihr Projekt sprechen.",
    ],
    bad: [
      "Wir sind die besten Bauunternehmer der Region!",
      "JETZT ANFRAGEN!!!",
      "Unsere einzigartigen Lösungen sind unvergleichlich.",
      "Ich freue mich auf deine Anfrage.", // ich + du
      "CASAGO bietet seinen Kunden erstklassige Dienstleistungen.", // unpersönlich + Dienstleister
    ],
  },
  signaturePhrases: [
    "Wir betrachten Projekte nicht nur in einer Dimension. Sondern ganzheitlich.",
    "Schaffen wir etwas Besonderes zusammen.",
    "Wir unterscheiden nicht nach 'unseren' und 'Ihren' Projekten.",
    "Mit Partnerschaften auf Augenhöhe zum gemeinsamen Projekt.",
    "Es muss etwas Besonderes entstehen. Individuell und nicht von der Stange.",
    "Das ist das, wofür wir mit Herz und Begeisterung arbeiten.",
  ],
};

export const brandStrategy = {
  vision: "Wir schaffen Lebensräume, die Bestand haben — gemeinsam mit unseren Partnern, mit einem ganzheitlichen 360-Grad-Blick und dem Anspruch, dass jedes Projekt etwas Besonderes wird. Nicht von der Stange, sondern individuell und zukunftssicher.",
  mission: "Wir realisieren Bauprojekte ganzheitlich und aus einer Hand — von der ersten Idee über die Planung und Konstruktion bis zur Übergabe. Mit Herzblut und einem Team, das Architektur, Bauingenieurwesen und nachhaltige Konzepte vereint.",
  values: [
    { name: "Partnerschaftlich", desc: "Partnerschaft auf Augenhöhe. Wir arbeiten mit unseren Bauherren, nicht für sie. Aus 'Ihrem' Projekt wird 'unser gemeinsames' Projekt." },
    { name: "Kompetent & erfahren", desc: "Jahrzehnte an Wissen in Architektur, Bauingenieurwesen und nachhaltiger Innovation — belegt durch konkrete Referenzen, nicht durch leere Worte." },
    { name: "Leidenschaftlich", desc: "Herzblut in jedem Projekt. Es muss etwas Besonderes entstehen — individuell und nicht von der Stange." },
    { name: "Zukunftsorientiert", desc: "Zukunftssichere Lösungen — von Dachbegrünung bis Schwammstadtkonzepte. Jede Entscheidung wird langfristig gedacht." },
    { name: "Lösungsorientiert", desc: "Wir suchen Lösungen, nicht Schuldige. Obwohl es anfänglich unmöglich schien, ist es uns dennoch gelungen." },
    { name: "Wertschätzend", desc: "Ein wertschätzendes Miteinander — mit dem Team, mit Partnern, mit Bauherren. Respektvoller Umgang auf Augenhöhe." },
  ],
  positioning: "Wir sind ganzheitlicher Partner für anspruchsvolle Bauprojekte — nicht reiner Generalunternehmer und nicht reines Planungsbüro, sondern ein integrierter Partner, der Architektur, Bauingenieurwesen und nachhaltige Innovation mit Herzblut vereint. Jedes Projekt ist individuell — nicht von der Stange.",
  targetGroups: [
    { name: "Bauherren & Projektentwickler", desc: "Partner, die ein Bauprojekt von der Planung bis zur Übergabe ganzheitlich und aus einer Hand realisieren möchten." },
    { name: "Kommunen & öffentliche Träger", desc: "Partner mit Bedarf an nachhaltigen Baukonzepten, Dachbegrünung und Schwammstadt-Lösungen." },
    { name: "Architekten & Planungsbüros", desc: "Partner, die uns für Bauingenieurleistungen, Bauleitung oder spezialisierte Gewerke an ihre Seite holen." },
    { name: "Investoren & Immobiliengesellschaften", desc: "Partner, die Wert auf qualitätsgesicherte, nachhaltige und termingerechte Projektrealisierung legen." },
  ],
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

export const photographyGuidelines = {
  style: "Klar, authentisch und sachlich — weil wir Kompetenz durch Substanz zeigen, nicht durch Inszenierung. Unsere Bilder spiegeln wider, was uns ausmacht: Herzblut, Ganzheitlichkeit und echte Partnerschaft.",
  rules: [
    "Natürliches Licht bevorzugen (Golden Hour, bewölkt)",
    "Entsättigte, ruhige Farben — keine knalligen Filter oder HDR",
    "Geometrische Komposition, gerade Linien, bewusster Weißraum",
    "Menschen im Kontext des Projekts, nie isoliert",
    "Logo auf Bildern: White-Variante, unten rechts/links, mit Schutzzone",
    "Social Media: Hochformat (9:16 / 4:5), Text-Overlays in Aeonik Pro Medium",
  ],
  forbidden: [
    "Stock-Fotos mit gestellten Szenen",
    "Übersättigte Farben oder HDR-Look",
    "Personen ohne Einverständnis",
    "Logo auf unruhigem Hintergrund ohne Kontrast",
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
