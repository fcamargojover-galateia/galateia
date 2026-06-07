'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Cuánto tiempo tarda la implementación?',
      a: '21 días. Diagnóstico (día 1), construcción (días 2-15), integración y testing (días 16-20), encendido (día 21).',
    },
    {
      q: '¿Es compatible con mi CRM/calendario actual?',
      a: 'Sí. Trabajamos con Clinics Pro, Google Calendar, Outlook, MiConsultorio y más. Si usas algo diferente, hacemos custom integration.',
    },
    {
      q: '¿Qué pasa si hay un problema?',
      a: 'Incluye soporte 24/7. Nuestros agentes están monitoreados. Ante cualquier caída o error, reaccionamos en menos de 30 minutos.',
    },
    {
      q: '¿Puedo escalarlo después?',
      a: 'Completamente. Empezamos con 1 agente y escalamos a 3. Si necesitas más capacidad, agregamos recursos sin parar el sistema.',
    },
    {
      q: '¿Qué pasa con los datos de mis pacientes?',
      a: 'Todo encriptado. Cumplimos HIPAA, PDPA y regulaciones locales. Nunca compartimos datos con terceros.',
    },
  ];

  return (
    <section id="faq" className="py-24 px-8 bg-dark">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4">Preguntas Frecuentes</h2>
        <p className="text-center text-gray-400 mb-16">Todo lo que necesitas saber</p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/50 hover:bg-gray-800 transition"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold hover:text-cyan transition"
              >
                <span>{faq.q}</span>
                <span className={`text-cyan transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 py-4 bg-black/20 text-gray-300 border-t border-gray-700">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
