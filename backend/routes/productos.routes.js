// routes/productos.routes.js

import { Router } from 'express';
import * as productosController from '../controllers/productos.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const productosRoutes = Router();

/**
 * ============================================================
 * 📦 RUTAS DE PRODUCTOS
 * ------------------------------------------------------------
 * A continuación definimos las rutas principales:
 *   GET /api/productos          → Obtener todos los productos
 *   GET /api/productos/:id      → Obtener un producto concreto
 * ============================================================
 */

productosRoutes.get('/', productosController.getProductos);

productosRoutes.get('/:id', productosController.getProductoById);

productosRoutes.get('/categoria/:categoria', productosController.getProductoByCategoria);

productosRoutes.post('/', verificarToken, productosController.crearProducto);


export default productosRoutes;