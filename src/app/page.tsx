"use client";

import { useState, useEffect } from "react";
import { Release } from "@/types";
import { featuredRelease, galleryReleases } from "@/data/releases";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Scanlines from "@/components/Scanlines";
import CornerDistortion from "@/components/CornerDistortion";
import HeroPortal from "@/components/HeroPortal";
import LightSpeedPortal from "@/components/LightSpeedPortal";
import FeaturedRelease from "@/components/FeaturedRelease";
import ReleaseGallery from "@/components/ReleaseGallery";
import SocialPortal from "@/components/SocialPortal";
import StreamingPanel from "@/components/StreamingPanel";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeRelease, setActiveRelease] = useState<Release | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activeRelease) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeRelease]);

  return (
    <main className="relative min-h-screen">
      <BackgroundCanvas scrollY={scrollY} />
      <Scanlines />
      <CornerDistortion />

      <HeroPortal />
      <LightSpeedPortal />
      <FeaturedRelease release={featuredRelease} onOpen={setActiveRelease} />
      <ReleaseGallery releases={galleryReleases} onOpen={setActiveRelease} />
      <SocialPortal />

      <StreamingPanel release={activeRelease} onClose={() => setActiveRelease(null)} />
    </main>
  );
}
