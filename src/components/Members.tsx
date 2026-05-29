import Image from "next/image";
import type { Member } from "@/lib/types";
import Reveal from "./Reveal";

interface MembersProps {
  members: Member[];
}

export default function Members({ members }: MembersProps) {
  return (
    <section id="guys" className="relative bg-[var(--color-cream)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow">The Guys</span>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.08] text-[var(--color-ink)] sm:text-5xl">
            Four parts. One car. A lot of miles.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.08}>
              <li className="group">
                <div className="card-lift relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-sand)] shadow-[var(--shadow-warm)]">
                  {m.photoUrl ? (
                    <Image
                      src={m.photoUrl}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover photo-warm transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-display text-6xl text-[var(--color-terracotta)]/60">
                      {m.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="mt-5">
                  <div className="font-body text-xs uppercase tracking-[0.22em] text-[var(--color-terracotta)]">
                    {m.part}
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-[var(--color-ink)]">
                    {m.name}
                  </h3>
                  <p className="mt-3 font-body text-base leading-relaxed text-[var(--color-ink-soft)]">
                    {m.bio}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
