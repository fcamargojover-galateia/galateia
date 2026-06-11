'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import TimelineScene from './TimelineScene';

interface TimelineCanvasProps {
  scrollProgress: number;
}

// P5 — shown when WebGL is not available
function WebGLFallback() {
  return (
    <div className="w-full h-screen bg-dark flex items-center justify-center">
      <p className="text-gray-400 text-sm">
        Tu navegador no soporta WebGL — actualizá para ver el timeline interactivo.
      </p>
    </div>
  );
}

export default function TimelineCanvas({ scrollProgress }: TimelineCanvasProps) {
  // P5 — detect WebGL support before mounting Canvas
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      const ctx = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (!ctx) setWebglOk(false);
    } catch {
      setWebglOk(false);
    }
  }, []);

  // P6 — pause render loop when section is off-screen
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!webglOk) return <WebGLFallback />;

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-dark overflow-visible">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        // P6 — only run render loop when section is in viewport
        frameloop={isVisible ? 'always' : 'demand'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 5,
          pointerEvents: 'none',
        }}
        dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : [1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, 5]} intensity={0.3} />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={300}
            mipmapBlur={true}
          />
        </EffectComposer>

        <TimelineScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
