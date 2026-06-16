# CRUD de Produtos — Projeto Base para CI/CD e QA

Aplicação fullstack para gerenciamento de produtos de e-commerce.
Projeto criado como base de estudos para **automação de testes e CI/CD**.

## Stack

| Camada    | Tecnologia              |
|-----------|-------------------------|
| Backend   | Node.js + Express       |
| Banco     | PostgreSQL 16           |
| Frontend  | React + Vite            |
| Servidor  | Nginx (produção)        |
| Container | Docker + Docker Compose |

## Estrutura do projeto

```
produto-crud/
├── backend/
│   ├── src/
│   │   ├── app.js                  # Configuração do Express
│   │   ├── server.js               # Inicialização do servidor
│   │   ├── controllers/
│   │   │   └── produtoController.js
│   │   ├── routes/
│   │   │   └── produtoRoutes.js
│   │   ├── db/
│   │   │   ├── pool.js             # Conexão com o PostgreSQL
│   │   │   └── init.sql            # Criação da tabela + seed
│   │   └── __tests__/
│   │       └── produtos.test.js    # Testes de integração (Jest + Supertest)
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── ProdutoForm.jsx
│   │   │   └── ProdutoList.jsx
│   │   ├── services/
│   │   │   └── produtoService.js   # Chamadas para a API
│   │   └── __tests__/
│   │       ├── ProdutoForm.test.jsx
│   │       ├── ProdutoList.test.jsx
│   │       └── App.test.jsx        # Testes com mock da API
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml              # Ambiente de desenvolvimento/produção
├── docker-compose.test.yml         # Ambiente de testes (CI)
└── README.md
```

## Endpoints da API

| Método | Rota                | Descrição              |
|--------|---------------------|------------------------|
| GET    | /health             | Health check           |
| GET    | /api/produtos       | Listar todos           |
| GET    | /api/produtos/:id   | Buscar por ID          |
| POST   | /api/produtos       | Criar novo produto     |
| PUT    | /api/produtos/:id   | Atualizar produto      |
| DELETE | /api/produtos/:id   | Remover produto        |

### Exemplo de payload (POST/PUT)

```json
{
  "nome": "Notebook Gamer",
  "descricao": "16GB RAM, placa dedicada",
  "preco": 4500.00,
  "quantidade": 10,
  "categoria": "Eletrônicos"
}
```

---

## Como rodar

### Com Docker (recomendado)

```bash
# Sobe todos os serviços: Postgres + Backend + Frontend
docker compose up --build

# Acesse:
# Frontend → http://localhost
# API      → http://localhost:3001/api/produtos
```

### Localmente (sem Docker)

**Pré-requisitos:** Node.js 20+, PostgreSQL rodando localmente.

```bash
# 1. Configure o banco
psql -U postgres -c "CREATE DATABASE produtos_db;"
psql -U postgres -d produtos_db -f backend/src/db/init.sql

# 2. Backend
cd backend
cp .env.example .env   # edite com suas credenciais
npm install
npm run dev            # http://localhost:3001

# 3. Frontend (outro terminal)
cd frontend
npm install
npm run dev            # http://localhost:5173
```

---

## Como rodar os testes

### Backend (Jest + Supertest)

```bash
# Localmente (precisa de um Postgres de teste rodando)
cd backend
npm test

# Via Docker (banco isolado, sem dependências locais)
docker compose -f docker-compose.test.yml run --rm backend_test
```

### Frontend (Vitest + Testing Library)

```bash
# Localmente
cd frontend
npm test

# Via Docker
docker compose -f docker-compose.test.yml run --rm frontend_test
```

---

## Próximos passos de CI/CD

1. **GitHub Actions** — Pipeline que roda os testes automaticamente a cada push
2. **Testes E2E** — Cypress ou Playwright testando o fluxo completo no browser
3. **Testes de API** — Postman/Newman cobrindo todos os endpoints
4. **Deploy automático** — Publicar a imagem Docker no Railway, Render ou VPS

---

## data-testid disponíveis (para automação E2E)

| Seletor                     | Elemento                        |
|-----------------------------|---------------------------------|
| `produto-form`              | Formulário de produto           |
| `input-nome`                | Campo Nome                      |
| `input-descricao`           | Campo Descrição                 |
| `input-preco`               | Campo Preço                     |
| `input-quantidade`          | Campo Quantidade                |
| `input-categoria`           | Campo Categoria                 |
| `botao-salvar`              | Botão salvar/adicionar          |
| `botao-cancelar`            | Botão cancelar edição           |
| `produto-tabela`            | Tabela de produtos              |
| `produto-linha-{id}`        | Linha de um produto específico  |
| `botao-editar-{id}`         | Botão editar produto            |
| `botao-remover-{id}`        | Botão remover produto           |
| `lista-vazia`               | Mensagem de lista vazia         |
| `carregando`                | Indicador de carregamento       |
| `mensagem-erro`             | Mensagem de erro global         |
| `mensagem-sucesso`          | Mensagem de sucesso             |
| `form-erro`                 | Erro de validação no formulário |
