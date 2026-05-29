import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireAdmin } from "@/lib/admin-guard";
import { getMembers, setMembers } from "@/lib/kv";
import type { Member } from "@/lib/types";

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const members = await getMembers();
  return NextResponse.json({ members });
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const body = (await req.json()) as Partial<Member>;
  if (!body.name || !body.part) {
    return NextResponse.json({ error: "name and part are required" }, { status: 400 });
  }
  const all = await getMembers();
  const next: Member = {
    id: randomUUID(),
    name: body.name,
    part: body.part,
    bio: body.bio ?? "",
    photoUrl: body.photoUrl,
    order: body.order ?? all.length,
  };
  await setMembers([...all, next]);
  return NextResponse.json({ member: next });
}

export async function PUT(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const body = (await req.json()) as Member | { members: Member[] };

  if ("members" in body && Array.isArray(body.members)) {
    // Bulk update (used for reordering)
    await setMembers(body.members);
    return NextResponse.json({ ok: true });
  }

  const member = body as Member;
  if (!member.id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const all = await getMembers();
  const idx = all.findIndex((m) => m.id === member.id);
  if (idx < 0) return NextResponse.json({ error: "not found" }, { status: 404 });
  const updated = [...all];
  updated[idx] = { ...updated[idx], ...member };
  await setMembers(updated);
  return NextResponse.json({ member: updated[idx] });
}

export async function DELETE(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const { id } = (await req.json()) as { id: string };
  const all = await getMembers();
  await setMembers(all.filter((m) => m.id !== id));
  return NextResponse.json({ ok: true });
}
