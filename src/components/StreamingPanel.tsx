"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Release } from "@/types";
import { moodColors } from "@/lib/mood";
import StreamingIcon from "./StreamingIcon";
import GlitchText from "./GlitchText";

interface StreamingPanelProps {
  release: Release | null;
  onClose: () => void;
}

export default function StreamingPanel({ release, onClose }: StreamingPanelProps) {
  const mood = release ? moodColors[release.mood] : null;

  return (
    <AnimatePresence>
      {release && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-void/80 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-x-4 top-1/2 z-[101] mx-auto max-w-2xl -translate-y-1/2 md:inset-x-auto"
          >
            <div className="chrome-border overflow-hidden rounded-2xl glass-panel">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={release.cover}
                  alt={release.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, rgba(3,3,8,0.9) 0%, transparent 60%)`,
                  }}
                />
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full glass-panel text-white/60 transition-colors hover:text-white"
                  aria-label="Close panel"
                >
                  ✕
                </button>
              </div>

              <div className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="rounded-full px-3 py-1 text-xs uppercase tracking-luxury"
                    style={{
                      background: mood?.bg,
                      color: mood?.text,
                      boxShadow: `0 0 20px ${mood?.glow}`,
                    }}
                  >
                    {release.mood}
                  </span>
                  <span className="text-xs text-white/30 tracking-luxury">{release.date}</span>
                </div>

                <GlitchText
                  as="h2"
                  hover
                  className="text-3xl font-bold uppercase tracking-impact text-white md:text-4xl"
                >
                  {release.title}
                </GlitchText>

                {release.description && (
                  <p className="mt-4 font-[family-name:var(--font-cormorant)] text-lg italic text-chrome/60">
                    {release.description}
                  </p>
                )}

                <div className="mt-8">
                  <p className="mb-4 tracking-luxury text-xs uppercase text-cyan-neon/50">
                    Stream Now
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {release.links.spotify && (
                      <StreamingIcon platform="spotify" href={release.links.spotify} size="lg" />
                    )}
                    {release.links.apple && (
                      <StreamingIcon platform="apple" href={release.links.apple} size="lg" />
                    )}
                    {release.links.youtube && (
                      <StreamingIcon platform="youtube" href={release.links.youtube} size="lg" />
                    )}
                    {release.links.soundcloud && (
                      <StreamingIcon platform="soundcloud" href={release.links.soundcloud} size="lg" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
