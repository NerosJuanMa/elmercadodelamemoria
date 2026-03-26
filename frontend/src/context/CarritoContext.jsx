import { createContext, useState, useContext } from "react";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existente = prev.find(p => p.producto_id === producto.producto_id);
      if (existente) {
        // Si ya existe, sumamos la cantidad (sin superar el stock)
        return prev.map(p =>
          p.producto_id === producto.producto_id
            ? { ...p, cantidad: Math.min(p.cantidad + producto.cantidad, p.stock) }
            : p
        );
      }
      return [...prev, producto];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      limpiarCarrito
    }}>
      {children}
    </CarritoContext.Provider>
  );
};