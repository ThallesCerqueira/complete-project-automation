# Guia de Configuração — CI/CD com GitHub Actions

## Visão geral do pipeline

```
Push / PR aberto
      │
      ▼
┌─────────────────────────────────────┐
│           CI (ci.yml)               │
│                                     │
│  ┌──────────────┐ ┌──────────────┐  │
│  │  Testes      │ │  Testes      │  │  ← Rodam em paralelo
│  │  Backend     │ │  Frontend    │  │
│  └──────┬───────┘ └──────┬───────┘  │
│         └────────┬────────┘         │
│                  ▼                  │
│           ┌────────────┐            │
│           │ Build      │            │  ← Só roda se os testes passarem
│           │ Docker     │            │
│           └────────────┘            │
└─────────────────────────────────────┘
      │
      │ (somente merge na main)
      ▼
┌─────────────────────────────────────┐
│           CD (cd.yml)               │
│                                     │
│  ┌──────────────────────────────┐   │
│  │  Publicar imagens Docker Hub │   │
│  └──────────────┬───────────────┘   │
│                 ▼                   │
│  ┌──────────────────────────────┐   │
│  │  Deploy via SSH no servidor  │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## Passo 1 — Criar repositório no GitHub

```bash
# Na pasta do projeto
git init
git add .
git commit -m "feat: projeto inicial CRUD de produtos"

# Crie o repositório em https://github.com/new
# Depois conecte:
git remote add origin https://github.com/SEU_USUARIO/produto-crud.git
git branch -M main
git push -u origin main
```

Ao fazer o push, o pipeline de CI **já vai rodar automaticamente**.
Acesse: `https://github.com/SEU_USUARIO/produto-crud/actions`

---

## Passo 2 — Configurar Secrets no GitHub

Os secrets são variáveis sensíveis (senhas, tokens, chaves SSH) que o
pipeline usa mas que nunca ficam visíveis no código.

**Onde configurar:**
`GitHub → Seu repositório → Settings → Secrets and variables → Actions → New repository secret`

### Secrets necessários para o CD (deploy):

| Nome do Secret       | O que é                              | Como obter                          |
|----------------------|--------------------------------------|-------------------------------------|
| `DOCKERHUB_USERNAME` | Seu usuário no Docker Hub            | hub.docker.com → seu perfil         |
| `DOCKERHUB_TOKEN`    | Token de acesso do Docker Hub        | Ver Passo 3 abaixo                  |
| `SSH_HOST`           | IP ou domínio do seu servidor        | Painel do seu provedor (VPS)        |
| `SSH_USER`           | Usuário SSH do servidor              | Geralmente `ubuntu` ou `root`       |
| `SSH_PRIVATE_KEY`    | Chave SSH privada para acesso        | Ver Passo 4 abaixo                  |

> ⚠️ O CI (testes) funciona sem nenhum secret.
> Os secrets só são necessários para o CD (deploy).

---

## Passo 3 — Criar token do Docker Hub

1. Acesse https://hub.docker.com
2. Clique no seu avatar → **Account Settings**
3. Vá em **Security → New Access Token**
4. Nome: `github-actions-produto-crud`
5. Permissão: **Read & Write**
6. Copie o token gerado e salve como secret `DOCKERHUB_TOKEN` no GitHub

---

## Passo 4 — Configurar chave SSH para deploy

> Só necessário se você tiver um servidor VPS para fazer deploy.
> Se ainda não tem servidor, pule esta etapa — o CI já funciona sem isso.

```bash
# Na sua máquina local, gere um par de chaves exclusivo para o CI/CD:
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_key

# Isso cria dois arquivos:
# ~/.ssh/github_actions_key       ← PRIVADA (vai para o GitHub Secret)
# ~/.ssh/github_actions_key.pub   ← PÚBLICA (vai para o servidor)

# Copie a chave pública para o servidor:
ssh-copy-id -i ~/.ssh/github_actions_key.pub usuario@IP_DO_SERVIDOR

# Copie o conteúdo da chave PRIVADA:
cat ~/.ssh/github_actions_key
# Cole esse conteúdo no secret SSH_PRIVATE_KEY do GitHub
```

---

## Passo 5 — Preparar o servidor para deploy

```bash
# No servidor (via SSH):
sudo apt update && sudo apt install -y docker.io docker-compose-plugin git

# Clone o repositório
git clone https://github.com/SEU_USUARIO/produto-crud.git ~/produto-crud

# Adicione seu usuário ao grupo docker
sudo usermod -aG docker $USER
```

---

## Como o pipeline funciona na prática

### Fluxo de desenvolvimento com Pull Request

```bash
# 1. Crie uma branch para sua feature
git checkout -b feature/minha-feature

# 2. Faça suas alterações e commit
git add .
git commit -m "feat: adiciona campo de imagem no produto"

# 3. Suba a branch
git push origin feature/minha-feature

# 4. Abra um Pull Request no GitHub
# → O CI roda automaticamente (testes + build)
# → Você vê ✅ ou ❌ antes de mergear

# 5. Após aprovação, merge na main
# → O CD roda automaticamente (publicação + deploy)
```

### Verificar resultado dos testes

Acesse a aba **Actions** no seu repositório:
- 🟢 Verde = todos os testes passaram
- 🔴 Vermelho = algum teste falhou (clique para ver qual)
- 🟡 Amarelo = pipeline ainda em execução

---

## Estrutura final dos arquivos de CI/CD

```
.github/
└── workflows/
    ├── ci.yml    # Testes + Build (roda em push e PRs)
    └── cd.yml    # Deploy (roda só no merge para main)
```

---

## Próximos passos sugeridos

1. **Adicionar testes E2E** com Cypress ou Playwright ao pipeline de CI
2. **Adicionar testes de API** com Newman (Postman CLI) ao pipeline
3. **Notificações** — receber aviso no Slack/Discord quando o deploy falhar
4. **Ambientes separados** — pipeline diferente para staging e produção
