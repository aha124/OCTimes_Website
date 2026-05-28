"use client";

import { useState } from "react";
import { Plus, Save, X, ArrowUp, ArrowDown, Wand2 } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import ConfirmButton from "@/components/admin/ConfirmButton";
import type { VideoItem } from "@/lib/types";

interface Props {
  initialVideos: VideoItem[];
}

export default function VideosEditor({ initialVideos }: Props) {
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [editing, setEditing] = useState<VideoItem | { id: "new" } | null>(null);
  const [draft, setDraft] = useState<Partial<VideoItem> & { url?: string }>({});
  const [busy, setBusy] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sorted = [...videos].sort((a, b) => a.order - b.order);

  function startNew() {
    setDraft({ youtubeId: "", title: "", description: "", order: videos.length });
    setEditing({ id: "new" });
    setError(null);
  }
  function startEdit(v: VideoItem) {
    setDraft({ ...v });
    setEditing(v);
    setError(null);
  }
  function cancel() {
    setEditing(null);
    setDraft({});
    setError(null);
  }

  async function autoFill() {
    if (!draft.url && !draft.youtubeId) return;
    setFetching(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/youtube-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: draft.url || draft.youtubeId }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Couldn't fetch metadata");
      }
      const { youtubeId, title } = (await res.json()) as { youtubeId: string; title: string };
      setDraft((d) => ({ ...d, youtubeId, title: d.title || title, url: undefined }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't fetch metadata");
    } finally {
      setFetching(false);
    }
  }

  async function save() {
    setBusy(true);
    setError(null);
    try {
      const isNew = editing && "id" in editing && editing.id === "new";
      const body = { ...draft };
      delete body.url;
      const res = await fetch("/api/admin/videos", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e?.error ?? "Save failed");
      }
      const { video } = (await res.json()) as { video: VideoItem };
      setVideos((prev) =>
        isNew ? [...prev, video] : prev.map((v) => (v.id === video.id ? video : v)),
      );
      cancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    const res = await fetch("/api/admin/videos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setVideos((prev) => prev.filter((v) => v.id !== id));
  }

  async function reorder(id: string, dir: -1 | 1) {
    const list = [...sorted];
    const idx = list.findIndex((v) => v.id === id);
    const swap = idx + dir;
    if (idx < 0 || swap < 0 || swap >= list.length) return;
    [list[idx], list[swap]] = [list[swap], list[idx]];
    const renumbered = list.map((v, i) => ({ ...v, order: i }));
    setVideos(renumbered);
    await fetch("/api/admin/videos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videos: renumbered }),
    });
  }

  return (
    <div>
      <PageHeader
        title="Videos"
        description="Paste a YouTube URL and click Auto-fill to grab the title."
        actions={
          editing == null && (
            <button className="btn-primary text-sm" onClick={startNew}>
              <Plus size={16} /> Add video
            </button>
          )
        }
      />

      {editing && (
        <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-rule)]/70 bg-[var(--color-cream)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
              {"id" in editing && editing.id === "new" ? "New video" : "Edit video"}
            </h2>
            <button
              className="rounded-full p-1.5 text-[var(--color-ink-muted)] hover:bg-[var(--color-sand)]"
              onClick={cancel}
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-5 grid gap-5">
            <div>
              <label className="label">YouTube URL or ID</label>
              <div className="flex gap-2">
                <input
                  className="input"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={draft.url ?? draft.youtubeId ?? ""}
                  onChange={(e) => setDraft({ ...draft, url: e.target.value })}
                />
                <button
                  type="button"
                  className="btn-ghost shrink-0 text-sm"
                  onClick={autoFill}
                  disabled={fetching}
                >
                  <Wand2 size={14} />
                  {fetching ? "…" : "Auto-fill"}
                </button>
              </div>
              {draft.youtubeId && (
                <div className="mt-2 text-xs text-[var(--color-ink-muted)]">
                  YouTube ID: <code>{draft.youtubeId}</code>
                </div>
              )}
            </div>
            <div>
              <label className="label">Title</label>
              <input
                className="input"
                value={draft.title ?? ""}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Description (optional)</label>
              <input
                className="input"
                value={draft.description ?? ""}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

          <div className="mt-6 flex items-center justify-end gap-2">
            <button className="btn-ghost text-sm" onClick={cancel}>
              Cancel
            </button>
            <button className="btn-primary text-sm" onClick={save} disabled={busy}>
              <Save size={16} /> {busy ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      )}

      <ul className="mt-8 grid gap-4">
        {sorted.map((v, i) => (
          <li
            key={v.id}
            className="flex items-center gap-4 rounded-[var(--radius-card)] border border-[var(--color-rule)]/70 bg-[var(--color-cream)] p-4"
          >
            <div className="aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg`}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="font-display text-base font-semibold text-[var(--color-ink)]">
                {v.title}
              </div>
              {v.description && (
                <div className="line-clamp-1 text-sm text-[var(--color-ink-muted)]">
                  {v.description}
                </div>
              )}
              <code className="text-xs text-[var(--color-ink-muted)]">{v.youtubeId}</code>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="rounded-lg p-2 text-[var(--color-ink-soft)] hover:bg-[var(--color-sand)] disabled:opacity-30"
                onClick={() => reorder(v.id, -1)}
                disabled={i === 0}
                aria-label="Move up"
              >
                <ArrowUp size={14} />
              </button>
              <button
                className="rounded-lg p-2 text-[var(--color-ink-soft)] hover:bg-[var(--color-sand)] disabled:opacity-30"
                onClick={() => reorder(v.id, 1)}
                disabled={i === sorted.length - 1}
                aria-label="Move down"
              >
                <ArrowDown size={14} />
              </button>
              <button
                className="rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-sand)]"
                onClick={() => startEdit(v)}
              >
                Edit
              </button>
              <ConfirmButton
                onConfirm={() => remove(v.id)}
                confirmText={`Remove "${v.title}"?`}
              >
                Delete
              </ConfirmButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
