'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import TimelineNode from './TimelineNode';

interface TimelineSceneProps {
  scrollProgress: number;
}

const TIMELINE_DATA = [
  {
    id: 0,
    day: 'Día 1',
    title: 'Diagnóstico Operativo',
    description: '15 minutos. Vos hablás, nosotros escuchamos.',
  },
  {
    id: 1,
    day: 'Días 2-7',
    title: 'Construcción',
    description: 'Construimos la infraestructura en nuestro entorno.',
  },
  {
    id: 2,
    day: 'Días 8-20',
    title: 'Integración y Testing',
    description: 'Conectamos sobre tus sistemas actuales.',
  },
  {
    id: 3,
    day: 'Día 21',
    title: 'Encendido',
    description: 'Giramos el interruptor. El sistema opera solo.',
  },
];

export default function TimelineScene({ scrollProgress }: TimelineSceneProps) {
  const cameraRef = useRef<THREE.Camera | null>(null);
  const { camera } = useThree();
  cameraRef.current = camera;

  const axisGroupRef = useRef<THREE.Group>(null);

  // Animar cámara en primer nodo
  useFrame(() => {
    if (scrollProgress < 0.25 && cameraRef.current) {
      // Zoom suave en el primer nodo
      const targetZ = 10 - scrollProgress * 2;
      cameraRef.current.position.z = THREE.MathUtils.damp(
        cameraRef.current.position.z,
        targetZ,
        0.1,
        1 / 60
      );
    }
  });

  return (
    <group>
      {/* EJE CENTRAL - Línea brillante y fija */}
      <group ref={axisGroupRef}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 30, 8]} />
          <meshStandardMaterial
            color={new THREE.Color('#00fbfb')}
            emissive={new THREE.Color('#00fbfb')}
            emissiveIntensity={1.5}
            wireframe={false}
          />
        </mesh>
      </group>

      {/* NODOS de TIMELINE - Desenrollado desde eje */}
      {TIMELINE_DATA.map((node, index) => (
        <TimelineNode
          key={node.id}
          index={index}
          data={node}
          scrollProgress={scrollProgress}
          totalNodes={TIMELINE_DATA.length}
        />
      ))}
    </group>
  );
}
