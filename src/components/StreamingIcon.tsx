import { StreamingLinks } from "@/types";
import { streamingIcons } from "@/lib/platform-icons";

interface StreamingIconProps {
  platform: keyof StreamingLinks;
  href: string;
  size?: "sm" | "md" | "lg";
}

const containerSizes = {
  sm: "h-9 w-9",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export default function StreamingIcon({ platform, href, size = "md" }: StreamingIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`icon-glow vibrate-hover chrome-border flex shrink-0 items-center justify-center rounded-lg glass-panel text-chrome/70 transition-colors hover:text-cyan-neon ${containerSizes[size]}`}
      aria-label={`Listen on ${platform}`}
    >
      <span className={iconSizes[size]}>{streamingIcons[platform]}</span>
    </a>
  );
}
