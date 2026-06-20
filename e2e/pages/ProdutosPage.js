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

  async verificarProdutoInexistenteNaLista(nome) {

    const tabela = this.page.getByTestId('produto-tabela');
    await expect(tabela.getByText(nome).first()).not.toBeVisible();

  }

  async clicarBotaoEditar(nome) {

    const linha = this.page.getByTestId('produto-tabela').getByRole('row', { name: nome});
    await linha.getByRole('button', {name: 'Editar'}).click();

  }

  async clicarBotaoRemover(nome) {

    const linha = this.page.getByTestId('produto-tabela').getByRole('row', { name: nome});
    this.page.once('dialog', dialog => dialog.accept());
    await linha.getByRole('button', {name: 'Remover'}).click();

  }

  async verificarQuantidadeProduto(nome, quantidade) {

    const linha = this.page.getByTestId('produto-tabela').getByRole('row', { name: nome});
    await expect(linha.getByRole('cell', {name: quantidade, exact: true })).toBeVisible();

  }


}