import React from "react";

/**
 * Fun, kid-friendly event details
 */
export default function EventDetails({ event }) {
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>{event.title}</h3>
      <p><strong>Host:</strong> {event.host}</p>
      <p><strong>When:</strong> {new Date(event.dateISO).toLocaleString()}</p>
      <p><strong>Where:</strong> {event.location} — <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`} target="_blank" rel="noreferrer">Open Map</a></p>
      <p style={{ color: "var(--muted)" }}>Please RSVP by <strong>{event.rsvpDeadline}</strong>. Costumes welcome — capes and masks encouraged!</p>
      <div style={{ marginTop: 8, padding: 12, borderRadius: 8, background: "linear-gradient(90deg,#fff1e0, #fff0ff)", color: "#071229", fontWeight: 700 }}>
        Super Tip: Bring comfy shoes — there will be games, cake, and a hero parade!
      </div>
    </div>
  );
}
