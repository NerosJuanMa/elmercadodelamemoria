// pages/Items.jsx
import './Items.css';
export default function Items() {
  const productoEjemplo = {
    nombre: "Reloj de Bolsillo Antiguo",
    descripcion: "Reloj de plata del siglo XIX, funciona perfectamente.",
    precio: "120.50",
    imagen: "https://via.placeholder.com/150"
  };
  return (
    <>
      <section className="title"><h2>🎁 Productos</h2></section>
      <section className='filtro_categoria'>Filtrar categoría</section>
      <section className="card_item">            
        <section className="card_producto">
          <section className="catalogo">
      <Card 
        nombre={productoEjemplo.nombre}
        descripcion={productoEjemplo.descripcion}
        precio={productoEjemplo.precio}
        imagen={productoEjemplo.imagen}
      />
    </section>
            <section className="producto">
                <p>Producto1</p>
            </section>
        </section>
        <section className="card_producto">
            <section className="producto">
                <p>Producto2</p>
            </section>
        </section>
        <section className="card_producto">
            <section className="producto">
                <p>Producto3</p>
            </section>
        </section>     
      </section>
    </>
  );
}