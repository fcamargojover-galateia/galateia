export default function Social() {
  const metrics = [
    { value: '−78%', label: 'No-shows reducidos', color: 'text-red' },
    { value: '+3h', label: 'Tiempo recepción liberado', color: 'text-green' },
    { value: '21 días', label: 'Implementación', color: 'text-cyan' },
    { value: '$0', label: 'Inversión en ads', color: 'text-cyan' },
  ];

  return (
    <section className="py-24 px-8 bg-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4">Resultados Comprobados</h2>
        <p className="text-center text-gray-400 mb-16">Clínicas que usan GalateIA reportan</p>

        <div className="grid md:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <div key={i} className="text-center p-8 rounded-lg border border-gray-700 bg-gray-900/50 hover:bg-gray-800 transition">
              <div className={`text-5xl font-bold mb-3 ${metric.color}`}>{metric.value}</div>
              <div className="text-gray-400">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
