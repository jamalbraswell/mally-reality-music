import { MoodTag } from "@/types";

export const moodColors: Record<MoodTag, { bg: string; text: string; glow: string }> = {
  dream: {
    bg: "rgba(147, 197, 253, 0.15)",
    text: "#93c5fd",
    glow: "rgba(147, 197, 253, 0.5)",
  },
  rage: {
    bg: "rgba(248, 113, 113, 0.15)",
    text: "#f87171",
    glow: "rgba(248, 113, 113, 0.5)",
  },
  love: {
    bg: "rgba(244, 114, 182, 0.15)",
    text: "#f472b6",
    glow: "rgba(244, 114, 182, 0.5)",
  },
  distortion: {
    bg: "rgba(167, 139, 250, 0.15)",
    text: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.6)",
  },
  void: {
    bg: "rgba(34, 211, 238, 0.12)",
    text: "#22d3ee",
    glow: "rgba(34, 211, 238, 0.5)",
  },
  pulse: {
    bg: "rgba(250, 204, 21, 0.12)",
    text: "#facc15",
    glow: "rgba(250, 204, 21, 0.5)",
  },
};
