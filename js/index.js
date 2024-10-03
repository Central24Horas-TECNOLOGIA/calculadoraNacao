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
