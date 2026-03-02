import React, { useEffect, useRef } from "react";

export default function Footer({ onCelebrate }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onCelebrate && onCelebrate();
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onCelebrate]);

  return (
    <footer ref={ref} className="site-footer">
      <div className="candles-row" aria-hidden style={{ display: "flex", gap: 10 }}>
        <div style={{ width: 18, height: 60, position: "relative" }}>
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(180deg,#fff,#ffd6ea)", borderRadius: 6 }} />
          <div style={{ position: "absolute", left: "50%", top: -6, transform: "translateX(-50%)", width: 8, height: 12, background: "linear-gradient(180deg,#ffd66b,#ff9fd9)", borderRadius: 6 }} />
        </div>
        <div style={{ width: 18, height: 60, position: "relative" }}>
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(180deg,#fff,#ffd6ea)", borderRadius: 6 }} />
          <div style={{ position: "absolute", left: "50%", top: -6, transform: "translateX(-50%)", width: 8, height: 12, background: "linear-gradient(180deg,#ffd66b,#ff9fd9)", borderRadius: 6 }} />
        </div>
      </div>

      <div style={{ marginTop: 12, color: "var(--muted)" }}>
        <div>Made with ✨ and love</div>
      </div>
    </footer>
  );
}
