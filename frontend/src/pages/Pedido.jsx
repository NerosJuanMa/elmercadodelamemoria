import React, { useState } from 'react';
import './Pedido.css';

export default function Pedido() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion_entrega: '',
    total: '',
    comentarios: ''
  });

  // Estos datos vendrían idealmente de tu estado global de carrito
  const productosEnPedido = [
    { id: 5, nombre: "Reloj de Bolsillo Antiguo2", cantidad: 1 },
    { id: 2, nombre: "Cámara Vintage Kodak", cantidad: 1 }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const enviarPedido = (e) => {
    e.preventDefault();
    console.log("Enviando pedido...", formData, productosEnPedido);
    // Aquí conectarías con tu backend: http://localhost:3000/api/pedidos
  };

  return (
    <>
      <section className="title">
        <h2>Formulario de Pedido</h2>
      </section>
    
      <section className="contenedor-pedido-fijo">
        <form className="form-vintage" onSubmit={enviarPedido}>
          
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
            <label>Teléfono</label>
            <input 
              type="tel" 
              name="telefono" 
              value={formData.telefono} 
              onChange={handleChange} 
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

          <div className="seccion-productos">
            <label>Productos</label>
            {productosEnPedido.map((item) => (
              <div key={item.id} className="item-resumen">
                {item.nombre}. Cantidad: {item.cantidad}
              </div>
            ))}
          </div>

           <div className="campo-grupo">
            <label>Total</label>
            <input 
              type="num" 
              name="total" 
              value={formData.total} 
              onChange={handleChange} 
            />
          </div>

          <div className="campo-grupo">
            <label>Comentarios</label>
            <textarea 
              name="comentarios" 
              rows="3" 
              value={formData.comentarios} 
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn-enviar">
            Enviar
          </button>

          <p className="nota-pie">
            El nombre de tu perfil de Canva no se compartirá. Nunca envíes contraseñas.
          </p>
        </form> 
      </section>
    </>
  );
}