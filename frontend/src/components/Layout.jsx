import { Outlet } from "react-router-dom";
import './Layout.css';
import Header from "./Header";
// import Nav from "./Nav";
import Footer from "./Footer";
import mercado from '../assets/Mercado.png'

export default function Layout() {
  return (
    <div className="layout">
  <picture>
    <source media="(min-width: )" srcset="" />
    <img src="" alt="" />
  </picture>>
      {/* <Nav /> */}
      <Header />
      <main className="layout-main" id="contenido">
        <Outlet />
         <img src={mercado} className="fondo" alt="Fondo de pagina, El mercado de la Memoria" />
      </main>

      <Footer />
    </div>
  );
}