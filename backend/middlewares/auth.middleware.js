// middlewares/auth.middleware.js

// export const checkAdminKey = (req, res, next) => {
//   // Leemos la clave desde las cabeceras de la petición
//   const adminKey = req.headers[process.env.USUARIO];
  
//   // La clave secreta real debería estar en tu archivo .env
//   const SECRET_KEY = process.env.ADMIN_SECRET_KEY ;
//   // || 'mi_clave_secreta_provisional';

//   if (adminKey === SECRET_KEY) {
//     // Si la clave coincide, dejamos pasar al siguiente paso (el controlador)
//     next();
//   } else {
//     // Si no coinciden, bloqueamos con un error 401 (No autorizado)
//     res.status(401).json({
//       success: false,
//       message: 'Acceso denegado: Clave de administrador inválida o inexistente.'
//     });
//   }
// };

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // El token suele enviarse en el header 'Authorization' como 'Bearer TOKEN'
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ success: false, message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta_ultra_segura');
    req.user = decoded; // Guardamos los datos del admin en la petición
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
  }
};