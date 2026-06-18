"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/data/social";
import { platformIcons } from "@/lib/platform-icons";

interface PlatformIconsProps {
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: "h-10 w-10 [&_svg]:h-4 [&_svg]:w-4",
  md: "h-12 w-12 [&_svg]:h-5 [&_svg]:w-5",
};

export default function PlatformIcons({ size = "md" }: PlatformIconsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      className="mt-6 flex items-center justify-center gap-3"
    >
      {socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={`icon-glow chrome-border flex items-center justify-center rounded-xl glass-panel text-chrome/60 transition-colors hover:text-cyan-neon ${sizeClasses[size]}`}
        >
          {platformIcons[link.icon]}
        </a>
      ))}
    </motion.div>
  );
}
