import { useEffect, useMemo, useRef, useState } from 'react';
import { Terco } from '../components/Terco';
import type { Misterio } from '../data/roteiro';
import { manterTela, vibrarLeve } from '../lib/nativo';
import { narrador, urlAudio } from '../lib/narrador';
import { montarPassos } from '../lib/passos';
import type { Voz } from '../lib/prefs';

interface Props {
  voz: Voz;
  misterios: Misterio[];
  passoInicial: number;
  modoLeve: boolean;
  onProgresso: (passo: number) => void;
  onConcluir: () => void;
  onSair: () => void;
}

export function Oracao({ voz, misterios, passoInicial, modoLeve, onProgresso, onConcluir, onSair }: Props) {
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
    () => passos.slice(0, idx + 1).filter((p) => p.conta >= 0).map((p) => p.conta),
    [passos, idx],
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
    narrador.tocar(urlAudio(passo.caminho), () => {
      if (idx < ultimo) setIdx(idx + 1);
      else concluirRef.current();
    });
    if (pausadoRef.current) narrador.pausar();
    return () => narrador.parar();
  }, [idx, passo, ultimo]);

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

      <Terco acesas={acesas} atual={contaAtual} foco={passo.decada >= 0 ? passo.decada : null} modoLeve={modoLeve} />

      <p className="oracao-texto" aria-live="polite">
        {passo.texto}
      </p>

      <div className="controles">
        <button type="button" className="btn btn-secundario" onClick={voltar} disabled={idx === 0}>
          Voltar
        </button>
        <button type="button" className="btn btn-secundario" onClick={() => setPausado((p) => !p)}>
          {pausado ? 'Continuar' : 'Pausar'}
        </button>
        <button type="button" className="btn btn-primario" onClick={avancar}>
          Avançar
        </button>
      </div>
    </div>
  );
}
