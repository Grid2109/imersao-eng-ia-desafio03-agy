// ============================================================================
// 1. ARMAZENAMENTO E ESTADO (Dados e localStorage)
// ============================================================================

// Nome da chave usada para guardar a lista dentro do localStorage do navegador
const CHAVE_STORAGE = "minhas_tarefas_v1";

// Lista (array) que guarda as tarefas na memória enquanto a página está aberta
let tarefas = [];

// Lê as tarefas salvas no localStorage quando a página é aberta
function carregarTarefasDoStorage() {
  const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);
  if (!dadosSalvos) {
    return [];
  }
  try {
    const lista = JSON.parse(dadosSalvos);
    // Garante compatibilidade caso existam tarefas salvas na versão anterior (sem o campo status)
    return lista.map(function (tarefa) {
      const statusAtual = tarefa.status || (tarefa.concluida ? "concluida" : "pendente");
      return {
        id: tarefa.id,
        texto: tarefa.texto,
        status: statusAtual,
        concluida: statusAtual === "concluida"
      };
    });
  } catch (erro) {
    console.error("Erro ao ler tarefas do localStorage:", erro);
    return [];
  }
}

// Salva a lista atual de tarefas no localStorage convertendo para texto (JSON)
function salvarTarefasNoStorage() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas));
}

// ============================================================================
// 2. FUNÇÕES QUE MEXEM NA LISTA (Regras: adicionar, alternar status, remover)
// ============================================================================

// Adiciona uma nova tarefa na lista caso o texto não seja vazio
function adicionarTarefa(textoDigitado) {
  // .trim() remove espaços em branco do começo e do fim do texto
  const textoLimpo = textoDigitado.trim();

  // Impede adicionar tarefa vazia ou feita apenas de espaços
  if (textoLimpo === "") {
    return {
      sucesso: false,
      mensagem: "Por favor, digite uma atividade antes de adicionar."
    };
  }

  // Cria o objeto que representa a nova tarefa (começa como "pendente")
  const novaTarefa = {
    id: Date.now(), // Usa o horário atual em milissegundos como identificador único
    texto: textoLimpo,
    status: "pendente",
    concluida: false
  };

  tarefas.push(novaTarefa);
  salvarTarefasNoStorage();

  return { sucesso: true };
}

// Avança o estado da tarefa a cada clique:
// 1º clique: "pendente" -> "em_andamento" (mostra o spin de load carregando)
// 2º clique: "em_andamento" -> "concluida" (fundo verde e texto riscado)
// 3º clique: "concluida" -> "pendente" (permite reabrir a tarefa)
function alternarConclusaoTarefa(idTarefa) {
  tarefas = tarefas.map(function (tarefa) {
    if (tarefa.id === idTarefa) {
      let proximoStatus = "pendente";
      if (tarefa.status === "pendente") {
        proximoStatus = "em_andamento";
      } else if (tarefa.status === "em_andamento") {
        proximoStatus = "concluida";
      } else {
        proximoStatus = "pendente";
      }

      return {
        id: tarefa.id,
        texto: tarefa.texto,
        status: proximoStatus,
        concluida: proximoStatus === "concluida"
      };
    }
    return tarefa;
  });

  salvarTarefasNoStorage();
}

// Remove uma tarefa da lista filtrando pelo seu identificador (id)
function removerTarefa(idTarefa) {
  tarefas = tarefas.filter(function (tarefa) {
    return tarefa.id !== idTarefa;
  });

  salvarTarefasNoStorage();
}

// ============================================================================
// 3. FUNÇÕES QUE DESENHAM A TELA (Manipulação do DOM)
// ============================================================================

// Referências para os elementos do HTML que vamos atualizar
const formTarefa = document.getElementById("form-tarefa");
const inputTarefa = document.getElementById("input-tarefa");
const listaTarefasEl = document.getElementById("lista-tarefas");
const mensagemVaziaEl = document.getElementById("mensagem-vazia");
const mensagemErroEl = document.getElementById("mensagem-erro");
const contadorTotalEl = document.getElementById("contador-total");
const contadorAndamentoEl = document.getElementById("contador-andamento");
const contadorConcluidasEl = document.getElementById("contador-concluidas");

// Exibe um aviso visual caso o usuário tente adicionar uma tarefa vazia
function mostrarMensagemErro(texto) {
  mensagemErroEl.textContent = texto;
  mensagemErroEl.hidden = false;
}

// Esconde o aviso de erro
function limparMensagemErro() {
  mensagemErroEl.textContent = "";
  mensagemErroEl.hidden = true;
}

