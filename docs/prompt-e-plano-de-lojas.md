# Terço App — Prompt Claude Code + Plano de Lojas

Nov 10, 2026

Dois materiais prontos: (1) o prompt para colar no Claude Code, que gera as vozes e reconstrói o app; (2) o plano para publicar na App Store e no Google Play.

## Antes de colar o prompt

- **Conector certo:** o conector ElevenLabs deste chat só renderiza o áudio na tela e não salva arquivos. No Claude Code, use o conector completo (`https://api.elevenlabs.io/v1/mcp`, em Configurações → Conectores → Adicionar conector personalizado) ou a API REST com a chave em variável de ambiente. Assim os MP3 são salvos direto na pasta do projeto.
- **Plano pago:** vozes da biblioteca para uso comercial exigem plano pago e licença que permita publicar em app. Confira a licença de cada voz escolhida.
- **Créditos:** são 3 vozes × 29 arquivos = 87 áudios, mais os 20 textos infantis. O prompt manda estimar o custo e pedir sua aprovação antes de gerar em lote.

## Prompt para o Claude Code

Cole tudo abaixo no Claude Code, na pasta vazia do projeto.

```text
Você vai construir o app mobile "Terço" (rosário católico guiado por voz) para iOS e Android, do zero, com acabamento profissional. Público: pessoas simples, muitas idosas, sem conhecimento técnico, e crianças. Idioma: português do Brasil. Trabalhe em etapas, me mostre cada etapa e só avance depois de validar. Antes de codar, estude e use as skills disponíveis: taste-skill:design-taste-frontend, taste-skill:high-end-visual-design, taste-skill:imagegen-frontend-mobile, anthropic-skills:frontend-design, design:accessibility-review e design:ux-copy.

## ETAPA 0 — Direção de arte (DESIGN.md)
Crie um DESIGN.md antes de qualquer tela: paleta azul (azul profundo #0B2A55, azul médio #1F5FA8, azul céu #9CC8F0, dourado suave #FFD166, branco #F4F9FF), tipografia (títulos serifados elegantes, ex.: Cormorant Garamond ou Fraunces; texto em Inter ou similar, mínimo 18px), espaçamento, raios, sombras, estados e tokens de movimento. Regras: contraste AA, alvos de toque de no mínimo 56px, textos grandes, nada de interface poluída, respeitar prefers-reduced-motion. Tema Kids separado: cores mais vivas e quentes, formas arredondadas, mascote (anjinho ou estrela amigável) ilustrado em SVG original, botões enormes.

## ETAPA 1 — Stack
React + Vite + TypeScript. Animação: Framer Motion (transições de tela e microinterações) e GSAP onde precisar de timeline. 3D: Three.js com react-three-fiber e drei. Empacotamento nativo: Capacitor (iOS e Android). Plugins: @capacitor/local-notifications, @capacitor/haptics, @capacitor/preferences, keep-awake e áudio em segundo plano. App 100% offline: todo áudio e texto empacotados.

## ETAPA 2 — Vozes com ElevenLabs (3 versões)
Use o conector ElevenLabs (ou a API REST com ELEVENLABS_API_KEY no ambiente, nunca no código). Para cada perfil, use creative_list_voices (ou GET /v1/voices) filtrando português (pt) e escolha:
- FEMININA doce: acolhedora, serena, ritmo calmo (candidatas: Keren, Miranda, Luna).
- MASCULINA: calorosa, grave suave, pausada, tom de reverência sem ser teatral.
- INFANTIL (kids): voz jovem, alegre e clara, para falar com crianças.
Primeiro gere uma amostra de 1 frase por candidata (2 takes cada), me peça para escolher e só depois gere em lote. Antes do lote, use estimate_only e me mostre o custo; só gere após meu OK. Use o modelo eleven_v4 (ou eleven_v3), 1 take por arquivo no lote, e NUNCA repita uma geração para tentar de novo sem me avisar.
Salve os arquivos localmente com este padrão (minúsculas, sem acento, hífen):

public/audio/{voz}/oracoes/01-sinal-da-cruz.mp3
02-credo.mp3, 03-pai-nosso.mp3, 04-ave-maria.mp3, 05-gloria.mp3, 06-o-meu-jesus.mp3, 07-salve-rainha.mp3, 08-terco-concluido.mp3
public/audio/{voz}/misterios/gozosos-1-anunciacao.mp3 ... (20 arquivos: gozosos, luminosos, dolorosos, gloriosos × 5; cada um anuncia a ordem por extenso e o nome, ex.: "Primeiro mistério gozoso: A Anunciação.")
public/audio/{voz}/boas-vindas.mp3

{voz} = feminina | masculina | kids. As orações são as mesmas do app atual (Sinal da Cruz, Creio, Pai Nosso, Ave Maria, Glória, Ó meu Jesus, Salve Rainha). Revise o texto de cada oração antes de gerar.

FRASE DE BOAS-VINDAS (falada ao abrir o app, adaptada por voz):
- feminina e masculina: "Seja bem-vindo. Respire fundo, acalme o coração. Vamos rezar o terço juntos?"
- kids: "Oi, amiguinho! Que bom ver você aqui. Vamos rezar o terço juntos?"

Modo KIDS extra: para cada um dos 20 mistérios, crie um texto de 1 a 2 frases simples, para criança de 6 a 10 anos, que explique o mistério (ex.: "Anunciação: um anjo contou a Maria que ela seria a mãe de Jesus."), e gere em public/audio/kids/misterios-explicados/ com o mesmo padrão de nomes. Na reza infantil, a Ave Maria e o Pai Nosso tocam inteiros, mas podem alternar com um ícone animado para manter a atenção.

Pós-processamento com ffmpeg: converter para mp3 mono 96 kbps, cortar silêncio de início e fim, normalizar em cerca de -16 LUFS, e manter cada arquivo curto. Gere public/audio/manifest.json com {voz, arquivo, duração em ms, texto}. Verifique que nenhum arquivo está faltando e informe o tamanho total.

## ETAPA 3 — Telas separadas, com transições
1. Splash / Boas-vindas: logo animado, 3D do terço girando suavemente, frase de boas-vindas escrita e falada (a voz padrão ainda não foi escolhida: use a feminina no primeiro acesso; depois use a escolhida). Toque para entrar.
2. Escolha de voz (onboarding, primeira vez): três cartões grandes (Feminina, Masculina, Kids) com ilustração, descrição curta e botão "Ouvir" que toca uma amostra. Seleção salva e alterável depois em Ajustes. Escolher Kids ativa o Modo Kids.
3. Início: palavra do dia (um trecho diferente a cada abertura, sem repetir o último), botão principal "Vamos rezar o terço", sugestão dos mistérios do dia, acesso rápido a calendário e lembrete.
4. Escolha de mistérios: rosário completo ou um mistério; os 4 conjuntos com ilustração.
5. Oração: cena 3D do terço no centro (cruz, 59 contas esféricas com brilho, fio). A cada conta rezada, a conta acende em azul/dourado com um leve pulso e vibração. Ao iniciar cada mistério, a câmera dá um zoom animado (fly-to) sobre a dezena correspondente e volta ao enquadramento geral no Salve Rainha. Texto da oração legível abaixo, barra de progresso, pausar, voltar, avançar. O áudio guia a reza e avança sozinho; o usuário pode tocar para avançar manualmente.
6. Conclusão: animação de celebração (partículas de luz suaves, sem exagero), frase final, botão para marcar o dia no calendário (marcação automática ao concluir).
7. Calendário: mês com dias rezados marcados (selo dourado), sequência de dias, navegação entre meses. No Kids, cada dia rezado vira uma estrela ou figurinha.
8. Lembrete: escolher horário e dias da semana; notificação local real (funciona com o app fechado) com o texto "Vamos rezar o terço?". Pedir permissão de notificação em linguagem simples.
9. Palavra do dia: tela própria com o trecho, referência e uma frase curta de reflexão, com opção de compartilhar como imagem.
10. Ajustes: voz (feminina, masculina, kids), tamanho do texto, reduzir movimento, desligar 3D (modo leve), lembrete, sobre e privacidade.
Transições entre todas as telas: deslize e fade com spring, elemento compartilhado quando fizer sentido (cartão de voz que expande, terço do splash que vira o terço da oração). Duração entre 250 e 450 ms. Trilha ambiente suave opcional, desligada por padrão.

## ETAPA 4 — Conteúdo bíblico
Use uma tradução em domínio público (ex.: Almeida Revista e Corrigida ou ACF), com no mínimo 60 trechos curtos, verifique cada referência e texto contra uma fonte confiável, e indique a tradução usada em Ajustes. Não copie traduções protegidas por direitos autorais.

## ETAPA 5 — Qualidade
- Funciona sem internet; abre em menos de 2 s; 60 fps no 3D em celulares intermediários, com fallback 2D automático se o aparelho for fraco.
- Acessibilidade: leitor de tela (VoiceOver e TalkBack), tamanho de fonte ajustável, contraste, legenda sempre visível do que a voz fala.
- Áudio: continua com a tela bloqueada; respeita modo silencioso e interrupções (ligação).
- Persistência local (Preferences): voz, mistério, progresso, dias rezados, lembrete.
- Sem anúncios, sem rastreamento e sem conta. Nenhum dado sai do aparelho.
- Testes: fluxo completo do rosário em cada voz, retomada de progresso, calendário, notificação, modo Kids.

## ETAPA 6 — Entrega
Projeto Capacitor pronto: `npm run build`, `npx cap sync`, projetos ios/ e android/ abrindo no Xcode e no Android Studio. Gere ícone do app (1024 px) e splash nativo em todos os tamanhos, e um README com os comandos de build e release (AAB assinado para o Google Play, arquivo para o TestFlight). Crie a pasta store/ com textos e capturas planejadas (veja o plano de lojas que acompanha este prompt).

Ao terminar cada etapa, pare, resuma o que foi feito em até 5 linhas e me peça validação.
```

