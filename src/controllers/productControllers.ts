import { Request, Response } from "express"
import { productRepository } from "../repository/productRepository"
import { userRepository } from "../repository/userRepository"

export class ProductController {

  async create(req: Request, res: Response) {
    const { name, description, price, image } = req.body
    const { userId } = req.params

    const user = await userRepository.findOneBy({ id: Number(userId) })
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    const newProduct = productRepository.create({
      name,
      description,
      price,
      image: image || null,
      user: user
    })

    await productRepository.save(newProduct)
    return res.status(201).json(newProduct)
  }

  async getAll(req: Request, res: Response) {
    const products = await productRepository.find()
    return res.json(products)
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    const product = await productRepository.findOneBy({ id: Number(id) })
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" })
    }
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


}
