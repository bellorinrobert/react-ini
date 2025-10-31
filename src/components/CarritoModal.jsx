import { useEffect, useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { formatCurrency, formatNumber } from "../util/funciones";

const CarritoModal = () => {
    const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, enviarPedido } = useCarrito();
    const [total, setTotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    // Calcular total cada vez que cambia el carrito
    useEffect(() => {
        const suma = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
        setTotal(suma);
        const items = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        setTotalItems(items);
    }, [carrito]);


    return (
        <div className="modal fade" id="carritoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl  ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Detalle de la Compra</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="offcanvas-body">

                            {carrito.length === 0 ? (
                                <p className="text-center">Tu carrito está vacío</p>
                            ) : (
                                <>
                                    <table className="table table-hover">
                                        <thead>
                                            <tr className="text-center">
                                                <th>#</th>
                                                <th >Foto</th>
                                                <th >Producto</th>
                                                <th >Precio</th>
                                                <th >Cantidad</th>
                                                <th >Sub Total</th>
                                                <th >Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carrito.map((item, index) => (

                                             
                                                    <tr key={index}>
                                                        <td >{(index + 1)}</td>
                                                        <td><img src={item.thumbnail} alt={item.title} className="img-fluid mb-2" width={50} /></td>
                                                        <td>{item.title}</td>
                                                        <td>{formatCurrency(item.price)}</td>
                                                        <td className="text-center">{item.cantidad}</td>
                                                        <td className="text-end">${formatCurrency((item.price * item.cantidad).toFixed(2))}</td>
                                                        <td>
                                                            <div className="d-flex justify-content-center gap-3">
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    max={item.stock || 1} // protección
                                                                    value={item.cantidad}
                                                                    onChange={(e) => {
                                                                        const valor = parseInt(e.target.value);
                                                                        // Validar rango
                                                                        if (valor >= 1 && valor <= item.stock) {
                                                                            actualizarCantidad(item.id, valor);
                                                                        } else if (valor > item.stock) {
                                                                            alert(`Solo hay ${item.stock} unidades disponibles.`);
                                                                            actualizarCantidad(item.id, item.stock);
                                                                        } else if (valor < 1) {
                                                                            // Opcional: eliminar si pone 0
                                                                            if (window.confirm("¿Eliminar del carrito?")) {
                                                                                eliminarDelCarrito(item.id);
                                                                            } else {
                                                                                actualizarCantidad(item.id, 1);
                                                                            }
                                                                        }
                                                                    }}
                                                                    className="form-control form-control-sm w-50"
                                                                />
                                                                <button
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    onClick={() => eliminarDelCarrito(item.id)}
                                                                >
                                                                    Eliminar
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>


                                              




                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                 <td colSpan="4" className="text-end">Total:</td>
                                                <td className="text-center">{formatNumber(totalItems.toFixed(2))}</td>
                                                <td className="text-end">${formatCurrency(total.toFixed(2))}</td>
                                                <td ></td>
                                            </tr>
                                        </tfoot>
                                    </table>


                                    <div className="mt-3">

                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button className="btn btn-danger mb-2" onClick={vaciarCarrito}>Vaciar Carrito</button>
                        <button onClick={enviarPedido} className="btn btn-success ">Enviar Pedido</button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarritoModal