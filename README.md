
<body>
    <h1>Sistema de Gerenciamento de Estoque - Backend</h1>
<p>Este backend é uma API para gerenciamento de estoque. Ela oferece funcionalidades como cadastro de usuários, autenticação, além de permitir o cadastro, edição, exclusão e visualização de produtos, incluido imagem e outros detalhes.</p>
    <hr>
    <div class="section">
        <h2>Tecnologias Utilizadas</h2>
        <p>O backend foi desenvolvido com as seguintes tecnologias:</p>
        <ul>
            <li><strong>Node.js</strong>: Ambiente de execução JavaScript para backend.</li>
            <li><strong>Express</strong>: Framework web rápido e minimalista para Node.js.</li>
            <li><strong>TypeORM</strong>: ORM para TypeScript e JavaScript (ES7+).</li>
            <li><strong>MySQL</strong>: Banco de dados relacional.</li>
            <li><strong>Docker Compose</strong>: Ferramenta para definir e gerenciar contêineres Docker.</li>
        </ul>
    </div>
    <div class="section">
        <h2>Schema</h2>
        <img src="https://github.com/user-attachments/assets/c4137598-cc88-4d8a-817f-df2721142de3" alt="Schema">
    </div>
    <div class="section">
        <h2>Pré-requisitos</h2>
        <p>Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:</p>
        <ul>
            <li><a href="https://nodejs.org/" target="_blank">Node.js</a></li>
            <li><a href="https://www.docker.com/" target="_blank">Docker</a></li>
            <li><a href="https://docs.docker.com/compose/" target="_blank">Docker Compose</a></li>
            <li><a href="https://www.npmjs.com/" target="_blank">npm</a> ou <a href="https://yarnpkg.com/" target="_blank">yarn</a></li>
        </ul>
    </div>
    <div class="section">
        <h2>Como rodar o projeto</h2>
        <p>Siga os passos abaixo para configurar e executar o backend:</p>
        <h3>1. Clone o repositório</h3>
        <pre>
git clone https://github.com/davifernandodias/backend-mind-group
          
cd backend-mind-group
        </pre>
        <h3>2. Instale as dependências</h3>
        <pre>npm install</pre>
        <h3>3. Configure o banco de dados com Docker</h3>
        <p>Inicie o contêiner MySQL utilizando o Docker Compose:</p>
        <pre>npm run docker:up</pre>
        <h3>4. Crie e execute as migrações</h3>
        <p>Gere as migrações necessárias para o banco de dados:</p>
        <pre>npm run migration:generate</pre>
        <p>Em seguida, execute as migrações para configurar as tabelas:</p>
        <pre>npm run migration:run</pre>
        <h3>5. Inicie o servidor</h3>
        <p>Execute o servidor em modo de desenvolvimento:</p>
        <pre>npm run dev</pre>
       <pre>para consumir essa api no frontend, lembre de configurar a rota do cors para bater na url que está sendo exposta no front</pre>
    </div>
    <div class="section">
        <h2>Estrutura do Projeto</h2>
        <p>A estrutura de diretórios do projeto é a seguinte:</p>
        <pre>
src/
├── controllers/        # Controladores responsáveis por lidar com as requisições
├── helper/             # Funções auxiliares tratamento de imagem
├── middleware/         # Middlewares da aplicação
├── migrations/         # Arquivos de migração para o banco de dados
├── models/             # Definições das entidades do TypeORM
├── repository/         # Repositórios para lidar com os dados
├── types/              # Definições de tipos personalizados
├── validator/          # Validações dos dados
└── data-source.ts      # Configuração da conexão com o banco de dados
        </pre>
    </div>
    <div class="section">
        <h2>Endpoints</h2>
        <p>A API possui os seguintes endpoints:</p>
        <img src="https://github.com/user-attachments/assets/620c3b6d-1042-4382-abc0-7b8d25d84c4b" alt="Endpoints">
    </div>
</body>
</html>
