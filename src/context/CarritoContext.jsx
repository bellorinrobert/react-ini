// src/context/CarritoContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el contexto
const CarritoContext = createContext();

// 2. Hook personalizado para usar el contexto
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  }
  return context;
};

// 3. Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  // Inicializar desde localStorage
  const getInitialCart = () => {
    try {
      const saved = localStorage.getItem('carrito');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error al cargar el carrito:', e);
      return [];
    }
  };

  const [carrito, setCarrito] = useState(getInitialCart);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Funciones del carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

const eliminarDelCarrito = (id) => {
  if (window.confirm("¿Está seguro de que desea eliminar este producto?")) {
    setCarrito(prev => prev.filter(item => item.id !== id));
  }
};

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCarrito(prev =>
      prev.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const vaciarCarrito = () => {
    if (window.confirm('¿Está seguro de que desea vaciar el carrito?')) {
      setCarrito([]);
    }
  };

  const enviarPedido = async () => {
    if (!window.confirm('¿Desea finalizar la compra?')) return;
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          products: carrito.map(item => ({
            id: item.id,
            quantity: item.cantidad
          }))
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al enviar');

      alert(`✅ ¡Gracias por su compra!\nID del carrito: ${data.id}`);
      setCarrito([]);
    } catch (error) {
      alert(`❌ Error al procesar la compra:\n${error.message}`);
    }
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
        enviarPedido
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};