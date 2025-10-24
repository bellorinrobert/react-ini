
import { useEffect, useState } from 'react';
import { formatCurrency, formatNumber } from '../util/funciones';


const CarritoOfCambas = ({carrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito, enviarPedido}) => {
   const [total, setTotal] = useState(0);
   const [totalProductos, setTotalProductos] = useState(0);
      // Calcular total cada vez que cambia el carrito
       useEffect(() => {
           const suma = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
           setTotal(suma);
           setTotalProductos(carrito.length)
       }, [carrito]);

  return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>
      <div className="offcanvas-body">
        {
          carrito.map(
            (item) => (
              
              <div className="card mb-3">
                <div className="card-header text-center p-0">
                  <img src={item.thumbnail} alt={item.title} className="img-fluid" width={150} />
                </div>
                <div className="card-body text-center mb-2">
                  <p className="fs-4">
                    {item.title}
                  </p>
                  <p>
    
                  <b>Precio $: </b>{ formatCurrency(item.price) }
                  </p>
                  <p>
    
                  <b>Cant: </b>{ formatNumber(item.cantidad) }
                  </p>
                  <p>
    
                  <b>Total $: </b>{ formatCurrency(item.cantidad * item.price) }
                  </p>
                </div>
                <div className="card-foot mt-2">
                  <div className="d-flex justify-content-center gap-3 mb-3">
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                        >
                                            + Agregar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                        >
                                            - Restar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => eliminarDelCarrito(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                </div>
              </div>
            )
          )
        }
          <hr />
                            <div className="text-end">
                                <p><strong>Total Cantidad Productos:</strong> {formatNumber(carrito.reduce((acc, item) => acc + item.cantidad, 0))}</p>
                                <p><strong>Total Monto Productos:</strong> {totalProductos}</p>
                                <p><strong>Total a Pagar:</strong> ${formatCurrency(total.toFixed(2))}</p>
                            </div>
                            <hr />
                            <div className="mt-3">
                                <button
                                    className="btn btn-danger w-100 mb-2"
                                    onClick={vaciarCarrito}
                                >
                                    Vaciar Carrito
                                </button>
                                <button onClick={enviarPedido} className="btn btn-primary w-100">
                                📤 Enviar Pedido
                                </button>
                            </div>
      </div>
    </div>
  )
}

export default CarritoOfCambas