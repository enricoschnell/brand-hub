import { NextResponse } from "next/server";
import JSZip from "jszip";
import { readFile } from "fs/promises";
import { join } from "path";

const LIESMICH = `CASAGO Brand Kit
=================

Logos
-----
Wortmarke in 4 Varianten (Black, Anthrazit, White, Outline),
jeweils als SVG (Vektor) und PNG (Bild).

- Heller Hintergrund: Black oder Anthrazit verwenden
- Dunkler Hintergrund: White verwenden
- Mindestgröße: 80 px (digital), 25 mm (print)
- Schutzzone: Höhe des Buchstaben C als Mindestabstand

Schriften
---------
Aeonik Pro in zwei Gewichten:
- Regular (400) — Fließtext, UI-Elemente
- Medium (500) — Headlines, Akzente

Keine anderen Gewichte (Bold, SemiBold, Light) verwenden.

Installation:
- macOS: Doppelklick auf die .otf-Datei → "Installieren"
- Windows: Rechtsklick → "Für alle Benutzer installieren"

Lizenz: Nur für CASAGO-Mitarbeiter und beauftragte Dienstleister.

Weitere Informationen: https://brand.casago.de
`;

const logos = [
  "CASAGO-Wortmarke-Black.svg",
  "CASAGO-Wortmarke-Black.png",
  "CASAGO-Wortmarke-Anthrazit.svg",
  "CASAGO-Wortmarke-Anthrazit.png",
  "CASAGO-Wortmarke-White.svg",
  "CASAGO-Wortmarke-White.png",
  "CASAGO-Wortmarke-Outline.svg",
  "CASAGO-Wortmarke-Outline.png",
];

const fonts = [
  "AeonikPro-Regular.otf",
  "AeonikPro-Medium.otf",
];

export async function GET() {
  try {
    const zip = new JSZip();
    const root = zip.folder("CASAGO-Brand-Kit")!;
    const logosFolder = root.folder("Logos")!;
    const fontsFolder = root.folder("Schriften")!;

    const publicDir = join(process.cwd(), "public");

    for (const file of logos) {
      const data = await readFile(join(publicDir, "assets", "logos", file));
      logosFolder.file(file, data);
    }

    for (const file of fonts) {
      const data = await readFile(join(publicDir, "assets", "fonts", file));
      fontsFolder.file(file, data);
    }

    root.file("LIESMICH.txt", LIESMICH);

    const buffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="CASAGO-Brand-Kit.zip"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
