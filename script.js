// ===============================
// SISTEMA DE ABAS
// ===============================

const botoes = document.querySelectorAll(".tab-button");
const abas = document.querySelectorAll(".tab");


botoes.forEach(botao => {

    botao.onclick = () => {

        botoes.forEach(b => b.classList.remove("active"));
        abas.forEach(a => a.classList.remove("active"));

        botao.classList.add("active");

        document
        .getElementById(botao.dataset.tab)
        .classList.add("active");

    };

});


// ===============================
// ATRIBUTOS
// ===============================

document.querySelectorAll(".atributo").forEach(attr => {

    const menos = attr.querySelector(".menos");
    const mais = attr.querySelector(".mais");
    const valor = attr.querySelector("input");


    mais.onclick = () => {

        valor.value++;

    };


    menos.onclick = () => {

        if(valor.value > 0)
            valor.value--;

    };

});


// ===============================
// SISTEMA DE MODAIS
// ===============================

function abrir(id){

    document
    .getElementById(id)
    .classList.add("active");

}


function fechar(id){

    document
    .getElementById(id)
    .classList.remove("active");

}


// ===============================
// PERÍCIAS
// ===============================


const novaPericia =
document.getElementById("novaPericia");


novaPericia.onclick = () => {

    abrir("modalPericia");

};


document.getElementById("cancelarPericia").onclick = () => {

    fechar("modalPericia");

};


document.getElementById("salvarPericia").onclick = () => {


    let nome =
    document.getElementById("periciaNome").value;


    let atributo =
    document.getElementById("periciaAtributo").value;


    let bonus =
    document.getElementById("periciaBonus").value;


    document.getElementById("listaPericias")
    .innerHTML += `

    <div>
    <b>${nome}</b><br>
    Atributo: ${atributo}<br>
    Bônus: ${bonus}
    </div>

    `;


    fechar("modalPericia");

};


// ===============================
// INVENTÁRIO
// ===============================


let peso = 0;


document.getElementById("novoItem").onclick = () => {

    abrir("modalItem");

};


document.getElementById("cancelarItem").onclick = () => {

    fechar("modalItem");

};


document.getElementById("salvarItem").onclick = () => {


    let nome =
    document.getElementById("itemNome").value;


    let pesoItem =
    Number(document.getElementById("itemPeso").value);


    let descricao =
    document.getElementById("itemDescricao").value;



    peso += pesoItem;


    document.getElementById("pesoAtual")
    .innerText = peso + " / 5";


    document.getElementById("listaItens")
    .innerHTML += `

    <div>

    <b>${nome}</b><br>

    Peso: ${pesoItem}<br>

    ${descricao}

    </div>

    `;


    fechar("modalItem");

};



// ===============================
// HABILIDADES
// ===============================


const tag =
document.getElementById("habTag");


tag.oninput = () => {


    let valor =
    tag.value.toLowerCase();


    if(valor === "poder paranormal"){

        document.getElementById("campoElemento")
        .style.display="block";

    }

    else{

        document.getElementById("campoElemento")
        .style.display="none";

    }


};



document.getElementById("novaHabilidade").onclick = () => {

    abrir("modalHabilidade");

};



document.getElementById("cancelarHabilidade").onclick = () => {

    fechar("modalHabilidade");

};



document.getElementById("salvarHabilidade").onclick = () => {


let nome =
document.getElementById("habNome").value;


let tag =
document.getElementById("habTag").value;


let descricao =
document.getElementById("habDescricao").value;


let elemento =
document.getElementById("habElemento").value;



document.getElementById("listaHabilidades")
.innerHTML += `

<div>

<b>${nome}</b><br>

Tag: ${tag}<br>

${elemento ? "Elemento: "+elemento+"<br>" : ""}

${descricao}

</div>

`;


fechar("modalHabilidade");


};


// ===============================
// RITUAIS
// ===============================


document.getElementById("novoRitual").onclick = () => {

abrir("modalRitual");

};



document.getElementById("cancelarRitual").onclick = () => {

fechar("modalRitual");

};



document.getElementById("salvarRitual").onclick = () => {


let nome =
document.getElementById("ritualNome").value;


let elemento =
document.getElementById("ritualElemento").value;


let descricao =
document.getElementById("ritualDescricao").value;



document.getElementById("listaRituais")
.innerHTML += `


<div>

<b>${nome}</b><br>

Elemento: ${elemento}<br>

${descricao}

</div>


`;


fechar("modalRitual");


};