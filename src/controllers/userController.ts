import { Request, Response } from "express";
import { userRepository } from "../repository/userRepository";
import { productRepository } from "../repository/productRepository";
import { userValidationSchema } from "../validator/validatorSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";


export class UserController {

  async create(req: Request, res: Response) {
    try {
      console.log(req.body);
      const validatedData = userValidationSchema.parse(req.body);
      
      const { email, firstName, lastName, password } = validatedData;
  
      const existingUser = await userRepository.findOne({ where: { email } });
  
      if (existingUser) {
        return res.status(409).json({ message: "Usuário já existe com este e-mail." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = userRepository.create({
        email,
        firstName,
        lastName,
        password: hashedPassword, 
      });
  
      await userRepository.save(newUser);
  
      // Gerar o token JWT
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_PASS ?? "",  
        { expiresIn: "24h" } 
      );
  
      return res.status(201).json({
        message: "Usuário criado com sucesso!",
        token,  
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        }, 
      });
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
  
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
  
  // Métodos restantes permanecem os mesmos
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
      
      const user = await userRepository.findOneBy({ id: id });
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
  
      let user = await userRepository.findOneBy({ id: id });
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

      const user = await userRepository.findOneBy({ id: id });
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
