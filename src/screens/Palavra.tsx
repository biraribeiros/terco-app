import { useEffect, useState } from 'react';
import { TRECHOS, type Trecho } from '../data/palavras';

interface Props {
  ultimoTrecho: number;
  onEscolher: (indice: number) => void;
}

/** Escolhe um trecho diferente do último mostrado. */
export function escolherTrecho(ultimo: number): number {
  if (TRECHOS.length <= 1) return 0;
  let indice = Math.floor(Math.random() * TRECHOS.length);
  while (indice === ultimo) indice = Math.floor(Math.random() * TRECHOS.length);
  return indice;
}

function quebrarLinhas(ctx: CanvasRenderingContext2D, texto: string, largura: number): string[] {
  const palavras = texto.split(' ');
  const linhas: string[] = [];
  let atual = '';
  for (const palavra of palavras) {
    const teste = atual ? `${atual} ${palavra}` : palavra;
    if (ctx.measureText(teste).width > largura && atual) {
      linhas.push(atual);
      atual = palavra;
    } else {
      atual = teste;
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

async function compartilharImagem(trecho: Trecho): Promise<void> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = '#0B2A55';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#FFD166';
  ctx.font = '600 56px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('Palavra do dia', 540, 220);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '500 64px Georgia, serif';
  const linhas = quebrarLinhas(ctx, `“${trecho.texto}”`, 900);
  linhas.forEach((linha, i) => ctx.fillText(linha, 540, 480 + i * 90));

  ctx.fillStyle = '#FFD166';
  ctx.font = '600 52px Georgia, serif';
  ctx.fillText(trecho.referencia, 540, 480 + linhas.length * 90 + 80);

  const blob = await new Promise<Blob | null>((resolver) => canvas.toBlob(resolver, 'image/png'));
  if (!blob) return;
  const arquivo = new File([blob], 'palavra-do-dia.png', { type: 'image/png' });

  if (navigator.canShare?.({ files: [arquivo] })) {
    await navigator.share({ files: [arquivo], title: 'Palavra do dia' }).catch(() => {});
    return;
  }
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'palavra-do-dia.png';
  link.click();
  URL.revokeObjectURL(link.href);
}

export function Palavra({ ultimoTrecho, onEscolher }: Props) {
  // Um trecho novo a cada abertura da tela, sem repetir o último.
  const [indice] = useState(() => escolherTrecho(ultimoTrecho));
  const trecho = TRECHOS[indice];

  // Registra o trecho mostrado, para não repetir na próxima abertura.
  useEffect(() => {
    onEscolher(indice);
  }, [indice]);

  return (
    <>
      <h1 className="titulo">Palavra do dia</h1>
      <blockquote className="cartao trecho">
        <p className="texto-lead">“{trecho.texto}”</p>
        <footer className="texto-corpo">{trecho.referencia}</footer>
      </blockquote>
      <p className="texto-corpo">{trecho.reflexao}</p>
      <button type="button" className="btn btn-primario" onClick={() => void compartilharImagem(trecho)}>
        Compartilhar como imagem
      </button>
      <span className="dica">Tradução Almeida Revista e Corrigida (domínio público).</span>
    </>
  );
}
