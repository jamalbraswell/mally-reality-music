"use client";

import Image from "next/image";
import { Release } from "@/types";
import { moodColors } from "@/lib/mood";
import StreamingIcon from "./StreamingIcon";

interface CompactTrackRowProps {
  release: Release;
  onOpen: (release: Release) => void;
  highlight?: boolean;
}

function CompactTrackRow({ release, onOpen, highlight }: CompactTrackRowProps) {
  const mood = moodColors[release.mood];

  return (
    <button
      onClick={() => onOpen(release)}
      className={`chrome-border flex w-full items-center gap-3 rounded-xl p-3 text-left glass-panel transition-colors hover:border-cyan-neon/30 ${
        highlight ? "holographic-shimmer" : ""
      }`}
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={release.cover}
          alt={release.title}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>

      <div className="min-w-0 flex-1">
        {highlight && (
          <span
            className="mb-1 inline-block rounded-full px-2 py-0.5 text-[9px] uppercase tracking-luxury"
            style={{ background: mood.bg, color: mood.text }}
          >
            Latest
          </span>
        )}
        <p className="truncate text-sm font-bold uppercase tracking-luxury text-white">
          {release.title}
        </p>
        <p className="text-[10px] tracking-luxury text-white/40">{release.date}</p>
      </div>

      <div className="flex shrink-0 gap-1.5" onClick={(e) => e.stopPropagation()}>
        {release.links.spotify && (
          <StreamingIcon platform="spotify" href={release.links.spotify} size="sm" />
        )}
        {release.links.apple && (
          <StreamingIcon platform="apple" href={release.links.apple} size="sm" />
        )}
      </div>
    </button>
  );
}

interface CompactReleasesProps {
  latest: Release;
  recent: Release[];
  onOpen: (release: Release) => void;
}

export default function CompactReleases({ latest, recent, onOpen }: CompactReleasesProps) {
  return (
    <section className="px-4 pb-8 pt-2 md:px-6">
      <div className="mx-auto max-w-lg space-y-4">
        <div>
          <p className="mb-2 tracking-impact text-[10px] uppercase text-magenta-neon/70">
            Latest Release
          </p>
          <CompactTrackRow release={latest} onOpen={onOpen} highlight />
        </div>

        {recent.length > 0 && (
          <div>
            <p className="mb-2 tracking-impact text-[10px] uppercase text-violet-neon/70">
              Recent Tracks
            </p>
            <div className="space-y-2">
              {recent.map((release) => (
                <CompactTrackRow key={release.id} release={release} onOpen={onOpen} />
              ))}
            </div>
          </div>
        )}

        <footer className="border-t border-white/5 pt-6 text-center">
          <p className="font-[family-name:var(--font-cormorant)] text-xs italic text-chrome/30">
            © 2026 Mally Reality
          </p>
        </footer>
      </div>
    </section>
  );
}
