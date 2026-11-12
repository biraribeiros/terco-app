// Geometria do terço, compartilhada pela versão 3D e pela 2D.
// 59 contas: 4 da introdução (1 Pai-nosso + 3 Ave-marias) e 5 dezenas de 11 contas (1 Pai-nosso + 10 Ave-marias).

export interface Conta {
  x: number;
  y: number;
  z: number;
  tipo: 'pai' | 'ave';
  decada: number;
}

const RAIO_ANEL = 2;
const ARCO = (2 * Math.PI) / 5;
const FOLGA = 0.16;

export const CRUZ = { x: 0, y: -RAIO_ANEL - 2.5 };
export const RAIO_CONTA = { pai: 0.12, ave: 0.085 } as const;

/** Índice da primeira conta de cada dezena (a introdução ocupa os índices 0 a 3). */
export const INDICE_DEZENA = (decada: number): number => 4 + decada * 11;

export function contas(): Conta[] {
  const lista: Conta[] = [];
  for (let k = 0; k < 4; k++) {
    lista.push({ x: 0, y: -RAIO_ANEL - 0.4 * (k + 1), z: 0, tipo: k === 0 ? 'pai' : 'ave', decada: -1 });
  }
  for (let d = 0; d < 5; d++) {
    const inicio = -Math.PI / 2 + d * ARCO + FOLGA / 2;
    const extensao = ARCO - FOLGA;
    for (let j = 0; j <= 10; j++) {
      const angulo = inicio + (extensao * j) / 10;
      lista.push({
        x: RAIO_ANEL * Math.cos(angulo),
        y: RAIO_ANEL * Math.sin(angulo),
        z: 0,
        tipo: j === 0 ? 'pai' : 'ave',
        decada: d,
      });
    }
  }
  return lista;
}

/** Centro de cada dezena no anel, usado para o zoom da câmera. */
export function focoDecada(decada: number): { x: number; y: number } {
  const angulo = -Math.PI / 2 + decada * ARCO + ARCO / 2;
  return { x: RAIO_ANEL * Math.cos(angulo), y: RAIO_ANEL * Math.sin(angulo) };
}

/** Pontos do cordão: o anel completo e a ligação até a cruz. */
export function cordao(): Array<[number, number, number]> {
  const pontos: Array<[number, number, number]> = [];
  for (let t = 0; t <= 120; t++) {
    const angulo = -Math.PI / 2 + (2 * Math.PI * t) / 120;
    pontos.push([RAIO_ANEL * Math.cos(angulo), RAIO_ANEL * Math.sin(angulo), 0]);
  }
  pontos.push([0, -RAIO_ANEL, 0]);
  pontos.push([0, CRUZ.y + 0.45, 0]);
  return pontos;
}
