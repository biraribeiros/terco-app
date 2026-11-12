import { useState } from 'react';

export const SUGESTOES_INTENCAO = ['Família', 'Saúde', 'Vida financeira', 'Amor', 'Gratidão', 'Estudos'];

interface Props {
  nome: string;
  temProgresso: boolean;
  /** Só oferece começar uma novena quando não há outra em andamento. */
  podeNovena: boolean;
  onContinuar: (intencao: string, comoNovena: boolean) => void;
  onRetomar: () => void;
}

export function Intencao({ nome, temProgresso, podeNovena, onContinuar, onRetomar }: Props) {
  const [escolhidas, setEscolhidas] = useState<string[]>([]);
  const [texto, setTexto] = useState('');
  const [novena, setNovena] = useState(false);

  const alternar = (palavra: string) =>
    setEscolhidas((atual) => (atual.includes(palavra) ? atual.filter((p) => p !== palavra) : [...atual, palavra]));

  // Palavras escolhidas e texto livre viram uma só intenção, na ordem em que aparecem na tela.
  const intencao = [...SUGESTOES_INTENCAO.filter((p) => escolhidas.includes(p)), texto.trim()]
    .filter(Boolean)
    .join(' · ');

  return (
    <>
      <h1 className="titulo">
        {nome ? `Olá, ${nome}!` : 'Olá!'} Por quem vamos rezar hoje?
      </h1>

      <div className="chips" role="group" aria-label="Intenção">
        {SUGESTOES_INTENCAO.map((palavra) => (
          <button
            key={palavra}
            type="button"
            className="chip chip-compacto"
            aria-pressed={escolhidas.includes(palavra)}
            onClick={() => alternar(palavra)}
          >
            {palavra}
          </button>
        ))}
      </div>

      <label className="campo">
        <span className="texto-pequeno">Ou escreva a sua intenção (opcional)</span>
        <textarea
          className="entrada"
          rows={3}
          maxLength={200}
          value={texto}
          placeholder="Por quem ou pelo que você quer rezar?"
          onChange={(e) => setTexto(e.target.value)}
        />
      </label>

      {podeNovena && (
        <button type="button" className="chip btn-fixo" aria-pressed={novena} onClick={() => setNovena(!novena)}>
          Novena (9 dias)
        </button>
      )}

      <button type="button" className="btn btn-primario btn-fixo" onClick={() => onContinuar(intencao, novena)}>
        Continuar
      </button>
      {temProgresso && (
        <button type="button" className="btn btn-secundario btn-fixo" onClick={onRetomar}>
          Retomar
        </button>
      )}
    </>
  );
}
