//routes/auth.routes.js
// import { Router } from 'express';
// import * as authController from '../controllers/auth.controllers.js';
 
// const loginrouter = Router();
 
/**
 * ==========================================
 * 🔐 RUTAS DE AUTENTICACIÓN
 * ==========================================
 */
 
// // Registrar usuario
// loginrouter.post('/register', authController.register);
 
// // Login usuario
// loginrouter.post('/login', authController.login);
 
// export default loginrouter;
 
import { login } from '../controllers/auth.controller.js';
import { Router } from 'express';
// import * as authController from '../controllers/auth.controller.js';
// import { verifyToken } from '../middlewares/auth.middleware.js';
const authRoutes = Router();
// RUTA DE LOGIN (Pública)

authRoutes.post('/login', login);

export default authRoutes;
