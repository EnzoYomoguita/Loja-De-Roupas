// Funções de armazenamento da ADStore.
// Carregue produtos.js antes deste arquivo, usando defer nos dois scripts.
const CHAVE_PRODUTOS = "adstore:produtos";

// O navegador armazena texto. JSON.stringify transforma listas em texto.
function salvarDados(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

// JSON.parse transforma o texto salvo novamente em listas ou objetos.
// Se a chave não existir, retorna o valor padrão informado.
function lerDados(chave, valorPadrao = null) {
  const texto = localStorage.getItem(chave);

  if (texto === null) {
    return valorPadrao;
  }

  try {
    return JSON.parse(texto);
  } catch (erro) {
    // Não apaga nem substitui dados inválidos silenciosamente.
    throw new Error(`Os dados de "${chave}" não estão em um formato JSON válido.`);
  }
}

function validarCatalogo(catalogo) {
  if (!Array.isArray(catalogo)) {
    throw new Error("O catálogo precisa ser uma lista de produtos.");
  }

  const ids = new Set();

  for (const produto of catalogo) {
    if (
      !produto ||
      typeof produto.id !== "string" || !produto.id.trim() ||
      typeof produto.nome !== "string" || !produto.nome.trim() ||
      !["camisetas", "calcas", "moletons"].includes(produto.categoria) ||
      !Number.isSafeInteger(produto.precoCentavos) || produto.precoCentavos < 0 ||
      typeof produto.imagem !== "string" || !produto.imagem.trim() ||
      ids.has(produto.id)
    ) {
      throw new Error("O catálogo contém um produto inválido ou um identificador repetido.");
    }

    ids.add(produto.id);
  }
}

function obterProdutos() {
  const catalogo = lerDados(CHAVE_PRODUTOS, []);
  validarCatalogo(catalogo);
  return catalogo;
}

function obterProdutoPorId(id) {
  return obterProdutos().find(produto => produto.id === id);
}

function obterProdutosPorCategoria(categoria) {
  return obterProdutos().filter(produto => produto.categoria === categoria);
}

function inicializarCatalogo() {
  // Só cadastra a lista inicial quando a chave ainda não existe.
  // Recarregar a página não sobrescreve o catálogo salvo.
  if (localStorage.getItem(CHAVE_PRODUTOS) === null) {
    validarCatalogo(produtos);
    salvarDados(CHAVE_PRODUTOS, produtos);
  }

  return obterProdutos();
}

// Executado quando a página carrega este arquivo.
try {
  inicializarCatalogo();
} catch (erro) {
  console.error("Não foi possível carregar o catálogo da ADStore:", erro);
  alert("Não foi possível carregar os produtos. Confira se o navegador permite salvar dados deste site. Se continuar, consulte o console para identificar o problema.");
}
