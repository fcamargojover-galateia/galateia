'use client';

import { useState } from 'react';

export default function Calculator() {
  const [citasUBI, setCitasUBI] = useState(100);
  const [noShowRate, setNoShowRate] = useState(25);

  const noShowCount = Math.round((citasUBI * noShowRate) / 100);
  const costoHora = 120;
  const tiempoNoShow = 0.5;
  const costoMensual = noShowCount * costoHora * tiempoNoShow;
  const costoAnual = costoMensual * 12;

  return (
    <section className="min-h-screen py-24 px-8 flex items-center justify-center bg-dark">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4">¿Cuánto te cuesta?</h2>
        <p className="text-center text-gray-400 mb-16">Calcula el impacto de los no-shows en tu clínica</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="space-y-8">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Citas mensuales</label>
              <input
                type="range"
                min="10"
                max="1000"
                value={citasUBI}
                onChange={(e) => setCitasUBI(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-3xl font-bold text-cyan mt-2">{citasUBI}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">% No-shows</label>
              <input
                type="range"
                min="5"
                max="50"
                value={noShowRate}
                onChange={(e) => setNoShowRate(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-3xl font-bold text-red mt-2">{noShowRate}%</div>
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-6 bg-gray-900/50 rounded-lg p-8 border border-gray-700">
            <div>
              <div className="text-sm text-gray-400 mb-1">No-shows mensuales</div>
              <div className="text-4xl font-bold text-red">{noShowCount}</div>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-1">Costo mensual</div>
              <div className="text-4xl font-bold text-cyan">${costoMensual.toLocaleString()}</div>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Costo anual</div>
              <div className="text-4xl font-bold text-red">${costoAnual.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
