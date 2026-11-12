export type Aba = 'intencao' | 'calendario' | 'palavra' | 'ajustes';

const ROTULOS: Record<Aba, string> = {
  intencao: 'Início',
  calendario: 'Calendário',
  palavra: 'Palavra',
  ajustes: 'Ajustes',
};

export function Nav({ atual, onIr }: { atual: Aba; onIr: (aba: Aba) => void }) {
  return (
    <nav className="nav" aria-label="Principal">
      {(Object.keys(ROTULOS) as Aba[]).map((aba) => (
        <button
          key={aba}
          type="button"
          aria-current={aba === atual ? 'page' : undefined}
          onClick={() => onIr(aba)}
        >
          {ROTULOS[aba]}
        </button>
      ))}
    </nav>
  );
}
