function validateCPF() {
    let cpf = document.getElementById('cpfInput').value;
    cpf = cpf.replace(/\D/g, '');

    const validationResult = isValidCPF(cpf);
    const resultElement = document.getElementById('result');

    if (validationResult.isValid) {
        resultElement.innerText = 'O CPF é válido.\nEstado de emissão: ' + getEstadoEmissao(cpf);
        resultElement.style.color = 'black';
    } else {
        resultElement.innerText = `O CPF é inválido. Motivo: ${validationResult.reason}`;
        resultElement.style.color = 'white';
    }
}

function isValidCPF(cpf) {
    if (cpf.length !== 11) {
        return { isValid: false, reason: 'O CPF deve ter 11 dígitos.' };
    }

    if (/(\d)\1{10}/.test(cpf)) {
        return { isValid: false, reason: 'O CPF não pode conter todos os dígitos iguais.' };
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let checkDigit1 = 11 - (sum % 11);
    if (checkDigit1 >= 10) {
        checkDigit1 = 0;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let checkDigit2 = 11 - (sum % 11);
    if (checkDigit2 >= 10) {
        checkDigit2 = 0;
    }

    if (checkDigit1 !== parseInt(cpf.charAt(9)) || checkDigit2 !== parseInt(cpf.charAt(10))) {
        return { isValid: false, reason: 'Os dígitos de verificação não correspondem.' };
    }

    return { isValid: true };
}

function getEstadoEmissao(cpf) {
    const stateDigit = cpf.charAt(8);
    switch (stateDigit) {
        case '0': return 'Rio Grande do Sul';
        case '1': return 'Distrito Federal, Goiás, Mato Grosso, Mato Grosso do Sul ou Tocantins';
        case '2': return 'Pará, Amazonas, Acre, Amapá, Rondônia ou Roraima';
        case '3': return 'Ceará, Maranhão ou Piauí';
        case '4': return 'Pernambuco, Rio Grande do Norte, Paraíba ou Alagoas';
        case '5': return 'Bahia ou Sergipe';
        case '6': return 'Minas Gerais';
        case '7': return 'Rio de Janeiro ou Espírito Santo';
        case '8': return 'São Paulo';
        case '9': return 'Paraná ou Santa Catarina';
        default: return 'Estado desconhecido';
    }
}
