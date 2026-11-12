import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { narrador } from '../lib/narrador';

interface Props {
  texto: string;
  /** Acompanha a voz destacando o que já foi falado. Sem voz, mostra o texto inteiro. */
  acompanhar: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Texto legendado: as palavras já faladas ficam em destaque, na medida do áudio. */
export function Legenda({ texto, acompanhar, className, style }: Props) {
  const palavras = useMemo(() => texto.split(' '), [texto]);
  // Peso de cada palavra pelo tamanho, para o destaque seguir o ritmo da fala.
  const limites = useMemo(() => {
    const total = palavras.reduce((soma, p) => soma + p.length + 1, 0);
    let acumulado = 0;
    return palavras.map((p) => {
      acumulado += p.length + 1;
      return acumulado / total;
    });
  }, [palavras]);

  const [fracao, setFracao] = useState<number | null>(null);

  useEffect(() => {
    if (!acompanhar) return;
    let quadro = 0;
    const ler = () => {
      setFracao(narrador.fracao());
      quadro = requestAnimationFrame(ler);
    };
    quadro = requestAnimationFrame(ler);
    return () => {
      cancelAnimationFrame(quadro);
      setFracao(null);
    };
  }, [acompanhar, texto]);

  const legendando = acompanhar && fracao !== null;
  // Palavra falada agora: a primeira cujo limite ainda não foi alcançado.
  const atual = legendando ? limites.findIndex((limite) => limite > (fracao ?? 0)) : -1;

  return (
    <p className={className} style={style} aria-label={texto}>
      {palavras.map((palavra, i) => {
        let classe = 'palavra-lida';
        if (legendando) {
          if (atual === -1 || i < atual) classe = 'palavra-lida';
          else if (i === atual) classe = 'palavra-atual';
          else classe = 'palavra-futura';
        }
        return (
          <span key={i} className={classe} aria-hidden="true">
            {palavra}{' '}
          </span>
        );
      })}
    </p>
  );
}
