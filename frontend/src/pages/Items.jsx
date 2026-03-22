// pages/Items.jsx
import './Items.css';
export default function Items() {
  return (
    <>
      <section className="title"><h2>🎁 Productos</h2></section>
      <section className='filtro_categoria'>Filtrar categoría</section>
      <section className="card_item">            
        <section className="card_producto">
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