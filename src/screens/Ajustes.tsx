import { useState } from 'react';
import { Abas } from '../components/Abas';
import { Terco } from '../components/Terco';
import { Velocidade } from '../components/Velocidade';
import { ESTILOS, ORDEM_ESTILOS } from '../lib/estilos';
import { agendarLembrete } from '../lib/nativo';
import type { Alerta, Prefs, Voz } from '../lib/prefs';
import { EscolhaVoz } from './Voz';
import { CreditoVia } from '../components/CreditoVia';

interface Props {
  prefs: Prefs;
  onAlterar: (parcial: Partial<Prefs>) => void;
  onLembrete: () => void;
}

type Secao = 'perfil' | 'voz' | 'terco' | 'tela' | 'alertas' | 'sobre';

const SECOES: { id: Secao; rotulo: string }[] = [
  { id: 'perfil', rotulo: 'Perfil' },
  { id: 'voz', rotulo: 'Voz' },
  { id: 'terco', rotulo: 'Terço' },
  { id: 'tela', rotulo: 'Tela' },
  { id: 'alertas', rotulo: 'Alertas' },
  { id: 'sobre', rotulo: 'Sobre' },
];

const TAMANHOS: { valor: number; rotulo: string }[] = [
  { valor: 1, rotulo: 'Normal' },
  { valor: 1.15, rotulo: 'Grande' },
  { valor: 1.3, rotulo: 'Maior' },
];

const ALERTAS: { valor: Alerta; rotulo: string }[] = [
  { valor: 'som', rotulo: 'Som' },
  { valor: 'vibrar', rotulo: 'Vibração' },
  { valor: 'silencioso', rotulo: 'Silencioso' },
];

export function Ajustes({ prefs, onAlterar, onLembrete }: Props) {
  const [secao, setSecao] = useState<Secao>('perfil');

  const trocarVoz = (voz: Voz) => {
    // Infantil ativa o Modo Kids; as outras vozes voltam ao tema adulto.
    onAlterar({ voz });
  };

  const trocarAlerta = (alerta: Alerta) => {
    onAlterar({ alerta });
    // O estilo vale para o canal do lembrete: reagenda com o novo estilo.
    const { ativo, hora, minuto, dias } = prefs.lembrete;
    if (ativo) void agendarLembrete(hora, minuto, dias, alerta);
  };

  return (
    <>
      <h1 className="titulo">Ajustes</h1>
      <Abas itens={SECOES} atual={secao} onTrocar={setSecao} />

      {secao === 'perfil' && (
        <label className="campo">
          <span className="texto-pequeno">Seu nome</span>
          <input
            type="text"
            className="entrada"
            value={prefs.nome}
            maxLength={40}
            autoComplete="given-name"
            onChange={(e) => onAlterar({ nome: e.target.value })}
          />
        </label>
      )}

      {secao === 'voz' && (
        <>
          <EscolhaVoz atual={prefs.voz} onEscolher={trocarVoz} />
          <p className="texto-pequeno">Velocidade da voz</p>
          <Velocidade valor={prefs.velocidade} onEscolher={(velocidade) => onAlterar({ velocidade })} />
          <label className="linha-ajuste">
            <span>Música de abertura</span>
            <input
              type="checkbox"
              checked={prefs.musica}
              onChange={(e) => onAlterar({ musica: e.target.checked })}
            />
          </label>
        </>
      )}

      {secao === 'terco' && (
        <>
          <div className="previa-terco">
            <Terco acesas={[]} atual={-1} foco={null} girando modoLeve={prefs.modoLeve} estilo={prefs.estiloTerco} />
          </div>
          <div className="grade-2" role="group" aria-label="Estilo do terço">
            {ORDEM_ESTILOS.map((id) => (
              <button
                key={id}
                type="button"
                className="chip"
                aria-pressed={prefs.estiloTerco === id}
                onClick={() => onAlterar({ estiloTerco: id })}
              >
                {ESTILOS[id].nome}
              </button>
            ))}
          </div>
        </>
      )}

      {secao === 'tela' && (
        <>
          <p className="texto-pequeno">Tamanho do texto</p>
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
        </>
      )}

      {secao === 'alertas' && (
        <>
          <p className="texto-pequeno">Estilo de alerta</p>
          <div className="grade-3">
            {ALERTAS.map((a) => (
              <button
                key={a.valor}
                type="button"
                className="chip"
                aria-pressed={prefs.alerta === a.valor}
                onClick={() => trocarAlerta(a.valor)}
              >
                {a.rotulo}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-secundario" onClick={onLembrete}>
            {prefs.lembrete.ativo ? 'Editar lembretes e próximo terço' : 'Criar lembretes e próximo terço'}
          </button>
          <p className="texto-pequeno">
            Google Agenda: em “Próximo terço” o botão abre o evento já preenchido e você confirma por lá, com a sua
            conta Google. A conexão automática da conta ainda não está disponível.
          </p>
        </>
      )}

      {secao === 'sobre' && (
        <>
        <p className="texto-pequeno">
          Este terço é um presente da família Via, feito pra acompanhar você na oração. Não custa nada: não tem
          anúncio, não pede cadastro e funciona sem internet. Se fizer bem pra você, passe pra frente.
        </p>
        <p className="texto-pequeno">
          Rosário Guiado, versão de testes. Funciona sem internet. Não há anúncios nem conta. Seu nome, suas intenções,
          o progresso e o histórico ficam só neste aparelho. A internet é usada apenas quando você escolhe Google Agenda
          ou compartilhar um convite. Textos bíblicos: Bíblia Portuguesa Mundial, em domínio público.
        </p>
        <CreditoVia />
        </>
      )}
    </>
  );
}
