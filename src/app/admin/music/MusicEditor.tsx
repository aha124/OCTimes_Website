"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import type { MusicLinks } from "@/lib/types";

interface Props {
  initial: MusicLinks;
}

export default function MusicEditor({ initial }: Props) {
  const [music, setMusic] = useState<MusicLinks>(initial);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setBusy(true);
    setError(null);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/music", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(music),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e?.error ?? "Save failed");
      }
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader title="Music" description="Streaming links and the Spotify embed." />

      <div className="mt-8 grid max-w-2xl gap-5">
        <div>
          <label className="label">Spotify embed URL</label>
          <input
            className="input"
            placeholder="https://open.spotify.com/embed/album/..."
            value={music.spotifyEmbedUrl ?? ""}
            onChange={(e) => setMusic({ ...music, spotifyEmbedUrl: e.target.value })}
          />
          <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
            In Spotify, click Share → Embed track/album. Paste the src URL here.
          </p>
        </div>
        <div>
          <label className="label">Spotify artist URL</label>
          <input
            className="input"
            value={music.spotifyArtistUrl ?? ""}
            onChange={(e) => setMusic({ ...music, spotifyArtistUrl: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Apple Music URL</label>
          <input
            className="input"
            value={music.appleMusicUrl ?? ""}
            onChange={(e) => setMusic({ ...music, appleMusicUrl: e.target.value })}
          />
        </div>
        <div>
          <label className="label">YouTube channel URL</label>
          <input
            className="input"
            value={music.youtubeUrl ?? ""}
            onChange={(e) => setMusic({ ...music, youtubeUrl: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Catalog / album note (optional)</label>
          <textarea
            className="input resize-y"
            rows={3}
            value={music.catalogNote ?? ""}
            onChange={(e) => setMusic({ ...music, catalogNote: e.target.value })}
          />
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}
        {status === "saved" && (
          <p className="text-sm text-[var(--color-terracotta-deep)]">Saved.</p>
        )}

        <div>
          <button className="btn-primary text-sm" onClick={save} disabled={busy}>
            <Save size={16} /> {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
