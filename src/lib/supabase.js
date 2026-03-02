/**
 * Supabase helper with graceful fallback to localStorage.
 *
 * Exports:
 * - getMessages(): returns array of messages sorted desc by created_at
 * - addMessage({ name, text }): inserts message and returns created object
 *
 * Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local to enable Supabase.
 */

import { createClient } from "@supabase/supabase-js";

const STORAGE_KEY = "birthday_messages_v1";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    supabase = null;
  }
}

async function getMessages() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("id, name, text, created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      if (!error) return data || [];
    } catch {
      // fallback
    }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function addMessage({ name, text }) {
  const record = {
    name: name || "Guest",
    text,
    created_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([{ name: record.name, text: record.text }])
        .select()
        .limit(1);
      if (!error && data && data[0]) return data[0];
    } catch {
      // fallback to localStorage
    }
  }

  // localStorage fallback and optimistic id
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    const item = { id: Date.now(), ...record };
    arr.unshift(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    return item;
  } catch {
    return record;
  }
}

export { getMessages, addMessage };
