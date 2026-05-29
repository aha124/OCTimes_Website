import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getSettings, setSettings } from "@/lib/kv";
import type { SiteSettings } from "@/lib/types";

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PUT(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const body = (await req.json()) as SiteSettings;
  await setSettings({
    heroImageUrl: body.heroImageUrl?.trim() || undefined,
    storyImageUrl: body.storyImageUrl?.trim() || undefined,
    contactEmail: body.contactEmail?.trim() || undefined,
  });
  return NextResponse.json({ ok: true });
}
