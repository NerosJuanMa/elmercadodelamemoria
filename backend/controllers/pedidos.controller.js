// controllers/pedidos.controller.js
import * as pedidosModel from '../models/pedidos.model.js';

/**
 * ==========================================
 * 🛒 CONTROLADOR DE PEDIDOS
 * ==========================================
 * 
 * Funciones para gestión de pedidos del bazar
 * - Crear pedidos
 * - Obtener mis pedidos
 */

export async function crearPedido(req, res) {
  try {
    const { productos } = req.body;
    const cliente_id = req.user.cliente_id; // Obtener del middleware de autenticación
    
    console.log('🛒 Creando pedido para cliente:', cliente_id);
    console.log('📦 Productos del pedido:', productos);
    
    // Crear pedido
    const nuevoPedido = await pedidosModel.crear({
      cliente_id,
      productos
    });
    
    res.status(201).json({
      success: true,
      message: 'Pedido creado exitosamente',
      data: nuevoPedido
    });
    
  } catch (error) {
    console.error('❌ Error al crear pedido:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}

/**
 * Obtener mis pedidos
 */
export async function getMisPedidos(req, res) {
  try {
    const cliente_id = req.user.cliente_id;
    
    console.log('📋 Obteniendo pedidos del cliente:', cliente_id);
    
    // 1. Obtener las cabeceras de los pedidos
    const pedidos = await pedidosModel.obtenerPorCliente(cliente_id);
    
    // 2. Para cada pedido, obtener sus productos con detalles
    const pedidosCompletos = [];
    
    for (const pedido of pedidos) {
      // Obtener los productos de este pedido específico
      const productos = await pedidosModel.obtenerLineasDePedido(pedido.id);
      
      // Combinar la información del pedido con sus productos
      pedidosCompletos.push({
        id: pedido.id,
        cliente_id: pedido.cliente_id,
        estado: pedido.estado,
        fecha: pedido.fecha,
        productos: productos // Array de productos con nombres, precios y cantidades
      });
    }
    
    console.log(`📦 Se encontraron ${pedidosCompletos.length} pedidos con ${pedidosCompletos.reduce((total, p) => total + p.productos.length, 0)} productos en total`);
    
    res.status(200).json({
      success: true,
      message: `Se encontraron ${pedidosCompletos.length} pedidos`,
      data: pedidosCompletos
    });
    
  } catch (error) {
    console.error('❌ Error al obtener pedidos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}