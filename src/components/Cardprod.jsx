import { Link } from "react-router-dom"


const Cardprod = ({ item }) => {
    return (
        <div  className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
            <div className="card h-100">
                <div className="card-header"><img className="img-fluid" src={item.thumbnail} alt="" /></div>
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
                </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id={item.id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{item.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-4 mt-1 mb-1">
                                    <img className="img-fluid" src={item.thumbnail} alt={item.title} />
                                </div>
                                <div className="col-md-8">
                                    <h3>{item.title}</h3>
                                    <p>
                                        Marca:{item.brand} <br />
                                        <b>Categoria:</b> {item.category} <br />
                                        Sku: {item.sku} <br />
                                        <b>Stock:</b> {item.stock} <br />
                                    </p>
                                    <p>
                                        {item.description}
                                    </p>
                                    <h4>
                                        Precio: {item.price}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cardprod