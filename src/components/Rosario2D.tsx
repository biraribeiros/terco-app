import { useMemo } from 'react';
import { CRUZ, RAIO_CONTA, contas, cordao } from '../lib/geometria';
import { COR_REZADA, ESTILOS } from '../lib/estilos';
import type { RosarioProps } from './Rosario3D';

// Versão 2D do terço, usada em aparelhos sem WebGL ou no modo leve.
export function Rosario2D({ acesas, atual, estilo = 'madeira' }: Omit<RosarioProps, 'girando'>) {
  const lista = useMemo(() => contas(), []);
  const linha = useMemo(() => cordao(), []);
  const conjuntoAcesas = useMemo(() => new Set(acesas), [acesas]);
  const caminho = linha.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(3)} ${(-y).toFixed(3)}`).join(' ');
  const { conta: c, cordao: corCordao, cruz } = ESTILOS[estilo];

  return (
    <svg viewBox="-3 -5.2 6 8" width="100%" height="100%" aria-hidden="true" focusable="false">
      <path d={caminho} fill="none" stroke={corCordao} strokeWidth="0.04" />
      {lista.map((conta, i) => {
        const acesa = conjuntoAcesas.has(i);
        const raio = RAIO_CONTA[conta.tipo] * c.escala;
        const angulo = conta.decada >= 0 ? (Math.atan2(-conta.y, conta.x) * 180) / Math.PI : 0;
        return (
          <ellipse
            key={i}
            cx={conta.x}
            cy={-conta.y}
            rx={c.oval ? raio * 0.78 : raio}
            ry={c.oval ? raio * 1.3 : raio}
            transform={`rotate(${angulo} ${conta.x} ${-conta.y})`}
            fill={acesa ? COR_REZADA : c.cor}
            stroke={i === atual ? '#FFFFFF' : acesa ? c.cor : 'none'}
            strokeWidth="0.03"
          />
        );
      })}
      <rect x={CRUZ.x - 0.07} y={-CRUZ.y - 0.5} width="0.14" height="1" fill={cruz.cor} />
      <rect x={CRUZ.x - 0.29} y={-CRUZ.y - 0.3} width="0.58" height="0.14" fill={cruz.cor} />
    </svg>
  );
}
