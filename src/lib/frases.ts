// Versículos da tela de abertura, em ordem fixa: um por dia, o mesmo durante todo o dia.
// Texto: Bíblia Portuguesa Mundial (eBible.org), dedicada ao domínio público. Os próprios autores
// informam que a tradução ainda está em revisão; vale revisar os trechos antes de publicar.
export interface Versiculo {
  referencia: string;
  texto: string;
}

export const VERSICULOS: Versiculo[] = [
  { referencia: 'Salmos 23:1', texto: "O Senhor é o meu pastor; nada me faltará." },
  { referencia: 'Salmos 27:1', texto: "O Senhor é a minha luz e a minha salvação. A quem temerei? O Senhor é a fortaleza da minha vida. De quem terei medo?" },
  { referencia: 'Salmos 34:8', texto: "Oh, provem e vejam que o Senhor é bom. Bem-aventurado é o homem que nele se refugia." },
  { referencia: 'Salmos 37:5', texto: "Entregue o seu caminho ao Senhor; confie também nele, e ele o fará." },
  { referencia: 'Salmos 46:1', texto: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia." },
  { referencia: 'Salmos 55:22', texto: "Lance o seu fardo sobre o Senhor e ele o sustentará. Ele nunca permitirá que o justo seja abalado." },
  { referencia: 'Salmos 91:1', texto: "Aquele que habita no esconderijo do Altíssimo descansará à sombra do Todo-Poderoso." },
  { referencia: 'Salmos 118:24', texto: "Este é o dia que o Senhor fez. Vamos nos alegrar e exultar nele!" },
  { referencia: 'Salmos 119:105', texto: "A tua palavra é lâmpada para os meus pés, e luz para o meu caminho." },
  { referencia: 'Salmos 121:2', texto: "O meu socorro vem do Senhor, que fez o céu e a terra." },
  { referencia: 'Provérbios 3:5', texto: "Confie no Senhor de todo o seu coração, e não se apoie no seu próprio entendimento." },
  { referencia: 'Isaías 40:31', texto: "Mas aqueles que esperam no Senhor renovarão as suas forças. Eles subirão com asas como águias. Eles correrão, e não se cansarão. Eles caminharão, e não desfalecerão." },
  { referencia: 'Isaías 41:10', texto: "Não tenha medo, pois eu estou com você. Não se apavore, pois eu sou o seu Deus. Eu o fortalecerei. Sim, eu o ajudarei. Sim, eu o sustentarei com a destra da minha justiça." },
  { referencia: 'Jeremias 29:11', texto: "Pois eu sei os pensamentos que tenho a respeito de vocês, diz o Senhor, pensamentos de paz, e não de mal, para dar a vocês esperança e um futuro." },
  { referencia: 'Mateus 5:9', texto: "Bem-aventurados os pacificadores, pois eles serão chamados filhos de Deus." },
  { referencia: 'Mateus 6:33', texto: "Mas busquem primeiro o Reino de Deus e a sua justiça, e todas essas coisas lhes serão acrescentadas." },
  { referencia: 'Mateus 7:7', texto: "Peçam, e lhes será dado. Busquem, e encontrarão. Batam, e lhes será aberto." },
  { referencia: 'Mateus 11:28', texto: "Venham a mim, todos vocês que estão cansados e sobrecarregados, e eu lhes darei descanso." },
  { referencia: 'Lucas 1:38', texto: "Maria disse: Eis aqui a serva do Senhor; que se cumpra em mim segundo a sua palavra." },
  { referencia: 'João 3:16', texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna." },
  { referencia: 'João 8:12', texto: "Eu sou a luz do mundo. Aquele que me segue não andará nas trevas, mas terá a luz da vida." },
  { referencia: 'João 14:27', texto: "Deixo-lhes a paz. A minha paz lhes dou; não a dou como o mundo a dá. Que o coração de vocês não fique perturbado nem tenha medo." },
  { referencia: 'João 15:12', texto: "Este é o meu mandamento: que vocês amem uns aos outros, assim como eu os amei." },
  { referencia: 'Romanos 8:28', texto: "Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito." },
  { referencia: 'Romanos 12:12', texto: "Alegrando-se na esperança, suportando as tribulações, perseverando continuamente na oração." },
  { referencia: '1 Coríntios 13:13', texto: "Mas agora permanecem a fé, a esperança e o amor—estes três. O maior destes é o amor." },
  { referencia: 'Filipenses 4:7', texto: "E a paz de Deus, que excede todo o entendimento, guardará os seus corações e os seus pensamentos em Cristo Jesus." },
  { referencia: 'Filipenses 4:13', texto: "Posso todas as coisas por meio de Cristo que me fortalece." },
  { referencia: 'Hebreus 11:1', texto: "Ora, a fé é a certeza daquilo que esperamos, a prova das coisas que não se veem." },
  { referencia: '1 Pedro 5:7', texto: "Lancem sobre ele todas as suas preocupações, porque ele cuida de vocês." },
];

/** Um versículo por dia do ano. */
export function versiculoDoDia(data: Date = new Date()): Versiculo {
  const inicio = new Date(data.getFullYear(), 0, 0);
  const dia = Math.floor((data.getTime() - inicio.getTime()) / 86_400_000);
  return VERSICULOS[dia % VERSICULOS.length];
}
