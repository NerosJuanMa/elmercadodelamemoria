// pages/Items.jsx
import React, { useState } from 'react';
import './Items.css';

import Card from '../components/Card';
// 2. Definir la lista fuera para mejor rendimiento
const listaDeProductos = [
  { id: 1, nombre: "Reloj de Bolsillo Antiguo", categoria: "Relojes", descripcion: "Plata s.XIX.", precio: "120.50", imagen: "https://via.placeholder.com/150?text=Reloj+1" },
  { id: 2, nombre: "Cámara Vintage Kodak", categoria: "Cámaras", descripcion: "Años 70, funcional.", precio: "85.00", imagen: "https://via.placeholder.com/150?text=Camara+2" },
  { id: 3, nombre: "Libro de Cuero", categoria: "Libros", descripcion: "Manuscrito medieval.", precio: "45.00", imagen: "https://via.placeholder.com/150?text=Libro+3" },
  { id: 4, nombre: "Mapa Estelar Antiguo", categoria: "Objetos de colección", descripcion: "Grabado del s.XVII.", precio: "95.00", imagen: "https://via.placeholder.com/150?text=Mapa+4" },
  { id: 5, nombre: "Tintero de Bronce", categoria: "Decoración", descripcion: "Estilo victoriano.", precio: "30.00", imagen: "https://via.placeholder.com/150?text=Tintero+5" },
  { id: 6, nombre: "Brújula de Latón", categoria: "Objetos de colección", descripcion: "Navegación clásica.", precio: "55.00", imagen: "https://via.placeholder.com/150?text=Brujula+6" },
  { id: 7, nombre: "Silla Luis XV", categoria: "Muebles", descripcion: "Madera tallada a mano.", precio: "250.00", imagen: "https://via.placeholder.com/150?text=Silla+7" },
];
export default function Productos() {

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Todas'); // Nuevo estado para categoría
  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };
  //   const productosFiltrados = listaDeProductos.filter(producto =>
  //   producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  // );
//  Lógica de filtrado combinada (Texto + Categoría)
  const productosFiltrados = listaDeProductos.filter(producto => {
    const coincideNombre = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const coincideCategoria = category === 'Todas' || producto.categoria === category;
    
    return coincideNombre && coincideCategoria;
  });

  
  return (
    <>
    <section className="title"><h2>🎁 Ítems</h2></section>
    {/* Sección de búsqueda fija según tus estilos */}
      <section className="filtro_categoria">
        <h2>🔎 Buscar:</h2>
        <input 
          type="text" 
          placeholder="Escribe un nombre..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className="input-busqueda"
        />
      </section>
    
    <section className="contenedor-productos-fijo">
      {/* --- ESTE ES EL GRID INTERNO --- */}
              <section className="grid-productos">
                {productosFiltrados.map(producto => (
                  <Card 
                    key={producto.id} // Siempre usa una 'key' única en React maps
                    nombre={producto.nombre}
                    descripcion={producto.descripcion}
                    precio={producto.precio}
                    imagen={producto.imagen}
                  />
                ))}
              </section>
     
    </section> 

      
      

    </>
    
  );
}