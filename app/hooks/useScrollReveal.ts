'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      container.querySelectorAll('[data-animate]').forEach(el => el.classList.add('in-view'));
      if (container.hasAttribute('data-animate')) container.classList.add('in-view');
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          container.querySelectorAll('[data-animate]').forEach(el => el.classList.add('in-view'));
          if (container.hasAttribute('data-animate')) container.classList.add('in-view');
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function useCounter(end: number, duration: number, active: boolean): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (end === 0) { setValue(0); return; }

    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, end, duration]);

  return value;
}
