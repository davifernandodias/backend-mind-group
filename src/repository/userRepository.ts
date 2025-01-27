import { AppDataSource } from "../database/data-source"
import { User } from "../models/User"

export const userRepository = AppDataSource.getRepository(User)
