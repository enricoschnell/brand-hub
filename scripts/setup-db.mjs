import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("Missing DATABASE_URL env var. Set it in .env.local or pass it directly.");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function setup() {
  // Create table
  await sql`
    CREATE TABLE IF NOT EXISTS employees (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      initials VARCHAR(4) NOT NULL,
      contacts JSONB NOT NULL DEFAULT '[]',
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✓ Table 'employees' created");

  // Check if already seeded
  const existing = await sql`SELECT COUNT(*) as count FROM employees`;
  if (Number(existing[0].count) > 0) {
    console.log(`→ Table already has ${existing[0].count} rows, skipping seed.`);
    return;
  }

  // Seed with current team
  const team = [
    {
      name: "Fred Fröhlich",
      role: "Geschäftsführer",
      initials: "FF",
      contacts: [
        { label: "T", value: "+49 8036 - 908 69 86", href: "tel:+4980369086986" },
        { label: "M", value: "+49 172 - 8 999 111", href: "tel:+491728999111" },
        { label: "E", value: "fred.froehlich@casago.de", href: "mailto:fred.froehlich@casago.de" },
      ],
      sort_order: 0,
    },
    {
      name: "Yevheniia Tsaran",
      role: "Diplom-Spezialistin für Architektur (UA)",
      initials: "YT",
      contacts: [
        { label: "M", value: "+49 8036 - 908 69 86", href: "tel:+4980369086986" },
        { label: "E", value: "jane.tsaran@casago.de", href: "mailto:jane.tsaran@casago.de" },
      ],
      sort_order: 1,
    },
    {
      name: "Marco Riede",
      role: "Head of Planning and Construction",
      initials: "MR",
      contacts: [
        { label: "M", value: "+49 179 105 72 55", href: "tel:+491791057255" },
        { label: "E", value: "marco.riede@casago.de", href: "mailto:marco.riede@casago.de" },
      ],
      sort_order: 2,
    },
    {
      name: "Stephan Freitag",
      role: "Leitung Dachbegrünung & Schwammstadtkonzepte",
      initials: "SF",
      contacts: [
        { label: "M", value: "+49 151 23 77 55 80", href: "tel:+4915123775580" },
        { label: "E", value: "stephan.freitag@casago.de", href: "mailto:stephan.freitag@casago.de" },
      ],
      sort_order: 3,
    },
  ];

  for (const t of team) {
    await sql`
      INSERT INTO employees (name, role, initials, contacts, sort_order)
      VALUES (${t.name}, ${t.role}, ${t.initials}, ${JSON.stringify(t.contacts)}, ${t.sort_order})
    `;
    console.log(`✓ Seeded: ${t.name}`);
  }

  console.log("\nDone! 4 employees seeded.");
}

setup().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
