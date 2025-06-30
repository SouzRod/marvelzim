# MarvelZim API

API RESTful para consulta de heróis da Marvel, favoritos e cache, construída com NestJS, Prisma, Redis e PostgreSQL.

## Sumário
- [Descrição](#descrição)
- [Rotas da API](#rotas-da-api)
- [Exemplos de Retorno](#exemplos-de-retorno)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Dependências principais](#dependências-principais)
- [Estrutura dos dados](#estrutura-dos-dados)

---

## Descrição
Este projeto expõe endpoints para listar heróis da Marvel, salvar/remover favoritos e consultar favoritos, utilizando cache Redis e persistência em PostgreSQL. O projeto segue arquitetura limpa, separando domínio, aplicação, infraestrutura e apresentação.

---

## Rotas da API

### Listar heróis (com paginação)
`GET /v1/marvel/heroes?offset=0&limit=10`

### Listar heróis favoritos
`GET /v1/marvel/heroes/favorites`

### Adicionar herói aos favoritos
`POST /v1/marvel/hero/favorite?id=1`

### Remover herói dos favoritos
`DELETE /v1/marvel/hero/favorite?id=1`

---

## Exemplos de Retorno

### Listar heróis
```json
[
  {
    "id": 1,
    "name": "Homem de Ferro",
    "description": "Gênio, bilionário, playboy, filantropo.",
    "thumbnail": "https://url-da-imagem.jpg"
  },
  {
    "id": 2,
    "name": "Capitão América",
    "description": "O primeiro vingador.",
    "thumbnail": "https://url-da-imagem.jpg"
  }
]
```

### Listar favoritos
```json
[
  {
    "id": 2,
    "name": "Capitão América",
    "description": "O primeiro vingador.",
    "thumbnail": "https://url-da-imagem.jpg"
  }
]
```

### Adicionar/Remover favorito
- **POST** e **DELETE** retornam `204 No Content` em caso de sucesso.

---

## Como rodar o projeto

### Pré-requisitos
- Node.js >= 18
- Docker e Docker Compose (opcional, mas recomendado)

### 1. Clonar o repositório
```bash
git clone <repo-url>
cd marvelzim
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Edite o arquivo `.env` conforme necessário (veja variáveis em `docker-compose.yml`).

### 4. Subir infraestrutura (Postgres + Redis) com Docker
```bash
docker-compose up -d
```

### 5. Rodar as migrations do banco
```bash
npm run migrate
```

### 6. Rodar o projeto
- **Desenvolvimento:**
  ```bash
  npm run start:dev
  ```
- **Produção:**
  ```bash
  npm run start:prod
  ```
- **Via Docker:**
  ```bash
  docker-compose up --build
  ```

### 7. Rodar testes
```bash
npm test
```

---

## Dependências principais
- **@nestjs/core**: Framework principal Node.js
- **@prisma/client**: ORM para PostgreSQL
- **ioredis**: Cliente Redis
- **axios**: Requisições HTTP
- **jest**: Testes unitários
- **supertest**: Testes de integração

---

## Estrutura dos dados

### Hero
```ts
class Hero {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
}
```

### PaginationDto
```ts
interface PaginationDto {
  offset: string;
  limit: string;
}
```

---

## Observações
- O cache de listagem de heróis é feito por chave composta de offset/limit.
- Favoritos são persistidos no banco e expostos via endpoint dedicado.
- O projeto segue boas práticas de arquitetura e testes automatizados.

---

## Autor
- Projeto base em NestJS adaptado por Rodrigo
