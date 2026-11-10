# DESIGN.md — Terço

Direção de arte do app Terço. Fonte única de verdade para cores, tipografia, espaçamento, formas, sombras, estados e movimento. Toda tela e componente usa estes tokens; nada de valor solto no código.

Público: pessoas simples, muitas idosas, e crianças. Prioridade: clareza, leitura confortável, toque fácil, calma. Nada de interface poluída.

---

## 1. Princípios

1. **Uma ação principal por tela.** O botão "Vamos rezar o terço" domina o início.
2. **Texto grande e legível.** Corpo mínimo 18 px. Oração em 22 px ou mais.
3. **Toque generoso.** Alvo mínimo 56 × 56 px, com 8 px de espaço entre alvos.
4. **Contraste AA sempre.** Texto normal 4.5:1, texto grande (24 px ou 18,66 px em negrito) 3:1, componentes de interface e ícones 3:1.
5. **Calma no tema adulto, alegria no Kids.** Dois temas, mesma estrutura, mesmos componentes.
6. **Movimento com propósito.** Animação confirma uma ação ou guia o olhar. Nunca decora sem função.
7. **Respeitar o usuário.** `prefers-reduced-motion` troca movimento por fade. Tamanho de fonte ajustável em Ajustes.

---

## 2. Cores

### 2.1 Tema Adulto (padrão)

| Token | Hex | Uso |
|---|---|---|
| `--color-blue-900` | `#0B2A55` | Azul profundo. Fundo principal, títulos, texto sobre claro |
| `--color-blue-600` | `#1F5FA8` | Azul médio. Botões primários, links, foco |
| `--color-sky-200` | `#9CC8F0` | Azul céu. Realces, bordas suaves, cartões secundários |
| `--color-gold-300` | `#FFD166` | Dourado suave. Selo de dia rezado, conta acesa, destaques |
| `--color-white-50` | `#F4F9FF` | Branco azulado. Fundo de conteúdo, texto sobre escuro |
| `--color-ink-700` | `#16365F` | Texto de corpo sobre claro (variação de azul profundo) |
| `--color-line-200` | `#C9DCF2` | Divisórias e bordas de campo |
| `--color-danger-700` | `#9B1C1C` | Erro (somente em mensagens; raro no app) |

**Contrastes medidos (WCAG 2.x):**

| Par (texto sobre fundo) | Razão | Resultado |
|---|---|---|
| `white-50` sobre `blue-900` | 13,44 : 1 | AA e AAA |
| `blue-900` sobre `white-50` | 13,44 : 1 | AA e AAA |
| `white-50` sobre `blue-600` | 6,09 : 1 | AA |
| `blue-600` sobre `white-50` | 6,09 : 1 | AA |
| `blue-900` sobre `sky-200` | 8,08 : 1 | AA |
| `blue-900` sobre `gold-300` | 9,86 : 1 | AA |
| `blue-600` sobre `sky-200` | 3,66 : 1 | **Não serve para texto.** Só para ícones e bordas (≥ 3 : 1) |

**Regra:** sobre `sky-200` o texto é sempre `blue-900`. A combinação `blue-600` sobre `sky-200` não é usada para texto.

### 2.2 Tema Kids

Cores mais vivas e quentes. Mesma lógica de tokens, nomes próprios.

| Token | Hex | Uso |
|---|---|---|
| `--kids-ink-900` | `#1B1B3A` | Texto principal e contorno |
| `--kids-cream-50` | `#FFF6E0` | Fundo principal |
| `--kids-sun-400` | `#FFD23F` | Sol, estrela, destaque principal |
| `--kids-coral-500` | `#E8553D` | Ação de alerta suave, selo, formas decorativas |
| `--kids-mint-300` | `#7FD8C8` | Cartões e áreas de apoio |
| `--kids-mint-100` | `#B8F0E4` | Fundo de cartão secundário |
| `--kids-pink-200` | `#FFB3C7` | Cartões e figuras |
| `--kids-violet-500` | `#6A4CFF` | Botão primário Kids |
| `--kids-white` | `#FFFFFF` | Texto sobre violeta |

**Contrastes medidos:**

| Par | Razão | Resultado |
|---|---|---|
| `kids-ink-900` sobre `cream-50` | 15,43 : 1 | AA e AAA |
| `kids-ink-900` sobre `sun-400` | 11,50 : 1 | AA e AAA |
| `kids-ink-900` sobre `mint-300` | 9,93 : 1 | AA e AAA |
| `kids-ink-900` sobre `pink-200` | 9,91 : 1 | AA e AAA |
| `kids-ink-900` sobre `coral-500` | 4,59 : 1 | AA (texto normal) |
| `white` sobre `violet-500` | 5,13 : 1 | AA |
| `white` sobre `coral-500` | 3,62 : 1 | **Não usar** para texto. Sobre coral, texto é `kids-ink-900` |

### 2.3 Estados de cor (ambos os temas)

