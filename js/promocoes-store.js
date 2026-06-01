/*
  promocoes-store.js — salva e carrega promoções (localStorage do navegador)
*/

const CHAVE_PROMOCOES = "imperio_promocoes_v1";

function carregarPromocoes() {
  try {
    const salvo = localStorage.getItem(CHAVE_PROMOCOES);
    if (salvo) {
      return JSON.parse(salvo);
    }
  } catch (e) {
    console.warn("Erro ao ler promoções:", e);
  }
  return JSON.parse(JSON.stringify(PROMOCOES_PADRAO));
}

function salvarPromocoes(dados) {
  localStorage.setItem(CHAVE_PROMOCOES, JSON.stringify(dados));
}

function resetarPromocoes() {
  localStorage.removeItem(CHAVE_PROMOCOES);
  return JSON.parse(JSON.stringify(PROMOCOES_PADRAO));
}

function buscarItemCardapio(id) {
  return TODAS_PIZZAS.find(function (item) {
    return item.id === id;
  });
}

function obterBebidasCardapio() {
  const cat = CARDAPIO.categorias.find(function (c) {
    return c.id === "bebidas";
  });
  return cat ? cat.pizzas : [];
}

function obterPizzasCardapio() {
  return CARDAPIO.categorias
    .filter(function (c) {
      return c.id !== "bebidas" && c.id !== "bordas";
    })
    .flatMap(function (c) {
      return c.pizzas;
    });
}

function calcularDesconto(precoOriginal, precoPromo) {
  if (!precoOriginal || precoPromo >= precoOriginal) return 0;
  return Math.round((1 - precoPromo / precoOriginal) * 100);
}

function formatarPreco(valor) {
  return Number(valor).toFixed(2).replace(".", ",");
}
