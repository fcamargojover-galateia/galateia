'use client';

import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId = 0;
    // listeners registered inside startAnimation — stored for cleanup
    let removeVisibility = () => {};

    const startAnimation = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;

      // CLS-3 — reduce particles on mobile to cut CPU work in half
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const count    = isMobile ? 25 : 50;

      type Particle = { x: number; y: number; vx: number; vy: number; radius: number };
      const particles: Particle[] = Array.from({ length: count }, () => ({
        x:      Math.random() * canvas.width,
        y:      Math.random() * canvas.height,
        vx:     (Math.random() - 0.5) * 0.5,
        vy:     (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5,
      }));

      // Mobile perf — throttle to 30fps on mobile, 60fps on desktop
      const frameInterval = isMobile ? 1000 / 30 : 1000 / 60;
      let lastFrame = 0;

      const tick = (timestamp: number) => {
        // Skip frame if we haven't hit the target interval yet
        if (timestamp - lastFrame < frameInterval) {
          animId = requestAnimationFrame(tick);
          return;
        }
        lastFrame = timestamp;

        ctx.fillStyle = 'rgba(26, 26, 29, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = canvas.width;
          else if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          else if (p.y > canvas.height) p.y = 0;

          ctx.fillStyle = 'rgba(0, 251, 251, 0.4)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d < 150) {
              ctx.strokeStyle = `rgba(0,251,251,${0.2 * (1 - d / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        animId = requestAnimationFrame(tick);
      };

      // CLS-3 — pause rAF when tab is hidden to avoid wasted GPU work
      const onVisibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(animId);
        } else {
          animId = requestAnimationFrame(tick);
        }
      };
      document.addEventListener('visibilitychange', onVisibility);
      removeVisibility = () => document.removeEventListener('visibilitychange', onVisibility);

      // Pass 0 as initial timestamp so the first frame fires immediately
      animId = requestAnimationFrame(tick);
    };

    // TBT — defer init to idle time so it doesn't block the main thread on load
    type RIC = typeof window extends { requestIdleCallback: infer F } ? F : never;
    const ric = (window as unknown as { requestIdleCallback?: RIC }).requestIdleCallback;
    let cancelDefer = () => {};

    if (ric) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const id = (ric as any)(startAnimation, { timeout: 2000 }) as number;
      cancelDefer = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).cancelIdleCallback?.(id);
      };
    } else {
      const id = setTimeout(startAnimation, 200);
      cancelDefer = () => clearTimeout(id);
    }

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      cancelDefer();
      removeVisibility();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-0"
      // CLS — explicit CSS dimensions prevent layout recalculation from default 300×150 canvas size
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    />
  );
}
