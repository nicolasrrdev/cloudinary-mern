import express from 'express'
import productRoutes from './routes/products.js'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use(cors({
  origin: 'http://localhost:5173' || process.env.FRONT_URL,
  credentials: true
}))

app.use(express.json())

app.use('/products', productRoutes)

export default app