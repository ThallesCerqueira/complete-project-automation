import {test as base } from 'playwright-bdd';

export const test = base.extend({

    produtoCriado: async ({}, use) => {

        let nome = null;
        await use({
            set: (valor) => {nome = valor;},
            get: ()=> nome,
        });
    },
});