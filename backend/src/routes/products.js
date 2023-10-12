import express from 'express'
import multer from 'multer'
import cloudinary from '../config.js'
import Product from '../models/Product.js'

const router = express.Router()

const upload = multer({ dest: 'uploads/' })

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'cloudinary-example'
    })
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      imageUrl: result.secure_url,
    })
    await product.save()
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
// Falta validar que no se manden archivos que no sean imágenes
// Validar en el backend la longitud de Nombre y Descripción

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  // Implementa la lógica para actualizar un producto
})

router.delete('/:id', async (req, res) => {
  // Implementa la lógica para eliminar un producto
})

export default router