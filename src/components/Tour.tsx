import { MapPin, ExternalLink, CalendarDays } from "lucide-react";
import type { TourDate } from "@/lib/types";
import { formatTourDate } from "@/lib/format";
import Reveal from "./Reveal";

interface TourProps {
  dates: TourDate[];
}

export default function Tour({ dates }: TourProps) {
  return (
    <section id="tour" className="relative bg-[var(--color-paper)] bg-grain py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow">Schedule</span>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.08] text-[var(--color-ink)] sm:text-5xl">
            Where you can catch us.
          </h2>
        </Reveal>

        {dates.length === 0 ? (
          <Reveal delay={0.05}>
            <p className="mt-10 max-w-xl font-body text-lg text-[var(--color-ink-soft)]">
              We&rsquo;re between shows at the moment. Drop us a line below — we love a good road
              trip and we&rsquo;d love to come sing for you.
            </p>
          </Reveal>
        ) : (
          <ul className="mt-12 divide-y divide-[var(--color-rule)]/70 border-y border-[var(--color-rule)]/70">
            {dates.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.04}>
                <li className="grid grid-cols-1 gap-3 py-7 sm:grid-cols-12 sm:items-center sm:gap-6">
                  <div className="sm:col-span-3">
                    <div className="flex items-center gap-2 font-display text-xl font-semibold text-[var(--color-terracotta)]">
                      <CalendarDays size={18} className="opacity-70" />
                      {formatTourDate(d.startDate, d.endDate)}
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <h3 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                      {d.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-ink-soft)]">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} className="opacity-60" />
                        {d.venue ? `${d.venue} · ` : ""}
                        {d.city}
                      </span>
                    </div>
                    {d.note && (
                      <p className="mt-2 text-sm italic text-[var(--color-ink-muted)]">{d.note}</p>
                    )}
                  </div>
                  <div className="sm:col-span-3 sm:text-right">
                    {d.link ? (
                      <a
                        href={d.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-[var(--color-terracotta)] hover:text-[var(--color-terracotta-deep)]"
                      >
                        Details
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="font-body text-xs uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                        Details soon
                      </span>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        )}

        <Reveal delay={0.1}>
          <p className="mt-10 font-body text-sm text-[var(--color-ink-muted)]">
            Want to book us? Scroll down and say hello.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
