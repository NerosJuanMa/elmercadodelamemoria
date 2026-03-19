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
 */
export async function obtenerTodos() {
  const [rows] = await pool.query(
    `SELECT id, nombre, descripcion, precio, categoria, imagen_url, stock, activo, creado_en
     FROM productos
     WHERE activo = 1
     ORDER BY nombre ASC`
  );
  return rows;
}

/**
 * Obtener un producto específico por ID
 * CONSULTA SIMPLE: WHERE con parámetro
 */
export async function obtenerPorId(id) {
  const [rows] = await pool.query(
    `SELECT id, nombre, descripcion, precio, stock, categoria, imagen_url, activo, creado_en
     FROM productos
     WHERE id = ? AND activo = 1`,
    [id]
  );
  return rows[0]; // undefined si no existe
}

/**
 * Obtener productos filtrados por categoría; la categoría es un string en la propia tabla
 * CONSULTA : Filtro por string de categoría
 */
export async function obtenerPorCategoria(categoria) {
  const [rows] = await pool.query(
    `SELECT id, nombre, descripcion, precio, stock, categoria, imagen_url, activo, creado_en
     FROM productos 
     WHERE activo = 1 AND categoria = ?
     ORDER BY nombre ASC`,
    [categoria]
  );
  return rows;
}