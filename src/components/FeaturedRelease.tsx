"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Release } from "@/types";
import { moodColors } from "@/lib/mood";
import GlitchText from "./GlitchText";

interface FeaturedReleaseProps {
  release: Release;
  onOpen: (release: Release) => void;
}

export default function FeaturedRelease({ release, onOpen }: FeaturedReleaseProps) {
  const mood = moodColors[release.mood];

  return (
    <section className="relative px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="mx-auto max-w-6xl"
      >
        <div className="mb-12 text-center">
          <GlitchText
            as="p"
            hover
            className="tracking-impact text-xs uppercase text-magenta-neon/70"
          >
            New Drop
          </GlitchText>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-3xl italic text-chrome/50 md:text-4xl">
            Latest Transmission
          </h2>
        </div>

        <motion.button
          onClick={() => onOpen(release)}
          className="group relative mx-auto block w-full max-w-4xl text-left chromatic-hover"
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.4 }}
        >
          <div className="chrome-border overflow-hidden rounded-3xl holographic-shimmer">
            <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]">
              <Image
                src={release.cover}
                alt={release.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />

              {/* Chromatic overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,240,255,0.1) 0%, transparent 50%, rgba(255,0,170,0.1) 100%)",
                }}
              />

              {/* Glow expansion on hover */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: mood.glow }}
              />
            </div>

            <div className="glass-panel p-8 md:p-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <span
                    className="inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-luxury"
                    style={{
                      background: mood.bg,
                      color: mood.text,
                      boxShadow: `0 0 30px ${mood.glow}`,
                    }}
                  >
                    {release.mood}
                  </span>

                  <GlitchText
                    as="h3"
                    hover
                    className="mt-4 text-4xl font-bold uppercase tracking-impact text-white md:text-6xl text-glow-cyan"
                  >
                    {release.title}
                  </GlitchText>

                  {release.description && (
                    <p className="mt-4 max-w-lg font-[family-name:var(--font-cormorant)] text-lg italic text-chrome/50">
                      {release.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start md:items-end">
                  <span className="tracking-luxury text-xs text-white/30">{release.date}</span>
                  <motion.span
                    className="mt-4 flex items-center gap-2 text-sm uppercase tracking-luxury text-cyan-neon/80"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Enter Release
                    <span className="text-lg">→</span>
                  </motion.span>
                </div>
              </div>
            </div>
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}
