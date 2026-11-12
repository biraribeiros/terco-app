import type { Voz } from '../lib/prefs';

// Textos gerados e aprovados na Etapa 2 (espelham docs/roteiro-audio.json).
export type Conjunto = 'gozosos' | 'luminosos' | 'dolorosos' | 'gloriosos';

export const CONJUNTOS: Record<Conjunto, string> = {
  gozosos: 'Gozosos',
  luminosos: 'Luminosos',
  dolorosos: 'Dolorosos',
  gloriosos: 'Gloriosos',
};

export interface Misterio {
  chave: string;
  conjunto: Conjunto;
  ordem: number;
  nome: string;
  anuncio: string;
  explicacao: string;
}

export const BOAS_VINDAS: Record<Voz, string> = {
  feminina: 'Seja bem-vindo. Respire fundo, acalme o coração. Vamos rezar o terço juntos?',
  masculina: 'Seja bem-vindo. Respire fundo, acalme o coração. Vamos rezar o terço juntos?',
  kids: 'Oi, amiguinho! Que bom ver você aqui. Vamos rezar o terço juntos?',
};

export const ORACOES: Record<string, string> = {
  '01-sinal-da-cruz': 'Em nome do Pai, do Filho e do Espírito Santo. Amém.',
  '02-credo':
    'Creio em Deus Pai todo-poderoso, criador do céu e da terra. E em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado, desceu à mansão dos mortos, ressuscitou ao terceiro dia, subiu aos céus, está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne e na vida eterna. Amém.',
  '03-pai-nosso':
    'Pai nosso, que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
  '04-ave-maria':
    'Ave Maria, cheia de graça, o Senhor é convosco. Bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.',
  '05-gloria': 'Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre, pelos séculos dos séculos. Amém.',
  '06-o-meu-jesus':
    'Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai para o céu todas as almas, especialmente as mais necessitadas da vossa misericórdia. Amém.',
  '07-salve-rainha':
    'Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.',
  '08-terco-concluido': 'Terço concluído. Que a paz de Deus esteja com você.',
};

