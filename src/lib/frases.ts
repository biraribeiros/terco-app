// Versículos da tela de abertura, em ordem fixa: um por dia, o mesmo durante todo o dia.
// PROVISÓRIO: textos conferidos com a Almeida Corrigida Fiel. Antes de publicar, conferir na edição
// Almeida Revista e Corrigida de domínio público e confirmar a licença do texto usado.
export interface Versiculo {
  referencia: string;
  texto: string;
}

export const VERSICULOS: Versiculo[] = [
  { referencia: 'Salmos 23:1', texto: "O Senhor é o meu pastor, nada me faltará." },
  { referencia: 'Salmos 27:1', texto: "O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?" },
  { referencia: 'Salmos 34:8', texto: "Provai, e vede que o Senhor é bom; bem-aventurado o homem que nele confia." },
  { referencia: 'Salmos 37:5', texto: "Entrega o teu caminho ao Senhor; confia nele, e ele o fará." },
  { referencia: 'Salmos 46:1', texto: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia." },
  { referencia: 'Salmos 55:22', texto: "Lança o teu cuidado sobre o Senhor, e ele te susterá; não permitirá jamais que o justo seja abalado." },
  { referencia: 'Salmos 91:1', texto: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará." },
  { referencia: 'Salmos 118:24', texto: "Este é o dia que fez o Senhor; regozijemo-nos, e alegremo-nos nele." },
  { referencia: 'Salmos 119:105', texto: "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho." },
  { referencia: 'Salmos 121:2', texto: "O meu socorro vem do Senhor que fez o céu e a terra." },
  { referencia: 'Provérbios 3:5', texto: "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento." },
  { referencia: 'Isaías 40:31', texto: "Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão." },
  { referencia: 'Isaías 41:10', texto: "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça." },
  { referencia: 'Jeremias 29:11', texto: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais." },
  { referencia: 'Mateus 5:9', texto: "Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus." },
  { referencia: 'Mateus 6:33', texto: "Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas." },
  { referencia: 'Mateus 7:7', texto: "Pedi, e dar-se-vos-á; buscai, e encontrareis; batei, e abrir-se-vos-á." },
  { referencia: 'Mateus 11:28', texto: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei." },
  { referencia: 'Lucas 1:38', texto: "Disse então Maria: Eis aqui a serva do Senhor; cumpra-se em mim segundo a tua palavra." },
  { referencia: 'João 3:16', texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna." },
  { referencia: 'João 8:12', texto: "Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida." },
  { referencia: 'João 14:27', texto: "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize." },
  { referencia: 'João 15:12', texto: "O meu mandamento é este: Que vos ameis uns aos outros, assim como eu vos amei." },
  { referencia: 'Romanos 8:28', texto: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito." },
  { referencia: 'Romanos 12:12', texto: "Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração." },
  { referencia: '1 Coríntios 13:13', texto: "Agora, pois, permanecem a fé, a esperança e o amor, estes três, mas o maior destes é o amor." },
  { referencia: 'Filipenses 4:7', texto: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus." },
  { referencia: 'Filipenses 4:13', texto: "Posso todas as coisas em Cristo que me fortalece." },
  { referencia: 'Hebreus 11:1', texto: "Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não vêem." },
  { referencia: '1 Pedro 5:7', texto: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós." },
];

/** Um versículo por dia do ano. */
export function versiculoDoDia(data: Date = new Date()): Versiculo {
  const inicio = new Date(data.getFullYear(), 0, 0);
  const dia = Math.floor((data.getTime() - inicio.getTime()) / 86_400_000);
  return VERSICULOS[dia % VERSICULOS.length];
}
