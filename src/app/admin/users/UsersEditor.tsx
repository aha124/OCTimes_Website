"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import ConfirmButton from "@/components/admin/ConfirmButton";

interface Props {
  initialEmails: string[];
}

export default function UsersEditor({ initialEmails }: Props) {
  const [emails, setEmails] = useState<string[]>(initialEmails);
  const [newEmail, setNewEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function add() {
    if (!newEmail) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e?.error ?? "Failed");
      }
      const { emails: next } = (await res.json()) as { emails: string[] };
      setEmails(next);
      setNewEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove(email: string) {
    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      const { emails: next } = (await res.json()) as { emails: string[] };
      setEmails(next);
    }
  }

  return (
    <div>
      <PageHeader
        title="Admin Users"
        description="Anyone on this list can sign in with Google and edit the site."
      />

      <div className="mt-8 max-w-2xl rounded-[var(--radius-card)] border border-[var(--color-rule)]/70 bg-[var(--color-cream)] p-6">
        <label className="label">Add an admin email</label>
        <div className="flex gap-2">
          <input
            className="input"
            type="email"
            placeholder="name@gmail.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void add();
            }}
          />
          <button className="btn-primary text-sm" onClick={add} disabled={busy}>
            <Plus size={16} /> Add
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </div>

      <ul className="mt-8 max-w-2xl divide-y divide-[var(--color-rule)]/70 border-y border-[var(--color-rule)]/70">
        {emails.length === 0 && (
          <li className="py-6 text-sm text-[var(--color-ink-muted)]">
            No admins configured. Set <code>ADMIN_EMAILS</code> as a fallback or add one above.
          </li>
        )}
        {emails.map((email) => (
          <li key={email} className="flex items-center justify-between gap-3 py-4">
            <span className="font-body text-sm text-[var(--color-ink)]">{email}</span>
            <ConfirmButton
              onConfirm={() => remove(email)}
              confirmText={`Remove ${email} from admins?`}
            >
              Remove
            </ConfirmButton>
          </li>
        ))}
      </ul>
    </div>
  );
}
