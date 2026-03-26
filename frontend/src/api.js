const API_URL = "http://localhost:3000/api";

// ─── Helper: cabeceras con token ───────────────────────────────────────────
const authHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("admin_token") || ""}`
});

// ─── AUTH ──────────────────────────────────────────────────────────────────
export const loginAdmin = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
};

// ─── PRODUCTOS (público) ───────────────────────────────────────────────────
export const getProductos = async () => {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
};

// ─── PRODUCTOS (admin) ─────────────────────────────────────────────────────
export const getProductosAdmin = async () => {
  const res = await fetch(`${API_URL}/productos/admin/todos`, { headers: authHeaders() });
  return res.json();
};

export const crearProducto = async (datos) => {
  const res = await fetch(`${API_URL}/productos/admin`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(datos)
  });
  return res.json();
};

export const actualizarProducto = async (id, datos) => {
  const res = await fetch(`${API_URL}/productos/admin/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(datos)
  });
  return res.json();
};

export const desactivarProducto = async (id) => {
  const res = await fetch(`${API_URL}/productos/admin/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });
  return res.json();
};

export const reactivarProducto = async (id) => {
  const res = await fetch(`${API_URL}/productos/admin/restore/${id}`, {
    method: "PATCH",
    headers: authHeaders()
  });
  return res.json();
};

// ─── PEDIDOS (admin) ───────────────────────────────────────────────────────
export const getPedidosAdmin = async () => {
  const res = await fetch(`${API_URL}/pedidos/admin/todos`, { headers: authHeaders() });
  return res.json();
};

export const getDetallePedido = async (id) => {
  const res = await fetch(`${API_URL}/pedidos/admin/${id}`, { headers: authHeaders() });
  return res.json();
};

export const actualizarEstadoPedido = async (id, estado) => {
  const res = await fetch(`${API_URL}/pedidos/admin/${id}/estado`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ estado })
  });
  return res.json();
};

// ─── PEDIDOS (público) ─────────────────────────────────────────────────────
export const crearPedido = async (pedido) => {
  const res = await fetch(`${API_URL}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido)
  }); 
  return res.json();
};
