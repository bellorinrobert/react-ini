
import { Link } from "react-router-dom";
const Cardprod = ({item}) => {
    return (
        <div className="col-md-4 col-xl-3 mb-3" key={item.id}>
            <div className="card h-100">
                <div className="card-header p-0">
                    <img src={item.thumbnail} alt="" className="img-fluid" />
                </div>
                <div className="card-body text-center">
                    <p className="fs-3">{item.title}</p>
                    <p className="fs-5 text-danger fw-bold">Precio: {item.price}$</p>
                </div>
                <div className="card-footer text-center">
                    <a href="#" className="btn btn-primary btn-sm me-3" data-bs-toggle="modal" data-bs-target={`#${item.id}`}>Modal</a>
                    <Link to={`/detalle/${item.id}/${item.title}`} href="#" className="btn btn-info btn-sm" >Detalle</Link>
                </div>
            </div>

            <div className="modal fade" id={item.id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{item.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={item.thumbnail} alt="" className="img-fluid" />
                                </div>
                                <div className="col-md-8">
                                    <p className="fs-3">{item.title}</p>
                                    <p className="fs-3">Categoria: {item.category}</p>
                                    <p className="fs-3">Marca: {item.brand}</p>
                                    <p className="fs-3">Existencia: {item.stock}</p>
                                    <p className="fs-6">{item.description}</p>
                                    <p className="fs-5 text-danger fw-bold">Precio: {item.price}$</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Cardprod