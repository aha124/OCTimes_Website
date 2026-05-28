"use client";

import { useState } from "react";
import { Plus, Save, X, ArrowUp, ArrowDown } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import ConfirmButton from "@/components/admin/ConfirmButton";
import ImagePicker from "@/components/admin/ImagePicker";
import type { Member, VoicePart } from "@/lib/types";

const PARTS: VoicePart[] = ["Tenor", "Lead", "Baritone", "Bass"];

interface Props {
  initialMembers: Member[];
}

export default function MembersEditor({ initialMembers }: Props) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [editing, setEditing] = useState<Member | { id: "new" } | null>(null);
  const [draft, setDraft] = useState<Partial<Member>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sorted = [...members].sort((a, b) => a.order - b.order);

  function startNew() {
    setDraft({ name: "", part: "Tenor", bio: "", order: members.length });
    setEditing({ id: "new" });
    setError(null);
  }
  function startEdit(m: Member) {
    setDraft({ ...m });
    setEditing(m);
    setError(null);
  }
  function cancel() {
    setEditing(null);
    setDraft({});
    setError(null);
  }

  async function save() {
    setBusy(true);
    setError(null);
    try {
      const isNew = editing && "id" in editing && editing.id === "new";
      const res = await fetch("/api/admin/members", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Save failed");
      }
      const { member } = (await res.json()) as { member: Member };
      setMembers((prev) =>
        isNew ? [...prev, member] : prev.map((m) => (m.id === member.id ? member : m)),
      );
      cancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    const res = await fetch("/api/admin/members", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  async function reorder(id: string, dir: -1 | 1) {
    const list = [...sorted];
    const idx = list.findIndex((m) => m.id === id);
    const swap = idx + dir;
    if (idx < 0 || swap < 0 || swap >= list.length) return;
    [list[idx], list[swap]] = [list[swap], list[idx]];
    const renumbered = list.map((m, i) => ({ ...m, order: i }));
    setMembers(renumbered);
    await fetch("/api/admin/members", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ members: renumbered }),
    });
  }

  return (
    <div>
      <PageHeader
        title="The Guys"
        description="Photos, bios, voice parts. Drag — actually, use the arrows — to set order."
        actions={
          editing == null && (
            <button className="btn-primary text-sm" onClick={startNew}>
              <Plus size={16} /> Add member
            </button>
          )
        }
      />

      {editing && (
        <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-rule)]/70 bg-[var(--color-cream)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
              {"id" in editing && editing.id === "new" ? "New member" : "Edit member"}
            </h2>
            <button
              className="rounded-full p-1.5 text-[var(--color-ink-muted)] hover:bg-[var(--color-sand)]"
              onClick={cancel}
              aria-label="Cancel"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-5 grid gap-6 sm:grid-cols-[240px_1fr]">
            <ImagePicker
              value={draft.photoUrl}
              onChange={(url) => setDraft({ ...draft, photoUrl: url })}
              folder="members"
              aspect="portrait"
            />
            <div className="grid gap-5">
              <div>
                <label className="label">Name</label>
                <input
                  className="input"
                  value={draft.name ?? ""}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Voice part</label>
                <select
                  className="input"
                  value={draft.part ?? "Tenor"}
                  onChange={(e) =>
                    setDraft({ ...draft, part: e.target.value as VoicePart })
                  }
                >
                  {PARTS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Short bio</label>
                <textarea
                  className="input resize-y"
                  rows={4}
                  value={draft.bio ?? ""}
                  onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                />
              </div>
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
        {sorted.map((m, i) => (
          <li
            key={m.id}
            className="flex items-center gap-4 rounded-[var(--radius-card)] border border-[var(--color-rule)]/70 bg-[var(--color-cream)] p-4"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-sand)] text-[var(--color-terracotta)]">
              {m.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={m.photoUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="font-display text-xl">{m.name.charAt(0)}</span>
              )}
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-terracotta)]">
                {m.part}
              </div>
              <div className="font-display text-lg font-semibold text-[var(--color-ink)]">
                {m.name}
              </div>
              <div className="mt-0.5 line-clamp-1 text-sm text-[var(--color-ink-muted)]">
                {m.bio || "No bio yet."}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="rounded-lg p-2 text-[var(--color-ink-soft)] hover:bg-[var(--color-sand)] disabled:opacity-30"
                onClick={() => reorder(m.id, -1)}
                disabled={i === 0}
                aria-label="Move up"
              >
                <ArrowUp size={14} />
              </button>
              <button
                className="rounded-lg p-2 text-[var(--color-ink-soft)] hover:bg-[var(--color-sand)] disabled:opacity-30"
                onClick={() => reorder(m.id, 1)}
                disabled={i === sorted.length - 1}
                aria-label="Move down"
              >
                <ArrowDown size={14} />
              </button>
              <button
                className="rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-sand)]"
                onClick={() => startEdit(m)}
              >
                Edit
              </button>
              <ConfirmButton
                onConfirm={() => remove(m.id)}
                confirmText={`Remove ${m.name}?`}
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
