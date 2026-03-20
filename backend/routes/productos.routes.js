import { Router } from 'express'; 
import * as productosController from '../controllers/productos.controller.js'; 
import { verifyToken } from '../middlewares/auth.middleware.js'; 

const router = Router();

/**
 * 🌍 RUTAS PÚBLICAS (Clientes)
 * Prefijo: /api/productos
 */

// Obtener productos activos (para la tienda)
router.get('/', productosController.getProductos);

// Obtener por categoría
router.get('/categoria/:categoria', productosController.getProductoByCategoria);

// Obtener detalle de un producto
router.get('/:id', productosController.getProductoById);


/**
 * 🔐 RUTAS ADMINISTRATIVAS (Protegidas con Token)
 * Prefijo: /api/productos/admin
 */

// Ver todos los productos (incluye inactivos)
router.get('/admin/todos', verifyToken, productosController.getProductosAdmin);

// Crear nuevo producto
router.post('/admin', verifyToken, productosController.createProducto);

// Modificar producto existente
router.put('/admin/:id', verifyToken, productosController.updateProducto);

// Reactivar un producto borrado lógicamente
router.patch('/admin/restore/:id', verifyToken, productosController.restoreProducto);

// Borrado lógico (desactivar)
router.delete('/admin/:id', verifyToken, productosController.softDeleteProducto);

export default router;