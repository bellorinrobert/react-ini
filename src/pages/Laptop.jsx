import { useEffect, useState } from "react"
import Cardprod from "../components/Cardprod"

const API = 'https://dummyjson.com/products/category/laptops'

export const Laptop = ({ carrito, agregarAlCarrito}) => {
  const [datos, setDatos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getDatos = async () => {
    try {
      const response = await fetch(API)
      if (!response.ok) {
        throw new Error("Http erro! status:" + response.status)
      }
      const data = await response.json()
      setDatos(data.products)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getDatos()
  }, [])

  if (loading) {
    return (
      <div>Cargando</div>
    )
  }

  if (error) {
    return (
      <div>Error cargando</div>
    )
  }

  return (
    <div className="container">
      <h3 className="text-center py-4">Laptop</h3>
      <div className="row justify-content-center">

        {datos.map((e, index) => (
          
          <Cardprod key={index} item={e} carrito={carrito} agregarAlCarrito={agregarAlCarrito} />  

        ))}


      </div>
    </div>
  )
}
