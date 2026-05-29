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

  // Solid cream chrome once scrolled, or whenever the mobile menu is open
  // (so the dropdown always reads against a light background).
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        solid
          ? "bg-[var(--color-paper)]/95 backdrop-blur border-b border-[var(--color-rule)]/60 shadow-[0_2px_20px_-12px_rgba(80,40,20,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className={`font-display text-xl font-semibold tracking-tight transition-colors ${
            solid ? "text-[var(--color-ink)]" : "text-[var(--color-paper)]"
          }`}
        >
          OC Times
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--color-terracotta)] ${
                scrolled ? "text-[var(--color-ink-soft)]" : "text-[var(--color-paper)]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`md:hidden rounded-full p-2.5 transition-colors ${
            solid
              ? "text-[var(--color-ink)] hover:bg-[var(--color-sand)]"
              : "text-[var(--color-paper)] hover:bg-[var(--color-paper)]/15"
          }`}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--color-rule)]/60 bg-[var(--color-paper)]">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3.5 text-base font-medium text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-sand)] hover:text-[var(--color-terracotta)]"
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
