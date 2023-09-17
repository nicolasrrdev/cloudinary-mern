import express from 'express'
import productRoutes from './routes/products.js'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

app.use('/products', productRoutes)

export default app