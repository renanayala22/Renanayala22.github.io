/*
  painel.js — painel para editar preços promocionais (salva no navegador)
*/

let dadosPainel = carregarPromocoes();

const formPizzas = document.getElementById("form-pizzas-promo");
const formBebidas = document.getElementById("form-bebidas-promo");
const formCombos = document.getElementById("form-combos");
const msgPainel = document.getElementById("msg-painel");

function aviso(texto, tipo) {
  if (!msgPainel) return;
  msgPainel.textContent = texto;
  msgPainel.className = "alerta alerta--" + (tipo || "sucesso");
}

function obterPromoPizza(id) {
  let p = dadosPainel.pizzas.find(function (x) {
    return x.idPizza === id;
  });
  if (!p) {
    p = { idPizza: id, precoPromo: 0, ativo: false };
    dadosPainel.pizzas.push(p);
  }
  return p;
}

function obterPromoBebida(id) {
  let b = dadosPainel.bebidas.find(function (x) {
    return x.idBebida === id;
  });
  if (!b) {
    b = { idBebida: id, precoPromo: 0, ativo: false };
    dadosPainel.bebidas.push(b);
  }
  return b;
}

function montarFormPizzas() {
  if (!formPizzas) return;
  formPizzas.innerHTML = "";

  obterPizzasCardapio().forEach(function (pizza) {
    const promo = obterPromoPizza(pizza.id);
    const row = document.createElement("div");
    row.className = "painel-linha";
    row.innerHTML =
      '<div class="painel-linha__info">' +
      "<strong>" +
      pizza.emoji +
      " " +
      pizza.nome +
      "</strong>" +
      "<span>Normal: R$ " +
      formatarPreco(pizza.preco) +
      "</span>" +
      "</div>" +
      '<label class="painel-campo">' +
      "Preço promo R$" +
      '<input type="number" step="0.01" min="0" data-pizza-id="' +
      pizza.id +
      '" value="' +
      (promo.precoPromo || "") +
      '" class="painel-input painel-input--preco">' +
      "</label>" +
      '<label class="painel-check">' +
      '<input type="checkbox" data-pizza-ativo="' +
      pizza.id +
      '" ' +
      (promo.ativo ? "checked" : "") +
      "> Ativa" +
      "</label>";
    formPizzas.appendChild(row);
  });
}

function montarFormBebidas() {
  if (!formBebidas) return;
  formBebidas.innerHTML = "";

  obterBebidasCardapio().forEach(function (bebida) {
    const promo = obterPromoBebida(bebida.id);
    const row = document.createElement("div");
    row.className = "painel-linha";
    row.innerHTML =
      '<div class="painel-linha__info">' +
      "<strong>" +
      bebida.emoji +
      " " +
      bebida.nome +
      "</strong>" +
      "<span>Normal: R$ " +
      formatarPreco(bebida.preco) +
      "</span>" +
      "</div>" +
      '<label class="painel-campo">' +
      "Preço promo R$" +
      '<input type="number" step="0.01" min="0" data-bebida-id="' +
      bebida.id +
      '" value="' +
      (promo.precoPromo || "") +
      '" class="painel-input painel-input--preco">' +
      "</label>" +
      '<label class="painel-check">' +
      '<input type="checkbox" data-bebida-ativo="' +
      bebida.id +
      '" ' +
      (promo.ativo ? "checked" : "") +
      "> Ativa" +
      "</label>";
    formBebidas.appendChild(row);
  });
}

