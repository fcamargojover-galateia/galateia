'use client';

import { useState } from 'react';

export default function Calculator() {
  const [citasUBI, setCitasUBI] = useState(100);
  const [noShowRate, setNoShowRate] = useState(25);
  const [valorConsulta, setValorConsulta] = useState(150);

  const noShowCount = Math.round((citasUBI * noShowRate) / 100);
  const costoMensual = noShowCount * valorConsulta;
  const costoAnual = costoMensual * 12;

  return (
    <section className="min-h-screen py-24 px-8 flex items-center justify-center bg-dark">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-5xl font-bold text-center mb-4">¿Cuánto te cuesta?</h2>
        <p className="text-center text-gray-400 mb-16">Calculá el impacto de los no-shows en tu clínica</p>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Slider 1: Citas mensuales */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-4 font-semibold">Citas mensuales</label>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={citasUBI}
                onChange={(e) => setCitasUBI(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan"
              />
              <div className="text-4xl font-bold text-cyan mt-6">{citasUBI}</div>
            </div>
          </div>

          {/* Slider 2: % No-shows */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-4 font-semibold">% No-shows</label>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={noShowRate}
                onChange={(e) => setNoShowRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan"
              />
              <div className="text-4xl font-bold text-cyan mt-6">{noShowRate}%</div>
            </div>
          </div>

          {/* Slider 3: Valor promedio por consulta */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-4 font-semibold">Valor USD/consulta</label>
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={valorConsulta}
                onChange={(e) => setValorConsulta(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan"
              />
              <div className="text-4xl font-bold text-cyan mt-6">${valorConsulta}</div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
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
