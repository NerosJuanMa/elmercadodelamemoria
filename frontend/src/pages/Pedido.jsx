import React, { useState } from 'react';
import './Pedido.css';

import { crearPedido } from "../api";
import { useCarrito } from "../context/CarritoContext";

export default function Pedido() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion_entrega: '',   // sin tilde, coincide con el backend
    comentarios: ''
  });

  const { carrito, limpiarCarrito } = useCarrito();

  // Total calculado automáticamente desde el carrito
  const total = carrito.reduce((acc, p) => acc + p.precio_unitario * p.cantidad, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const enviarPedido = async (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
      alert("El carrito está vacío. Añade productos antes de hacer el pedido.");
      return;
    }

    // Payload completo que espera el backend
    const pedido = {
      nombre_cliente: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      direccion_entrega: formData.direccion_entrega,
      comentarios: formData.comentarios,
      total: total,
      productos: carrito.map(p => ({
        producto_id: p.producto_id,
        cantidad: p.cantidad,
        precio_unitario: p.precio_unitario
      }))
    };

    try {
      const res = await crearPedido(pedido);
      console.log("Respuesta del backend:", res);

      if (res.success) {
        limpiarCarrito();
        alert("✅ Pedido realizado con éxito");
      } else {
        alert("❌ Error: " + (res.message || "No se pudo procesar el pedido"));
      }
    } catch (err) {
      console.error("Error al enviar pedido:", err);
      alert("❌ Error de conexión con el servidor");
    }
  };

  return (
    <>
      <section className="title">
        <h2>🧾 Formulario de Pedido</h2>
      </section>
    
      <section className="contenedor-pedido-fijo">
        <form className="form-vintage" onSubmit={enviarPedido}>
          <div className='form-grid'>

            <div className="campo-grupo">
              <label>Nombre</label>
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="campo-grupo">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="campo-grupo">
              <label>Dirección</label>
              <textarea 
                name="direccion_entrega"
                rows="3" 
                value={formData.direccion_entrega} 
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="campo-grupo">
              <label>Teléfono</label>
              <input 
                type="tel" 
                name="telefono" 
                value={formData.telefono} 
                onChange={handleChange} 
              />
            </div>

            <div className="campo-grupo-comentarios">
              <label>Comentarios</label>
              <textarea 
                name="comentarios" 
                rows="3" 
                value={formData.comentarios} 
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="seccion-productos">
              <label>Productos en el pedido:</label>
              
              {carrito.length === 0 ? (
                <p>No hay productos en el carrito</p>
              ) : (
                carrito.map((p, index) => (
                  <div key={index} className="linea-producto">
                    <h4>{p.nombre}</h4>
                    <p>Precio unitario: <strong>{p.precio_unitario} €</strong></p>
                    <p>Cantidad: <strong>{p.cantidad} Uds.</strong></p>
                    <p>Subtotal: <strong>{(p.precio_unitario * p.cantidad).toFixed(2)} €</strong></p>
                  </div>
                ))
              )}

              <div className="campo-grupo-total">
                <label>Total €</label>
                <input 
                  type="text" 
                  name="total" 
                  value={total.toFixed(2)}
                  readOnly
                  className="input-total-readonly"
                />
              </div>
            </div>

          </div>

          <button className="btn-enviar" type="submit">
            Finalizar pedido
          </button>

          <p className="nota-pie">
            Tus datos se usarán únicamente para gestionar el pedido.
          </p>
        </form> 
      </section>
    </>
  );
}
