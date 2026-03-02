import React, { useState } from "react";
import { addRSVP } from "../lib/supabase";

/**
 * RSVP Form:
 * - name, email, choice (attending/maybe/not), guests, notes
 * - uses addRSVP from lib/supabase.js (Supabase or localStorage)
 */
export default function RSVPForm({ event, onCelebrate }) {
  const [form, setForm] = useState({ name: "", email: "", choice: "attending", guests: 1, notes: "" });
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("saving");
    try {
      const saved = await addRSVP(form);
      setStatus("saved");
      // small confetti for attending
      if (form.choice === "attending" && onCelebrate) onCelebrate();
      // clear or keep data
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form id="rsvp" className="rsvp-form" onSubmit={submit} aria-label="RSVP form">
      <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email (for confirmation)" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <div className="rsvp-row">
        <select value={form.choice} onChange={(e) => setForm({ ...form, choice: e.target.value })}>
          <option value="attending">Attending</option>
          <option value="maybe">Maybe</option>
          <option value="not">Not attending</option>
        </select>
        <input type="number" min="1" max="10" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
      </div>
      <textarea placeholder="Notes / dietary requirements (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button className="btn primary" type="submit">Send RSVP</button>
        <button type="button" className="btn ghost" onClick={() => setStatus(null)}>Reset</button>
      </div>

      <div style={{ marginTop: 10 }}>
        {status === "saving" && <div style={{ color: "var(--muted)" }}>Saving…</div>}
        {status === "saved" && <div style={{ color: "var(--accent)" }}>Thanks — your RSVP was recorded.</div>}
        {status === "error" && <div style={{ color: "salmon" }}>There was an error. Try again.</div>}
      </div>
    </form>
  );
}
