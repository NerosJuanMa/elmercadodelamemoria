// import React from 'react';
// import Card from '../components/Card';
// import '../components/Catalogo.css'; 
// Datos de ejemplo (normalmente vendrían de una API)
const listaDeProductos = [
  { id: 1, nombre: "Reloj de Bolsillo Antiguo", descripcion: "Plata s.XIX.", precio: "120.50", imagen: "https://via.placeholder.com/150?text=Reloj+1" },
  { id: 2, nombre: "Cámara Vintage Kodak", descripcion: "Años 70, funcional.", precio: "85.00", imagen: "https://via.placeholder.com/150?text=Camara+2" },
  { id: 3, nombre: "Libro de Cuero", descripcion: "Manuscrito medieval (réplica).", precio: "45.00", imagen: "https://via.placeholder.com/150?text=Libro+3" },
  { id: 4, nombre: "Mapa Estelar Antiguo", descripcion: "Grabado del s.XVII.", precio: "95.00", imagen: "https://via.placeholder.com/150?text=Mapa+4" },
  { id: 5, nombre: "Tintero de Bronce", descripcion: "Estilo victoriano.", precio: "30.00", imagen: "https://via.placeholder.com/150?text=Tintero+5" },
  { id: 6, nombre: "Brújula de Latón", descripcion: "Navegación clásica.", precio: "55.00", imagen: "https://via.placeholder.com/150?text=Brujula+6" },
];

export default function PaginaProductos() {
  return (
    <div className="pagina-catalogo">
      <header>
        <h1>Catálogo de Tesoros</h1>
        <p>Explora nuestra colección sin moverte de la página.</p>
      </header>

      {/* --- ESTE ES EL CONTENEDOR FIJO QUE HACE SCROLL --- */}
      <main className="contenedor-productos-fijo">
        
        {/* --- ESTE ES EL GRID INTERNO --- */}
        <section className="grid-productos">
          {listaDeProductos.map(producto => (
            <Card 
              key={producto.id} // Siempre usa una 'key' única en React maps
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              imagen={producto.imagen}
            />
          ))}
        </section>
        
      </main>

      <footer>
        <p>Fin del catálogo - El Mercado de la Memoria</p>
      </footer>
    </div>
  );
}