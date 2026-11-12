# Textos do app, tela por tela (para revisão)

Estado atual, antes do novo layout. Marque o que quiser mudar. Os textos das orações e dos mistérios falados estão em `docs/roteiro-audio.json` e não mudam sem regerar o áudio.

## 1. Entrada (splash)
- Título: **Terço**
- Mensagem falada e escrita (muda por voz):
  - Feminina e masculina: "Seja bem-vindo. Respire fundo, acalme o coração. Vamos rezar o terço juntos?"
  - Kids: "Oi, amiguinho! Que bom ver você aqui. Vamos rezar o terço juntos?"
- Dica: "Toque para entrar"

## 2. Escolha da voz
- Título: "Escolha a voz que guia a sua reza"
- Subtítulo: "Você pode trocar depois, em Ajustes."
- Cartões:
  - Feminina: "Voz serena e acolhedora (Miranda)."
  - Masculina: "Voz firme e serena (Carlos)."
  - Kids: "Voz animada para crianças (Piku). Ativa o Modo Kids."
- Botões: "Ouvir" (em cada cartão), "Continuar"

## 3. Início
- Título: "Que a paz esteja com você"
- Cartão: "Hoje, sugestão de mistérios:" / "Mistérios {gozosos | luminosos | dolorosos | gloriosos}"
- Botões: "Continuar a reza de onde parei" (só se houver progresso), "Vamos rezar o terço", "Calendário", "Lembrete"
- Barra de baixo: Início, Calendário, Palavra, Ajustes

## 4. Escolha dos mistérios
- Título: "Escolha os mistérios"
- Cartões: Gozosos, Luminosos, Dolorosos, Gloriosos, cada um com "5 mistérios"
- Botão: "Voltar"
- Depois de escolher o conjunto:
  - Título: "Mistérios {conjunto}"
  - Botão: "Rosário completo (5 mistérios)"
  - Texto: "Ou reze apenas um mistério:"
  - Lista: "1º · A Anunciação", "2º · A Visitação" e assim por diante
  - Botão: "Voltar aos conjuntos"

## 5. Oração
- Botões: "Sair", "Voltar", "Pausar" / "Continuar", "Avançar"
- Título pequeno do passo: Sinal da cruz, Credo, Pai-nosso, "Ave-maria 1 de 3", Glória, "Mistério 1 · A Anunciação", "Ave-maria 4 de 10 · Mistério 1 · A Anunciação", "Ó meu Jesus · …", Salve Rainha, "Fim do terço"
- Texto grande: a própria oração (ver `roteiro-audio.json`)
- No Kids entra uma frase explicando cada mistério (ex.: "Anunciação: um anjo contou a Maria que ela seria a mãe de Jesus.")

## 6. Conclusão
- Título: "Terço concluído"
- Frase: "Que a paz de Deus esteja com você."
- Linha: "O dia foi marcado no seu calendário." (Kids: "Você ganhou uma estrela no calendário!")
- Botão: "Voltar ao início"
- Observação: o texto falado final é "Terço concluído. Que a paz de Deus esteja com você." (escrito por mim, a revisar)

## 7. Calendário
- Título: "Calendário"
- "Sequência atual: N dia(s)"
- Navegação: "janeiro de 2026" com setas de mês anterior e próximo
- Rodapé: "N dia(s) rezado(s) neste mês."

## 8. Lembrete
- Título: "Lembrete"
- Opções: "Me lembrar de rezar", "Horário", "Dias da semana" (Dom, Seg, Ter, Qua, Qui, Sex, Sáb)
- Texto: "A notificação diz: “Vamos rezar o terço?”. Ela chega mesmo com o app fechado."
- Avisos: "Lembrete salvo." / "Sem permissão para notificações. Ative o aviso nas configurações do celular."
- Botões: "Salvar lembrete", "Voltar"

## 9. Palavra do dia
- Título: "Palavra do dia"
- Versículo entre aspas, referência e uma reflexão curta. Hoje há 4 trechos provisórios:
  - Salmos 23:1: "O Senhor é o meu pastor; nada me faltará." / "Confiar é descansar em quem cuida de nós."
  - João 3:16: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crer não pereça, mas tenha a vida eterna." / "Deus ama você, sem medida."
  - Mateus 11:28: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei." / "Quando estiver cansado, leve seu peso a Jesus."
  - Filipenses 4:13: "Posso todas as coisas em Cristo que me fortalece." / "Com Cristo, a força vem junto com a tarefa."
- Botão: "Compartilhar como imagem"
- Rodapé: "Tradução Almeida Revista e Corrigida (domínio público)."
- Imagem compartilhada: "Palavra do dia" no topo

## 10. Ajustes
- Título: "Ajustes"
- Seções: "Voz", "Tamanho do texto" (Normal, Grande, Maior), "Desempenho e movimento" ("Reduzir movimento", "Modo leve (terço 2D, sem 3D)"), "Lembrete" ("Criar lembrete" / "Editar lembrete"), "Sobre e privacidade"
- Sobre: "Terço, versão de testes. Funciona sem internet. Não há anúncios, não há conta e nenhum dado sai do aparelho."
