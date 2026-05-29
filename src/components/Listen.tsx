import type { MusicLinks } from "@/lib/types";
import Reveal from "./Reveal";

interface ListenProps {
  music: MusicLinks;
}

export default function Listen({ music }: ListenProps) {
  return (
    <section id="listen" className="relative bg-[var(--color-paper)] py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <span className="eyebrow">Listen</span>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.08] text-[var(--color-ink)] sm:text-5xl">
            Press play. Roll the window down.
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-[var(--color-ink-soft)]">
            Twenty years of recordings, from championship sets to studio cuts. Stream wherever
            you stream — or dig up an old copy of <em>The Road</em> if you&rsquo;re feeling
            nostalgic.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {music.spotifyArtistUrl && (
              <a href={music.spotifyArtistUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Spotify
              </a>
            )}
            {music.appleMusicUrl && (
              <a href={music.appleMusicUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                Apple Music
              </a>
            )}
            {music.youtubeUrl && (
              <a href={music.youtubeUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                YouTube
              </a>
            )}
          </div>

          {music.catalogNote && (
            <p className="mt-8 border-l-2 border-[var(--color-terracotta)] pl-5 font-body text-base italic leading-relaxed text-[var(--color-ink-soft)]">
              {music.catalogNote}
            </p>
          )}
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-warm)]">
            {music.spotifyEmbedUrl ? (
              <iframe
                src={music.spotifyEmbedUrl}
                width="100%"
                height="420"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block border-0"
                title="OC Times on Spotify"
              />
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center bg-[var(--color-sand)] font-body text-sm text-[var(--color-ink-muted)]">
                Paste a Spotify embed URL in the admin to feature an album here.
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
