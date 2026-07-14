// =========================
// ABAS
// =========================

const botoes = document.querySelectorAll(".tab-button");
const abas = document.querySelectorAll(".tab");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        botoes.forEach(b => b.classList.remove("active"));
        abas.forEach(a => a.classList.remove("active"));

        botao.classList.add("active");

        document
            .getElementById(botao.dataset.tab)
            .classList.add("active");

    });

});

// =========================
// ATRIBUTOS
// =========================

let pontosRestantes = 4;

const atributos = document.querySelectorAll(".atributo");

atributos.forEach(attr => {

    const menos = attr.children[1];
    const input = attr.children[2];
    const mais = attr.children[3];

    mais.onclick = () => {

        if (pontosRestantes > 0) {

            input.value++;

            pontosRestantes--;

            atualizarPeso();

            salvar();

        }

    }

    menos.onclick = () => {

        if (Number(input.value) > 1) {

            input.value--;

            pontosRestantes++;

            atualizarPeso();

            salvar();

        }

    }

});

// =========================
// PESO
// =========================

function atualizarPeso(){

    const forca = Number(document.querySelectorAll(".atributo input")[0].value);

    document.getElementById("pesoAtual").innerText =
    "0 / " + (forca*5);

}

// =========================
// PERÍCIAS
// =========================

document.getElementById("novaPericia").onclick = ()=>{

    const nome = prompt("Nome da Perícia");

    if(!nome) return;

    const atributo = prompt("Atributo");

    if(!atributo) return;

    const bonus = prompt("Bônus");

    if(!bonus) return;

    const card = document.createElement("div");

    card.className="card";

    card.innerHTML=`

        <h3>${nome}</h3>

        <p><strong>Atributo:</strong> ${atributo}</p>

        <p><strong>Bônus:</strong> ${bonus}</p>

    `;

    document.getElementById("listaPericias").appendChild(card);

    salvar();

}

// =========================
// INVENTÁRIO
// =========================

document.getElementById("novoItem").onclick=()=>{

    const nome=prompt("Nome do Item");

    if(!nome) return;

    const peso=prompt("Peso");

    if(!peso) return;

    const habilidade=prompt("Habilidade");

    const card=document.createElement("div");

    card.className="card";

    card.innerHTML=`

        <h3>${nome}</h3>

        <p><strong>Peso:</strong> ${peso}</p>

        <p>${habilidade}</p>

    `;

    document.getElementById("listaItens").appendChild(card);

    salvar();

}

// =========================
// RITUAIS
// =========================

document.getElementById("novoRitual").onclick=()=>{

    const nome=prompt("Nome");

    if(!nome) return;

    const elemento=prompt("Elemento");

    const circulo=prompt("Círculo");

    const execucao=prompt("Execução");

    const alcance=prompt("Alcance");

    const alvo=prompt("Alvo");

    const duracao=prompt("Duração");

    const resistencia=prompt("Resistência");

    const descricao=prompt("Descrição");

    const card=document.createElement("div");

    card.className="card";

    card.innerHTML=`

        <h3>${nome}</h3>

        <p><strong>Elemento:</strong> ${elemento}</p>

        <p><strong>Círculo:</strong> ${circulo}</p>

        <p><strong>Execução:</strong> ${execucao}</p>

        <p><strong>Alcance:</strong> ${alcance}</p>

        <p><strong>Alvo:</strong> ${alvo}</p>

        <p><strong>Duração:</strong> ${duracao}</p>

        <p><strong>Resistência:</strong> ${resistencia}</p>

        <hr>

        <p>${descricao}</p>

    `;

    document.getElementById("listaRituais").appendChild(card);

    salvar();

}

// =========================
// SALVAR
// =========================

function salvar(){

    const dados={

        html:document.body.innerHTML,

        pontos:pontosRestantes

    }

    localStorage.setItem("FichaOrdem",JSON.stringify(dados));

}

// =========================
// CARREGAR
// =========================

window.onload=()=>{

    const dados=localStorage.getItem("FichaOrdem");

    if(dados){

        const ficha=JSON.parse(dados);

        document.body.innerHTML=ficha.html;

        pontosRestantes=ficha.pontos;

        location.reload();

    }

    atualizarPeso();

}