"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { lightSpeed, hasLightSpeedVideo } from "@/data/light-speed";
import { moodColors } from "@/lib/mood";
import GlitchText from "./GlitchText";

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
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <GlitchText
            as="p"
            hover
            className="tracking-impact text-xs uppercase text-[#facc15]/80"
          >
            Incoming Drop
          </GlitchText>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-3xl italic text-chrome/50 md:text-4xl">
            Visual Transmission
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="chrome-border overflow-hidden rounded-3xl"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-void">
            {/* Poster layer */}
            <Image
              src={lightSpeed.poster}
              alt={lightSpeed.title}
              fill
              className={`object-cover transition-opacity duration-700 ${
                isPlaying ? "opacity-30" : "opacity-60"
              }`}
              sizes="(max-width: 768px) 100vw, 1152px"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />

            {/* Native video */}
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

            {/* YouTube embed */}
            {lightSpeed.youtubeId && isPlaying && (
              <iframe
                src={getYoutubeEmbedUrl(lightSpeed.youtubeId, true)}
                title={lightSpeed.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            )}

            {/* Overlay UI */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6"
                >
                  <span
                    className="rounded-full px-4 py-1.5 text-xs uppercase tracking-luxury"
                    style={{
                      background: mood.bg,
                      color: mood.text,
                      boxShadow: `0 0 30px ${mood.glow}`,
                    }}
                  >
                    {hasLightSpeedVideo ? "new drop" : "drops tomorrow"}
                  </span>

                  <GlitchText
                    as="h3"
                    hover
                    className="text-center text-4xl font-bold uppercase tracking-impact text-white md:text-7xl text-glow-cyan"
                  >
                    {lightSpeed.title}
                  </GlitchText>

                  <p className="max-w-md text-center font-[family-name:var(--font-cormorant)] text-lg italic text-chrome/60">
                    {lightSpeed.description}
                  </p>

                  {hasLightSpeedVideo ? (
                    <button
                      onClick={playWithSound}
                      disabled={isLoading}
                      className="vibrate-hover chromatic-hover group relative mt-2 overflow-hidden rounded-full px-10 py-4 glass-panel transition-transform hover:scale-105 disabled:opacity-60"
                    >
                      <span className="relative z-10 flex items-center gap-3 text-sm font-medium uppercase tracking-luxury text-cyan-neon">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-neon/20 text-lg">
                          ▶
                        </span>
                        {isLoading ? "Loading..." : "Play With Sound"}
                      </span>
                      <div
                        className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(255,0,170,0.1))",
                        }}
                      />
                    </button>
                  ) : (
                    <p className="tracking-luxury text-xs uppercase text-white/40">
                      Video link loading — check back {lightSpeed.date}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Playing controls */}
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

            {/* Glow ring */}
            <div
              className="pointer-events-none absolute -inset-1 rounded-3xl opacity-40 blur-2xl transition-opacity"
              style={{
                background: mood.glow,
                opacity: isPlaying ? 0.6 : 0.25,
              }}
            />
          </div>

          <div className="glass-panel flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center md:p-8">
            <div>
              <p className="tracking-luxury text-[10px] uppercase text-white/30">
                {lightSpeed.date}
              </p>
              <p className="mt-1 text-sm text-chrome/50">
                {hasLightSpeedVideo
                  ? "Tap play — audio on. Turn it up."
                  : "Send the video link tomorrow and it goes live instantly."}
              </p>
            </div>
            <span className="tracking-impact text-[10px] uppercase text-magenta-neon/50">
              Reality Shift
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
