import { getVideos } from "@/lib/kv";
import VideosEditor from "./VideosEditor";

export const dynamic = "force-dynamic";

export default async function AdminVideosPage() {
  const videos = await getVideos();
  return <VideosEditor initialVideos={videos} />;
}
