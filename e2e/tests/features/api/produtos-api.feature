Feature: Validar criacao de produtos via API
    Scenario: Criação de produto via API com dados corretos
        Given que o sistema esta online
        When envio uma requisicao post com nome "carteira" e preco 100
        Then o sistema me retorna statusCode 201
        And a resposta contem o produto com nome "carteira"
