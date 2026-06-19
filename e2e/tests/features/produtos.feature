Feature: Cadastro de produtos

    Scenario: Adicionar um produto com sucesso
        Given acesso a tela de produtos
        When preencho o nome do produto com "Notebook Gamer"
        And preencho a descricao do produto com "Melhor notebook para jogos"
        And preencho o preco do produto com "1500"
        And preencho a quantidade com "1"
        And preencho a categoria com "Informática"
        And clico no botao adicionar produto
        Then vejo "Notebook Gamer" na listagem de produtos