import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;

  const { url } = (await req.json()) as { url: string };
  if (!url) return NextResponse.json({ error: "url required" }, { status: 400 });

  const id = extractYoutubeId(url);
  if (!id) return NextResponse.json({ error: "Could not parse YouTube URL" }, { status: 400 });

  try {
    const oembed = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${id}`,
      )}&format=json`,
    );
    if (!oembed.ok) {
      return NextResponse.json({ youtubeId: id, title: "" });
    }
    const data = (await oembed.json()) as { title?: string };
    return NextResponse.json({ youtubeId: id, title: data.title ?? "" });
  } catch {
    return NextResponse.json({ youtubeId: id, title: "" });
  }
}

function extractYoutubeId(input: string): string | null {
  const trimmed = input.trim();
  // Bare ID (11 chars)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const u = new URL(trimmed);
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1) || null;
    }
    if (u.hostname.endsWith("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      // /embed/ID or /shorts/ID or /live/ID
      if (parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") {
        return parts[1] ?? null;
      }
    }
  } catch {
    /* fall through */
  }
  return null;
}
