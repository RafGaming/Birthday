import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMessages, addMessage } from "../lib/supabase";

/**
 * MessageWall:
 * - guest messages saved to Supabase when configured, fallback to localStorage
 * - animated stacking cards, optimistic UI
 */
export default function MessageWall() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ name: "", text: "" });
  const inputRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getMessages();
        if (mounted) setMessages(data || []);
      } catch {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.text.trim()) return;
    const newMsg = {
      id: Date.now(),
      name: form.name.trim() || "Guest",
      text: form.text.trim(),
      created_at: new Date().toISOString()
    };
    // optimistic update
    setMessages((m) => [newMsg, ...m]);
    setForm({ name: "", text: "" });
    inputRef.current?.focus();

    try {
      const saved = await addMessage({ name: newMsg.name, text: newMsg.text });
      // replace optimistic item if supabase returned a different id
      setMessages((prev) => {
        const filtered = prev.filter((p) => p.id !== newMsg.id);
        return [saved, ...filtered];
      });
    } catch {
      // keep optimistic local
    }
  };

  return (
    <div id="message-wall" className="message-wall">
      <form onSubmit={submit} className="message-form" aria-label="Leave a birthday wish">
        <input
          placeholder="Your name (optional)"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
        />
        <textarea
          ref={inputRef}
          placeholder="Write your birthday wish..."
          value={form.text}
          onChange={(e) => setForm((s) => ({ ...s, text: e.target.value }))}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn primary" type="submit">Post</button>
        </div>
      </form>

      <div className="messages-list" aria-live="polite">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 8, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35 }}
              className="message-card"
            >
              <div className="message-meta">
                <strong>{m.name}</strong>
                <time>{new Date(m.created_at || m.time || Date.now()).toLocaleString()}</time>
              </div>
              <p className="message-text">{m.text}</p>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
