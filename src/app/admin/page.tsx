import Link from "next/link";
import { CalendarDays, Users, Video, Music2 } from "lucide-react";
import { getMembers, getMusic, getUpcomingTourDates, getVideos } from "@/lib/kv";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [members, videos, dates, music] = await Promise.all([
    getMembers(),
    getVideos(),
    getUpcomingTourDates(),
    getMusic(),
  ]);

  const cards = [
    {
      href: "/admin/tour",
      label: "Tour Dates",
      icon: CalendarDays,
      value: `${dates.length} upcoming`,
      hint: "Add, edit, or remove upcoming shows.",
    },
    {
      href: "/admin/members",
      label: "The Guys",
      icon: Users,
      value: `${members.length} members`,
      hint: "Update bios, photos, voice parts.",
    },
    {
      href: "/admin/videos",
      label: "Videos",
      icon: Video,
      value: `${videos.length} featured`,
      hint: "Paste a YouTube link and we'll grab the title.",
    },
    {
      href: "/admin/music",
      label: "Music",
      icon: Music2,
      value: music.spotifyEmbedUrl ? "Spotify embed set" : "No embed yet",
      hint: "Streaming links and album embed.",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
        Welcome back.
      </h1>
      <p className="mt-2 font-body text-[var(--color-ink-soft)]">
        Tour dates are what folks come here for. That&rsquo;s the screen you&rsquo;ll touch most.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-[var(--radius-card)] border border-[var(--color-rule)]/70 bg-[var(--color-cream)] p-6 transition hover:border-[var(--color-terracotta)] hover:shadow-[var(--shadow-warm)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--color-terracotta)]">
                  <Icon size={18} />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    {c.label}
                  </span>
                </div>
              </div>
              <div className="mt-3 font-display text-2xl font-semibold text-[var(--color-ink)]">
                {c.value}
              </div>
              <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{c.hint}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