## Plano para App Store e Google Play

### 1. Decisões que travam o resto

- **Como empacotar:** o app é feito com tecnologia web (React) e empacotado com Capacitor para virar app nativo nas duas lojas. É a opção mais rápida e mantém um único código.
- **Aprovação na Apple:** a Apple costuma recusar apps que parecem só um site dentro de uma moldura. Para passar, o app precisa de recursos nativos reais: notificações locais, vibração, áudio em segundo plano, tudo offline e experiência pensada para o celular. O prompt acima já inclui isso.
- **Público infantil:** se o app for anunciado como feito para crianças, entra nas regras de Kids Category (Apple) e Families (Google), que são bem mais rígidas (sem anúncios, sem análise de dados, bloqueio parental). Recomendação: publicar como app **para toda a família**, com Modo Kids como recurso, sem coletar nenhum dado. Confirme a classificação etária no formulário de cada loja.
- **Direitos:** confirme a tradução bíblica usada (domínio público) e a licença de uso comercial das vozes ElevenLabs.

### 2. Contas e custos (confira os valores nos sites oficiais, podem mudar)

- **Apple Developer Program:** assinatura anual, cerca de US$ 99. Sem Mac, não dá para gerar o app iOS localmente; é preciso um Mac com Xcode ou um serviço de build na nuvem (Codemagic, por exemplo).
- **Google Play Console:** taxa única, cerca de US$ 25. Contas pessoais novas costumam precisar de um teste fechado com pelo menos 12 testadores por 14 dias antes de liberar a produção; confirme a regra atual. Contas de organização (empresa com CNPJ) têm exigências diferentes. A Via Multimidia pode abrir como organização, o que exige número D-U-N-S.
- **Conta como empresa:** abrir pela empresa (Via Multimidia) deixa o nome do desenvolvedor profissional. Pessoas físicas aparecem com o nome pessoal.