export const MISTERIOS: Misterio[] = [
  { chave: 'gozosos-1-anunciacao', conjunto: 'gozosos', ordem: 1, nome: 'A Anunciação', anuncio: 'Primeiro mistério gozoso: A Anunciação.', explicacao: 'Anunciação: um anjo contou a Maria que ela seria a mãe de Jesus.' },
  { chave: 'gozosos-2-visitacao', conjunto: 'gozosos', ordem: 2, nome: 'A Visitação', anuncio: 'Segundo mistério gozoso: A Visitação.', explicacao: 'Visitação: Maria foi ajudar a prima Isabel, que também esperava um bebê.' },
  { chave: 'gozosos-3-nascimento', conjunto: 'gozosos', ordem: 3, nome: 'O Nascimento de Jesus', anuncio: 'Terceiro mistério gozoso: O Nascimento de Jesus.', explicacao: 'Nascimento: Jesus nasceu num estábulo, em Belém, e foi deitado numa manjedoura.' },
  { chave: 'gozosos-4-apresentacao', conjunto: 'gozosos', ordem: 4, nome: 'A Apresentação no Templo', anuncio: 'Quarto mistério gozoso: A Apresentação no Templo.', explicacao: 'Apresentação: Maria e José levaram Jesus ao templo para oferecê-lo a Deus.' },
  { chave: 'gozosos-5-perda-e-encontro', conjunto: 'gozosos', ordem: 5, nome: 'A Perda e o Encontro do Menino Jesus no Templo', anuncio: 'Quinto mistério gozoso: A Perda e o Encontro do Menino Jesus no Templo.', explicacao: 'Perda e encontro: aos 12 anos, Jesus ficou no templo ensinando, e Maria e José o acharam depois de procurar muito.' },
  { chave: 'luminosos-1-batismo', conjunto: 'luminosos', ordem: 1, nome: 'O Batismo de Jesus no Jordão', anuncio: 'Primeiro mistério luminoso: O Batismo de Jesus no Jordão.', explicacao: 'Batismo: João batizou Jesus no rio Jordão, e o Espírito Santo desceu sobre ele.' },
  { chave: 'luminosos-2-cana', conjunto: 'luminosos', ordem: 2, nome: 'As Bodas de Caná', anuncio: 'Segundo mistério luminoso: As Bodas de Caná.', explicacao: 'Caná: Jesus transformou água em vinho numa festa de casamento.' },
  { chave: 'luminosos-3-reino', conjunto: 'luminosos', ordem: 3, nome: 'O Anúncio do Reino de Deus', anuncio: 'Terceiro mistério luminoso: O Anúncio do Reino de Deus.', explicacao: 'Anúncio do Reino: Jesus ensinou que Deus ama todas as pessoas e pediu que mudemos o coração.' },
  { chave: 'luminosos-4-transfiguracao', conjunto: 'luminosos', ordem: 4, nome: 'A Transfiguração', anuncio: 'Quarto mistério luminoso: A Transfiguração.', explicacao: 'Transfiguração: no alto de um monte, Jesus apareceu brilhando, com Moisés e Elias.' },
  { chave: 'luminosos-5-eucaristia', conjunto: 'luminosos', ordem: 5, nome: 'A Instituição da Eucaristia', anuncio: 'Quinto mistério luminoso: A Instituição da Eucaristia.', explicacao: 'Eucaristia: na Última Ceia, Jesus deu o pão e o vinho como seu corpo e seu sangue.' },
  { chave: 'dolorosos-1-horto', conjunto: 'dolorosos', ordem: 1, nome: 'A Agonia no Horto', anuncio: 'Primeiro mistério doloroso: A Agonia no Horto.', explicacao: 'Horto: Jesus rezou com muita tristeza no Jardim das Oliveiras.' },
  { chave: 'dolorosos-2-flagelacao', conjunto: 'dolorosos', ordem: 2, nome: 'A Flagelação', anuncio: 'Segundo mistério doloroso: A Flagelação.', explicacao: 'Flagelação: Jesus foi açoitado pelos soldados, mas aceitou sofrer por amor a nós.' },
  { chave: 'dolorosos-3-coroacao', conjunto: 'dolorosos', ordem: 3, nome: 'A Coroação de Espinhos', anuncio: 'Terceiro mistério doloroso: A Coroação de Espinhos.', explicacao: 'Coroação de espinhos: os soldados colocaram uma coroa de espinhos na cabeça de Jesus.' },
  { chave: 'dolorosos-4-cruz', conjunto: 'dolorosos', ordem: 4, nome: 'Jesus carrega a Cruz', anuncio: 'Quarto mistério doloroso: Jesus carrega a Cruz.', explicacao: 'Cruz: Jesus carregou a cruz pesada até o alto do monte Calvário.' },
  { chave: 'dolorosos-5-crucificacao', conjunto: 'dolorosos', ordem: 5, nome: 'A Crucificação e a Morte de Jesus', anuncio: 'Quinto mistério doloroso: A Crucificação e a Morte de Jesus.', explicacao: 'Crucificação: Jesus morreu na cruz por amor a todas as pessoas.' },
  { chave: 'gloriosos-1-ressurreicao', conjunto: 'gloriosos', ordem: 1, nome: 'A Ressurreição', anuncio: 'Primeiro mistério glorioso: A Ressurreição.', explicacao: 'Ressurreição: Jesus venceu a morte e ressuscitou no terceiro dia.' },
  { chave: 'gloriosos-2-ascensao', conjunto: 'gloriosos', ordem: 2, nome: 'A Ascensão de Jesus ao céu', anuncio: 'Segundo mistério glorioso: A Ascensão de Jesus ao céu.', explicacao: 'Ascensão: Jesus subiu ao céu, para junto de Deus Pai.' },
  { chave: 'gloriosos-3-pentecostes', conjunto: 'gloriosos', ordem: 3, nome: 'A Vinda do Espírito Santo', anuncio: 'Terceiro mistério glorioso: A Vinda do Espírito Santo.', explicacao: 'Pentecostes: o Espírito Santo desceu sobre Maria e os apóstolos, que estavam reunidos em oração.' },
  { chave: 'gloriosos-4-assuncao', conjunto: 'gloriosos', ordem: 4, nome: 'A Assunção de Maria', anuncio: 'Quarto mistério glorioso: A Assunção de Maria.', explicacao: 'Assunção: Maria foi levada ao céu, com corpo e alma.' },
  { chave: 'gloriosos-5-coroacao', conjunto: 'gloriosos', ordem: 5, nome: 'A Coroação de Maria', anuncio: 'Quinto mistério glorioso: A Coroação de Maria.', explicacao: 'Coroação de Maria: Maria foi coroada Rainha do céu e da terra.' },
];
