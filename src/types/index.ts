export type MoodTag = "dream" | "rage" | "love" | "distortion" | "void" | "pulse";

export interface StreamingLinks {
  spotify?: string;
  apple?: string;
  youtube?: string;
  soundcloud?: string;
}

export interface Release {
  id: string;
  title: string;
  date: string;
  mood: MoodTag;
  cover: string;
  featured?: boolean;
  showInPromo?: boolean;
  promoBadge?: string;
  promoStatus?: string;
  description?: string;
  links: StreamingLinks;
  videoSrc?: string;
  youtubeId?: string;
  gridClass?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: "spotify" | "apple" | "youtube" | "tiktok" | "instagram";
}
