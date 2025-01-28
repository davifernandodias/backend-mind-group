import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { imageUpload } from "../helper/image-upload";
import { authMiddleware } from "../middlewares/authMiddleware";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Rotas relacionadas a produtos
 */

/**
 * @swagger
 * /products/{userId}:
 *   post:
 *     summary: Cria um produto
 *     tags: [Products]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro na criação do produto
 */
productRoutes.post(
  "/products/:userId",
  imageUpload.single("image"),
  (req, res) => {
    productController.create(req, res);
  }
);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
productRoutes.get("/products", (req, res) => productController.getAll(req, res));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
productRoutes.get("/products/:id", (req, res) => productController.getById(req, res));

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Erro na atualização do produto
 */
productRoutes.put(
  "/products/:id",
  imageUpload.single("image"),
  (req, res) => productController.update(req, res)
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
productRoutes.delete("/products/:id", (req, res) => productController.delete(req, res));

export default productRoutes;