| Estado | Adulto | Kids |
|---|---|---|
| Foco (anel) | `blue-600` 3 px + offset 3 px | `violet-500` 4 px + offset 3 px |
| Pressionado | escurece 8 % | escurece 8 % |
| Desabilitado | `line-200` de fundo, texto `blue-900` a 60 % (apenas informativo; evitar botões desabilitados) | igual, com `kids-ink-900` a 60 % |
| Selecionado | borda `gold-300` 4 px | borda `sun-400` 4 px |

Nenhuma informação transmitida só por cor: estados também usam ícone, texto ou forma.

---

## 3. Tipografia

| Papel | Família | Peso | Uso |
|---|---|---|---|
| Títulos | **Cormorant Garamond** (alternativa: Fraunces) | 600 e 700 | Título de tela, nome do mistério, palavra do dia |
| Texto | **Inter** (alternativa: Atkinson Hyperlegible) | 400, 500, 600 | Corpo, botões, legendas |
| Oração | **Cormorant Garamond** 500 | 500 | Texto da oração em destaque |
| Kids (títulos) | **Fredoka** ou **Baloo 2** | 600 | Telas do tema Kids |

Atkinson Hyperlegible é a escolha preferida para o corpo por legibilidade para pessoas com baixa visão. Se a fonte não for empacotada no app, cair para Inter sem perda de funcionalidade.

### 3.1 Escala (tamanho base 18 px)

| Token | Tamanho / altura da linha | Uso |
|---|---|---|
| `--text-caption` | 18 / 26 | Legendas (mínimo do app) |
| `--text-body` | 20 / 30 | Corpo |
| `--text-lead` | 22 / 34 | Oração e frases de destaque |
| `--text-button` | 22 / 28, peso 600 | Botões |
| `--text-title-sm` | 28 / 34 | Títulos de seção |
| `--text-title` | 36 / 42 | Títulos de tela |
| `--text-display` | 48 / 54 | Splash e frase de conclusão |

Escala multiplicada por `--text-scale` (100 %, 115 %, 130 %, 150 %) conforme Ajustes. Layouts precisam funcionar até 150 %.

Peso mínimo 400. Itálico só em citações bíblicas, nunca em corpo longo. Caixa alta apenas em rótulos curtos.

---

## 4. Espaçamento

Base de 4 px. Escala:

| Token | Valor |
|---|---|
| `--space-1` | 4 px |
| `--space-2` | 8 px |
| `--space-3` | 12 px |
| `--space-4` | 16 px (margem lateral mínima das telas) |
| `--space-5` | 24 px |
| `--space-6` | 32 px |
| `--space-7` | 48 px |
| `--space-8` | 64 px |

- Margem lateral da tela: **20 px** no mínimo; 16 px é o mínimo absoluto em telas estreitas (≤ 360 px).
- Espaço entre blocos de conteúdo: `--space-5` ou `--space-6`.
- Espaço entre alvos de toque: `--space-2` no mínimo.

---

## 5. Alvos de toque

- Alvo mínimo: **56 × 56 px**.
- Botão primário: altura **64 px**, largura total até 360 px.
- Botão Kids: altura **80 px**, texto 26 px.
- Área de toque pode ser maior que o desenho visual; nunca menor.

---

## 6. Raios

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 12 px | Campos, chips |
| `--radius-md` | 20 px | Cartões adultos |
| `--radius-lg` | 28 px | Painéis e cartões de voz |
| `--radius-pill` | 999 px | Botões primários adultos |
| `--radius-kids` | 36 px | Todos os elementos do Kids (formas mais redondas) |

---

## 7. Sombras e profundidade

Sombras suaves, com base azul profundo. Nada de sombra pesada.

| Token | Valor | Uso |
|---|---|---|
| `--shadow-1` | `0 2px 8px rgba(11, 42, 85, 0.10)` | Cartões em repouso |
| `--shadow-2` | `0 8px 24px rgba(11, 42, 85, 0.16)` | Cartão de voz em foco, modais |
| `--shadow-glow-gold` | `0 0 24px rgba(255, 209, 102, 0.55)` | Conta rezada acesa (somente pulso) |
| `--shadow-kids` | `0 6px 0 rgba(27, 27, 58, 0.25)` | Botões Kids com "relevo" |

---

## 8. Movimento

### 8.1 Tokens

| Token | Valor | Uso |
|---|---|---|
| `--duration-fast` | 150 ms | Feedback de toque |
| `--duration-base` | 250 ms | Fade e troca de estado |
| `--duration-screen` | 350 ms | Transição de tela (faixa permitida: 250 a 450 ms) |
| `--duration-slow` | 450 ms | Teto para transições |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Padrão |
| `--spring-soft` | stiffness 120, damping 20, mass 1 | Transição de tela (Framer Motion) |
| `--spring-bounce` | stiffness 260, damping 18 | Conta acesa, cartão de voz (Kids apenas) |

### 8.2 Regras

