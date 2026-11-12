import { useState } from 'react';
import { agendarLembrete, pedirPermissaoNotificacao } from '../lib/nativo';
import type { Lembrete as LembreteConfig } from '../lib/prefs';

const NOMES_DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

interface Props {
  lembrete: LembreteConfig;
  onSalvar: (novo: LembreteConfig) => void;
  onVoltar: () => void;
}

export function Lembrete({ lembrete, onSalvar, onVoltar }: Props) {
  const [ativo, setAtivo] = useState(lembrete.ativo);
  const [horario, setHorario] = useState(
    `${String(lembrete.hora).padStart(2, '0')}:${String(lembrete.minuto).padStart(2, '0')}`,
  );
  const [dias, setDias] = useState<number[]>(lembrete.dias);
  const [aviso, setAviso] = useState<string | null>(null);

  const alternarDia = (dia: number) => {
    setDias((atual) => (atual.includes(dia) ? atual.filter((d) => d !== dia) : [...atual, dia].sort()));
  };

  const salvar = async () => {
    const [hora, minuto] = horario.split(':').map(Number);
    if (ativo) {
      const permitido = await pedirPermissaoNotificacao();
      if (!permitido) {
        setAviso('Sem permissão para notificações. Ative o aviso nas configurações do celular.');
        return;
      }
    }
    const novo: LembreteConfig = { ativo, hora, minuto, dias: ativo ? dias : [] };
    await agendarLembrete(novo.hora, novo.minuto, novo.dias);
    onSalvar(novo);
    setAviso('Lembrete salvo.');
  };

  return (
    <>
      <h1 className="titulo">Lembrete</h1>
      <label className="linha-ajuste">
        <span>Me lembrar de rezar</span>
        <input type="checkbox" checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />
      </label>

      <label className="linha-ajuste">
        <span>Horário</span>
        <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} disabled={!ativo} />
      </label>

      <p className="texto-corpo">Dias da semana</p>
      <div className="grade-dias">
        {NOMES_DIAS.map((nome, dia) => (
          <button
            key={nome}
            type="button"
            className="chip"
            aria-pressed={dias.includes(dia)}
            disabled={!ativo}
            onClick={() => alternarDia(dia)}
          >
            {nome}
          </button>
        ))}
      </div>

      <p className="texto-corpo">A notificação diz: “Vamos rezar o terço?”. Ela chega mesmo com o app fechado.</p>

      {aviso && <p role="status" className="texto-corpo">{aviso}</p>}

      <button type="button" className="btn btn-primario" onClick={() => void salvar()}>
        Salvar lembrete
      </button>
      <button type="button" className="btn btn-secundario" onClick={onVoltar}>
        Voltar
      </button>
    </>
  );
}
