import { CONJUNTOS, MISTERIOS, ORACOES, type Conjunto, type Misterio } from '../data/roteiro';
import { INDICE_DEZENA } from './geometria';
import type { Voz } from './prefs';

export interface Passo {
  titulo: string;
  texto: string;
  /** Caminho do áudio dentro de public/audio, por exemplo "feminina/oracoes/02-credo.mp3". */
  caminho: string;
  /** Índice da conta que acende neste passo, ou -1. */
  conta: number;
  /** Dezena em foco (0 a 4), ou -1 para visão geral. */
  decada: number;
}

export function montarPassos(voz: Voz, misterios: Misterio[]): Passo[] {
  const passos: Passo[] = [];
  const passo = (titulo: string, texto: string, caminho: string, conta = -1, decada = -1) =>
    passos.push({ titulo, texto, caminho, conta, decada });
  const oracao = (chave: string, titulo: string, conta = -1, decada = -1) =>
    passo(titulo, ORACOES[chave], `${voz}/oracoes/${chave}.mp3`, conta, decada);

  oracao('01-sinal-da-cruz', 'Sinal da cruz');
  oracao('02-credo', 'Credo');
  oracao('03-pai-nosso', 'Pai-nosso', 0);
  for (let i = 0; i < 3; i++) oracao('04-ave-maria', `Ave-maria ${i + 1} de 3`, 1 + i);
  oracao('05-gloria', 'Glória');

  for (const m of misterios) {
    const d = m.ordem - 1;
    const base = INDICE_DEZENA(d);
    const rotulo = `Mistério ${m.ordem} · ${m.nome}`;
    passo(rotulo, m.anuncio, `${voz}/misterios/${m.chave}.mp3`, -1, d);
    if (voz === 'kids') {
      passo(rotulo, m.explicacao, `kids/misterios-explicados/${m.chave}.mp3`, -1, d);
    }
    oracao('03-pai-nosso', `Pai-nosso · ${rotulo}`, base, d);
    for (let j = 0; j < 10; j++) {
      oracao('04-ave-maria', `Ave-maria ${j + 1} de 10 · ${rotulo}`, base + 1 + j, d);
    }
    oracao('05-gloria', `Glória · ${rotulo}`, -1, d);
    oracao('06-o-meu-jesus', `Ó meu Jesus · ${rotulo}`, -1, d);
  }

  oracao('07-salve-rainha', 'Salve Rainha');
  oracao('08-terco-concluido', 'Fim do terço');
  return passos;
}

/** Mistérios sugeridos para cada dia da semana (tradição católica). */
export function conjuntoDoDia(data: Date = new Date()): Conjunto {
  const porDiaDaSemana: Conjunto[] = [
    'gloriosos', // domingo
    'gozosos', // segunda
    'dolorosos', // terça
    'gloriosos', // quarta
    'luminosos', // quinta
    'dolorosos', // sexta
    'gozosos', // sábado
  ];
  return porDiaDaSemana[data.getDay()];
}

export function misteriosDoConjunto(conjunto: Conjunto): Misterio[] {
  return MISTERIOS.filter((m) => m.conjunto === conjunto).sort((a, b) => a.ordem - b.ordem);
}

export function nomeConjunto(conjunto: Conjunto): string {
  return CONJUNTOS[conjunto];
}
