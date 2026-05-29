import type { Member, MusicLinks, SiteSettings, TourDate, VideoItem } from "./types";

export const DEFAULT_MEMBERS: Member[] = [
  {
    id: "tenor",
    name: "Shawn York",
    part: "Tenor",
    bio: "Shawn sings the high stuff, the part that floats over the top of the chord and makes the hair on your arms stand up. Two decades in, he's still chasing that one perfect ring with the same three guys he started with.",
    order: 0,
  },
  {
    id: "lead",
    name: "Sean Devine",
    part: "Lead",
    bio: "Sean carries the melody, which means he's usually the one telling the story while the other three paint around him. He's the voice you'll find yourself humming on the drive home.",
    order: 1,
  },
  {
    id: "baritone",
    name: "Pat Claypool",
    part: "Baritone",
    bio: "Pat sings baritone, the part nobody can hum but every quartet lives or dies by, the notes that turn three voices into a full chord. He's the glue you don't notice until it's gone.",
    order: 2,
  },
  {
    id: "bass",
    name: "Cory Hunt",
    part: "Bass",
    bio: "Cory anchors the whole thing from the bottom, the foundation the other three stand on. Big sound, bigger laugh, and the guy most likely to suggest the detour that becomes the best part of the trip.",
    order: 3,
  },
];

export const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: "sold",
    youtubeId: "KI11qdPmElY",
    title: "Sold (The Grundy County Auction Incident)",
    order: 0,
  },
  {
    id: "wagon-wheel",
    youtubeId: "xYB9c45ArKU",
    title: "Wagon Wheel",
    order: 1,
  },
  {
    id: "wonderful-world",
    youtubeId: "PB_BXHiYgCc",
    title: "What A Wonderful World",
    order: 2,
  },
  {
    id: "show-weekend",
    youtubeId: "Rutu7swXWkU",
    title: "A Show Weekend",
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
