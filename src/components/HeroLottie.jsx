import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

/**
 * HeroLottie
 * - Loads /assets/hero-super-lottie.json via lottie-web
 * - Respects prefers-reduced-motion by pausing autoplay
 * - Accepts className prop for styling
 */
export default function HeroLottie({ className = "" }) {
  const containerRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: !prefersReduced,
      path: "/assets/hero-super-lottie.json"
    });

    // subtle initial speed for a lively feel
    animRef.current.setSpeed(1.0);

    return () => {
      try {
        animRef.current?.destroy();
      } catch {}
      animRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      role="img"
      aria-label="Superhero animation"
      style={{ width: "260px", height: "260px", display: "block", margin: "0 auto" }}
    />
  );
}
