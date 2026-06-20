import { createBdd } from 'playwright-bdd';
import { ProdutosPage } from '../../pages/ProdutosPage.js';
import {test} from '../../support/fixtures.js'
import { request } from 'node:http';

const { Given, When, Then, Before, After } = createBdd(test);

After(async ({request, produtoCriado}) => {

    const resposta = await request.get('http://localhost:3001/api/produtos');
    const produtos = await resposta.json();
    const produto = produtos.find(p => p.nome === produtoCriado.get() );

    if(produto) {
        await request.delete(`http://localhost:3001/api/produtos/${produto.id}`)
    }


});

Given('acesso a tela de produtos', async ({page}) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.acessarTela();

})

Given('que existe um produto {string} cadastrado', async({request,produtoCriado}, nome) => {

    const nomeUnico = `${nome} ${Date.now()}`;

    const object = {
        nome: nomeUnico,
        preco: 100
    
    }

    produtoCriado.set(nomeUnico);
    await request.post('http://localhost:3001/api/produtos', {
        data: object
    })

});

When('preencho o nome do produto com {string}', async ({ page, produtoCriado }, nome) => {
  const produtosPage = new ProdutosPage(page);
  produtoCriado.set(nome);
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

When('clico no botao Editar do produto {string}', async({page, produtoCriado}, nomeIgnorado) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.clicarBotaoEditar(produtoCriado.get());

})

When('clico no botao Remover do produto {string}', async({page, produtoCriado}, nomeIgnorado) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.clicarBotaoRemover(produtoCriado.get());

})

Then('o produto {string} nao aparece mais na listagem de produtos', async({page, produtoCriado}, nome) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.verificarProdutoInexistenteNaLista(produtoCriado.get());

})

Then('vejo {string} na listagem de produtos', async({page}, produto) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.verificarProdutoNaLista(produto);

})

When('altero a quantidade do produto para {string}', async({page}, quantidade) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.preencherQuantidade(quantidade);

})

When('clico no botao salvar alteracoes', async({page}) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.clicarBotaoAdicionarProduto();

})

Then('vejo que a quantidade do produto {string} mudou para {string}', async({page, produtoCriado}, nomeIgnorado, quantidade) => {

    const produtosPage = new ProdutosPage(page);
    await produtosPage.verificarQuantidadeProduto(produtoCriado.get(), quantidade);

})