import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const ENTRIES = [
  { id: 1, year: "2010", title: "First steps", blurb: "Memories from the start." },
  { id: 2, year: "2015", title: "School days", blurb: "Learning and growing." },
  { id: 3, year: "2020", title: "New adventures", blurb: "Exploration and change." },
  { id: 4, year: "2024", title: "This year", blurb: "A year to remember." }
];

export default function Timeline() {
  const controls = useAnimation();
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) controls.start("visible"); });
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [controls]);

  return (
    <div ref={ref} className="timeline">
      {ENTRIES.map((e,i) => (
        <motion.div key={e.id} className="timeline-entry" initial="hidden" animate={controls} variants={{
          hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45 } }
        }}>
          <div className="timeline-icon">🎉</div>
          <div>
            <div className="timeline-year">{e.year}</div>
            <h4>{e.title}</h4>
            <p style={{ marginTop: 6 }}>{e.blurb}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
