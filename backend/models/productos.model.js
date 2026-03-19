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
export async function crearproducto({ id, nombre, descripcion, precio_unidad, categoria, imagen_url, stock, activo, creado_en }) {
  const [result] = await pool.query(
    "INSERT INTO productos (nombre_cliente, email, telefono, direccion_entrega, producto_id, cantidad, total,comentarios) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)",
    [id, nombre, descripcion, precio_unidad, categoria, imagen_url, stock, activo, creado_en]
  );

  return {
    id: result.insertId,
    nombre: nombre,
    descripcion: descripcion,
    precio_unidad: precio_unidad,
    categoria: categoria,
    imagen_url: imagen_url,
    stock: stock,
    activo: activo,
    creado_en: CURRENT_TIMESTAMP,
    
  };
}
