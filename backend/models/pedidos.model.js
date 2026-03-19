// models/pedidos.model.js
import pool from '../config/db.js';

// Crear pedido
export async function crearPedido({ nombre_cliente, email, telefono, direccion_entrega, producto_id, cantidad, total, comentarios }) {
  const [result] = await pool.query(
    "INSERT INTO pedidos (nombre_cliente, email, telefono, direccion_entrega, producto_id, cantidad, total,comentarios) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)",
    [nombre_cliente, email, telefono, direccion_entrega, producto_id, cantidad, total, comentarios]
  );

  return {
    id: result.insertId,
    fecha: CURRENT_TIMESTAMP,
    nombre_cliente: nombre_cliente,
    email: email,
    telefono: telefono,
    direccion_entrega: direccion_entrega,
    producto_id: producto_id,
    cantidad: cantidad,
    total: total,
    comentarios: comentarios,
  };
}



// Obtener pedido por ID
export async function obtenerPedidoPorId(id) {
  const [rows] = await pool.query(
    'SELECT id, fecha, nombre_cliente, email, telefono, direccion_entrega, producto_id, cantidad, total, comentarios FROM pedidos WHERE id = ?',
    [id]
  );
  return rows[0];
}


// Obtener pedidos por cliente
export async function obtenerPorCliente(email) {
  const [rows] = await pool.query(
    'SELECT id, fecha, nombre_cliente, email, telefono, direccion_entrega, producto_id, cantidad, total,comentarios FROM pedidos WHERE cliente_id = ? ORDER BY fecha DESC',
    [email]
  );
  return rows;
}

