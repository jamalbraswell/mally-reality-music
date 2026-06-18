"use client";

import { motion } from "framer-motion";

export default function FloatingOrb() {
  return (
    <div className="float-orb relative mx-auto h-48 w-48 md:h-64 md:w-64" style={{ perspective: "800px" }}>
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(0,240,255,0.3), rgba(255,0,170,0.2), rgba(139,92,246,0.3), rgba(0,240,255,0.3))",
          filter: "blur(1px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Glass core */}
      <div
        className="absolute inset-4 rounded-full glass-panel"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(0,240,255,0.05) 50%, transparent 70%)",
          boxShadow:
            "inset 0 0 40px rgba(0,240,255,0.1), 0 0 60px rgba(0,240,255,0.15), 0 0 100px rgba(255,0,170,0.08)",
        }}
      />

      {/* Vinyl grooves */}
      <div className="absolute inset-8 rounded-full overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/5"
            style={{
              inset: `${i * 6}px`,
            }}
          />
        ))}
      </div>

      {/* Center holographic cube illusion */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotateY: [0, 180, 360],
          rotateX: [0, 15, 0, -15, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="h-full w-full rounded-sm"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,240,255,0.6), rgba(255,0,170,0.4), rgba(139,92,246,0.5))",
            boxShadow: "0 0 30px rgba(0,240,255,0.5)",
          }}
        />
      </motion.div>

      {/* Orbital particles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-neon"
          style={{
            left: "50%",
            top: "50%",
            boxShadow: "0 0 10px rgba(0,240,255,0.8)",
          }}
          animate={{
            x: [0, Math.cos((i * 2 * Math.PI) / 3) * 90, 0],
            y: [0, Math.sin((i * 2 * Math.PI) / 3) * 90, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
