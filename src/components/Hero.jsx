import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Invitation Hero: invites guests and links to RSVP
 */
export default function Hero({ name = "You're invited", dateISO = null, onCelebrate }) {
  const anchorRef = useRef(null);

  useEffect(() => {
    // entrance subtle animation placeholder
  }, []);

  return (
    <section className="hero premium-hero" aria-labelledby="hero-title">
      <motion.div className="glass-card hero-inner" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="hero-left">
          <h1 id="hero-title" className="headline">{name}</h1>
          <p className="subhead">Please join us for an intimate celebration — RSVP to let us know you're coming.</p>

          <div className="hero-actions">
            <a href="#rsvp" className="btn primary">RSVP Now</a>
            <button
              className="btn ghost"
              ref={anchorRef}
              onClick={() => onCelebrate && onCelebrate(anchorRef.current)}
            >
              Celebrate Preview
            </button>
          </div>
        </div>

        <div className="hero-right" aria-hidden>
          {/* Decorative cake SVG */}
          <svg viewBox="0 0 200 200" className="cake-svg" width="220" height="220" aria-hidden>
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#ffd6ea" />
                <stop offset="1" stopColor="#d8c7ff" />
              </linearGradient>
            </defs>
            <rect x="20" y="80" width="160" height="60" rx="12" fill="url(#g1)" stroke="#fff2"/>
            <g transform="translate(40,40)">
              <rect x="0" y="0" width="30" height="30" rx="6" fill="#ff9fd9"/>
              <rect x="60" y="0" width="30" height="30" rx="6" fill="#ffd66b"/>
            </g>
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
