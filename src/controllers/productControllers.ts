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

}
