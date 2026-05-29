"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface ConfirmButtonProps {
  onConfirm: () => void | Promise<void>;
  children: ReactNode;
  confirmText?: string;
  className?: string;
}

export default function ConfirmButton({
  onConfirm,
  children,
  confirmText = "Are you sure?",
  className,
}: ConfirmButtonProps) {
  const [pending, setPending] = useState(false);
  return (
    <button
      type="button"
      disabled={pending}
      onClick={async () => {
        if (!window.confirm(confirmText)) return;
        setPending(true);
        try {
          await onConfirm();
        } finally {
          setPending(false);
        }
      }}
      className={
        className ??
        "rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-60"
      }
    >
      {children}
    </button>
  );
}
