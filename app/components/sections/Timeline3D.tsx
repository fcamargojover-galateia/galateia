'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TimelineCanvas = dynamic(() => import('@components/3d/TimelineCanvas'), { ssr: false });

const STEPS = [
  {
    day: 'DÍA 1',
    title: 'Diagnóstico Operativo',
    desc: '15 minutos de conversación. Vos hablás, nosotros escuchamos. Mapeamos tu flujo actual.',
  },
  {
    day: 'DÍAS 2-7',
    title: 'Construcción',
    desc: 'Construimos la infraestructura de IA en nuestro entorno. Vos continúas con tu operación normal.',
  },
  {
    day: 'DÍAS 8-20',
    title: 'Integración y testing',
    desc: 'Conectamos sobre tus sistemas actuales. Hacemos pruebas exhaustivas en tu CRM/Calendar.',
  },
  {
    day: 'DÍA 21',
    title: 'Encendido',
    desc: 'Giramos el interruptor. El sistema opera solo. Seguimiento y optimización mensual incluida.',
  },
];

// Scroll progress threshold where each step becomes "active"
const STEP_THRESHOLDS = [0.10, 0.35, 0.60, 0.85];

export default function Timeline3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // P1 — detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Skip GSAP entirely when reduced motion is active
  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.to(
      { progress: 0 },
      {
        progress: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, [reducedMotion]);

  // P8 — current active step for progress dots
  const activeStep = STEP_THRESHOLDS.findIndex((t) => scrollProgress < t);
  const currentStep = activeStep === -1 ? 3 : activeStep;

  // P1 — static accessible fallback for reduced-motion users
  if (reducedMotion) {
    return (
      <section className="py-24 px-8 bg-dark" aria-label="Proceso de implementación en 21 días">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold">Implementación en 21 días</h2>
            <p className="text-gray-400 mt-4">Sin interrumpir tu operación</p>
          </div>
          <ol className="space-y-10">
            {STEPS.map((step, i) => (
              <li key={i} className="flex gap-8 items-start">
                <div
                  className="font-mono font-bold text-sm uppercase tracking-widest shrink-0 pt-1"
                  style={{ color: 'var(--cyan)', width: '96px' }}
                >
                  {step.day}
                </div>
                <div className="border-l border-gray-700 pl-8">
                  <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[600vh]"
      aria-label="Proceso de implementación en 21 días"
    >
      {/* P2 — accessible content for screen readers (visually hidden) */}
      <div className="sr-only">
        <h2>Proceso de implementación en 21 días</h2>
        <ol>
          {STEPS.map((step, i) => (
            <li key={i}>
              <strong>{step.day}: {step.title}</strong> — {step.desc}
            </li>
          ))}
        </ol>
      </div>

      {/* Canvas 3D sticky */}
      <div className="sticky top-0 h-screen w-full">
        <TimelineCanvas scrollProgress={scrollProgress} />

        {/* P8 — step progress indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10"
          aria-hidden="true"
        >
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-300"
              style={{
                width: i === currentStep ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background:
                  i === currentStep ? 'var(--cyan)' : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Spacer for scroll height */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" />
    </section>
  );
}
