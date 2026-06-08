'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import TimelineScene from './TimelineScene';

interface TimelineCanvasProps {
  spiralStateRef: React.MutableRefObject<{
    rotation: number;
    position: number;
  }>;
}

export default function TimelineCanvas({ spiralStateRef }: TimelineCanvasProps) {
  return (
    <div className="relative w-full h-screen bg-dark overflow-hidden">
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
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />

        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, 5]} intensity={0.4} />

        <TimelineScene spiralStateRef={spiralStateRef} />
      </Canvas>
    </div>
  );
}
