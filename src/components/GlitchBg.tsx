"use client";

import { useEffect, useRef, useState } from "react";

export function GlitchBg() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    function sync() {
      setReduceMotion(mq.matches);
    }
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;
    el.play().catch(() => {
      /* autoplay may be blocked; poster still shows */
    });
  }, [reduceMotion]);

  return (
    <div className="glitch-bg" aria-hidden="true">
      {!reduceMotion ? (
        <video
          ref={videoRef}
          className="glitch-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/brand/glitch-bg-poster.webp"
        >
          <source src="/brand/glitch-bg.webm" type="video/webm" />
          <source src="/brand/glitch-bg.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div className="glitch-bg-poster" />
      <div className="glitch-bg-veil" />
    </div>
  );
}
