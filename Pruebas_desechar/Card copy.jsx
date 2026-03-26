import React from 'react';
import './Card.css';

const Card = ({ nombre, descripcion, precio, imagen }) => {
  return (
    <article className="card_item">
      <div className="card_producto">
        {/* Título interno o categoría si lo necesitas */}
        <h3 className="card_title_inner">{nombre}</h3>
        
        {/* Imagen con el contenedor que aplica los filtros */}
        <div className="image_container">
          <img src={imagen} alt={nombre} className="product_img" />
        </div>

        <div className="info_container">
          <p className="descripcion">{descripcion}</p>
          <span className="precio">{precio} €</span>
        </div>
      </div>
    </article>
  );
};

export default Card;