import { getMusic } from "@/lib/kv";
import MusicEditor from "./MusicEditor";

export const dynamic = "force-dynamic";

export default async function AdminMusicPage() {
  const music = await getMusic();
  return <MusicEditor initial={music} />;
}
