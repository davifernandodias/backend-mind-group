# Backend Case - Sistema de Estoque


Bem-vindo ao backend do **Sistema de Gerenciamento de Estoque**! Este projeto fornece uma API robusta para gerenciar estoques, permitindo funcionalidades como:

- Cadastro de usuários e autenticação.
- CRUD de produtos (criação, edição, visualização e exclusão).
- Upload de imagens de produtos e outros detalhes personalizados.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

- **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript para backend.
- **[Express](https://expressjs.com/)**: Framework web rápido e minimalista para Node.js.
- **[TypeORM](https://typeorm.io/)**: ORM para TypeScript e JavaScript (ES7+).
- **[MySQL](https://www.mysql.com/)**: Banco de dados relacional.
- **[Docker Compose](https://docs.docker.com/compose/)**: Ferramenta para definir e gerenciar contêineres Docker.
- **[Swagger](https://www.npmjs.com/package/swagger-ui-express)**: Swagger para documentação das rotas.

---

## 📂 Schema

![Schema](https://github.com/user-attachments/assets/c4137598-cc88-4d8a-817f-df2721142de3)

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **[Docker](https://www.docker.com/)**
- **[Docker Compose](https://docs.docker.com/compose/)**

---

## 🚀 Como rodar o projeto

Siga os passos abaixo para configurar e executar o backend:

### 1. Clone o repositório

git clone https://github.com/davifernandodias/backend-mind-group

cd backend-mind-group

### remove .example da .env

### 2. Suba os contêineres com Docker Compose

docker-compose up --build

Acesse a api no contêiner

Caso não saiba o nome do contêiner, execute:

docker ps

Depois, acesse a api com:

docker exec -it {container-name} 

Execute as migrações

No contêiner da API, execute os comandos para gerar e aplicar as migrações:

npm run migration:generate

npm run migration:run

## 3. Acessar documentação das rotas

ápos acesse o [localhost:8080/api-docs](http://localhost:8080/api-docs/)
![Image](https://github.com/user-attachments/assets/f6377a14-9efe-499a-badb-22759e2ff4d3)

