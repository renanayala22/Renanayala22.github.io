/*
  carrinho-render.js — desenha itens do carrinho na tela (usado em todas as páginas)
*/

function formatarPrecoMoeda(valor) {
  return Number(valor).toFixed(2).replace(".", ",");
}

function obterElementosCarrinho() {
  return {
    lista: document.getElementById("lista-carrinho"),
    total: document.getElementById("valor-total"),
    contador: document.getElementById("carrinho-contador"),
  };
}

/**
 * @param {Array} itens
 * @param {string} [textoVazio]
 * @returns {number} total em reais
 */
function renderizarCarrinhoCompartilhado(itens, textoVazio) {
  const el = obterElementosCarrinho();
  if (!el.lista) return 0;

  el.lista.innerHTML = "";
  const quantidade = itens.length;

  if (el.contador) {
    el.contador.textContent = String(quantidade);
    el.contador.hidden = quantidade === 0;
  }

  if (quantidade === 0) {
    const vazio = document.createElement("li");
    vazio.className = "carrinho__vazio";
    vazio.textContent = textoVazio || "Nenhum item no pedido.";
    el.lista.appendChild(vazio);
    if (el.total) el.total.textContent = "0,00";
    if (typeof atualizarResumoCarrinhoAba === "function") {
      atualizarResumoCarrinhoAba(0, "0,00");
    }
    return 0;
  }

  let total = 0;

  itens.forEach(function (item, indice) {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const linha = document.createElement("li");
    linha.className = "carrinho__item";
    linha.innerHTML =
      '<span class="carrinho__item-info"><strong>' +
      item.quantidade +
      "× " +
      item.nome +
      "</strong><br>R$ " +
      formatarPrecoMoeda(subtotal) +
      "</span>" +
      '<button type="button" class="btn-remover" data-indice="' +
      indice +
      '">Remover</button>';
    el.lista.appendChild(linha);
  });

  const totalFormatado = formatarPrecoMoeda(total);
  if (el.total) el.total.textContent = totalFormatado;
  if (typeof atualizarResumoCarrinhoAba === "function") {
    atualizarResumoCarrinhoAba(quantidade, totalFormatado);
  }

  return total;
}
