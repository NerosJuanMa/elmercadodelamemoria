// models/productos.model.js
import pool from '../config/db.js';

/*
 * ==========================================
 * MODELO DE PRODUCTOS 
 * ==========================================
 
 * FUNCIONES:
 * - obtenerTodos() - Lista todos los productos activos
 * - obtenerPorId(id) - Obtiene un producto específico
 * - obtenerPorCategoria(categoria) - Filtra productos por categoría
 * - crearProducto() - SOLO ADMIN 
 */
export async function obtenerTodos() {
  const [rows] = await pool.query(
    `SELECT id, nombre, descripcion, precio_unidad, categoria, imagen_url, stock, activo, creado_en
     FROM productos
     WHERE activo = 1
     ORDER BY nombre ASC`
  );
  return rows;
}


export async function obtenerPorId(id) {
  const [rows] = await pool.query(
    `SELECT id, nombre, descripcion, precio_unidad, categoria, imagen_url, stock, activo, creado_en
     FROM productos
     WHERE id = ? AND activo = 1`,
    [id]
  );
  return rows[0]; // undefined si no existe
}


export async function obtenerPorCategoria(categoria) {
  const [rows] = await pool.query(
    `SELECT id, nombre, descripcion, precio_unidad, categoria, imagen_url, stock, activo, creado_en
     FROM productos 
     WHERE activo = 1 AND categoria = ?
     ORDER BY nombre ASC`,
    [categoria]
  );
  return rows;
}

// Crear producto
export async function crearproducto({ nombre, descripcion, precio_unidad, categoria, imagen_url, stock, activo }) {
  // Nota: El ID no se envía porque es AUTO_INCREMENT
  const [result] = await pool.query(
    `INSERT INTO productos (nombre, descripcion, precio_unidad, categoria, imagen_url, stock,activo) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, descripcion, precio_unidad, categoria, imagen_url, stock, activo]
  );

  return {
    id: result.insertId,
    nombre,
    descripcion,
    precio_unidad,
    categoria,
    imagen_url,
    stock,
    activo
    // El campo 'creado_en' lo genera automáticamente la base de datos
  };
}

// Actualizar producto existente
export async function actualizarProducto(id, { nombre, descripcion, precio_unidad, categoria, imagen_url, stock, activo }) {
  const [result] = await pool.query(
    `UPDATE productos 
     SET nombre = ?, descripcion = ?, precio_unidad = ?, categoria = ?, imagen_url = ?, stock = ?, activo = ?
     WHERE id = ?`,
    [nombre, descripcion, precio_unidad, categoria, imagen_url, stock, activo, id]
  );

  // Si affectedRows es 0, significa que el ID no existía
  if (result.affectedRows === 0) return null;

  return { id, nombre, descripcion, precio_unidad, categoria, imagen_url, stock, activo };
}

// Eliminar producto por ID
// export async function eliminarProducto(id) {
//   const [result] = await pool.query(
//     "DELETE FROM productos WHERE id = ?",
//     [id]
//   );

//   // Si affectedRows es 0, significa que no existía el producto con ese ID
//   return result.affectedRows > 0;
// }

// Borrado lógico: Cambiar estado a inactivo
export async function borrarLogicoProducto(id) {
  const [result] = await pool.query(
    "UPDATE productos SET activo = 0 WHERE id = ?",
    [id]
  );

  // Retorna true si encontró el producto y lo actualizó
  return result.affectedRows > 0;
}

// Ver ABSOLUTAMENTE TODO (incluyendo borrados lógicos)
export async function obtenerTodosAdmin() {
  const [rows] = await pool.query("SELECT * FROM productos ORDER BY id DESC");
  return rows;
}

// Reactivar un producto (opuesto al borrado lógico)
export async function reactivarProducto(id) {
  const [result] = await pool.query(
    "UPDATE productos SET activo = 1 WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}