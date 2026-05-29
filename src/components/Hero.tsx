import Image from "next/image";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  imageUrl?: string;
}

export default function Hero({ imageUrl }: HeroProps) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="OC Times — on the road"
          fill
          priority
          sizes="100vw"
          className="object-cover photo-warm"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a2417] via-[#a05a30] to-[#d9a55c]" />
      )}

      {/* Warm vignette + bottom fade for legible type */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,12,6,0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#1a1108]/85 via-[#1a1108]/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-32 sm:pb-28 md:pb-36">
        <p className="font-body text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-light)]">
          2008 BHS International Quartet Champions · Hall of Fame 2024
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] text-[var(--color-paper)] sm:text-6xl md:text-7xl lg:text-8xl">
          Brothers on
          <br />
          the road.
        </h1>
        <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-[var(--color-paper)]/90 sm:text-xl">
          Four voices, twenty-plus years, one long shared trip. We&rsquo;re OC Times — still
          singing, still laughing, still showing up.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#tour" className="btn-primary">
            See us live
          </a>
          <a href="#story" className="btn-outline-light">
            Our story
          </a>
        </div>
      </div>

      <a
        href="#story"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[var(--color-paper)]/80 transition hover:text-[var(--color-paper)]"
      >
        <ArrowDown className="animate-bounce" size={22} />
      </a>
    </section>
  );
}
