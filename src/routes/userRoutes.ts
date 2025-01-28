import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/userController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rotas relacionadas aos usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do usuário
 *                   email:
 *                     type: string
 *                     description: Email do usuário
 *                   firstName:
 *                     type: string
 *                     description: Primeiro nome do usuário
 *                   lastName:
 *                     type: string
 *                     description: Sobrenome do usuário
 *                   password:
 *                     type: string
 *                     description: Senha do usuário
 */
userRoutes.get("/users", (req, res) => userController.getAll(req, res));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.get("/users/:id", (req, res) => userController.getById(req, res));

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Primeiro nome do usuário
 *                 minLength: 2
 *                 maxLength: 50
 *               lastName:
 *                 type: string
 *                 description: Sobrenome do usuário
 *                 minLength: 2
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 minLength: 6
 *                 maxLength: 100
 *           examples:
 *             application/json:
 *               value: {
 *                 "firstName": "John",
 *                 "lastName": "Doe",
 *                 "email": "john.doe@example.com",
 *                 "password": "newPassword123"
 *               }
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro na atualização do usuário
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.put("/users/:id", (req, res) => userController.update(req, res));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.delete("/users/:id", (req, res) => userController.delete(req, res));

export default userRoutes;
