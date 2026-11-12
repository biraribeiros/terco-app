export interface Trecho {
  referencia: string;
  texto: string;
  reflexao: string;
}

// Tradução: Almeida Revista e Corrigida (domínio público).
// PROVISÓRIO: os textos e referências serão conferidos contra fonte confiável na Etapa 4,
// quando a lista chegar a no mínimo 60 trechos. As reflexões são texto próprio, a revisar.
export const TRECHOS: Trecho[] = [
  {
    referencia: 'Salmos 23:1',
    texto: 'O Senhor é o meu pastor; nada me faltará.',
    reflexao: 'Confiar é descansar em quem cuida de nós.',
  },
  {
    referencia: 'João 3:16',
    texto:
      'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crer não pereça, mas tenha a vida eterna.',
    reflexao: 'Deus ama você, sem medida.',
  },
  {
    referencia: 'Mateus 11:28',
    texto: 'Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.',
    reflexao: 'Quando estiver cansado, leve seu peso a Jesus.',
  },
  {
    referencia: 'Filipenses 4:13',
    texto: 'Posso todas as coisas em Cristo que me fortalece.',
    reflexao: 'Com Cristo, a força vem junto com a tarefa.',
  },
];
