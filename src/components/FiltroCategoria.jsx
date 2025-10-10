
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const API = 'https://dummyjson.com/products/categories'

const FiltroCategoria = () => {
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
        <div>
            {datos.map((e, i) => (
                
                <li key={i}><Link to={`/categorias/${e.slug}/${e.name}`} class="dropdown-item" href="#">{e.name}</Link></li>

            ))}
        </div>
    )
}

export default FiltroCategoria