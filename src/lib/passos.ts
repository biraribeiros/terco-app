import { CONJUNTOS, MISTERIOS, ORACOES, type Conjunto, type Misterio } from '../data/roteiro';
import { INDICE_DEZENA } from './geometria';
import type { Tipo, Voz, VozFalada } from './prefs';

export interface Passo {
  titulo: string;
  texto: string;
  /** Caminho do áudio dentro de public/audio, por exemplo "feminina/oracoes/02-credo.mp3". */
  caminho: string;
  /** Índice da conta que acende neste passo, ou -1. */
  conta: number;
  /** Dezena em foco (0 a 4), ou -1 para visão geral. */
  decada: number;
  /** Conjunto de mistérios em andamento (0, 1, ...), ou -1 antes do primeiro mistério. */
  grupo: number;
}

/** Ordem tradicional dos conjuntos no Rosário completo. */
export const ORDEM_CONJUNTOS: Conjunto[] = ['gozosos', 'luminosos', 'dolorosos', 'gloriosos'];

/** Sem voz não há áudio; os caminhos usam a voz masculina e nunca são tocados. */
function vozDosArquivos(voz: Voz): VozFalada {
  return voz === 'sem-voz' ? 'masculina' : voz;
}

export function montarPassos(voz: Voz, misterios: Misterio[]): Passo[] {
  const arquivos = vozDosArquivos(voz);
  const passos: Passo[] = [];
  let grupo = -1;
  const passo = (titulo: string, texto: string, caminho: string, conta = -1, decada = -1) =>
    passos.push({ titulo, texto, caminho, conta, decada, grupo });
  const oracao = (chave: string, titulo: string, conta = -1, decada = -1) =>
    passo(titulo, ORACOES[chave], `${arquivos}/oracoes/${chave}.mp3`, conta, decada);

  // Mais de um conjunto na lista indica Rosário completo: o rótulo traz o nome do conjunto.
  const varios = new Set(misterios.map((m) => m.conjunto)).size > 1;
  let conjuntoAtual: Conjunto | null = null;

  oracao('01-sinal-da-cruz', 'Sinal da cruz');
  oracao('02-credo', 'Credo');
  oracao('03-pai-nosso', 'Pai-nosso', 0);
  for (let i = 0; i < 3; i++) oracao('04-ave-maria', `Ave-Maria ${i + 1} de 3`, 1 + i);
  oracao('05-gloria', 'Glória');

  for (const m of misterios) {
    if (m.conjunto !== conjuntoAtual) {
      conjuntoAtual = m.conjunto;
      grupo++;
    }
    const d = m.ordem - 1;
    const base = INDICE_DEZENA(d);
    const rotulo = varios
      ? `${CONJUNTOS[m.conjunto]} · Mistério ${m.ordem} · ${m.nome}`
      : `Mistério ${m.ordem} · ${m.nome}`;
    passo(rotulo, m.anuncio, `${arquivos}/misterios/${m.chave}.mp3`, -1, d);
    if (voz === 'kids') {
      passo(rotulo, m.explicacao, `kids/misterios-explicados/${m.chave}.mp3`, -1, d);
    }
    oracao('03-pai-nosso', `Pai-nosso · ${rotulo}`, base, d);
    for (let j = 0; j < 10; j++) {
      oracao('04-ave-maria', `Ave-Maria ${j + 1} de 10 · ${rotulo}`, base + 1 + j, d);
    }
    oracao('05-gloria', `Glória · ${rotulo}`, -1, d);
    oracao('06-o-meu-jesus', `Ó meu Jesus · ${rotulo}`, -1, d);
  }

  oracao('07-salve-rainha', 'Salve Rainha');
  oracao('08-terco-concluido', 'Fim da oração');
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

/** Os 20 mistérios, na ordem do Rosário completo. */
export function misteriosDoRosario(): Misterio[] {
  return ORDEM_CONJUNTOS.flatMap(misteriosDoConjunto);
}

export function nomeConjunto(conjunto: Conjunto): string {
  return CONJUNTOS[conjunto];
}

/** Texto curto que descreve a oração, usado no histórico. */
export function tituloDaOracao(tipo: Tipo, misterios: Misterio[]): string {
  if (tipo === 'rosario') return 'Rosário completo';
  if (misterios.length === 1) return `${misterios[0].nome} · mistérios ${CONJUNTOS[misterios[0].conjunto].toLowerCase()}`;
  return `Terço · Mistérios ${CONJUNTOS[misterios[0].conjunto].toLowerCase()}`;
}
