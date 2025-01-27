import express from 'express'
import { AppDataSource } from './database/data-source'

AppDataSource.initialize().then(() => {
  const app = express()

  app.use(express.json())


  const port = process.env.API_PORT 
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}).catch(error => {
  console.error("Error during DataSource initialization", error)
})
