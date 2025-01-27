import { Request, Response } from "express"
import { productRepository } from "../repository/productRepository"
import { userRepository } from "../repository/userRepository"

export class ProductController {

  async create(req: Request, res: Response) {
    const { name, description, price, image } = req.body;
    console.log(name, description, price, image); // Adicione isso para ver se os dados estão corretos
    const userId = req.user.id; // Pega o ID do usuário autenticado
    
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Salvando o produto no banco
    const newProduct = productRepository.create({
      name,
      description,
      price,
      image: image ? image : null,  // Verificando se a imagem foi enviada
      user: user,
    });

    await productRepository.save(newProduct);
    return res.status(201).json(newProduct); // Retorna o produto criado
  }
  

  async getAll(req: Request, res: Response) {
    const products = await productRepository.find()
    return res.json(products)
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    const product = await productRepository.findOneBy({ id: Number(id) })
    console.log(product)
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" })
    }
    console.log(product)
    return res.json(product)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, description, price, image } = req.body

    let product = await productRepository.findOneBy({ id: Number(id) })
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" })
    }

    product = { ...product, name, description, price, image: image || product.image }
    await productRepository.save(product)

    return res.json(product)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const product = await productRepository.findOneBy({ id: Number(id) })
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" })
    }

    await productRepository.remove(product)
    return res.status(204).json()  
  }
}
