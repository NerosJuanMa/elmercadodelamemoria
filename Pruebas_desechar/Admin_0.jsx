import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Necesario para expulsar al usuario si falla
import './Admin.css';

export default function Admin() {
  const [autorizado, setAutorizado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Solicitamos los datos al entrar
    const usuario = prompt("Introduce el Usuario de Administrador:");
    const password = prompt("Introduce la Contraseña:");

    // 2. Validación (Cámbialos por los que tú quieras)
    if (usuario === "admin" && password === "1234") {
      alert("✅ Acceso concedido. Bienvenido al Mercado de la Memoria.");
      setAutorizado(true);
    } else {
      alert("❌ Acceso denegado. Credenciales incorrectas.");
      navigate("/"); // Redirigimos a la Home o donde prefieras
    }
  }, [navigate]);

  // 3. Si no está autorizado, no renderizamos el contenido real
  if (!autorizado) {
    return (
      <section className="contenedor-pedido-fijo">
        <p>Verificando credenciales de administrador...</p>
      </section>
    );
  }

  // 4. Si la validación fue exitosa, mostramos la Zona Admin
  return (
    <>    
      <section className="title">
        <h2>👤 Zona Admin </h2>
      </section>
      <section className="contenedor-pedido-fijo">
        <h3>Panel de Control</h3>
        <p>Contenido de ejemplo para comprobar el cambio de ruta.</p>
        <div className="stats-admin">
            <p>Aquí podrás gestionar el stock y los pedidos recibidos.</p>
        </div>
      </section>
    </>
  );
}