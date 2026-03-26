import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

export default function Admin() {
  const [autorizado, setAutorizado] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario, password })
      });

      const data = await res.json();

      if (data.success) {
        // Guardamos el token para usarlo en rutas protegidas
        localStorage.setItem('admin_token', data.token);
        setModalVisible(false);
        setAutorizado(true);
      } else {
        setError('❌ Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('❌ Error de conexión con el servidor');
    } finally {
      setCargando(false);
    }
  };

  const handleCancelar = () => {
    navigate('/');
  };

  return (
    <>
      {/* Modal de login */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-admin">
            <h3 className="modal-titulo">🔐 Acceso Administrador</h3>

            <form onSubmit={handleLogin} className="modal-form">
              <div className="campo-grupo">
                <label>Usuario</label>
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="campo-grupo">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="modal-error">{error}</p>}

              <div className="modal-botones">
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={handleCancelar}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-enviar"
                  disabled={cargando}
                >
                  {cargando ? 'Verificando...' : 'Entrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contenido real del panel admin */}
      {autorizado && (
        <>
          <section className="title">
            <h2>👤 Zona Admin</h2>
          </section>
          <section className="contenedor-pedido-fijo">
            <h3>Panel de Control</h3>
            <p>Bienvenido, <strong>{usuario}</strong>.</p>
            <div className="stats-admin">
              <p>Aquí podrás gestionar el stock y los pedidos recibidos.</p>
            </div>
          </section>
        </>
      )}
    </>
  );
}