// Atualiza o HTML da lista e os contadores com base no array `tarefas`
function desenharTarefas() {
  // Limpa o conteúdo visual atual antes de redesenhar
  listaTarefasEl.innerHTML = "";

  // Atualiza os contadores de total, em andamento e concluídas
  const total = tarefas.length;
  const emAndamento = tarefas.filter(function (t) {
    return t.status === "em_andamento";
  }).length;
  const concluidas = tarefas.filter(function (t) {
    return t.status === "concluida";
  }).length;

  contadorTotalEl.textContent = "Total: " + total;
  if (contadorAndamentoEl) {
    contadorAndamentoEl.textContent = "Em andamento: " + emAndamento;
  }
  contadorConcluidasEl.textContent = "Concluídas: " + concluidas;

  // Mostra ou esconde a mensagem de "Nenhuma tarefa cadastrada"
  mensagemVaziaEl.hidden = total > 0;

  // Para cada tarefa na lista, cria um elemento <li> na tela
  tarefas.forEach(function (tarefa) {
    const itemLi = document.createElement("li");
    let classeEstado = "";
    if (tarefa.status === "em_andamento") {
      classeEstado = " em-andamento";
    } else if (tarefa.status === "concluida") {
      classeEstado = " concluida";
    }
    itemLi.className = "item-tarefa" + classeEstado;
    itemLi.dataset.id = tarefa.id;

    // Rótulo clicável que agrupa o checkbox, o spinner (quando em andamento) e o texto
    const labelConteudo = document.createElement("label");
    labelConteudo.className = "conteudo-tarefa";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox-tarefa";
    checkbox.checked = tarefa.status === "concluida";
    checkbox.setAttribute("aria-label", "Alternar status da tarefa: " + tarefa.texto);

    // Quando o usuário clica no checkbox/spinner, avança o estado da tarefa e redesenha a tela
    checkbox.addEventListener("change", function () {
      alternarConclusaoTarefa(tarefa.id);
      desenharTarefas();
    });

    labelConteudo.appendChild(checkbox);

    // Se a tarefa estiver EM ANDAMENTO (1º clique), mostra o spin de load carregando
    if (tarefa.status === "em_andamento") {
      const spinner = document.createElement("span");
      spinner.className = "spinner-andamento";
      spinner.title = "Tarefa em andamento (clique novamente para concluir)";
      spinner.setAttribute("aria-hidden", "true");
      labelConteudo.appendChild(spinner);
    }

    const spanTexto = document.createElement("span");
    spanTexto.className = "texto-tarefa";
    spanTexto.textContent = tarefa.texto;
    labelConteudo.appendChild(spanTexto);

    // Etiqueta indicando visualmente que está em andamento
    if (tarefa.status === "em_andamento") {
      const badgeAndamento = document.createElement("span");
      badgeAndamento.className = "badge-andamento";
      badgeAndamento.textContent = "Em andamento";
      labelConteudo.appendChild(badgeAndamento);
    }

    // Botão para remover a tarefa (com ícone de lixeira em SVG)
    const botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.className = "botao-remover";
    botaoRemover.title = "Remover tarefa";
    botaoRemover.setAttribute("aria-label", "Remover tarefa: " + tarefa.texto);
    botaoRemover.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M3 6h18"></path>' +
      '<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>' +
      '<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>' +
      '<line x1="10" y1="11" x2="10" y2="17"></line>' +
      '<line x1="14" y1="11" x2="14" y2="17"></line>' +
      "</svg>";

    // Quando clicar em Remover, exclui a tarefa da lista e redesenha a tela
    botaoRemover.addEventListener("click", function () {
      removerTarefa(tarefa.id);
      desenharTarefas();
    });

    itemLi.appendChild(labelConteudo);
    itemLi.appendChild(botaoRemover);
    listaTarefasEl.appendChild(itemLi);
  });
}

// ============================================================================
// 4. EVENTOS E INICIALIZAÇÃO
// ============================================================================

// Escuta o envio do formulário (clique em "Adicionar" ou tecla Enter)
formTarefa.addEventListener("submit", function (evento) {
  // Impede o navegador de recarregar a página ao enviar o formulário
  evento.preventDefault();

  const resultado = adicionarTarefa(inputTarefa.value);

  if (!resultado.sucesso) {
    mostrarMensagemErro(resultado.mensagem);
    inputTarefa.focus();
    return;
  }

  // Se deu certo, limpa o erro, esvazia o campo e redesenha a lista na tela
  limparMensagemErro();
  inputTarefa.value = "";
  inputTarefa.focus();
  desenharTarefas();
});

// Esconde a mensagem de erro assim que o usuário começa a digitar algo
inputTarefa.addEventListener("input", function () {
  if (!mensagemErroEl.hidden) {
    limparMensagemErro();
  }
});

// Ao abrir a página, carrega as tarefas salvas e desenha a tela pela primeira vez
tarefas = carregarTarefasDoStorage();
desenharTarefas();
