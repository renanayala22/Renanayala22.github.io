/*
  carrinho-compartilhado.js — carrinho igual em cardápio e promoções
*/

const CHAVE_CARRINHO = "imperio_carrinho_v1";

function carregarCarrinhoSalvo() {
  try {
    const salvo = localStorage.getItem(CHAVE_CARRINHO);
    if (salvo) return JSON.parse(salvo);
  } catch (e) {
    console.warn("Erro ao carregar carrinho:", e);
  }
  return [];
}

function salvarCarrinhoSalvo(itens) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
}

function limparCarrinhoSalvo() {
  localStorage.removeItem(CHAVE_CARRINHO);
}
