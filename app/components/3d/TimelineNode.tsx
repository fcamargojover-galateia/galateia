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

  // Todas las tarjetas en Y=0: son secuenciales (nunca simultáneas),
  // y la cámara solo ve ±4.6 unidades verticales con fov=50
  const yPosition = 0;

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
      targetX = -2.5;
      targetZ = 0;

      // Zoom-in: 0 → 0.51 (15% más rápido que el 0.6 anterior)
      // Fade-out: 0.51 → 1.0 (escala DECRECE, tarjeta se ACHICA al alejarse)
      if (nodeProgress < 0.51) {
        const t = nodeProgress / 0.51;
        targetScale = 0.5 + t * 0.5;   // 0.5 → 1.0
        targetOpacity = t;              // 0 → 1
      } else {
        const t = (nodeProgress - 0.51) / 0.49;
        targetScale = 1.0 - t * 0.5;   // 1.0 → 0.5 (se achica al salir)
        targetOpacity = 1 - t;          // 1 → 0
      }
    } else {
      // TARJETAS 2, 3, 4: Trayectoria cruzada derecha → izquierda
      // startX=4 mantiene la tarjeta dentro del frustum de la cámara (fov=50 cubre ~±4.6 unidades)
      const startX = 4;
      const endX = -4;
      const startScale = 0.3;
      const endScale = 1;
      const startOpacity = 0.2;
      const endOpacity = 1;

      targetX = startX + (endX - startX) * nodeProgress; // 8 → -4
      targetScale = startScale + (endScale - startScale) * nodeProgress; // 0.3 → 1

      // Z: cruza a -2 cuando X pasa por 0 (exactamente al 50% del viaje con startX=4, endX=-4)
      const crossingProgress = 0.5;
      if (nodeProgress < crossingProgress) {
        targetZ = -2 * (nodeProgress / crossingProgress);
      } else {
        targetZ = -2 + 2 * ((nodeProgress - crossingProgress) / (1 - crossingProgress));
      }

      targetOpacity = startOpacity + (endOpacity - startOpacity) * nodeProgress; // 0.2 → 1
    }

    // Aplicar suavizado (damp) — tarjeta 1 más rápida para que el zoom-in se sienta inmediato
    const dampFactor = isFirst ? 0.35 : 0.15;
    stateRef.current.scale = THREE.MathUtils.damp(
      stateRef.current.scale,
      targetScale,
      dampFactor,
      1 / 60
    );

    stateRef.current.x = THREE.MathUtils.damp(stateRef.current.x, targetX, isFirst ? 0.35 : 0.12, 1 / 60);
    stateRef.current.z = THREE.MathUtils.damp(stateRef.current.z, targetZ, 0.12, 1 / 60);
    stateRef.current.opacity = THREE.MathUtils.damp(
      stateRef.current.opacity,
      targetOpacity,
      isFirst ? 0.3 : 0.1,
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

  // Tarjeta 1 más grande (centrada, zoom-in), tarjetas 2-4 más compactas
  const cardWidth = isFirst ? '240px' : '160px';
  const cardPadding = isFirst ? '20px' : '14px';
  const dayFontSize = isFirst ? '11px' : '9px';
  const titleFontSize = isFirst ? '18px' : '13px';
  const descFontSize = isFirst ? '13px' : '11px';

  return (
    <group ref={groupRef} position={[0, yPosition, 0]}>
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
            opacity: 0.2,
            boxSizing: 'border-box',
          }}
        >
          <p
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: dayFontSize,
              color: '#00FBFB',
              letterSpacing: '0.2em',
              margin: 0,
              marginBottom: '6px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            {nodeData.day}
          </p>
          <h3
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: titleFontSize,
              fontWeight: 800,
              color: '#FFFFFF',
              margin: '6px 0 8px 0',
            }}
          >
            {nodeData.title}
          </h3>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: descFontSize,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: '1.5',
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
