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

// Tarjeta 1 extendida (20% = 120vh), tarjetas 2-4 iguales (144vh c/u)
const ANIMATION_RANGES = [
  { start: 0.00, end: 0.20 }, // Tarjeta 1: 0-20% (120vh)
  { start: 0.22, end: 0.46 }, // Tarjeta 2: 22-46% (144vh)
  { start: 0.48, end: 0.72 }, // Tarjeta 3: 48-72% (144vh)
  { start: 0.74, end: 0.98 }, // Tarjeta 4: 74-98% (144vh)
];

// Lambda correcto para THREE.MathUtils.damp(x, y, lambda, dt):
// formula: lerp(x, y, 1 - e^(-lambda * dt))
// con dt=1/60: lambda=10 → factor 15% por frame → 99% en ~28 frames (0.47s). Suave y sin vibración.
const DAMP_LAMBDA = 10;

export default function TimelineNode({
  index,
  data,
  scrollProgress,
  totalNodes,
  isFirst,
}: TimelineNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const htmlDivRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ scale: 0.3, x: isFirst ? -2.5 : 4, y: 0, z: 0, opacity: 0 });

  const yBase = isFirst ? 1.0 : 0; // Tarjeta 1 ligeramente más arriba

  const range = ANIMATION_RANGES[index] || { start: 0, end: 1 };
  const p = Math.max(0, Math.min(1,
    (scrollProgress - range.start) / (range.end - range.start)
  ));

  useFrame(() => {
    if (!groupRef.current) return;

    let tX: number, tY: number, tZ: number, tScale: number, tOpacity: number;

    if (isFirst) {
      // Tarjeta 1: zoom-in fijo → se achica y desaparece (sin moverse lateralmente)
      tX = -2.5;
      tZ = 0;
      if (p < 0.35) {
        // Aparece: zoom-in rápido
        const t = p / 0.35;
        tScale   = 0.3 + t * 0.45;  // 0.3 → 0.75
        tOpacity = t;                // 0 → 1
        tY = yBase;
      } else if (p < 0.70) {
        // Permanece visible
        tScale   = 0.75;
        tOpacity = 1;
        tY = yBase;
      } else {
        // Desaparece: último 30% del rango
        const t = (p - 0.70) / 0.30;
        tScale   = 0.75 - t * 0.45; // 0.75 → 0.3
        tOpacity = 1 - t;            // 1 → 0
        tY = yBase;
      }
    } else {
      // Tarjetas 2-4: tres fases iguales de 33% del rango cada una
      // Fase 1 (0-0.5):  entra desde la derecha, llega a posición central
      // Fase 2 (0.5-0.75): visible y estática brevemente
      // Fase 3 (0.75-1):   sube y desaparece del canvas
      tZ = 0;

      if (p < 0.5) {
        // Fase entrada: derecha → posición final, Z sube a -2 y vuelve al cruzar el tubo
        const t = p / 0.5;
        tX      = 4 + (-2.5 - 4) * t;           // 4 → -2.5
        tScale  = 0.3 + 0.45 * t;               // 0.3 → 0.75
        tOpacity = 0.1 + 0.9 * t;               // 0.1 → 1
        tY      = yBase;

        // Z: pasa por detrás del tubo en el cruce (X=0 ocurre al t ≈ 0.615)
        const crossT = (4 - 0) / (4 - (-2.5)); // ≈ 0.615
        if (t < crossT) {
          tZ = -2 * (t / crossT);
        } else {
          tZ = -2 + 2 * ((t - crossT) / (1 - crossT));
        }
      } else if (p < 0.75) {
        // Fase estática: tarjeta visible en su lugar
        tX      = -2.5;
        tScale  = 0.75;
        tOpacity = 1;
        tY      = yBase;
      } else {
        // Fase salida: sube y desaparece por arriba del canvas
        const t = (p - 0.75) / 0.25;
        tX      = -2.5;
        tScale  = 0.75 - t * 0.3;   // se achica levemente al salir
        tOpacity = 1 - t;            // 1 → 0
        tY      = yBase + t * 3.5;  // sube fuera del canvas (±4.6 visible)
      }
    }

    // Damp con lambda=10: suave, sin vibración, converge en ~0.5s
    stateRef.current.scale   = THREE.MathUtils.damp(stateRef.current.scale,   tScale,   DAMP_LAMBDA, 1 / 60);
    stateRef.current.x       = THREE.MathUtils.damp(stateRef.current.x,       tX,       DAMP_LAMBDA, 1 / 60);
    stateRef.current.y       = THREE.MathUtils.damp(stateRef.current.y,       tY,       DAMP_LAMBDA, 1 / 60);
    stateRef.current.z       = THREE.MathUtils.damp(stateRef.current.z,       tZ,       DAMP_LAMBDA, 1 / 60);
    stateRef.current.opacity = THREE.MathUtils.damp(stateRef.current.opacity, tOpacity, DAMP_LAMBDA, 1 / 60);

    groupRef.current.position.set(stateRef.current.x, stateRef.current.y, stateRef.current.z);
    groupRef.current.scale.setScalar(stateRef.current.scale);

    if (htmlDivRef.current) {
      htmlDivRef.current.style.opacity = String(stateRef.current.opacity);
    }
  });

  const nodeData = timelineData[index] || data;
  const cardWidth    = isFirst ? '180px' : '160px';
  const cardPadding  = isFirst ? '16px'  : '14px';
  const daySize      = isFirst ? '10px'  : '9px';
  const titleSize    = isFirst ? '15px'  : '13px';
  const descSize     = isFirst ? '12px'  : '11px';

  return (
    <group ref={groupRef} position={[stateRef.current.x, stateRef.current.y, 0]}>
      <Html transform center>
        <div ref={htmlDivRef} style={{
          width: cardWidth, padding: cardPadding,
          background: 'rgba(0,0,0,0.85)',
          border: '1px solid rgba(0,251,251,0.4)',
          borderRadius: '8px', backdropFilter: 'blur(10px)',
          pointerEvents: 'none', opacity: 0, boxSizing: 'border-box',
        }}>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: daySize, color: '#00FBFB', letterSpacing: '0.2em', margin: 0, marginBottom: '6px', textTransform: 'uppercase', fontWeight: 'bold' }}>
            {nodeData.day}
          </p>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: titleSize, fontWeight: 800, color: '#FFFFFF', margin: '6px 0 8px 0' }}>
            {nodeData.title}
          </h3>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: descSize, color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', margin: 0 }}>
            {nodeData.description}
          </p>
        </div>
      </Html>
    </group>
  );
}
