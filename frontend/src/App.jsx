import './App.css'
import FormularioProducto from './components/FormularioProducto'

function App() {
  const handleCrearProducto = (producto) => {
    // console.log('Producto creado:', producto)
  }

  return (

    <div>
      <FormularioProducto onSubmit={handleCrearProducto} />
    </div>

  )

}

export default App