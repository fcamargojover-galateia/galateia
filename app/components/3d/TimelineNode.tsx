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

// Rangos de animación con solapamiento mínimo (~6-18vh entre tarjetas)
// Total 600vh: cada tarjeta tiene su propio espacio, transición < 100vh entre consecutivas
const ANIMATION_RANGES = [
  { start: 0.00, end: 0.14 }, // Tarjeta 1: 0-14% (84vh) — corta y directa
  { start: 0.13, end: 0.35 }, // Tarjeta 2: 13-35% (132vh) — 6vh overlap con tarjeta 1
  { start: 0.32, end: 0.58 }, // Tarjeta 3: 32-58% (156vh) — 18vh overlap con tarjeta 2
  { start: 0.55, end: 0.82 }, // Tarjeta 4: 55-82% (162vh) — 18vh overlap con tarjeta 3
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
    scale: isFirst ? 0.3 : 0.3,
    x: isFirst ? -2.5 : 4,
    z: 0,
    opacity: 0,
  });

  // Y ligeramente por encima del centro para tarjeta 1 (~8% del rango visible ±4.6)
  const yPosition = isFirst ? 1.0 : 0;

  const range = ANIMATION_RANGES[index] || { start: 0, end: 1 };
  const nodeProgress = Math.max(0, Math.min(1,
    (scrollProgress - range.start) / (range.end - range.start)
  ));

  useFrame(() => {
    if (!groupRef.current) return;

    let targetScale: number;
    let targetX: number;
    let targetZ: number;
    let targetOpacity: number;

    if (isFirst) {
      // TARJETA 1: zoom-in → pico visible → achica y desaparece
      targetX = -2.5;
      targetZ = 0;

      if (nodeProgress < 0.51) {
        const t = nodeProgress / 0.51;
        targetScale = 0.3 + t * 0.45;  // 0.3 → 0.75 (30% del canvas, compacta)
        targetOpacity = t;
      } else {
        const t = (nodeProgress - 0.51) / 0.49;
        targetScale = 0.75 - t * 0.45;  // 0.75 → 0.3 (se achica al salir)
        targetOpacity = 1 - t;
      }
    } else {
      // TARJETAS 2, 3, 4: vuelan de derecha a izquierda cruzando el tubo
      targetX = 4 + (-4 - 4) * nodeProgress;   // 4 → -4
      targetScale = 0.3 + 0.7 * nodeProgress;  // 0.3 → 1.0
      targetOpacity = 0.2 + 0.8 * nodeProgress; // 0.2 → 1.0

      // Z: cruza el tubo (Z=-2) en el punto medio del viaje
      if (nodeProgress < 0.5) {
        targetZ = -2 * (nodeProgress / 0.5);
      } else {
        targetZ = -2 + 2 * ((nodeProgress - 0.5) / 0.5);
      }
    }

    // Damp alto (0.4) para que todo responda rápido incluso con scroll veloz
    stateRef.current.scale = THREE.MathUtils.damp(stateRef.current.scale, targetScale, 0.4, 1 / 60);
    stateRef.current.x = THREE.MathUtils.damp(stateRef.current.x, targetX, 0.4, 1 / 60);
    stateRef.current.z = THREE.MathUtils.damp(stateRef.current.z, targetZ, 0.4, 1 / 60);
    stateRef.current.opacity = THREE.MathUtils.damp(stateRef.current.opacity, targetOpacity, 0.4, 1 / 60);

    groupRef.current.position.x = stateRef.current.x;
    groupRef.current.position.y = yPosition;
    groupRef.current.position.z = stateRef.current.z;
    groupRef.current.scale.set(stateRef.current.scale, stateRef.current.scale, stateRef.current.scale);

    if (htmlDivRef.current) {
      htmlDivRef.current.style.opacity = String(stateRef.current.opacity);
    }
  });

  const nodeData = timelineData[index] || data;

  const cardWidth = isFirst ? '180px' : '160px';
  const cardPadding = isFirst ? '16px' : '14px';
  const dayFontSize = isFirst ? '10px' : '9px';
  const titleFontSize = isFirst ? '15px' : '13px';
  const descFontSize = isFirst ? '12px' : '11px';

  return (
    <group ref={groupRef} position={[stateRef.current.x, yPosition, 0]}>
      <Html transform center>
        <div
          ref={htmlDivRef}
          style={{
            width: cardWidth,
            padding: cardPadding,
            background: 'rgba(0, 0, 0, 0.85)',
            border: '1px solid rgba(0, 251, 251, 0.4)',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
            pointerEvents: 'none',
            opacity: 0,
            boxSizing: 'border-box',
          }}
        >
          <p style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: dayFontSize,
            color: '#00FBFB',
            letterSpacing: '0.2em',
            margin: 0,
            marginBottom: '6px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}>
            {nodeData.day}
          </p>
          <h3 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: titleFontSize,
            fontWeight: 800,
            color: '#FFFFFF',
            margin: '6px 0 8px 0',
          }}>
            {nodeData.title}
          </h3>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: descFontSize,
            color: 'rgba(255,255,255,0.7)',
            lineHeight: '1.5',
            margin: 0,
          }}>
            {nodeData.description}
          </p>
        </div>
      </Html>
    </group>
  );
}
