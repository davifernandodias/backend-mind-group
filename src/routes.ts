import { Router } from 'express'
import { UserController } from './controllers/userControllers'
import { ProductController } from './controllers/productControllers'

const routes = Router()

routes.post('/user', new UserController().create)   
routes.get('/users', new UserController().getAll)  
routes.get('/user/:id', new UserController().getById)  
routes.put('/user/:id', new UserController().update)   
routes.delete('/user/:id', new UserController().delete)

routes.post('/product/:userId', new ProductController().create)  
routes.get('/products', new ProductController().getAll)       
routes.get('/product/:id', new ProductController().getById)     
routes.put('/product/:id', new ProductController().update)     
routes.delete('/product/:id', new ProductController().delete)  

export default routes
