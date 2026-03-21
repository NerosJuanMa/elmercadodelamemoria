import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';

const router = Router();

/** 
 * 🔐 RUTAS DE AUTENTICACIÓN
 * El prefijo /api/auth ya viene definido desde server.js
 */

// Login usuario (Público)
// URL: POST /api/auth/login
router.post('/login', login);

// Si en el futuro añades registro, iría aquí:
// router.post('/register', register);

export default router; 