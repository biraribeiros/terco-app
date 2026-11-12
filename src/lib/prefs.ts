import { Preferences } from '@capacitor/preferences';
import type { EstiloTerco } from './estilos';

export type Voz = 'feminina' | 'masculina' | 'kids' | 'sem-voz';
/** Vozes que têm áudio gravado. */
export type VozFalada = Exclude<Voz, 'sem-voz'>;

/** Estilo do alerta de lembrete. */
export type Alerta = 'som' | 'vibrar' | 'silencioso';

/** Tipo de oração escolhida. */
export type Tipo = 'terco' | 'rosario';

export interface Progresso {
  /** A sessão faz parte de uma novena. */
  novena: boolean;
  /** Chaves dos mistérios da sessão, na ordem em que são rezados. */
  chaves: string[];
  tipo: Tipo;
  intencao: string;
  passo: number;
}

/** Novena em andamento: nove dias de oração pela mesma intenção. */
export interface Novena {
  intencao: string;
  /** Dias (AAAA-MM-DD) em que a novena foi rezada. */
  dias: string[];
}

export const DIAS_NOVENA = 9;

export interface Lembrete {
  ativo: boolean;
  hora: number;
  minuto: number;
  /** Dias da semana, 0 = domingo ... 6 = sábado. */
  dias: number[];
}

/** Uma oração concluída, guardada no aparelho. */
export interface Registro {
  id: string;
  /** Data no formato AAAA-MM-DD. */
  data: string;
  /** Horário no formato HH:MM. */
  hora: string;
  titulo: string;
  intencao: string;
}

export interface Prefs {
  onboardingFeito: boolean;
  nome: string;
  voz: Voz;
  musica: boolean;
  estiloTerco: EstiloTerco;
  /** Velocidade da voz: 0,5, 1, 2 ou 3. */
  velocidade: number;
  tamanhoTexto: number;
  reduzirMovimento: boolean;
  modoLeve: boolean;
  alerta: Alerta;
  lembrete: Lembrete;
  diasRezados: string[];
  historico: Registro[];
  ultimoTrecho: number;
  progresso: Progresso | null;
  novena: Novena | null;
}

export const PREFS_PADRAO: Prefs = {
  onboardingFeito: false,
  nome: '',
  voz: 'masculina',
  musica: true,
  estiloTerco: 'branco',
  velocidade: 1,
  tamanhoTexto: 1,
  reduzirMovimento: false,
  modoLeve: false,
  alerta: 'som',
  lembrete: { ativo: false, hora: 20, minuto: 0, dias: [] },
  diasRezados: [],
  historico: [],
  ultimoTrecho: -1,
  progresso: null,
  novena: null,
};

const CHAVE = 'prefs';

/** Lê o progresso salvo, aceitando só o formato atual. */
function migrarProgresso(bruto: unknown): Progresso | null {
  if (!bruto || typeof bruto !== 'object') return null;
  const p = bruto as Record<string, unknown>;
  if (Array.isArray(p.chaves)) {
    return {
      novena: p.novena === true,
      chaves: p.chaves.filter((c): c is string => typeof c === 'string'),
      tipo: p.tipo === 'rosario' ? 'rosario' : 'terco',
      intencao: typeof p.intencao === 'string' ? p.intencao : '',
      passo: typeof p.passo === 'number' ? p.passo : 0,
    };
  }
  // Formato antigo (conjunto e ordens) de versões de teste: descartado.
  return null;
}

export async function carregarPrefs(): Promise<Prefs> {
  try {
    const { value } = await Preferences.get({ key: CHAVE });
    if (!value) return PREFS_PADRAO;
    const salvo = JSON.parse(value) as Partial<Prefs> & { progresso?: unknown };
    // Versões de teste anteriores não tinham nome: pedem nome e voz uma vez.
    const onboardingFeito = 'nome' in salvo ? Boolean(salvo.onboardingFeito) : false;
    // 'madeira' era o padrão antes do estilo Branco existir: quem não escolheu passa para o novo padrão.
    const estiloTerco = salvo.estiloTerco && salvo.estiloTerco !== 'madeira' ? salvo.estiloTerco : PREFS_PADRAO.estiloTerco;
    return { ...PREFS_PADRAO, ...salvo, estiloTerco, onboardingFeito, progresso: migrarProgresso(salvo.progresso) };
  } catch {
    return PREFS_PADRAO;
  }
}

export async function salvarPrefs(prefs: Prefs): Promise<void> {
  try {
    await Preferences.set({ key: CHAVE, value: JSON.stringify(prefs) });
  } catch {
    // Sem armazenamento disponível: o app segue com o estado em memória.
  }
}

export function hojeISO(data: Date = new Date()): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

export function horaTexto(data: Date = new Date()): string {
  return `${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}`;
}
