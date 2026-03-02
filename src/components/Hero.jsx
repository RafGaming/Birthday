import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Premium Hero:
 * - Animated SVG cake with subtle sparkles and floating balloons
 * - Countdown with accessible labels
 * - Celebrate button triggers confetti (via parent onCelebrate)
 * - Accepts onCelebrate(refElement)
 */
export default function Hero({ name = "Friend", dateISO = null, onCelebrate }) {
  const [timeLeft, setTimeLeft] = useState({});
  const celebrateRef = useRef(null);

  useEffect(() => {
    if (!dateISO) return;
    const target = new Date(dateISO).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (24 * 3600 * 1000));
      const hours = Math.floor((diff / (3600 * 1000)) % 24);
      const minutes = Math.floor((diff / (60 * 1000)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [dateISO]);

  return (
    <section className="hero premium-hero" aria-labelledby="hero-title">
      <motion.div
        className="glass-card hero-inner"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="hero-left">
          <h1 id="hero-title" className="headline">
            Happy Birthday <span className="name-highlight">{name}!</span>
          </h1>
          <p className="subhead">
            Wishing you an enchanting day — celebrate with memories, music and magic.
          </p>

          <div className="countdown premium-countdown" role="timer" aria-live="polite">
            <div className="count-item">
              <span className="num">{timeLeft.days ?? "--"}</span>
              <span className="label">Days</span>
            </div>
            <div className="count-item">
              <span className="num">{timeLeft.hours ?? "--"}</span>
              <span className="label">Hours</span>
            </div>
            <div className="count-item">
              <span className="num">{timeLeft.minutes ?? "--"}</span>
              <span className="label">Minutes</span>
            </div>
            <div className="count-item">
              <span className="num">{timeLeft.seconds ?? "--"}</span>
              <span className="label">Seconds</span>
            </div>
          </div>

          <div className="hero-actions">
            <button
              ref={celebrateRef}
              className="btn primary"
              onClick={() => onCelebrate && onCelebrate(celebrateRef.current)}
            >
              Celebrate
            </button>
            <a href="#message-wall" className="btn ghost">
              Leave a Wish
            </a>
          </div>
        </div>

        <div className="hero-right" aria-hidden>
          <div className="cake-stage">
            {/* SVG cake with animated candles using CSS animations */}
            <svg viewBox="0 0 240 240" className="cake-svg" aria-hidden>
              <defs>
                <linearGradient id="cakeGrad" x1="0" x2="1">
                  <stop offset="0" stopColor="#ffd6ea" />
                  <stop offset="1" stopColor="#d8c7ff" />
                </linearGradient>
              </defs>

              <g transform="translate(20,20)">
                <rect x="0" y="70" rx="18" ry="18" width="200" height="60" fill="url(#cakeGrad)" stroke="#fff2" strokeWidth="1"/>
                <rect x="20" y="30" rx="14" ry="14" width="160" height="40" fill="#fff" opacity="0.08"/>
                {/* candles */}
                <g className="candles" aria-hidden>
                  <g className="candle" transform="translate(40,18)">
                    <rect x="0" y="0" width="6" height="20" rx="2" fill="#ffd66b"/>
                    <path d="M3 0 C6 4, 4 9, 3 12 C2 9,0 4,3 0" fill="#ffcf5c"/>
                  </g>
                  <g className="candle" transform="translate(92,18)">
                    <rect x="0" y="0" width="6" height="20" rx="2" fill="#ff9fd9"/>
                    <path d="M3 0 C6 4, 4 9, 3 12 C2 9,0 4,3 0" fill="#ffd66b"/>
                  </g>
                </g>

                {/* sparkles */}
                <g className="sparkles" opacity="0.9">
                  <circle cx="160" cy="20" r="2" fill="#7ef0ff" />
                  <circle cx="170" cy="60" r="1.5" fill="#ffd6ea" />
                  <circle cx="30" cy="30" r="1.5" fill="#d8c7ff" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
