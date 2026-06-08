'use client';

import { useEffect, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const AGENTS = [
  { label: 'Atención',    title: 'Agente de Atención',    desc: 'Responde WhatsApp 24/7, cualifica pacientes, agenda automáticamente.',     icon: '💬' },
  { label: 'Agenda',      title: 'Agente de Agenda',      desc: 'Sincroniza calendarios, evita conflictos, notifica cambios en tiempo real.', icon: '📅' },
  { label: 'Reactivación',title: 'Agente de Reactivación',desc: 'Identifica pacientes inactivos, personaliza mensajes, cierra ventas upsell.',icon: '🔄' },
];

const DELAYS = ['', 'anim-d200', 'anim-d400'];

export default function Agents() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref } = useScrollReveal<HTMLElement>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(cx, cy) * 0.55;

      // Líneas de conexión
      AGENTS.forEach((_, i) => {
        const angle = -Math.PI / 2 + (Math.PI * 2 * i) / 3;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        ctx.strokeStyle = 'rgba(0,251,251,0.25)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Nodo central
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
      grad.addColorStop(0, 'rgba(0,251,251,0.9)');
      grad.addColorStop(1, 'rgba(0,180,180,0.4)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fill();

      // Etiqueta nodo central — "GalateIA"
      ctx.fillStyle = '#1A1A1D';
      ctx.font = 'bold 11px "DM Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GalateIA', cx, cy);

      // Nodos de agentes
      AGENTS.forEach((agent, i) => {
        const angle = -Math.PI / 2 + (Math.PI * 2 * i) / 3;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);

        // Orbe agente
        const nodeGrad = ctx.createRadialGradient(x, y, 0, x, y, 28);
        nodeGrad.addColorStop(0, 'rgba(0,251,251,0.35)');
        nodeGrad.addColorStop(1, 'rgba(0,251,251,0.06)');
        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(0,251,251,0.55)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.stroke();

        // Etiqueta visible del agente
        ctx.fillStyle = '#00FBFB';
        ctx.font = 'bold 12px "DM Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(agent.label, x, y);
      });

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <section
      ref={ref}
      id="agents"
      className="relative min-h-screen py-24 px-8 flex items-center justify-center bg-dark overflow-hidden"
    >
      {/* Gradiente radial cyan sutil de fondo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,251,251,0.06) 0%, transparent 70%)',
        }}
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
          <div data-animate="fade-up" className="anim-d100 rounded-lg border border-gray-700 bg-gray-900/50 p-8 h-96">
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
                <div className="text-3xl mb-3">{agent.icon}</div>
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