- Transição de tela: deslize horizontal + fade, spring suave, 250 a 450 ms.
- Elemento compartilhado (cartão de voz que expande, terço do splash que vira o da oração) usa layout animation do Framer Motion.
- **Conta rezada:** acende em `gold-300` (adulto) ou `sun-400` (Kids) com um pulso de escala 1,00 → 1,08 → 1,00 em 400 ms, mais vibração leve.
- **Zoom do mistério:** câmera 3D faz fly-to sobre a dezena em 1,2 s e volta ao enquadramento geral no Salve Rainha.
- **Celebração:** partículas de luz suaves (máximo 40 partículas, opacidade baixa). Sem confete estourado.
- Animações contínuas (terço girando no splash) em no máximo 0,15 rotação por segundo, e param quando o app está em segundo plano.

### 8.3 Reduzir movimento

Com `prefers-reduced-motion: reduce` ou a opção "Reduzir movimento" em Ajustes:

- Transições viram fade de 200 ms.
- Sem zoom de câmera: o mistério troca com corte seco e o foco é indicado por realce.
- Sem partículas; conclusão mostra só o selo estático.
- Sem animação contínua do terço.

---

## 9. Elevação de componentes

| Componente | Repouso | Pressionado | Foco | Desabilitado |
|---|---|---|---|---|
| Botão primário (adulto) | `blue-600`, texto `white-50` | escurece 8 % | anel `blue-600` | evitar |
| Botão secundário | `white-50`, borda `blue-600` 2 px, texto `blue-900` | fundo `sky-200` | anel | evitar |
| Cartão de voz | `white-50`, borda `line-200`, `shadow-1` | escala 0,98 | borda `blue-600` 3 px | — |
| Cartão de voz selecionado | borda `gold-300` 4 px | — | — | — |
| Campo de texto | borda `line-200` 2 px, altura 56 px | — | borda `blue-600` 3 px | fundo `line-200` |
| Ícone de ação | 56 × 56 px, traço 2 px | fundo `sky-200` | anel | — |

---

## 10. Componentes-chave

- **Conta do terço:** esfera, 59 contas no total. Estados: `não rezada` (azul céu, opaca), `rezada` (dourado com brilho), `atual` (dourado com pulso contínuo lento).
- **Barra de progresso:** altura 12 px, cantos arredondados, preenchimento `blue-600` (adulto) ou `violet-500` (Kids).
- **Legenda da voz:** texto `--text-lead` sempre visível na tela de oração, fundo `blue-900` com texto `white-50`.
- **Selo de dia rezado:** círculo dourado com marca de verificação, contorno de 3 px. No Kids, vira estrela.
- **Chip de mistério:** pill com ícone e nome do conjunto, altura mínima 56 px.

---

## 11. Ícones e ilustração

- Ícones em traço de 2 px, cantos arredondados, grade de 24 px, tamanho de exibição mínimo 28 px.
- Ilustrações próprias em SVG, sem marcas de terceiros.
- **Mascote Kids:** anjinho amigável, feito em SVG original (cabeça redonda, asas pequenas em `sun-400`, sorriso simples, bochechas em `coral-500` a 40 %). Sem texto na imagem.
- **Terço 3D:** cruz e contas em esfera com material brilhante. Cores das contas: `sky-200` (não rezada), `gold-300` (rezada).

---

## 12. Acessibilidade

- Contraste AA em todos os textos (valores medidos na seção 2).
- Foco visível em todos os controles, com anel de 3 px.
- Ordem de leitura de tela: título da tela, conteúdo, ação principal.
- Rótulos de VoiceOver e TalkBack em todos os botões de ícone (ex.: "Pausar oração", "Próxima conta").
- Tamanho de texto ajustável até 150 %; layouts não quebram.
- Legenda sempre visível do que a voz fala, sem depender do áudio.
- Nenhuma informação só por cor.
- Respeitar `prefers-reduced-motion` e a opção do próprio app.

---

## 13. Regras de interface

- Uma ação principal por tela, em destaque.
- Sem menus escondidos para ações frequentes.
- Textos curtos, em português do Brasil, tratamento de "você".
- Sem jargão técnico em nenhuma tela. Erros dizem o que fazer ("Verifique a permissão de notificações em Ajustes").
- Sem anúncios, sem banners de promoção, sem pop-ups de avaliação antes do usuário rezar pelo menos uma vez.

---

## 14. Tema Kids: diferenças

- Fundo `kids-cream-50` com formas arredondadas e raio 36 px.
- Botões de 80 px de altura, relevo `shadow-kids`, texto 26 px.
- Fontes Fredoka ou Baloo 2 nos títulos.
- Mascote presente na tela inicial e na conclusão.
- Conclusão de dia rezado vira estrela ou figurinha no calendário.
- Alternância de Ave Maria e Pai Nosso com ícone animado (conforme prompt).
- Mesma estrutura de navegação do adulto. Nenhuma tela extra.
- Sem coleta de dados, sem links externos, sem compra dentro do app.

---

## 15. Checklist de cada tela

- [ ] Contraste AA verificado com os tokens acima
- [ ] Alvos de toque ≥ 56 px
- [ ] Texto ≥ 18 px e legível com escala 150 %
- [ ] Uma ação principal em destaque
- [ ] Rótulos de acessibilidade em ícones
- [ ] Movimento respeita `prefers-reduced-motion`
- [ ] Funciona sem internet
- [ ] Tema Kids usa os tokens `--kids-*`, nunca as cores adultas
