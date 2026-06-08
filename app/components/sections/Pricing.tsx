'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Pricing() {
  const { ref } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 px-8 bg-dark">
      <div className="max-w-6xl mx-auto">

        <div data-animate="fade-up" className="text-center mb-4">
          <h2 className="text-5xl font-bold">Inversión</h2>
        </div>
        <div data-animate="fade-up" className="anim-d100 text-center mb-16">
          <p className="text-gray-400">Setup único + retorno mensual garantizado</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Sin GalateIA — entra desde la izquierda */}
          <div data-animate="slide-left" className="p-8 rounded-lg border border-gray-700 bg-gray-900/50">
            <h3 className="text-2xl font-bold mb-6">Sin GalateIA</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex justify-between">
                <span>Recepcionista (1.5 FTE)</span>
                <span className="text-red">$4,500/mes</span>
              </div>
              <div className="flex justify-between">
                <span>No-shows (fricciones)</span>
                <span className="text-red">~$5,000/mes</span>
              </div>
              <div className="flex justify-between">
                <span>Tiempo administrativo perdido</span>
                <span className="text-red">Incalculable</span>
              </div>
              <div className="pt-6 border-t border-gray-700 mt-6 flex justify-between font-bold">
                <span>Costo mensual</span>
                <span className="text-red">$9,500+</span>
              </div>
            </div>
          </div>

          {/* Con GalateIA — entra desde la derecha + glow pulsante */}
          <div
            data-animate="slide-right"
            className="glow-cyan-pulse p-8 rounded-lg border border-cyan bg-gradient-to-br from-cyan/10 to-dark"
          >
            <div className="inline-block bg-green text-dark px-3 py-1 rounded text-sm font-bold mb-4">RECOMENDADO</div>
            <h3 className="text-2xl font-bold mb-6">Con GalateIA</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-green font-bold">
                <span>Setup inicial</span>
                <span>$1,900</span>
              </div>
              <div className="pt-4 border-t border-gray-700 mt-4">
                <div className="text-sm text-gray-400 mb-4">Recurrente mensual:</div>
                <div className="flex justify-between mb-2">
                  <span>Mantenimiento + mejoras</span>
                  <span className="text-green">$290/mes</span>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-700 mt-6">
                <div className="flex justify-between font-bold mb-4">
                  <span>ROI en 21 días</span>
                  <span className="text-green">+$8,000</span>
                </div>
                <button className="w-full bg-cyan text-dark py-3 rounded font-bold hover:bg-white transition">
                  Contratar Diagnóstico
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
