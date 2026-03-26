import React, { useState } from 'react'; 
import './Card.css';

const Card = ({ id, nombre, descripcion, precio, imagen, stock, onAdd }) => {
    const [cantidad, setCantidad] = useState(1);

    const handleAgregar = () => {
    onAdd({
        producto_id: id,         // 👈 backend necesita producto_id
        nombre,
        descripcion,
        precio_unitario: precio, // 👈 backend espera precio_unitario
        imagen,
        stock,
        cantidad
    });
    alert(`Añadido al carrito: ${cantidad} unidad(es) de ${nombre}`);
};
    // Función para manejar el cambio de cantidad manualmente (validación extra)
    const handleChange = (e) => {
        const valor = Number(e.target.value);
        if (valor <= stock && valor >= 1) {
            setCantidad(valor);
        } else if (valor < 1) {
            setCantidad(1); // Evita números negativos o cero
        } else {
            setCantidad(stock); // Evita superar el stock
        }
    };

    return (
        <article className="card_item">
            <div className="card_producto">
                <h3 className="card_title_inner">{nombre}</h3>
                
                <div className="image_container">
                    <img src={imagen} alt={nombre} className="product_img" />
                </div>

                <div className="info_container">
                    <p className="descripcion">{descripcion}</p>
                     <div className="stock_info">
                        Stock disponible: <strong>{stock}</strong>
                    </div>
                    <span className="precio">{precio} €</span>
                </div>

                <div className="compra_container">
                    <input 
                        type="number" 
                        min="1" 
                        max={stock} 
                        value={cantidad}
                        onChange={handleChange} // USAMOS la función de validación
                        className="input_cantidad"
                    />
                                        
                     <button 
                        onClick={handleAgregar}
                        className="btn_agregar"
                        disabled={stock <= 0}
                    >
                        {stock > 0 ? 'Añadir al carrito 🛒' : 'Sin Stock'}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default Card;