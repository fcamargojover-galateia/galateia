'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import TimelineScene from './TimelineScene';

interface TimelineCanvasProps {
  scrollProgress: number;
}

export default function TimelineCanvas({ scrollProgress }: TimelineCanvasProps) {
  return (
    <div className="relative w-full h-screen bg-dark overflow-visible">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
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

        {/* Post-processing effects */}
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
