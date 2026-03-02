import React, { useRef, useEffect } from "react";

/**
 * Lightweight particles canvas (sparkles)
 */
export default function ParticlesCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles = [];
    const rand = (a,b) => a + Math.random()*(b-a);

    const spawn = () => {
      particles.push({ x: rand(0,w), y: rand(0,h), r: rand(0.6,3), vx: rand(-0.2,0.2), vy: rand(-0.5,0.2), life: rand(80,220), hue: rand(200,320) });
    };
    for (let i=0;i<Math.max(40, Math.floor((w*h)/30000));i++) spawn();

    let raf;
    const tick = () => {
      ctx.clearRect(0,0,w,h);
      for (let i = particles.length-1;i>=0;i--){
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.002; p.life -= 1;
        const alpha = Math.max(0, p.life/200);
        const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6);
        g.addColorStop(0, `rgba(255,255,255,${alpha})`);
        g.addColorStop(0.45, `hsla(${p.hue},85%,65%,${alpha*0.85})`);
        g.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r+(1-alpha)*3,0,Math.PI*2); ctx.fill();
        if (p.life<=0) particles.splice(i,1);
      }
      if (Math.random()<0.03 && particles.length < 200) spawn();
      raf = requestAnimationFrame(tick);
    };
    tick();
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={ref} className="particles-canvas" aria-hidden />;
}
