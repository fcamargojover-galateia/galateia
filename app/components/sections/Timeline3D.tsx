'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// TBT — GSAP loaded dynamically inside the effect, not at module parse time
// This keeps the Timeline3D chunk ~50kB lighter and defers ScrollTrigger init

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

const STEP_THRESHOLDS = [0.10, 0.35, 0.60, 0.85];
const STEP_TARGETS    = [0.10, 0.37, 0.60, 0.86];

export default function Timeline3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // CLS — initialize synchronously (ssr:false → window always available on mount)
  // Mobile check: skip Three.js entirely on viewports <768px — 982KB bundle saved
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const isMobile = window.innerWidth < 768;

  // Listen for preference changes (e.g. user toggles OS setting mid-session)
  useEffect(() => {
    const mq      = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // TBT — dynamic import of GSAP so it loads in its own async chunk,
  // not bundled into Timeline3D on first execution
  useEffect(() => {
    if (isMobile || reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    let isMounted = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cleanup: { tl: any; ST: any } = { tl: null, ST: null };

    Promise.all([
      import('gsap').then(m => m.default),
      import('gsap/ScrollTrigger').then(m => m.ScrollTrigger),
    ]).then(([gsap, ScrollTrigger]) => {
      if (!isMounted || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      cleanup.ST = ScrollTrigger;

      cleanup.tl = gsap.to(
        { progress: 0 },
        {
          progress: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => setScrollProgress(self.progress),
          },
        }
      );
    });

    return () => {
      isMounted = false;
      cleanup.ST?.getAll().forEach((t: { kill: () => void }) => t.kill());
      cleanup.tl?.kill();
    };
  }, [reducedMotion]);

  const activeStep  = STEP_THRESHOLDS.findIndex((t) => scrollProgress < t);
  const currentStep = activeStep === -1 ? 3 : activeStep;

  const handleStepClick = (stepIndex: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop  = section.getBoundingClientRect().top + window.scrollY;
    const vh          = window.innerHeight;
    const startScroll = sectionTop - 0.8 * vh;
    const endScroll   = sectionTop + section.offsetHeight - vh;
    const target      = startScroll + STEP_TARGETS[stepIndex] * (endScroll - startScroll);
    window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
  };

  if (isMobile || reducedMotion) {
    return (
      <section className="py-24 px-8 bg-dark" aria-label="Proceso de implementación en 21 días">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold">Implementación en 21 días</h2>
            <p className="text-gray-400 mt-4">Sin interrumpir tu operación</p>
          </div>
          <ol className="space-y-10">
            {STEPS.map((step, i) => (
              <li key={i} className="flex flex-col sm:flex-row sm:gap-8 sm:items-start">
                <div
                  className="font-mono font-bold text-sm uppercase tracking-widest mb-2 sm:mb-0 sm:shrink-0 sm:pt-1"
                  style={{ color: 'var(--cyan)', minWidth: '96px' }}
                >
                  {step.day}
                </div>
                <div className="border-l border-gray-700 pl-6">
                  <h3 className="font-bold text-lg sm:text-xl mb-2">{step.title}</h3>
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
    // CLS — explicit inline height guarantees the section occupies 600vh before and after JS loads,
    // matching the loading skeleton in page.tsx exactly
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '600vh' }}
      aria-label="Proceso de implementación en 21 días"
    >
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

      <div className="sticky top-0 h-screen w-full">
        <TimelineCanvas scrollProgress={scrollProgress} />

        <nav
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 items-center"
          aria-label="Pasos del proceso de implementación"
          style={{
            background: 'rgba(8, 8, 10, 0.72)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            borderRadius: '999px',
            padding: '6px 8px',
          }}
        >
          {STEPS.map((step, i) => (
            <button
              key={i}
              onClick={() => handleStepClick(i)}
              aria-label={`Ir a ${step.day}: ${step.title}`}
              aria-current={i === currentStep ? 'step' : undefined}
              className="cursor-pointer flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-full"
              style={{ background: 'none', border: 'none', padding: '5px 10px', gap: '7px' }}
            >
              <div
                className="shrink-0"
                style={{
                  width: '20px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === currentStep ? 'var(--cyan)' : 'rgba(255,255,255,0.3)',
                  boxShadow: i === currentStep ? '0 0 10px rgba(0,251,251,0.75)' : 'none',
                  transform: i === currentStep ? 'scaleX(1)' : 'scaleX(0.3)',
                  transformOrigin: 'center',
                  transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                }}
              />
              <span
                className="whitespace-nowrap overflow-hidden"
                style={{
                  width: i === currentStep ? 'auto' : '0',
                  opacity: i === currentStep ? 1 : 0,
                  color: 'var(--cyan)',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'opacity 0.3s ease',
                }}
              >
                {step.day}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" />
    </section>
  );
}
