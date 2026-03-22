import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="title">El Mercado de la Memoria</h1>
      
      <nav className="nav">
        <Link to="/" className="navLink">Inicio</Link>
        <Link to="/productos" className="navLink">Productos</Link>
        <Link to="/pedidos" className="navLink">Pedidos</Link>
        {/* <button className="button">Iniciar sesión</button> */}
 
      </nav>
      
    </header>
  );
}

export default Header;