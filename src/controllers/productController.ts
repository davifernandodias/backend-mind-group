import { Request, Response } from "express";
import { productRepository } from "../repository/productRepository";
import { userRepository } from "../repository/userRepository";
import path from "path";
import fs from "fs";

export class ProductController {
  async create(req: Request, res: Response) {
    const { name, description, price } = req.body;
    const userId = req.user.id;

    // Verifica se o usuário existe
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verifica se a imagem foi enviada
    if (!req.file) {
      return res.status(400).json({ message: "Imagem do produto é obrigatória." });
    }

    // Lê a imagem e a converte para buffer
    const imagePath = path.join(__dirname, `../../public/images/products/${req.file.filename}`);
    const imageBuffer = fs.readFileSync(imagePath);

    // Cria o novo produto com a imagem em formato de buffer (BLOB)
    const newProduct = productRepository.create({
      name,
      description,
      price,
      image: imageBuffer,  // Armazena a imagem como um BLOB no banco de dados
      user: user,
    });

    // Salva o produto no banco de dados
    await productRepository.save(newProduct);
    return res.status(201).json(newProduct);
  }

  async getAll(req: Request, res: Response) {
    try {
      const products = await productRepository.find();
  
      // Itera sobre os produtos e converte a imagem em base64 para ser enviada na resposta
      const productsWithImageBase64 = products.map(product => {
        if (product.image) {
          const imageBase64 = product.image.toString('base64');  // Converte a imagem de buffer para base64
          return { ...product, image: imageBase64 };  // Retorna o produto com a imagem em base64
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
  
    // Converte a imagem para base64 caso exista
    const imageBase64 = product.image ? product.image.toString('base64') : null;
  
    return res.json({
      ...product,
      image: imageBase64, 
    });
  }
  async update(req: Request, res: Response) {
    const { id } = req.params; // Obtém o ID do produto a ser atualizado
    const { name, description, price } = req.body;
    const userId = req.user.id;
  
    // Converte o ID de string para número
    const productId = Number(id);
  
    if (isNaN(productId)) {
      return res.status(400).json({ message: "ID inválido" });
    }
  
    // Verifica se o usuário existe
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  
    // Encontra o produto existente usando o ID convertido para número
    const product = await productRepository.findOne({ where: { id: productId }, relations: ["user"] });
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
  
    // Verifica se a imagem foi enviada
    if (req.file) {
      // Lê a nova imagem e converte para buffer
      const imagePath = path.join(__dirname, `../../public/images/products/${req.file.filename}`);
      const imageBuffer = fs.readFileSync(imagePath);
  
      // Atualiza a imagem como um BLOB
      product.image = imageBuffer;
    }
  
    // Atualiza as outras informações do produto
    product.name = name;
    product.description = description;
    product.price = price;
  
    // Salva o produto atualizado no banco de dados
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
