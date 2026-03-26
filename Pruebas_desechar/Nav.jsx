import { NavLink } from "react-router-dom";

export default function Nav() {
  const linkClass = ({ isActive }) =>
    "nav-link " + (isActive ? "active" : "");

  return (
    <nav className="main-nav" aria-label="Navegación principal">
      
      <NavLink to="/" end className={linkClass}>
        👤 <br />Zona Admin
      </NavLink>
      <NavLink to="/about" className={linkClass}>
        🏠 <br />Inicio
      </NavLink>
      <NavLink to="/contact" className={linkClass}>
        🎁 <br />Items
      </NavLink>
      <NavLink to="/pedido" className={linkClass}>
        🛒 <br />Pedido
      </NavLink>  
    </nav>
  );
}