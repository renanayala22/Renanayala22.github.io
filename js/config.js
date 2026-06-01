/*
  ==========================================================================
  config.js — CONFIGURE TUDO DA SUA PIZZARIA AQUI
  ==========================================================================
*/

const CONFIG = {
  logo: "img/logo.png",
  nome: "Império Pizzaria",
  slogan: "Massa artesanal, forno a lenha e entrega rápida na sua região.",
  badge: "Aberto · Delivery e retirada",
  horario: "Ter–Dom · 18h às 23h30",
  themeColor: "#222228",

  /* ========== WHATSAPP ========== */
  whatsapp: {
    /*
      Opção 1 — só o número (com 55 + DDD + celular):
      O site monta o link automaticamente.
    */
    numero: "556793117956",

    /*
      Opção 2 — link completo (tem prioridade se preenchido):
      Exemplo: https://wa.me/5511987654321?text=Olá
      Cole aqui o link que o WhatsApp Business gerar.
    */
    link: "",

    texto: "Falar no WhatsApp",
    mensagem: "Olá! Gostaria de fazer um pedido na Império Pizzaria.",
  },

  /* ========== PIX (código para receber — ex: Nubank) ========== */
  banco: {
    nome: "Nubank",
    chavePix: "seu@email.com",
    tipoChavePix: "E-mail",
    instrucoes:
      "Copie o código PIX, pague no app do seu banco e envie o comprovante pelo WhatsApp.",
  },

  /*
    Formas de pagamento aceitas (ative: true/false).
    Edite nome e descrição como quiser.
  */
  formasPagamento: [
    {
      id: "pix",
      ativo: true,
      nome: "PIX",
      descricao: "Aprovação na hora · 5% de desconto (se oferecer, ajuste o texto)",
      icone: "⚡",
    },
    {
      id: "credito",
      ativo: true,
      nome: "Cartão de crédito",
      descricao: "Visa, Mastercard, Elo, Amex — na entrega ou maquininha",
      icone: "💳",
    },
    {
      id: "debito",
      ativo: true,
      nome: "Cartão de débito",
      descricao: "Débito na entrega via maquininha",
      icone: "💳",
    },
    {
      id: "dinheiro",
      ativo: true,
      nome: "Dinheiro",
      descricao: "Pagamento na entrega — tenha troco preparado",
      icone: "💵",
    },
    {
      id: "vale",
      ativo: true,
      nome: "Vale-refeição / alimentação",
      descricao: "Alelo, VR, Ticket, Sodexo, Ben — consulte bandeiras aceitas",
      icone: "🎫",
    },
    {
      id: "wallet",
      ativo: true,
      nome: "Carteiras digitais",
      descricao: "PicPay, Mercado Pago e similar — sob consulta",
      icone: "📱",
    },
  ],
};
