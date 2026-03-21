// routes/pedidos.routes.js
// import { Router } from 'express';
// import * as pedidosController from '../controllers/pedidos.controller.js';

// const pedidosrouter = Router();

// /**
//  * ==========================================
//  * 🛒 RUTAS DE PEDIDOS
//  * ==========================================
//  */

// // Crear pedido 
// pedidosrouter.post('/',pedidosController.crearPedido);

// // Obtener mis pedidos
// pedidosrouter.get('/pedidos', pedidosController.getMisPedidos);

// export default pedidosrouter;

import { Router } from 'express';
import * as pedidosController from '../controllers/pedidos.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const pedidosrouter = Router();

/**
 * -----------------------------------------------------------
 * 🌍 RUTAS PÚBLICAS (Para los Clientes)
 * -----------------------------------------------------------
 */

// Crear un nuevo pedido (con uno o varios productos)
pedidosrouter.post('/', pedidosController.postPedidoMultiple);


/**
 * -----------------------------------------------------------
 * 🔐 RUTAS PROTEGIDAS (Solo para el Administrador)
 * -----------------------------------------------------------
 */

// Obtener todos los pedidos realizados en el bazar
pedidosrouter.get('/admin/todos', verifyToken, pedidosController.getTodosLosPedidos);

// Obtener el detalle de un pedido específico (incluyendo sus productos)
pedidosrouter.get('/admin/:id', verifyToken, pedidosController.getDetallePedido);

// Actualizar el estado de un pedido (ej: de 'pendiente' a 'enviado')
pedidosrouter.put('/admin/:id/estado', verifyToken, pedidosController.updateEstadoPedido);


export default pedidosrouter;