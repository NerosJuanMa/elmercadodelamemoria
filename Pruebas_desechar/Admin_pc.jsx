import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import {
  loginAdmin,
  getProductosAdmin,
  crearProducto,
  actualizarProducto,
  desactivarProducto,
  reactivarProducto,
  getPedidosAdmin,
  getDetallePedido,
  actualizarEstadoPedido
} from '../api';

// ─── Formulario vacío para producto ───────────────────────────────────────
const PROD_VACIO = {
  nombre: '', descripcion: '', precio_unidad: '',
  categoria: '', imagen_url: '', stock: '', activo: 1
};

const CATEGORIAS = [
  'Muebles','Relojes','Libros','Decoración','Cámaras','Objetos de colección'
];

const ESTADOS_PEDIDO = ['pendiente','procesando','enviado','completado','cancelado'];

// ══════════════════════════════════════════════════════════════════════════════
export default function Admin() { 
  const navigate = useNavigate();

  // ── Auth ──
  const [autorizado, setAutorizado]   = useState(false);
  const [usuario,    setUsuario]      = useState('');
  const [password,   setPassword]     = useState('');
  const [authError,  setAuthError]    = useState('');
  const [authLoad,   setAuthLoad]     = useState(false);

  // ── Tabs ──
  const [tab, setTab] = useState('productos'); // 'productos' | 'pedidos'

  // ── Productos ──
  const [productos,       setProductos]       = useState([]);
  const [prodCargando,    setProdCargando]     = useState(false);
  const [prodError,       setProdError]        = useState('');
  const [formProd,        setFormProd]         = useState(PROD_VACIO);
  const [editandoId,      setEditandoId]       = useState(null);   // null = crear
  const [modalProd,       setModalProd]        = useState(false);
  const [filtroActivo,    setFiltroActivo]     = useState('todos'); // 'todos'|'activos'|'inactivos'

  // ── Pedidos ──
  const [pedidos,         setPedidos]          = useState([]);
  const [pedCargando,     setPedCargando]      = useState(false);
  const [pedError,        setPedError]         = useState('');
  const [detalle,         setDetalle]          = useState(null);
  const [detalleCarg,     setDetalleCarg]      = useState(false);
  const [estadosPend,     setEstadosPend]      = useState({});  // {id: 'nuevo_estado'}
  const [guardando,       setGuardando]        = useState({});  // {id: true} mientras guarda

  // ══════════════════════════════════════════════════
  // LOGIN
  // ══════════════════════════════════════════════════
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoad(true);
    setAuthError('');
    const data = await loginAdmin(usuario, password).catch(() => null);
    setAuthLoad(false);
    if (data?.success) {
      localStorage.setItem('admin_token', data.token);
      setAutorizado(true);
      cargarProductos();
    } else {
      setAuthError('❌ Usuario o contraseña incorrectos');
    }
  };

  // ══════════════════════════════════════════════════
  // PRODUCTOS — carga
  // ══════════════════════════════════════════════════
  const cargarProductos = async () => {
    setProdCargando(true);
    setProdError('');
    const data = await getProductosAdmin().catch(() => null);
    setProdCargando(false);
    if (data?.success) setProductos(data.data);
    else setProdError('No se pudieron cargar los productos.');
  };

  // ── filtro local ──
  const productosFiltrados = productos.filter(p => {
    if (filtroActivo === 'activos')   return p.activo === 1;
    if (filtroActivo === 'inactivos') return p.activo === 0;
    return true;
  });

  // ══════════════════════════════════════════════════
  // PRODUCTOS — CRUD
  // ══════════════════════════════════════════════════
  const abrirCrear = () => {
    setFormProd(PROD_VACIO);
    setEditandoId(null);
    setModalProd(true);
  };

  const abrirEditar = (p) => {
    setFormProd({
      nombre: p.nombre, descripcion: p.descripcion,
      precio_unidad: p.precio_unidad, categoria: p.categoria,
      imagen_url: p.imagen_url || '', stock: p.stock, activo: p.activo
    });
    setEditandoId(p.id);
    setModalProd(true);
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    const datos = {
      ...formProd,
      precio_unidad: Number(formProd.precio_unidad),
      stock: Number(formProd.stock),
      activo: Number(formProd.activo)
    };
    const res = editandoId
      ? await actualizarProducto(editandoId, datos).catch(() => null)
      : await crearProducto(datos).catch(() => null);

    if (res?.success) {
      setModalProd(false);
      cargarProductos();
    } else {
      alert('❌ Error: ' + (res?.message || res?.error || 'fallo desconocido'));
    }
  };

  const toggleActivo = async (p) => {
    const confirmMsg = p.activo
      ? `¿Desactivar "${p.nombre}"?`
      : `¿Reactivar "${p.nombre}"?`;
    if (!window.confirm(confirmMsg)) return;
    const res = p.activo
      ? await desactivarProducto(p.id).catch(() => null)
      : await reactivarProducto(p.id).catch(() => null);
    if (res?.success) cargarProductos();
    else alert('❌ Error al cambiar estado del producto');
  };

  // ══════════════════════════════════════════════════
  // PEDIDOS
  // ══════════════════════════════════════════════════
  const cargarPedidos = async () => {
    setPedCargando(true);
    setPedError('');
    const data = await getPedidosAdmin().catch(() => null);
    setPedCargando(false);
    if (data?.success) setPedidos(data.data);
    else setPedError('No se pudieron cargar los pedidos.');
  };

  const verDetalle = async (id) => {
    if (detalle?.id === id) { setDetalle(null); return; }
    setDetalleCarg(true);
    const data = await getDetallePedido(id).catch(() => null);
    setDetalleCarg(false);
    if (data?.success) setDetalle(data.data);
    else alert('❌ No se pudo cargar el detalle');
  };

  // Solo actualiza el select localmente, sin tocar la BD
  const seleccionarEstado = (id, nuevoEstado) => {
    setEstadosPend(prev => ({ ...prev, [id]: nuevoEstado }));
  };

  // Guarda el estado en la BD al pulsar el botón ✔
  const guardarEstado = async (id) => {
    const estado = estadosPend[id];
    if (!estado) return;
    setGuardando(prev => ({ ...prev, [id]: true }));
    const res = await actualizarEstadoPedido(id, estado).catch(() => null);
    setGuardando(prev => ({ ...prev, [id]: false }));
    if (res?.success) {
      // Confirmar en el array de pedidos y limpiar pendiente
      setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado } : p));
      setEstadosPend(prev => { const n = { ...prev }; delete n[id]; return n; });
      if (detalle?.id === id) setDetalle(prev => ({ ...prev, estado }));
    } else {
      alert('❌ Error al actualizar estado: ' + (res?.message || 'sin respuesta del servidor'));
    }
  };

  // ── cargar tab al cambiar ──
  useEffect(() => {
    if (!autorizado) return;
    if (tab === 'productos') cargarProductos();
    if (tab === 'pedidos')   cargarPedidos();
  }, [tab, autorizado]);

  // ══════════════════════════════════════════════════
  // RENDER — Modal login
  // ══════════════════════════════════════════════════
  if (!autorizado) return (
    <div className="modal-overlay">
      <div className="modal-admin">
        <h3 className="modal-titulo">🔐 Acceso Administrador</h3>
        <form onSubmit={handleLogin} className="modal-form">
          <div className="campo-grupo">
            <label>Usuario</label>
            <input type="text" value={usuario}
              onChange={e => setUsuario(e.target.value)} autoFocus required />
          </div>
          <div className="campo-grupo">
            <label>Contraseña</label>
            <input type="password" value={password}
              onChange={e => setPassword(e.target.value)} required />
          </div>
          {authError && <p className="modal-error">{authError}</p>}
          <div className="modal-botones">
            <button type="button" className="btn-cancelar" onClick={() => navigate('/')}>Cancelar</button>
            <button type="submit" className="btn-enviar" disabled={authLoad}>
              {authLoad ? 'Verificando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════
  // RENDER — Panel
  // ══════════════════════════════════════════════════
  return (
    <>
      <section className="title"><h2>👤 Zona Admin</h2></section>

      {/* ── Tabs ── */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${tab === 'productos' ? 'admin-tab--activo' : ''}`}
          onClick={() => setTab('productos')}>
          📦 Productos
        </button>
        <button
          className={`admin-tab ${tab === 'pedidos' ? 'admin-tab--activo' : ''}`}
          onClick={() => setTab('pedidos')}>
          🧾 Pedidos
        </button>
      </div>

      <section className="contenedor-pedido-fijo">

        {/* ════════════════════════════════════════
            TAB PRODUCTOS
        ════════════════════════════════════════ */}
        {tab === 'productos' && (
          <div className="admin-panel">

            {/* cabecera */}
            <div className="admin-cabecera">
              <div className="admin-filtros">
                {['todos','activos','inactivos'].map(f => (
                  <button key={f}
                    className={`filtro-btn ${filtroActivo === f ? 'filtro-btn--activo' : ''}`}
                    onClick={() => setFiltroActivo(f)}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <button className="btn-nuevo" onClick={abrirCrear}>+ Nuevo producto</button>
            </div>

            {prodCargando && <p className="admin-msg">Cargando productos…</p>}
            {prodError   && <p className="admin-msg admin-msg--error">{prodError}</p>}

            {/* tabla */}
            {!prodCargando && (
              <div className="tabla-scroll">
                <table className="admin-tabla">
                  <thead>
                    <tr>
                      <th>ID</th><th>Nombre</th><th>Categoría</th>
                      <th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosFiltrados.length === 0 && (
                      <tr><td colSpan={7} className="tabla-vacia">Sin resultados</td></tr>
                    )}
                    {productosFiltrados.map(p => (
                      <tr key={p.id} className={p.activo ? '' : 'fila-inactiva'}>
                        <td>{p.id}</td>
                        <td>{p.nombre}</td>
                        <td>{p.categoria}</td>
                        <td>{Number(p.precio_unidad).toFixed(2)} €</td>
                        <td>{p.stock}</td>
                        <td>
                          <span className={`badge ${p.activo ? 'badge--activo' : 'badge--inactivo'}`}>
                            {p.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="tabla-acciones">
                          <button className="btn-accion btn-editar" onClick={() => abrirEditar(p)}>✏️</button>
                          <button
                            className={`btn-accion ${p.activo ? 'btn-desactivar' : 'btn-reactivar'}`}
                            onClick={() => toggleActivo(p)}>
                            {p.activo ? '🗑️' : '♻️'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════
            TAB PEDIDOS
        ════════════════════════════════════════ */}
        {tab === 'pedidos' && (
          <div className="admin-panel">
            <div className="admin-cabecera">
              <h3 className="admin-subtitulo">Lista de pedidos:</h3>
              <button className="btn-nuevo" onClick={cargarPedidos}>↻ Actualizar</button>
            </div>

            {pedCargando && <p className="admin-msg">Cargando pedidos…</p>}
            {pedError    && <p className="admin-msg admin-msg--error">{pedError}</p>}

            {!pedCargando && (
              <div className="tabla-scroll">
                <table className="admin-tabla">
                  <thead>
                    <tr>
                      <th>ID</th><th>Cliente</th><th>Email</th>
                      <th>Total</th><th>Estado</th><th>Fecha</th><th>Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.length === 0 && (
                      <tr><td colSpan={7} className="tabla-vacia">Sin pedidos</td></tr>
                    )}
                    {pedidos.map(p => {
                      const estadoActual = estadosPend[p.id] ?? p.estado;
                      const hayPendiente = estadosPend[p.id] !== undefined;
                      return (
                      <React.Fragment key={p.id}>
                        <tr>
                          <td>{p.id}</td>
                          <td>{p.nombre_cliente}</td>
                          <td>{p.email}</td>
                          <td>{Number(p.total).toFixed(2)} €</td>
                          <td>
                            <div style={{display:'flex', gap:'6px', alignItems:'center'}}>
                              <select
                                className="select-estado"
                                value={estadoActual}
                                onChange={e => seleccionarEstado(p.id, e.target.value)}>
                                {ESTADOS_PEDIDO.map(est => (
                                  <option key={est} value={est}>{est}</option>
                                ))}
                              </select>
                              <button
                                className="btn-accion btn-reactivar"
                                title="Guardar estado"
                                disabled={!hayPendiente || guardando[p.id]}
                                onClick={() => guardarEstado(p.id)}
                                style={{opacity: hayPendiente ? 1 : 0.3}}>
                                {guardando[p.id] ? '…' : '✔'}
                              </button>
                            </div>
                          </td>
                          <td>{p.creado_en ? new Date(p.creado_en).toLocaleDateString('es-ES') : '—'}</td>
                          <td>
                            <button className="btn-accion btn-editar"
                              onClick={() => verDetalle(p.id)}>
                              {detalle?.id === p.id ? '▲' : '▼'}
                            </button>
                          </td>
                        </tr>

                        {/* fila de detalle expandida */}
                        {detalle?.id === p.id && (
                          <tr className="fila-detalle">
                            <td colSpan={7}>
                              {detalleCarg ? (
                                <p className="admin-msg">Cargando detalle…</p>
                              ) : (
                                <div className="detalle-pedido">
                                  <p><strong>Dirección:</strong> {detalle.direccion_entrega || '—'}</p>
                                  <p><strong>Teléfono:</strong>  {detalle.telefono || '—'}</p>
                                  <p><strong>Comentarios:</strong> {detalle.comentarios || '—'}</p>
                                  <table className="admin-tabla detalle-tabla">
                                    <thead>
                                      <tr><th>Producto</th><th>Cantidad</th><th>Precio unit.</th><th>Subtotal</th></tr>
                                    </thead>
                                    <tbody>
                                      {(detalle.productos || []).map((item, i) => (
                                        <tr key={i}>
                                          <td>{item.nombre}</td>
                                          <td>{item.cantidad}</td>
                                          <td>{Number(item.precio_unitario).toFixed(2)} €</td>
                                          <td>{(item.cantidad * item.precio_unitario).toFixed(2)} €</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════
          MODAL CREAR / EDITAR PRODUCTO
      ══════════════════════════════════════════ */}
      {modalProd && (
        <div className="modal-overlay" onClick={() => setModalProd(false)}>
          <div className="modal-admin modal-prod" onClick={e => e.stopPropagation()}>
            <h3 className="modal-titulo">
              {editandoId ? `✏️ Editar producto #${editandoId}` : '➕ Nuevo producto'}
            </h3>
            <form onSubmit={guardarProducto} className="modal-form prod-grid">

              <div className="campo-grupo">
                <label>Nombre</label>
                <input type="text" required value={formProd.nombre}
                  onChange={e => setFormProd({...formProd, nombre: e.target.value})} />
              </div>

              <div className="campo-grupo">
                <label>Categoría</label>
                <select className="select-estado" value={formProd.categoria}
                  onChange={e => setFormProd({...formProd, categoria: e.target.value})} required>
                  <option value="">— Selecciona —</option>
                  {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="campo-grupo">
                <label>Precio €</label>
                <input type="number" min="0" step="0.01" required value={formProd.precio_unidad}
                  onChange={e => setFormProd({...formProd, precio_unidad: e.target.value})} />
              </div>

              <div className="campo-grupo">
                <label>Stock</label>
                <input type="number" min="0" required value={formProd.stock}
                  onChange={e => setFormProd({...formProd, stock: e.target.value})} />
              </div>

              <div className="campo-grupo campo-grupo--full">
                <label>Descripción</label>
                <textarea rows="2" value={formProd.descripcion}
                  onChange={e => setFormProd({...formProd, descripcion: e.target.value})} />
              </div>

              <div className="campo-grupo campo-grupo--full">
                <label>URL imagen</label>
                <input type="text" value={formProd.imagen_url}
                  onChange={e => setFormProd({...formProd, imagen_url: e.target.value})} />
              </div>

              <div className="campo-grupo">
                <label>Activo</label>
                <select className="select-estado" value={formProd.activo}
                  onChange={e => setFormProd({...formProd, activo: Number(e.target.value)})}>
                  <option value={1}>Sí</option>
                  <option value={0}>No</option>
                </select>
              </div>

              <div className="modal-botones campo-grupo--full">
                <button type="button" className="btn-cancelar" onClick={() => setModalProd(false)}>Cancelar</button>
                <button type="submit" className="btn-enviar">
                  {editandoId ? 'Guardar cambios' : 'Crear producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
