import { kv } from "@vercel/kv";
import type { Member, MusicLinks, SiteSettings, TourDate, VideoItem } from "./types";
import {
  DEFAULT_MEMBERS,
  DEFAULT_MUSIC,
  DEFAULT_SETTINGS,
  DEFAULT_TOUR,
  DEFAULT_VIDEOS,
} from "./defaults";

const KEYS = {
  tour: "tour:dates",
  members: "members",
  videos: "videos",
  music: "music:links",
  settings: "site:settings",
  adminEmails: "admin:emails",
} as const;

function kvConfigured() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function safeGet<T>(key: string, fallback: T): Promise<T> {
  if (!kvConfigured()) return fallback;
  try {
    const v = await kv.get<T>(key);
    return (v ?? fallback) as T;
  } catch {
    return fallback;
  }
}

async function safeSet<T>(key: string, value: T): Promise<void> {
  if (!kvConfigured()) {
    throw new Error("KV is not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN.");
  }
  await kv.set(key, value);
}

/* ----------------------------- Tour dates ----------------------------- */

export async function getTourDates(): Promise<TourDate[]> {
  return safeGet<TourDate[]>(KEYS.tour, DEFAULT_TOUR);
}

export async function setTourDates(dates: TourDate[]): Promise<void> {
  await safeSet(KEYS.tour, dates);
}

export async function getUpcomingTourDates(): Promise<TourDate[]> {
  const all = await getTourDates();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = today.toISOString().slice(0, 10);
  return all
    .filter((d) => (d.endDate ?? d.startDate) >= todayIso)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

/* ------------------------------ Members ------------------------------ */

export async function getMembers(): Promise<Member[]> {
  const m = await safeGet<Member[]>(KEYS.members, DEFAULT_MEMBERS);
  return [...m].sort((a, b) => a.order - b.order);
}

export async function setMembers(members: Member[]): Promise<void> {
  await safeSet(KEYS.members, members);
}

/* ------------------------------ Videos ------------------------------- */

export async function getVideos(): Promise<VideoItem[]> {
  const v = await safeGet<VideoItem[]>(KEYS.videos, DEFAULT_VIDEOS);
  return [...v].sort((a, b) => a.order - b.order);
}

export async function setVideos(videos: VideoItem[]): Promise<void> {
  await safeSet(KEYS.videos, videos);
}

/* -------------------------------- Music ------------------------------ */

export async function getMusic(): Promise<MusicLinks> {
  return safeGet<MusicLinks>(KEYS.music, DEFAULT_MUSIC);
}

export async function setMusic(music: MusicLinks): Promise<void> {
  await safeSet(KEYS.music, music);
}

/* ------------------------------ Settings ----------------------------- */

export async function getSettings(): Promise<SiteSettings> {
  return safeGet<SiteSettings>(KEYS.settings, DEFAULT_SETTINGS);
}

export async function setSettings(settings: SiteSettings): Promise<void> {
  await safeSet(KEYS.settings, settings);
}

/* --------------------------- Admin emails ---------------------------- */

export async function getAdminEmails(): Promise<string[]> {
  if (!kvConfigured()) {
    return fallbackAdminEmails();
  }
  try {
    const list = await kv.get<string[]>(KEYS.adminEmails);
    if (Array.isArray(list) && list.length > 0) return list;
  } catch {
    /* fall through */
  }
  return fallbackAdminEmails();
}

function fallbackAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function isAdminEmail(email: string | null | undefined): Promise<boolean> {
  if (!email) return false;
  const list = await getAdminEmails();
  return list.includes(email.toLowerCase());
}

export async function addAdminEmail(email: string): Promise<string[]> {
  const e = email.trim().toLowerCase();
  if (!e) throw new Error("Empty email");
  const current = await getAdminEmails();
  if (current.includes(e)) return current;
  const next = [...current, e];
  await safeSet(KEYS.adminEmails, next);
  return next;
}

export async function removeAdminEmail(email: string): Promise<string[]> {
  const e = email.trim().toLowerCase();
  const current = await getAdminEmails();
  const next = current.filter((x) => x !== e);
  await safeSet(KEYS.adminEmails, next);
  return next;
}
