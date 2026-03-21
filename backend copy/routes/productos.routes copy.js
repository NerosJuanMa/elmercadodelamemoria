// routes/productos.routes.js

import { Router } from 'express';
import * as productosController from '../controllers/productos.controller.js';
// import { checkAdminKey } from '../middlewares/auth.middleware.js';

// import { login } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
// ... importar controladores

const productosRoutes = Router();

/**
 * ============================================================
 * 📦 RUTAS DE PRODUCTOS
 * ------------------------------------------------------------
 * A continuación definimos las rutas principales:
 *   GET /api/productos          → Obtener todos los productos
 *   GET /api/productos/:id      → Obtener un producto concreto
 * ============================================================


// rutas públicas sin admin
productosRoutes.get('/', productosController.getProductos);

productosRoutes.get('/:id', productosController.getProductoById);

productosRoutes.get('/categoria/:categoria', productosController.getProductoByCategoria);

productosRoutes.post('/', productosController.createProducto);

productosRoutes.put('/:id', productosController.updateProducto);

// productosRoutes.delete('/:id', productosController.deleteProducto);

productosRoutes.delete('/:id', productosController.softDeleteProducto);



// RUTAS PÚBLICAS (Solo ven lo activo)
productosRoutes.get('/', productosController.getProductos);
productosRoutes.get('/:id', productosController.getProductoById);

// RUTAS DE ADMINISTRACIÓN (Control total)
productosRoutes.get('/admin/todos', productosController.getProductosAdmin); // Ver activos e inactivos
productosRoutes.post('/admin', productosController.createProducto);          // Crear
productosRoutes.put('/admin/:id', productosController.updateProducto);       // Modificar
productosRoutes.patch('/admin/restore/:id', productosController.restoreProducto); // Reactivar
productosRoutes.delete('/admin/:id', productosController.softDeleteProducto);     // Borrado lógico

*/

// RUTA DE LOGIN (Pública)
// productosRoutes.post('/login', login);

// --- RUTAS PÚBLICAS (Cualquiera las ve) ---
productosRoutes.get('/', productosController.getProductos);
productosRoutes.get('/:id', productosController.getProductoById);

// --- RUTAS PROTEGIDAS (Solo con clave secreta) ---
// Añadimos 'checkAdminKey' antes del controlador
// productosRoutes.get('/admin/todos', checkAdminKey, productosController.getProductosAdmin);
// productosRoutes.post('/admin', checkAdminKey, productosController.createProducto);
// productosRoutes.put('/admin/:id', checkAdminKey, productosController.updateProducto);
// productosRoutes.patch('/admin/restore/:id', checkAdminKey, productosController.restoreProducto);
// productosRoutes.delete('/admin/:id', checkAdminKey, productosController.softDeleteProducto);


// Añadimos 'verifyToken' antes del controlador
productosRoutes.get('/admin/todos', verifyToken, productosController.getProductosAdmin);
productosRoutes.post('/admin', verifyToken, productosController.createProducto);
productosRoutes.put('/admin/:id', verifyToken, productosController.updateProducto);
productosRoutes.patch('/admin/restore/:id', verifyToken, productosController.restoreProducto);
productosRoutes.delete('/admin/:id', verifyToken, productosController.softDeleteProducto);

export default productosRoutes;