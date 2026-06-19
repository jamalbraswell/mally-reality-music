import { StreamingLinks } from "@/types";

export interface LightSpeedConfig {
  title: string;
  date: string;
  description: string;
  poster: string;
  videoSrc?: string;
  youtubeId?: string;
  links: StreamingLinks;
}

export const lightSpeed: LightSpeedConfig = {
  title: "LIGHT SPEED",
  date: "2026.06.19",
  description:
    "Velocity beyond sound. A reality rupture — out now on all platforms.",
  poster: "/art/light-speed.png",
  videoSrc: undefined,
  youtubeId: undefined,
  links: {
    spotify: "https://open.spotify.com/track/2JUOc4c5ddkMKzyBW7NO1c",
    apple: "https://music.apple.com/us/song/light-speed/6781392114",
  },
};

export const hasLightSpeedVideo = Boolean(lightSpeed.videoSrc || lightSpeed.youtubeId);
export const isLightSpeedLive = Boolean(lightSpeed.links.spotify || lightSpeed.links.apple);
