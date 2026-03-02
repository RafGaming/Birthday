import React from "react";

/**
 * Event details component
 */
export default function EventDetails({ event }) {
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>{event.title}</h3>
      <p><strong>Host:</strong> {event.host}</p>
      <p><strong>When:</strong> {new Date(event.dateISO).toLocaleString()}</p>
      <p><strong>Where:</strong> {event.location} — <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`} target="_blank" rel="noreferrer">Open in Maps</a></p>
      <p style={{ color: "var(--muted)" }}>Please RSVP by {event.rsvpDeadline}. Dress code: Smart Casual.</p>
    </div>
  );
}
