import { DIAS_NOVENA } from '../lib/prefs';

interface Props {
  intencao: string;
  /** Dias (AAAA-MM-DD) já rezados. */
  dias: string[];
  /** Dia da novena que será rezado agora (1 a 9). */
  dia: number;
  onContinuar: () => void;
  onRecomecar: () => void;
}

/** Aparece na abertura quando há uma novena em andamento. */
export function Novena({ intencao, dias, dia, onContinuar, onRecomecar }: Props) {
  return (
    <>
      <h1 className="titulo">Novena (9 dias)</h1>
      {intencao && <p className="texto-pequeno">Intenção: {intencao}</p>}
      <ol className="novena-dias" aria-label="Dias da novena">
        {Array.from({ length: DIAS_NOVENA }, (_, i) => {
          const rezado = dias[i];
          const estado = rezado ? 'rezado' : i + 1 === dia ? 'hoje' : 'pendente';
          return (
            <li
              key={i}
              className={`vidro novena-dia novena-dia-${estado}`}
              aria-label={`Dia ${i + 1}: ${rezado ? `rezado em ${rezado.slice(8, 10)}/${rezado.slice(5, 7)}` : i + 1 === dia ? 'hoje' : 'ainda não rezado'}`}
            >
              <span className="novena-dia-numero">{i + 1}</span>
              <span className="novena-dia-data">
                {rezado ? `✓ ${rezado.slice(8, 10)}/${rezado.slice(5, 7)}` : i + 1 === dia ? 'hoje' : ''}
              </span>
            </li>
          );
        })}
      </ol>
      <button type="button" className="btn btn-primario" onClick={onContinuar}>
        Continuar
      </button>
      <button type="button" className="btn btn-secundario" onClick={onRecomecar}>
        Recomeçar
      </button>
    </>
  );
}
