// Renderiza apenas a página carrinho.html. As funções compartilhadas
// continuam no carrinho.js utilizado pelos botões das categorias.
const listaCarrinho = document.getElementById("itens-carrinho");
const mensagemCarrinho = document.getElementById("mensagem-carrinho");
const resumoCarrinho = document.getElementById("resumo-carrinho");
const entrarCarrinho = document.getElementById("entrar-carrinho");
const moedaCarrinho = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function formatarPrecoCarrinho(centavos) {
  return moedaCarrinho.format(centavos / 100);
}

function alterarItemCarrinho(produtoId, variacao, remover = false) {
  try {
    // Consulta novamente a conta e os itens no momento do clique.
    const usuario = obterUsuarioDoCarrinho();
    if (!usuario) {
      renderizarCarrinho();
      return;
    }
    let itens = obterCarrinho(usuario);
    const item = itens.find(atual => atual.produtoId === produtoId);
    if (!item) { renderizarCarrinho(); return; }

    if (remover) {
      itens = itens.filter(atual => atual.produtoId !== produtoId);
    } else {
      const quantidade = item.quantidade + variacao;
      if (!Number.isSafeInteger(quantidade) || quantidade < 1) return;
      item.quantidade = quantidade;
    }
    salvarDados(obterChaveCarrinho(usuario), itens);
    renderizarCarrinho();

    // Mantém o foco no controle após reconstruir os cartões.
    const cartao = Array.from(listaCarrinho.children).find(elemento => elemento.dataset.produtoId === produtoId);
    const destino = cartao ? cartao.querySelector(variacao > 0 ? ".aumentar" : ".diminuir") : document.querySelector(".voltar-loja");
    if (destino && !destino.disabled) destino.focus();
    else if (cartao) cartao.querySelector(".aumentar").focus();
  } catch (erro) {
    console.error("Não foi possível alterar o carrinho:", erro);
    alert("Não foi possível salvar a alteração no carrinho. Tente novamente.");
  }
}

function renderizarCarrinho() {
  listaCarrinho.replaceChildren();
  resumoCarrinho.hidden = true;
  entrarCarrinho.hidden = true;
  mensagemCarrinho.hidden = false;

  try {
    const usuario = obterUsuarioDoCarrinho();
    if (!usuario) {
      mensagemCarrinho.textContent = "Entre na sua conta para ver seu carrinho.";
      entrarCarrinho.hidden = false;
      return;
    }
    const itens = obterCarrinho(usuario);
    if (itens.length === 0) {
      mensagemCarrinho.textContent = "Seu carrinho está vazio. Escolha um produto para começar!";
      return;
    }

    const catalogo = obterProdutos();
    let total = 0;
    let indisponiveis = false;
    for (const item of itens) {
      const produto = catalogo.find(atual => atual.id === item.produtoId);
      const cartao = document.getElementById("modelo-item").content.firstElementChild.cloneNode(true);
      cartao.dataset.produtoId = item.produtoId;
      const imagem = cartao.querySelector(".imagem-produto");
      cartao.querySelector(".quantidade").textContent = item.quantidade;
      cartao.querySelector(".diminuir").disabled = item.quantidade === 1 || !produto;
      cartao.querySelector(".aumentar").disabled = !produto || item.quantidade === Number.MAX_SAFE_INTEGER;

      if (produto) {
        const subtotal = produto.precoCentavos * item.quantidade;
        if (!Number.isSafeInteger(subtotal) || !Number.isSafeInteger(total + subtotal)) {
          throw new Error("O total ultrapassa o limite de cálculo.");
        }
        total += subtotal;
        imagem.src = produto.imagem;
        imagem.alt = produto.nome;
        cartao.querySelector(".nome-produto").textContent = produto.nome;
        cartao.querySelector(".preco-produto").textContent = `Preço unitário: ${formatarPrecoCarrinho(produto.precoCentavos)}`;
        cartao.querySelector(".subtotal-produto").textContent = `Subtotal: ${formatarPrecoCarrinho(subtotal)}`;
      } else {
        // Um catálogo editado pode deixar itens antigos sem correspondência.
        // Eles continuam removíveis, sem inventar um preço para o total.
        indisponiveis = true;
        imagem.remove();
        cartao.querySelector(".nome-produto").textContent = "Produto indisponível";
        cartao.querySelector(".preco-produto").textContent = "Remova este item para calcular o total.";
      }
      cartao.querySelector(".diminuir").addEventListener("click", () => alterarItemCarrinho(item.produtoId, -1));
      cartao.querySelector(".aumentar").addEventListener("click", () => alterarItemCarrinho(item.produtoId, 1));
      cartao.querySelector(".remover").addEventListener("click", () => alterarItemCarrinho(item.produtoId, 0, true));
      listaCarrinho.append(cartao);
    }
    document.getElementById("total-carrinho").textContent = indisponiveis ? "Remova os produtos indisponíveis" : formatarPrecoCarrinho(total);
    resumoCarrinho.hidden = false;
    mensagemCarrinho.textContent = indisponiveis ? "Há produtos que não estão mais no catálogo." : "Altere as quantidades ou remova os itens que desejar.";
  } catch (erro) {
    console.error("Não foi possível mostrar o carrinho:", erro);
    listaCarrinho.replaceChildren();
    resumoCarrinho.hidden = true;
    mensagemCarrinho.textContent = "Não foi possível carregar seu carrinho. Confira o console para identificar o problema.";
  }
}

renderizarCarrinho();
// Atualiza quando o carrinho ou o catálogo muda em outra aba.
window.addEventListener("storage", renderizarCarrinho);
window.addEventListener("pageshow", renderizarCarrinho);
