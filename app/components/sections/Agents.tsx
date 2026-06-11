'use client';

import { useEffect, useRef } from 'react';
import { MessageCircle, Calendar, RefreshCw, type LucideIcon } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const AGENTS: { label: string; title: string; desc: string; Icon: LucideIcon }[] = [
  { label: 'Atención',     title: 'Agente de Atención',     desc: 'Tu recepción no puede estar pegada al teléfono todo el día. El agente responde al instante, cualifica y agenda — a las 2am si hace falta.',      Icon: MessageCircle },
  { label: 'Agenda',       title: 'Agente de Agenda',       desc: 'Un turno sin confirmar es un turno que se pierde. El agente confirma, recuerda y reprograma antes de que el paciente simplemente no aparezca.',  Icon: Calendar },
  { label: 'Reactivación', title: 'Agente de Reactivación', desc: 'Tu CRM tiene plata dormida. Pacientes que pagaron una vez y nunca volviste a llamar. El agente los reactiva automáticamente — vos no tocás nada.', Icon: RefreshCw },
];

const DELAYS = ['', 'anim-d200', 'anim-d400'];

export default function Agents() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref }   = useScrollReveal<HTMLElement>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // R8 — detect prefers-reduced-motion before launching rAF
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animId: number;
    let inView = false;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    // Extracted draw function — accepts timestamp t (seconds); t=0 for static render
    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const orbit    = Math.min(cx, cy) * 0.72;
      const centralR = 38;
      const agentR   = 32;

      const nodes = AGENTS.map((_, i) => {
        const angle = -Math.PI / 2 + (Math.PI * 2 * i) / 3;
        return {
          x:     cx + orbit * Math.cos(angle),
          y:     cy + orbit * Math.sin(angle),
          phase: (Math.PI * 2 * i) / 3,
        };
      });

      // Connection lines
      nodes.forEach(({ x, y, phase }) => {
        const linePulse = Math.sin(t * 1.8 + phase) * 0.5 + 0.5;
        ctx.strokeStyle = `rgba(0,251,251,${0.18 + linePulse * 0.22})`;
        ctx.lineWidth   = 1 + linePulse * 0.8;
        ctx.setLineDash([5, 9]);
        ctx.lineDashOffset = -((t * 22) % 28);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.lineDashOffset = 0;
      });

      // Central node
      const cp  = Math.sin(t * 2.2) * 0.5 + 0.5;
      const haloR = centralR + 10 + cp * 14;
      const haloG = ctx.createRadialGradient(cx, cy, centralR * 0.8, cx, cy, haloR);
      haloG.addColorStop(0, `rgba(0,251,251,${0.18 * cp})`);
      haloG.addColorStop(1, 'rgba(0,251,251,0)');
      ctx.fillStyle = haloG;
      ctx.beginPath();
      ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
      ctx.fill();

      const cG = ctx.createRadialGradient(cx, cy - 6, 0, cx, cy, centralR);
      cG.addColorStop(0,    '#00FBFB');
      cG.addColorStop(0.55, 'rgba(0,220,220,0.88)');
      cG.addColorStop(1,    'rgba(0,150,150,0.55)');
      ctx.fillStyle = cG;
      ctx.beginPath();
      ctx.arc(cx, cy, centralR, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(255,255,255,${0.4 + cp * 0.3})`;
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, centralR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle    = '#0d2626';
      ctx.font         = 'bold 12px "DM Mono", monospace';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GalateIA', cx, cy);

      // Agent nodes
      AGENTS.forEach((agent, i) => {
        const { x, y, phase } = nodes[i];
        const ap = Math.sin(t * 1.6 + phase) * 0.5 + 0.5;
        const r  = agentR + ap * 5;

        const outerR = r + 14 + ap * 10;
        const outerG = ctx.createRadialGradient(x, y, r * 0.6, x, y, outerR);
        outerG.addColorStop(0, `rgba(0,251,251,${0.14 + ap * 0.12})`);
        outerG.addColorStop(1, 'rgba(0,251,251,0)');
        ctx.fillStyle = outerG;
        ctx.beginPath();
        ctx.arc(x, y, outerR, 0, Math.PI * 2);
        ctx.fill();

        const nG = ctx.createRadialGradient(x, y - r * 0.25, 0, x, y, r);
        nG.addColorStop(0,    `rgba(0,251,251,${0.28 + ap * 0.18})`);
        nG.addColorStop(0.65, `rgba(0,200,200,${0.12 + ap * 0.06})`);
        nG.addColorStop(1,    'rgba(0,251,251,0.03)');
        ctx.fillStyle = nG;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(0,251,251,${0.5 + ap * 0.35})`;
        ctx.lineWidth   = 1.5 + ap * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();

        // Nota: SVG/Lucide no es compatible con Canvas 2D API — excepción técnica documentada.
        ctx.fillStyle    = 'rgba(255,255,255,0.92)';
        ctx.font         = 'bold 12px "DM Sans", sans-serif';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(agent.label, x, y + r + 9);
      });
    };

    // R8 — reduced-motion: draw once (static), no rAF loop
    if (reducedMotion) {
      const onResize = () => { resize(); draw(0); };
      draw(0);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    // R7 — IntersectionObserver: pause rAF when section not in viewport
    const sectionEl = canvas.closest('section');
    const observer = new IntersectionObserver(
      ([entry]) => { inView = entry.isIntersecting; },
      { threshold: 0.01 }
    );
    if (sectionEl) observer.observe(sectionEl);

    const animate = (ts: number) => {
      if (inView) draw(ts / 1000);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={ref}
      id="agents"
      className="relative min-h-dvh py-24 px-8 flex items-center justify-center bg-dark overflow-hidden"
    >
      {/* Gradiente radial cyan sutil de fondo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,251,251,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        <div data-animate="fade-up" className="text-center mb-4">
          <h2 className="text-5xl font-bold">Los 3 Agentes Operativos</h2>
        </div>
        <div data-animate="fade-up" className="anim-d100 text-center mb-16">
          <p className="text-gray-400">Sistema de IA que funciona 24/7 sin intervención humana</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Canvas */}
          <div
            data-animate="fade-up"
            className="anim-d100 rounded-lg border border-gray-700 bg-gray-900/50 p-4"
            style={{ height: '460px' }}
          >
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          {/* Cards */}
          <div className="space-y-6">
            {AGENTS.map((agent, i) => (
              <div
                key={i}
                data-animate="fade-up"
                className={`${DELAYS[i]} card-hover p-6 rounded-lg border border-gray-700 bg-gray-900/50`}
              >
                <agent.Icon size={28} className="text-cyan mb-3" strokeWidth={1.5} />
                <h3 className="text-xl font-bold mb-2">{agent.title}</h3>
                <p className="text-gray-400">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
