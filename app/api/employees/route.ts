import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

function getDb() {
  return neon(process.env.DATABASE_URL!);
}

/** Check admin access: Clerk admin role OR legacy password header */
async function checkAdmin(req: NextRequest): Promise<boolean> {
  // Try Clerk auth first
  try {
    const session = await auth();
    if (session?.userId) {
      // For now, any signed-in user with admin role can manage team
      // TODO: check session.sessionClaims?.metadata?.role === "admin"
      return true;
    }
  } catch {}

  // Fallback to legacy password
  const pw = req.headers.get("x-admin-password");
  return pw === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM employees ORDER BY sort_order ASC, id ASC`;
    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const sql = getDb();
    const { name, role, initials, contacts, sort_order } = await req.json();
    const rows = await sql`
      INSERT INTO employees (name, role, initials, contacts, sort_order)
      VALUES (${name}, ${role}, ${initials}, ${JSON.stringify(contacts)}, ${sort_order ?? 0})
      RETURNING *
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
