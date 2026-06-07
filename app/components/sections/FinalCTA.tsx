export default function FinalCTA() {
  return (
    <section className="py-32 px-8 bg-gradient-to-b from-dark to-black">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          ¿Cuánto dinero pierdes cada mes?
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          El costo de no tomar acción es mayor que la inversión en automatización.
        </p>

        <div className="space-y-6">
          <button className="w-full md:w-auto px-10 py-4 bg-cyan text-dark font-bold rounded-lg hover:bg-white transition text-lg">
            Agendar Diagnóstico Operativo
          </button>
          <p className="text-sm text-gray-500">
            15 minutos. Sin compromiso. Conocé cuánto podés ahorrar.
          </p>
        </div>

        <div className="mt-20 pt-12 border-t border-gray-700">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold mb-2">Implementación rápida</h3>
              <p className="text-gray-400 text-sm">21 días completos de setup</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-bold mb-2">Seguridad garantizada</h3>
              <p className="text-gray-400 text-sm">HIPAA, PDPA, encriptado</p>
            </div>
            <div>
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-bold mb-2">ROI comprobado</h3>
              <p className="text-gray-400 text-sm">21 días para recuperar inversión</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-gray-500 text-sm">
          <p>GalateIA © 2024 — Firma de Automatización e Infraestructura Operativa</p>
          <p className="mt-2">Construyendo sistemas autónomos para clínicas privadas</p>
        </div>
      </div>
    </section>
  );
}
