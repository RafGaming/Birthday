import React, { useState } from "react";
import Lightbox from "./Lightbox";

const PHOTOS = [
  "/assets/photos/photo1.jpg",
  "/assets/photos/photo2.jpg",
  "/assets/photos/photo3.jpg",
  "/assets/photos/photo4.jpg",
  "/assets/photos/photo5.jpg",
  "/assets/photos/photo6.jpg"
];

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="masonry">
        {PHOTOS.map((src, i) => (
          <button key={src} className="masonry-item" onClick={() => { setIndex(i); setOpen(true); }} aria-label={`Open photo ${i+1}`}>
            <img src={src} alt={`Memory ${i+1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {open && <Lightbox images={PHOTOS} startIndex={index} onClose={() => setOpen(false)} />}
    </div>
  );
}
