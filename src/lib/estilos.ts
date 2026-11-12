// Estilos visuais do terço. Só mudam material, cor e formato; a geometria e a lógica são as mesmas.

export type EstiloTerco = 'branco' | 'madeira' | 'cristal' | 'pedra' | 'cartoon';

export type FormaCruz = 'simples' | 'latina' | 'crucifixo';

export interface Estilo {
  nome: string;
  conta: {
    cor: string;
    metal: number;
    rugosidade: number;
    /** Brilho de verniz (0 a 1), para vidro e laca. */
    verniz: number;
    /** Escala da conta. As contas ficam encostadas, sem se sobrepor. */
    escala: number;
    /** Contas ovais, alongadas ao longo do cordão. */
    oval: boolean;
  };
  cordao: string;
  cruz: { forma: FormaCruz; cor: string; metal: number; rugosidade: number };
}

export const ESTILOS: Record<EstiloTerco, Estilo> = {
  branco: {
    nome: 'Branco',
    conta: { cor: '#f4f7fb', metal: 0.05, rugosidade: 0.3, verniz: 0.7, escala: 1.2, oval: false },
    cordao: '#dce6f2',
    cruz: { forma: 'latina', cor: '#f4f7fb', metal: 0.1, rugosidade: 0.3 },
  },
  madeira: {
    nome: 'Madeira',
    conta: { cor: '#a8693a', metal: 0.05, rugosidade: 0.5, verniz: 0.35, escala: 1.2, oval: false },
    cordao: '#6b4426',
    cruz: { forma: 'latina', cor: '#b57a45', metal: 0.05, rugosidade: 0.45 },
  },
  cristal: {
    nome: 'Cristal',
    conta: { cor: '#a3141d', metal: 0.1, rugosidade: 0.08, verniz: 1, escala: 1.15, oval: true },
    cordao: '#c8ccd2',
    cruz: { forma: 'crucifixo', cor: '#e3e7ec', metal: 0.45, rugosidade: 0.3 },
  },
  pedra: {
    nome: 'Pedra',
    conta: { cor: '#6f7650', metal: 0.1, rugosidade: 0.7, verniz: 0.1, escala: 1.2, oval: false },
    cordao: '#3d3f36',
    cruz: { forma: 'crucifixo', cor: '#b98c4c', metal: 0.45, rugosidade: 0.4 },
  },
  cartoon: {
    nome: 'Divertido',
    conta: { cor: '#d9663a', metal: 0.05, rugosidade: 0.35, verniz: 0.6, escala: 1.25, oval: false },
    cordao: '#ffc93c',
    cruz: { forma: 'simples', cor: '#d9663a', metal: 0.05, rugosidade: 0.35 },
  },
};

export const ORDEM_ESTILOS: EstiloTerco[] = ['branco', 'madeira', 'cristal', 'pedra', 'cartoon'];

/** Cor que marca as contas já rezadas, igual em todos os estilos. */
export const COR_REZADA = '#ff8a1f';
