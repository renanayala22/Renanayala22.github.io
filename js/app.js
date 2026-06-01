/*
  app.js — cardápio principal e carrinho
*/

let carrinho = typeof carregarCarrinhoSalvo === "function" ? carregarCarrinhoSalvo() : [];
let cardapioJaInicializado = false;

const elementoListaCardapio = document.getElementById("lista-cardapio");
const elementoListaCarrinho = document.getElementById("lista-carrinho");
const elementoMensagemPedido = document.getElementById("mensagem-pedido");
const botaoFinalizar = document.getElementById("btn-finalizar");
const botaoLimpar = document.getElementById("btn-limpar");

const TEXTO_CARRINHO_VAZIO = "Nenhum item ainda. Escolha nas promoções!";

function limparMensagem() {
  if (!elementoMensagemPedido) return;
  elementoMensagemPedido.textContent = "";
  elementoMensagemPedido.className = "alerta";
}

function mostrarMensagem(texto, tipo) {
  if (!elementoMensagemPedido) return;
  elementoMensagemPedido.textContent = texto;
  elementoMensagemPedido.className = "alerta alerta--" + tipo;
}

function persistirCarrinho() {
  if (typeof salvarCarrinhoSalvo === "function") salvarCarrinhoSalvo(carrinho);
}

function renderizarCarrinho() {
  renderizarCarrinhoCompartilhado(carrinho, TEXTO_CARRINHO_VAZIO);
}

function criarHtmlCardPizza(pizza, idCategoria) {
  const emoji = pizza.emoji || "🍕";

  return (
    '<article class="pizza-card" data-categoria="' +
    idCategoria +
    '">' +
    '<div class="pizza-card__icone" aria-hidden="true">' +
    emoji +
    "</div>" +
    '<div class="pizza-card__corpo">' +
    "<h3 class=\"pizza-card__nome\">" +
    pizza.nome +
    "</h3>" +
    '<p class="pizza-card__desc">' +
    pizza.descricao +
    "</p>" +
    '<div class="pizza-card__footer">' +
    '<span class="pizza-card__preco"><small>R$</small>' +
    formatarPrecoMoeda(pizza.preco) +
    "</span>" +
    '<button type="button" class="btn btn--card btn-adicionar" data-id="' +
    pizza.id +
    '">+ Adicionar</button>' +
    "</div>" +
    "</div>" +
    "</article>"
  );
}

function renderizarCardapio() {
  if (!elementoListaCardapio) return;

  elementoListaCardapio.innerHTML = "";

  CARDAPIO.categorias.forEach(function (categoria) {
    const blocoCategoria = document.createElement("section");
    blocoCategoria.className = "categoria";

    const grade = document.createElement("div");
    grade.className = "cardapio__grid";

    categoria.pizzas.forEach(function (pizza) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = criarHtmlCardPizza(pizza, categoria.id);
      grade.appendChild(wrapper.firstElementChild);
    });

    blocoCategoria.innerHTML =
      '<h3 class="categoria__titulo">' + categoria.nome + "</h3>";
    blocoCategoria.appendChild(grade);
    elementoListaCardapio.appendChild(blocoCategoria);
  });

  if (!cardapioJaInicializado) {
    elementoListaCardapio.addEventListener("click", aoClicarNoCardapio);
    cardapioJaInicializado = true;
  }
}

function aoClicarNoCardapio(evento) {
  const botao = evento.target.closest(".btn-adicionar");
  if (!botao) return;
  adicionarAoCarrinho(Number(botao.dataset.id));
}

function adicionarAoCarrinho(idItem) {
  const item = TODAS_PIZZAS.find(function (p) {
    return p.id === idItem;
  });
  if (!item) return;

  carrinho.push({ ...item, quantidade: 1 });
  persistirCarrinho();
  renderizarCarrinho();
  limparMensagem();

  if (typeof abrirCarrinhoGaveta === "function") {
    abrirCarrinhoGaveta();
  }
}

function removerDoCarrinho(indice) {
  carrinho.splice(indice, 1);
  persistirCarrinho();
  renderizarCarrinho();
  limparMensagem();
}

function limparCarrinho() {
  carrinho = [];
  if (typeof limparCarrinhoSalvo === "function") limparCarrinhoSalvo();
  renderizarCarrinho();
  limparMensagem();
}

function finalizarPedido() {
  if (carrinho.length === 0) {
    mostrarMensagem("Adicione itens antes de finalizar.", "erro");
    if (typeof abrirCarrinhoGaveta === "function") abrirCarrinhoGaveta();
    return;
  }

  const linhas = carrinho.map(function (item) {
    return (
      item.quantidade +
      "× " +
      item.nome +
      " (R$ " +
      formatarPrecoMoeda(item.preco * item.quantidade) +
      ")"
    );
  });

  const totalEl = document.getElementById("valor-total");

  mostrarMensagem(
    "Pedido registrado! " +
      linhas.join(" · ") +
      " — Total: R$ " +
      (totalEl ? totalEl.textContent : "") +
      ". Envie pelo WhatsApp se quiser confirmar.",
    "sucesso"
  );
}

function iniciarApp() {
  if (botaoFinalizar) botaoFinalizar.addEventListener("click", finalizarPedido);
  if (botaoLimpar) botaoLimpar.addEventListener("click", limparCarrinho);

  if (elementoListaCarrinho) {
    elementoListaCarrinho.addEventListener("click", function (evento) {
      const btn = evento.target.closest(".btn-remover");
      if (btn) removerDoCarrinho(Number(btn.dataset.indice));
    });
  }

  renderizarCardapio();
  renderizarCarrinho();
}

document.addEventListener("DOMContentLoaded", iniciarApp);
