// Login da simulação escolar ADStore. Use somente contas fictícias.
// Carregue produtos.js e armazenamento.js antes deste arquivo, com defer.
const CHAVE_SESSAO = "adstore:usuarioLogado";
const formularioLogin = document.getElementById("form-login");

if (formularioLogin) {
  formularioLogin.addEventListener("submit", function (evento) {
    // O JavaScript cuida do login, sem enviar o formulário a um servidor.
    evento.preventDefault();
    if (!formularioLogin.reportValidity()) return;

    const campoEmail = document.getElementById("email");
    const campoSenha = document.getElementById("senha");

    const email = campoEmail.value.trim().toLowerCase();
    const senha = campoSenha.value;

    try {
      // As contas continuam no localStorage; a sessão fica no sessionStorage.
      const usuarios = lerDados("adstore:usuarios", []);

      if (!Array.isArray(usuarios) || usuarios.some(usuario =>
        !usuario || typeof usuario.id !== "string" ||
        typeof usuario.nome !== "string" || typeof usuario.email !== "string" ||
        typeof usuario.senha !== "string"
      )) {
        throw new Error("A lista de usuários salva está inválida.");
      }
      //vai verificar se o email e senha bate, caso bata ele retorna o objeto com id, nome, senha e email
      const usuario = usuarios.find(conta =>
        conta.email.trim().toLowerCase() === email && conta.senha === senha
      );
      
      if (!usuario) {
        alert("E-mail ou senha incorretos. Confira os dados ou crie uma conta.");
        campoSenha.value = "";
        campoSenha.focus();
        return;
      }

      // Guardamos somente os dados necessários para identificar a pessoa.
      // A senha não é copiada para a sessão.
      const usuarioLogado = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      };
      //serve para manter o usuario logadp, assim ele se mantem até que feche o site
      sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuarioLogado));
    } catch (erro) {
      console.error("Não foi possível realizar o login:", erro);
      alert("Não foi possível entrar. Confira o console e se o navegador permite armazenar dados.");
      return;
    }

    alert("Login realizado com sucesso!");
    window.location.href = "../index.html";
  });
}
