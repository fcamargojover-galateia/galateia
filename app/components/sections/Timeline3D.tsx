'use client';

import { useRef, useEffect, useState } from 'react';
import TimelineCanvas from '@components/3d/TimelineCanvas';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Crear animación que controla el progreso de scroll (0 a 1)
    const tl = gsap.to(
      { progress: 0 },
      {
        progress: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true, // Reversible con scroll
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[600vh]"
    >
      {/* Canvas 3D en posición sticky */}
      <div className="sticky top-0 h-screen w-full">
        <TimelineCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Contenedor invisible que proporciona altura para scroll */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" />
    </section>
  );
}
