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
            className="btn btn-secundario btn-compacto"
            aria-label={`Ouvir amostra da voz ${op.titulo}`}
            onClick={() => narrador.tocar(urlAudio(`${op.voz}/boas-vindas.mp3`), () => {})}
          >
            Ouvir
          </button>
        </div>
      ))}
    </div>
  );
}
