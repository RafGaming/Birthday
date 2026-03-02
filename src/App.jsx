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
 * Superhero Invitation App
 * Celebrant: 4 years old — big comic vibes
 */
export default function App() {
  const event = {
    title: "Captain Alex’s Super 4th Birthday!",
    host: "Captain Alex & Crew",
    dateISO: "2026-12-25T10:30:00",
    location: "Hero Hangout: Playhouse Park, 1 Fun St, Town",
    rsvpDeadline: "2026-12-10"
  };

  useEffect(() => {
    // an initial friendly blast (subtle)
    burstConfetti({ count: 56 });
  }, []);

  const handleCelebrate = (el) => {
    if (el?.getBoundingClientRect) {
      const rect = el.getBoundingClientRect();
      burstConfetti({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 3,
        count: 180
      });
    } else {
      burstConfetti({ count: 220 });
    }
  };

  const isAdmin = typeof window !== "undefined" && window.location.hash === "#admin";

  return (
    <div className="site-root hero-theme">
      <ParticlesCanvas />
      {isAdmin ? (
        <Admin />
      ) : (
        <>
          <header className="site-header">
            <div className="top-nav" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
              <div className="logo">🦸‍♂️ Captain Alex</div>
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

          <Footer onCelebrate={() => burstConfetti({ count: 300 })} />
        </>
      )}
    </div>
  );
}
