import siteData from "../../content/site.json";
import { Release, SocialLink } from "@/types";

export interface HeroContent {
  artistName: string;
  tagline: string;
  ctaText: string;
  logo: string;
  backgroundImage?: string;
}

export interface SiteContent {
  hero: HeroContent;
  releases: Release[];
  social: SocialLink[];
}

export const siteContent = siteData as SiteContent;

export const hero = siteContent.hero;
export const releases = siteContent.releases;
export const socialLinks = siteContent.social;

export const featuredRelease = releases.find((r) => r.featured) ?? releases[0];
export const promoRelease = releases.find((r) => r.showInPromo) ?? featuredRelease;

export const recentTracks = [...releases]
  .filter((r) => !r.featured)
  .sort(
    (a, b) =>
      new Date(b.date.replace(/\./g, "-")).getTime() -
      new Date(a.date.replace(/\./g, "-")).getTime(),
  );

export function hasReleaseVideo(release: Release) {
  return Boolean(release.videoSrc || release.youtubeId);
}
