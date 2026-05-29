import Image from "next/image";
import Reveal from "./Reveal";

interface StoryProps {
  imageUrl?: string;
}

export default function Story({ imageUrl }: StoryProps) {
  return (
    <section id="story" className="relative bg-[var(--color-paper)] bg-grain py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-warm)]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="OC Times — on the road, somewhere out west"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover photo-warm"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-sand)] to-[var(--color-terracotta)]/30" />
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <span className="eyebrow">The Story</span>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.08] text-[var(--color-ink)] sm:text-5xl">
            More than music. More like a really long road trip with the windows down.
          </h2>

          <div className="mt-8 space-y-5 font-body text-lg leading-relaxed text-[var(--color-ink-soft)]">
            <p>
              We met as four guys who could sing. Somewhere along the way we became something
              else: friends who traded chairs, traded jokes, traded turns driving the rental, and
              somehow kept showing up to the same chord for more than twenty years.
            </p>
            <p>
              In 2008 we won the Barbershop Harmony Society&rsquo;s International Quartet
              Championship. It was a great week. But if we&rsquo;re honest, the better stuff
              happened in the margins, the late diners, the wrong-turn detours, the cities we
              explored instead of rehearsing, the World Series game we drove to when we probably
              should have flown home. The gig was usually the smallest part of the trip.
            </p>
            <p>
              We made three albums along the way, <em>Let&rsquo;s Fly</em>, <em>Destinations</em>,
              and <em>The Road</em>, and we sang in some rooms we never expected to, from Carnegie
              Hall to the Hawaii Theater to stages across Europe and beyond. We&rsquo;re grateful
              for all of it. In 2024 the Westminster Chorus welcomed us into its Hall of Fame, which
              was a kind thing to do for four people who mostly just wanted to keep hanging out.
            </p>
            <p>
              We sing a little softer now, and we laugh a little harder at our own jokes, and the
              harmonies feel more like home than they used to. Our hope was never that people would
              remember how we sang. It&rsquo;s that some quartet down the road says, &ldquo;I wish
              ours was like OC Times.&rdquo; Meaning: they had fun. They actually liked each other.
              When you come see us, you&rsquo;re hearing a friendship that happened to find a key.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { year: "2004", label: "Far Western District Champions" },
              { year: "2008", label: "BHS International Champions" },
              { year: "2024", label: "Westminster Hall of Fame" },
            ].map((item) => (
              <li
                key={item.year}
                className="rounded-[var(--radius-card)] border border-[var(--color-rule)]/70 bg-[var(--color-cream)] px-5 py-4"
              >
                <div className="font-display text-2xl font-semibold text-[var(--color-terracotta)]">
                  {item.year}
                </div>
                <div className="mt-1 text-sm text-[var(--color-ink-soft)]">{item.label}</div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
