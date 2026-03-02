import React, { useEffect } from "react";
import Hero from "./components/Hero";
import EventDetails from "./components/EventDetails";
import RSVPForm from "./components/RSVPForm";
import Gallery from "./components/Gallery";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";
import ParticlesCanvas from "./components/ParticlesCanvas";
import Admin from "./components/Admin";
import { burstConfetti } from "./utils/confetti";

/**
 * Invitation App root
 * - Uses simple hash-based admin access (/#admin) for demo admin viewing
 * - Prefers Supabase if env vars set, otherwise localStorage fallback
 */
export default function App() {
  const event = {
    title: "Alex’s 30th Birthday Celebration",
    host: "Alex & Friends",
    dateISO: "2026-12-25T18:00:00",
    location: "The Grand Hall, 123 Celebration Ave, City",
    rsvpDeadline: "2026-12-10"
  };

  useEffect(() => {
    // play small entrance confetti on first load (subtle)
    burstConfetti({ count: 48 });
  }, []);

  const handleCelebrate = (el) => {
    if (el?.getBoundingClientRect) {
      const rect = el.getBoundingClientRect();
      burstConfetti({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 3,
        count: 160
      });
    } else {
      burstConfetti({ count: 260 });
    }
  };

  const isAdmin = typeof window !== "undefined" && window.location.hash === "#admin";

  return (
    <div className="site-root">
      <ParticlesCanvas />
      {isAdmin ? (
        <Admin />
      ) : (
        <>
          <header className="site-header">
            <div className="top-nav" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
              <div className="logo">✨ Invitation</div>
            </div>
          </header>

          <main>
            <Hero name={event.title} dateISO={event.dateISO} onCelebrate={handleCelebrate} />
            <section className="content-grid">
              <div className="col left">
                <div className="panel">
                  <EventDetails event={event} />
                </div>

                <div className="panel">
                  <h2 className="panel-title">RSVP</h2>
                  <RSVPForm event={event} onCelebrate={handleCelebrate} />
                </div>
              </div>

              <aside className="col right">
                <div className="panel">
                  <h2 className="panel-title">Gallery</h2>
                  <Gallery />
                </div>

                <div className="panel">
                  <h2 className="panel-title">Timeline</h2>
                  <Timeline />
                </div>
              </aside>
            </section>
          </main>

          <Footer onCelebrate={() => burstConfetti({ count: 260 })} />
        </>
      )}
    </div>
  );
}
