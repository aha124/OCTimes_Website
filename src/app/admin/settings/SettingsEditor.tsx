"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import ImagePicker from "@/components/admin/ImagePicker";
import type { SiteSettings } from "@/lib/types";

interface Props {
  initial: SiteSettings;
}

export default function SettingsEditor({ initial }: Props) {
  const [settings, setSettings] = useState<SiteSettings>(initial);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setBusy(true);
    setError(null);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
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
      <PageHeader title="Site Settings" description="Hero image, story image, contact email." />

      <div className="mt-8 grid max-w-2xl gap-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <ImagePicker
            value={settings.heroImageUrl}
            onChange={(url) => setSettings({ ...settings, heroImageUrl: url })}
            folder="hero"
            label="Hero image (full-bleed)"
            aspect="landscape"
          />
          <ImagePicker
            value={settings.storyImageUrl}
            onChange={(url) => setSettings({ ...settings, storyImageUrl: url })}
            folder="story"
            label="Story image"
            aspect="portrait"
          />
        </div>

        <div>
          <label className="label">Contact email (where the contact form sends)</label>
          <input
            className="input"
            type="email"
            value={settings.contactEmail ?? ""}
            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
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
