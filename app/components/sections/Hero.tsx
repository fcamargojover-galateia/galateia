'use client';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 px-8 flex items-center justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Título */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
          Sistema Operativo de{' '}
          <span className="text-cyan">Retención</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Reduce no-shows, elimina fricción en recepción y reactiva pacientes inactivos con agentes de IA autónomos.
        </p>

        {/* CTA */}
        <button className="px-8 py-4 bg-cyan text-dark font-bold rounded-lg hover:bg-white transition mb-16 text-lg">
          Diagnóstico Operativo (15 min)
        </button>

        {/* Dashboard animado */}
        <div className="relative mt-20 rounded-lg border border-gray-700 bg-dark/50 p-8 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-8">
            {/* Métrica 1 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan mb-2">−78%</div>
              <div className="text-sm text-gray-400">No-shows reducidos</div>
            </div>

            {/* Métrica 2 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-green mb-2">+3h</div>
              <div className="text-sm text-gray-400">Tiempo recepción liberado</div>
            </div>

            {/* Métrica 3 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan mb-2">21 días</div>
              <div className="text-sm text-gray-400">Implementación</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
