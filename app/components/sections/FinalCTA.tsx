'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function FinalCTA() {
  const { ref } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative py-32 px-8 bg-gradient-to-b from-dark to-black overflow-hidden">

      {/* Gradiente radial cyan pulsante — más intenso que otras secciones */}
      <div
        className="radial-pulse pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,251,251,0.22) 0%, rgba(0,251,251,0.06) 45%, transparent 70%)',
        }}
      />
      {/* Halo exterior más suave */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,251,251,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">

        <div data-animate="fade-up-lg">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            15 minutos para saber exactamente cuánto perdés.
          </h2>
        </div>

        <div data-animate="fade-up" className="anim-d100">
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Calculamos tu pérdida real, te mostramos el sistema en vivo y estimamos tu ROI. Sin compromiso. Sin letra chica.
          </p>
        </div>

        <div data-animate="fade-up" className="anim-d200 space-y-6">
          <button className="w-full md:w-auto px-10 py-4 bg-cyan text-dark font-bold rounded-lg hover:bg-white transition text-lg">
            Agendar Diagnóstico Operativo
          </button>
          <p className="text-sm text-gray-500">
            15 minutos. Sin compromiso. Conocé cuánto podés ahorrar.
          </p>
        </div>

        <div data-animate="fade-up" className="anim-d300 mt-20 pt-12 border-t border-gray-700">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold mb-2">Implementación rápida</h3>
              <p className="text-gray-400 text-sm">21 días completos de setup</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-bold mb-2">Seguridad garantizada</h3>
              <p className="text-gray-400 text-sm">HIPAA, GDPR, encriptado</p>
            </div>
            <div>
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-bold mb-2">ROI comprobado</h3>
              <p className="text-gray-400 text-sm">21 días para recuperar inversión</p>
            </div>
          </div>
        </div>

        <div data-animate="fade-up" className="anim-d400 mt-16 text-gray-500 text-sm">
          <p>GalateIA © 2024 — Firma de Automatización e Infraestructura Operativa</p>
          <p className="mt-2">Construyendo sistemas autónomos para clínicas privadas</p>
        </div>

      </div>
    </section>
  );
}
