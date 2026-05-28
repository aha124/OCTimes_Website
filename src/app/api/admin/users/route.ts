import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { addAdminEmail, getAdminEmails, removeAdminEmail } from "@/lib/kv";

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const emails = await getAdminEmails();
  return NextResponse.json({ emails });
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const { email } = (await req.json()) as { email: string };
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  const emails = await addAdminEmail(email);
  return NextResponse.json({ emails });
}

export async function DELETE(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const { email } = (await req.json()) as { email: string };
  const emails = await removeAdminEmail(email);
  return NextResponse.json({ emails });
}
