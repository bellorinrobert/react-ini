import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Cardprod from "../components/Cardprod"

const API = 'https://dummyjson.com/products/category/'

export const Categorias = () => {
  
  const [datos, setDatos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const param = useParams()
  
  const getDatos = async () => {
    try {
      const URI = API + param.cate
      
      const response = await fetch(URI)
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
  }, [param])

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
      <h3 className="text-center py-4">{param.name}</h3>
      <div className="row">

        {datos.map((e, index) => (
          
          <Cardprod key={index} item={e} />  

        ))}


      </div>
    </div>
  )
}
