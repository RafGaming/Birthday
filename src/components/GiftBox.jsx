import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * Premium GiftBox:
 * - 3D transform to open top
 * - keyboard accessible: Enter/Space toggles
 * - reveals a modal region (simple inline reveal)
 */
export default function GiftBox({ id }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="gift-wrapper">
      <motion.button
        className={`gift-box premium ${open ? "open" : ""}`}
        onClick={() => setOpen((s) => !s)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((s) => !s);
          }
        }}
        aria-expanded={open}
        aria-controls={`gift-reveal-${id}`}
      >
        <motion.div
          className="gift-top"
          animate={{ rotateX: open ? -140 : 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="gift-body">
          <div className="ribbon" />
        </div>
      </motion.button>

      <motion.div
        id={`gift-reveal-${id}`}
        className="gift-reveal"
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        aria-hidden={!open}
      >
        <div className="reveal-card">
          <h4>Surprise!</h4>
          <p>Click to add a message or upload a photo here — integrate with backend to store.</p>
          <button className="btn small">Add Message</button>
        </div>
      </motion.div>
    </div>
  );
}
