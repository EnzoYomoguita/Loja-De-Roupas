// Cadastro escolar da ADStore. Use somente contas e senhas fictícias.
// Esta simulação salva a senha no navegador e não oferece autenticação real.
// Carregue produtos.js e armazenamento.js antes deste arquivo, com defer.
const CHAVE_USUARIOS = "adstore:usuarios";
const formularioCadastro = document.getElementById("form_cadastro");

if (formularioCadastro) {
  //esse addeventlistener serve para quando encontrar o formulario executar as validações
  formularioCadastro.addEventListener("submit", function (evento) {
    // Evita que o formulário envie os dados e recarregue a página.
    evento.preventDefault();

    //report Validity, serve para fazer as verificações do html
    if (!formularioCadastro.reportValidity()) return;

    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoSenha = document.getElementById("senha");
    const campoConfirmacao = document.getElementById("confirmar-senha");

    
    const nome = campoNome.value.trim();
    // Assim, Pessoa@Email.com e pessoa@email.com são a mesma conta.
    const email = campoEmail.value.trim().toLowerCase();
    // Não retiramos espaços da senha: ela deve ser comparada exatamente.
    const senha = campoSenha.value;
    const confirmacao = campoConfirmacao.value;

    if (!nome) {
      alert("Preencha seu nome.");
      campoNome.focus();
      return;
    }

    if (senha.length < 8) {
      alert("A senha precisa ter pelo menos 8 caracteres.");
      campoSenha.focus();
      return;
    }

    if (senha !== confirmacao) {
      alert("As senhas não coincidem. Confira a confirmação.");
      campoConfirmacao.focus();
      return;
    }

    try {
      //usuarios recebe o valor de todos os cadastros salvos, assim não haverá uma duplicação
      const usuarios = lerDados(CHAVE_USUARIOS, []);

      // Preserva os dados se o conteúdo salvo estiver inválido.
      //verifica o array.isArray se realmente é uma array e verificação se todos os campos estão preenchidos
      if (!Array.isArray(usuarios) || usuarios.some(usuario =>
        !usuario || typeof usuario.id !== "string" ||
        typeof usuario.nome !== "string" || typeof usuario.email !== "string" ||
        typeof usuario.senha !== "string"
      )) {
        throw new Error("A lista de usuários salva está inválida.");
      }
        //verifica se ja existe um cadastro com o email digitado
      const emailJaCadastrado = usuarios.some(usuario =>
        usuario.email.trim().toLowerCase() === email
      );
      //caso de true ele retorna esse alerta
      if (emailJaCadastrado) {
        alert("Este e-mail já está cadastrado. Faça login ou use outro e-mail.");
        campoEmail.focus();
        return;
      }

      const novoUsuario = {
        id: crypto.randomUUID(),
        nome: nome,
        email: email,
        senha: senha
      };
      //salva o novo cadastro
      usuarios.push(novoUsuario);
      salvarDados(CHAVE_USUARIOS, usuarios);
    } catch (erro) {
      console.error("Não foi possível cadastrar o usuário:", erro);
      alert("Não foi possível salvar seu cadastro. Confira o console e se o navegador permite armazenar dados.");
      return;
    }

    alert("Cadastro realizado! Agora você pode acessar a página de login.");
    window.location.href = "../login/login.html";
  });
}
