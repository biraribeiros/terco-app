import { useMemo, useState } from 'react';
import { CONJUNTOS, type Conjunto, type Misterio } from '../data/roteiro';
import { conjuntoDoDia, misteriosDoConjunto, misteriosDoRosario, ORDEM_CONJUNTOS } from '../lib/passos';
import type { Tipo } from '../lib/prefs';

interface Props {
  tipo: Tipo;
  onIniciar: (misterios: Misterio[]) => void;
  onVoltar: () => void;
}

export function Misterios({ tipo, onIniciar, onVoltar }: Props) {
  const [conjunto, setConjunto] = useState<Conjunto | null>(null);
  const sugestao = useMemo(() => conjuntoDoDia(), []);

  if (tipo === 'rosario') {
    return (
      <>
        <h1 className="titulo">Rosário completo</h1>
        <p className="texto-pequeno">Os quatro conjuntos, um após o outro, com 20 mistérios.</p>
        <div className="grade-2">
          {ORDEM_CONJUNTOS.map((c) => (
            <section key={c} className="vidro cartao-conjunto">
              <h2 className="titulo-cartao">{CONJUNTOS[c]}</h2>
              <p className="texto-pequeno">5 mistérios</p>
            </section>
          ))}
        </div>
        <button type="button" className="btn btn-primario" onClick={() => onIniciar(misteriosDoRosario())}>
          Iniciar
        </button>
        <button type="button" className="btn btn-secundario" onClick={onVoltar}>
          Voltar
        </button>
      </>
    );
  }

  if (conjunto === null) {
    return (
      <>
        <h1 className="titulo">Escolha os mistérios</h1>
        <div className="grade-2">
          {ORDEM_CONJUNTOS.map((c) => (
            <button key={c} type="button" className="vidro cartao-conjunto cartao-botao" onClick={() => setConjunto(c)}>
              <span className="titulo-cartao">{CONJUNTOS[c]}</span>
              <span className="texto-pequeno">5 mistérios</span>
              {c === sugestao && <span className="selo">Sugestão</span>}
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
      <ol className="lista-simples">
        {lista.map((m) => (
          <li key={m.chave}>{m.nome}</li>
        ))}
      </ol>
      <button type="button" className="btn btn-primario" onClick={() => onIniciar(lista)}>
        Iniciar
      </button>
      <button type="button" className="btn btn-secundario" onClick={() => setConjunto(null)}>
        Voltar
      </button>
    </>
  );
}
