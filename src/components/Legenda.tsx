import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { narrador } from '../lib/narrador';

interface Props {
  texto: string;
  /** Acompanha a voz destacando o que já foi falado. Sem voz, mostra o texto inteiro. */
  acompanhar: boolean;
  /** Mostra só duas frases por vez, trocando conforme a voz avança. */
  paginar?: boolean;
  className?: string;
  style?: CSSProperties;
}

const LIMITE_FRASE = 90;

/** Divide o texto em frases curtas: primeiro nos pontos, depois nas vírgulas das frases longas. */
export function dividirEmFrases(texto: string): string[] {
  const frases: string[] = [];
  for (const sentenca of texto.split(/(?<=[.;:!?])\s+/)) {
    if (sentenca.length <= LIMITE_FRASE) {
      frases.push(sentenca);
      continue;
    }
    let atual = '';
    for (const parte of sentenca.split(/(?<=,)\s+/)) {
      if (atual && (atual + ' ' + parte).length > LIMITE_FRASE) {
        frases.push(atual);
        atual = parte;
      } else {
        atual = atual ? `${atual} ${parte}` : parte;
      }
    }
    if (atual) frases.push(atual);
  }
  return frases;
}

interface Palavra {
  texto: string;
  /** Fração do áudio em que a palavra termina de ser falada. */
  limite: number;
  /** Página (par de frases) a que a palavra pertence. */
  pagina: number;
}

/** Texto legendado: o que já foi falado fica em destaque e, na oração, só duas frases aparecem por vez. */
export function Legenda({ texto, acompanhar, paginar = false, className, style }: Props) {
  const palavras = useMemo<Palavra[]>(() => {
    const frases = paginar ? dividirEmFrases(texto) : [texto];
    const total = frases.reduce((soma, f) => soma + f.length + 1, 0);
    let acumulado = 0;
    const lista: Palavra[] = [];
    frases.forEach((frase, indice) => {
      for (const p of frase.split(' ')) {
        acumulado += p.length + 1;
        lista.push({ texto: p, limite: acumulado / total, pagina: Math.floor(indice / 2) });
      }
    });
    return lista;
  }, [texto, paginar]);

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
  const achada = legendando ? palavras.findIndex((p) => p.limite > (fracao ?? 0)) : -1;
  const ultima = palavras.length - 1;
  const atual = legendando ? (achada === -1 ? ultima : achada) : -1;
  // Sem áudio ainda, mostra a primeira página; no fim, fica na última.
  const pagina = paginar ? (atual >= 0 ? palavras[atual].pagina : 0) : 0;

  return (
    <p className={className} style={style} aria-label={texto}>
      <span key={pagina} className={paginar ? 'pagina-aparece' : undefined}>
        {palavras.map((palavra, i) => {
          if (paginar && palavra.pagina !== pagina) return null;
          let classe = 'palavra-lida';
          if (legendando && !(achada === -1)) {
            if (i < atual) classe = 'palavra-lida';
            else if (i === atual) classe = 'palavra-atual';
            else classe = 'palavra-futura';
          }
          return (
            <span key={i} className={classe} aria-hidden="true">
              {palavra.texto}{' '}
            </span>
          );
        })}
      </span>
    </p>
  );
}
