import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
           
      <nav className="nav">
        <Link to="/Admin" className="navLink" title='Zona Admin'>👤</Link>
        
        <Link to="/" className="navLink" title='Inicio'> 🏠</Link>
        <Link to="/Items" className="navLink" title='Items'>🎁</Link>
        {/* <Link to="/PaginaProductos" className="navLink" title='PaginaProductos'>🎁</Link> */}
        <Link to="/Pedido" className="navLink" title='Pedido'>🛒</Link>    
      </nav>
      
    </header>
  );
}

export default Header;