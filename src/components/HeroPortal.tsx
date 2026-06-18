"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";
import PlatformIcons from "./PlatformIcons";

export default function HeroPortal() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-4 pb-4 pt-8 md:min-h-[70vh] md:justify-center md:px-6 md:pb-8 md:pt-16">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/art/wireframe-dimension.png"
          alt=""
          fill
          className="object-cover opacity-[0.12] mix-blend-screen"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="relative mb-5 md:mb-10"
      >
        <div className="float-orb relative h-28 w-28 md:h-56 md:w-56">
          <div
            className="absolute -inset-6 rounded-full opacity-40 blur-3xl md:-inset-8"
            style={{
              background:
                "radial-gradient(circle, rgba(0,240,255,0.3), rgba(255,0,170,0.2), transparent 70%)",
            }}
          />
          <Image
            src="/art/light-speed.png"
            alt="Mally Reality — Light Speed"
            fill
            className="object-cover rounded-full drop-shadow-[0_0_40px_rgba(0,240,255,0.3)]"
            priority
            sizes="(max-width: 768px) 112px, 224px"
          />
        </div>
      </motion.div>

      <div className="relative z-10 text-center">
        <GlitchText
          as="h1"
          reveal
          className="text-4xl font-bold uppercase tracking-impact text-white md:text-7xl lg:text-8xl text-glow-cyan"
        >
          MALLY REALITY
        </GlitchText>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-3 font-[family-name:var(--font-cormorant)] text-base italic text-chrome/70 md:mt-6 md:text-xl"
        >
          Sound is not music. It&apos;s a reality shift.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-5 flex items-center justify-center gap-3 md:mt-8 md:gap-4"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-neon/50 md:w-12" />
          <span className="tracking-luxury text-[10px] uppercase text-cyan-neon/60 md:text-xs">
            Enter The Sound
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-magenta-neon/50 md:w-12" />
        </motion.div>

        <PlatformIcons size="sm" />
      </div>
    </section>
  );
}
