/**
 * Simple performant confetti burst using canvas overlay.
 * - options: x, y (page coords), count
 */
export function burstConfetti({ x = null, y = null, count = 100, spread = 60 } = {}) {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = 9999;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const origin = {
    x: x ?? window.innerWidth / 2,
    y: y ?? window.innerHeight / 3
  };

  const pieces = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * (spread * Math.PI / 180);
    const speed = 2 + Math.random() * 6;
    pieces.push({
      x: origin.x,
      y: origin.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed * -1,
      r: 4 + Math.random() * 7,
      rot: Math.random() * Math.PI,
      color: `hsl(${120 + Math.random() * 240}, 85%, 65%)`,
      life: 60 + Math.random() * 40
    });
  }

  let raf;
  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18; // gravity
      p.rot += 0.15;
      p.life -= 1;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r / 2);
      ctx.restore();
      if (p.life <= 0) pieces.splice(i, 1);
    }
    if (pieces.length > 0) raf = requestAnimationFrame(frame);
    else {
      cancelAnimationFrame(raf);
      canvas.remove();
    }
  }
  frame();
}
