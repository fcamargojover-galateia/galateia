'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const FAQS = [
  { q: '¿Cuánto tiempo tarda y tengo que parar mi clínica?',
    a: '21 días. Y no, no parás nada. El día 1 hacemos un diagnóstico de 15 minutos. Los días 2 al 20 construimos e integramos en nuestro entorno mientras tu clínica opera con normalidad. El día 21 encendemos. Vos no tocás nada.' },
  { q: '¿Esto reemplaza a mi recepcionista?',
    a: 'No. La libera. En vez de responder el mismo WhatsApp 40 veces por día, tu recepcionista hace lo que requiere criterio humano — casos complejos, situaciones delicadas, decisiones que una IA no toma. El agente hace lo repetitivo. Tu equipo hace lo importante.' },
  { q: '¿Por qué no automatizo esto yo mismo con WhatsApp Business?',
    a: 'WhatsApp Business manda mensajes. No agenda, no confirma, no reactiva. Y cada mes que seguís usando solo eso, tus no-shows te siguen costando lo mismo. La herramienta gratuita tiene un costo que no aparece en ninguna factura.' },
  { q: '¿Funciona con el sistema que ya uso?',
    a: 'Sí. Integramos con Clinics Pro, Google Calendar, Outlook, MiConsultorio y más. Si usás algo diferente, hacemos integración custom. No reemplazamos nada de lo que ya tenés — nos montamos encima.' },
  { q: '¿Mis datos y los de mis pacientes están seguros?',
    a: 'Todo encriptado. Cumplimos HIPAA y GDPR. Nunca compartimos datos con terceros. Ante cualquier problema técnico respondemos en menos de 30 minutos.' },
];

const DELAYS = ['', 'anim-d100', 'anim-d200', 'anim-d300', 'anim-d400'];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="faq" className="py-24 px-8 bg-dark">
      <div className="max-w-3xl mx-auto">

        <div data-animate="fade-up" className="text-center mb-4">
          <h2 className="text-3xl sm:text-5xl font-bold">Preguntas Frecuentes</h2>
        </div>
        <div data-animate="fade-up" className="anim-d100 text-center mb-16">
          <p className="text-gray-400">Todo lo que necesitas saber</p>
        </div>

        <div className="space-y-0">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              data-animate="fade-up"
              className={`${DELAYS[i]} faq-item border border-gray-700 ${i > 0 ? 'border-t-0' : ''} ${i === 0 ? 'rounded-t-lg' : ''} ${i === FAQS.length - 1 ? 'rounded-b-lg' : ''} overflow-hidden bg-gray-900/50 hover:bg-gray-800 transition`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-label={faq.q}
                aria-expanded={openIndex === i}
                className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold hover:text-cyan transition cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className={`text-cyan transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>▼</span>
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