### 3. Cronograma sugerido (cerca de 4 a 6 semanas)

- **Semana 1:** vozes aprovadas, geração dos 87 áudios, DESIGN.md, abrir contas nas lojas (a verificação da Apple e do D-U-N-S demora).
- **Semana 2:** telas principais, 3D do terço, oração com voz, transições.
- **Semana 3:** calendário, lembretes, Modo Kids, ajustes, acessibilidade, modo leve.
- **Semana 4:** testes em aparelhos reais (Android antigo, iPhone), correções, ícone e capturas.
- **Semana 5:** teste fechado no Google Play (12 testadores, 14 dias) e TestFlight na Apple; textos e política de privacidade.
- **Semana 6:** envio para revisão, ajustes pedidos, publicação.

### 4. Material exigido pelas lojas

- **Ícone:** 1024 × 1024 px, sem transparência e sem cantos arredondados (a loja arredonda).
- **Capturas de tela:** iPhone 6,7" e 6,5"; iPad se o app for universal; Android celular (e tablet, se declarado). Sugestão: 6 capturas com título curto sobre cada uma (voz, terço 3D, calendário, palavra do dia, Modo Kids, lembrete).
- **Gráfico de recurso (Google Play):** 1024 × 500 px. Vídeo de preview opcional nas duas lojas.
- **Textos:** nome (até 30 caracteres), subtítulo, descrição curta e completa, palavras-chave, categoria (Estilo de vida ou Referência; não há categoria religiosa dedicada fixa, escolha a mais próxima), URL de suporte e e-mail de contato.
- **Política de privacidade:** publicada em uma URL pública (pode ser uma página no site da Via). Deve dizer que o app não coleta dados e funciona offline.
- **Formulários de conformidade:** Privacidade do App (Apple) e Segurança de Dados (Google), classificação etária, declaração de anúncios (nenhum) e acesso do revisor (o app não tem login, então não é necessário).

### 5. Sugestão de nomes e textos

- **Nome:** "Terço — Reze com voz" (confirme se o nome está livre nas duas lojas).
- **Subtítulo:** "Rosário guiado, calendário e lembrete".
- **Descrição curta:** "Reze o terço com voz guiada, mistérios do dia, palavra da Bíblia e lembrete diário. Versões feminina, masculina e infantil."

### 6. Checklist de lançamento

- Vozes aprovadas e licença confirmada.
- 87 áudios + 20 textos infantis gerados e conferidos (nenhum faltando, tamanho do app aceitável).
- Tradução bíblica de domínio público verificada.
- Testado em pelo menos 1 Android antigo, 1 Android atual e 1 iPhone.
- Ícone, splash e 6 capturas prontos.
- Política de privacidade no ar.
- Contas ativas (Apple e Google) e formulários preenchidos.
- Build assinado (AAB e IPA) enviado, TestFlight e teste fechado concluídos.
- Envio para revisão. Prazo médio de revisão: de poucas horas a alguns dias; programe margem para uma possível recusa e correção.

### 7. Depois do lançamento

- Responder avaliações, corrigir erros e acompanhar quedas pelos relatórios das lojas.
- Evolução natural: mais orações (Ladainha, Angelus), modo comunidade para rezar junto, Via Sacra, e um plano de apoio opcional se fizer sentido.
