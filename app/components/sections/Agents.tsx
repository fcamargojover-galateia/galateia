'use client';

import { useEffect, useRef } from 'react';

export default function Agents() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 80;

      // Nodo central
      ctx.fillStyle = '#00fbfb';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.fill();

      // Texto central
      ctx.fillStyle = '#00fbfb';
      ctx.font = '12px var(--font-dm-mono)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GalateIA', centerX, centerY + 25);

      // 3 nodos secundarios
      const agents = [
        { name: 'Atención', angle: Math.PI / 2 },
        { name: 'Agenda', angle: (Math.PI / 2) + (Math.PI * 2) / 3 },
        { name: 'Reactivación', angle: (Math.PI / 2) + (Math.PI * 4) / 3 },
      ];

      agents.forEach((agent) => {
        const x = centerX + radius * Math.cos(agent.angle);
        const y = centerY + radius * Math.sin(agent.angle);

        // Línea
        ctx.strokeStyle = 'rgba(0, 251, 251, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Nodo
        ctx.fillStyle = 'rgba(0, 251, 251, 0.6)';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Texto
        ctx.fillStyle = '#00fbfb';
        ctx.font = '11px var(--font-dm-sans)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(agent.name, x, y + 18);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section id="agents" className="min-h-screen py-24 px-8 flex items-center justify-center bg-dark">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-5xl font-bold text-center mb-4">Los 3 Agentes Operativos</h2>
        <p className="text-center text-gray-400 mb-16">Sistema de IA que funciona 24/7 sin intervención humana</p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Canvas del diagrama */}
          <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-8 h-96">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          {/* Descripción de agentes */}
          <div className="space-y-6">
            {[
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
            ].map((agent, i) => (
              <div key={i} className="p-6 rounded-lg border border-gray-700 bg-gray-900/50 hover:bg-gray-800 transition">
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
