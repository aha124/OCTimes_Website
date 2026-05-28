import type { Member, MusicLinks, SiteSettings, TourDate, VideoItem } from "./types";

export const DEFAULT_MEMBERS: Member[] = [
  {
    id: "tenor",
    name: "Tenor",
    part: "Tenor",
    bio: "Bio coming soon.",
    order: 0,
  },
  {
    id: "lead",
    name: "Lead",
    part: "Lead",
    bio: "Bio coming soon.",
    order: 1,
  },
  {
    id: "baritone",
    name: "Baritone",
    part: "Baritone",
    bio: "Bio coming soon.",
    order: 2,
  },
  {
    id: "bass",
    name: "Bass",
    part: "Bass",
    bio: "Bio coming soon.",
    order: 3,
  },
];

export const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: "sold",
    youtubeId: "dQw4w9WgXcQ",
    title: "Sold (The Grundy County Auction Incident)",
    description: "Replace this YouTube ID in the admin.",
    order: 0,
  },
  {
    id: "wagon-wheel",
    youtubeId: "dQw4w9WgXcQ",
    title: "Wagon Wheel",
    description: "Replace this YouTube ID in the admin.",
    order: 1,
  },
  {
    id: "wonderful-world",
    youtubeId: "dQw4w9WgXcQ",
    title: "What A Wonderful World",
    description: "Replace this YouTube ID in the admin.",
    order: 2,
  },
  {
    id: "show-weekend",
    youtubeId: "dQw4w9WgXcQ",
    title: "A Show Weekend",
    description: "Replace this YouTube ID in the admin.",
    order: 3,
  },
];

export const DEFAULT_TOUR: TourDate[] = [
  {
    id: "qced-2026",
    startDate: "2026-02-25",
    endDate: "2026-03-01",
    title: "Evergreen District QCED Coaching Event & Show",
    city: "Anacortes, WA",
  },
  {
    id: "flathead-2026",
    startDate: "2026-05-13",
    endDate: "2026-05-15",
    title: "Flathead Valley Aires / AIC Youth Festival",
    city: "Kalispell, MT",
  },
  {
    id: "bhs-2026",
    startDate: "2026-06-30",
    endDate: "2026-07-04",
    title: "BHS International Convention",
    city: "St. Louis, MO",
  },
  {
    id: "fwd-2026",
    startDate: "2026-10-06",
    endDate: "2026-10-10",
    title: "Far Western District / Pan-Pacific Convention",
    city: "Honolulu, HI",
  },
];

export const DEFAULT_MUSIC: MusicLinks = {
  spotifyArtistUrl: "https://open.spotify.com/artist/0OCTimesPlaceholder",
  appleMusicUrl: "https://music.apple.com/us/artist/oc-times",
  youtubeUrl: "https://www.youtube.com/@OCTimesQuartet",
  catalogNote:
    "Our album The Road is still floating around out there. If you find a copy, give it a spin and remember when CDs were a thing.",
};

export const DEFAULT_SETTINGS: SiteSettings = {
  contactEmail: "booking@octimesquartet.com",
};
