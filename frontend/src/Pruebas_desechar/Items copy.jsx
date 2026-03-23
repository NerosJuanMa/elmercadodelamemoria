// pages/Items.jsx
// import './Items.css';

// import Card from '../components/Card';

export default function Productos() {
  const productoEjemplo = {
    nombre: "Reloj de Bolsillo Antiguo",
    descripcion: "Reloj de plata del siglo XIX, funciona perfectamente.",
    precio: "120.50",
    imagen: "https://via.placeholder.com/150"
  };

  return (
    <>
    <section className="title"><h2>🎁 Productos</h2></section>
    <section className="filtro_categoria"><h2>🔎Filtrar Categoría:</h2></section>

    
    <section className="catalogo">
      <Card 
        nombre={productoEjemplo.nombre}
        descripcion={productoEjemplo.descripcion}
        precio={productoEjemplo.precio}
        imagen={productoEjemplo.imagen}
      />
    </section> 

      <section className='card_items'>
            <section className="card_productos">
            <section className="producto">
                <p>Producto1</p>
                <Card 
        nombre={productoEjemplo.nombre}
        descripcion={productoEjemplo.descripcion}
        precio={productoEjemplo.precio}
        imagen={productoEjemplo.imagen}
      />
            </section>
        </section>
        <section className="card_productos">
            <section className="producto">
                <p>Producto2</p>
                <Card 
        nombre={productoEjemplo.nombre}
        descripcion={productoEjemplo.descripcion}
        precio={productoEjemplo.precio}
        imagen={productoEjemplo.imagen}
      />
            </section>
        </section>
        <section className="card_productos">
            <section className="producto">
                <p>Producto3</p>
                <Card 
        nombre={productoEjemplo.nombre}
        descripcion={productoEjemplo.descripcion}
        precio={productoEjemplo.precio}
        imagen={productoEjemplo.imagen}
      />
            </section>
        </section>  
     </section>   

    </>
    
  );
}