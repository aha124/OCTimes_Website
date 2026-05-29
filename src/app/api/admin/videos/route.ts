import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireAdmin } from "@/lib/admin-guard";
import { getVideos, setVideos } from "@/lib/kv";
import type { VideoItem } from "@/lib/types";

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const videos = await getVideos();
  return NextResponse.json({ videos });
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const body = (await req.json()) as Partial<VideoItem>;
  if (!body.youtubeId || !body.title) {
    return NextResponse.json({ error: "youtubeId and title required" }, { status: 400 });
  }
  const all = await getVideos();
  const next: VideoItem = {
    id: randomUUID(),
    youtubeId: body.youtubeId,
    title: body.title,
    description: body.description,
    order: body.order ?? all.length,
  };
  await setVideos([...all, next]);
  return NextResponse.json({ video: next });
}

export async function PUT(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const body = (await req.json()) as VideoItem | { videos: VideoItem[] };
  if ("videos" in body && Array.isArray(body.videos)) {
    await setVideos(body.videos);
    return NextResponse.json({ ok: true });
  }
  const v = body as VideoItem;
  if (!v.id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const all = await getVideos();
  const idx = all.findIndex((x) => x.id === v.id);
  if (idx < 0) return NextResponse.json({ error: "not found" }, { status: 404 });
  const updated = [...all];
  updated[idx] = { ...updated[idx], ...v };
  await setVideos(updated);
  return NextResponse.json({ video: updated[idx] });
}

export async function DELETE(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;
  const { id } = (await req.json()) as { id: string };
  const all = await getVideos();
  await setVideos(all.filter((v) => v.id !== id));
  return NextResponse.json({ ok: true });
}
