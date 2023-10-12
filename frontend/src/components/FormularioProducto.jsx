import { useState } from 'react'
import axios from 'axios'
import './FormularioProducto.css'

function FormularioProducto() {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imagen, setImagen] = useState(null)
  const [errorNombre, setErrorNombre] = useState('')
  const [errorDescripcion, setErrorDescripcion] = useState('')
  const [errorImagen, setErrorImagen] = useState('')
  const [errorForm, setErrorForm] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleNombreChange = (event) => {
    setNombre(event.target.value)
    setErrorNombre(event.target.value.length < 4 ? 'El nombre debe tener al menos 4 letras' : '')
  }

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value)
  }

  const handleImagenChange = (event) => {
    setImagen(event.target.files[0])
    setErrorImagen(event.target.files.length === 0 ? 'Por favor, seleccione una imagen' : '')
  }

  const displaySuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')
    }, 5000)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (nombre.length < 4 || descripcion.length < 4 || !imagen) {
      setErrorForm('Por favor, complete todos los campos')
      return
    }

    setIsLoading(true)

    const formData = new FormData()
    formData.append('name', nombre)
    formData.append('description', descripcion)
    formData.append('image', imagen)

    try {
      const response = await axios.post('https://nicolasreinales.onrender.com/products', formData)
      console.log('Producto creado:', response.data)
      displaySuccessMessage('Producto creado exitosamente')
      setNombre('')
      setDescripcion('')
      setImagen(null)
      setErrorNombre('')
      setErrorDescripcion('')
      setErrorImagen('')
      setErrorForm('')
      const fileInput = document.getElementById('imagen')
      if (fileInput) {
        fileInput.value = ''
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Error:', error.response.data.message)
      } else {
        console.error('An unexpected error occurred:', error)
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className='container'>
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='nombre'>Nombre:</label>
          <input
            type='text'
            id='nombre'
            value={nombre}
            onChange={handleNombreChange}
          />
          {errorNombre && <span className='error'>{errorNombre}</span>}
        </div>
        <div>
          <label htmlFor='descripcion'>Descripción:</label>
          <textarea
            id='descripcion'
            value={descripcion}
            onChange={handleDescripcionChange}
          />
          {errorDescripcion && <span className='error'>{errorDescripcion}</span>}
        </div>
        <div>
          <label htmlFor='imagen'>Imagen:</label>
          <input
            type='file'
            id='imagen'
            accept='image/*'
            onChange={handleImagenChange}
          />
          {errorImagen && <span className='error'>{errorImagen}</span>}
        </div>
        <div className='error'>{errorForm}</div>
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Realizando Operación...' : 'Crear Producto'}
        </button>
      </form>
      {successMessage && (
      <div className='success-message'>
        {successMessage}
      </div>
      )}
    </div>
  )
}

export default FormularioProducto