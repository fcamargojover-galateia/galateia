'use client';

import { useRef, useEffect, useState } from 'react';
import { useScrollReveal, useCounter } from '@/hooks/useScrollReveal';

const METRICS = [
  { prefix: '−', num: 78, suffix: '%',     label: 'No-shows reducidos',        color: 'text-red',   delay: '' },
  { prefix: '+', num: 3,  suffix: 'h',     label: 'Tiempo recepción liberado', color: 'text-green', delay: 'anim-d150' },
  { prefix: '',  num: 21, suffix: ' días', label: 'Implementación',            color: 'text-cyan',  delay: 'anim-d300' },
  { prefix: '$', num: 0,  suffix: '',      label: 'Inversión en ads',          color: 'text-cyan',  delay: 'anim-d400' },
];

function MetricCard({ prefix, num, suffix, label, color, delay }: typeof METRICS[0]) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCounter(num, 1400, active);
  const done  = active && count >= num;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      data-animate="fade-up"
      className={`${delay} card-hover text-center p-8 rounded-lg border border-gray-700 bg-gray-900/50`}
    >
      <div
        className={`text-5xl font-bold mb-3 ${color} ${done ? 'number-glow' : ''}`}
        aria-live={done ? 'polite' : 'off'}
        aria-atomic="true"
      >
        {prefix}{count}{suffix}
      </div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

export default function Social() {
  const { ref } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 px-8 bg-dark">
      <div className="max-w-6xl mx-auto">
        <div data-animate="fade-up" className="text-center mb-4">
          <h2 className="text-3xl sm:text-5xl font-bold">Lo que el sistema produce</h2>
        </div>
        <div data-animate="fade-up" className="anim-d100 text-center mb-16">
          <p className="text-gray-400">Proyecciones basadas en el comportamiento del sistema en clínicas con +100 citas/mes</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {METRICS.map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
