"use client";

import { useEffect, useState } from "react";

export default function CornerDistortion() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const threshold = 80;
      const nearCorner =
        e.clientX < threshold ||
        e.clientX > window.innerWidth - threshold ||
        e.clientY < threshold ||
        e.clientY > window.innerHeight - threshold;
      setVisible(nearCorner);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      <div
        className={`corner-distort corner-distort--tl ${visible ? "visible" : ""}`}
        aria-hidden="true"
      />
      <div
        className={`corner-distort corner-distort--tr ${visible ? "visible" : ""}`}
        aria-hidden="true"
      />
      <div
        className={`corner-distort corner-distort--bl ${visible ? "visible" : ""}`}
        aria-hidden="true"
      />
      <div
        className={`corner-distort corner-distort--br ${visible ? "visible" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}
