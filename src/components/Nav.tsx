import type { ReactNode } from 'react';

export type Aba = 'intencao' | 'calendario' | 'palavra' | 'ajustes';

function Icone({ children }: { children: ReactNode }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const ITENS: Record<Aba, { rotulo: string; icone: ReactNode }> = {
  intencao: {
    rotulo: 'Início',
    icone: <Icone><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9.5h13V10" /><path d="M10 19.5v-5h4v5" /></Icone>,
  },
  calendario: {
    rotulo: 'Calendário',
    icone: <Icone><rect x="3.5" y="5" width="17" height="15" rx="3" /><path d="M8 3v4M16 3v4M3.5 10h17" /></Icone>,
  },
  palavra: {
    rotulo: 'Palavra',
    icone: <Icone><path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-4-7 4V4.5a1 1 0 0 1 1-1Z" /></Icone>,
  },
  ajustes: {
    rotulo: 'Ajustes',
    icone: (
      <Icone>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
      </Icone>
    ),
  },
};

export function Nav({ atual, onIr }: { atual: Aba; onIr: (aba: Aba) => void }) {
  return (
    <nav className="nav" aria-label="Principal">
      {(Object.keys(ITENS) as Aba[]).map((aba) => (
        <button
          key={aba}
          type="button"
          aria-current={aba === atual ? 'page' : undefined}
          onClick={() => onIr(aba)}
        >
          {ITENS[aba].icone}
          <span>{ITENS[aba].rotulo}</span>
        </button>
      ))}
    </nav>
  );
}
