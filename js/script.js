let conteudoList = document.querySelector(".cont-to-list");
let janelaEdit = document.querySelector(".janela-edit");
let FormToDo = document.querySelector("#to-do-form");
let btnCancel = document.querySelector(".btnCancelTarefa");
let inputAt = document.querySelector("#inputAtualizar");
let btnAdd = document.querySelector("#btnAddToDo");
let btnModi = document.querySelector("#btnAddModi");

// Ouvintes de eventos
btnAdd.addEventListener("click", addTag);
btnCancel.addEventListener("click", cancelModi);
btnModi.addEventListener("click", function (e) {
    e.preventDefault();
    modifyToDo();
});

// Funções
function addTag(e) {
    e.preventDefault();

    const todoInput = document.querySelector("#input-to-do");
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        const novoToDo = document.createElement("li");
        novoToDo.className = "to-do-box";

        novoToDo.innerHTML = `
            <span class="text-to-do">${todoText}</span>
            <div class="btn-list">
                <button id="btn-all" class="check-to-do"><i class="fa-solid fa-check" id="btn-check"></i></button>
                <button id="btn-all" class="edit-to-do"><i class="fa-solid fa-pen" id="btn-pen"></i></button>
                <button id="btn-all" class="remove-to-do"><i class="fa-solid fa-xmark" id="btn-xmark"></i></button>
            </div>
        `;

        const toList = document.querySelector(".to-list");
        toList.classList.remove("hide");
        toList.appendChild(novoToDo);

        todoInput.value = "";

        const btnCheck = novoToDo.querySelector(".check-to-do");
        btnCheck.addEventListener("click", function () {
            completeToDo(novoToDo);
        });

        const btnEdit = novoToDo.querySelector(".edit-to-do");
        btnEdit.addEventListener("click", function () {
            editToDo(novoToDo);
        });

        const btnRemove = novoToDo.querySelector(".remove-to-do");
        btnRemove.addEventListener("click", function () {
            removeToDo(novoToDo);
        });
    } else {
        alert("Digite uma tarefa!");
    }
}

function completeToDo(todoElement) {
    todoElement.classList.toggle("done");
}

function editToDo(todoElement) {
    FormToDo.style.display = "none";
    janelaEdit.style.display = "block";
    inputAt.value = todoElement.querySelector(".text-to-do").textContent;
    inputAt.focus();

    // Adiciona a classe "editando" à tarefa em edição
    todoElement.classList.add("editando");
}

function removeToDo(todoElement) {
    todoElement.remove();
}

function cancelModi(e) {
    e.preventDefault();
    FormToDo.style.display = "block";
    janelaEdit.style.display = "none";

    // Remove a classe "editando" de todas as tarefas
    const todasAsTarefas = document.querySelectorAll(".to-do-box");
    todasAsTarefas.forEach(tarefa => tarefa.classList.remove("editando"));

    // Limpa o campo de inputAtualizar
    inputAt.value = "";
}

function modifyToDo() {
    // Exibe novamente o formulário de adição de tarefa
    FormToDo.style.display = "block";

    // Esconde a janela de edição
    janelaEdit.style.display = "none";

    // Encontrar a tarefa em edição
    const tarefaEditada = document.querySelector(".to-do-box.editando");

    // Se houver uma tarefa em edição
    if (tarefaEditada) {
        // Obtém o novo texto do campo de edição
        const novoTexto = inputAt.value.trim();        

        // Se o novo texto não for vazio
        if (novoTexto !== "") {
            // Atualiza o texto da tarefa com o novo texto
            tarefaEditada.querySelector(".text-to-do").textContent = novoTexto;

            // Remove a classe "editando" da tarefa
            tarefaEditada.classList.remove("editando");

            // Limpa o campo de edição
            inputAt.value = "";
        } else {
            // Se o novo texto for vazio, exibe um alerta
            alert("Digite um novo texto para a tarefa!");
        }
    }
}
