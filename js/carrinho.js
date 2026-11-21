// Funções do carrinho. Carregue depois de armazenamento.js, com defer.
// Cada conta tem seu carrinho no localStorage.
function obterUsuarioDoCarrinho() {
  const texto = sessionStorage.getItem("adstore:usuarioLogado");
  if (texto === null) return null;
  const usuario = JSON.parse(texto);
  if (!usuario || typeof usuario.id !== "string" || !usuario.id.trim()) {
    throw new Error("A sessão do usuário está inválida.");
  }
  return usuario;
}

function obterChaveCarrinho(usuario) {
  return `adstore:carrinho:${usuario.id}`;
}

function obterCarrinho(usuario) {
  const itens = lerDados(obterChaveCarrinho(usuario), []);
  const ids = new Set();
  if (!Array.isArray(itens)) throw new Error("O carrinho salvo está inválido.");
  for (const item of itens) {
    if (!item || typeof item.produtoId !== "string" ||
        !Number.isSafeInteger(item.quantidade) || item.quantidade < 1 ||
        ids.has(item.produtoId)) {
      throw new Error("O carrinho contém itens inválidos.");
    }
    ids.add(item.produtoId);
  }
  return itens;
}

function adicionarAoCarrinho(produtoId) {
  const usuario = obterUsuarioDoCarrinho();
  if (!usuario) return false;

  if (!obterProdutoPorId(produtoId)) {
    throw new Error("Produto não encontrado no catálogo.");
  }

  const itens = obterCarrinho(usuario);
  const itemExistente = itens.find(item => item.produtoId === produtoId);

  if (itemExistente) {
    if (itemExistente.quantidade === Number.MAX_SAFE_INTEGER) {
      throw new Error("Quantidade máxima atingida.");
    }
    itemExistente.quantidade += 1;
  } else {
    itens.push({ produtoId: produtoId, quantidade: 1 });
  }

  salvarDados(obterChaveCarrinho(usuario), itens);
  return true;
}
