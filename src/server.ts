import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { swaggerUi, swaggerSpec } from "./swagger";
import { authRoutes, productRoutes, userRoutes } from "./routes"; 

AppDataSource.initialize()
  .then(() => {
    const app = express();

    const corsOptions = {
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type, Authorization",
    };

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use(cors(corsOptions));
    app.use(express.json());

    // Use todas as rotas
    app.use(authRoutes);
    app.use(productRoutes);
    app.use(userRoutes);

    const port = process.env.API_PORT || 3001;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error during DataSource initialization", error);
  });
