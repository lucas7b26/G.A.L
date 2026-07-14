// =========================================
// G.A.L. - Gerenciador de Agentes
// Parte 1 - Interface e Status
// =========================================

// =========================================
// SISTEMA DE ABAS
// =========================================

const botoesAbas = document.querySelectorAll(".tab-button");
const abas = document.querySelectorAll(".tab");

botoesAbas.forEach(botao => {

    botao.addEventListener("click", () => {

        botoesAbas.forEach(b => b.classList.remove("active"));
        abas.forEach(a => a.classList.remove("active"));

        botao.classList.add("active");

        const aba = document.getElementById(botao.dataset.tab);

        if (aba) {

            aba.classList.add("active");

        }

    });

});

// =========================================
// ATRIBUTOS
// =========================================

const atributos = [
    document.getElementById("for"),
    document.getElementById("agi"),
    document.getElementById("int"),
    document.getElementById("pre"),
    document.getElementById("vig")
];

let pontosRestantes = 4;

const textoPontos = document.querySelector("#pontosRestantes strong");

function atualizarTextoPontos() {

    textoPontos.textContent = pontosRestantes;

}

function atualizarPeso() {

    const forca = Number(document.getElementById("for").value);

    const capacidade = forca * 5;

    let pesoAtual = 0;

    document.querySelectorAll(".item-card").forEach(item => {

        pesoAtual += Number(item.dataset.peso);

    });

    document.getElementById("pesoAtual").textContent =
        `Peso: ${pesoAtual} / ${capacidade}`;

}

document.querySelectorAll(".atributo").forEach(div => {

    const menos = div.querySelector(".menos");
    const mais = div.querySelector(".mais");
    const campo = div.querySelector("input");

    mais.addEventListener("click", () => {

        if (pontosRestantes <= 0) return;

        campo.value = Number(campo.value) + 1;

        pontosRestantes--;

        atualizarTextoPontos();

        atualizarPeso();

    });

    menos.addEventListener("click", () => {

        if (Number(campo.value) <= 1) return;

        campo.value = Number(campo.value) - 1;

        pontosRestantes++;

        atualizarTextoPontos();

        atualizarPeso();

    });

});

// =========================================
// PE / PD
// =========================================

const botaoRecurso = document.getElementById("trocarRecurso");
const labelRecurso = document.getElementById("labelRecurso");

let usandoPE = true;

botaoRecurso.addEventListener("click", () => {

    usandoPE = !usandoPE;

    if (usandoPE) {

        labelRecurso.textContent = "Pontos de Esforço (PE)";
        botaoRecurso.textContent = "Usar PE";

    } else {

        labelRecurso.textContent = "Pontos de Determinação (PD)";
        botaoRecurso.textContent = "Usar PD";

    }

});

// =========================================
// INICIALIZAÇÃO
// =========================================

atualizarTextoPontos();
atualizarPeso();
// =========================================
// PARTE 2 - PERÍCIAS
// =========================================

let editandoPericia = null;

const modalPericia = document.getElementById("modalPericia");
const listaPericias = document.getElementById("listaPericias");

// Abrir modal
document.getElementById("novaPericia").addEventListener("click", () => {

    editandoPericia = null;

    document.getElementById("periciaNome").value = "";
    document.getElementById("periciaAtributo").value = "FOR";
    document.getElementById("periciaBonus").value = "";

    modalPericia.style.display = "flex";

});

// Fechar modal
document.getElementById("cancelarPericia").addEventListener("click", () => {

    modalPericia.style.display = "none";

});

// Salvar
document.getElementById("salvarPericia").addEventListener("click", () => {

    const nome = document.getElementById("periciaNome").value.trim();
    const atributo = document.getElementById("periciaAtributo").value;
    const bonus = document.getElementById("periciaBonus").value.trim();

    if (nome === "") {

        alert("Digite o nome da perícia.");

        return;

    }

    if (editandoPericia) {

        editandoPericia.querySelector(".titulo").textContent = nome;
        editandoPericia.querySelector(".atributo").textContent = atributo;
        editandoPericia.querySelector(".bonus").textContent = bonus;

    } else {

        criarCardPericia(nome, atributo, bonus);

    }

    modalPericia.style.display = "none";

});

