import { narrador, urlAudio } from '../lib/narrador';
import type { Voz, VozFalada } from '../lib/prefs';

const OPCOES: { voz: VozFalada; titulo: string }[] = [
  { voz: 'masculina', titulo: 'Masculina' },
  { voz: 'feminina', titulo: 'Feminina' },
  { voz: 'kids', titulo: 'Infantil' },
];

/** Cartões de voz, cada um com amostra. Usado na primeira abertura e nos Ajustes. */
export function EscolhaVoz({ atual, onEscolher }: { atual: Voz; onEscolher: (voz: Voz) => void }) {
  return (
    <div className="grade-vozes" role="group" aria-label="Voz">
      {OPCOES.map((op) => (
        <div key={op.voz} className="cartao cartao-voz" data-selecionada={op.voz === atual}>
          <button
            type="button"
            className="cartao-voz-escolha"
            aria-pressed={op.voz === atual}
            onClick={() => onEscolher(op.voz)}
          >
            <span className="titulo-cartao">{op.titulo}</span>
          </button>
          <button
            type="button"
            className="btn-icone btn-alto-falante"
            aria-label={`Ouvir amostra da voz ${op.titulo}`}
            onClick={() => narrador.tocar(urlAudio(`${op.voz}/boas-vindas.mp3`), () => {})}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" />
              <path d="M15.5 9a4 4 0 0 1 0 6" />
              <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
