import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const API = 'https://dummyjson.com/products/'

export const Detalle = () => {
    const param = useParams()
    const [datos, setDatos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    
    
    const URI = API + param.id

    const getDatos = async () => {

        try {
            
            const response = await fetch(URI)
            if (!response.ok) {
                throw new Error("Http erro! status:" + response.status)
            }
            const data = await response.json()
            
            setDatos(data)
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
            <div className="pt-5 text-end">
                <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)} >
                    Volver
                </button>
            </div>
        <div className="text-center py-4">
              <h4>{datos.title}</h4>
            <div className="row">
                <div className="col-md-4">
                    <img className="img-fluid" src={datos.thumbnail} alt={datos.title} />
                </div>
                <div className="col-md-8">
                    <strong>Descripcion:</strong> {datos.description}

                </div>
            </div>
        </div>

        </div>
    )
}