// Criar Card
function criarCardPericia(nome, atributo, bonus) {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `

        <h3 class="titulo">${nome}</h3>

        <p>

            <strong>Atributo:</strong>

            <span class="atributo">${atributo}</span>

        </p>

        <p>

            <strong>Bônus:</strong>

            <span class="bonus">${bonus}</span>

        </p>

        <div class="acoes">

            <button class="editar">✏️</button>

            <button class="duplicar">📋</button>

            <button class="remover">🗑️</button>

        </div>

    `;

    // Editar
    card.querySelector(".editar").addEventListener("click", () => {

        editandoPericia = card;

        document.getElementById("periciaNome").value =
            card.querySelector(".titulo").textContent;

        document.getElementById("periciaAtributo").value =
            card.querySelector(".atributo").textContent;

        document.getElementById("periciaBonus").value =
            card.querySelector(".bonus").textContent;

        modalPericia.style.display = "flex";

    });

    // Duplicar
    card.querySelector(".duplicar").addEventListener("click", () => {

        criarCardPericia(

            card.querySelector(".titulo").textContent + " (Cópia)",

            card.querySelector(".atributo").textContent,

            card.querySelector(".bonus").textContent

        );

    });

    // Remover
    card.querySelector(".remover").addEventListener("click", () => {

        if (confirm("Deseja remover esta perícia?")) {

            card.remove();

        }

    });

    listaPericias.appendChild(card);

}

// Pesquisa
document.getElementById("pesquisaPericia").addEventListener("input", function () {

    const pesquisa = this.value.toLowerCase();

    document.querySelectorAll("#listaPericias .card").forEach(card => {

        const nome = card.querySelector(".titulo").textContent.toLowerCase();

        card.style.display = nome.includes(pesquisa) ? "block" : "none";

    });

});
// =========================================
// PARTE 3 - INVENTÁRIO
// =========================================

let editandoItem = null;

const modalItem = document.getElementById("modalItem");
const listaItens = document.getElementById("listaItens");

// Abrir modal
document.getElementById("novoItem").addEventListener("click", () => {

    editandoItem = null;

    document.getElementById("itemNome").value = "";
    document.getElementById("itemPeso").value = "";
    document.getElementById("itemDescricao").value = "";

    modalItem.style.display = "flex";

});

// Fechar modal
document.getElementById("cancelarItem").addEventListener("click", () => {

    modalItem.style.display = "none";

});

// Salvar Item
document.getElementById("salvarItem").addEventListener("click", () => {

    const nome = document.getElementById("itemNome").value.trim();
    const peso = Number(document.getElementById("itemPeso").value);
    const descricao = document.getElementById("itemDescricao").value.trim();

    if (nome === "") {

        alert("Digite o nome do item.");

        return;

    }

    if (editandoItem) {

        editandoItem.dataset.peso = peso;

        editandoItem.querySelector(".titulo").textContent = nome;
        editandoItem.querySelector(".peso").textContent = peso;
        editandoItem.querySelector(".descricao").textContent = descricao;

    } else {

        criarCardItem(nome, peso, descricao);

    }

    atualizarPeso();

    modalItem.style.display = "none";

});

// Criar Card
function criarCardItem(nome, peso, descricao) {

    const card = document.createElement("div");

    card.className = "card item-card";

    card.dataset.peso = peso;

    card.innerHTML = `

        <h3 class="titulo">${nome}</h3>

        <p>

            <strong>Peso:</strong>

            <span class="peso">${peso}</span>

        </p>

        <p class="descricao">

            ${descricao}

        </p>

        <div class="acoes">

            <button class="editar">✏️</button>

            <button class="duplicar">📋</button>

            <button class="remover">🗑️</button>

        </div>

    `;

    // Editar
    card.querySelector(".editar").addEventListener("click", () => {

        editandoItem = card;

        document.getElementById("itemNome").value =
            card.querySelector(".titulo").textContent;

        document.getElementById("itemPeso").value =
            card.querySelector(".peso").textContent;

        document.getElementById("itemDescricao").value =
            card.querySelector(".descricao").textContent;

        modalItem.style.display = "flex";

    });

    // Duplicar
    card.querySelector(".duplicar").addEventListener("click", () => {

        criarCardItem(

            card.querySelector(".titulo").textContent + " (Cópia)",

            Number(card.dataset.peso),

            card.querySelector(".descricao").textContent

        );

        atualizarPeso();

    });

    // Remover
    card.querySelector(".remover").addEventListener("click", () => {

        if (confirm("Deseja remover este item?")) {

            card.remove();

            atualizarPeso();

        }

    });

    listaItens.appendChild(card);

    atualizarPeso();

}
// =========================================
// PARTE 4 - HABILIDADES
// =========================================

let editandoHabilidade = null;

const modalHabilidade = document.getElementById("modalHabilidade");
const listaHabilidades = document.getElementById("listaHabilidades");

