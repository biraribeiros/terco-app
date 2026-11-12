import { useMemo, useState } from 'react';
import { Abas } from '../components/Abas';
import { hojeISO, type Registro } from '../lib/prefs';

type AbaCalendario = 'dias' | 'historico';
const ABAS: { id: AbaCalendario; rotulo: string }[] = [
  { id: 'dias', rotulo: 'Dias' },
  { id: 'historico', rotulo: 'Histórico' },
];

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

export function Calendario({
  diasRezados,
  historico,
  kids,
}: {
  diasRezados: string[];
  historico: Registro[];
  kids: boolean;
}) {
  const hoje = new Date();
  const [aba, setAba] = useState<AbaCalendario>('dias');
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

  const prefixo = `${mes.ano}-${String(mes.mes + 1).padStart(2, '0')}-`;
  const orcoesNoMes = historico
    .filter((r) => r.data.startsWith(prefixo))
    .sort((a, b) => `${b.data} ${b.hora}`.localeCompare(`${a.data} ${a.hora}`));

  return (
    <>
      <h1 className="titulo">Calendário</h1>
      <Abas itens={ABAS} atual={aba} onTrocar={setAba} />

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

      {aba === 'dias' && (
        <>
          <p className="texto-pequeno">
            Sequência atual: <strong>{sequencia(rezados)} {sequencia(rezados) === 1 ? 'dia' : 'dias'}</strong>
          </p>
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
          <p className="texto-pequeno">
            {totalNoMes} {totalNoMes === 1 ? 'dia rezado' : 'dias rezados'} neste mês.{' '}
            {orcoesNoMes.length} {orcoesNoMes.length === 1 ? 'oração concluída' : 'orações concluídas'}.
          </p>
        </>
      )}

      {aba === 'historico' &&
        (orcoesNoMes.length === 0 ? (
          <p className="texto-pequeno">Nenhuma oração registrada em {MESES[mes.mes]}.</p>
        ) : (
          <>
            <ul className="historico">
              {orcoesNoMes.slice(0, 4).map((r) => (
                <li key={r.id} className="vidro historico-item">
                  <span className="titulo-cartao">{r.titulo}</span>
                  <span className="texto-pequeno">
                    {r.data.slice(8, 10)}/{r.data.slice(5, 7)} às {r.hora}
                    {r.intencao ? ` · ${r.intencao}` : ''}
                  </span>
                </li>
              ))}
            </ul>
            {orcoesNoMes.length > 4 && (
              <p className="texto-pequeno">Mostrando as 4 mais recentes de {orcoesNoMes.length}.</p>
            )}
          </>
        ))}
    </>
  );
}
