import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireAdmin } from "@/lib/admin-guard";
import { getTourDates, setTourDates } from "@/lib/kv";
import type { TourDate } from "@/lib/types";

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const dates = await getTourDates();
  return NextResponse.json({ dates });
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const body = (await req.json()) as Partial<TourDate>;
  if (!body.title || !body.startDate || !body.city) {
    return NextResponse.json({ error: "title, startDate, and city are required" }, { status: 400 });
  }
  const all = await getTourDates();
  const next: TourDate = {
    id: randomUUID(),
    title: body.title,
    startDate: body.startDate,
    endDate: body.endDate || undefined,
    venue: body.venue || undefined,
    city: body.city,
    link: body.link || undefined,
    note: body.note || undefined,
  };
  const updated = [...all, next];
  await setTourDates(updated);
  return NextResponse.json({ date: next });
}

export async function PUT(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const body = (await req.json()) as TourDate;
  if (!body.id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const all = await getTourDates();
  const idx = all.findIndex((d) => d.id === body.id);
  if (idx < 0) return NextResponse.json({ error: "not found" }, { status: 404 });
  const updated = [...all];
  updated[idx] = {
    ...updated[idx],
    ...body,
    endDate: body.endDate || undefined,
    venue: body.venue || undefined,
    link: body.link || undefined,
    note: body.note || undefined,
  };
  await setTourDates(updated);
  return NextResponse.json({ date: updated[idx] });
}

export async function DELETE(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const { id } = (await req.json()) as { id: string };
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const all = await getTourDates();
  await setTourDates(all.filter((d) => d.id !== id));
  return NextResponse.json({ ok: true });
}
