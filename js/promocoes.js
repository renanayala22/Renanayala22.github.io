/*
  promocoes.js — página de combos e promoções
*/

let carrinho = carregarCarrinhoSalvo();

const listaPromocoes = document.getElementById("lista-promocoes");
const listaCombos = document.getElementById("lista-combos");
const listaBebidasPromo = document.getElementById("lista-bebidas-promo");
const elementoListaCarrinho = document.getElementById("lista-carrinho");
const elementoMensagemPedido = document.getElementById("mensagem-pedido");
const botaoFinalizar = document.getElementById("btn-finalizar");
const botaoLimpar = document.getElementById("btn-limpar");

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
  salvarCarrinhoSalvo(carrinho);
}

function renderizarCarrinho() {
  renderizarCarrinhoCompartilhado(carrinho, "Nenhum item no pedido.");
}

function adicionarAoCarrinho(item, precoFinal) {
  carrinho.push({
    ...item,
    preco: precoFinal,
    quantidade: 1,
    promocional: true,
  });
  persistirCarrinho();
  renderizarCarrinho();
  limparMensagem();
  if (typeof abrirCarrinhoGaveta === "function") abrirCarrinhoGaveta();
}

function criarCardPromo(item, precoOriginal, precoPromo, tipo, idRef) {
  const desconto = calcularDesconto(precoOriginal, precoPromo);
  const badge =
    desconto > 0
      ? '<span class="promo-card__badge">-' + desconto + "%</span>"
      : '<span class="promo-card__badge promo-card__badge--oferta">Oferta</span>";

  return (
    '<article class="promo-card">' +
    '<div class="promo-card__topo">' +
    '<span class="promo-card__emoji">' +
    (item.emoji || "🏷️") +
    "</span>" +
    badge +
    "</div>" +
    "<h3 class=\"promo-card__nome\">" +
    item.nome +
    "</h3>" +
    '<p class="promo-card__desc">' +
    item.descricao +
    "</p>" +
    '<div class="promo-card__precos">' +
    '<span class="promo-card__de">R$ ' +
    formatarPreco(precoOriginal) +
    "</span>" +
    '<span class="promo-card__por">R$ ' +
    formatarPreco(precoPromo) +
    "</span>" +
    "</div>" +
    '<button type="button" class="btn btn--card btn-adicionar-promo" data-tipo="' +
    tipo +
    '" data-id="' +
    idRef +
    '">+ Adicionar</button>' +
    "</article>"
  );
}

function renderizarAbaPromocoes(dados) {
  if (!listaPromocoes) return;
  listaPromocoes.innerHTML = "";

  const ativas = dados.pizzas.filter(function (p) {
    return p.ativo;
  });

  if (ativas.length === 0) {
    listaPromocoes.innerHTML =
      '<p class="promo-vazio">Nenhuma pizza em promoção no momento.</p>';
    return;
  }

  ativas.forEach(function (promo) {
    const pizza = buscarItemCardapio(promo.idPizza);
    if (!pizza) return;

    const wrap = document.createElement("div");
    wrap.innerHTML = criarCardPromo(
      pizza,
      pizza.preco,
      promo.precoPromo,
      "pizza",
      promo.idPizza
    );
    listaPromocoes.appendChild(wrap.firstElementChild);
  });
}

function renderizarAbaCombos(dados) {
  if (!listaCombos) return;
  listaCombos.innerHTML = "";

  const ativos = dados.combos.filter(function (c) {
    return c.ativo;
  });

  if (ativos.length === 0) {
    listaCombos.innerHTML =
      '<p class="promo-vazio">Nenhum combo disponível.</p>';
    return;
  }

  ativos.forEach(function (combo) {
    const pizza = buscarItemCardapio(combo.pizzaId);
    const bebida = buscarItemCardapio(combo.bebidaId);
    const qtdBeb = combo.quantidadeBebida || 1;
    const detalhe =
      (pizza ? pizza.nome : "Pizza") +
      " + " +
      qtdBeb +
      "× " +
      (bebida ? bebida.nome : "Bebida");

    const el = document.createElement("article");
    el.className = "promo-card promo-card--combo";
    el.innerHTML =
      '<div class="promo-card__topo">' +
      '<span class="promo-card__emoji">' +
      (combo.emoji || "🎁") +
      "</span>" +
      '<span class="promo-card__badge promo-card__badge--combo">Combo</span>' +
      "</div>" +
      "<h3 class=\"promo-card__nome\">" +
      combo.nome +
      "</h3>" +
      '<p class="promo-card__desc">' +
      (combo.descricao || detalhe) +
      "</p>" +
      '<p class="promo-card__combo-itens">' +
      detalhe +
      "</p>" +
      '<div class="promo-card__precos">' +
      '<span class="promo-card__de">R$ ' +
      formatarPreco(combo.precoOriginal) +
      "</span>" +
      '<span class="promo-card__por">R$ ' +
      formatarPreco(combo.precoPromo) +
      "</span>" +
      "</div>" +
      '<button type="button" class="btn btn--card btn-adicionar-promo" data-tipo="combo" data-id="' +
      combo.id +
      '">+ Adicionar combo</button>';
    listaCombos.appendChild(el);
  });
}

