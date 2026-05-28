import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getMusic, setMusic } from "@/lib/kv";
import type { MusicLinks } from "@/lib/types";

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const music = await getMusic();
  return NextResponse.json({ music });
}

export async function PUT(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const body = (await req.json()) as MusicLinks;
  await setMusic({
    spotifyEmbedUrl: body.spotifyEmbedUrl?.trim() || undefined,
    spotifyArtistUrl: body.spotifyArtistUrl?.trim() || undefined,
    appleMusicUrl: body.appleMusicUrl?.trim() || undefined,
    youtubeUrl: body.youtubeUrl?.trim() || undefined,
    catalogNote: body.catalogNote?.trim() || undefined,
  });
  return NextResponse.json({ ok: true });
}
