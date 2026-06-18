"use client";

import { motion } from "framer-motion";
import { Release } from "@/types";
import ReleaseCard from "./ReleaseCard";
import GlitchText from "./GlitchText";

interface ReleaseGalleryProps {
  releases: Release[];
  onOpen: (release: Release) => void;
}

export default function ReleaseGallery({ releases, onOpen }: ReleaseGalleryProps) {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <GlitchText
            as="p"
            hover
            className="tracking-impact text-xs uppercase text-violet-neon/70"
          >
            Reality Shift
          </GlitchText>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-luxury text-white md:text-5xl">
            All Drops
          </h2>
          <p className="mx-auto mt-4 max-w-md font-[family-name:var(--font-cormorant)] text-lg italic text-chrome/40">
            Each release is a visual artifact — a fragment of the dimension.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl auto-rows-[240px] grid-cols-2 gap-4 md:gap-8 md:auto-rows-[280px]">
          {releases.map((release, index) => (
            <ReleaseCard
              key={release.id}
              release={release}
              index={index}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
