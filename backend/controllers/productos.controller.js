// controllers/productos.controller.js
import * as productosModel from '../models/productos.model.js';

/*
 * ==========================================
 * 📦 CONTROLADOR DE PRODUCTOS
 * ==========================================
 * 
 * Funciones para gestión de productos del bazar
 * - Obtener todos los productos
 * - Obtener producto por ID
 * Crear Producto SOLO ADMIN
 */
export async function getProductos(req, res) {
  try {
    console.log('📦 Obteniendo productos...');
    
    const productos = await productosModel.obtenerTodos();
    
    res.status(200).json({
      success: true,
      message: `Se encontraron ${productos.length} productos`,
      data: productos
    });
    
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}


export async function getProductoById(req, res) {
  try {
    const { id } = req.params;
    console.log(`🔍 Buscando producto ID: ${id}`);
    
    const producto = await productosModel.obtenerPorId(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Producto encontrado',
      data: producto
    });
    
  } catch (error) {
    console.error('❌ Error al obtener producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}


export async function getProductoByCategoria(req, res) {
  try {
    const { categoria } = req.params;
    console.log(`🔍 Buscando producto Categoria: ${categoria}`);
    
    const producto = await productosModel.obtenerPorCategoria(categoria);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado con esa categoria'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Producto encontrado con esa categoria',
      data: producto
    });
    
  } catch (error) {
    console.error('❌ Error al obtener producto con esa categoria:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}


export async function crearProducto(req, res) {
  try {
    const { productos } = req.body;
    const cliente_id = req.user.cliente_id; // Obtener del middleware de autenticación
    
    console.log('🛒 Creando Producto para cliente:', cliente_id);
    console.log('📦 Productos del Producto:', productos);
    
    // Crear Producto
    const nuevoProducto = await ProductosModel.crear({
      cliente_id,
      productos
    });
    
    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: nuevoProducto
    });
    
  } catch (error) {
    console.error('❌ Error al crear Producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}
