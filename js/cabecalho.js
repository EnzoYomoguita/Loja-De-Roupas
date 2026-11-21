// Use este arquivo em todas as páginas, com defer.
// Ele consulta somente a sessão; não precisa carregar login.js.
function atualizarCabecalho() {
  const menuUsuario = document.querySelector(".menu-usuario");
  if (!menuUsuario) return;

  // Evita duplicar os elementos se a função for chamada novamente.
  if (menuUsuario.querySelector('[data-conta-logada]')) return;
  //procura o link de login
  const linkLogin = Array.from(menuUsuario.querySelectorAll("a")).find(link => {
    const caminho = link.getAttribute("href") || "";
    return caminho === "login.html" || caminho === "login/login.html" || caminho.endsWith("/login/login.html");
  });
  if (!linkLogin) return;
    //transforma em objeto, pega o nome dentro do objeto e verifica se os valores dentro do objeto são validos
  let usuario;
  try {
    const texto = sessionStorage.getItem("adstore:usuarioLogado");
    if (texto === null) return;
    usuario = JSON.parse(texto);

    if (!usuario || typeof usuario.id !== "string" || !usuario.id.trim() ||
        typeof usuario.nome !== "string" || !usuario.nome.trim() ||
        typeof usuario.email !== "string" || !usuario.email.trim()) {
      throw new Error("Os dados da sessão estão inválidos.");
    }
  } catch (erro) {
    console.error("Não foi possível consultar a sessão:", erro);
    return;
  }

  //cria a tag span no html
  const saudacao = document.createElement("span");
  saudacao.setAttribute("data-conta-logada", "");
  // textContent exibe o nome como texto, sem interpretar HTML.
  saudacao.textContent = `Olá, ${usuario.nome.trim().split(/\s+/)[0]}!`;

  const linkSair = linkLogin.cloneNode(false);
  linkSair.removeAttribute("aria-current");
  linkSair.removeAttribute("id");
  linkSair.textContent = "Sair";
  linkSair.addEventListener("click", function (evento) {
    evento.preventDefault();

    try {
      // Remove somente a sessão da ADStore, sem apagar contas ou produtos.
      sessionStorage.removeItem("adstore:usuarioLogado");
    } catch (erro) {
      console.error("Não foi possível encerrar a sessão:", erro);
      alert("Não foi possível sair da conta. Tente novamente.");
      return;
    }

    // Recarrega a página atual; o cabeçalho volta a mostrar Login.
    window.location.reload();
  });

  linkLogin.replaceWith(saudacao, linkSair);
}

atualizarCabecalho();

