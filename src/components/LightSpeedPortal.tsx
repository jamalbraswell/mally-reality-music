"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { lightSpeed, hasLightSpeedVideo } from "@/data/light-speed";
import { moodColors } from "@/lib/mood";
import GlitchText from "./GlitchText";
import StreamingIcon from "./StreamingIcon";

function getYoutubeEmbedUrl(id: string, autoplay: boolean) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export default function LightSpeedPortal() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mood = moodColors.pulse;

  const playWithSound = useCallback(async () => {
    if (!hasLightSpeedVideo) return;

    setIsLoading(true);

    if (lightSpeed.youtubeId) {
      setIsPlaying(true);
      setIsLoading(false);
      return;
    }

    const video = videoRef.current;
    if (!video) {
      setIsLoading(false);
      return;
    }

    video.muted = false;
    video.volume = 1;

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      video.muted = true;
      try {
        await video.play();
        video.muted = false;
        video.volume = 1;
        setIsPlaying(true);
      } catch {
        /* playback blocked */
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const pauseVideo = useCallback(() => {
    if (lightSpeed.youtubeId) {
      setIsPlaying(false);
      return;
    }
    videoRef.current?.pause();
    setIsPlaying(false);
  }, []);

  return (
    <section className="relative px-4 py-3 md:px-6 md:py-12">
      <div className="mx-auto max-w-lg md:max-w-3xl">
        <div className="mb-2 text-center md:mb-6">
          <p className="tracking-impact text-[10px] uppercase text-[#facc15]/80">
            Out Now
          </p>
        </div>

        <div className="chrome-border overflow-hidden rounded-2xl">
          <div className="relative aspect-[16/9] max-h-[180px] w-full overflow-hidden bg-void md:max-h-none">
            <Image
              src={lightSpeed.poster}
              alt={lightSpeed.title}
              fill
              className={`object-cover transition-opacity duration-700 ${
                isPlaying ? "opacity-30" : "opacity-80"
              }`}
              sizes="(max-width: 768px) 100vw, 1152px"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />

            {lightSpeed.videoSrc && (
              <video
                ref={videoRef}
                src={lightSpeed.videoSrc}
                poster={lightSpeed.poster}
                playsInline
                loop
                preload="auto"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
            )}

            {lightSpeed.youtubeId && isPlaying && (
              <iframe
                src={getYoutubeEmbedUrl(lightSpeed.youtubeId, true)}
                title={lightSpeed.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            )}

            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 md:gap-4"
                >
                  <span
                    className="rounded-full px-3 py-1 text-[9px] uppercase tracking-luxury md:text-xs"
                    style={{
                      background: mood.bg,
                      color: mood.text,
                      boxShadow: `0 0 30px ${mood.glow}`,
                    }}
                  >
                    out now
                  </span>

                  <GlitchText
                    as="h3"
                    hover
                    className="text-center text-2xl font-bold uppercase tracking-impact text-white md:text-5xl text-glow-cyan"
                  >
                    {lightSpeed.title}
                  </GlitchText>

                  {hasLightSpeedVideo ? (
                    <button
                      onClick={playWithSound}
                      disabled={isLoading}
                      className="vibrate-hover chromatic-hover mt-1 rounded-full px-6 py-2.5 text-[10px] uppercase tracking-luxury glass-panel text-cyan-neon disabled:opacity-60 md:px-8 md:py-3 md:text-xs"
                    >
                      {isLoading ? "Loading..." : "▶ Play With Sound"}
                    </button>
                  ) : (
                    <div className="mt-2 flex gap-2">
                      {lightSpeed.links.spotify && (
                        <StreamingIcon platform="spotify" href={lightSpeed.links.spotify} size="md" />
                      )}
                      {lightSpeed.links.apple && (
                        <StreamingIcon platform="apple" href={lightSpeed.links.apple} size="md" />
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {isPlaying && (
              <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                <button
                  onClick={pauseVideo}
                  className="rounded-full px-4 py-2 text-xs uppercase tracking-luxury glass-panel text-white/70 transition-colors hover:text-white"
                >
                  Pause
                </button>
              </div>
            )}

            <div
              className="pointer-events-none absolute -inset-1 rounded-3xl opacity-40 blur-2xl transition-opacity"
              style={{
                background: mood.glow,
                opacity: isPlaying ? 0.6 : 0.25,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
