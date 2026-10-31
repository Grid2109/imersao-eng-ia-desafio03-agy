// ============================================================================
// 1. ARMAZENAMENTO E ESTADO (Dados e localStorage)
// ============================================================================

// Nome da chave usada para guardar a lista dentro do localStorage do navegador
const CHAVE_STORAGE = "minhas_tarefas_v1";

// Lista (array) que guarda as tarefas na memória enquanto a página está aberta
let tarefas = [];

// Filtro ativo no momento: "todas", "pendente", "em_andamento" ou "concluida"
let filtroAtual = "todas";

// Guarda o ID da tarefa que está sendo editada no momento (ou null se nenhuma)
let idEmEdicao = null;

// Lê as tarefas salvas no localStorage quando a página é aberta
function carregarTarefasDoStorage() {
  const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);
  if (!dadosSalvos) {
    return [];
  }
  try {
    const lista = JSON.parse(dadosSalvos);
    // Garante compatibilidade caso existam tarefas em formatos anteriores
    return lista.map(function (tarefa) {
      const statusAtual = tarefa.status || (tarefa.concluida ? "concluida" : "pendente");
      return {
        id: String(tarefa.id),
        texto: tarefa.texto,
        status: statusAtual
      };
    });
  } catch (erro) {
    console.error("Erro ao ler tarefas do localStorage:", erro);
    return [];
  }
}

// Salva a lista atual de tarefas no localStorage com tratamento de exceções
function salvarTarefasNoStorage() {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas));
  } catch (erro) {
    console.error("Erro ao salvar tarefas no localStorage:", erro);
    mostrarMensagemErro("Não foi possível salvar as tarefas no navegador.");
  }
}

// ============================================================================
// 2. FUNÇÕES QUE MEXEM NA LISTA (Regras de negócio)
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

  // Identificador único universalmente exclusivo (UUID)
  const id =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : String(Date.now());

  // Cria o objeto que representa a nova tarefa (começa como "pendente")
  const novaTarefa = {
    id: id,
    texto: textoLimpo,
    status: "pendente"
  };

  tarefas.push(novaTarefa);
  salvarTarefasNoStorage();

  return { sucesso: true };
}

// Avança o estado da tarefa a cada clique:
// 1º clique: "pendente" -> "em_andamento" (mostra o spinner animado)
// 2º clique: "em_andamento" -> "concluida" (fundo verde e texto riscado)
// 3º clique: "concluida" -> "pendente" (reabre a atividade)
function avancarStatusTarefa(idTarefa) {
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
        status: proximoStatus
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

  if (idEmEdicao === idTarefa) {
    idEmEdicao = null;
  }

  salvarTarefasNoStorage();
}

// Remove todas as tarefas que já estejam com status "concluida"
function limparTarefasConcluidas() {
  tarefas = tarefas.filter(function (tarefa) {
    return tarefa.status !== "concluida";
  });

  salvarTarefasNoStorage();
  desenharTarefas();
}

// Edita o texto de uma tarefa existente
function editarTextoTarefa(idTarefa, novoTexto) {
  const textoLimpo = novoTexto.trim();
  if (textoLimpo === "") {
    mostrarMensagemErro("O texto da tarefa não pode ficar em branco.");
    return false;
  }

  tarefas = tarefas.map(function (tarefa) {
    if (tarefa.id === idTarefa) {
      return {
        id: tarefa.id,
        texto: textoLimpo,
        status: tarefa.status
      };
    }
    return tarefa;
  });

  idEmEdicao = null;
  salvarTarefasNoStorage();
  desenharTarefas();
  return true;
}

// ============================================================================
// 3. FUNÇÕES QUE DESENHAM A TELA (Manipulação do DOM)
// ============================================================================

// Referências para os elementos do HTML
const formTarefa = document.getElementById("form-tarefa");
const inputTarefa = document.getElementById("input-tarefa");
const listaTarefasEl = document.getElementById("lista-tarefas");
const mensagemVaziaEl = document.getElementById("mensagem-vazia");
const mensagemErroEl = document.getElementById("mensagem-erro");
const contadorTotalEl = document.getElementById("contador-total");
const contadorAndamentoEl = document.getElementById("contador-andamento");
const contadorConcluidasEl = document.getElementById("contador-concluidas");
const botaoLimparConcluidasEl = document.getElementById("botao-limpar-concluidas");
const botoesFiltro = document.querySelectorAll(".botao-filtro");

