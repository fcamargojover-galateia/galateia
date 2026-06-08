'use client';

import { useEffect, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const AGENTS = [
  {
    title: 'Agente de Atención',
    desc: 'Responde WhatsApp 24/7, cualifica pacientes, agenda automáticamente.',
    icon: '💬',
  },
  {
    title: 'Agente de Agenda',
    desc: 'Sincroniza calendarios, evita conflictos, notifica cambios en tiempo real.',
    icon: '📅',
  },
  {
    title: 'Agente de Reactivación',
    desc: 'Identifica pacientes inactivos, personaliza mensajes, cierra ventas upsell.',
    icon: '🔄',
  },
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

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 80;

      ctx.fillStyle = '#00fbfb';
      ctx.beginPath();
      ctx.arc(cx, cy, 15, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#00fbfb';
      ctx.font = '12px var(--font-dm-mono)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GalateIA', cx, cy + 25);

      AGENTS.forEach((agent, i) => {
        const angle = (Math.PI / 2) + (Math.PI * 2 * i) / 3;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);

        ctx.strokeStyle = 'rgba(0,251,251,0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillStyle = 'rgba(0,251,251,0.6)';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#00fbfb';
        ctx.font = '11px var(--font-dm-sans)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(agent.title.split(' ')[1], x, y + 18);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section ref={ref} id="agents" className="min-h-screen py-24 px-8 flex items-center justify-center bg-dark">
      <div className="max-w-6xl mx-auto w-full">

        <div data-animate="fade-up" className="text-center mb-4">
          <h2 className="text-5xl font-bold">Los 3 Agentes Operativos</h2>
        </div>
        <div data-animate="fade-up" className="anim-d100 text-center mb-16">
          <p className="text-gray-400">Sistema de IA que funciona 24/7 sin intervención humana</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Canvas del diagrama */}
          <div data-animate="fade-up" className="anim-d100 rounded-lg border border-gray-700 bg-gray-900/50 p-8 h-96">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          {/* Cards de agentes */}
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
