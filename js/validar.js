// Selecionando os elementos do formulário
var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var result = document.querySelector("#inputResult");
var passStrengthMeter = document.querySelector("#passStrengthMeter");
var submitButton = document.querySelector("button[type='submit']");

// Expressões regulares para validação
const regexNome = /^[A-Za-z\s]{6,}$/;
const regexAno = /^(19\d\d|20[01]\d|2022)$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|br|net|org)$/;

// Funções globais para IFS de validação de campos.
function verificaCampoVazio(campo) {
    return campo.value.trim() === "";
}

function verificarPadraoRegex(campo, regex) {
    return regex.test(campo.value.trim());
}

// Função para validar o nome
function validarNome() {
    if (verificaCampoVazio(nome) || !verificarPadraoRegex(nome, regexNome)) {
        nomeHelp.textContent = "Nome inválido. Deve conter apenas letras e ter mais de 6 caracteres.";
        nomeHelp.style.color = "red";
        return false;
    } else {
        nomeHelp.textContent = "";
        return true;
    }
}

// Função para validar o ano de nascimento
function validarAno() {
    if (verificaCampoVazio(ano) || !verificarPadraoRegex(ano, regexAno)) {
        anoHelp.textContent = "Ano de nascimento inválido. Deve estar entre 1900 e 2022.";
        anoHelp.style.color = "red";
        return false;
    } else {
        anoHelp.textContent = "";
        return true;
    }
}

// Função para validar o email
function validarEmail() {
    if (verificaCampoVazio(email) || !verificarPadraoRegex(email, regexEmail)) {
        emailHelp.textContent = "Email inválido. Deve seguir o formato exemplo@dominio.com";
        emailHelp.style.color = "red";
        return false;
    } else {
        emailHelp.textContent = "";
        return true;
    }
}

// Função para validar a senha e retornar o nível de segurança
function validarSenha() {
    const senhaValue = senha.value;
    const regexCaractereEspecial = /[@#%&!+]/;
    const regexNumero = /[0-9]/;
    const regexLetraMaiuscula = /[A-Z]/;

    // Inicializa a força da senha como 0, assim, cada requisito que seja atingido irá incrementar essa variável
    let strength = 0;

    // Verifica se a senha tem entre 6 e 20 caracteres
    if (senhaValue.length < 6 || senhaValue.length > 20) {
        senhaHelp.textContent = "A senha deve ter entre 6 e 20 caracteres.";
        senhaHelp.style.color = "red";
        result.textContent = "";
        passStrengthMeter.value = 0;
        return false;
    }

    // Verifica se a senha contém pelo menos um caractere especial
    if (regexCaractereEspecial.test(senhaValue)) {
        strength++;
    }

    // Verifica se a senha contém pelo menos um número
    if (regexNumero.test(senhaValue)) {
        strength++;
    }

    // Verifica se a senha tem mais de 8 caracteres
    if (senhaValue.length > 8) {
        strength++;
    }

    // Verifica se a senha contém pelo menos uma letra maiúscula
    if (regexLetraMaiuscula.test(senhaValue)) {
        strength++;
    }

    // Verifica se a senha contém o nome ou ano de nascimento do usuário
    if (senhaValue.includes(nome.value) || senhaValue.includes(ano.value)) {
        senhaHelp.textContent = "A senha não pode conter o nome ou ano de nascimento.";
        senhaHelp.style.color = "red";
        result.textContent = "";
        passStrengthMeter.value = 0;
        return false;
    }

    // Verifica a força da senha
    if (strength <= 1) {
        senhaHelp.textContent = "Senha fraca.";
        senhaHelp.style.color = "red";
        result.textContent = "";
        passStrengthMeter.value = 10;
        return false;
    } else if (strength <= 2) {
        senhaHelp.textContent = "Senha moderada.";
        senhaHelp.style.color = "orange";
        result.textContent = "";
        passStrengthMeter.value = 20;
        return false;
    } else {
        senhaHelp.textContent = "Senha forte.";
        senhaHelp.style.color = "green";
        result.textContent = "";
        passStrengthMeter.value = 30;
        return true;
    }
}

// Função para verificar se todos os campos estão preenchidos corretamente e habilitar/desabilitar o botão de envio
function verificarCampos() {
    if (validarNome() && validarAno() && validarEmail() && validarSenha()) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// Adicionando eventos de input aos campos do formulário
nome.addEventListener('input', validarNome);
ano.addEventListener('input', verificarCampos);

ano.addEventListener('input', validarAno);
ano.addEventListener('input', verificarCampos);

email.addEventListener('input', validarEmail);
email.addEventListener('input', verificarCampos);

senha.addEventListener('input', validarSenha);
senha.addEventListener('input', verificarCampos);


// Adicionando evento de submit ao formulário
document.querySelector("#singleForm").addEventListener('submit', function (e) {
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos corretamente, se sim, exibe um alerta de sucesso.
    if (validarNome() && validarAno() && validarEmail() && validarSenha()) {
        const nomeUsuario = nome.value;
        alert(`Usuário ${nomeUsuario} cadastrado com sucesso!`);
    } else {
        alert(`Ops! Alguma coisa está errada no formulário`);
    }
});