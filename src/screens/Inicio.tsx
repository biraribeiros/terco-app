import { useMemo } from 'react';
import { CONJUNTOS } from '../data/roteiro';
import { conjuntoDoDia } from '../lib/passos';
import type { Prefs } from '../lib/prefs';

interface Props {
  prefs: Prefs;
  onRezar: () => void;
  onContinuar: () => void;
  onCalendario: () => void;
  onLembrete: () => void;
}

export function Inicio({ prefs, onRezar, onContinuar, onCalendario, onLembrete }: Props) {
  const conjunto = useMemo(() => conjuntoDoDia(), []);

  return (
    <>
      <h1 className="titulo">Que a paz esteja com você</h1>
      <div className="cartao">
        <p className="texto-corpo">Hoje, sugestão de mistérios:</p>
        <p className="texto-lead">Mistérios {CONJUNTOS[conjunto].toLowerCase()}</p>
      </div>

      {prefs.progresso && (
        <button type="button" className="btn btn-secundario" onClick={onContinuar}>
          Continuar a reza de onde parei
        </button>
      )}

      <button type="button" className="btn btn-primario" onClick={onRezar}>
        Vamos rezar o terço
      </button>

      <div className="grade-2">
        <button type="button" className="btn btn-secundario" onClick={onCalendario}>
          Calendário
        </button>
        <button type="button" className="btn btn-secundario" onClick={onLembrete}>
          Lembrete
        </button>
      </div>
    </>
  );
}
