import { Request, Response } from "express";
import { userRepository } from "../repository/userRepository";
import { userValidationSchema } from "../validator/validatorSchema";
import { z } from "zod";

export class UserController {

  async create(req: Request, res: Response) {
    try {
      const validatedData = userValidationSchema.parse(req.body);

      const { email, firstName, lastName, password } = validatedData;
      
      const newUser = userRepository.create({
        email,
        firstName,
        lastName,
        password,
      });
      
      await userRepository.save(newUser);

      return res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  
}
