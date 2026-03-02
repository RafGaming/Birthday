import React, { useRef, useEffect } from "react";

/**
 * Improved ParticlesCanvas:
 * - lightweight sparkles & slow floaters
 * - throttled pointer interaction
 * - reduce particles on small screens for performance
 */
export default function ParticlesCanvas({ theme = "sparkles" }) {
  const ref = useRef(null);
  const particles = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const maxParticles = Math.max(50, Math.floor((w * h) / 25000));

    const rand = (a, b) => a + Math.random() * (b - a);

    const spawn = (x = Math.random() * w, y = Math.random() * h) => {
      particles.current.push({
        x,
        y,
        vx: rand(-0.3, 0.3),
        vy: rand(-0.6, -0.1),
        life: rand(80, 220),
        size: rand(0.8, 3.2),
        hue: rand(260, 320)
      });
    };

    for (let i = 0; i < maxParticles / 2; i++) spawn();

    let lastMove = 0;
    const onMove = (e) => {
      const now = Date.now();
      if (now - lastMove < 20) return; // throttle
      lastMove = now;
      const x = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || w / 2;
      const y = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY) || h / 2;
      for (let i = 0; i < 3; i++) spawn(x + rand(-8, 8), y + rand(-8, 8));
      if (particles.current.length > maxParticles) particles.current.splice(0, particles.current.length - maxParticles);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.002;
        p.life -= 1;
        const alpha = Math.max(0, p.life / 200);
        const r = p.size;
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 6);
        g.addColorStop(0, `rgba(255,255,255,${alpha})`);
        g.addColorStop(0.45, `hsla(${p.hue},90%,65%,${alpha * 0.85})`);
        g.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.fillStyle = g;
        ctx.arc(p.x, p.y, r + (1 - alpha) * 3, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0 || p.y > h + 50 || p.x < -50 || p.x > w + 50) {
          particles.current.splice(i, 1);
        }
      }

      // gentle new spawns
      if (Math.random() < 0.06 && particles.current.length < maxParticles) spawn();
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [theme]);

  return <canvas ref={ref} className="particles-canvas" aria-hidden />;
}
