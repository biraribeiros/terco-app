export const VELOCIDADES = [0.5, 1, 2, 3];

/** Escolha da velocidade da voz: 0,5×, 1×, 2× ou 3×. */
export function Velocidade({ valor, onEscolher }: { valor: number; onEscolher: (velocidade: number) => void }) {
  return (
    <div className="velocidade" role="group" aria-label="Velocidade da voz">
      {VELOCIDADES.map((v) => (
        <button
          key={v}
          type="button"
          className="chip chip-velocidade"
          aria-pressed={valor === v}
          onClick={() => onEscolher(v)}
        >
          {String(v).replace('.', ',')}×
        </button>
      ))}
    </div>
  );
}
