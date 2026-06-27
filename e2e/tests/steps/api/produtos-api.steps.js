import { createBdd } from 'playwright-bdd';
import { test } from '../../../support/fixtures.js';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);


// Arquivo para linkagem de frases com metodos
Given('que o sistema esta online', async({request}) => {

    const resposta = await request.get('/health'); 
    expect(resposta.status()).toBe(200);

})

Given('existe um produto criado com nome {string} e preco {int}', async({request, respostaApi}, nome, preco) => {

    const nomeUnico = `${nome} ${Date.now()}`;

    const object = {
        nome: nomeUnico,
        preco: preco
    
    }

    const resposta = await request.post('/api/produtos', {data: object})
    respostaApi.set(resposta);


})

When('envio uma requisicao delete para remover o produto criado', async({request, respostaApi}) => {

    let resposta = await respostaApi.get();
    let jsonG = await resposta.json();
    let id = jsonG.id; 
    resposta = await request.delete(`/api/produtos/${id}`)
    respostaApi.set(resposta);

})

When('envio uma requisicao put para atualizar o produto criado, mudando nome para {string}', async({request, respostaApi}, nomeEdit) => {

    let resposta = await respostaApi.get();
    let jsonG = await resposta.json();
    let id = jsonG.id;
    jsonG.nome = nomeEdit;
    jsonG.preco = parseFloat(jsonG.preco);
    resposta = await request.put(`/api/produtos/${id}`, { data: jsonG})
    respostaApi.set(resposta);

})

When('envio uma requisicao post com nome {string} e preco {int}', async({request, respostaApi}, nome, preco) => {

    const nomeUnico = `${nome} ${Date.now()}`;

    const object = {
        nome: nomeUnico,
        preco: preco
    
    }

    const resposta = await request.post('/api/produtos', {data: object})
    respostaApi.set(resposta);

})

Then('o sistema me retorna statusCode {int}', async({respostaApi}, statusCode) => {

    expect(respostaApi.get().status()).toBe(statusCode);

})

Then('a resposta contem o produto com nome {string}', async({respostaApi}, nome) => {

    let response = await respostaApi.get();
    let body = await response.json();
    expect(body.nome).toContain(nome);

})