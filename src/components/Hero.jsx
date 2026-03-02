import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Superhero Hero — playful comic style with mask SVG and big CTA
 */
export default function Hero({ name = "You're invited!", dateISO = null, onCelebrate }) {
  const celebrateRef = useRef(null);

  useEffect(() => {
    // small entrance music or animation could be started here
  }, []);

  return (
    <section className="hero premium-hero comic-hero" aria-labelledby="hero-title">
      <motion.div className="hero-inner comic-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="hero-left">
          <h1 id="hero-title" className="headline comic-headline">
            {name.split(" ")[0]}’s <span className="badge">SUPER</span> 4th Birthday!
          </h1>
          <p className="subhead">Wear your cape, bring your smile — superpowers optional but encouraged!</p>

          <div className="hero-actions">
            <a href="#rsvp" className="btn primary huge" aria-label="RSVP now">RSVP — Join the Crew!</a>
            <button
              className="btn ghost"
              ref={celebrateRef}
              onClick={() => onCelebrate && onCelebrate(celebrateRef.current)}
              aria-label="Preview confetti"
            >
              Boom! 🎉
            </button>
          </div>

          <div className="kids-note">Recommended for ages 2–8. Parents welcome!</div>
        </div>

        <div className="hero-right" aria-hidden>
          {/* Fun Superhero Mask SVG with comic outline */}
          <svg viewBox="0 0 220 220" className="mask-svg" width="260" height="260" aria-hidden>
            <defs>
              <linearGradient id="maskG" x1="0" x2="1">
                <stop offset="0" stopColor="#ffd700" />
                <stop offset="1" stopColor="#ff6ec7" />
              </linearGradient>
            </defs>

            <g transform="translate(10,20)">
              <ellipse cx="100" cy="80" rx="88" ry="48" fill="#fff" opacity="0.04"/>
              <path d="M12 70 C40 20, 160 20, 208 70 C160 110, 40 110, 12 70 Z" fill="url(#maskG)" stroke="#000" strokeWidth="4" />
              <circle cx="56" cy="70" r="18" fill="#071229" stroke="#fff" strokeWidth="3" />
              <circle cx="144" cy="70" r="18" fill="#071229" stroke="#fff" strokeWidth="3" />
              {/* star emblem */}
              <polygon points="100,35 110,62 140,62 116,78 126,105 100,88 74,105 84,78 60,62 90,62" fill="#fff" transform="translate(0,6) scale(0.9)"/>
            </g>
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
