// routes/productos.routes.js
import { Router } from 'express';

const productosRoutes = Router();

// GET /api/productos
productosRoutes.get('/', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'Aquí devolveremos la lista de productos desde la base de datos'
  });
});

export default productosRoutes;