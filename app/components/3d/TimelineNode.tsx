'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface TimelineNodeProps {
  index: number;
  data: {
    id: number;
    day: string;
    title: string;
    description: string;
  };
  scrollProgress: number;
  totalNodes: number;
}

export default function TimelineNode({
  index,
  data,
  scrollProgress,
  totalNodes,
}: TimelineNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const stateRef = useRef({
    scale: 1,
    x: 0,
    rotationY: 0,
    opacity: 1,
  });

  const NODE_HEIGHT = 5;
  const OFFSET_DISTANCE = 5;
  const side = index % 2 === 0 ? -1 : 1;
  const yPosition = -index * NODE_HEIGHT;

  // Calcular progreso específico del nodo
  const nodeStart = index / totalNodes;
  const nodeEnd = (index + 1) / totalNodes;
  const nodeProgress = Math.max(0, Math.min(1, (scrollProgress - nodeStart) / (nodeEnd - nodeStart)));

  const isFirstNode = index === 0;

  useFrame(() => {
    if (!groupRef.current) return;

    // Escala: siempre mínimo 0.1 para que esté visible
    let targetScale = 0.1 + nodeProgress * 0.9;
    if (isFirstNode) {
      // Primer nodo: pop effect (0.1 → 1.2 → 1)
      if (nodeProgress < 0.5) {
        targetScale = 0.1 + 1.2 * (nodeProgress * 2);
      } else {
        targetScale = 1.3 - (nodeProgress - 0.5) * 2 * 0.3;
      }
    }

    stateRef.current.scale = THREE.MathUtils.damp(
      stateRef.current.scale,
      Math.max(0.1, targetScale),
      0.15,
      1 / 60
    );

    // Desplazamiento lateral
    const targetX = side * OFFSET_DISTANCE * nodeProgress;
    stateRef.current.x = THREE.MathUtils.damp(
      stateRef.current.x,
      targetX,
      0.12,
      1 / 60
    );

    // Rotación
    const targetRotation = side * Math.PI * 2 * nodeProgress;
    stateRef.current.rotationY = THREE.MathUtils.damp(
      stateRef.current.rotationY,
      targetRotation,
      0.1,
      1 / 60
    );

    // Opacidad: mínimo 0.6 para que sea visible
    const targetOpacity = Math.max(0.6, nodeProgress);
    stateRef.current.opacity = THREE.MathUtils.damp(
      stateRef.current.opacity,
      targetOpacity,
      0.1,
      1 / 60
    );

    // Aplicar transformaciones al grupo
    groupRef.current.position.x = stateRef.current.x;
    groupRef.current.position.y = yPosition;
    groupRef.current.scale.set(
      stateRef.current.scale,
      stateRef.current.scale,
      stateRef.current.scale
    );
    groupRef.current.rotation.y = stateRef.current.rotationY;

    // Actualizar opacidad de materiales 3D
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = Array.isArray(child.material) ? child.material[0] : child.material;
        if (mat && 'opacity' in mat) {
          (mat as any).transparent = true;
          (mat as any).opacity = stateRef.current.opacity;
        }
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, yPosition, 0]}>
      {/* Esfera */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={new THREE.Color('#00fbfb')}
          emissive={new THREE.Color('#00fbfb')}
          emissiveIntensity={0.8}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Torus brillante */}
      <mesh>
        <torusGeometry args={[0.65, 0.08, 12, 32]} />
        <meshStandardMaterial
          color={new THREE.Color('#00fbfb')}
          emissive={new THREE.Color('#00fbfb')}
          emissiveIntensity={1.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Card de información */}
      <Html position={[1.5, 0, 0]} scale={0.012} distanceFactor={1}>
        <div className="w-80 text-white bg-dark/90 backdrop-blur-md rounded-lg p-6 border-2 border-cyan shadow-lg shadow-cyan/30 pointer-events-auto">
          <div className="text-xs font-mono text-cyan mb-2 tracking-widest uppercase font-bold">
            {data.day}
          </div>
          <div className="text-lg font-bold text-white mb-3">
            {data.title}
          </div>
          <div className="text-sm text-gray-300 leading-relaxed">
            {data.description}
          </div>
        </div>
      </Html>
    </group>
  );
}
