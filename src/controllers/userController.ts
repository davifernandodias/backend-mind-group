import { Request, Response } from "express";
import { userRepository } from "../repository/userRepository";
import { productRepository } from "../repository/productRepository";
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

  async getAll(req: Request, res: Response) {
    try {
      const users = await userRepository.find();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const user = await userRepository.findOneBy({ id: Number(id) });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
  
      let user = await userRepository.findOneBy({ id: Number(id) });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      const validatedData = userValidationSchema.parse(req.body);
  
      user = { ...user, ...validatedData }; 
  
      await userRepository.save(user);
  
      return res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      return res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  }
  
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await userRepository.findOneBy({ id: Number(id) });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      await productRepository.delete({ user: user });

      await userRepository.remove(user);

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar usuário" });
    }
  }
}
