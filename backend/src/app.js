import express from 'express'
import productRoutes from './routes/products.js'
// import cors from 'cors'
import 'dotenv/config'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

// app.use(cors({
//   origin: 'http://localhost:4003',
//   credentials: true
// }))

app.use(express.json())

app.use('/products', productRoutes)

export default app