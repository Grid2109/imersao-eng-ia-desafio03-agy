# Minha Lista de Tarefas — Desafio 03 (Alura + Google for Startups)

> **Sobre o projeto:** Este projeto foi desenvolvido por **Ingrid Lira** durante o **Desafio 03 da Imersão de Engenharia de Software com IA da Alura + Google for Startups**. A aplicação foi construída do zero utilizando agentes autônomos do **Google Antigravity** em sua **Primeira Versão (v1)** e posteriormente evoluiu para uma **Segunda Versão Revisada (v2)**, na qual os agentes do Antigravity executaram melhorias profundas de arquitetura, acessibilidade, novas funcionalidades e documentação técnica guiadas pelo framework de engenharia de prompt **GCCD** (*Goal, Context, Constraints, Done When*).

## O que é o projeto

Uma aplicação web de **Lista de Tarefas (To-Do List)** construída com **HTML, CSS e JavaScript puros** (sem frameworks ou bibliotecas externas). A interface permite gerenciar atividades do dia a dia de forma visual, intuitiva e responsiva, salvando todos os dados automaticamente no **localStorage** (recurso nativo do navegador que permite guardar dados no computador do usuário de forma contínua, sem que se percam ao fechar a janela).

O projeto exemplifica como ferramentas de IA generativa para desenvolvimento de software podem atuar não apenas gerando código inicial, mas também conduzindo ciclos completos de refatoração, acessibilidade e controle de qualidade.

## Demonstração do projeto e Deploy

<p align="center">
  <img src="https://github.com/user-attachments/assets/3395705a-c718-4b1c-8d2e-56c873588d0a" alt="Tela inicial da lista de tarefas" width="48%">
  <img src="https://github.com/user-attachments/assets/025eeae9-4180-4e46-bf00-66e0c5f5e1d2" alt="Lista com tarefas cadastradas" width="48%">
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/2a036f3e-7973-41dc-846e-dbc4d934f460" alt="Tarefa em andamento com spinner" width="48%">
  <img src="https://github.com/user-attachments/assets/d2642a25-1147-4256-a7ed-dbe245f741bf" alt="Tarefa concluída" width="48%">
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/b113babe-ea35-4436-96e0-e69f81341f4b" alt="Edição inline de tarefa" width="48%">
  <img src="https://github.com/user-attachments/assets/5edcea18-3edd-4a29-af2b-defd6e4acfdb" alt="Filtros por status" width="48%">
</p>


