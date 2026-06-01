/*
  ==========================================================================
  cardapio.js — DADOS DO CARDÁPIO (edite aqui!)
  ==========================================================================

  Este arquivo contém APENAS informações das pizzas.
  Não mexa em lógica de carrinho aqui — isso fica em app.js.

  COMO EDITAR UMA PIZZA:
    1. Ache a categoria (ex: "Tradicionais")
    2. Altere nome, descricao ou preco dentro de { }
    3. Salve o arquivo e atualize a página no navegador (F5)

  CAMPOS DE CADA PIZZA:
    id        → número único (não repita em todo o cardápio)
    nome      → nome que aparece no card
    descricao → ingredientes / texto curto
    preco     → número com ponto: 39.90 (não use vírgula aqui)
    emoji     → ícone decorativo (opcional, pode ser "")

  COMO ADICIONAR PIZZA NOVA:
    Copie um bloco { ... }, cole na lista "pizzas" da categoria
    e mude o "id" para um número que ainda não existe.
*/

const CARDAPIO = {
  /*
    Objeto com uma propriedade "categorias".
    Cada categoria agrupa pizzas do mesmo tipo na tela.
  */
  categorias: [
    /* ===================== TRADICIONAIS ===================== */
    {
      id: "tradicionais",
      nome: "Tradicionais",
      pizzas: [
        {
          id: 1,
          nome: "Mussarela",
          descricao: "Molho de tomate, mussarela e orégano",
          preco: 35.9,
          emoji: "🧀",
        },
        {
          id: 2,
          nome: "Calabresa",
          descricao: "Molho, mussarela, calabresa fatiada e cebola",
          preco: 39.9,
          emoji: "🌶️",
        },
        {
          id: 3,
          nome: "Portuguesa",
          descricao: "Presunto, ovos, cebola, azeitona e mussarela",
          preco: 42.9,
          emoji: "🇵🇹",
        },
        {
          id: 4,
          nome: "Marguerita",
          descricao: "Molho, mussarela, tomate fresco e manjericão",
          preco: 38.9,
          emoji: "🍅",
        },
        {
          id: 5,
          nome: "Napolitana",
          descricao: "Mussarela, tomate em rodelas e parmesão",
          preco: 39.9,
          emoji: "🍕",
        },
        {
          id: 6,
          nome: "Pepperoni",
          descricao: "Molho, mussarela e pepperoni",
          preco: 43.9,
          emoji: "🔴",
        },
        {
          id: 7,
          nome: "Bacon",
          descricao: "Mussarela, bacon crocante e cebola",
          preco: 41.9,
          emoji: "🥓",
        },
        {
          id: 8,
          nome: "Baiana",
          descricao: "Calabresa moída, ovos, pimenta e cebola",
          preco: 40.9,
          emoji: "🌶️",
        },
        {
          id: 9,
          nome: "Atum",
          descricao: "Atum sólido, cebola e azeitonas",
          preco: 41.9,
          emoji: "🐟",
        },
        {
          id: 10,
          nome: "Escarola",
          descricao: "Escarola refogada, alho e mussarela",
          preco: 38.9,
          emoji: "🥬",
        },
        {
          id: 11,
          nome: "Frango com Catupiry",
          descricao: "Frango desfiado temperado e catupiry",
          preco: 41.9,
          emoji: "🍗",
        },
        {
          id: 12,
          nome: "Quatro Queijos",
          descricao: "Mussarela, gorgonzola, parmesão e provolone",
          preco: 44.9,
          emoji: "🧀",
        },
        {
          id: 13,
          nome: "Palmito",
          descricao: "Palmito picado, mussarela e molho branco",
          preco: 40.9,
          emoji: "🌴",
        },
        {
          id: 14,
          nome: "Milho Verde",
          descricao: "Milho verde, mussarela e molho",
          preco: 37.9,
          emoji: "🌽",
        },
        {
          id: 15,
          nome: "Brócolis com Bacon",
          descricao: "Brócolis, bacon e alho",
          preco: 42.9,
          emoji: "🥦",
        },
        {
          id: 16,
          nome: "Lombo Canadense",
          descricao: "Lombo, mussarela e orégano",
          preco: 43.9,
          emoji: "🥩",
        },
        {
          id: 17,
          nome: "Toscana",
          descricao: "Calabresa moída e mussarela",
          preco: 39.9,
          emoji: "🇮🇹",
        },
        {
          id: 18,
          nome: "Romana",
          descricao: "Mussarela, anchova e azeitona",
          preco: 44.9,
          emoji: "🫒",
        },
      ],
    },

    /* ===================== ESPECIAIS / GOURMET ===================== */
    {
      id: "especiais",
      nome: "Especiais",
      pizzas: [
        {
          id: 19,
          nome: "Strogonoff de Frango",
          descricao: "Frango ao molho strogonoff e batata palha",
          preco: 46.9,
          emoji: "🍄",
        },
        {
          id: 20,
          nome: "Costela BBQ",
          descricao: "Costela desfiada e molho barbecue",
          preco: 49.9,
          emoji: "🥩",
        },
        {
          id: 21,
          nome: "Calabresa Premium",
          descricao: "Calabresa artesanal e cebola caramelizada",
          preco: 45.9,
          emoji: "⭐",
        },
        {
          id: 22,
          nome: "Rúcula com Tomate Seco",
          descricao: "Mussarela de búfala, rúcula e tomate seco",
          preco: 47.9,
          emoji: "🥗",
        },
        {
          id: 23,
          nome: "Parma com Rúcula",
          descricao: "Presunto parma, rúcula e parmesão",
          preco: 52.9,
          emoji: "🍖",
        },
        {
          id: 24,
          nome: "Camarão",
          descricao: "Camarões salteados no alho e mussarela",
          preco: 54.9,
          emoji: "🦐",
        },
        {
          id: 25,
          nome: "Filé Mignon",
          descricao: "Filé mignon em tiras e molho madeira",
          preco: 53.9,
          emoji: "🥩",
        },
        {
          id: 26,
          nome: "Vegetariana Especial",
          descricao: "Abobrinha, berinjela, pimentão e queijo",
          preco: 43.9,
          emoji: "🥕",
        },
      ],
    },

    /* ===================== DOCES ===================== */
    {
      id: "doces",
      nome: "Doces",
      pizzas: [
        {
          id: 27,
          nome: "Chocolate",
          descricao: "Chocolate ao leite derretido",
          preco: 36.9,
          emoji: "🍫",
        },
        {
          id: 28,
          nome: "Chocolate com Morango",
          descricao: "Chocolate e morangos frescos",
          preco: 39.9,
          emoji: "🍓",
        },
        {
          id: 29,
          nome: "Romeu e Julieta",
          descricao: "Goiabada cascão e queijo minas",
          preco: 37.9,
          emoji: "💕",
        },
        {
          id: 30,
          nome: "Banana com Canela",
          descricao: "Banana, açúcar e canela",
          preco: 35.9,
          emoji: "🍌",
        },
        {
          id: 31,
          nome: "Prestígio",
          descricao: "Chocolate e coco ralado",
          preco: 38.9,
          emoji: "🥥",
        },
        {
          id: 32,
          nome: "Sensação",
          descricao: "Chocolate, morango e leite condensado",
          preco: 40.9,
          emoji: "✨",
        },
        {
          id: 33,
          nome: "Churros",
          descricao: "Doce de leite, açúcar e canela",
          preco: 39.9,
          emoji: "🍩",
        },
        {
          id: 34,
          nome: "Brigadeiro",
          descricao: "Cobertura de brigadeiro e granulado",
          preco: 38.9,
          emoji: "🍫",
        },
      ],
    },

    /* ===================== BEBIDAS ===================== */
    {
      id: "bebidas",
      nome: "Bebidas",
      pizzas: [
        {
          id: 101,
          nome: "Coca-Cola 2L",
          descricao: "Garrafa 2 litros",
          preco: 14.9,
          emoji: "🥤",
        },
        {
          id: 102,
          nome: "Coca-Cola Lata",
          descricao: "Lata 350ml",
          preco: 6.9,
          emoji: "🥤",
        },
        {
          id: 103,
          nome: "Guaraná Antarctica 2L",
          descricao: "Garrafa 2 litros",
          preco: 13.9,
          emoji: "🥤",
        },
        {
          id: 104,
          nome: "Guaraná Lata",
          descricao: "Lata 350ml",
          preco: 6.5,
          emoji: "🥤",
        },
        {
          id: 105,
          nome: "Suco Del Valle 1L",
          descricao: "Laranja ou uva",
          preco: 12.9,
          emoji: "🧃",
        },
        {
          id: 106,
          nome: "Água Mineral 500ml",
          descricao: "Com ou sem gás",
          preco: 4.5,
          emoji: "💧",
        },
        {
          id: 107,
          nome: "Água com Gás 510ml",
          descricao: "Garrafa",
          preco: 5.5,
          emoji: "💧",
        },
        {
          id: 108,
          nome: "Heineken Long Neck",
          descricao: "330ml — 18+",
          preco: 9.9,
          emoji: "🍺",
        },
        {
          id: 109,
          nome: "Skol Long Neck",
          descricao: "330ml — 18+",
          preco: 7.9,
          emoji: "🍺",
        },
        {
          id: 110,
          nome: "Suco Natural 500ml",
          descricao: "Laranja, abacaxi ou limão",
          preco: 10.9,
          emoji: "🍊",
        },
      ],
    },

    /* ===================== BORDAS (opcional — só informativo no card) ===================== */
    /*
      Você pode usar esta categoria para "extras" ou remover se não quiser.
      O preço aqui é adicional sugerido — ajuste como quiser.
    */
    {
      id: "bordas",
      nome: "Bordas recheadas (adicional)",
      pizzas: [
        {
          id: 35,
          nome: "Borda Catupiry",
          descricao: "Adicional na borda — qualquer pizza salgada",
          preco: 8.0,
          emoji: "🧀",
        },
        {
          id: 36,
          nome: "Borda Cheddar",
          descricao: "Adicional na borda — qualquer pizza salgada",
          preco: 8.0,
          emoji: "🧈",
        },
        {
          id: 37,
          nome: "Borda Chocolate",
          descricao: "Adicional — ideal em pizzas doces",
          preco: 9.0,
          emoji: "🍫",
        },
      ],
    },
  ],
};

/*
  Lista plana com TODAS as pizzas (usada pelo app.js para buscar por id).
  Não precisa editar manualmente — montamos a partir das categorias acima.
*/
const TODAS_PIZZAS = CARDAPIO.categorias.flatMap(categoria => categoria.pizzas);
