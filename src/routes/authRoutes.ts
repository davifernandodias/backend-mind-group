import { Router } from "express";
import { LoginController } from "../controllers/loginController";
import { UserController } from "../controllers/userController";

const authRoutes = Router();
const loginController = new LoginController();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rotas relacionadas à autenticação
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Primeiro nome do usuário (deve ter entre 2 e 50 caracteres)
 *                 minLength: 2
 *                 maxLength: 50
 *               lastName:
 *                 type: string
 *                 description: Sobrenome do usuário (deve ter entre 2 e 50 caracteres)
 *                 minLength: 2
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário (deve ser um email válido)
 *               password:
 *                 type: string
 *                 description: Senha do usuário (deve ter entre 6 e 100 caracteres)
 *                 minLength: 6
 *                 maxLength: 100
 *           examples:
 *             application/json: 
 *               value: {
 *                 "firstName": "John",
 *                 "lastName": "Doe",
 *                 "email": "john.doe@example.com",
 *                 "password": "strongPassword123"
 *               }
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do usuário criado
 *                 firstName:
 *                   type: string
 *                   description: Primeiro nome do usuário
 *                 lastName:
 *                   type: string
 *                   description: Sobrenome do usuário
 *                 email:
 *                   type: string
 *                   description: Email do usuário
 *             examples:
 *               application/json: 
 *                 value: {
 *                   "id": "12345",
 *                   "firstName": "John",
 *                   "lastName": "Doe",
 *                   "email": "john.doe@example.com"
 *                 }
 *       400:
 *         description: Erro na criação do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *             examples:
 *               application/json: 
 *                 value: { "error": "Email já cadastrado" }
 */
authRoutes.post("/users", (req, res) => userController.create(req, res));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Faz o login de um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário (deve ser um email válido)
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *           examples:
 *             application/json: 
 *               value: {
 *                 "email": "john.doe@example.com",
 *                 "password": "strongPassword123"
 *               }
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado
 *             examples:
 *               application/json: 
 *                 value: { "token": "jwt_token_string" }
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *             examples:
 *               application/json: 
 *                 value: { "error": "Credenciais inválidas" }
 */
authRoutes.post("/login", (req, res) => loginController.login(req, res));

export default authRoutes;
