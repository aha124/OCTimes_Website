import { getTourDates } from "@/lib/kv";
import TourEditor from "./TourEditor";

export const dynamic = "force-dynamic";

export default async function AdminTourPage() {
  const dates = await getTourDates();
  return <TourEditor initialDates={dates} />;
}
