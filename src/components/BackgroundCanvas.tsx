"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface BackgroundCanvasProps {
  scrollY: number;
}

export default function BackgroundCanvas({ scrollY }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const parallaxX = useTransform(smoothX, [0, 1], [-30, 30]);
  const parallaxY = useTransform(smoothY, [0, 1], [-20, 20]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.005;
      const { width, height } = canvas;

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#030308");
      gradient.addColorStop(0.3, "#0a0a1a");
      gradient.addColorStop(0.6, "#0d0520");
      gradient.addColorStop(1, "#030308");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Liquid chrome blobs
      const blobs = [
        { x: 0.2, y: 0.3, r: 0.35, color: "rgba(0, 240, 255, 0.06)" },
        { x: 0.7, y: 0.6, r: 0.3, color: "rgba(255, 0, 170, 0.05)" },
        { x: 0.5, y: 0.8, r: 0.25, color: "rgba(139, 92, 246, 0.06)" },
        { x: 0.85, y: 0.2, r: 0.2, color: "rgba(165, 243, 252, 0.04)" },
      ];

      blobs.forEach((blob, i) => {
        const offsetX = Math.sin(time + i * 1.5) * 50;
        const offsetY = Math.cos(time * 0.7 + i) * 40;
        const cx = blob.x * width + offsetX;
        const cy = blob.y * height + offsetY;
        const radius = blob.r * Math.min(width, height);

        const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        radial.addColorStop(0, blob.color);
        radial.addColorStop(1, "transparent");

        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, width, height);
      });

      // Digital sky shimmer lines
      ctx.strokeStyle = "rgba(0, 240, 255, 0.02)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const y = (height / 8) * i + Math.sin(time + i) * 20;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + Math.sin(time * 2 + i) * 10);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const gridSkew = scrollY * 0.02;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ x: parallaxX, y: parallaxY }}
      />

      <motion.div
        className="perspective-grid absolute inset-0 opacity-60"
        style={{
          rotateX: gridSkew,
          y: scrollY * 0.1,
        }}
      />

      <div className="reality-pulse absolute inset-0 bg-gradient-to-br from-cyan-neon/5 via-transparent to-magenta-neon/5" />
    </div>
  );
}
