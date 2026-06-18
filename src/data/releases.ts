import { Release } from "@/types";

export const releases: Release[] = [
  {
    id: "space-again",
    title: "SPACE AGAIN",
    date: "2026.06.12",
    mood: "void",
    cover: "/art/cosmic-skull.png",
    featured: true,
    description:
      "A cosmic transmission through ice-blue frequencies. The dimension opens again.",
    links: {
      spotify: "https://open.spotify.com/track/33lIqtMbL0lJX32hufS1Mg",
      apple: "https://music.apple.com/us/song/space-again/6778762143",
    },
  },
  {
    id: "blood-rain",
    title: "BLOOD RAIN",
    date: "2026.01.03",
    mood: "rage",
    cover: "/art/blood-rain.png",
    description:
      "Crimson distortion bleeding through the veil. Raw emotion torn open like reality itself.",
    links: {
      spotify: "https://open.spotify.com/track/4A9j5TJQ5TIzfu5YOj6WzF",
      apple: "https://music.apple.com/us/album/blood-rain-single/1866195940",
    },
    gridClass: "col-span-2 row-span-2 md:col-span-2",
  },
  {
    id: "until-the-trumpet-sings",
    title: "UNTIL THE TRUMPET SINGS",
    date: "2026.04.30",
    mood: "distortion",
    cover: "/art/mally-reality.png",
    description:
      "A signal waiting to break through. Suspended between worlds until the sound arrives.",
    links: {
      spotify: "https://open.spotify.com/track/7KrsoeyKFRONBwkMMIBScK",
      apple: "https://music.apple.com/us/song/until-the-trumpet-sings/6764095245",
    },
    gridClass: "col-span-2 row-span-2 md:col-span-2",
  },
];

export const featuredRelease = releases.find((r) => r.featured) ?? releases[0];
export const galleryReleases = releases.filter((r) => !r.featured);

export const recentTracks = [...galleryReleases].sort(
  (a, b) => new Date(b.date.replace(/\./g, "-")).getTime() - new Date(a.date.replace(/\./g, "-")).getTime(),
);
