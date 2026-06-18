"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Release } from "@/types";
import { moodColors } from "@/lib/mood";
import StreamingIcon from "./StreamingIcon";

interface ReleaseCardProps {
  release: Release;
  index: number;
  onOpen: (release: Release) => void;
}

export default function ReleaseCard({ release, index, onOpen }: ReleaseCardProps) {
  const mood = moodColors[release.mood];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative ${release.gridClass ?? ""}`}
    >
      <div className="chrome-border h-full overflow-hidden rounded-2xl holographic-shimmer glitch-tear">
        <div className="relative h-full min-h-[280px] overflow-hidden">
          <Image
            src={release.cover}
            alt={release.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]"
            sizes="(max-width: 768px) 100vw, 400px"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />

          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at 50% 80%, ${mood.glow}, transparent 70%)`,
            }}
          />

          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <span
              className="mb-2 w-fit rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-luxury"
              style={{ background: mood.bg, color: mood.text }}
            >
              {release.mood}
            </span>

            <button
              onClick={() => onOpen(release)}
              className="text-left vibrate-hover"
            >
              <h3 className="text-xl font-bold uppercase tracking-luxury text-white transition-colors group-hover:text-glow-cyan md:text-2xl">
                {release.title}
              </h3>
            </button>

            <p className="mt-1 text-[10px] tracking-luxury text-white/40">{release.date}</p>

            <div className="mt-4 flex gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
              {release.links.spotify && (
                <StreamingIcon platform="spotify" href={release.links.spotify} size="sm" />
              )}
              {release.links.apple && (
                <StreamingIcon platform="apple" href={release.links.apple} size="sm" />
              )}
              {release.links.youtube && (
                <StreamingIcon platform="youtube" href={release.links.youtube} size="sm" />
              )}
              {release.links.soundcloud && (
                <StreamingIcon platform="soundcloud" href={release.links.soundcloud} size="sm" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
