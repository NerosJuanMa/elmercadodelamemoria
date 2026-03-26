// pages/Items.jsx
import React, { useState, useEffect } from 'react';
import './Items.css';
import Card from '../components/Card';
import { getProductos } from "../api";
import { useCarrito } from "../context/CarritoContext";

export default function Productos() {
  const [productos, setProductos] = useState([]); // 👈 estado real
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Todas');
  const { agregarAlCarrito } = useCarrito();

    useEffect(() => {
      getProductos()
        .then(data => {
          console.log("DATOS:", data);
          setProductos(data.data); // 👈 🔥 ESTA ES LA CLAVE
        })
        .catch(err => console.error(err));
    }, []);
  // 🔎 Filtro
    const productosFiltrados = productos.filter(producto => {
    // const productosFiltrados = (productos || []).filter(producto => {
    const coincideNombre = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const coincideCategoria = category === 'Todas' || producto.categoria === category;
    
    return coincideNombre && coincideCategoria;
  });

  return (
    <>
      <section className="title"><h2>🎁 Ítems</h2></section>
      
      <section className="filtro_categoria">
        <div className='buscar'>
          <h3>🔎</h3>
          <input 
            type="text" 
            placeholder="Nombre del tesoro..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-busqueda"
          />
        </div>

        <div className='categoria'>
          <h3>Categoría:</h3>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="select-categoria"
          >
            <option value="Todas">Todas las categorías</option>
            <option value="Muebles">Muebles</option>
            <option value="Relojes">Relojes</option>
            <option value="Libros">Libros</option>
            <option value="Decoración">Decoración</option>
            <option value="Cámaras">Cámaras</option>
            <option value="Objetos de colección">Objetos de colección</option>
          </select>
        </div>
      </section>
    
      <section className="contenedor-productos-fijo">
        <section className="grid-productos">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map(producto => (
              <Card 
                key={producto.id}
                id={producto.id}
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                precio={producto.precio_unidad}
                imagen={producto.imagen}
                stock={producto.stock}
                cantidad={producto.cantidad}
                onAdd={() => agregarAlCarrito(producto)} // 👈 🔥
              />
            ))
          ) : (
            <p className="no-results">No se encontraron tesoros con esos filtros.</p>
          )}
        </section>
      </section> 
    </>
  );
}