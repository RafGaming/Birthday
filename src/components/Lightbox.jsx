import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Simple accessible lightbox with fade/zoom transitions and keyboard navigation.
 */
export default function Lightbox({ images = [], startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(images.length - 1, i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="lightbox-content"
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
          <img src={images[index]} alt={`Photo ${index + 1}`} />
          <div className="lightbox-controls">
            <button onClick={() => setIndex((i) => Math.max(0, i - 1))} aria-label="Previous">◀</button>
            <button onClick={() => setIndex((i) => Math.min(images.length - 1, i + 1))} aria-label="Next">▶</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
