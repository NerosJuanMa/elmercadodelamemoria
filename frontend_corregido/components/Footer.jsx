import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
        <p>
          © {currentYear} El Mercado de la Memoria. Hecho con ❤️. Descubre tesoros únicos del pasado.
        </p>
    </footer>
  );
}

export default Footer;