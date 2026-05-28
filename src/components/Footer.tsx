import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-rule)]/70 bg-[var(--color-paper)]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
        <div>
          <div className="font-display text-xl font-semibold text-[var(--color-ink)]">
            OC Times Quartet
          </div>
          <p className="mt-1 font-body text-sm text-[var(--color-ink-muted)]">
            &copy; {year} OC Times. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://facebook.com/OCTimesQuartet"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="rounded-full p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-terracotta)]"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://instagram.com/octimesquartet"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="rounded-full p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-terracotta)]"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.youtube.com/@OCTimesQuartet"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="rounded-full p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-terracotta)]"
          >
            <Youtube size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
