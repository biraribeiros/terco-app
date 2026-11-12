import { useMemo, useRef, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import type { Group, Mesh } from 'three';
import { CRUZ, RAIO_CONTA, contas, cordao, focoDecada, type Conta } from '../lib/geometria';

export interface RosarioProps {
  acesas: number[];
  atual: number;
  foco: number | null;
  girando?: boolean;
}

function EsferaConta({ conta, acesa, pulsando }: { conta: Conta; acesa: boolean; pulsando: boolean }) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const material = mesh.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = pulsando
      ? 0.5 + 0.4 * Math.sin(clock.elapsedTime * 4)
      : acesa
        ? 0.2
        : 0;
  });

  return (
    <mesh ref={ref} position={[conta.x, conta.y, conta.z]}>
      <sphereGeometry args={[RAIO_CONTA[conta.tipo], 24, 24]} />
      <meshStandardMaterial
        color={acesa ? '#FFD166' : '#9CC8F0'}
        emissive="#FFD166"
        emissiveIntensity={0}
        metalness={0.2}
        roughness={0.3}
      />
    </mesh>
  );
}

function Camera({ foco }: { foco: number | null }) {
  const { camera } = useThree();
  const olhar = useMemo(() => new THREE.Vector3(0, -1.4, 0), []);

  useFrame((_, dt) => {
    const f = foco === null ? null : focoDecada(foco);
    const posicao = f ? new THREE.Vector3(f.x * 0.55, f.y * 0.55 - 0.6, 5.5) : new THREE.Vector3(0, -1.4, 10.5);
    const alvo = f ? new THREE.Vector3(f.x, f.y, 0) : new THREE.Vector3(0, -1.4, 0);
    const k = 1 - Math.exp(-dt * 3);
    camera.position.lerp(posicao, k);
    olhar.lerp(alvo, k);
    camera.lookAt(olhar);
  });

  return null;
}

function Grupo({ girando, children }: { girando: boolean; children: ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    if (girando && ref.current) ref.current.rotation.y += dt * 0.5;
  });
  return <group ref={ref}>{children}</group>;
}

function Cruz() {
  return (
    <group position={[CRUZ.x, CRUZ.y, 0]}>
      <mesh>
        <boxGeometry args={[0.1, 0.9, 0.1]} />
        <meshStandardMaterial color="#FFD166" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.1]} />
        <meshStandardMaterial color="#FFD166" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

export function Rosario3D({ acesas, atual, foco, girando = false }: RosarioProps) {
  const lista = useMemo(() => contas(), []);
  const linha = useMemo(() => cordao(), []);
  const conjuntoAcesas = useMemo(() => new Set(acesas), [acesas]);

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, -1.4, 10.5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 5]} intensity={1.1} />
      <pointLight position={[-4, -2, 4]} intensity={0.8} color="#FFD166" />
      <Camera foco={foco} />
      <Grupo girando={girando}>
        <Line points={linha} color="#FFD166" lineWidth={1.5} />
        {lista.map((conta, i) => (
          <EsferaConta key={i} conta={conta} acesa={conjuntoAcesas.has(i)} pulsando={i === atual} />
        ))}
        <Cruz />
      </Grupo>
    </Canvas>
  );
}
