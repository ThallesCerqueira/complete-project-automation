import { createBdd } from 'playwright-bdd';
import { ProdutosPage } from '../../pages/ProdutosPage.js';

const { Given, When, Then } = createBdd();

Given('acesso a tela de produtos', async ({page}) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.acessarTela();

})

When('preencho o nome do produto com {string}', async ({ page }, nome) => {
  const produtosPage = new ProdutosPage(page);
  await produtosPage.preencherNome(nome);
});

When('preencho a descricao do produto com {string}', async({page}, descricao) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.preencherDescricao(descricao);

});

When('preencho o preco do produto com {string}', async({page}, preco) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.preencherPreco(preco);

});

When('preencho a quantidade com {string}', async({page}, quantidade) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.preencherQuantidade(quantidade);

});

When('preencho a categoria com {string}', async({page}, categoria) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.preencherCategoria(categoria);

});

When('clico no botao adicionar produto', async({page}) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.clicarBotaoAdicionarProduto();

});

Then('vejo {string} na listagem de produtos', async({page}, produto) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.verificarProdutoNaLista(produto);

})