"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";

export default function HeroPortal() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Ambient art layers */}
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
        transition={{ duration: 2, delay: 0.3 }}
        className="relative mb-10"
      >
        <div className="float-orb relative h-52 w-52 md:h-72 md:w-72">
          <div
            className="absolute -inset-8 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(0,240,255,0.3), rgba(255,0,170,0.2), transparent 70%)",
            }}
          />
          <Image
            src="/art/cosmic-skull.png"
            alt="Mally Reality cosmic portal"
            fill
            className="object-contain drop-shadow-[0_0_40px_rgba(0,240,255,0.3)]"
            priority
            sizes="(max-width: 768px) 208px, 288px"
          />
        </div>
      </motion.div>

      <div className="relative z-10 text-center">
        <GlitchText
          as="h1"
          reveal
          className="text-5xl font-bold uppercase tracking-impact text-white md:text-8xl lg:text-9xl text-glow-cyan"
        >
          MALLY REALITY
        </GlitchText>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 font-[family-name:var(--font-cormorant)] text-xl italic text-chrome/70 md:text-2xl"
        >
          Sound is not music. It&apos;s a reality shift.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-neon/50" />
          <span className="tracking-luxury text-xs uppercase text-cyan-neon/60">
            Enter The Sound
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-magenta-neon/50" />
        </motion.div>
      </div>

      {/* Artist artifact — bottom corner */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1.2 }}
        className="pointer-events-none absolute bottom-24 right-6 hidden w-32 overflow-hidden rounded-xl opacity-40 md:block lg:right-12 lg:w-40"
      >
        <div className="chrome-border aspect-[3/4] overflow-hidden rounded-xl">
          <Image
            src="/art/mally-reality.png"
            alt="Mally Reality"
            width={160}
            height={213}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="tracking-luxury text-[10px] uppercase text-white/30">Descend</span>
          <div className="h-8 w-px bg-gradient-to-b from-cyan-neon/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
