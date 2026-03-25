import React, { useState } from 'react';
import './Pedido.css';

import { crearPedido } from "../api";
import { useCarrito } from "../context/CarritoContext";

export default function Pedido() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion_entrega: '',
    total: '',
    comentarios: ''
  });
  // const { carrito } = useCarrito();
  const { carrito, limpiarCarrito } = useCarrito();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const enviarPedido = async () => {
  const pedido = {
    productos: carrito,
    cantidad: carrito,
    total: carrito.reduce((acc, p) => acc + Number(p.precio), 0)
  };
  const res = await crearPedido(pedido);

  console.log(res);

  limpiarCarrito();
  alert("Pedido realizado ✅");
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
              name="dirección_entrega" 
              rows="3" 
              value={formData.dirección_entrega} 
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
            <label>Productos:</label>
            
            {carrito.length === 0 ? (
              <p>No hay productos en el carrito</p>
            ) : (
              carrito.map((p, index) => (
                <div key={index}>
                  <h4>{p.nombre}</h4>
                  <p>{p.precio_unidad} €</p>
                  <p>{p.cantidad} Uds.</p>
                  <p>{p.total} €</p>

                </div>
              ))
            )}

            <div className="campo-grupo-total">
            <label>Total €</label>
            <input 
              type="num" 
              name="total" 
              value={formData.total} 
              onChange={handleChange} 
            /></div>
          </div> 
          </div>

            <button className="btn-enviar" onClick={enviarPedido} >Finalizar pedido</button>
          <p className="nota-pie">
            El nombre de tu perfil de Canva no se compartirá. Nunca envíes contraseñas.
          </p>
        </form> 
      </section>
    </>
  );
}