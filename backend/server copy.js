// // server.js
// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';

// import pool from './config/db.js';
// import productosRoutes from './routes/productos.routes.js';
// import pedidosRoutes from './routes/pedidos.routes.js';
// import authRoutes from './routes/auth.routes.js';

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Ruta raíz de prueba
// app.get('/', (req, res) => {
//   res.send('API Node + MySQL - Bloque 3');
// });

// // Ruta para probar la conexión con la base de datos
// app.get('/api/probar-bbdd', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT NOW() AS fecha');
//     res.json({
//       ok: true,
//       mensaje: 'Conexión correcta con la base de datos',
//       fecha: rows[0].fecha
//     });
//   } catch (error) {
//     res.status(500).json({
//       ok: false,
//       mensaje: 'Error al conectar con la base de datos',
//       error: error.message
//     });
//   }
// });

// app.use('/api/login', authRoutes)

// // Rutas de productos
// app.use('/api/productos', productosRoutes);
// app.use('/api/productos/categoria', productosRoutes);
// // app.use('/api/productos/login', productosRoutes);
// app.use('/api/productos/admin', productosRoutes);

// // Rutas de pedidos
// app.use('/api/pedidos', pedidosRoutes);
// // app.use('/api/pedidos/login', productosRoutes);
// app.use('/api/pedidos/admin', productosRoutes);
// // Arrancar el servidor
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });

import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import pool from './config/db.js';
import productosRoutes from './routes/productos.routes.js';
import pedidosRoutes from './routes/pedidos.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- Rutas Base ---

// Login (Auth)
app.use('/api/auth', authRoutes); // Es mejor /api/auth que solo /api/login

// Productos
// IMPORTANTE: Solo necesitas una línea. 
// Todas las sub-rutas (admin, categorías, etc) se definen DENTRO de productos.routes.js
app.use('/api/productos', productosRoutes);

// Pedidos
// Aquí tenías el error: habías puesto productosRoutes en lugar de pedidosRoutes
app.use('/api/pedidos', pedidosRoutes);

// --- Rutas de utilidad/prueba ---
app.get('/', (req, res) => {
  res.send('API Bazar - Funcionando Correctamente');
});


app.get('/api/probar-bbdd', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS fecha');
    res.json({ ok: true, mensaje: 'Conexión correcta', fecha: rows[0].fecha });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});



// // Arrancar el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});