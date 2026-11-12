import { useMemo } from 'react';
import { CRUZ, RAIO_CONTA, contas, cordao } from '../lib/geometria';
import type { RosarioProps } from './Rosario3D';

// Versão 2D do terço, usada em aparelhos sem WebGL ou no modo leve.
export function Rosario2D({ acesas, atual }: Omit<RosarioProps, 'girando'>) {
  const lista = useMemo(() => contas(), []);
  const linha = useMemo(() => cordao(), []);
  const conjuntoAcesas = useMemo(() => new Set(acesas), [acesas]);
  const caminho = linha.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(3)} ${(-y).toFixed(3)}`).join(' ');

  return (
    <svg viewBox="-3 -5.2 6 8" width="100%" height="100%" aria-hidden="true" focusable="false">
      <path d={caminho} fill="none" stroke="#FFD166" strokeWidth="0.03" />
      {lista.map((conta, i) => {
        const acesa = conjuntoAcesas.has(i);
        return (
          <circle
            key={i}
            cx={conta.x}
            cy={-conta.y}
            r={RAIO_CONTA[conta.tipo]}
            fill={acesa ? '#FFD166' : '#9CC8F0'}
            stroke={i === atual ? '#FFFFFF' : 'none'}
            strokeWidth="0.03"
          />
        );
      })}
      <rect x={CRUZ.x - 0.05} y={-CRUZ.y - 0.45} width="0.1" height="0.9" fill="#FFD166" />
      <rect x={CRUZ.x - 0.25} y={-CRUZ.y - 0.25} width="0.5" height="0.1" fill="#FFD166" />
    </svg>
  );
}
