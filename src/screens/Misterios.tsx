import { useState } from 'react';
import { CONJUNTOS, type Conjunto, type Misterio } from '../data/roteiro';
import { misteriosDoConjunto } from '../lib/passos';

interface Props {
  onIniciar: (misterios: Misterio[]) => void;
  onVoltar: () => void;
}

const CONJUNTOS_ORDEM: Conjunto[] = ['gozosos', 'luminosos', 'dolorosos', 'gloriosos'];

export function Misterios({ onIniciar, onVoltar }: Props) {
  const [conjunto, setConjunto] = useState<Conjunto | null>(null);

  if (conjunto === null) {
    return (
      <>
        <h1 className="titulo">Escolha os mistérios</h1>
        <div className="grade-2">
          {CONJUNTOS_ORDEM.map((c) => (
            <button key={c} type="button" className={`cartao cartao-conjunto cartao-${c}`} onClick={() => setConjunto(c)}>
              <span className="titulo-cartao">{CONJUNTOS[c]}</span>
              <span className="texto-corpo">5 mistérios</span>
            </button>
          ))}
        </div>
        <button type="button" className="btn btn-secundario" onClick={onVoltar}>
          Voltar
        </button>
      </>
    );
  }

  const lista = misteriosDoConjunto(conjunto);
  return (
    <>
      <h1 className="titulo">Mistérios {CONJUNTOS[conjunto].toLowerCase()}</h1>
      <button type="button" className="btn btn-primario" onClick={() => onIniciar(lista)}>
        Rosário completo (5 mistérios)
      </button>
      <p className="texto-corpo">Ou reze apenas um mistério:</p>
      {lista.map((m) => (
        <button key={m.chave} type="button" className="btn btn-secundario btn-alinhado" onClick={() => onIniciar([m])}>
          {m.ordem}º · {m.nome}
        </button>
      ))}
      <button type="button" className="btn btn-secundario" onClick={() => setConjunto(null)}>
        Voltar aos conjuntos
      </button>
    </>
  );
}
