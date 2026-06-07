'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface TimelineSceneProps {
  spiralStateRef: React.MutableRefObject<{
    rotation: number;
    position: number;
  }>;
}

interface TimelineNode {
  id: number;
  label: string;
  day: string;
  description: string;
  angle: number;
  y: number;
  x: number;
  z: number;
}

export default function TimelineScene({ spiralStateRef }: TimelineSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentRotationRef = useRef(0);
  const currentPositionRef = useRef(0);

  // Parámetros de la espiral
  const SPIRAL_RADIUS = 4; // Radio de la espiral
  const NODES_COUNT = 4; // Número de hitos
  const HEIGHT_PER_STEP = -3; // Altura por paso (negativa = hacia abajo)

  // Generar nodos de la espiral
  const nodes: TimelineNode[] = useMemo(() => {
    return Array.from({ length: NODES_COUNT }, (_, i) => {
      const angle = (i / NODES_COUNT) * Math.PI * 2; // Ángulo en radianes
      const y = i * HEIGHT_PER_STEP; // Posición Y (desciende)
      const x = SPIRAL_RADIUS * Math.cos(angle);
      const z = SPIRAL_RADIUS * Math.sin(angle);

      return {
        id: i,
        label: `Día ${i + 1}`,
        day: `Día ${i + 1}`,
        description: ['Diagnóstico Operativo', 'Construcción', 'Integración y Testing', 'Encendido'][i],
        angle,
        y,
        x,
        z,
      };
    });
  }, []);

  // useFrame: Aplicar suavización GSAP a las propiedades de Three.js
  useFrame(() => {
    if (!groupRef.current) return;

    // Usar THREE.MathUtils.damp para suavizado (como mantequilla)
    currentRotationRef.current = THREE.MathUtils.damp(
      currentRotationRef.current,
      spiralStateRef.current.rotation,
      0.1, // damping factor (menor = más suave)
      1 / 60 // deltaTime (60fps)
    );

    currentPositionRef.current = THREE.MathUtils.damp(
      currentPositionRef.current,
      spiralStateRef.current.position,
      0.1,
      1 / 60
    );

    // Aplicar rotación y posición al grupo
    groupRef.current.rotation.y = currentRotationRef.current;
    groupRef.current.position.y = currentPositionRef.current;
  });

  return (
    <group ref={groupRef}>
      {/* Nodos de la línea de tiempo */}
      {nodes.map((node) => (
        <group key={node.id} position={[node.x, node.y, node.z]}>
          {/* Esfera visual (placeholder) */}
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshPhongMaterial
              color={new THREE.Color().setHSL(0.6, 0.8, 0.5)}
              emissive={new THREE.Color().setHSL(0.6, 0.8, 0.3)}
            />
          </mesh>

          {/* Glowing ring alrededor de la esfera */}
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[0.5, 0.05, 8, 16]} />
            <meshBasicMaterial
              color={new THREE.Color().setHSL(0.1, 1, 0.5)}
              transparent
              opacity={0.6}
            />
          </mesh>

          {/* Contenedor de HTML (texto) */}
          <Html position={[1.2, 0, 0]} scale={0.01} distanceFactor={1}>
            <div className="w-64 text-white pointer-events-auto">
              <div className="text-xs font-mono text-cyan-400 mb-2">{node.day}</div>
              <div className="text-lg font-bold text-white mb-2">{node.description}</div>
              <div className="text-sm text-gray-300">
                {node.description === 'Diagnóstico Operativo' &&
                  '15 minutos de conversación. Mapeamos tu flujo actual.'}
                {node.description === 'Construcción' &&
                  'Construimos la infraestructura en paralelo a tu operación.'}
                {node.description === 'Integración y Testing' &&
                  'Conectamos sobre tus sistemas actuales y hacemos pruebas.'}
                {node.description === 'Encendido' &&
                  'El sistema opera solo. Seguimiento mensual incluido.'}
              </div>
            </div>
          </Html>

          {/* Línea conectora hacia el centro */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, -node.x, -node.y, -node.z])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={new THREE.Color().setHSL(0.1, 0.8, 0.5)}
              transparent
              opacity={0.3}
            />
          </line>
        </group>
      ))}

      {/* Nodo central (punto focal) */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.4, 2]} />
        <meshPhongMaterial
          color={new THREE.Color().setHSL(0.6, 1, 0.6)}
          emissive={new THREE.Color().setHSL(0.6, 1, 0.4)}
        />
      </mesh>

      {/* Aro central */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1, 0.1, 8, 32]} />
        <meshBasicMaterial
          color={new THREE.Color().setHSL(0.6, 1, 0.5)}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Líneas de la espiral (visual guide) */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodes.length}
            array={new Float32Array(nodes.flatMap((n) => [n.x, n.y, n.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={new THREE.Color().setHSL(0.6, 0.5, 0.4)}
          transparent
          opacity={0.2}
        />
      </line>
    </group>
  );
}
