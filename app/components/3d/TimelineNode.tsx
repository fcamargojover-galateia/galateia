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
  isFirst: boolean;
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
  isFirst,
}: TimelineNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const htmlDivRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    scale: isFirst ? 0.5 : 0.3,
    x: isFirst ? 0 : 8,
    z: 0,
    opacity: isFirst ? 0 : 0.2,
  });

  const NODE_HEIGHT = 5;
  const yPosition = -index * NODE_HEIGHT;

  // Rangos personalizados con solapamiento para distribución proporcionada
  const animationRanges = [
    { start: 0.0, end: 0.2 },   // Tarjeta 1: 0% a 20%
    { start: 0.15, end: 0.45 }, // Tarjeta 2: 15% a 45%
    { start: 0.4, end: 0.7 },   // Tarjeta 3: 40% a 70%
    { start: 0.65, end: 0.9 },  // Tarjeta 4: 65% a 90%
  ];

  const range = animationRanges[index] || { start: 0, end: 1 };
  const nodeProgress = Math.max(0, Math.min(1, (scrollProgress - range.start) / (range.end - range.start)));

  useFrame(() => {
    if (!groupRef.current) return;

    let targetScale: number;
    let targetX: number;
    let targetZ: number;
    let targetOpacity: number;

    if (isFirst) {
      // TARJETA 1: Zoom fijo, flotando a la izquierda del tubo
      targetScale = 0.5 + nodeProgress * 0.5; // 0.5 → 1.0
      targetX = -2; // Desplazada a la izquierda del tubo central (X=0)
      targetZ = 0;

      // Opacity: 0 → 1 durante primer 50%, luego 1 → 0 en segundo 50%
      if (nodeProgress < 0.5) {
        targetOpacity = nodeProgress * 2; // 0 → 1
      } else {
        targetOpacity = 2 - nodeProgress * 2; // 1 → 0
      }
    } else {
      // TARJETAS 2, 3, 4: Trayectoria cruzada derecha → izquierda
      const startX = 8;
      const endX = -4;
      const startScale = 0.3;
      const endScale = 1;
      const startOpacity = 0.2;
      const endOpacity = 1;

      targetX = startX + (endX - startX) * nodeProgress; // 8 → -4
      targetScale = startScale + (endScale - startScale) * nodeProgress; // 0.3 → 1

      // Z: cruza a -2 cuando X pasa por 0
      const crossingProgress = (8 - 0) / (8 - (-4)); // ≈ 0.67
      if (nodeProgress < crossingProgress) {
        targetZ = -2 * (nodeProgress / crossingProgress);
      } else {
        targetZ = -2 + 2 * ((nodeProgress - crossingProgress) / (1 - crossingProgress));
      }

      targetOpacity = startOpacity + (endOpacity - startOpacity) * nodeProgress; // 0.2 → 1
    }

    // Aplicar suavizado (damp)
    stateRef.current.scale = THREE.MathUtils.damp(
      stateRef.current.scale,
      targetScale,
      0.15,
      1 / 60
    );

    stateRef.current.x = THREE.MathUtils.damp(stateRef.current.x, targetX, 0.12, 1 / 60);
    stateRef.current.z = THREE.MathUtils.damp(stateRef.current.z, targetZ, 0.12, 1 / 60);
    stateRef.current.opacity = THREE.MathUtils.damp(
      stateRef.current.opacity,
      targetOpacity,
      0.1,
      1 / 60
    );

    // Aplicar transformaciones
    groupRef.current.position.x = stateRef.current.x;
    groupRef.current.position.y = yPosition;
    groupRef.current.position.z = stateRef.current.z;
    groupRef.current.scale.set(
      stateRef.current.scale,
      stateRef.current.scale,
      stateRef.current.scale
    );

    // Animar opacidad del HTML
    if (htmlDivRef.current) {
      htmlDivRef.current.style.opacity = String(stateRef.current.opacity);
    }
  });

  const nodeData = timelineData[index] || data;

  return (
    <group ref={groupRef} position={[0, yPosition, 0]}>
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
            opacity: 0.2,
          }}
        >
          <p
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '11px',
              color: '#00FBFB',
              letterSpacing: '0.2em',
              margin: 0,
              marginBottom: '8px',
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
              margin: '8px 0 12px 0',
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
