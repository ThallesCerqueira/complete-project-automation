// Generated from: tests/features/produtos.feature
import { test } from "../../../support/fixtures.js";

test.describe('Cadastro de produtos', () => {

  test('Adicionar um produto com sucesso', async ({ Given, When, Then, And, page, produtoCriado }) => { 
    await Given('acesso a tela de produtos', null, { page }); 
    await When('preencho o nome do produto com "Notebook Gamer"', null, { page, produtoCriado }); 
    await And('preencho a descricao do produto com "Melhor notebook para jogos"', null, { page }); 
    await And('preencho o preco do produto com "1500"', null, { page }); 
    await And('preencho a quantidade com "1"', null, { page }); 
    await And('preencho a categoria com "Informática"', null, { page }); 
    await And('clico no botao adicionar produto', null, { page }); 
    await Then('vejo "Notebook Gamer" na listagem de produtos', null, { page }); 
  });

  test('Editar um produto com sucesso', async ({ Given, When, Then, And, page, produtoCriado, request }) => { 
    await Given('que existe um produto "Notebook Gamer" cadastrado', null, { produtoCriado, request }); 
    await And('acesso a tela de produtos', null, { page }); 
    await When('clico no botao Editar do produto "Notebook Gamer"', null, { page, produtoCriado }); 
    await And('altero a quantidade do produto para "100"', null, { page }); 
    await And('clico no botao salvar alteracoes', null, { page }); 
    await Then('vejo que a quantidade do produto "Notebook Gamer" mudou para "100"', null, { page, produtoCriado }); 
  });

});

// == technical section ==

test.afterEach('AfterEach Hooks', ({ $runScenarioHooks, produtoCriado, request }) => $runScenarioHooks('after', { produtoCriado, request }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/produtos.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given acesso a tela de produtos","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When preencho o nome do produto com \"Notebook Gamer\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Notebook Gamer\"","children":[{"start":32,"value":"Notebook Gamer","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"And preencho a descricao do produto com \"Melhor notebook para jogos\"","stepMatchArguments":[{"group":{"start":36,"value":"\"Melhor notebook para jogos\"","children":[{"start":37,"value":"Melhor notebook para jogos","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"And preencho o preco do produto com \"1500\"","stepMatchArguments":[{"group":{"start":32,"value":"\"1500\"","children":[{"start":33,"value":"1500","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"And preencho a quantidade com \"1\"","stepMatchArguments":[{"group":{"start":26,"value":"\"1\"","children":[{"start":27,"value":"1","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And preencho a categoria com \"Informática\"","stepMatchArguments":[{"group":{"start":25,"value":"\"Informática\"","children":[{"start":26,"value":"Informática","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And clico no botao adicionar produto","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then vejo \"Notebook Gamer\" na listagem de produtos","stepMatchArguments":[{"group":{"start":5,"value":"\"Notebook Gamer\"","children":[{"start":6,"value":"Notebook Gamer","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":17,"pickleLine":13,"tags":[],"steps":[{"pwStepLine":18,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given que existe um produto \"Notebook Gamer\" cadastrado","stepMatchArguments":[{"group":{"start":22,"value":"\"Notebook Gamer\"","children":[{"start":23,"value":"Notebook Gamer","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"And acesso a tela de produtos","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When clico no botao Editar do produto \"Notebook Gamer\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Notebook Gamer\"","children":[{"start":34,"value":"Notebook Gamer","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And altero a quantidade do produto para \"100\"","stepMatchArguments":[{"group":{"start":36,"value":"\"100\"","children":[{"start":37,"value":"100","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And clico no botao salvar alteracoes","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then vejo que a quantidade do produto \"Notebook Gamer\" mudou para \"100\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Notebook Gamer\"","children":[{"start":34,"value":"Notebook Gamer","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":61,"value":"\"100\"","children":[{"start":62,"value":"100","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end