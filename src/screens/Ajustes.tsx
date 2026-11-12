import { EscolhaVoz } from './Voz';
import type { Prefs, Voz } from '../lib/prefs';

interface Props {
  prefs: Prefs;
  onAlterar: (parcial: Partial<Prefs>) => void;
  onLembrete: () => void;
}

const TAMANHOS: { valor: number; rotulo: string }[] = [
  { valor: 1, rotulo: 'Normal' },
  { valor: 1.15, rotulo: 'Grande' },
  { valor: 1.3, rotulo: 'Maior' },
];

export function Ajustes({ prefs, onAlterar, onLembrete }: Props) {
  const trocarVoz = (voz: Voz) => {
    // Kids ativa o Modo Kids; as outras vozes voltam ao tema adulto.
    onAlterar({ voz });
  };

  return (
    <>
      <h1 className="titulo">Ajustes</h1>

      <section className="secao">
        <h2 className="titulo-secao">Voz</h2>
        <EscolhaVoz atual={prefs.voz} onEscolher={trocarVoz} />
      </section>

      <section className="secao">
        <h2 className="titulo-secao">Tamanho do texto</h2>
        <div className="grade-3">
          {TAMANHOS.map((t) => (
            <button
              key={t.valor}
              type="button"
              className="chip"
              aria-pressed={prefs.tamanhoTexto === t.valor}
              onClick={() => onAlterar({ tamanhoTexto: t.valor })}
            >
              {t.rotulo}
            </button>
          ))}
        </div>
      </section>

      <section className="secao">
        <h2 className="titulo-secao">Desempenho e movimento</h2>
        <label className="linha-ajuste">
          <span>Reduzir movimento</span>
          <input
            type="checkbox"
            checked={prefs.reduzirMovimento}
            onChange={(e) => onAlterar({ reduzirMovimento: e.target.checked })}
          />
        </label>
        <label className="linha-ajuste">
          <span>Modo leve (terço 2D, sem 3D)</span>
          <input
            type="checkbox"
            checked={prefs.modoLeve}
            onChange={(e) => onAlterar({ modoLeve: e.target.checked })}
          />
        </label>
      </section>

      <section className="secao">
        <h2 className="titulo-secao">Lembrete</h2>
        <button type="button" className="btn btn-secundario" onClick={onLembrete}>
          {prefs.lembrete.ativo ? 'Editar lembrete' : 'Criar lembrete'}
        </button>
      </section>

      <section className="secao">
        <h2 className="titulo-secao">Sobre e privacidade</h2>
        <p className="texto-corpo">
          Terço, versão de testes. Funciona sem internet. Não há anúncios, não há conta e nenhum dado sai do aparelho.
        </p>
      </section>
    </>
  );
}
