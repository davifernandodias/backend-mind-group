import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api Sistema de estoque",
      version: "1.0.0",
      description: "Documentação da api case sistema de estoque",
    },
    servers: [
      {
        url: "http://localhost:8080", // URL do seu servidor
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Apontando para os arquivos de rotas
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };
