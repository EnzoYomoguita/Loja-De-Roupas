// Use nas três páginas de categorias, depois de carrinho.js, com defer.
// Aproveita os cartões existentes, sem precisar mudar o HTML de cada produto.
try {
  const catalogo = obterProdutos();
  const botoes = document.querySelectorAll(".lista-produtos button");

  botoes.forEach(botao => {
    const cartao = botao.closest(".lista-produtos > div");
    const imagem = cartao ? cartao.querySelector("img") : null;
    const origem = imagem ? imagem.getAttribute("src") : null;

    // Os arquivos de imagem atuais são diferentes para cada produto.
    // Comparamos o nome do arquivo para encontrar seu identificador.
    const arquivo = origem ? decodeURIComponent(origem.split("/").pop()) : "";
    const produto = catalogo.find(item => item.imagem.split("/").pop() === arquivo);

    if (!produto) {
      botao.disabled = true;
      botao.title = "Produto não encontrado no catálogo.";
      return;
    }

    botao.type = "button";
    botao.dataset.produtoId = produto.id;

    botao.addEventListener("click", function () {
      try {
        const adicionado = adicionarAoCarrinho(botao.dataset.produtoId);

        if (!adicionado) {
          alert("Entre na sua conta para adicionar produtos ao carrinho.");
          window.location.href = "../login/login.html";
          return;
        }

        alert(`${produto.nome} adicionado ao carrinho!`);
      } catch (erro) {
        console.error("Não foi possível adicionar o produto:", erro);
        alert("Não foi possível salvar o item no carrinho. Confira o console para identificar o problema.");
      }
    });
  });
} catch (erro) {
  console.error("Não foi possível preparar os botões do catálogo:", erro);
  document.querySelectorAll(".lista-produtos button").forEach(botao => {
    botao.disabled = true;
    botao.title = "Não foi possível carregar o catálogo.";
  });
  alert("Não foi possível carregar o catálogo para adicionar produtos ao carrinho.");
}
