/**
 * Supabase helper with RSVP helpers and fallback to localStorage.
 *
 * Exports:
 * - getMessages, addMessage (messages table)
 * - getRSVPs, addRSVP (rsvps table)
 *
 * Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local to enable Supabase.
 */

import { createClient } from "@supabase/supabase-js";

const RSVP_KEY = "birthday_rsvps_v1";
const MSG_KEY = "birthday_messages_v1";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch {
    supabase = null;
  }
}

/* Messages */
async function getMessages() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("id, name, text, created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      if (!error) return data || [];
    } catch {}
  }

  try {
    const raw = localStorage.getItem(MSG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function addMessage({ name, text }) {
  const record = { name: name || "Guest", text, created_at: new Date().toISOString() };

  if (supabase) {
    try {
      const { data, error } = await supabase.from("messages").insert([{ name: record.name, text: record.text }]).select().limit(1);
      if (!error && data && data[0]) return data[0];
    } catch {}
  }

  try {
    const raw = localStorage.getItem(MSG_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    const item = { id: Date.now(), ...record };
    arr.unshift(item);
    localStorage.setItem(MSG_KEY, JSON.stringify(arr));
    return item;
  } catch {
    return record;
  }
}

/* RSVPs */
async function getRSVPs() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("rsvps")
        .select("id, name, email, choice, guests, notes, created_at")
        .order("created_at", { ascending: false })
        .limit(500);
      if (!error) return data || [];
    } catch {}
  }

  try {
    const raw = localStorage.getItem(RSVP_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function addRSVP({ name, email, choice, guests = 1, notes = "" }) {
  const record = { name: name || "Guest", email: email || "", choice, guests: Number(guests || 1), notes, created_at: new Date().toISOString() };

  if (supabase) {
    try {
      const { data, error } = await supabase.from("rsvps").insert([{ name: record.name, email: record.email, choice: record.choice, guests: record.guests, notes: record.notes }]).select().limit(1);
      if (!error && data && data[0]) return data[0];
    } catch {}
  }

  try {
    const raw = localStorage.getItem(RSVP_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    const item = { id: Date.now(), ...record };
    arr.unshift(item);
    localStorage.setItem(RSVP_KEY, JSON.stringify(arr));
    return item;
  } catch {
    return record;
  }
}

export { getMessages, addMessage, getRSVPs, addRSVP };
