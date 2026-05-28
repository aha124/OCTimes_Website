import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Members from "@/components/Members";
import Listen from "@/components/Listen";
import Watch from "@/components/Watch";
import Tour from "@/components/Tour";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getMembers,
  getMusic,
  getSettings,
  getUpcomingTourDates,
  getVideos,
} from "@/lib/kv";

export const revalidate = 60;

export default async function Home() {
  const [members, videos, music, dates, settings] = await Promise.all([
    getMembers(),
    getVideos(),
    getMusic(),
    getUpcomingTourDates(),
    getSettings(),
  ]);

  return (
    <main>
      <Nav />
      <Hero imageUrl={settings.heroImageUrl} />
      <Story imageUrl={settings.storyImageUrl} />
      <Members members={members} />
      <Listen music={music} />
      <Watch videos={videos} />
      <Tour dates={dates} />
      <Contact />
      <Footer />
    </main>
  );
}
