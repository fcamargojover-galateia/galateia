'use client';

import WhatsAppPreview from './WhatsAppPreview';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 px-8 flex items-center overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">

        {/* Layout dos columnas */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Columna izquierda: copy */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Sistema Operativo de{' '}
              <span className="text-cyan">Retención</span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0">
              Reduce no-shows, elimina fricción en recepción y reactiva pacientes inactivos con agentes de IA autónomos.
            </p>

            <button className="px-8 py-4 bg-cyan text-dark font-bold rounded-lg hover:bg-white transition text-lg">
              Diagnóstico Operativo (15 min)
            </button>

            {/* Métricas */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-cyan">−78%</div>
                <div className="text-xs text-gray-400 mt-1">No-shows reducidos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">+3h</div>
                <div className="text-xs text-gray-400 mt-1">Recepción liberada</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan">21d</div>
                <div className="text-xs text-gray-400 mt-1">Implementación</div>
              </div>
            </div>
          </div>

          {/* Columna derecha: chat WhatsApp animado */}
          <div className="flex-shrink-0 flex justify-center lg:justify-end w-full lg:w-auto">
            <WhatsAppPreview />
          </div>

        </div>
      </div>
    </section>
  );
}
