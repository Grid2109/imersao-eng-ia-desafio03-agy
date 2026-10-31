# Minha Lista de Tarefas — Desafio 03 (Alura + Google for Startups)

> **Sobre o desafio:** Este projeto é o **Desafio 03 da Imersão de Engenharia de Software com IA da Alura + Google for Startups**, desenvolvido utilizando o **Google Antigravity** com foco em boas práticas de organização de código, engenharia de prompt e evolução incremental.

## O que é o projeto
Uma aplicação web de **Lista de Tarefas (To-Do List)** construída com **HTML, CSS e JavaScript puros** (sem frameworks ou bibliotecas externas). A interface permite gerenciar atividades do dia a dia de forma visual, intuitiva e responsiva, salvando todos os dados automaticamente no navegador (`localStorage`).

## Funcionalidades e Melhorias Implementadas

- **Validação de entrada**: Impede o cadastro de tarefas vazias ou compostas apenas por espaços em branco, exibindo um alerta amigável na tela.
- **Fluxo de 3 estados para cada tarefa**:
  1. **Pendente (Estado inicial)**: Tarefa recém-criada pronta para ser iniciada.
  2. **Em andamento (1º clique no checkbox)**: Exibe um ícone giratório de carregamento (*spinner* animado em CSS) e uma etiqueta `"Em andamento"`, indicando que a atividade está sendo executada.
  3. **Concluída (2º clique)**: Marca a tarefa como finalizada, aplicando fundo verde escuro suave, *checkbox* preenchido e texto riscado (`line-through`) na cor `--muted-foreground` (um 3º clique permite reabrir a tarefa para pendente).
- **Tema Escuro inspirado no shadcn/ui**: Estilização construída com variáveis CSS semânticas no `:root` (`--background`, `--foreground`, `--card`, `--card-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--destructive`, `--border`, `--input`, `--ring` e `--radius`).
- **Centralização e Responsividade**: Cartão principal centralizado na vertical e na horizontal, adaptando-se perfeitamente a telas de computadores e celulares.
- **Botão de exclusão com ícone SVG**: Ícone minimalista de lixeira em SVG puro com opacidade suave (`0.55`) que destaca a cor vermelha (`--destructive`) ao passar o mouse (*hover*).
- **Contadores em tempo real e Persistência (`localStorage`)**: Acompanhamento instantâneo de tarefas (`Total`, `Em andamento` e `Concluídas`) que permanecem salvas mesmo após recarregar a página ou fechar o navegador.

## Como rodar o projeto

1. Abra o terminal e entre na pasta do projeto:
   ```bash
   cd todo-list-desafio03-agy
   ```
2. Inicie um servidor web local simples com Python na porta `8080`:
   ```bash
   python3 -m http.server 8080
   ```
3. **No Google Cloud Shell**:
   - Clique no botão **Web Preview** (ícone de uma tela com uma lupa no canto superior direito do Cloud Shell).
   - Selecione **Preview on port 8080** (ou clique em *Change port*, digite `8080` e clique em *Change and Preview*).
4. **No seu computador local**:
   - Abra o navegador e acesse `http://localhost:8080`.

## Demonstração do projeto e Deploy
<img width="721" height="622" alt="image" src="https://github.com/user-attachments/assets/a39d5376-6d54-4671-a666-d387b9d14aa7" />


[Abrir a lista de tarefas](https://todo-list-ia-agy.netlify.app)


## Como cada arquivo funciona

- **`index.html` (Estrutura)**: Define os elementos semânticos da página: cabeçalho, formulário de cadastro (`<form>`), campo de texto (`<input>`), botão de adicionar (`<button>`), barra de resumo com os 3 contadores (`Total`, `Em andamento` e `Concluídas`) e a lista (`<ul>`) onde as tarefas são renderizadas.
- **`style.css` (Visual)**: Define a paleta do tema escuro inspirada no **shadcn/ui** através de variáveis CSS no `:root`, centraliza o cartão na tela, cria a animação `@keyframes` do *spinner* de carregamento, estiliza o estado concluído e configura o botão de lixeira e a responsividade.
- **`script.js` (Comportamento)**: Concentra a lógica em JavaScript dividida em 4 seções claras:
  1. **Armazenamento (`localStorage`)**: Lê e salva a lista de tarefas no navegador convertendo entre objetos JavaScript e texto `JSON`.
  2. **Regras da lista (Dados)**: Funções que adicionam tarefas (validando textos vazios com `.trim()`), alternam entre os 3 estados (`pendente` → `em_andamento` → `concluida`) e removem atividades pelo `id`.
  3. **Desenho da tela (`DOM`)**: Função `desenharTarefas()` que reconstrói a lista visual, o *spinner*, o ícone de lixeira em SVG e os contadores sempre que os dados mudam.
  4. **Eventos e Inicialização**: Escuta o envio do formulário e os cliques do usuário para manter os dados e a tela sempre sincronizados.
