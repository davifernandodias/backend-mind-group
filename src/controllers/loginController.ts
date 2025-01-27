import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import 'dotenv/config'
import { z } from "zod";
import { loginValidationSchema } from "../validator/validatorSchema";
import { userRepository } from "../repository/userRepository";

export class LoginController {
  async login(req: Request, res: Response) {
    try {
      const validatedData = loginValidationSchema.parse(req.body);

      const { email, password } = validatedData;
      const user = await userRepository.findOne({ where: { email } });
      
      if (!user) {
        return res.status(401).json({ message: "Email não encontrado." });
      }

      const verifyPass = await bcrypt.compare(password, user.password);
      if (!verifyPass) {
        return res.status(401).json({ message: "Senha incorreta." });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '8h' });
      const { password: _, ...userLogin } = user;

      return res.json({
        user: userLogin,
        token: token
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      return res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}
