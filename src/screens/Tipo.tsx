import { useState } from 'react';
import type { Tipo as TipoOracao } from '../lib/prefs';

const OPCOES: { tipo: TipoOracao; titulo: string; resumo: string; explicacao: string }[] = [
  {
    tipo: 'rosario',
    titulo: 'Rosário completo',
    resumo: '20 mistérios · os quatro conjuntos',
    explicacao:
      'O Rosário completo é uma forma de oração contemplativa que reúne os quatro conjuntos de mistérios: Gozosos, Luminosos, Dolorosos e Gloriosos. Ao rezá-lo integralmente, percorremos os mistérios da vida de Jesus e Maria.',
  },
  {
    tipo: 'terco',
    titulo: 'Terço',
    resumo: '5 mistérios · um conjunto',
    explicacao:
      'O Terço é a oração de um conjunto de cinco mistérios, acompanhado pelas orações tradicionais. É uma forma de contemplar uma parte do Rosário, dedicando um momento de fé e oração.',
  },
];

interface Props {
  onEscolher: (tipo: TipoOracao) => void;
  onVoltar: () => void;
}

export function Tipo({ onEscolher, onVoltar }: Props) {
  const [aberto, setAberto] = useState<TipoOracao | null>(null);

  return (
    <>
      <h1 className="titulo">Como você quer rezar?</h1>
      {OPCOES.map((op) => (
        <section key={op.tipo} className="vidro cartao-tipo" aria-label={op.titulo}>
          <div className="cartao-tipo-cabeca">
            <div>
              <h2 className="titulo-cartao">{op.titulo}</h2>
              <p className="texto-pequeno">{op.resumo}</p>
            </div>
            <button
              type="button"
              className="btn-icone"
              aria-expanded={aberto === op.tipo}
              aria-label={`Saiba mais sobre ${op.titulo}`}
              onClick={() => setAberto(aberto === op.tipo ? null : op.tipo)}
            >
              i
            </button>
          </div>
          {aberto === op.tipo && <p className="texto-corpo explicacao">{op.explicacao}</p>}
          <button type="button" className="btn btn-primario" onClick={() => onEscolher(op.tipo)}>
            Rezar {op.tipo === 'rosario' ? 'o Rosário completo' : 'o Terço'}
          </button>
        </section>
      ))}
      <button type="button" className="btn btn-secundario" onClick={onVoltar}>
        Voltar
      </button>
    </>
  );
}