// Mostrar/ocultar campo Elemento
document.getElementById("habTag").addEventListener("input", function () {

    const tag = this.value.trim().toLowerCase();

    document.getElementById("campoElemento").style.display =
        tag === "poder paranormal"
            ? "block"
            : "none";

});

// Abrir modal
document.getElementById("novaHabilidade").addEventListener("click", () => {

    editandoHabilidade = null;

    document.getElementById("habNome").value = "";
    document.getElementById("habTag").value = "";
    document.getElementById("habElemento").value = "Conhecimento";
    document.getElementById("habDescricao").value = "";

    document.getElementById("campoElemento").style.display = "none";

    modalHabilidade.style.display = "flex";

});

// Cancelar
document.getElementById("cancelarHabilidade").addEventListener("click", () => {

    modalHabilidade.style.display = "none";

});

// Salvar
document.getElementById("salvarHabilidade").addEventListener("click", () => {

    const nome = document.getElementById("habNome").value.trim();
    const tag = document.getElementById("habTag").value.trim();
    const elemento = document.getElementById("habElemento").value;
    const descricao = document.getElementById("habDescricao").value.trim();

    if (nome === "") {

        alert("Digite o nome da habilidade.");

        return;

    }

    if (editandoHabilidade) {

        editandoHabilidade.querySelector(".titulo").textContent = nome;
        editandoHabilidade.querySelector(".tag").textContent = tag;
        editandoHabilidade.querySelector(".descricao").textContent = descricao;

        const elementoLinha = editandoHabilidade.querySelector(".linhaElemento");

        if (tag.toLowerCase() === "poder paranormal") {

            elementoLinha.style.display = "block";
            elementoLinha.querySelector(".elemento").textContent = elemento;

        } else {

            elementoLinha.style.display = "none";

        }

    } else {

        criarCardHabilidade(nome, tag, elemento, descricao);

    }

    modalHabilidade.style.display = "none";

});

// Criar Card
function criarCardHabilidade(nome, tag, elemento, descricao) {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `

        <h3 class="titulo">${nome}</h3>

        <p>
            <strong>Tag:</strong>
            <span class="tag">${tag}</span>
        </p>

        <p class="linhaElemento"
           style="${tag.toLowerCase() === "poder paranormal" ? "" : "display:none;"}">

            <strong>Elemento:</strong>

            <span class="elemento">
                ${elemento}
            </span>

        </p>

        <p class="descricao">
            ${descricao}
        </p>

        <div class="acoes">

            <button class="editar">✏️</button>

            <button class="duplicar">📋</button>

            <button class="remover">🗑️</button>

        </div>

    `;

    // Editar
    card.querySelector(".editar").addEventListener("click", () => {

        editandoHabilidade = card;

        document.getElementById("habNome").value =
            card.querySelector(".titulo").textContent;

        document.getElementById("habTag").value =
            card.querySelector(".tag").textContent;

        document.getElementById("habDescricao").value =
            card.querySelector(".descricao").textContent;

        if (
            card.querySelector(".tag").textContent
                .toLowerCase() === "poder paranormal"
        ) {

            document.getElementById("campoElemento").style.display = "block";

            document.getElementById("habElemento").value =
                card.querySelector(".elemento").textContent;

        } else {

            document.getElementById("campoElemento").style.display = "none";

        }

        modalHabilidade.style.display = "flex";

    });

    // Duplicar
    card.querySelector(".duplicar").addEventListener("click", () => {

        criarCardHabilidade(

            card.querySelector(".titulo").textContent + " (Cópia)",

            card.querySelector(".tag").textContent,

            card.querySelector(".elemento")?.textContent || "Conhecimento",

            card.querySelector(".descricao").textContent

        );

    });

    // Remover
    card.querySelector(".remover").addEventListener("click", () => {

        if (confirm("Deseja remover esta habilidade?")) {

            card.remove();

        }

    });

    listaHabilidades.appendChild(card);

}

