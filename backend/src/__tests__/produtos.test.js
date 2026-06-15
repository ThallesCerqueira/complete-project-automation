const request = require('supertest');
const app = require('../app');
const pool = require('../db/pool');

let produtoIdCriado;

beforeAll(async () => {
  // Garante que a tabela existe antes dos testes
  await pool.query(`
    CREATE TABLE IF NOT EXISTS produtos (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      descricao TEXT,
      preco NUMERIC(10, 2) NOT NULL CHECK (preco >= 0),
      quantidade INTEGER NOT NULL DEFAULT 0 CHECK (quantidade >= 0),
      categoria VARCHAR(100),
      criado_em TIMESTAMP DEFAULT NOW(),
      atualizado_em TIMESTAMP DEFAULT NOW()
    );
  `);
});

afterAll(async () => {
  // Limpa os dados de teste e fecha a conexão
  if (produtoIdCriado) {
    await pool.query('DELETE FROM produtos WHERE id = $1', [produtoIdCriado]);
  }
  await pool.end();
});

describe('GET /health', () => {
  it('deve retornar status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('POST /api/produtos', () => {
  it('deve criar um novo produto com dados válidos', async () => {
  const novoProduto = {
    nome: 'Produto Teste',
    descricao: 'Descrição do produto teste',
    preco: 99.90,
    quantidade: 10,
    categoria: 'Teste',
  };

  const res = await request(app).post('/api/produtos').send(novoProduto);

  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('id');
  expect(res.body.nome).toBe(novoProduto.nome);
  expect(Number(res.body.preco)).toBe(novoProduto.preco);

  produtoIdCriado = res.body.id;

  const consultaBanco = await pool.query('SELECT * FROM produtos WHERE id = $1', [produtoIdCriado]);
  
  expect(consultaBanco.rows.length).toBe(1);
  expect(consultaBanco.rows[0].nome).toBe('Produto Teste');
});

  it('deve retornar 400 ao tentar criar produto sem nome', async () => {
    const res = await request(app).post('/api/produtos').send({ preco: 10 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('deve retornar 400 ao tentar criar produto com preço negativo', async () => {
    const res = await request(app)
      .post('/api/produtos')
      .send({ nome: 'Produto Inválido', preco: -5 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });
});

describe('GET /api/produtos', () => {
  it('deve retornar uma lista de produtos', async () => {
    const res = await request(app).get('/api/produtos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/produtos/:id', () => {
  it('deve retornar o produto criado anteriormente', async () => {
    const res = await request(app).get(`/api/produtos/${produtoIdCriado}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(produtoIdCriado);
  });

  it('deve retornar 404 para um produto inexistente', async () => {
    const res = await request(app).get('/api/produtos/999999');
    expect(res.status).toBe(404);
  });
});

describe('PUT /api/produtos/:id', () => {
  it('deve atualizar um produto existente', async () => {
    const dadosAtualizados = {
      nome: 'Produto Teste Atualizado',
      descricao: 'Nova descrição',
      preco: 149.90,
      quantidade: 20,
      categoria: 'Teste Atualizado',
    };

    const res = await request(app)
      .put(`/api/produtos/${produtoIdCriado}`)
      .send(dadosAtualizados);

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe(dadosAtualizados.nome);
    expect(Number(res.body.preco)).toBe(dadosAtualizados.preco);
  });

  it('deve retornar 404 ao atualizar produto inexistente', async () => {
    const res = await request(app)
      .put('/api/produtos/999999')
      .send({ nome: 'Inexistente', preco: 10 });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/produtos/:id', () => {
  it('deve remover o produto criado', async () => {
    const res = await request(app).delete(`/api/produtos/${produtoIdCriado}`);
    expect(res.status).toBe(204);
  });

  it('deve retornar 404 ao tentar remover produto inexistente', async () => {
    const res = await request(app).delete(`/api/produtos/${produtoIdCriado}`);
    expect(res.status).toBe(404);
  });
});