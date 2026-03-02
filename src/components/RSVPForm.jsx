import React, { useState } from "react";
import { addRSVP } from "../lib/supabase";

/**
 * Playful RSVP with big buttons and friendly microcopy
 */
export default function RSVPForm({ event, onCelebrate }) {
  const [form, setForm] = useState({ name: "", email: "", choice: "attending", guests: 1, notes: "" });
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setStatus({ type: "error", message: "Please tell us the hero's name!" });
      return;
    }
    setStatus({ type: "saving" });
    try {
      const saved = await addRSVP(form);
      setStatus({ type: "saved", message: "Awesome — see you at the party!" });
      if (form.choice === "attending" && onCelebrate) onCelebrate();
      // clear form gently
      setForm({ name: "", email: "", choice: "attending", guests: 1, notes: "" });
    } catch (err) {
      setStatus({ type: "error", message: "Oops — something went wrong. Try again." });
    }
  };

  return (
    <form id="rsvp" className="rsvp-form" onSubmit={submit} aria-label="RSVP form">
      <input placeholder="Hero's name (required)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Parent email (so we can confirm)" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <div className="rsvp-row">
        <select value={form.choice} onChange={(e) => setForm({ ...form, choice: e.target.value })}>
          <option value="attending">I'm coming! 🦸</option>
          <option value="maybe">Maybe — checking superpowers</option>
          <option value="not">Can't make it 😢</option>
        </select>
        <input type="number" min="1" max="10" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
      </div>
      <textarea placeholder="Notes / allergies / secret handshake (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button className="btn primary" type="submit" aria-label="Send RSVP">Zap! Send RSVP</button>
        <button type="button" className="btn ghost" onClick={() => setForm({ name: "", email: "", choice: "attending", guests: 1, notes: "" })}>Clear</button>
      </div>

      <div style={{ marginTop: 10 }}>
        {status?.type === "saving" && <div style={{ color: "var(--muted)" }}>Saving…</div>}
        {status?.type === "saved" && <div style={{ color: "#0a8" }}>{status.message}</div>}
        {status?.type === "error" && <div style={{ color: "salmon" }}>{status.message}</div>}
      </div>
    </form>
  );
}
