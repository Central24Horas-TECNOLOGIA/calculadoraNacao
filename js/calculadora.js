
// Função para mostrar a seção Pro Rata
function mostrarProRata() {
    document.getElementById('proRataSection').classList.remove('visually-hidden');
    document.getElementById('multaSection').classList.add('visually-hidden');
    document.getElementById('btnProRata').classList.add('visually-hidden');
    document.getElementById('btnMulta').classList.remove('visually-hidden');
}

// Função para mostrar a seção Multa
function mostrarMulta() {
    document.getElementById('multaSection').classList.remove('visually-hidden');
    document.getElementById('proRataSection').classList.add('visually-hidden');
    document.getElementById('btnMulta').classList.add('visually-hidden');
    document.getElementById('btnProRata').classList.remove('visually-hidden');
}

// Definindo os dados dos planos
const planos = [
    { nome: "Selecione um plano", valorMensal: 0, valorAnual: 0 },
    { nome: "Prata", valorMensal: 61.00, valorAnual: 732.00 },
    { nome: "Ouro", valorMensal: 128.40, valorAnual: 1540.80 },
    { nome: "Ouro + 1 convidado", valorMensal: 166.10, valorAnual: 1489.20 },
    { nome: "Platina", valorMensal: 211.80, valorAnual: 2451.60 },
    { nome: "Platina + 1 convidado", valorMensal: 249.50, valorAnual: 2994.00 },
    { nome: "Platina + 2 convidados", valorMensal: 287.20, valorAnual: 3446.40 },
    { nome: "Diamante", valorMensal: 325.40, valorAnual: 3904.80 },
    { nome: "Diamante + 1 convidado", valorMensal: 363.10, valorAnual: 4357.20 },
    { nome: "Diamante + 2 convidados", valorMensal: 400.80, valorAnual: 4809.60 },
    { nome: "Diamante + 3 convidados", valorMensal: 419.65, valorAnual: 5035.80 }
];

function preencherSelects() {
    const selects = [document.getElementById("planosSelect"), document.getElementById("planosSelect2")];
    selects.forEach(select => {
        planos.forEach(plano => {
            const option = document.createElement("option");
            option.text = plano.nome;
            select.appendChild(option);
        });
    });
}

function atualizarValorMensal(selectId, outputId) {
    const select = document.getElementById(selectId);
    const output = document.getElementById(outputId);
    const planoSelecionado = planos.find(plano => plano.nome === select.value);
    output.value = planoSelecionado ? planoSelecionado.valorMensal.toFixed(2) : "";
}

function calcularValorDivididoPor30(selectId, outputId) {
    const select = document.getElementById(selectId);
    const output = document.getElementById(outputId);
    const planoSelecionado = planos.find(plano => plano.nome === select.value);
    const valorDivididoPor30 = planoSelecionado ? (planoSelecionado.valorMensal / 30).toFixed(2) : "";
    output.value = valorDivididoPor30 ? valorDivididoPor30 : "";
}

function calcularValorProporcional(diasUtilizados, valorDivididoPor30) {
    return (valorDivididoPor30 * diasUtilizados).toFixed(2);
}

function calcularValorProRata(valorProporcional, valorMensalUpgrade) {
    const valorProRata = (valorProporcional - valorMensalUpgrade).toFixed(2);
    return valorProRata <= 0 ? "Sem desconto" : `R$ ${Math.abs(valorProRata)}`;
}

function atualizarCalculos() {
    const diasUtilizadosInput = document.getElementById("diasUtilizadosInput");
    
    const valorMensalOutput1 = document.getElementById("valorMensalOutput1");
    const valorMensalOutput2 = document.getElementById("valorMensalOutput2");
    const valorDivididoPor30Output = document.getElementById("valorDivididoPor30Output");
    const valorProporcionalOutput = document.getElementById("valorProporcionalOutput");
    const valorProRataOutput = document.getElementById("valorProRataOutput");

    atualizarValorMensal("planosSelect", "valorMensalOutput1");
    atualizarValorMensal("planosSelect2", "valorMensalOutput2");
    calcularValorDivididoPor30("planosSelect2", "valorDivididoPor30Output");

    const valorDivididoPor30 = parseFloat(valorDivididoPor30Output.value.replace("R$ ", ""));
    const diasUtilizados = diasUtilizadosInput.valueAsNumber;

    if (diasUtilizados < 1 || diasUtilizados > 31) {
        alert("Por favor, insira um valor entre 1 e 31 para dias até o próximo vencimento.");
        diasUtilizadosInput.value = ""; 
        return; 
    }

    if (diasUtilizados >= 1 && diasUtilizados <= 30) {
        const valorProporcional = calcularValorProporcional(diasUtilizados, valorDivididoPor30);
        valorProporcionalOutput.value = valorProporcional;
        const valorMensalUpgrade = parseFloat(valorMensalOutput1.value.replace("R$ ", ""));
        valorProRataOutput.value = calcularValorProRata(valorProporcional, valorMensalUpgrade);
    } else {
        valorProporcionalOutput.value = "";
        valorProRataOutput.value = "";
    }
}


window.onload = preencherSelects;

document.querySelector(".btn-danger").addEventListener("click", atualizarCalculos);


function calculaValores() {
    let pacoteIntegral = document.getElementById("valorTotalPlano").value;
    let mesesUtilizados = document.getElementById("mesesUtilizados").value;

    // Limpar mensagem de erro anterior
    const errorMessageElement = document.getElementById("errorMessage");
    errorMessageElement.textContent = "";

    // Verifique se os valores são válidos
    if (!pacoteIntegral || !mesesUtilizados) {
        errorMessageElement.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    pacoteIntegral = parseFloat(pacoteIntegral.replace(",", "."));

    if (isNaN(pacoteIntegral) || isNaN(mesesUtilizados)) {
        errorMessageElement.textContent = 'Valor incorreto, verifique os campos acima.';
        return;
    }

    const pacoteMensal = pacoteIntegral / 12;
    const valorUtilizadoPlano = pacoteMensal * mesesUtilizados;
    const estorno = pacoteIntegral - valorUtilizadoPlano;
    const multa = estorno * 0.3;
    const calculaEstorno = estorno - multa;

    

    // Atualiza a interface com os resultados
    document.getElementById("pacoteMensal").value = "R$ " + pacoteMensal.toFixed(2);
    document.getElementById("valorUtilizadoPlano").value = "R$ " + valorUtilizadoPlano.toFixed(2);
    document.getElementById("valorEstorno").value = "R$ " + calculaEstorno.toFixed(2);
    document.getElementById("valorMulta").value = "R$ " + multa.toFixed(2);
}

