import { NextResponse } from "next/server";
import { getUpcomingTourDates } from "@/lib/kv";

export const revalidate = 60;

export async function GET() {
  const dates = await getUpcomingTourDates();
  return NextResponse.json({ dates });
}
