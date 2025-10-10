import { useEffect, useState } from "react"
import Cardprod from "../components/Cardprod"

// const API = 'https://dummyjson.com/products?limit=200'
const API='https://dummyjson.com/products?limit=12&skip=';


export const Tienda = () => {
  const [datos, setDatos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  //Paginacion
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)
  const [pagina , setPagina] = useState(50);
  const URI=API+skip;
  const getDatos = async () => {
    try {
      const response = await fetch(URI)

      if (!response.ok) {
        throw new Error("Http erro! status:" + response.status)
      }
      const data = await response.json()
      setDatos(data.products)
      setLoading(false)
      //Paginacion
      setTotal(data.total)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getDatos()
  }, [skip])

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
      <h3 className="text-center py-4">Tienda</h3>
        <div className="card mb-2 p-1">
      <div className="d-flex justify-content-between align-content-center text-black">
          <p className="lead m-0 fw-bold text-sombra text-white">Pagina {Math.floor(skip / pagina) + 1} de {Math.ceil(total / pagina)}</p>
          <nav className="">
            <ul className="pagination m-0">
              <li className="page-item">
                <a className="page-link" href="#"
                  onClick={() => {
                    if (skip >= pagina) {
                      setSkip(skip - pagina);
                    }
                  }}
                >
                  &lt;&lt;
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  {Math.floor(skip / pagina) + 1}
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#"
                  onClick={() => {
                    if (skip + pagina < total) {
                      setSkip(skip + pagina);
                    }
                  }}
                >
                  &gt;&gt;
                </a>
              </li>
            </ul>
          </nav>

        </div>
      </div>
      <div className="row">

        {datos.map((e, index) => (
          
          <Cardprod key={index} item={e} />  

        ))}


      </div>
    </div>
  )
}
