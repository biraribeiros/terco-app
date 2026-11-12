import { useState } from 'react';
import { narrador, urlAudio } from '../lib/narrador';
import type { Voz } from '../lib/prefs';

const OPCOES: { voz: Voz; titulo: string; descricao: string }[] = [
  { voz: 'feminina', titulo: 'Feminina', descricao: 'Voz suave e calma (Keren).' },
  { voz: 'masculina', titulo: 'Masculina', descricao: 'Voz firme e serena (Carlos).' },
  { voz: 'kids', titulo: 'Kids', descricao: 'Voz animada para crianças (Piku). Ativa o Modo Kids.' },
];

/** Três cartões de voz, cada um com amostra. Usado no onboarding e nos Ajustes. */
export function EscolhaVoz({ atual, onEscolher }: { atual: Voz; onEscolher: (voz: Voz) => void }) {
  return (
    <div className="grade-vozes">
      {OPCOES.map((op) => (
        <div key={op.voz} className="cartao cartao-voz" data-selecionada={op.voz === atual}>
          <button
            type="button"
            className="cartao-voz-escolha"
            aria-pressed={op.voz === atual}
            onClick={() => onEscolher(op.voz)}
          >
            <span className="titulo-cartao">{op.titulo}</span>
            <span className="texto-corpo">{op.descricao}</span>
          </button>
          <button
            type="button"
            className="btn btn-secundario"
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

export function TelaVoz({ atual, onConfirmar }: { atual: Voz; onConfirmar: (voz: Voz) => void }) {
  const [escolhida, setEscolhida] = useState<Voz>(atual);
  return (
    <>
      <h1 className="titulo">Escolha a voz que guia a sua reza</h1>
      <p className="texto-corpo">Você pode trocar depois, em Ajustes.</p>
      <EscolhaVoz atual={escolhida} onEscolher={setEscolhida} />
      <button type="button" className="btn btn-primario" onClick={() => onConfirmar(escolhida)}>
        Continuar
      </button>
    </>
  );
}
