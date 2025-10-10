import { useEffect, useState } from "react"

const API = 'https://dummyjson.com/products/category/smartphones'

export const Movil = () => {
  const [datos, setDatos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getDatos = async () => {
    try {
      const response = await fetch(API)
      if(!response.ok){
        throw new Error("Http erro! status:" + response.status)
      }
      const data = await response.json()
      setDatos(data.products)
      setLoading(false)
    } catch(err){
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getDatos()
  }, [])

  if(loading) {
    return(
      <div>Cargando</div>
    )
  }

  if(error) {
    return(
      <div>Error cargando</div>
    )
  }

  return (
    <div className="container">
      <h3 className="text-center py-4">Movil</h3>
      <div className="row">

        {datos.map((e) => (
        
        <div key={e.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
            <div className="card">
              <div className="card-header"><img className="img-fluid" src={e.thumbnail} alt="" /></div>
              <div className="card-body"><p className="text-center">{e.title}</p></div>
              <div className="card-footer"></div>
            </div>
          </div>

        ))}


      </div>
    </div>
  )
}
