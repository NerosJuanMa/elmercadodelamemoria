// routes/pedidos.routes.js 
import { Router } from 'express';
import * as pedidosController from '../controllers/pedidos.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * -----------------------------------------------------------
 * 🌍 RUTAS PÚBLICAS (Para los Clientes)
 * -----------------------------------------------------------
 * Estas rutas no requieren autenticación para permitir la compra.
 */

// Crear un nuevo pedido con múltiples productos (Carrito)
// Endpoint: POST /api/pedidos
router.post('/', pedidosController.postPedidoMultiple);


/**
 * -----------------------------------------------------------
 * 🔐 RUTAS PROTEGIDAS (Solo para el Administrador)
 * -----------------------------------------------------------
 * Requieren el Bearer Token enviado en las cabeceras (Headers).
 */

// Obtener la lista general de todos los pedidos realizados
// Endpoint: GET /api/pedidos/admin/todos
router.get('/admin/todos', verifyToken, pedidosController.getTodosLosPedidos);

// Obtener el detalle de un pedido (productos, cantidades y precios)
// Endpoint: GET /api/pedidos/admin/:id
router.get('/admin/:id', verifyToken, pedidosController.getDetallePedido);

// Actualizar el estado del pedido (ej: 'pendiente' -> 'enviado' -> 'completado')
// Endpoint: PUT /api/pedidos/admin/:id/estado
router.put('/admin/:id/estado', verifyToken, pedidosController.updateEstadoPedido);

export default router;