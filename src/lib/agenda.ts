// Google Agenda sem login dentro do app: abre o formulário de novo evento já preenchido.
// A conta Google é escolhida e autorizada pelo próprio Google, no navegador do aparelho.

export const TITULO_EVENTO = 'Momento de oração — Rosário Guiado';
export const DESCRICAO_EVENTO = 'Reserve este momento para rezar, meditar e contemplar.';

function formato(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`;
}

export function urlGoogleAgenda(inicio: Date, duracaoMin = 30): string {
  const fim = new Date(inicio.getTime() + duracaoMin * 60_000);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: TITULO_EVENTO,
    details: DESCRICAO_EVENTO,
    dates: `${formato(inicio)}/${formato(fim)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function abrirGoogleAgenda(inicio: Date): void {
  window.open(urlGoogleAgenda(inicio), '_blank', 'noopener');
}

/** Data e hora sugeridas para o próximo terço: amanhã, no horário do lembrete (ou 20h). */
export function sugestaoProximo(hora = 20, minuto = 0): Date {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(hora, minuto, 0, 0);
  return d;
}