function montarFormCombos() {
  if (!formCombos) return;
  formCombos.innerHTML = "";

  dadosPainel.combos.forEach(function (combo, index) {
    const bloco = document.createElement("fieldset");
    bloco.className = "painel-combo";
    bloco.innerHTML =
      "<legend>Combo " +
      (index + 1) +
      "</legend>" +
      '<label>Nome <input type="text" data-combo-field="nome" data-combo-idx="' +
      index +
      '" value="' +
      combo.nome +
      '"></label>' +
      '<label>Descrição <input type="text" data-combo-field="descricao" data-combo-idx="' +
      index +
      '" value="' +
      (combo.descricao || "") +
      '"></label>' +
      '<label>Preço promo R$ <input type="number" step="0.01" data-combo-field="precoPromo" data-combo-idx="' +
      index +
      '" value="' +
      combo.precoPromo +
      '"></label>' +
      '<label>Preço original R$ <input type="number" step="0.01" data-combo-field="precoOriginal" data-combo-idx="' +
      index +
      '" value="' +
      combo.precoOriginal +
      '"></label>' +
      '<label>ID pizza <input type="number" data-combo-field="pizzaId" data-combo-idx="' +
      index +
      '" value="' +
      combo.pizzaId +
      '"></label>' +
      '<label>ID bebida <input type="number" data-combo-field="bebidaId" data-combo-idx="' +
      index +
      '" value="' +
      combo.bebidaId +
      '"></label>' +
      '<label>Qtd bebida <input type="number" min="1" data-combo-field="quantidadeBebida" data-combo-idx="' +
      index +
      '" value="' +
      (combo.quantidadeBebida || 1) +
      '"></label>' +
      '<label class="painel-check"><input type="checkbox" data-combo-field="ativo" data-combo-idx="' +
      index +
      '" ' +
      (combo.ativo ? "checked" : "") +
      "> Ativo</label>";
    formCombos.appendChild(bloco);
  });
}

function coletarDadosFormulario() {
  formPizzas.querySelectorAll("[data-pizza-id]").forEach(function (input) {
    const id = Number(input.dataset.pizzaId);
    const promo = obterPromoPizza(id);
    promo.precoPromo = parseFloat(input.value) || 0;
  });
  formPizzas.querySelectorAll("[data-pizza-ativo]").forEach(function (chk) {
    const id = Number(chk.dataset.pizzaAtivo);
    obterPromoPizza(id).ativo = chk.checked;
  });

  formBebidas.querySelectorAll("[data-bebida-id]").forEach(function (input) {
    const id = Number(input.dataset.bebidaId);
    const promo = obterPromoBebida(id);
    promo.precoPromo = parseFloat(input.value) || 0;
  });
  formBebidas.querySelectorAll("[data-bebida-ativo]").forEach(function (chk) {
    const id = Number(chk.dataset.bebidaAtivo);
    obterPromoBebida(id).ativo = chk.checked;
  });

  formCombos.querySelectorAll("[data-combo-field]").forEach(function (el) {
    const idx = Number(el.dataset.comboIdx);
    const field = el.dataset.comboField;
    const combo = dadosPainel.combos[idx];
    if (!combo) return;
    if (field === "ativo") combo.ativo = el.checked;
    else if (field === "pizzaId" || field === "bebidaId" || field === "quantidadeBebida") {
      combo[field] = parseInt(el.value, 10) || 0;
    } else if (field === "precoPromo" || field === "precoOriginal") {
      combo[field] = parseFloat(el.value) || 0;
    } else combo[field] = el.value;
  });
}

function salvarPainel() {
  coletarDadosFormulario();
  salvarPromocoes(dadosPainel);
  aviso("Promoções salvas! Veja em Promocoes.html", "sucesso");
}

function resetarPainel() {
  if (!confirm("Restaurar valores padrão das promoções?")) return;
  dadosPainel = resetarPromocoes();
  montarFormPizzas();
  montarFormBebidas();
  montarFormCombos();
  aviso("Valores padrão restaurados.", "sucesso");
}

document.addEventListener("DOMContentLoaded", function () {
  montarFormPizzas();
  montarFormBebidas();
  montarFormCombos();

  document.getElementById("btn-salvar-painel").addEventListener("click", salvarPainel);
  document.getElementById("btn-reset-painel").addEventListener("click", resetarPainel);
});
