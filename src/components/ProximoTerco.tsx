import { useState } from 'react';
import { abrirGoogleAgenda, sugestaoProximo } from '../lib/agenda';
import { agendarProximo, pedirPermissaoNotificacao } from '../lib/nativo';
import type { Alerta } from '../lib/prefs';

function dataParaCampo(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function horaParaCampo(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}`;
}

const ALERTAS: { valor: Alerta; rotulo: string }[] = [
  { valor: 'som', rotulo: 'Som' },
  { valor: 'vibrar', rotulo: 'Vibração' },
  { valor: 'silencioso', rotulo: 'Silencioso' },
];

interface Props {
  alerta: Alerta;
  onAlerta: (alerta: Alerta) => void;
  horaSugerida: number;
  minutoSugerido: number;
}

/** Escolha de data e horário do próximo terço, com lembrete no aparelho e Google Agenda. */
export function ProximoTerco({ alerta, onAlerta, horaSugerida, minutoSugerido }: Props) {
  const sugestao = sugestaoProximo(horaSugerida, minutoSugerido);
  const [data, setData] = useState(dataParaCampo(sugestao));
  const [hora, setHora] = useState(horaParaCampo(sugestao));
  const [aviso, setAviso] = useState<string | null>(null);

  const quando = (): Date | null => {
    const [ano, mes, dia] = data.split('-').map(Number);
    const [h, m] = hora.split(':').map(Number);
    if (!ano || !mes || !dia || Number.isNaN(h) || Number.isNaN(m)) return null;
    return new Date(ano, mes - 1, dia, h, m, 0, 0);
  };

  const criarLembrete = async () => {
    const q = quando();
    if (!q) {
      setAviso('Escolha uma data e um horário.');
      return;
    }
    if (q.getTime() <= Date.now()) {
      setAviso('Escolha um horário que ainda não passou.');
      return;
    }
    if (!(await pedirPermissaoNotificacao())) {
      setAviso('Sem permissão para notificações. Ative o aviso nas configurações do celular.');
      return;
    }
    const ok = await agendarProximo(q, alerta);
    setAviso(ok ? 'Lembrete criado.' : 'Não foi possível criar o lembrete neste aparelho.');
  };

  const noGoogle = () => {
    const q = quando();
    if (!q) {
      setAviso('Escolha uma data e um horário.');
      return;
    }
    abrirGoogleAgenda(q);
    setAviso('Abrindo o Google Agenda. Confirme o evento por lá.');
  };

  return (
    <section className="vidro proximo" aria-label="Próximo terço">
      <h2 className="titulo-cartao">Agendar o próximo terço</h2>
      <div className="linha-dupla">
        <label className="campo">
          <span className="texto-pequeno">Data</span>
          <input type="date" className="entrada" value={data} onChange={(e) => setData(e.target.value)} />
        </label>
        <label className="campo">
          <span className="texto-pequeno">Horário</span>
          <input type="time" className="entrada" value={hora} onChange={(e) => setHora(e.target.value)} />
        </label>
      </div>
      <p className="texto-pequeno">Alerta</p>
      <div className="grade-3" role="group" aria-label="Estilo do alerta">
        {ALERTAS.map((a) => (
          <button
            key={a.valor}
            type="button"
            className="chip chip-compacto"
            aria-pressed={alerta === a.valor}
            onClick={() => onAlerta(a.valor)}
          >
            {a.rotulo}
          </button>
        ))}
      </div>
      <div className="linha-dupla">
        <button type="button" className="btn btn-secundario" onClick={() => void criarLembrete()}>
          Notificação
        </button>
        <button type="button" className="btn btn-secundario" onClick={noGoogle}>
          Google Agenda
        </button>
      </div>
      {aviso && (
        <p role="status" className="texto-pequeno">
          {aviso}
        </p>
      )}
    </section>
  );
}
