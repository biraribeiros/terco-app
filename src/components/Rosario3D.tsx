import { useMemo, useRef, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import type { Group, Mesh } from 'three';
import { CRUZ, RAIO_CONTA, contas, cordao, focoDecada, type Conta } from '../lib/geometria';
import { COR_REZADA, ESTILOS, type Estilo, type EstiloTerco } from '../lib/estilos';

export interface RosarioProps {
  acesas: number[];
  atual: number;
  foco: number | null;
  girando?: boolean;
  estilo?: EstiloTerco;
}

function EsferaConta({
  conta,
  estilo,
  acesa,
  pulsando,
}: {
  conta: Conta;
  estilo: Estilo;
  acesa: boolean;
  pulsando: boolean;
}) {
  const ref = useRef<Mesh>(null);
  const { conta: c } = estilo;
  const raio = RAIO_CONTA[conta.tipo] * c.escala;
  // Contas ovais ficam alongadas ao longo do cordão (tangente do anel; vertical na introdução).
  const angulo = conta.decada >= 0 ? Math.atan2(conta.y, conta.x) : 0;
  const escala: [number, number, number] = c.oval ? [0.78, 1.3, 0.78] : [1, 1, 1];

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const material = mesh.material as THREE.MeshPhysicalMaterial;
    material.emissiveIntensity = pulsando ? 0.6 + 0.4 * Math.sin(clock.elapsedTime * 4) : acesa ? 0.35 : 0;
  });

  return (
    <mesh ref={ref} position={[conta.x, conta.y, conta.z]} rotation={[0, 0, angulo]} scale={escala}>
      <sphereGeometry args={[raio, 24, 24]} />
      <meshPhysicalMaterial
        color={c.cor}
        emissive={COR_REZADA}
        emissiveIntensity={0}
        metalness={c.metal}
        roughness={c.rugosidade}
        clearcoat={c.verniz}
        clearcoatRoughness={0.1}
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

function Cruz({ estilo }: { estilo: Estilo }) {
  const { forma, cor, metal, rugosidade } = estilo.cruz;
  const material = <meshStandardMaterial color={cor} metalness={metal} roughness={rugosidade} />;
  const grossura = forma === 'simples' ? 0.16 : 0.12;
  const alturaHaste = forma === 'simples' ? 0.8 : 1;
  const largura = forma === 'simples' ? 0.55 : 0.58;

  return (
    <group position={[CRUZ.x, CRUZ.y, 0]}>
      <mesh>
        <boxGeometry args={[grossura, alturaHaste, grossura * 0.8]} />
        {material}
      </mesh>
      <mesh position={[0, alturaHaste * 0.22, 0]}>
        <boxGeometry args={[largura, grossura, grossura * 0.8]} />
        {material}
      </mesh>
      {forma !== 'simples' && (
        <>
          {/* Pontas alargadas nas quatro extremidades. */}
          <mesh position={[0, alturaHaste / 2, 0]}>
            <boxGeometry args={[0.26, 0.07, grossura * 0.8]} />
            {material}
          </mesh>
          <mesh position={[0, -alturaHaste / 2, 0]}>
            <boxGeometry args={[0.26, 0.07, grossura * 0.8]} />
            {material}
          </mesh>
          <mesh position={[largura / 2, alturaHaste * 0.22, 0]}>
            <boxGeometry args={[0.07, 0.26, grossura * 0.8]} />
            {material}
          </mesh>
          <mesh position={[-largura / 2, alturaHaste * 0.22, 0]}>
            <boxGeometry args={[0.07, 0.26, grossura * 0.8]} />
            {material}
          </mesh>
        </>
      )}
      {forma === 'crucifixo' && (
        <mesh position={[0, alturaHaste * 0.22, grossura * 0.45]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.04, 24]} />
          {material}
        </mesh>
      )}
    </group>
  );
}

export function Rosario3D({ acesas, atual, foco, girando = false, estilo = 'madeira' }: RosarioProps) {
  const lista = useMemo(() => contas(), []);
  const linha = useMemo(() => cordao(), []);
  const conjuntoAcesas = useMemo(() => new Set(acesas), [acesas]);
  const definicao = ESTILOS[estilo];

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, -1.4, 10.5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 5, 5]} intensity={1.3} />
      <directionalLight position={[-4, 2, 3]} intensity={0.5} />
      <pointLight position={[-4, -2, 4]} intensity={0.8} color="#FFD166" />
      <Camera foco={foco} />
      <Grupo girando={girando}>
        <Line points={linha} color={definicao.cordao} lineWidth={2} />
        {lista.map((conta, i) => (
          <EsferaConta
            key={`${estilo}-${i}`}
            conta={conta}
            estilo={definicao}
            acesa={conjuntoAcesas.has(i)}
            pulsando={i === atual}
          />
        ))}
        <Cruz estilo={definicao} />
      </Grupo>
    </Canvas>
  );
}
