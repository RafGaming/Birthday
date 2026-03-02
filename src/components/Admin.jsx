import React, { useEffect, useState } from "react";
import { getRSVPs } from "../lib/supabase";

/**
 * Minimal admin view (hash #admin)
 * - lists RSVPs, CSV export
 * NOTE: In production secure this page with auth.
 */
export default function Admin() {
  const [rsvps, setRsvps] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getRSVPs();
      if (mounted) setRsvps(data || []);
    })();
    return () => (mounted = false);
  }, []);

  const exportCSV = () => {
    const rows = [["name","email","choice","guests","notes","created_at"], ...rsvps.map(r => [r.name, r.email, r.choice, r.guests, `"${(r.notes||"").replace(/"/g,'""')}"`, r.created_at])];
    const csv = rows.map(r => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "rsvps.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "36px auto", padding: 20 }}>
      <h2>Admin — RSVPs</h2>
      <div style={{ marginBottom: 12 }}>
        <button className="btn primary" onClick={exportCSV}>Export CSV</button>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {rsvps.length === 0 && <div style={{ color: "var(--muted)" }}>No RSVPs yet.</div>}
        {rsvps.map(r => (
          <div key={r.id} className="panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong>{r.name}</strong> <span style={{ color: "var(--muted)" }}>({r.email})</span>
              <div style={{ color: "var(--muted)" }}>{r.choice} • {r.guests} guest(s)</div>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 12 }}>{new Date(r.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
