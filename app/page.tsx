'use client';

import { useRef, useEffect } from 'react';
import TimelineCanvas from '@/components/TimelineCanvas';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TimelinePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const spiralStateRef = useRef({
    rotation: 0,
    position: 0,
  });

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // GSAP ScrollTrigger: Mapea el scroll a valores de rotación y posición
    gsap.to(spiralStateRef.current, {
      rotation: Math.PI * 4, // 2 vueltas completas = 4π
      position: 12, // Sube 12 unidades en Y
      scrollTrigger: {
        trigger: scrollContainer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // 1 segundo de smoothing
        markers: false, // Cambia a true para debug
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full h-full">
      {/* Canvas fijo en la pantalla */}
      <TimelineCanvas spiralStateRef={spiralStateRef} />

      {/* Contenedor de scroll para habilitar scrollbar */}
      <div
        ref={scrollContainerRef}
        className="relative w-full h-[400vh] pointer-events-none"
        style={{
          // Este div es invisible pero proporciona altura para el scroll
          background: 'transparent',
        }}
      />
    </div>
  );
}
