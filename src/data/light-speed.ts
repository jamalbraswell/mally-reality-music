import { StreamingLinks } from "@/types";

export interface LightSpeedConfig {
  title: string;
  date: string;
  description: string;
  poster: string;
  /** Direct MP4/WebM URL or path like /video/light-speed.mp4 */
  videoSrc?: string;
  /** YouTube video ID (e.g. from youtube.com/watch?v=ID) */
  youtubeId?: string;
  links?: StreamingLinks;
}

// Update videoSrc or youtubeId when the drop goes live tomorrow.
export const lightSpeed: LightSpeedConfig = {
  title: "LIGHT SPEED",
  date: "2026.06.19",
  description:
    "Velocity beyond sound. A reality rupture captured on film — play it loud.",
  poster: "/art/wireframe-dimension.png",
  videoSrc: undefined,
  youtubeId: undefined,
  links: {},
};

export const hasLightSpeedVideo = Boolean(lightSpeed.videoSrc || lightSpeed.youtubeId);
