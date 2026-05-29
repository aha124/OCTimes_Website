"use client";

import { useState } from "react";
import { Facebook, Instagram, Youtube, Send } from "lucide-react";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Something went wrong sending your message.");
      }
      setStatus("sent");
      formEl.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="relative bg-[var(--color-cream)] py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <span className="eyebrow">Say hello</span>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.08] text-[var(--color-ink)] sm:text-5xl">
            Booking, hellos, &amp; everything in between.
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-[var(--color-ink-soft)]">
            Drop us a note — shows, coaching, festivals, just to say hi. We read everything, and
            we&rsquo;ll get back to you when we&rsquo;re off the road.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <a
              href="https://facebook.com/OCTimesQuartet"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-[var(--color-rule)] p-3 text-[var(--color-ink-soft)] transition hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://instagram.com/octimesquartet"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-[var(--color-rule)] p-3 text-[var(--color-ink-soft)] transition hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/@OCTimesQuartet"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="rounded-full border border-[var(--color-rule)] p-3 text-[var(--color-ink-soft)] transition hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
            >
              <Youtube size={18} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            className="rounded-[var(--radius-card)] border border-[var(--color-rule)]/70 bg-[var(--color-paper)] p-6 shadow-[var(--shadow-warm)] sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="name">
                  Your name
                </label>
                <input id="name" name="name" required className="input" />
              </div>
              <div>
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="label" htmlFor="subject">
                Subject
              </label>
              <input id="subject" name="subject" required className="input" />
            </div>
            <div className="mt-5">
              <label className="label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="input resize-y"
              />
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="font-body text-xs text-[var(--color-ink-muted)]">
                We&rsquo;ll never share your email.
              </p>
              <button type="submit" className="btn-primary" disabled={status === "sending"}>
                <Send size={16} />
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent!" : "Send"}
              </button>
            </div>

            {status === "sent" && (
              <p className="mt-4 font-body text-sm text-[var(--color-terracotta-deep)]">
                Thanks — we got it. We&rsquo;ll write back soon.
              </p>
            )}
            {status === "error" && error && (
              <p className="mt-4 font-body text-sm text-red-700">{error}</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
