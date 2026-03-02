import React, { useEffect, useRef } from "react";

/**
 * Footer with animated flickering candles and social links.
 * When scrolled into view triggers a final celebratory animation.
 */
export default function Footer({ onCelebrate }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // do final celebration once
            onCelebrate && onCelebrate();
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [onCelebrate]);

  return (
    <footer ref={ref} className="site-footer premium-footer">
      <div className="candles-row" aria-hidden>
        <div className="candle-wrap">
          <div className="candle-body" />
          <div className="flame" />
        </div>
        <div className="candle-wrap">
          <div className="candle-body" />
          <div className="flame" />
        </div>
        <div className="candle-wrap">
          <div className="candle-body" />
          <div className="flame" />
        </div>
      </div>

      <div className="footer-meta">
        <div className="socials" role="navigation" aria-label="Social links">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Twitter">TW</a>
          <a href="#" aria-label="Facebook">FB</a>
        </div>
        <div className="credits">Made with ✨ and love</div>
      </div>
    </footer>
  );
}
