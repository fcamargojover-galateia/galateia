'use client';

import { useRef, useEffect } from 'react';
import TimelineCanvas from '@components/3d/TimelineCanvas';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline3D() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const spiralStateRef = useRef({
    rotation: 0,
    position: 0,
  });

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const tl = gsap.to(spiralStateRef.current, {
      rotation: Math.PI * 4,
      position: 12,
      duration: 1,
      scrollTrigger: {
        trigger: scrollContainer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <section className="relative w-full">
      {/* Canvas 3D fijo */}
      <TimelineCanvas spiralStateRef={spiralStateRef} />

      {/* Contenedor de scroll invisible para habilitar scroll */}
      <div
        ref={scrollContainerRef}
        className="relative w-full h-[400vh] pointer-events-none"
      />
    </section>
  );
}
