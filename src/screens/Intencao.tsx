import { useState } from 'react';

export const SUGESTOES_INTENCAO = [
  'Pela minha família',
  'Pela saúde de alguém',
  'Pelos enfermos',
  'Em agradecimento',
  'Pela paz',
  'Por uma pessoa especial',
];

const OUTRA = 'Outra intenção';

interface Props {
  nome: string;
  temProgresso: boolean;
  onContinuar: (intencao: string) => void;
  onRetomar: () => void;
}

export function Intencao({ nome, temProgresso, onContinuar, onRetomar }: Props) {
  const [escolha, setEscolha] = useState<string | null>(null);
  const [texto, setTexto] = useState('');

  const intencao = escolha === OUTRA ? texto.trim() : (escolha ?? '');

  return (
    <>
      <h1 className="titulo">
        {nome ? `Olá, ${nome}!` : 'Olá!'} Por quem vamos rezar hoje?
      </h1>
      <p className="texto-pequeno">Escolher uma intenção é opcional.</p>

      <div className="chips" role="group" aria-label="Intenção">
        {[...SUGESTOES_INTENCAO, OUTRA].map((s) => (
          <button
            key={s}
            type="button"
            className="chip chip-largo"
            aria-pressed={escolha === s}
            onClick={() => setEscolha(escolha === s ? null : s)}
          >
            {s}
          </button>
        ))}
      </div>

      {escolha === OUTRA && (
        <label className="campo">
          <span className="texto-pequeno">Escreva a sua intenção</span>
          <textarea
            className="entrada"
            rows={3}
            maxLength={200}
            value={texto}
            placeholder="Por quem ou pelo que você quer rezar?"
            onChange={(e) => setTexto(e.target.value)}
          />
        </label>
      )}

      <button type="button" className="btn btn-primario" onClick={() => onContinuar(intencao)}>
        Continuar
      </button>
      {temProgresso && (
        <button type="button" className="btn btn-secundario" onClick={onRetomar}>
          Continuar a reza de onde parei
        </button>
      )}
    </>
  );
}
