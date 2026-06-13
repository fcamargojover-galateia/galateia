'use client';

import { Star } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Pricing() {
  const { ref } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="pricing" className="py-24 px-8 bg-dark">
      <div className="max-w-6xl mx-auto">

        <div data-animate="fade-up" className="text-center mb-4">
          <h2 className="text-5xl font-bold">Inversión</h2>
        </div>
        <div data-animate="fade-up" className="anim-d100 text-center mb-16">
          <p className="text-gray-400">Setup único + retorno mensual desde el primer mes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Sin GalateIA */}
          <div data-animate="slide-left" className="p-8 rounded-lg border border-gray-700 bg-gray-900/50">
            <h3 className="text-2xl font-bold mb-2">Sin GalateIA</h3>
            <p className="text-gray-400 text-sm mb-6">Lo que perdés cada mes sin saberlo</p>
            <div className="space-y-4 text-gray-400">
              <div className="flex justify-between">
                <span>No-shows sin recuperar</span>
                <span style={{ color: 'var(--red)' }}>~$1,200/mes</span>
              </div>
              <div className="flex justify-between">
                <span>Tiempo administrativo perdido</span>
                <span style={{ color: 'var(--red)' }}>~$800/mes</span>
              </div>
              <div className="flex justify-between">
                <span>Fricción en recepción</span>
                <span style={{ color: 'var(--red)' }}>~$500/mes</span>
              </div>
              <div className="pt-6 border-t border-gray-700 flex justify-between font-bold text-white">
                <span>Pérdida mensual estimada</span>
                <span style={{ color: 'var(--red)' }}>~$2,500/mes</span>
              </div>
            </div>
          </div>

          {/* Con GalateIA */}
          <div
            data-animate="slide-right"
            className="glow-cyan-pulse p-8 rounded-lg border border-cyan bg-gradient-to-br from-cyan/10 to-dark"
          >
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'linear-gradient(135deg, var(--cyan) 0%, #00c8c8 100%)',
                color: 'var(--dark)', padding: '5px 14px', borderRadius: '20px',
                fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em',
                marginBottom: '16px', boxShadow: '0 0 16px rgba(0,251,251,0.4)',
              }}
            >
              <Star size={11} strokeWidth={2.5} />
              RECOMENDADO
            </div>
            <h3 className="text-2xl font-bold mb-6">Con GalateIA</h3>
            <div className="space-y-4">
              <div className="flex justify-between font-bold">
                <span>Setup inicial (pago único)</span>
                <span className="text-cyan">$1,900</span>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Mantenimiento mensual</span>
                  <span className="text-cyan font-bold">$290/mes</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-3">Ahorro estimado según volumen de clínica:</p>
                <div
                  className="w-full text-center py-3 rounded-lg font-bold text-lg"
                  style={{
                    background: 'rgba(0,251,251,0.08)',
                    border: '1px solid rgba(0,251,251,0.25)',
                    color: '#00FBFB',
                    letterSpacing: '0.03em',
                  }}
                >
                  $1,500 — $2,500 recuperados/mes
                </div>
              </div>
              <div className="pt-2">
                <button
                  aria-label="Agendar diagnóstico gratuito"
                  className="w-full bg-cyan text-dark py-3 rounded font-bold hover:bg-white active:scale-95 transition-all mt-2 cursor-pointer"
                >
                  Agendar Diagnóstico Gratuito
                </button>
                <p className="text-center text-gray-400 text-xs mt-3">
                  15 minutos · Sin compromiso · Estimamos tu ROI en la llamada
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
