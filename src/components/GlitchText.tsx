"use client";

import { motion } from "framer-motion";

interface GlitchTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  reveal?: boolean;
  hover?: boolean;
}

export default function GlitchText({
  children,
  as: Tag = "span",
  className = "",
  reveal = false,
  hover = false,
}: GlitchTextProps) {
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={`${reveal ? "glitch-reveal" : ""} ${hover ? "glitch-hover" : ""} ${className}`}
      initial={reveal ? { opacity: 0 } : undefined}
    >
      {children}
    </MotionTag>
  );
}
