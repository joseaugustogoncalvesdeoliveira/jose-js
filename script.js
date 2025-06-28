const form = document.getElementById("formulario");
const erro = document.getElementById("mensagemErro");
const cpfInput = document.getElementById("cpf");
const senhaInput = document.getElementById("senha");
const confirmaSenhaInput = document.getElementById("confirmaSenha");
const forcaSenhaBar = document.getElementById("forcaSenha");

function mostrarSenha(idCampo) {
  const campo = document.getElementById(idCampo);
  campo.type = campo.type === "password" ? "text" : "password";
}

cpfInput.addEventListener("input", () => {
  let v = cpfInput.value.replace(/\D/g, "");
  if (v.length > 9) {
    v = v.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "$1.$2.$3-$4");
  } else if (v.length > 6) {
    v = v.replace(/^(\d{3})(\d{3})(\d{1,3}).*/, "$1.$2.$3");
  } else if (v.length > 3) {
    v = v.replace(/^(\d{3})(\d{1,3}).*/, "$1.$2");
  }
  cpfInput.value = v;
});

senhaInput.addEventListener("input", () => {
  const senha = senhaInput.value;
  let strength = 0;
  if (senha.length >= 8) strength++;
  if (/[A-Z]/.test(senha)) strength++;
  if (/[a-z]/.test(senha)) strength++;
  if (/\d/.test(senha)) strength++;
  if (/[\W_]/.test(senha)) strength++;

  if (strength <= 2) {
    forcaSenhaBar.className = "forca-fraca";
  } else if (strength <= 4) {
    forcaSenhaBar.className = "forca-media";
  } else {
    forcaSenhaBar.className = "forca-forte";
  }
});

function validarCampos() {
  erro.innerHTML = "";

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const senha = senhaInput;
  const confirmaSenha = confirmaSenhaInput;
  const cpf = cpfInput;

  let mensagens = [];

  if (nome.value.trim().length < 3) {
    mensagens.push("Nome deve ter pelo menos 3 letras.");
    nome.classList.add("invalid");
  } else {
    nome.classList.remove("invalid");
  }

  if (!email.value.includes("@") || !email.value.includes(".")) {
    mensagens.push("E-mail inválido.");
    email.classList.add("invalid");
  } else {
    email.classList.remove("invalid");
  }

  const cpfValido = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf.value);
  if (!cpfValido) {
    mensagens.push("CPF inválido. Use o formato 000.000.000-00.");
    cpf.classList.add("invalid");
  } else {
    cpf.classList.remove("invalid");
  }

  const senhaValida =
    senha.value.length >= 8 && /[a-zA-Z]/.test(senha.value) && /\d/.test(senha.value);
  if (!senhaValida) {
    mensagens.push("A senha deve ter ao menos 8 caracteres, letras e números.");
    senha.classList.add("invalid");
  } else {
    senha.classList.remove("invalid");
  }

  if (senha.value !== confirmaSenha.value || confirmaSenha.value === "") {
    mensagens.push("As senhas não coincidem.");
    confirmaSenha.classList.add("invalid");
  } else {
    confirmaSenha.classList.remove("invalid");
  }

  erro.innerHTML = mensagens.join("<br>");
  return mensagens.length === 0;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validarCampos()) {
    const dados = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      cpf: document.getElementById("cpf").value,
      senha: document.getElementById("senha").value,
    };

    alert(`Cadastro realizado com sucesso!\n\nNome: ${dados.nome}\nEmail: ${dados.email}\nCPF: ${dados.cpf}`);

    console.log("Dados enviados:", dados);

    form.reset();
    forcaSenhaBar.className = "";
  }
});
