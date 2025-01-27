import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import routes from './routes';

AppDataSource.initialize().then(() => {
  const app = express();

  const corsOptions = {
    origin: '*',  
    methods: 'GET,POST,PUT,DELETE',  
    allowedHeaders: 'Content-Type, Authorization', 
  };

  app.use(cors(corsOptions));  
  app.use(express.json());
  app.use(routes);

  const port = process.env.API_PORT;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error("Error during DataSource initialization", error);
});
