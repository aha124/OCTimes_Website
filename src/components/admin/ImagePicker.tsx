"use client";

import { useRef, useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import Image from "next/image";

interface ImagePickerProps {
  value?: string;
  onChange: (url: string | undefined) => void;
  folder?: string;
  label?: string;
  aspect?: "square" | "portrait" | "landscape";
}

export default function ImagePicker({
  value,
  onChange,
  folder = "uploads",
  label = "Photo",
  aspect = "portrait",
}: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "landscape" ? "aspect-video" : "aspect-[4/5]";

  async function onFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Upload failed");
      }
      const { url } = (await res.json()) as { url: string };
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="label">{label}</div>
      <div className={`relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-rule)] bg-[var(--color-sand)] ${aspectClass}`}>
        {value ? (
          <Image src={value} alt="" fill className="object-cover" sizes="240px" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[var(--color-ink-muted)]">
            No image yet
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void onFile(f);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          className="btn-ghost text-sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          <Upload size={14} />
          {uploading ? "Uploading…" : value ? "Replace" : "Upload"}
        </button>
        {value && (
          <button
            type="button"
            className="rounded-full border border-[var(--color-rule)] px-3 py-1.5 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-sand)]"
            onClick={() => onChange(undefined)}
          >
            <Trash2 size={14} className="inline-block" />
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}