// Exibe um aviso visual na tela
function mostrarMensagemErro(texto) {
  mensagemErroEl.textContent = texto;
  mensagemErroEl.hidden = false;
}

// Esconde o aviso de erro
function limparMensagemErro() {
  mensagemErroEl.textContent = "";
  mensagemErroEl.hidden = true;
}

// Atualiza o HTML da lista, contadores e filtros
function desenharTarefas() {
  // Limpa o conteúdo visual atual antes de redesenhar
  listaTarefasEl.innerHTML = "";

  // Atualiza os contadores em tempo real
  const total = tarefas.length;
  const emAndamento = tarefas.filter(function (t) {
    return t.status === "em_andamento";
  }).length;
  const concluidas = tarefas.filter(function (t) {
    return t.status === "concluida";
  }).length;

  contadorTotalEl.textContent = "Total: " + total;
  contadorAndamentoEl.textContent = "Em andamento: " + emAndamento;
  contadorConcluidasEl.textContent = "Concluídas: " + concluidas;

  // Filtra as tarefas conforme o botão selecionado
  const tarefasFiltradas = tarefas.filter(function (tarefa) {
    if (filtroAtual === "todas") {
      return true;
    }
    return tarefa.status === filtroAtual;
  });

  // Atualiza mensagem quando não há itens
  if (total === 0) {
    mensagemVaziaEl.textContent = "Nenhuma tarefa cadastrada ainda. Adicione uma atividade acima!";
    mensagemVaziaEl.hidden = false;
  } else if (tarefasFiltradas.length === 0) {
    mensagemVaziaEl.textContent = "Nenhuma tarefa encontrada para este filtro.";
    mensagemVaziaEl.hidden = false;
  } else {
    mensagemVaziaEl.hidden = true;
  }

  // Renderiza cada tarefa correspondente
  tarefasFiltradas.forEach(function (tarefa) {
    const itemLi = document.createElement("li");
    let classeEstado = "";
    if (tarefa.status === "em_andamento") {
      classeEstado = " em-andamento";
    } else if (tarefa.status === "concluida") {
      classeEstado = " concluida";
    }
    itemLi.className = "item-tarefa" + classeEstado;
    itemLi.dataset.id = tarefa.id;

    // Se estiver em modo de edição deste item, exibe o formulário inline
    if (idEmEdicao === tarefa.id) {
      const formEdicao = document.createElement("form");
      formEdicao.className = "form-edicao";

      const inputEdicao = document.createElement("input");
      inputEdicao.type = "text";
      inputEdicao.className = "input-edicao";
      inputEdicao.value = tarefa.texto;
      inputEdicao.setAttribute("aria-label", "Editar texto da tarefa");

      const botaoSalvar = document.createElement("button");
      botaoSalvar.type = "submit";
      botaoSalvar.className = "botao-salvar-edicao";
      botaoSalvar.textContent = "Salvar";

      const botaoCancelar = document.createElement("button");
      botaoCancelar.type = "button";
      botaoCancelar.className = "botao-cancelar-edicao";
      botaoCancelar.textContent = "Cancelar";

      botaoCancelar.addEventListener("click", function () {
        idEmEdicao = null;
        limparMensagemErro();
        desenharTarefas();
      });

      formEdicao.addEventListener("submit", function (e) {
        e.preventDefault();
        editarTextoTarefa(tarefa.id, inputEdicao.value);
      });

      formEdicao.appendChild(inputEdicao);
      formEdicao.appendChild(botaoSalvar);
      formEdicao.appendChild(botaoCancelar);
      itemLi.appendChild(formEdicao);

      listaTarefasEl.appendChild(itemLi);

      // Foca automaticamente no campo de edição
      setTimeout(function () {
        inputEdicao.focus();
        inputEdicao.select();
      }, 0);

      return;
    }

    // Modo normal de exibição
    const labelConteudo = document.createElement("label");
    labelConteudo.className = "conteudo-tarefa";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox-tarefa";

    // Configuração de acessibilidade (ARIA e tri-state) para leitores de tela
    if (tarefa.status === "concluida") {
      checkbox.checked = true;
      checkbox.indeterminate = false;
      checkbox.setAttribute("aria-checked", "true");
      checkbox.setAttribute("aria-label", "Tarefa concluída: " + tarefa.texto + ". Clique para reabrir.");
    } else if (tarefa.status === "em_andamento") {
      checkbox.checked = false;
      checkbox.indeterminate = true;
      checkbox.setAttribute("aria-checked", "mixed");
      checkbox.setAttribute("aria-label", "Tarefa em andamento: " + tarefa.texto + ". Clique para concluir.");
    } else {
      checkbox.checked = false;
      checkbox.indeterminate = false;
      checkbox.setAttribute("aria-checked", "false");
      checkbox.setAttribute("aria-label", "Tarefa pendente: " + tarefa.texto + ". Clique para iniciar.");
    }

    // Clique no checkbox ou spinner avança o status
    checkbox.addEventListener("change", function () {
      avancarStatusTarefa(tarefa.id);
      desenharTarefas();
    });

    labelConteudo.appendChild(checkbox);

    // Spinner animado quando em andamento
    if (tarefa.status === "em_andamento") {
      const spinner = document.createElement("span");
      spinner.className = "spinner-andamento";
      spinner.title = "Tarefa em andamento";
      spinner.setAttribute("aria-hidden", "true");
      labelConteudo.appendChild(spinner);
    }

    const spanTexto = document.createElement("span");
    spanTexto.className = "texto-tarefa";
    spanTexto.textContent = tarefa.texto;
    labelConteudo.appendChild(spanTexto);

    // Selo visual de em andamento
    if (tarefa.status === "em_andamento") {
      const badgeAndamento = document.createElement("span");
      badgeAndamento.className = "badge-andamento";
      badgeAndamento.textContent = "Em andamento";
      labelConteudo.appendChild(badgeAndamento);
    }

    // Grupo de ações: Editar e Remover
    const divAcoes = document.createElement("div");
    divAcoes.className = "acoes-tarefa";

    // Botão de editar com ícone de lápis em SVG
    const botaoEditar = document.createElement("button");
    botaoEditar.type = "button";
    botaoEditar.className = "botao-editar";
    botaoEditar.title = "Editar tarefa";
    botaoEditar.setAttribute("aria-label", "Editar tarefa: " + tarefa.texto);
    botaoEditar.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>' +
      '<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>' +
      "</svg>";

    botaoEditar.addEventListener("click", function () {
      idEmEdicao = tarefa.id;
      limparMensagemErro();
      desenharTarefas();
    });

    // Botão de remover com ícone de lixeira em SVG
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

    botaoRemover.addEventListener("click", function () {
      removerTarefa(tarefa.id);
      desenharTarefas();
    });

    divAcoes.appendChild(botaoEditar);
    divAcoes.appendChild(botaoRemover);

    itemLi.appendChild(labelConteudo);
    itemLi.appendChild(divAcoes);
    listaTarefasEl.appendChild(itemLi);
  });
}

// ============================================================================
// 4. EVENTOS E INICIALIZAÇÃO
// ============================================================================

// Formulário de adição de nova tarefa
formTarefa.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const resultado = adicionarTarefa(inputTarefa.value);

  if (!resultado.sucesso) {
    mostrarMensagemErro(resultado.mensagem);
    inputTarefa.focus();
    return;
  }

  limparMensagemErro();
  inputTarefa.value = "";
  inputTarefa.focus();
  desenharTarefas();
});

// Limpa erro ao digitar no campo principal
inputTarefa.addEventListener("input", function () {
  if (!mensagemErroEl.hidden) {
    limparMensagemErro();
  }
});

// Botões de filtro por status
botoesFiltro.forEach(function (botao) {
  botao.addEventListener("click", function () {
    botoesFiltro.forEach(function (btn) {
      btn.classList.remove("ativo");
    });
    botao.classList.add("ativo");
    filtroAtual = botao.dataset.filtro;
    desenharTarefas();
  });
});

// Botão para limpar tarefas concluídas
botaoLimparConcluidasEl.addEventListener("click", function () {
  limparTarefasConcluidas();
});

// Inicialização: carrega tarefas do armazenamento e desenha na tela
tarefas = carregarTarefasDoStorage();
desenharTarefas();
