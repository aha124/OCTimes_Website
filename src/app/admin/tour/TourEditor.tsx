"use client";

import { useState } from "react";
import { Plus, Pencil, Save, X } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { formatTourDate } from "@/lib/format";
import type { TourDate } from "@/lib/types";

interface Props {
  initialDates: TourDate[];
}

const EMPTY: Omit<TourDate, "id"> = {
  startDate: "",
  endDate: "",
  title: "",
  venue: "",
  city: "",
  link: "",
  note: "",
};

export default function TourEditor({ initialDates }: Props) {
  const [dates, setDates] = useState<TourDate[]>(initialDates);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<TourDate | (Omit<TourDate, "id"> & { id?: string })>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sorted = [...dates].sort((a, b) => a.startDate.localeCompare(b.startDate));
  const today = new Date().toISOString().slice(0, 10);

  function startNew() {
    setDraft({ ...EMPTY });
    setEditingId("new");
    setError(null);
  }
  function startEdit(d: TourDate) {
    setDraft({ ...d });
    setEditingId(d.id);
    setError(null);
  }
  function cancel() {
    setEditingId(null);
    setDraft(EMPTY);
    setError(null);
  }

  async function save() {
    setBusy(true);
    setError(null);
    try {
      const isNew = editingId === "new";
      const res = await fetch("/api/admin/tour", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Save failed");
      }
      const { date } = (await res.json()) as { date: TourDate };
      setDates((prev) =>
        isNew ? [...prev, date] : prev.map((d) => (d.id === date.id ? date : d)),
      );
      cancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    const res = await fetch("/api/admin/tour", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setDates((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <div>
      <PageHeader
        title="Tour Dates"
        description="Past dates hide themselves automatically on the site. You just keep the upcoming list current."
        actions={
          editingId == null && (
            <button className="btn-primary text-sm" onClick={startNew}>
              <Plus size={16} /> Add date
            </button>
          )
        }
      />

      {editingId != null && (
        <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-rule)]/70 bg-[var(--color-cream)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
              {editingId === "new" ? "New date" : "Edit date"}
            </h2>
            <button
              className="rounded-full p-1.5 text-[var(--color-ink-muted)] hover:bg-[var(--color-sand)]"
              onClick={cancel}
              aria-label="Cancel"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label">Start date</label>
              <input
                type="date"
                className="input"
                value={draft.startDate}
                onChange={(e) => setDraft({ ...draft, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="label">End date (optional)</label>
              <input
                type="date"
                className="input"
                value={draft.endDate ?? ""}
                onChange={(e) => setDraft({ ...draft, endDate: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Event name</label>
              <input
                className="input"
                placeholder="e.g. BHS International Convention"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Venue (optional)</label>
              <input
                className="input"
                value={draft.venue ?? ""}
                onChange={(e) => setDraft({ ...draft, venue: e.target.value })}
              />
            </div>
            <div>
              <label className="label">City</label>
              <input
                className="input"
                placeholder="e.g. St. Louis, MO"
                value={draft.city}
                onChange={(e) => setDraft({ ...draft, city: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Tickets / event URL (optional)</label>
              <input
                className="input"
                value={draft.link ?? ""}
                onChange={(e) => setDraft({ ...draft, link: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Note (optional)</label>
              <input
                className="input"
                placeholder="Public-facing note"
                value={draft.note ?? ""}
                onChange={(e) => setDraft({ ...draft, note: e.target.value })}
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

      <ul className="mt-8 divide-y divide-[var(--color-rule)]/70 border-y border-[var(--color-rule)]/70">
        {sorted.length === 0 && (
          <li className="py-8 text-center text-sm text-[var(--color-ink-muted)]">
            No dates yet. Click &ldquo;Add date&rdquo; to put one up.
          </li>
        )}
        {sorted.map((d) => {
          const isPast = (d.endDate ?? d.startDate) < today;
          return (
            <li
              key={d.id}
              className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-12 sm:items-center sm:gap-4"
            >
              <div className="sm:col-span-3">
                <div className="font-display text-lg font-semibold text-[var(--color-terracotta)]">
                  {formatTourDate(d.startDate, d.endDate)}
                </div>
                {isPast && (
                  <div className="mt-0.5 text-xs uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                    Past — hidden on site
                  </div>
                )}
              </div>
              <div className="sm:col-span-6">
                <div className="font-display text-base font-semibold text-[var(--color-ink)]">
                  {d.title}
                </div>
                <div className="text-sm text-[var(--color-ink-soft)]">
                  {d.venue ? `${d.venue} · ` : ""}
                  {d.city}
                </div>
                {d.note && (
                  <div className="mt-1 text-xs italic text-[var(--color-ink-muted)]">{d.note}</div>
                )}
              </div>
              <div className="flex items-center justify-end gap-2 sm:col-span-3">
                <button
                  className="rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-sand)]"
                  onClick={() => startEdit(d)}
                >
                  <Pencil size={14} className="-mt-0.5 mr-1 inline-block" />
                  Edit
                </button>
                <ConfirmButton
                  onConfirm={() => remove(d.id)}
                  confirmText={`Delete "${d.title}"?`}
                >
                  Delete
                </ConfirmButton>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