// Pesquisa
document.getElementById("pesquisaHabilidade").addEventListener("input", function () {

    const pesquisa = this.value.toLowerCase();

    document.querySelectorAll("#listaHabilidades .card").forEach(card => {

        const nome = card.querySelector(".titulo").textContent.toLowerCase();

        card.style.display =
            nome.includes(pesquisa)
                ? "block"
                : "none";

    });

});
```javascript
// =========================================
// PARTE 5 - RITUAIS
// =========================================

let editandoRitual = null;

const modalRitual = document.getElementById("modalRitual");
const listaRituais = document.getElementById("listaRituais");

// Abrir modal
document.getElementById("novoRitual").addEventListener("click", () => {

    editandoRitual = null;

    document.getElementById("ritualNome").value = "";
    document.getElementById("ritualElemento").value = "Conhecimento";
    document.getElementById("ritualCirculo").value = 1;
    document.getElementById("ritualExecucao").value = "";
    document.getElementById("ritualAlcance").value = "";
    document.getElementById("ritualAlvo").value = "";
    document.getElementById("ritualDuracao").value = "";
    document.getElementById("ritualResistencia").value = "";
    document.getElementById("ritualDescricao").value = "";

    modalRitual.style.display = "flex";

});

// Fechar modal
document.getElementById("cancelarRitual").addEventListener("click", () => {

    modalRitual.style.display = "none";

});

// Salvar
document.getElementById("salvarRitual").addEventListener("click", () => {

    const nome = document.getElementById("ritualNome").value.trim();
    const elemento = document.getElementById("ritualElemento").value;
    const circulo = document.getElementById("ritualCirculo").value;
    const execucao = document.getElementById("ritualExecucao").value.trim();
    const alcance = document.getElementById("ritualAlcance").value.trim();
    const alvo = document.getElementById("ritualAlvo").value.trim();
    const duracao = document.getElementById("ritualDuracao").value.trim();
    const resistencia = document.getElementById("ritualResistencia").value.trim();
    const descricao = document.getElementById("ritualDescricao").value.trim();

    if (nome === "") {

        alert("Digite o nome do ritual.");

        return;

    }

    if (editandoRitual) {

        editandoRitual.querySelector(".titulo").textContent = nome;
        editandoRitual.querySelector(".elemento").textContent = elemento;
        editandoRitual.querySelector(".circulo").textContent = circulo;
        editandoRitual.querySelector(".execucao").textContent = execucao;
        editandoRitual.querySelector(".alcance").textContent = alcance;
        editandoRitual.querySelector(".alvo").textContent = alvo;
        editandoRitual.querySelector(".duracao").textContent = duracao;
        editandoRitual.querySelector(".resistencia").textContent = resistencia;
        editandoRitual.querySelector(".descricao").textContent = descricao;

    } else {

        criarCardRitual(
            nome,
            elemento,
            circulo,
            execucao,
            alcance,
            alvo,
            duracao,
            resistencia,
            descricao
        );

    }

    modalRitual.style.display = "none";

});

// Criar Card
function criarCardRitual(
    nome,
    elemento,
    circulo,
    execucao,
    alcance,
    alvo,
    duracao,
    resistencia,
    descricao
) {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `

        <h3 class="titulo">${nome}</h3>

        <p><strong>Elemento:</strong> <span class="elemento">${elemento}</span></p>

        <p><strong>Círculo:</strong> <span class="circulo">${circulo}</span></p>

        <p><strong>Execução:</strong> <span class="execucao">${execucao}</span></p>

        <p><strong>Alcance:</strong> <span class="alcance">${alcance}</span></p>

        <p><strong>Alvo:</strong> <span class="alvo">${alvo}</span></p>

        <p><strong>Duração:</strong> <span class="duracao">${duracao}</span></p>

        <p><strong>Resistência:</strong> <span class="resistencia">${resistencia}</span></p>

        <hr>

        <p class="descricao">${descricao}</p>

        <div class="acoes">

            <button class="editar">✏️</button>

            <button class="duplicar">📋</button>

            <button class="remover">🗑️</button>

        </div>

    `;

    // Editar
    card.querySelector(".editar").addEventListener("click", () => {

        editandoRitual = card;

        document.getElementById("ritualNome").value = card.querySelector(".titulo").textContent;
        document.getElementById("ritualElemento").value = card.querySelector(".elemento").textContent;
        document.getElementById("ritualCirculo").value = card.querySelector(".circulo").textContent;
        document.getElementById("ritualExecucao").value = card.querySelector(".execucao").textContent;
        document.getElementById("ritualAlcance").value = card.querySelector(".alcance").textContent;
        document.getElementById("ritualAlvo").value = card.querySelector(".alvo").textContent;
        document.getElementById("ritualDuracao").value = card.querySelector(".duracao").textContent;
        document.getElementById("ritualResistencia").value = card.querySelector(".resistencia").textContent;
        document.getElementById("ritualDescricao").value = card.querySelector(".descricao").textContent;

        modalRitual.style.display = "flex";

    });

    // Duplicar
    card.querySelector(".duplicar").addEventListener("click", () => {

        criarCardRitual(

            card.querySelector(".titulo").textContent + " (Cópia)",
            card.querySelector(".elemento").textContent,
            card.querySelector(".circulo").textContent,
            card.querySelector(".execucao").textContent,
            card.querySelector(".alcance").textContent,
            card.querySelector(".alvo").textContent,
            card.querySelector(".duracao").textContent,
            card.querySelector(".resistencia").textContent,
            card.querySelector(".descricao").textContent

        );

    });

    // Remover
    card.querySelector(".remover").addEventListener("click", () => {

        if (confirm("Deseja remover este ritual?")) {

            card.remove();

        }

    });

    listaRituais.appendChild(card);

}

// Pesquisa
document.getElementById("pesquisaRitual").addEventListener("input", function () {

    const pesquisa = this.value.toLowerCase();

    document.querySelectorAll("#listaRituais .card").forEach(card => {

        const nome = card.querySelector(".titulo").textContent.toLowerCase();

        card.style.display = nome.includes(pesquisa)
            ? "block"
            : "none";

    });

});
```

