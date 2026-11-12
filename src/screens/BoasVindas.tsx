import { useEffect, useRef } from 'react';
import { Legenda } from '../components/Legenda';
import { BOAS_VINDAS } from '../data/roteiro';
import { musica, VOLUME_SOB_VOZ, VOLUME_TRILHA } from '../lib/musica';
import { narrador, urlAudio } from '../lib/narrador';
import type { Voz } from '../lib/prefs';

interface Props {
  voz: Voz;
  onComecar: () => void;
}

/** Mensagem gravada antes da oração. Sem voz, só o texto e um botão. */
export function BoasVindas({ voz, onComecar }: Props) {
  const comecarRef = useRef(onComecar);
  useEffect(() => {
    comecarRef.current = onComecar;
  });

  useEffect(() => {
    if (voz === 'sem-voz') return;
    musica.ir(VOLUME_SOB_VOZ, 800);
    narrador.tocar(urlAudio(`${voz}/boas-vindas.mp3`), () => {
      musica.ir(VOLUME_TRILHA, 800);
      comecarRef.current();
    });
    return () => narrador.parar();
  }, [voz]);

  const texto =
    voz === 'sem-voz' ? BOAS_VINDAS.masculina : BOAS_VINDAS[voz];

  return (
    <div className="boas-vindas">
      <p className="assinatura">Rosário Guiado</p>
      <Legenda className="texto-grande" texto={texto} acompanhar={voz !== 'sem-voz'} />
      <button type="button" className="btn btn-primario" onClick={onComecar}>
        {voz === 'sem-voz' ? 'Começar a rezar' : 'Começar agora'}
      </button>
    </div>
  );
}
