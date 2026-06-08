'use client';

import { useRef, useEffect } from 'react';
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
    scale: 0,
    x: 0,
    rotationY: 0,
    opacity: 0,
  });

  const NODE_HEIGHT = 5;
  const OFFSET_DISTANCE = 5;
  const side = index % 2 === 0 ? -1 : 1; // Alternando izquierda/derecha
  const yPosition = -index * NODE_HEIGHT;

  // Calcular el progreso específico para este nodo
  const nodeStart = index / totalNodes;
  const nodeEnd = (index + 1) / totalNodes;
  const nodeProgress = Math.max(0, Math.min(1, (scrollProgress - nodeStart) / (nodeEnd - nodeStart)));

  // Efecto especial para primer nodo
  const isFirstNode = index === 0;

  useFrame(() => {
    if (!groupRef.current) return;

    // Animación de escala
    if (isFirstNode) {
      // Primer nodo: pop effect (0 → 1.2 → 1)
      const targetScale = nodeProgress < 0.5
        ? 1.2 * (nodeProgress * 2)
        : 1.2 - (nodeProgress - 0.5) * 2 * 0.2;
      stateRef.current.scale = THREE.MathUtils.damp(
        stateRef.current.scale,
        Math.max(0, targetScale),
        0.15,
        1 / 60
      );
    } else {
      // Otros nodos: scale 0 → 1
      const targetScale = nodeProgress;
      stateRef.current.scale = THREE.MathUtils.damp(
        stateRef.current.scale,
        targetScale,
        0.1,
        1 / 60
      );
    }

    // Desplazamiento lateral (X)
    const targetX = side * OFFSET_DISTANCE * nodeProgress;
    stateRef.current.x = THREE.MathUtils.damp(
      stateRef.current.x,
      targetX,
      0.12,
      1 / 60
    );

    // Rotación sobre eje Y
    const targetRotation = side * Math.PI * 2 * nodeProgress;
    stateRef.current.rotationY = THREE.MathUtils.damp(
      stateRef.current.rotationY,
      targetRotation,
      0.1,
      1 / 60
    );

    // Opacidad
    const targetOpacity = nodeProgress;
    stateRef.current.opacity = THREE.MathUtils.damp(
      stateRef.current.opacity,
      targetOpacity,
      0.1,
      1 / 60
    );

    // Aplicar transformaciones
    groupRef.current.position.x = stateRef.current.x;
    groupRef.current.position.y = yPosition;
    groupRef.current.scale.set(
      stateRef.current.scale,
      stateRef.current.scale,
      stateRef.current.scale
    );
    groupRef.current.rotation.y = stateRef.current.rotationY;

    // Actualizar opacidad de materiales
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat: THREE.Material) => {
            if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhongMaterial) {
              mat.transparent = true;
              (mat as any).opacity = stateRef.current.opacity;
            }
          });
        } else {
          const mat = child.material as any;
          if (mat.opacity !== undefined) {
            mat.transparent = true;
            mat.opacity = stateRef.current.opacity;
          }
        }
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, yPosition, 0]}>
      {/* Esfera del nodo */}
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

      {/* Torus de glow alrededor */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.65, 0.08, 12, 32]} />
        <meshStandardMaterial
          color={new THREE.Color('#00fbfb')}
          emissive={new THREE.Color('#00fbfb')}
          emissiveIntensity={1.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Texto HTML */}
      <Html
        position={[1.5, 0, 0]}
        scale={0.012}
        distanceFactor={1}
        occlude="blending"
      >
        <div className="w-80 text-white bg-dark/80 backdrop-blur-sm rounded-lg p-6 border border-cyan/30">
          <div className="text-xs font-mono text-cyan mb-2 tracking-widest">{data.day}</div>
          <div className="text-xl font-bold text-white mb-3">{data.title}</div>
          <div className="text-sm text-gray-300 leading-relaxed">{data.description}</div>
        </div>
      </Html>
    </group>
  );
}
