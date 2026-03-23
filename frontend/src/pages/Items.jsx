// pages/Items.jsx
import React, { useState } from 'react';
import './Items.css';
import Card from '../components/Card';

// 1. Datos actualizados con categorías
const listaDeProductos = [
  // --- RELOJES ---
  { id: 1, nombre: "Reloj de Bolsillo Antiguo", categoria: "Relojes", descripcion: "Plata s.XIX, maquinaria a la vista.", precio: "120.50", imagen: "https://via.placeholder.com/150?text=Reloj+1" },
  { id: 8, nombre: "Reloj de Pared Cucú", categoria: "Relojes", descripcion: "Madera de la Selva Negra, tallado a mano.", precio: "185.00", imagen: "https://via.placeholder.com/150?text=Reloj+2" },

  // --- CÁMARAS ---
  { id: 2, nombre: "Cámara Vintage Kodak", categoria: "Cámaras", descripcion: "Años 70, incluye funda de cuero original.", precio: "85.00", imagen: "https://via.placeholder.com/150?text=Camara+1" },
  { id: 9, nombre: "Cámara Leica M3", categoria: "Cámaras", descripcion: "Clásica de 35mm, excelente estado óptico.", precio: "450.00", imagen: "https://via.placeholder.com/150?text=Camara+2" },

  // --- LIBROS ---
  { id: 3, nombre: "Libro de Cuero", categoria: "Libros", descripcion: "Manuscrito medieval (réplica), papel pergamino.", precio: "45.00", imagen: "https://via.placeholder.com/150?text=Libro+1" },
  { id: 10, nombre: "Primera Edición Quijote", categoria: "Libros", descripcion: "Edición facsímil con grabados antiguos.", precio: "95.00", imagen: "https://via.placeholder.com/150?text=Libro+2" },

  // --- OBJETOS DE COLECCIÓN ---
  { id: 4, nombre: "Mapa Estelar Antiguo", categoria: "Objetos de colección", descripcion: "Grabado del s.XVII, marco de madera.", precio: "95.00", imagen: "https://via.placeholder.com/150?text=Mapa+1" },
  { id: 6, nombre: "Brújula de Latón", categoria: "Objetos de colección", descripcion: "Navegación clásica, funcional.", precio: "55.00", imagen: "https://via.placeholder.com/150?text=Brujula+1" },
  { id: 11, nombre: "Moneda de Oro Escudo", categoria: "Objetos de colección", descripcion: "Reproducción histórica de alta calidad.", precio: "40.00", imagen: "https://via.placeholder.com/150?text=Moneda+1" },

  // --- DECORACIÓN ---
  { id: 5, nombre: "Tintero de Bronce", categoria: "Decoración", descripcion: "Estilo victoriano con pluma de ave.", precio: "30.00", imagen: "https://via.placeholder.com/150?text=Tintero+1" },
  { id: 12, nombre: "Candelabro de Plata", categoria: "Decoración", descripcion: "Tres brazos, diseño barroco.", precio: "75.00", imagen: "https://via.placeholder.com/150?text=Candelabro+1" },

  // --- MUEBLES ---
  { id: 7, nombre: "Silla Luis XV", categoria: "Muebles", descripcion: "Madera tallada a mano, tapizado seda.", precio: "250.00", imagen: "https://via.placeholder.com/150?text=Silla+1" },
  { id: 13, nombre: "Escritorio Secreter", categoria: "Muebles", descripcion: "Madera de caoba con compartimentos ocultos.", precio: "320.00", imagen: "https://via.placeholder.com/150?text=Mueble+2" },
];

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Todas'); // Nuevo estado para categoría

  // 2. Lógica de filtrado combinada (Texto + Categoría)
  const productosFiltrados = listaDeProductos.filter(producto => {
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
        /></div>
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
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                precio={producto.precio}
                imagen={producto.imagen}
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