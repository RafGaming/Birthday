import React, { useEffect, useRef, useState } from "react";
import Hero from "./components/Hero";
import ParticlesCanvas from "./components/ParticlesCanvas";
import GiftBox from "./components/GiftBox";
import Gallery from "./components/Gallery";
import MessageWall from "./components/MessageWall";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";
import { burstConfetti } from "./utils/confetti";

/**
 * App: wires components and provides shared handlers (celebrate + audio state)
 */
export default function App() {
  const birthdayName = "Alex"; // customize
  const birthdayISO = "2026-12-25T08:00:00"; // set target
  const audioRef = useRef(null);
  const [musicOn, setMusicOn] = useState(() => {
    try {
      return localStorage.getItem("bg_music") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    audioRef.current = new Audio("/assets/birthday-melody.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.55;
    if (musicOn) {
      const play = async () => {
        try {
          await audioRef.current.play();
        } catch {
          // Many mobile browsers require a user gesture; ignore if denied.
        }
      };
      play();
    } else {
      audioRef.current.pause();
    }
    return () => {
      audioRef.current?.pause();
    };
  }, [musicOn]);

  useEffect(() => {
    try {
      localStorage.setItem("bg_music", musicOn ? "1" : "0");
    } catch {}
  }, [musicOn]);

  const celebrate = (el) => {
    if (el && el.getBoundingClientRect) {
      const rect = el.getBoundingClientRect();
      burstConfetti({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 3,
        count: 140
      });
    } else {
      burstConfetti({ count: 220 });
    }
  };

  return (
    <div className="site-root">
      <ParticlesCanvas theme="sparkles" />
      <header className="site-header">
        <nav className="top-nav">
          <div className="logo">🎉 Birthday</div>
          <div className="controls">
            <button
              className="music-toggle"
              aria-pressed={musicOn}
              onClick={() => setMusicOn((s) => !s)}
              title={musicOn ? "Pause music" : "Play music"}
            >
              {musicOn ? "🔊" : "🔈"}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <Hero
          name={birthdayName}
          dateISO={birthdayISO}
          onCelebrate={(el) => celebrate(el)}
        />

        <section className="content-grid">
          <div className="col left">
            <div className="panel">
              <h2 className="panel-title">Gifts</h2>
              <div className="gifts-grid">
                <GiftBox id="gift-1" />
                <GiftBox id="gift-2" />
                <GiftBox id="gift-3" />
              </div>
            </div>

            <div className="panel">
              <h2 className="panel-title">Message Wall</h2>
              <MessageWall />
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
    </div>
  );
}
