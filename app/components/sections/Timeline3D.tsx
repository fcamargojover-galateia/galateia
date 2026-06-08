'use client';

import { useRef, useEffect } from 'react';
import TimelineCanvas from '@components/3d/TimelineCanvas';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spiralStateRef = useRef({
    rotation: 0,
    position: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.to(spiralStateRef.current, {
      rotation: Math.PI * 4,
      position: 12,
      duration: 1,
      scrollTrigger: {
        trigger: section,
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
    <section
      ref={sectionRef}
      className="relative w-full h-[500vh]"
    >
      {/* Canvas 3D en posición relativa dentro de la sección */}
      <div className="sticky top-0 h-screen w-full">
        <TimelineCanvas spiralStateRef={spiralStateRef} />
      </div>

      {/* Contenedor invisible que proporciona altura para scroll */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" />
    </section>
  );
}