[Abrir a lista de tarefas](https://imersao-eng-ia-desafio03-agy.vercel.app)

---

## Funcionalidades Principais

- **Validação de entrada**: Impede o cadastro de tarefas vazias ou compostas apenas por espaços em branco, exibindo um alerta amigável na tela.
- **Ciclo de vida em 3 estados**: Gerencia o progresso das tarefas entre Pendente, Em andamento e Concluída.
- **Tema Escuro inspirado no shadcn/ui**: Estilização construída com variáveis CSS semânticas no `:root` (`--background`, `--foreground`, `--card`, `--card-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--destructive`, `--border`, `--input`, `--ring` e `--radius`).
- **Centralização e Responsividade**: Cartão principal centralizado na vertical e na horizontal, adaptando-se perfeitamente a computadores e celulares.
- **Contadores em tempo real**: Acompanhamento instantâneo de tarefas (`Total`, `Pendentes`, `Em andamento` e `Concluídas`).
- **Filtros e Limpeza rápida**: Filtragem por status e remoção de tarefas finalizadas em um clique.
- **Edição inline**: Permite alterar o texto de qualquer tarefa diretamente na lista.

---

## Como usar a lista de tarefas

O fluxo de uso foi desenhado para ser intuitivo e direto:

1. **Adicionar uma tarefa**: Digite o texto da atividade no campo principal e pressione `Enter` ou clique no botão `Adicionar`. Se o campo estiver em branco, uma mensagem de aviso será exibida.
2. **Avançar o status da tarefa (fluxo de 3 estados)**:
   - **Pendente (estado inicial)**: A tarefa é criada com a caixa de seleção desmarcada, indicando que ainda não foi iniciada.
   - **1º clique (Em andamento)**: Ao clicar na caixa de seleção ou no conteúdo da tarefa, ela entra em andamento. O sistema exibe um spinner (ícone giratório de carregamento) e uma etiqueta visual amarela `Em andamento`. Para **leitores de tela** (programas que transformam o conteúdo visual e textual da interface em voz sintetizada ou braille para pessoas cegas ou com baixa visão), o estado é anunciado como intermediário (`aria-checked="mixed"`).
   - **2º clique (Concluída)**: Ao clicar novamente, a tarefa é finalizada. A caixa fica marcada, o fundo recebe destaque verde suave e o texto fica riscado.
   - **3º clique (Reabertura)**: Caso queira reabrir uma tarefa concluída, basta clicar nela uma terceira vez para que retorne ao estado Pendente.
3. **Editar uma tarefa**: Clique no botão com ícone de lápis ao lado da tarefa para entrar no modo de edição. Ajuste o texto no campo exibido e clique em `Salvar` (ou pressione `Enter`). Para desistir da alteração, clique em `Cancelar`.
4. **Filtrar por status**: Utilize os botões `Todas`, `Pendentes`, `Em andamento` e `Concluídas` localizados acima da lista para visualizar apenas as atividades do estado desejado.
5. **Remover uma tarefa individual**: Clique no botão com ícone de lixeira para excluir a atividade de forma imediata.
6. **Limpar concluídas**: Clique no botão `Limpar concluídas` para excluir de uma vez todas as atividades já finalizadas.

---

## Como clonar o repositório

Para baixar uma cópia do projeto para o seu computador, certifique-se de ter o **Git** instalado no seu sistema (você pode verificar digitando `git --version` no seu terminal).

1. Abra o seu **terminal** (Prompt de Comando ou PowerShell no Windows, ou Terminal no Linux e macOS).
2. Execute o comando de clonagem:
   ```bash
   git clone https://github.com/Grid2109/imersao-eng-ia-desafio03-agy.git
   ```
3. Acesse a pasta do projeto clonado:
   ```bash
   cd imersao-eng-ia-desafio03-agy
   ```

---

## Como executar e instalar por Sistema Operacional

Por ser uma aplicação web nativa construída com **HTML, CSS e JavaScript puros**, o projeto **não necessita de instalação de pacotes externos** (não é necessário executar `npm install` nem configurar compiladores). Todos os arquivos são interpretados diretamente pelo navegador.

Abaixo estão as instruções detalhadas de execução para cada sistema operacional:

### Pré-requisitos e termos importantes

- **Terminal**: Programa de computador onde interagimos com o sistema operacional por meio de comandos em texto.
- **Servidor local**: Programa que roda no seu computador e disponibiliza os arquivos como se fosse um site na internet, simulando o ambiente real de produção.
- **Porta**: Número de identificação que direciona a conexão de rede para um programa específico no computador (exemplo: `8080`).
- **PATH**: Lista de pastas do sistema operacional que indica onde procurar os programas instalados (como o Python ou Node.js) para executá-los via linha de comando.

---

### Windows

Você pode rodar a aplicação no Windows de duas formas:

#### Opção A: Abertura direta (Sem instalar nada)
1. Abra o Explorador de Arquivos (`tecla Windows + E`).
2. Acesse a pasta `imersao-eng-ia-desafio03-agy`.
3. Dê um duplo clique no arquivo `index.html` (ou clique com o botão direito e selecione seu navegador preferido, como Chrome ou Edge).

#### Opção B: Servidor local com Python (Recomendado)
1. Abra o PowerShell ou o Prompt de Comando (CMD) dentro da pasta do projeto.
2. Inicie o servidor local na porta `8080`:
   ```powershell
   python -m http.server 8080
   ```
   *(Caso o comando `python` não seja reconhecido, utilize `py -m http.server 8080`)*.
3. Abra o navegador e acesse:
   ```text
   http://localhost:8080
   ```
4. Para encerrar o servidor, volte ao terminal e pressione `Ctrl + C`.

---

### Linux (Ubuntu, Debian, Fedora e derivados)

#### Opção A: Abertura direta via terminal ou gerenciador de arquivos
- Pelo terminal, dentro da pasta do projeto, execute:
  ```bash
  xdg-open index.html
  ```
- Ou abra o gerenciador de arquivos e dê um duplo clique no arquivo `index.html`.

#### Opção B: Servidor local com Python
1. A maioria das distribuições Linux já vem com o Python 3 pré-instalado. No terminal da pasta do projeto, execute:
   ```bash
   python3 -m http.server 8080
   ```
2. Caso o Python 3 não esteja instalado:
   - No **Debian/Ubuntu**: `sudo apt update && sudo apt install python3`
   - No **Fedora**: `sudo dnf install python3`
3. Abra o navegador e acesse:
   ```text
   http://localhost:8080
   ```
4. Para encerrar o servidor, pressione `Ctrl + C`.

---

### macOS

#### Opção A: Abertura direta via Finder ou terminal
- Pelo terminal, dentro da pasta do projeto, execute:
  ```bash
  open index.html
  ```
- Ou localize o arquivo `index.html` no Finder e dê um duplo clique.

#### Opção B: Servidor local com Python
1. No Terminal, dentro da pasta do projeto, execute:
   ```bash
   python3 -m http.server 8080
   ```
2. Caso precise instalar o Python, utilize o Homebrew (`brew install python`) ou baixe o instalador oficial em python.org.
3. Abra o navegador e acesse:
   ```text
   http://localhost:8080
   ```
4. Para encerrar o servidor, pressione `Ctrl + C`.

---

### Ambientes Web e Cloud (Google Cloud Shell e Vercel)

- **No Google Cloud Shell**:
  1. No terminal do Cloud Shell, entre na pasta do projeto:
     ```bash
     cd imersao-eng-ia-desafio03-agy
     ```
  2. Inicie o servidor:
     ```bash
     python3 -m http.server 8080
     ```
  3. Clique no botão **Web Preview** (ícone de tela com lupa no canto superior direito) e selecione **Preview on port 8080**.
- **Versão Online Publicada na Vercel**:
  - Para acessar sem baixar nem executar nada: [https://imersao-eng-ia-desafio03-agy.vercel.app](https://imersao-eng-ia-desafio03-agy.vercel.app).

---

### Solução de problemas comuns

- **Comando Python não reconhecido no Windows (`'python'` ou `'py'` não é reconhecido)**:
  - Causa: O Python não está instalado ou a caixa "Add Python to PATH" não foi marcada durante a instalação.
  - Solução: Baixe o instalador oficial em python.org marcando a opção "Add Python to PATH", ou use a **Opção A** (abrir diretamente o arquivo `index.html`).
- **Porta em uso (`OSError: [Errno 98] Address already in use` ou `[WinError 10048]`)**:
  - Causa: Outro programa já está utilizando a porta 8080.
  - Solução: Mude o número da porta no comando, por exemplo: `python -m http.server 8081` (ou `python3 -m http.server 8081`) e acesse `http://localhost:8081`.
- **Erro ao entrar na pasta (`cd: no such file or directory` ou `O sistema não pode encontrar o caminho especificado`)**:
  - Causa: O comando `git clone` ainda não foi executado ou você está no diretório pai errado.
  - Solução: Execute `git clone https://github.com/Grid2109/imersao-eng-ia-desafio03-agy.git` e depois `cd imersao-eng-ia-desafio03-agy`.

---

## Evolução do Projeto: Versão 1 vs Versão 2

O desenvolvimento ocorreu em dois ciclos incrementais com agentes do Google Antigravity:

### Primeira Versão (v1) — Criação do Zero
- Construção de toda a base da aplicação a partir de arquivos vazios.
- Estruturação semântica do `index.html` com formulário, campo de texto e lista não ordenada.
- Estilização completa do tema escuro inspirado no shadcn/ui com variáveis CSS no `:root` e regras de layout responsivo.
- Lógica inicial em `script.js` para adicionar tarefas, validar contra entradas em branco, remover itens e alternar entre os 3 estados (Pendente, Em andamento com spinner e Concluída com texto riscado).
- Persistência básica no `localStorage` do navegador e contadores em tempo real.

### Segunda Versão (v2) — Revisão e Engenharia de Software
- **Acessibilidade para leitores de tela**: Implementação do estado misto no checkbox (`aria-checked="mixed"` e `indeterminate = true`) e criação de `aria-labels` descritivos para informar o estado exato da tarefa e a ação do próximo clique.
- **Respeito às preferências de movimento**: Inclusão de `@media (prefers-reduced-motion: reduce)` para desligar a rotação contínua do spinner e transições em sistemas configurados para redução de estímulos visuais.
- **Tratamento de exceções no salvamento**: Proteção com `try/catch` na função `salvarTarefasNoStorage()`, evitando quebras de execução caso ocorra estouro de cota do `localStorage`.
- **Refatoração semântica e limpeza de código**: Renomeação da função de avanço para `avancarStatusTarefa`, eliminação da propriedade redundante `concluida` nos objetos (centralizando tudo em `status`) e exclusão de checagens condicionais desnecessárias nos contadores.
- **Identificadores robustos**: Adoção de `crypto.randomUUID()` em vez de `Date.now()`, gerando identificadores universais únicos.
- **Novas funcionalidades de produtividade**: Filtros por status (`Todas`, `Pendentes`, `Em andamento`, `Concluídas`), botão `Limpar concluídas` e funcionalidade de edição inline do texto de qualquer tarefa existente.
- **Padronização de metadados**: Criação de `LICENSE` (Licença MIT), arquivo `.gitignore`, ícone vetorial `favicon.svg` e tag `meta name="description"` no cabeçalho HTML.
- **Validação técnica com testes**: Inicialização e conferência de resposta HTTP 200 de todos os arquivos estáticos via servidor local.

---

## Como cada arquivo funciona

- **`index.html` (Estrutura)**: Define os elementos semânticos da interface: metadados no `<head>` (incluindo descrição e favicon), cabeçalho, formulário de cadastro, mensagens de alerta, painel de contadores, barra de filtros e ações, e a lista (`<ul>`) onde os itens são montados.
- **`style.css` (Visual)**: Define as variáveis do tema escuro inspiradas no shadcn/ui, centralização do layout no `body`, regras de responsividade para dispositivos móveis, transições suaves, regras de acessibilidade de movimento (`prefers-reduced-motion`) e estilos dos botões de controle e edição.
- **`script.js` (Comportamento)**: Centraliza a lógica da aplicação em quatro blocos:
  1. **Armazenamento e Estado**: Leitura e gravação no `localStorage` protegidas por `try/catch`.
  2. **Regras da Lista**: Funções para adicionar tarefas (com validação `.trim()` e identificador UUID), avançar o ciclo de 3 estados (`avancarStatusTarefa`), editar texto, remover itens individuais e limpar concluídas em lote.
  3. **Desenho da Tela (DOM)**: Função `desenharTarefas()` que sincroniza o estado da memória com os elementos visuais, contadores e acessibilidade ARIA.
  4. **Eventos e Inicialização**: Gerenciamento de eventos de submissão, digitação, seleção de filtros e ações rápidas.
- **`favicon.svg` (Identidade)**: Ícone vetorial exibido na aba do navegador representando uma caixa de tarefa com marcação de conclusão.
- **`LICENSE` (Licença)**: Licença de software MIT, permitindo reutilização, estudo e modificação do código.
- **`.gitignore` (Controle de Versão)**: Lista de regras para evitar o envio de arquivos temporários do sistema ou do editor para o repositório Git.

---

## Prompts Usados e Processo (Método GCCD)

A engenharia de software com IA foi aplicada neste repositório por meio do framework **GCCD**, ensinado na Imersão de Engenharia de Software com IA (Alura + Google for Startups):

- **Goal (Objetivo)**: O que se espera que o agente de IA execute ou produza com precisão.
- **Context (Contexto)**: O ambiente técnico, histórico do projeto, tecnologias permitidas e perfil do repositório.
- **Constraints (Restrições)**: Limites arquiteturais e regras inegociáveis (ex.: não usar frameworks externos, não inventar fatos, não utilizar emojis, manter padrões semânticos).
- **Done When (Critérios de Pronto)**: Checklist verificável e objetivo que comprova que a tarefa atingiu todos os requisitos com sucesso.

Abaixo estão registrados os prompts estruturados que orientaram os agentes do **Google Antigravity** em cada fase:

### Primeira Versão (v1)

#### Prompt 1 — Estruturação Inicial e Regras da Aplicação
```markdown
# GOAL (Objetivo)
Criar do zero uma aplicação web de Lista de Tarefas (To-Do List) funcional, intuitiva e moderna, utilizando apenas HTML, CSS e JavaScript puros (sem frameworks, bibliotecas externas ou Node.js).

# CONTEXT (Contexto)
- Projeto participante do Desafio 03 da Imersão de Engenharia de Software com IA (Alura + Google for Startups).
- A aplicação deve ser executada localmente ou em navegadores modernos, persistindo os dados no localStorage do navegador.
- O público-alvo são pessoas usuárias que precisam organizar suas atividades diárias com simplicidade e rapidez.

# CONSTRAINTS (Restrições)
- Não utilizar nenhuma dependência externa, framework (como React ou Vue) ou gerenciador de pacotes (npm/yarn).
- Código limpo, semântico e bem documentado em português do Brasil.
- Implementar validação para impedir tarefas vazias ou compostas apenas por espaços.

# DONE WHEN (Critérios de pronto)
- Formulário funcional com campo de entrada e botão de adicionar.
- Lista de tarefas renderizada dinamicamente com opção de exclusão.
- Contadores em tempo real para acompanhar as atividades cadastradas.
- Persistência automática dos dados no localStorage ao adicionar ou remover tarefas.
```

#### Prompt 2 — Ciclo de 3 Estados e Tema shadcn/ui
```markdown
# GOAL (Objetivo)
Evoluir a Lista de Tarefas adicionando um ciclo de vida de 3 estados para cada item e aplicando um tema escuro (Dark Mode) inspirado nos padrões visuais do shadcn/ui.

# CONTEXT (Contexto)
- Projeto existente em HTML, CSS e JavaScript puros.
- As tarefas atualmente possuem apenas estados binários (pendente ou concluída), o que não reflete quando alguém está executando a tarefa no momento.

# CONSTRAINTS (Restrições)
- Manter CSS puro utilizando variáveis no seletor :root para as cores e raios de borda.
- O spinner de carregamento deve ser construído puramente com CSS (@keyframes), sem imagens pesadas.
- Garantir compatibilidade com tarefas já salvas no localStorage.

# DONE WHEN (Critérios de pronto)
- Tema escuro aplicado com variáveis semânticas (--background, --foreground, --card, etc.).
- Fluxo de 3 estados implementado:
  1º clique: transiciona de pendente para "em andamento" (com spinner animado e badge visual);
  2º clique: transiciona para "concluída" (caixa marcada, texto riscado e fundo verde);
  3º clique: reabre a tarefa retornando para "pendente".
- Layout centralizado vertical e horizontalmente, com suporte a telas de celulares.
```

---

### Segunda Versão (v2) — Modelo de Prompt de Engenharia de Software (GCCD)

O prompt abaixo serviu de modelo completo para a condução da revisão de engenharia de software da versão 2 com os agentes do Antigravity, detalhando as 4 etapas, a implementação de código, a execução de testes no servidor e a geração da tabela comprobatória:

```markdown
# GOAL (Objetivo)

Melhorar a aplicação de Lista de Tarefas e o seu arquivo README.md (Desafio 03 da Imersão de Engenharia de Software com IA, Alura + Google) executando um ciclo completo de engenharia de software em 4 etapas ordenadas:

1. Exploração do repositório e planejamento detalhado (diagnóstico do que está certo, errado ou desatualizado).
2. Implementação prática das melhorias de código e arquitetura nos arquivos do projeto.
3. Reestruturação e edição completa do README.md.
4. Execução de testes no servidor e conferência rigorosa de tudo o que foi escrito contra o código real.

# CONTEXT (Contexto)

- Projeto: To-Do List em HTML, CSS e JavaScript puros, sem frameworks, sem Node.js e sem gerenciador de pacotes (npm/yarn).
- Persistência: Dados salvos localmente no localStorage do navegador.
- Repositório: https://github.com/Grid2109/imersao-eng-ia-desafio03-agy
- Versão publicada: https://imersao-eng-ia-desafio03-agy.vercel.app
- Arquivos base: index.html, style.css, script.js e README.md.
- Cenário: Portfólio de uma desenvolvedora em formação na Imersão de Engenharia de Software com IA. O texto deve ser acessível para quem lê o portfólio, mas tecnicamente rigoroso.

# CONSTRAINTS (Restrições)

- Não utilizar frameworks nem bibliotecas externas: manter a arquitetura original pura e sem dependências.
- Não inventar fatos: toda afirmação sobre o comportamento ou estrutura da aplicação deve ser checada e comprovada no código real.
- Tom e linguagem: Escrever em português do Brasil, em tom natural, direto e profissional, sem utilizar nenhum emoji.
- Didática: Explicar termos técnicos em linguagem simples na primeira vez em que aparecerem (localStorage, clonar, terminal, servidor local, porta, PATH, UUID, leitores de tela).
- Segurança de versão: Não fazer git push. Preparar a mensagem de commit no padrão Conventional Commits e aguardar aprovação.

# DONE WHEN (Critérios de Pronto)

Etapa 1 — Exploração e Planejamento:
- Lista de cada arquivo do repositório descrita em uma frase.
- Diagnóstico detalhado do que no README atual está certo, errado ou desatualizado, com indicação de arquivo e linha.
- Plano de ação estruturado antes de alterar qualquer arquivo.

Etapa 2 — Implementação das Melhorias no Código:
- Acessibilidade para leitores de tela: estado "em andamento" refletido no checkbox com indeterminate = true, aria-checked="mixed" e aria-labels descritivos.
- Preferências de movimento: suporte a @media (prefers-reduced-motion: reduce) desativando a rotação contínua do spinner e transições.
- Tratamento de exceções: bloco try/catch ao gravar no localStorage na função salvarTarefasNoStorage().
- Refatoração e limpeza: função renomeada para avancarStatusTarefa, remoção do campo redundante "concluida" (unificando em "status") e eliminação de ifs desnecessários nos contadores.
- Identificadores únicos: substituição de Date.now() pela API nativa crypto.randomUUID().
- Novas funcionalidades: barra de filtros por status (Todas, Pendentes, Em andamento, Concluídas), botão "Limpar concluídas" e edição inline do texto da tarefa diretamente na lista.
- Metadados: inclusão dos arquivos LICENSE (Licença MIT), .gitignore, favicon.svg e inclusão da tag meta name="description" no index.html.

Etapa 3 — Edição do README.md:
- Instruções completas de clonagem (git clone) e navegação com o nome correto da pasta (cd imersao-eng-ia-desafio03-agy).
- 4 opções de execução: direto no navegador com dois cliques, servidor local Python (com variações de Windows/Linux/macOS), Google Cloud Shell e versão online na Vercel.
- Guia de solução dos problemas mais comuns (Python fora do PATH, porta em uso, pasta inexistente).
- Seção "Como usar a lista de tarefas" detalhando o ciclo de vida dos 3 estados, edição, filtros e contadores.
- Seção detalhando a evolução entre a versão inicial (v1) e a versão revisada (v2).
- Modelo explicativo de engenharia de prompt baseado no método GCCD.

Etapa 4 — Testes, Conferência e Finalização:
- Execução de testes via servidor HTTP local comprovando resposta HTTP 200 OK para index.html, style.css, script.js e favicon.svg.
- Tabela de conferência técnica demonstrando a correspondência exata: "Afirmação do README -> Onde foi conferida no código real (arquivo e linhas)", sem nenhum item sem comprovação.
- Resumo claro do que mudou no projeto, mensagem de commit sugerida no padrão Conventional Commits e itens pendentes para decisão.
```

---

## Tabela de Conferência Técnica: Afirmação do README vs Código Real

Para garantir conformidade entre a documentação e o código real, cada afirmação técnica descrita neste README foi inspecionada diretamente nos arquivos-fonte:

| Afirmação no README | Onde foi conferida no código |
| :--- | :--- |
| Aplicação em HTML, CSS e JavaScript puros sem frameworks | `index.html` (linhas 9 e 69) conecta apenas `style.css` e `script.js` locais, sem scripts externos |
| Persistência dos dados no localStorage do navegador | `script.js` (linhas 6, 13 e 43) com `localStorage.getItem` e `localStorage.setItem` |
| Validação que impede tarefas vazias ou só com espaços | `script.js` (linhas 55-66) checa `textoDigitado.trim() === ""` e exibe alerta em `<p id="mensagem-erro">` |
| Ciclo de 3 estados: Pendente, Em andamento e Concluída | `script.js` (linhas 82-108) na função `avancarStatusTarefa` |
| 1º clique ativa spinner animado e badge "Em andamento" | `script.js` (linhas 231-243) e `style.css` (linhas 211-240) |
| Acessibilidade para leitores de tela com estado misto | `script.js` (linhas 225-230) define `indeterminate = true` e `aria-checked="mixed"` |
| 2º clique marca como concluída (fundo verde e texto riscado) | `style.css` (linhas 254-264) nas classes `.item-tarefa.concluida` e `.texto-tarefa` |
| 3º clique reabre a tarefa para pendente | `script.js` (linhas 90-93) no ramo `else` que define `proximoStatus = "pendente"` |
| Edição inline com validação de campo vazio | `script.js` (linhas 125-144) e formulário inline renderizado dinamicamente |
| Filtros por status (Todas, Pendentes, Em andamento, Concluídas) | `index.html` (linhas 47-53) e `script.js` (linhas 164-169) |
| Botão "Limpar concluídas" para exclusão em lote | `index.html` (linha 54) e `script.js` (linhas 118-123) removem itens com `status === "concluida"` |
| Botão de exclusão com ícone de lixeira em SVG e hover suave | `script.js` (linhas 265-283) e `style.css` (linhas 265-289) |
| Contadores em tempo real de Total, Pendentes, Em andamento e Concluídas | `index.html` (linhas 41-44) e `script.js` (linhas 197-212) |
| Respeito à preferência prefers-reduced-motion no spinner | `style.css` (linhas 372-382) na media query `@media (prefers-reduced-motion: reduce)` |
| Salvamento protegido com try/catch contra QuotaExceededError | `script.js` (linhas 41-48) na função `salvarTarefasNoStorage` |
| Identificadores gerados com crypto.randomUUID() | `script.js` (linhas 68-71) em `adicionarTarefa` |
| Tema escuro shadcn/ui construído com variáveis no :root | `style.css` (linhas 4-20) |
| Responsividade e centralização em telas pequenas | `style.css` (linhas 30-52) e media query para dispositivos móveis |
| Comando de clonagem e nome correto da pasta do projeto | `README.md` com `git clone` e navegação para `imersao-eng-ia-desafio03-agy` |
| Presença de LICENSE, .gitignore, favicon.svg e meta description | Arquivos `LICENSE`, `.gitignore`, `favicon.svg` na raiz e metadados no `index.html` |

---

## Créditos e Parceria

- **Desenvolvedora**: Ingrid Lira ([GitHub @Grid2109](https://github.com/Grid2109))
- **Programa**: Imersão de Engenharia de Software com IA (Desafio 03)
- **Parceria Institucional**: [Alura](https://www.alura.com.br/) + [Google for Startups](https://startup.google.com/)
- **Ambiente de Desenvolvimento**: Desenvolvido com suporte de agentes autônomos no **Google Antigravity**
- **Licença**: [MIT License](LICENSE)
