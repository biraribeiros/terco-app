// Convite para um amigo: imagem personalizada e mensagem curta.

/** Endereço do app nas lojas. Preencher quando o app for publicado. */
export const LINK_DO_APP = '';

export type Rede = 'whatsapp' | 'instagram' | 'facebook';

export function mensagemConvite(nome: string): string {
  const quem = nome.trim() ? `${nome.trim()} convida você` : 'Convidamos você';
  const link = LINK_DO_APP ? ` ${LINK_DO_APP}` : '';
  return `${quem} para rezar com o Rosário Guiado. Reze, medite e contemple, passo a passo.${link}`;
}

function quebrar(ctx: CanvasRenderingContext2D, texto: string, largura: number): string[] {
  const linhas: string[] = [];
  let atual = '';
  for (const palavra of texto.split(' ')) {
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

async function gerarImagem(nome: string): Promise<Blob | null> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const fundo = ctx.createLinearGradient(0, 0, 0, canvas.height);
  fundo.addColorStop(0, '#0b2a55');
  fundo.addColorStop(1, '#071a3a');
  ctx.fillStyle = fundo;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const brilho = ctx.createRadialGradient(900, 1200, 0, 900, 1200, 600);
  brilho.addColorStop(0, 'rgba(255, 209, 102, 0.35)');
  brilho.addColorStop(1, 'rgba(255, 209, 102, 0)');
  ctx.fillStyle = brilho;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(90, 330, 900, 690, 48);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd166';
  ctx.font = '600 84px system-ui, sans-serif';
  ctx.fillText('Rosário Guiado', 540, 230);

  ctx.fillStyle = '#ffffff';
  ctx.font = '500 56px system-ui, sans-serif';
  const quem = nome.trim() ? `${nome.trim()} convida você` : 'Convidamos você';
  const linhas = quebrar(ctx, `${quem} para rezar com o Rosário Guiado.`, 760);
  linhas.forEach((linha, i) => ctx.fillText(linha, 540, 500 + i * 80));

  ctx.fillStyle = '#9cc8f0';
  ctx.font = '400 44px system-ui, sans-serif';
  ctx.fillText('Reze • Medite • Contemple', 540, 500 + linhas.length * 80 + 110);

  return new Promise((resolver) => canvas.toBlob(resolver, 'image/png'));
}

function baixar(blob: Blob): void {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'convite-rosario-guiado.png';
  link.click();
  URL.revokeObjectURL(link.href);
}

/**
 * Compartilha o convite. O menu do sistema inclui WhatsApp, Instagram e Facebook quando instalados.
 * Sem menu de compartilhamento, o WhatsApp abre com o texto e as outras redes recebem a imagem salva.
 */
export async function compartilharConvite(rede: Rede, nome: string): Promise<void> {
  const texto = mensagemConvite(nome);
  const blob = await gerarImagem(nome);
  if (blob) {
    const arquivo = new File([blob], 'convite-rosario-guiado.png', { type: 'image/png' });
    if (navigator.canShare?.({ files: [arquivo] })) {
      await navigator.share({ files: [arquivo], text: texto, title: 'Rosário Guiado' }).catch(() => {});
      return;
    }
  }
  if (rede === 'whatsapp') {
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    return;
  }
  if (blob) baixar(blob);
}
