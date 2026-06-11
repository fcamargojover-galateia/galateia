'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Calculator() {
  const [citasUBI, setCitasUBI] = useState(100);
  const [noShowRate, setNoShowRate] = useState(25);
  const [valorConsulta, setValorConsulta] = useState(150);
  const { ref } = useScrollReveal<HTMLElement>();

  const noShowCount   = Math.round((citasUBI * noShowRate) / 100);
  const costoMensual  = noShowCount * valorConsulta;
  const costoAnual    = costoMensual * 12;

  return (
    <section ref={ref} className="relative min-h-dvh py-24 px-8 flex items-center justify-center bg-dark overflow-hidden">
      {/* Gradiente rojo/oscuro esquina superior derecha */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 45% at 100% 0%, rgba(255,60,60,0.09) 0%, transparent 65%)',
        }}
      />
      <div className="relative max-w-5xl mx-auto w-full">

        <div data-animate="fade-up" className="text-center mb-4">
          <h2 className="text-5xl font-bold">¿Cuánto te cuesta?</h2>
        </div>
        <div data-animate="fade-up" className="anim-d100 text-center mb-16">
          <p className="text-gray-400">Calculá el impacto de los no-shows en tu clínica</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Slider 1 */}
          <div data-animate="fade-up" className="space-y-6">
            <div>
              <label htmlFor="citas" className="block text-sm text-gray-400 mb-4 font-semibold">Citas mensuales</label>
              <input
                id="citas"
                type="range" min="10" max="500" step="10"
                value={citasUBI}
                onChange={(e) => setCitasUBI(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan"
              />
              <div className="text-4xl font-bold text-cyan mt-6">{citasUBI}</div>
            </div>
          </div>

          {/* Slider 2 */}
          <div data-animate="fade-up" className="anim-d150 space-y-6">
            <div>
              <label htmlFor="noshows" className="block text-sm text-gray-400 mb-4 font-semibold">% No-shows</label>
              <input
                id="noshows"
                type="range" min="1" max="50" step="1"
                value={noShowRate}
                onChange={(e) => setNoShowRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan"
              />
              <div className="text-4xl font-bold text-cyan mt-6">{noShowRate}%</div>
            </div>
          </div>

          {/* Slider 3 */}
          <div data-animate="fade-up" className="anim-d300 space-y-6">
            <div>
              <label htmlFor="valor" className="block text-sm text-gray-400 mb-4 font-semibold">Valor USD/consulta</label>
              <input
                id="valor"
                type="range" min="30" max="500" step="10"
                value={valorConsulta}
                onChange={(e) => setValorConsulta(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan"
              />
              <div className="text-4xl font-bold text-cyan mt-6">${valorConsulta}</div>
            </div>
          </div>
        </div>

        {/* Resultados — entra desde la derecha */}
        <div data-animate="slide-right" className="anim-d200 mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-700">
            <div className="text-sm text-gray-400 mb-3">No-shows mensuales</div>
            <div className="text-5xl font-bold text-red">{noShowCount}</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-700">
            <div className="text-sm text-gray-400 mb-3">Costo mensual</div>
            <div className="text-5xl font-bold text-cyan">${costoMensual.toLocaleString()}</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-700">
            <div className="text-sm text-gray-400 mb-3">Costo anual</div>
            <div className="text-5xl font-bold text-red">${costoAnual.toLocaleString()}</div>
          </div>
        </div>

      </div>
    </section>
  );
}
