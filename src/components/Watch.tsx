import type { VideoItem } from "@/lib/types";
import Reveal from "./Reveal";

interface WatchProps {
  videos: VideoItem[];
}

export default function Watch({ videos }: WatchProps) {
  return (
    <section id="watch" className="relative bg-[var(--color-cream)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow">Watch</span>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.08] text-[var(--color-ink)] sm:text-5xl">
            A few of our favorites.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.06}>
              <li>
                <div className="card-lift relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-black shadow-[var(--shadow-warm)]">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.youtubeId}?rel=0`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-[var(--color-ink)]">
                  {v.title}
                </h3>
                {v.description && (
                  <p className="mt-1 font-body text-base text-[var(--color-ink-soft)]">
                    {v.description}
                  </p>
                )}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
