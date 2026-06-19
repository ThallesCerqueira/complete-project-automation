import { expect } from '@playwright/test';

export class ProdutosPage {
  constructor(page) {
    this.page = page;
    
    this.inputNome = page.getByTestId('input-nome');
    this.inputDescricao = page.getByTestId('input-descricao');
    this.inputPreco = page.getByTestId('input-preco');
    this.inputQuantidade = page.getByTestId('input-quantidade');
    this.inputCategoria = page.getByTestId('input-categoria');
    this.botaoAdicionarProduto = page.getByTestId('botao-salvar');

  }

  async acessarTela() {
    await this.page.goto('http://localhost:8081');
  }

  async preencherNome(nome) {
    await this.inputNome.fill(nome);
  }

  async preencherDescricao(descricao) {

    await this.inputDescricao.fill(descricao);

  }

  async preencherPreco(preco) {

    await this.inputPreco.fill(preco);

  }

  async preencherQuantidade(quantidade) {

    await this.inputQuantidade.fill(quantidade);

  }

  async preencherCategoria(categoria) {

    await this.inputCategoria.fill(categoria);

  }

  async clicarBotaoAdicionarProduto() {


    await this.botaoAdicionarProduto.click();

  }

  async verificarProdutoNaLista(nome) {

    const tabela = this.page.getByTestId('produto-tabela');
    await expect(tabela.getByText(nome).first()).toBeVisible();

  }


}