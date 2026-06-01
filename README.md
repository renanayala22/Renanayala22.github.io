# Pizzaria do Império — Site estático

Este projeto é um site estático simples para uma pizzaria. Instruções rápidas para publicar no GitHub Pages:

- Crie um repositório no GitHub (nome sem espaços recomendado, ex: `pizzaria-no-javascript`).
- Faça push dos arquivos para a branch `gh-pages` ou para `main` e habilite GitHub Pages nas configurações (pasta `/` ou `gh-pages`).
- Para evitar o processamento pelo Jekyll (caso haja nomes que comecem com `_`), já incluí um arquivo `.nojekyll` neste repositório.

Configuração importante

- Número do WhatsApp configurado em `js/config.js` (campo `CONFIG.whatsapp.numero`) — formato: `55` + DDD + telefone (ex: `556793117956`).
- Ajuste `CONFIG` conforme a sua pizzaria: logo, nome, slogan, horário, formas de pagamento e chave PIX.

Testar localmente

Você pode abrir `index.html` no navegador diretamente. Para testar com um servidor local (recomendado), execute no terminal:

```bash
# com Python 3.x
python -m http.server 8080
# então abra http://localhost:8080
```

Deploy rápido

```bash
git init
git add .
git commit -m "Site da Pizzaria do Império"
# crie o repositório remoto e siga as instruções do GitHub para push
```
