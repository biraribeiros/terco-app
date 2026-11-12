import { useEffect, useMemo, useRef, useState } from 'react';
import { Legenda } from '../components/Legenda';
import { Terco } from '../components/Terco';
import type { Misterio } from '../data/roteiro';
import { manterTela, vibrarLeve } from '../lib/nativo';
import { narrador, urlAudio } from '../lib/narrador';
import { montarPassos } from '../lib/passos';
import type { EstiloTerco } from '../lib/estilos';
import type { Voz } from '../lib/prefs';

interface Props {
  voz: Voz;
  misterios: Misterio[];
  intencao: string;
  passoInicial: number;
  modoLeve: boolean;
  estilo: EstiloTerco;
  onProgresso: (passo: number) => void;
  onConcluir: () => void;
  onSair: () => void;
}

/** Textos longos (Credo, Salve Rainha) usam letra menor, para a tela caber sem rolagem. */
function tamanhoFonte(caracteres: number): number {
  if (caracteres <= 90) return 22;
  if (caracteres <= 230) return 19;
  if (caracteres <= 400) return 16;
  return 14;
}

export function Oracao({ voz, misterios, intencao, passoInicial, modoLeve, estilo, onProgresso, onConcluir, onSair }: Props) {
  const semVoz = voz === 'sem-voz';
  const passos = useMemo(() => montarPassos(voz, misterios), [voz, misterios]);
  const ultimo = passos.length - 1;
  const [idx, setIdx] = useState(() => Math.min(Math.max(passoInicial, 0), ultimo));
  const [pausado, setPausado] = useState(false);

  // Refs para que os efeitos de áudio não reiniciem quando o pai re-renderiza.
  const pausadoRef = useRef(false);
  const concluirRef = useRef(onConcluir);
  const progressoRef = useRef(onProgresso);
  useEffect(() => {
    concluirRef.current = onConcluir;
    progressoRef.current = onProgresso;
  });

  const passo = passos[idx];

  const acesas = useMemo(
    // As contas da introdução ficam acesas; as das dezenas só valem dentro do conjunto em andamento.
    () =>
      passos
        .slice(0, idx + 1)
        .filter((p) => p.conta >= 0 && (p.conta < 4 || p.grupo === passo.grupo))
        .map((p) => p.conta),
    [passos, idx, passo.grupo],
  );

  // Mantém a tela ligada enquanto reza.
  useEffect(() => {
    void manterTela(true);
    return () => {
      void manterTela(false);
      narrador.parar();
    };
  }, []);

  // Salva o progresso a cada passo, para retomar depois.
  useEffect(() => {
    progressoRef.current(idx);
  }, [idx]);

  // Toca o áudio do passo; ao terminar, avança sozinho (ou conclui no último passo).
  useEffect(() => {
    if (passo.conta >= 0) vibrarLeve();
    // Sem voz não há áudio: o avanço é manual.
    if (semVoz) return;
    narrador.tocar(urlAudio(passo.caminho), () => {
      if (idx < ultimo) setIdx(idx + 1);
      else concluirRef.current();
    });
    if (pausadoRef.current) narrador.pausar();
    return () => narrador.parar();
  }, [idx, passo, ultimo, semVoz]);

  useEffect(() => {
    pausadoRef.current = pausado;
    if (pausado) narrador.pausar();
    else narrador.retomar();
  }, [pausado]);

  const avancar = () => {
    if (idx < ultimo) setIdx(idx + 1);
    else onConcluir();
  };

  const voltar = () => {
    if (idx > 0) setIdx(idx - 1);
  };

  const contaAtual = passo.conta >= 0 ? passo.conta : (acesas[acesas.length - 1] ?? -1);
  const progresso = Math.round(((idx + 1) / passos.length) * 100);

  return (
    <div className="oracao">
      <div className="oracao-topo">
        <button type="button" className="btn btn-secundario btn-compacto" onClick={onSair}>
          Sair
        </button>
        <span className="dica">{passo.titulo}</span>
      </div>

      <div className="barra" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progresso} aria-label="Progresso da reza">
        <span style={{ width: `${progresso}%` }} />
      </div>

      <Terco acesas={acesas} atual={contaAtual} foco={passo.decada >= 0 ? passo.decada : null} modoLeve={modoLeve} estilo={estilo} />

      {intencao && <p className="texto-pequeno intencao-linha">Intenção: {intencao}</p>}

      <Legenda className="oracao-texto" texto={passo.texto} acompanhar={!semVoz} style={{ fontSize: `calc(${tamanhoFonte(passo.texto.length)}px * var(--text-scale))` }} />

      <div className="controles" data-sem-voz={semVoz}>
        <button type="button" className="btn btn-secundario" onClick={voltar} disabled={idx === 0}>
          Voltar
        </button>
        {!semVoz && (
          <button type="button" className="btn btn-secundario" onClick={() => setPausado((p) => !p)}>
            {pausado ? 'Continuar' : 'Pausar'}
          </button>
        )}
        <button type="button" className="btn btn-primario" onClick={avancar}>
          Avançar
        </button>
      </div>
    </div>
  );
}
