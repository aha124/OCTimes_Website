import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function requireAdmin(): Promise<{ ok: true } | { ok: false; res: Response }> {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return { ok: false, res: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { ok: true };
}
