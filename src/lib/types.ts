export type VoicePart = "Tenor" | "Lead" | "Baritone" | "Bass";

export interface TourDate {
  id: string;
  startDate: string;
  endDate?: string;
  title: string;
  venue?: string;
  city: string;
  link?: string;
  note?: string;
}

export interface Member {
  id: string;
  name: string;
  part: VoicePart;
  bio: string;
  photoUrl?: string;
  order: number;
}

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  description?: string;
  order: number;
}

export interface MusicLinks {
  spotifyEmbedUrl?: string;
  spotifyArtistUrl?: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
  catalogNote?: string;
}

export interface SiteSettings {
  heroImageUrl?: string;
  storyImageUrl?: string;
  contactEmail?: string;
}
