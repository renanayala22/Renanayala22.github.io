/*
  promocoes-dados.js — valores iniciais das promoções (usado se não houver painel salvo)
*/

const PROMOCOES_PADRAO = {
  pizzas: [
    { idPizza: 1, precoPromo: 29.9, ativo: true },
    { idPizza: 2, precoPromo: 34.9, ativo: true },
    { idPizza: 11, precoPromo: 36.9, ativo: true },
    { idPizza: 6, precoPromo: 39.9, ativo: false },
  ],
  bebidas: [
    { idBebida: 102, precoPromo: 5.5, ativo: true },
    { idBebida: 105, precoPromo: 10.9, ativo: true },
    { idBebida: 106, precoPromo: 3.9, ativo: true },
  ],
  combos: [
    {
      id: "combo1",
      nome: "Combo Casal",
      descricao: "1 Pizza M Calabresa + 2 refrigerantes lata",
      precoPromo: 44.9,
      precoOriginal: 53.7,
      pizzaId: 2,
      bebidaId: 102,
      quantidadeBebida: 2,
      ativo: true,
      emoji: "💑",
    },
    {
      id: "combo2",
      nome: "Combo Família",
      descricao: "1 Pizza G Mussarela + Guaraná 2L",
      precoPromo: 46.9,
      precoOriginal: 50.8,
      pizzaId: 1,
      bebidaId: 103,
      quantidadeBebida: 1,
      ativo: true,
      emoji: "👨‍👩‍👧‍👦",
    },
    {
      id: "combo3",
      nome: "Combo Doce",
      descricao: "1 Pizza M Chocolate + 2 sucos 1L",
      precoPromo: 48.9,
      precoOriginal: 56.7,
      pizzaId: 27,
      bebidaId: 105,
      quantidadeBebida: 2,
      ativo: true,
      emoji: "🍫",
    },
  ],
};
