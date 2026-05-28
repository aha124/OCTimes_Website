"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#story", label: "Story" },
  { href: "#guys", label: "The Guys" },
  { href: "#listen", label: "Listen" },
  { href: "#watch", label: "Watch" },
  { href: "#tour", label: "Schedule" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-paper)]/90 backdrop-blur border-b border-[var(--color-rule)]/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-display text-xl font-semibold tracking-tight text-[var(--color-ink)]"
        >
          OC Times
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[var(--color-ink-soft)] transition hover:text-[var(--color-terracotta)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden rounded-full p-2 text-[var(--color-ink)] hover:bg-[var(--color-sand)]"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--color-rule)]/60 bg-[var(--color-paper)]">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-[var(--color-ink-soft)] hover:bg-[var(--color-sand)]"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
