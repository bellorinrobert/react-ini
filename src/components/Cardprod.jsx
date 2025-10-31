import { Link } from "react-router-dom"
import ModalProd from "./ModalProd"


const Cardprod = ({ item }) => {

    const handleAgregar = () => {
        // alert("Agregar")
        
    }
     

    return (
        <div  className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
            <div className="card h-100">
                <div className="card-header">
                     {/* 🔹 Badge de cantidad si está en carrito */}
                    
                    <img className="img-fluid" src={item.thumbnail} alt="" />
                    </div>
                <div className="card-body text-center">
                    <p className="fs-5">
                        {item.title}<br />
                        <span className="small">{item.brand}</span>
                    </p>
                    <p className="badge text-bg-info">
                        Precio: {item.price}
                    </p>
                </div>
                <div className="card-footer text-center">
                    <a href="#" className="btn btn-outline-info btn-sm me-2" data-bs-toggle="modal" data-bs-target={`#${item.id}`}>Modal</a>
                    
                    <Link to={`/detalle/${item.id}/${item.title}`} href="#" className="btn btn-outline-danger btn-sm">
                        Detalle
                    </Link>
                    <hr />
                    <button className="btn btn-success" onClick={handleAgregar}>
                        + Agregar al carrito
                    </button>
                </div>
                
            </div>
            {/* Modal */}
            <ModalProd item={item} />
            

        </div>
    )
}

export default Cardprod