import { useState } from 'react';
import { agendarLembrete, pedirPermissaoNotificacao } from '../lib/nativo';
import { Abas } from '../components/Abas';
import { ProximoTerco } from '../components/ProximoTerco';
import type { Alerta, Lembrete as LembreteConfig } from '../lib/prefs';

type AbaLembrete = 'semanal' | 'proximo';
const ABAS_LEMBRETE: { id: AbaLembrete; rotulo: string }[] = [
  { id: 'semanal', rotulo: 'Lembrete semanal' },
  { id: 'proximo', rotulo: 'Próximo terço' },
];

const NOMES_DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

interface Props {
  lembrete: LembreteConfig;
  alerta: Alerta;
  onSalvar: (novo: LembreteConfig) => void;
  onVoltar: () => void;
}

export function Lembrete({ lembrete, alerta, onSalvar, onVoltar }: Props) {
  const [ativo, setAtivo] = useState(lembrete.ativo);
  const [horario, setHorario] = useState(
    `${String(lembrete.hora).padStart(2, '0')}:${String(lembrete.minuto).padStart(2, '0')}`,
  );
  const [dias, setDias] = useState<number[]>(lembrete.dias);
  const [aviso, setAviso] = useState<string | null>(null);
  const [aba, setAba] = useState<AbaLembrete>('semanal');

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
    await agendarLembrete(novo.hora, novo.minuto, novo.dias, alerta);
    onSalvar(novo);
    setAviso('Lembrete salvo.');
  };

  if (aba === 'proximo') {
    return (
      <>
        <h1 className="titulo">Lembretes</h1>
        <Abas itens={ABAS_LEMBRETE} atual={aba} onTrocar={setAba} />
        <ProximoTerco alerta={alerta} horaSugerida={lembrete.hora} minutoSugerido={lembrete.minuto} />
        <button type="button" className="btn btn-secundario" onClick={onVoltar}>
          Voltar
        </button>
      </>
    );
  }

  return (
    <>
      <h1 className="titulo">Lembretes</h1>
      <Abas itens={ABAS_LEMBRETE} atual={aba} onTrocar={setAba} />
      <label className="linha-ajuste">
        <span>Me lembrar de rezar</span>
        <input type="checkbox" checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />
      </label>

      <label className="linha-ajuste">
        <span>Horário</span>
        <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} disabled={!ativo} />
      </label>

      <p className="texto-pequeno" id="rotulo-dias">Dias da semana</p>
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

      <p className="texto-pequeno">A notificação diz: “Vamos rezar o terço?”. O estilo do alerta fica em Ajustes.</p>

      {aviso && <p role="status" className="texto-pequeno">{aviso}</p>}

      <button type="button" className="btn btn-primario" onClick={() => void salvar()}>
        Salvar lembrete
      </button>

      <button type="button" className="btn btn-secundario" onClick={onVoltar}>
        Voltar
      </button>
    </>
  );
}
