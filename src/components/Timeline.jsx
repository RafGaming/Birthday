import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 * Timeline:
 * - entries animated when scrolled into view using IntersectionObserver
 */
const ENTRIES = [
  { id: 1, year: "2010", title: "First Steps", blurb: "Baby Alex took first steps and stole hearts." },
  { id: 2, year: "2015", title: "School Days", blurb: "Started school and learned to dream big." },
  { id: 3, year: "2020", title: "New Adventures", blurb: "Explored new places and passions." },
  { id: 4, year: "2024", title: "This Year", blurb: "A year of growth, laughter and friends." }
];

export default function Timeline() {
  const controls = useAnimation();
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) controls.start("visible");
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [controls]);

  return (
    <div ref={ref} className="timeline">
      {ENTRIES.map((e, i) => (
        <motion.div
          key={e.id}
          className="timeline-entry"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 12, scale: 0.98 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.08, duration: 0.45 } }
          }}
        >
          <div className="timeline-icon" aria-hidden>🎈</div>
          <div className="timeline-body">
            <div className="timeline-year">{e.year}</div>
            <h4>{e.title}</h4>
            <p>{e.blurb}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
