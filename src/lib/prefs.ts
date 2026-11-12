import { Preferences } from '@capacitor/preferences';
import type { Conjunto } from '../data/roteiro';

export type Voz = 'feminina' | 'masculina' | 'kids';

export interface Progresso {
  conjunto: Conjunto;
  ordens: number[];
  passo: number;
}

export interface Lembrete {
  ativo: boolean;
  hora: number;
  minuto: number;
  /** Dias da semana, 0 = domingo ... 6 = sábado. */
  dias: number[];
}

export interface Prefs {
  onboardingFeito: boolean;
  voz: Voz;
  tamanhoTexto: number;
  reduzirMovimento: boolean;
  modoLeve: boolean;
  lembrete: Lembrete;
  diasRezados: string[];
  ultimoTrecho: number;
  progresso: Progresso | null;
}

export const PREFS_PADRAO: Prefs = {
  onboardingFeito: false,
  voz: 'feminina',
  tamanhoTexto: 1,
  reduzirMovimento: false,
  modoLeve: false,
  lembrete: { ativo: false, hora: 20, minuto: 0, dias: [] },
  diasRezados: [],
  ultimoTrecho: -1,
  progresso: null,
};

const CHAVE = 'prefs';

export async function carregarPrefs(): Promise<Prefs> {
  try {
    const { value } = await Preferences.get({ key: CHAVE });
    if (!value) return PREFS_PADRAO;
    return { ...PREFS_PADRAO, ...(JSON.parse(value) as Partial<Prefs>) };
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
