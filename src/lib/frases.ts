// Frases do dia, em ordem fixa. Textos próprios, a revisar antes da publicação.
export const FRASES: string[] = [
  'Respire fundo. Deus está mais perto do que você imagina.',
  'Um instante de oração pode mudar o rumo de um dia inteiro.',
  'Entregue a Deus o que pesa no seu coração.',
  'A paz começa quando confiamos.',
  'Maria caminha ao seu lado, passo a passo.',
  'Hoje é um bom dia para recomeçar com fé.',
  'Quem reza nunca está sozinho.',
  'Cada Ave-Maria é um abraço de Mãe.',
  'Agradecer também é uma forma de rezar.',
  'Deus cuida dos detalhes que você nem percebe.',
  'Silencie por dentro e escute com o coração.',
  'A fé não afasta as dificuldades, mas ilumina o caminho.',
  'Reze com calma: Deus não tem pressa de ouvir você.',
  'Um coração em paz é o melhor presente para quem está perto.',
  'Confie: o amanhã também está nas mãos de Deus.',
  'A esperança se renova a cada manhã.',
  'Que a sua oração de hoje seja simples e sincera.',
  'Há sempre uma luz acesa para quem a procura.',
  'Rezar é conversar com quem mais nos ama.',
  'Leve sua família e seus amigos no coração ao rezar.',
  'O que parece pequeno aos olhos pode ser grande para Deus.',
  'Acalme a mente. Deus fala baixinho.',
  'Gratidão transforma o ordinário em graça.',
  'Um passo de cada vez, sempre em companhia de Maria.',
  'A paciência de hoje é a paz de amanhã.',
  'Que o seu dia seja guiado pela serenidade e pela fé.',
  'Rezar por alguém é uma forma de amar.',
  'Mesmo no cansaço, existe um lugar de descanso: a oração.',
  'Deus conhece o seu nome e a sua história.',
  'Comece o dia entregando tudo nas mãos de Deus.',
  'Contemple, e deixe o coração se aquietar.',
];

/** Uma frase por dia do ano, a mesma durante todo o dia. */
export function fraseDoDia(data: Date = new Date()): string {
  const inicio = new Date(data.getFullYear(), 0, 0);
  const dia = Math.floor((data.getTime() - inicio.getTime()) / 86_400_000);
  return FRASES[dia % FRASES.length];
}