```javascript
// =========================================
// PARTE 6 - LOCALSTORAGE + EXPORTAR/IMPORTAR
// =========================================

// ---------- SALVAR ----------

function salvarFicha() {

    const ficha = {

        nome: document.getElementById("nome").value,
        jogador: document.getElementById("jogador").value,
        origem: document.getElementById("origem").value,
        classe: document.getElementById("classe").value,

        nex: document.getElementById("nex").value,

        forca: document.getElementById("for").value,
        agi: document.getElementById("agi").value,
        int: document.getElementById("int").value,
        pre: document.getElementById("pre").value,
        vig: document.getElementById("vig").value,

        vida: document.getElementById("vida").value,
        sanidade: document.getElementById("sanidade").value,
        recurso: document.getElementById("recurso").value,

        defesa: document.getElementById("defesa").value,
        esquiva: document.getElementById("esquiva").value,
        bloqueio: document.getElementById("bloqueio").value,

        resistencias: document.getElementById("resistencias").value,

        pericias: listaPericias.innerHTML,
        inventario: listaItens.innerHTML,
        habilidades: listaHabilidades.innerHTML,
        rituais: listaRituais.innerHTML

    };

    localStorage.setItem(

        "GAL_FICHA",

        JSON.stringify(ficha)

    );

}

// ---------- CARREGAR ----------

function carregarFicha() {

    const dados = localStorage.getItem("GAL_FICHA");

    if (!dados) return;

    const ficha = JSON.parse(dados);

    document.getElementById("nome").value = ficha.nome || "";
    document.getElementById("jogador").value = ficha.jogador || "";
    document.getElementById("origem").value = ficha.origem || "";
    document.getElementById("classe").value = ficha.classe || "";

    document.getElementById("nex").value = ficha.nex || "";

    document.getElementById("for").value = ficha.forca || 1;
    document.getElementById("agi").value = ficha.agi || 1;
    document.getElementById("int").value = ficha.int || 1;
    document.getElementById("pre").value = ficha.pre || 1;
    document.getElementById("vig").value = ficha.vig || 1;

    document.getElementById("vida").value = ficha.vida || "";
    document.getElementById("sanidade").value = ficha.sanidade || "";
    document.getElementById("recurso").value = ficha.recurso || "";

    document.getElementById("defesa").value = ficha.defesa || "";
    document.getElementById("esquiva").value = ficha.esquiva || "";
    document.getElementById("bloqueio").value = ficha.bloqueio || "";

    document.getElementById("resistencias").value =
        ficha.resistencias || "";

    listaPericias.innerHTML = ficha.pericias || "";
    listaItens.innerHTML = ficha.inventario || "";
    listaHabilidades.innerHTML = ficha.habilidades || "";
    listaRituais.innerHTML = ficha.rituais || "";

    atualizarPeso();

}

// ---------- EXPORTAR ----------

function exportarFicha() {

    salvarFicha();

    const dados = localStorage.getItem("GAL_FICHA");

    const blob = new Blob(

        [dados],

        { type: "application/json" }

    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "Ficha_GAL.json";

    link.click();

}

// ---------- IMPORTAR ----------

function importarFicha(event) {

    const arquivo = event.target.files[0];

    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = function (e) {

        localStorage.setItem(

            "GAL_FICHA",

            e.target.result

        );

        carregarFicha();

    };

    leitor.readAsText(arquivo);

}

// ---------- SALVAMENTO AUTOMÁTICO ----------

document.querySelectorAll("input, textarea, select")
.forEach(campo => {

    campo.addEventListener("input", salvarFicha);

});

// ---------- INICIALIZAÇÃO ----------

window.addEventListener("load", () => {

    carregarFicha();

    atualizarPeso();

});
```
