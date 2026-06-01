/*
  carrinho-ui.js — barra na borda direita; clique sempre expande o pedido
*/

document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("carrinho");
  const aba = document.getElementById("carrinho-aba");
  const painel = document.getElementById("carrinho-painel");
  const btnFechar = document.getElementById("carrinho-fechar");
  const backdrop = document.getElementById("carrinho-backdrop");

  if (!root || !aba || !painel) return;

  let arrastando = false;
  let inicioX = 0;
  let arrastou = false;

  function estaAberto() {
    return root.classList.contains("carrinho--aberto");
  }

  function abrirCarrinhoGaveta() {
    root.classList.remove("carrinho--fechado");
    root.classList.add("carrinho--aberto");
    aba.setAttribute("aria-expanded", "true");
    document.body.classList.add("corpo--carrinho-aberto");
  }

  function fecharCarrinhoGaveta() {
    root.classList.remove("carrinho--aberto");
    root.classList.add("carrinho--fechado");
    aba.setAttribute("aria-expanded", "false");
    document.body.classList.remove("corpo--carrinho-aberto");
    painel.style.transform = "";
  }

  window.abrirCarrinhoGaveta = abrirCarrinhoGaveta;
  window.fecharCarrinhoGaveta = fecharCarrinhoGaveta;

  window.atualizarResumoCarrinhoAba = function (quantidade, totalFormatado) {
    if (quantidade === 0) {
      aba.title = "Seu pedido — clique para abrir";
    } else {
      aba.title =
        "Seu pedido — " +
        quantidade +
        (quantidade === 1 ? " item" : " itens") +
        " · R$ " +
        totalFormatado +
        " — clique para abrir";
    }
  };

  /* Clique na barra: sempre expande */
  aba.addEventListener("click", function () {
    if (arrastou) {
      arrastou = false;
      return;
    }
    abrirCarrinhoGaveta();
  });

  if (btnFechar) btnFechar.addEventListener("click", fecharCarrinhoGaveta);
  if (backdrop) backdrop.addEventListener("click", fecharCarrinhoGaveta);

  function aoIniciarArraste(clientX) {
    arrastando = true;
    arrastou = false;
    inicioX = clientX;
  }

  function aoMoverArraste(clientX) {
    if (!arrastando) return;
    if (Math.abs(inicioX - clientX) > 12) arrastou = true;
  }

  function aoTerminarArraste(clientX) {
    if (!arrastando) return;
    arrastando = false;
    const delta = inicioX - clientX;

    /* Arrastar para a esquerda também expande */
    if (delta > 35) {
      abrirCarrinhoGaveta();
      arrastou = true;
    }
  }

  aba.addEventListener(
    "touchstart",
    function (e) {
      aoIniciarArraste(e.touches[0].clientX);
    },
    { passive: true }
  );

  aba.addEventListener(
    "touchmove",
    function (e) {
      aoMoverArraste(e.touches[0].clientX);
    },
    { passive: true }
  );

  aba.addEventListener("touchend", function (e) {
    const x = e.changedTouches[0] ? e.changedTouches[0].clientX : inicioX;
    aoTerminarArraste(x);
  });

  aba.addEventListener("mousedown", function (e) {
    aoIniciarArraste(e.clientX);
    function onMove(ev) {
      aoMoverArraste(ev.clientX);
    }
    function onUp(ev) {
      aoTerminarArraste(ev.clientX);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });

  fecharCarrinhoGaveta();
});
