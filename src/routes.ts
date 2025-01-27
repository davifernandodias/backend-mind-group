import { Router } from "express";
import { LoginController } from "./controllers/loginController";
import { UserController } from "./controllers/userController";
import { ProductController } from "./controllers/productController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { imageUpload } from "./helper/image-upload";

const routes = Router();
const loginController = new LoginController();
const userController = new UserController();
const productController = new ProductController();

routes.post("/users", (req, res) => userController.create(req, res));

routes.post("/login", (req, res) => loginController.login(req, res));

routes.use(authMiddleware); 

routes.get("/users", (req, res) => userController.getAll(req, res));
routes.get("/users/:id", (req, res) => userController.getById(req, res));
routes.put("/users/:id", (req, res) => userController.update(req, res));
routes.delete("/users/:id", (req, res) => userController.delete(req, res));

routes.post("/products/:userId", 
  imageUpload.single("image"),  
  (req, res) => {
    productController.create(req, res);   
  }
);

routes.get("/products", (req, res) => productController.getAll(req, res));
routes.get("/products/:id", (req, res) => productController.getById(req, res));
routes.put("/products/:id", (req, res) => productController.update(req, res));
routes.delete("/products/:id", (req, res) => productController.delete(req, res));

export default routes;
