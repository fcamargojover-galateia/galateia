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

const timelineData = [
  {
    day: 'DÍA 1',
    title: 'Diagnóstico operativo',
    description:
      '15 minutos de conversación. Vos hablás, nosotros escuchamos. Mapeamos tu flujo actual.',
  },
  {
    day: 'DÍAS 2-7',
    title: 'Construcción',
    description:
      'Construimos la infraestructura de IA en nuestro entorno. Vos continúas con tu operación normal.',
  },
  {
    day: 'DÍAS 8-20',
    title: 'Integración y testing',
    description:
      'Conectamos sobre tus sistemas actuales. Hacemos pruebas exhaustivas en tu CRM/Calendar.',
  },
  {
    day: 'DÍA 21',
    title: 'Encendido',
    description:
      'Giramos el interruptor. El sistema opera solo. Seguimiento y optimización mensual incluida.',
  },
];

export default function TimelineNode({
  index,
  data,
  scrollProgress,
  totalNodes,
}: TimelineNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const htmlDivRef = useRef<HTMLDivElement>(null);
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

  const nodeStart = index / totalNodes;
  const nodeEnd = (index + 1) / totalNodes;
  const nodeProgress = Math.max(0, Math.min(1, (scrollProgress - nodeStart) / (nodeEnd - nodeStart)));
  const isFirstNode = index === 0;

  useFrame(() => {
    if (!groupRef.current) return;

    // Escala
    let targetScale = 0.1 + nodeProgress * 0.9;
    if (isFirstNode) {
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

    // Desplazamiento
    const targetX = side * OFFSET_DISTANCE * nodeProgress;
    stateRef.current.x = THREE.MathUtils.damp(stateRef.current.x, targetX, 0.12, 1 / 60);

    // Rotación
    const targetRotation = side * Math.PI * 2 * nodeProgress;
    stateRef.current.rotationY = THREE.MathUtils.damp(
      stateRef.current.rotationY,
      targetRotation,
      0.1,
      1 / 60
    );

    // Opacidad
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

    // Animar opacidad del Html
    if (htmlDivRef.current) {
      htmlDivRef.current.style.opacity = String(stateRef.current.opacity);
    }
  });

  const nodeData = timelineData[index] || data;

  return (
    <group ref={groupRef} position={[0, yPosition, 0]}>
      {/* Card de información con Html */}
      <Html transform center>
        <div
          ref={htmlDivRef}
          style={{
            width: '280px',
            padding: '24px',
            background: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(0, 251, 251, 0.4)',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
            pointerEvents: 'none',
            opacity: 0.6,
            transition: 'opacity 0.3s ease',
          }}
        >
          <p
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '11px',
              color: '#00FBFB',
              letterSpacing: '0.2em',
              marginBottom: '8px',
              margin: 0,
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            {nodeData.day}
          </p>
          <h3
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '18px',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '12px',
              margin: '8px 0',
            }}
          >
            {nodeData.title}
          </h3>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            {nodeData.description}
          </p>
        </div>
      </Html>
    </group>
  );
}
