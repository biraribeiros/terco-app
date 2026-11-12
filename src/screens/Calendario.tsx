import { useMemo, useState } from 'react';
import { hojeISO } from '../lib/prefs';

const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

function iso(ano: number, mes: number, dia: number): string {
  return `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}

/** Quantos dias seguidos foram rezados, contando de hoje (ou de ontem, se hoje ainda não foi). */
function sequencia(rezados: Set<string>): number {
  const dia = new Date();
  if (!rezados.has(hojeISO(dia))) dia.setDate(dia.getDate() - 1);
  let total = 0;
  while (rezados.has(hojeISO(dia))) {
    total++;
    dia.setDate(dia.getDate() - 1);
  }
  return total;
}

export function Calendario({ diasRezados, kids }: { diasRezados: string[]; kids: boolean }) {
  const hoje = new Date();
  const [mes, setMes] = useState({ ano: hoje.getFullYear(), mes: hoje.getMonth() });
  const rezados = useMemo(() => new Set(diasRezados), [diasRezados]);
  const diasNoMes = new Date(mes.ano, mes.mes + 1, 0).getDate();
  const primeiroDia = new Date(mes.ano, mes.mes, 1).getDay();
  const hojeTexto = hojeISO(hoje);

  const celulas: (number | null)[] = [
    ...Array.from({ length: primeiroDia }, () => null),
    ...Array.from({ length: diasNoMes }, (_, i) => i + 1),
  ];

  const mudarMes = (delta: number) => {
    setMes((atual) => {
      const data = new Date(atual.ano, atual.mes + delta, 1);
      return { ano: data.getFullYear(), mes: data.getMonth() };
    });
  };

  const totalNoMes = Array.from({ length: diasNoMes }, (_, i) => iso(mes.ano, mes.mes, i + 1)).filter((d) =>
    rezados.has(d),
  ).length;

  return (
    <>
      <h1 className="titulo">Calendário</h1>
      <p className="texto-corpo">
        Sequência atual: <strong>{sequencia(rezados)} {sequencia(rezados) === 1 ? 'dia' : 'dias'}</strong>
      </p>

      <div className="mes-nav">
        <button type="button" className="btn btn-secundario btn-compacto" onClick={() => mudarMes(-1)} aria-label="Mês anterior">
          ‹
        </button>
        <span className="titulo-cartao">
          {MESES[mes.mes]} de {mes.ano}
        </span>
        <button type="button" className="btn btn-secundario btn-compacto" onClick={() => mudarMes(1)} aria-label="Próximo mês">
          ›
        </button>
      </div>

      <div className="calendario-grade" role="group" aria-label={`${MESES[mes.mes]} de ${mes.ano}`}>
        {DIAS_SEMANA.map((d, i) => (
          <span key={i} className="dia-semana" aria-hidden="true">
            {d}
          </span>
        ))}
        {celulas.map((dia, i) => {
          if (dia === null) return <span key={`v${i}`} />;
          const chave = iso(mes.ano, mes.mes, dia);
          const marcado = rezados.has(chave);
          return (
            <span
              key={chave}
              className={`dia${marcado ? ' rezado' : ''}${chave === hojeTexto ? ' hoje' : ''}`}
              aria-label={`${dia}${marcado ? ', rezado' : ''}`}
            >
              {dia}
              {marcado && <span className={kids ? 'marca-estrela' : 'marca-selo'} aria-hidden="true">{kids ? '★' : ''}</span>}
            </span>
          );
        })}
      </div>

      <p className="dica">
        {totalNoMes} {totalNoMes === 1 ? 'dia rezado' : 'dias rezados'} neste mês.
      </p>
    </>
  );
}
