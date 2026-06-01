/*
  pagamento.js — monta a página de formas de pagamento a partir de config.js
*/

function copiarTexto(texto, botao) {
  if (!texto) return;

  navigator.clipboard
    .writeText(texto)
    .then(function () {
      const antigo = botao.textContent;
      botao.textContent = "Copiado!";

      // Atualiza um elemento de status para leitores de tela
      const status = document.getElementById("banco-status");
      if (status) status.textContent = "Chave PIX copiada para a área de transferência.";

      setTimeout(function () {
        botao.textContent = antigo;
        if (status) status.textContent = "";
      }, 2000);
    })
    .catch(function () {
      window.prompt("Copie a chave PIX:", texto);
    });
}

function renderizarFormasPagamento() {
  const lista = document.getElementById("lista-formas-pagamento");
  if (!lista || !CONFIG.formasPagamento) return;

  lista.innerHTML = "";

  CONFIG.formasPagamento.forEach(function (forma) {
    if (!forma.ativo) return;

    const item = document.createElement("li");
    item.className = "pagamento-item";
    item.innerHTML =
      '<span class="pagamento-item__icone" aria-hidden="true">' +
      (forma.icone || "💰") +
      "</span>" +
      '<div class="pagamento-item__texto">' +
      "<h3>" +
      forma.nome +
      "</h3>" +
      "<p>" +
      forma.descricao +
      "</p>" +
      "</div>";
    lista.appendChild(item);
  });
}

function renderizarDadosBanco() {
  const b = CONFIG.banco;
  if (!b) return;

  const chaveEl = document.getElementById("banco-chave");
  const tipoEl = document.getElementById("banco-tipo-chave");
  const instrucoesEl = document.getElementById("banco-instrucoes");

  if (chaveEl && b.chavePix) {
    chaveEl.textContent = b.chavePix;
  }
  if (tipoEl && b.tipoChavePix) {
    tipoEl.textContent = b.tipoChavePix;
  }
  if (instrucoesEl && b.instrucoes) {
    instrucoesEl.textContent = b.instrucoes;
  }

  const card = document.getElementById("card-banco");
  if (card && b.nome) {
    card.setAttribute("data-banco", b.nome.toLowerCase());
  }

  const btnCopiar = document.getElementById("btn-copiar-pix");
  if (btnCopiar && b.chavePix) {
    btnCopiar.addEventListener("click", function () {
      copiarTexto(b.chavePix, btnCopiar);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderizarFormasPagamento();
  renderizarDadosBanco();
});