function renderizarAbaBebidas(dados) {
  if (!listaBebidasPromo) return;
  listaBebidasPromo.innerHTML = "";

  const ativas = dados.bebidas.filter(function (b) {
    return b.ativo;
  });

  if (ativas.length === 0) {
    listaBebidasPromo.innerHTML =
      '<p class="promo-vazio">Nenhuma bebida em promoção.</p>';
    return;
  }

  ativas.forEach(function (promo) {
    const bebida = buscarItemCardapio(promo.idBebida);
    if (!bebida) return;

    const wrap = document.createElement("div");
    wrap.innerHTML = criarCardPromo(
      bebida,
      bebida.preco,
      promo.precoPromo,
      "bebida",
      promo.idBebida
    );
    listaBebidasPromo.appendChild(wrap.firstElementChild);
  });
}

function renderizarTudo() {
  const dados = carregarPromocoes();
  renderizarAbaPromocoes(dados);
  renderizarAbaCombos(dados);
  renderizarAbaBebidas(dados);
}

function trocarAba(idAba) {
  document.querySelectorAll(".abas__btn").forEach(function (btn) {
    btn.classList.toggle("abas__btn--ativo", btn.dataset.aba === idAba);
  });
  document.querySelectorAll(".abas__painel").forEach(function (painel) {
    const ativo = painel.id === "aba-" + idAba;
    painel.classList.toggle("abas__painel--ativo", ativo);
    painel.hidden = !ativo;
  });
}

function aoClicarAdicionar(evento) {
  const btn = evento.target.closest(".btn-adicionar-promo");
  if (!btn) return;

  const dados = carregarPromocoes();
  const tipo = btn.dataset.tipo;
  const id = btn.dataset.id;

  if (tipo === "pizza") {
    const promo = dados.pizzas.find(function (p) {
      return String(p.idPizza) === id && p.ativo;
    });
    const pizza = buscarItemCardapio(Number(id));
    if (promo && pizza) adicionarAoCarrinho(pizza, promo.precoPromo);
  }

  if (tipo === "bebida") {
    const promo = dados.bebidas.find(function (b) {
      return String(b.idBebida) === id && b.ativo;
    });
    const bebida = buscarItemCardapio(Number(id));
    if (promo && bebida) adicionarAoCarrinho(bebida, promo.precoPromo);
  }

  if (tipo === "combo") {
    const combo = dados.combos.find(function (c) {
      return c.id === id && c.ativo;
    });
    if (combo) {
      adicionarAoCarrinho(
        {
          id: "combo-" + combo.id,
          nome: combo.nome,
          descricao: combo.descricao,
          emoji: combo.emoji || "🎁",
        },
        combo.precoPromo
      );
    }
  }
}

function iniciarPromocoes() {
  document.querySelectorAll(".abas__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      trocarAba(btn.dataset.aba);
    });
  });

  const areaAbas = document.querySelector(".abas__conteudo");
  if (areaAbas) areaAbas.addEventListener("click", aoClicarAdicionar);

  if (botaoFinalizar) {
    botaoFinalizar.addEventListener("click", function () {
      if (carrinho.length === 0) {
        mostrarMensagem("Adicione itens antes de finalizar.", "erro");
        if (typeof abrirCarrinhoGaveta === "function") abrirCarrinhoGaveta();
        return;
      }
      mostrarMensagem(
        "Pedido registrado! Confirme pelo WhatsApp se desejar.",
        "sucesso"
      );
    });
  }

  if (botaoLimpar) {
    botaoLimpar.addEventListener("click", function () {
      carrinho = [];
      limparCarrinhoSalvo();
      renderizarCarrinho();
      limparMensagem();
    });
  }

  if (elementoListaCarrinho) {
    elementoListaCarrinho.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-remover");
      if (!btn) return;
      carrinho.splice(Number(btn.dataset.indice), 1);
      persistirCarrinho();
      renderizarCarrinho();
    });
  }

  renderizarTudo();
  renderizarCarrinho();
  trocarAba("promocoes");
}

document.addEventListener("DOMContentLoaded", iniciarPromocoes);
