# Validação das Etapas 0 a 3

Data: 2026-11-11. Verificação feita por script e por navegação no app (tamanho de celular).

## Resultado

| Item | Resultado |
|---|---|
| Build (`npm run build`, TypeScript estrito + Vite) | Passa |
| Áudios no manifest | 107 de 107 existem em disco, nenhum fora do manifest |
| Áudios usados pelo app, por voz | Nenhum faltando (8 orações + 20 mistérios nas 3 vozes, 20 explicações kids) |
| Textos do app vs. `roteiro-audio.json` | Idênticos (boas-vindas, orações, mistérios, explicações) |
| Tamanho dos áudios | 9,93 MB, durações de 3,1 s a 44,2 s |
| Volume (Ave-maria, 3 vozes) | -17,0 a -17,5 LUFS (meta -16; diferença pequena, aceitável) |
| Fluxo no navegador | Entrada, voz, início, mistérios, oração, calendário, palavra e ajustes sem erro de execução |
| Progresso salvo | Confirmado: "Continuar a reza de onde parei" aparece após sair da oração |

## Não verificado (depende de aparelho real ou de você)

- Audição das vozes, em especial a Piku (voz em inglês lendo português).
- Notificação local com o app fechado.
- Áudio com tela bloqueada e controles na tela de bloqueio (Etapa 5).
- Desempenho do 3D em celular intermediário (Etapa 5).

## Pendências conhecidas

1. Licença comercial das vozes ElevenLabs antes de publicar. A feminina foi trocada de Keren para Miranda (2026-11-12), porque a licença da Keren estava em avaliação. Confirmar os termos da Miranda.
2. Palavra do dia tem 4 trechos provisórios; a Etapa 4 traz 60 ou mais, conferidos.
3. Bundle com 1,3 MB por causa do Three.js; otimizar na Etapa 5.
4. Animação de elemento compartilhado (terço do splash para a oração) não implementada.
5. O texto "Terço concluído. Que a paz de Deus esteja com você." foi escrito por mim; revisar.

## Próxima etapa

Etapa 4: conteúdo bíblico (Almeida, domínio público, mínimo de 60 trechos conferidos).
