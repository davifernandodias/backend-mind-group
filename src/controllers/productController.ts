import { Request, Response } from "express";
import { productRepository } from "../repository/productRepository";
import { userRepository } from "../repository/userRepository";
import { z } from "zod";
import path from "path";
import fs from "fs";
import { productValidationSchema } from "../validator/validatorSchema";

export class ProductController {
    async create(req: Request, res: Response) {
      try {
              console.log(req.body)

        const validatedData = productValidationSchema.parse(req.body)
        const { name, description, price } = validatedData;
        const userId = req.user.id;
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
          return res.status(404).json({ message: "Usuário não encontrado" });

        }
        if (!req.file) {
          return res.status(400).json({ message: "Imagem do produto é obrigatória." });
        }
    
    
        const imagePath = path.join(__dirname, `../../public/images/products/${req.file.filename}`);
        const imageBuffer = fs.readFileSync(imagePath);
    
        const newProduct = productRepository.create({
          name,
          description,
          price,
          image: imageBuffer,  
          user: user,
        });
    
        await productRepository.save(newProduct);
        return res.status(201).json(newProduct);
      }catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ errors: error.errors });
        }
    
        return res.status(500).json({ message: "Erro interno no servidor" });
      }

    }

  async getAll(req: Request, res: Response) {
    try {
      const products = await productRepository.find();
  
      const productsWithImageBase64 = products.map(product => {
        if (product.image) {
          const imageBase64 = product.image.toString('base64');  
          return { ...product, image: imageBase64 };  
        }
        return product;
      });
  
      return res.json(productsWithImageBase64);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      return res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const product = await productRepository.findOneBy({ id: Number(id) });
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
  
    const imageBase64 = product.image ? product.image.toString('base64') : null;
  
    return res.json({
      ...product,
      image: imageBase64, 
    });
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const userId = req.user.id;
  
    const productId = Number(id);
  
    if (isNaN(productId)) {
      return res.status(400).json({ message: "ID inválido" });
    }
  
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  
    const product = await productRepository.findOne({ where: { id: productId }, relations: ["user"] });
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
  
    if (req.file) {
      const imagePath = path.join(__dirname, `../../public/images/products/${req.file.filename}`);
      const imageBuffer = fs.readFileSync(imagePath);
  
      product.image = imageBuffer;
    }
  
    product.name = name;
    product.description = description;
    product.price = price;
  
    await productRepository.save(product);
  
    return res.status(200).json(product);
  }
  
  
  
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const product = await productRepository.findOneBy({ id: Number(id) });
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    await productRepository.remove(product);
    return res.status(204).json();
  }
}
