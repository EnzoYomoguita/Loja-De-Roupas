// Catálogo inicial da ADStore: 30 produtos, divididos em três categorias.
// Cada objeto representa um produto. O id é único e será usado pelo carrinho.
// precoCentavos: 6990 significa R$ 69,90. Calcule em centavos e formate ao exibir.
// imagem: caminho relativo à raiz do projeto. Em páginas de categorias,
// acrescente "../" ao caminho quando for atribuí-lo ao src de uma imagem.
// As categorias usam nomes sem acentos para facilitar filtros no JavaScript.
// Este arquivo define os dados; ainda não grava nada no localStorage.
// Carregue-o antes dos scripts que precisarem consultar a lista produtos.

const produtos = [
  {
    "id": "camiseta-preta",
    "nome": "Camisa Oversized Preta",
    "categoria": "camisetas",
    "precoCentavos": 6990,
    "imagem": "imagens/camisapreta-catalogo.png"
  },
  {
    "id": "camiseta-branca",
    "nome": "Camisa Oversized Branca",
    "categoria": "camisetas",
    "precoCentavos": 7000,
    "imagem": "imagens/camisabranca.png"
  },
  {
    "id": "camiseta-laranja",
    "nome": "Camisa Oversized Laranja",
    "categoria": "camisetas",
    "precoCentavos": 5990,
    "imagem": "imagens/camisalaranja.png"
  },
  {
    "id": "camiseta-cinza",
    "nome": "Camisa Oversized Cinza",
    "categoria": "camisetas",
    "precoCentavos": 6900,
    "imagem": "imagens/camisacinza.png"
  },
  {
    "id": "camiseta-marrom",
    "nome": "Camisa Oversized Marrom",
    "categoria": "camisetas",
    "precoCentavos": 7000,
    "imagem": "imagens/camisamarrom.png"
  },
  {
    "id": "camiseta-roxa",
    "nome": "Camisa Oversized Roxa",
    "categoria": "camisetas",
    "precoCentavos": 7000,
    "imagem": "imagens/camisaroxa.png"
  },
  {
    "id": "camiseta-azul",
    "nome": "Camisa Oversized Azul",
    "categoria": "camisetas",
    "precoCentavos": 7000,
    "imagem": "imagens/camisazul.png"
  },
  {
    "id": "camiseta-verde",
    "nome": "Camisa Oversized Verde",
    "categoria": "camisetas",
    "precoCentavos": 7000,
    "imagem": "imagens/camisaverde.png"
  },
  {
    "id": "camiseta-rosa",
    "nome": "Camisa Oversized Rosa",
    "categoria": "camisetas",
    "precoCentavos": 7000,
    "imagem": "imagens/camisarosa.png"
  },
  {
    "id": "camiseta-amarela",
    "nome": "Camisa Oversized Amarela",
    "categoria": "camisetas",
    "precoCentavos": 7000,
    "imagem": "imagens/camisamarela.png"
  },
  {
    "id": "calca-marrom",
    "nome": "Calça Masculina Marrom",
    "categoria": "calcas",
    "precoCentavos": 6990,
    "imagem": "imagens/Calça Marrom de Corte Reto (1).png"
  },
  {
    "id": "calca-laranja",
    "nome": "Calça Masculina Laranja",
    "categoria": "calcas",
    "precoCentavos": 11990,
    "imagem": "imagens/Calça Laranja de Corte Reto.png"
  },
  {
    "id": "calca-bege",
    "nome": "Calça Masculina Bege",
    "categoria": "calcas",
    "precoCentavos": 11990,
    "imagem": "imagens/Calça Masculina Bege de Perna Larga.png"
  },
  {
    "id": "calca-cinza",
    "nome": "Calça Masculina Cinza",
    "categoria": "calcas",
    "precoCentavos": 11990,
    "imagem": "imagens/Calça masculina cinza grafite de corte amplo.png"
  },
  {
    "id": "calca-verde-oliva",
    "nome": "Calça Masculina Verde-Oliva",
    "categoria": "calcas",
    "precoCentavos": 11990,
    "imagem": "imagens/Calça Verde Oliva de Perna Larga.png"
  },
  {
    "id": "calca-vinho",
    "nome": "Calça Masculina Vinho",
    "categoria": "calcas",
    "precoCentavos": 11990,
    "imagem": "imagens/Calça masculina vinho de pernas largas.png"
  },
  {
    "id": "calca-verde-azulada",
    "nome": "Calça Masculina Verde - Azulada",
    "categoria": "calcas",
    "precoCentavos": 11990,
    "imagem": "imagens/Calça Masculina Wide Leg Verde-azulada.png"
  },
  {
    "id": "calca-preta",
    "nome": "Calça Masculina Preta",
    "categoria": "calcas",
    "precoCentavos": 11990,
    "imagem": "imagens/Calça Preta de Corte Amplo.png"
  },
  {
    "id": "calca-rosa",
    "nome": "Calça Masculina Rosa",
    "categoria": "calcas",
    "precoCentavos": 11990,
    "imagem": "imagens/Calça Chino Masculina Rosa.png"
  },
  {
    "id": "calca-amarela",
    "nome": "Calça Masculina Amarela",
    "categoria": "calcas",
    "precoCentavos": 11990,
    "imagem": "imagens/Calça masculina amarela em fundo branco.png"
  },
  {
    "id": "moletom-vinho",
    "nome": "Moletom Masculino Vinho",
    "categoria": "moletons",
    "precoCentavos": 15990,
    "imagem": "imagens/moletom-vinho.png"
  },
  {
    "id": "moletom-azul-marinho",
    "nome": "Moletom Masculino Azul-Marinho",
    "categoria": "moletons",
    "precoCentavos": 15990,
    "imagem": "imagens/moletom-azul-marinho.png"
  },
  {
    "id": "moletom-bege",
    "nome": "Moletom Masculino Bege",
    "categoria": "moletons",
    "precoCentavos": 15990,
    "imagem": "imagens/moletom-bege.png"
  },
  {
    "id": "moletom-branco",
    "nome": "Moletom Masculino Branco",
    "categoria": "moletons",
    "precoCentavos": 15990,
    "imagem": "imagens/moletom-branco.png"
  },
  {
    "id": "moletom-cinza",
    "nome": "Moletom Masculino Cinza",
    "categoria": "moletons",
    "precoCentavos": 15990,
    "imagem": "imagens/moletom-cinza.png"
  },
  {
    "id": "moletom-marrom",
    "nome": "Moletom Masculino Marrom",
    "categoria": "moletons",
    "precoCentavos": 15990,
    "imagem": "imagens/moletom-marrom.png"
  },
  {
    "id": "moletom-preto",
    "nome": "Moletom Masculino Preto",
    "categoria": "moletons",
    "precoCentavos": 15990,
    "imagem": "imagens/moletom-preto.png"
  },
  {
    "id": "moletom-rosa",
    "nome": "Moletom Masculino Rosa",
    "categoria": "moletons",
    "precoCentavos": 15990,
    "imagem": "imagens/moletom-rosa.png"
  },
  {
    "id": "moletom-roxo",
    "nome": "Moletom Masculino Roxo",
    "categoria": "moletons",
    "precoCentavos": 15990,
    "imagem": "imagens/moletom-roxo.png"
  },
  {
    "id": "moletom-verde",
    "nome": "Moletom Masculino Verde",
    "categoria": "moletons",
    "precoCentavos": 15990,
    "imagem": "imagens/moletom-verde.png"
  }
];
