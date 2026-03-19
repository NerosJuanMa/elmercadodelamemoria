// routes/pedidos.routes.js
import { Router } from 'express';
import * as pedidosController from '../controllers/pedidos.controller.js';

const pedidosrouter = Router();

/**
 * ==========================================
 * 🛒 RUTAS DE PEDIDOS
 * ==========================================
 */

// Crear pedido 
pedidosrouter.post('/',pedidosController.crearPedido);

// Obtener mis pedidos
pedidosrouter.get('/pedidos', pedidosController.getMisPedidos);

export default pedidosrouter;