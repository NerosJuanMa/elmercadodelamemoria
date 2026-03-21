// // models/pedidos.model.js
// import pool from '../config/db.js';

// // Crear pedido
// export async function crearPedido({ nombre_cliente, email, telefono, direccion_entrega, producto_id, cantidad, total, comentarios }) {
//   const [result] = await pool.query(
//     "INSERT INTO pedidos (nombre_cliente, email, telefono, direccion_entrega, producto_id, cantidad, total,comentarios) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)",
//     [nombre_cliente, email, telefono, direccion_entrega, producto_id, cantidad, total, comentarios]
//   );

//   return {
//     id: result.insertId,

//     nombre_cliente: nombre_cliente,
//     email: email,
//     telefono: telefono,
//     direccion_entrega: direccion_entrega,
//     producto_id: producto_id,
//     cantidad: cantidad,
//     total: total,
//     comentarios: comentarios,
//   };
// }



// // Obtener pedido por ID
// export async function obtenerPedidoPorId(id) {
//   const [rows] = await pool.query(
//     'SELECT id, fecha, nombre_cliente, email, telefono, direccion_entrega, producto_id, cantidad, total, comentarios FROM pedidos WHERE id = ?',
//     [id]
//   );
//   return rows[0];
// }


// // Obtener pedidos por cliente
// export async function obtenerPorCliente(email) {
//   const [rows] = await pool.query(
//     'SELECT id, fecha, nombre_cliente, email, telefono, direccion_entrega, producto_id, cantidad, total,comentarios FROM pedidos WHERE email = ? ORDER BY fecha DESC',
//     [email]
//   );
//   return rows;
// }

import pool from '../config/db.js';

export async function crearPedidoMultiple(datos) {
  const { nombre_cliente, email, telefono, direccion_entrega, total, comentarios, estado, productos } = datos;
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // 1. Insertar la cabecera en la tabla 'pedidos'
    const [resultPedido] = await connection.query(
      `INSERT INTO pedidos (nombre_cliente, email, telefono, direccion_entrega, total, comentarios, estado) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre_cliente, email, telefono, direccion_entrega, total, comentarios, estado || 'pendiente']
    );

    const pedidoId = resultPedido.insertId;

    // 2. Insertar productos y actualizar stock uno por uno
    for (const item of productos) {
      // A. Insertar la línea del pedido
      await connection.query(
        `INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario) 
         VALUES (?, ?, ?, ?)`,
        [pedidoId, item.producto_id, item.cantidad, item.precio_unitario]
      );

      // B. Actualizar el stock del producto
      const [updateRes] = await connection.query(
        `UPDATE productos 
         SET stock = stock - ? 
         WHERE id = ? AND stock >= ?`, 
        [item.cantidad, item.producto_id, item.cantidad]
      );

      // C. Verificación de seguridad: si no se actualizó nada, es que no había stock
      if (updateRes.affectedRows === 0) {
        throw new Error(`Stock insuficiente para el producto ID: ${item.producto_id}`);
      }
    }

    // 3. Si todo salió bien, confirmamos la transacción
    await connection.commit(); 
    return { id: pedidoId, ...datos };

  } catch (error) {
    // Si algo falló (incluyendo falta de stock), deshacemos todo
    await connection.rollback(); 
    console.error("Error en la transacción de pedido:", error.message);
    throw error;
  } finally {
    // Liberamos la conexión siempre
    connection.release();
  }
}


// 1. Obtener lista resumida de todos los pedidos
export async function obtenerTodos() {
  const [rows] = await pool.query(
    'SELECT id, nombre_cliente, email, total, estado, creado_en FROM pedidos ORDER BY creado_en DESC'
  );
  return rows;
}

// 2. Obtener un pedido con todos sus productos detallados (JOIN)
export async function obtenerDetalleCompleto(id) {
  // Primero obtenemos la cabecera del pedido
  const [pedido] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [id]);
  
  if (pedido.length === 0) return null;

  // Luego obtenemos los productos asociados a ese pedido
  const [items] = await pool.query(
    `SELECT pi.cantidad, pi.precio_unitario, p.nombre, p.imagen_url 
     FROM pedido_items pi
     JOIN productos p ON pi.producto_id = p.id
     WHERE pi.pedido_id = ?`,
    [id]
  );

  return {
    ...pedido[0],
    productos: items
  };
}

// 3. Actualizar solo el estado del pedido
export async function actualizarEstado(id, nuevoEstado) {
  const [result] = await pool.query(
    'UPDATE pedidos SET estado = ? WHERE id = ?',
    [nuevoEstado, id]
  );
  return result.affectedRows > 0;
}