import jwt from 'jsonwebtoken';

export async function login(req, res) {
  const { username, password } = req.body;

  // Credenciales Hardcoded (Lo ideal es tenerlas en el .env)
  const ADMIN_USER = process.env.ADMIN_USER || 'admin';
  const ADMIN_PASS = process.env.ADMIN_PASS || '123456';
  const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_ultra_segura';

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // Si es correcto, generamos el Token
    const token = jwt.sign(
      { role: 'admin', user: username }, 
      JWT_SECRET, 
      { expiresIn: '2h' } // El token expira en 2 horas
    );

    return res.json({
      success: true,
      message: 'Login exitoso',
      token
    });
  }

  res.status(401).json({
    success: false,
    message: 'Usuario o contraseña incorrectos'
  });
}