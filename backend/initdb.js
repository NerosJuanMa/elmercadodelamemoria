import pool from './config/db.js';

async function crearBBDD() {
  let connection;

  try {
    // Obtener una conexión sin especificar base de datos para poder crearla
    connection = await pool.getConnection();

    // Crear/recrear base de datos
    await connection.query('DROP DATABASE IF EXISTS mercado_memoria');
    await connection.query('CREATE DATABASE mercado_memoria');
    await connection.query('USE mercado_memoria');

    console.log('✅ Base de datos creada');


    // TABLA productos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT,
        precio_unidad DECIMAL(10,2),
        categoria VARCHAR(100),
        imagen_url VARCHAR(500),
        stock INT DEFAULT 0, 
        activo BOOL DEFAULT 1, 
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log('✅ Tabla productos creada');

    // TABLA pedidos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        nombre_cliente VARCHAR(255),
        email VARCHAR(255),
        telefono VARCHAR(50),
        direccion_entrega TEXT,
        producto_id INT,
        cantidad INT DEFAULT 1,
        total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
        comentarios TEXT,
        FOREIGN KEY(producto_id) REFERENCES productos(id)
      )
    `);
    console.log('✅ Tabla pedidos creada');
    

  } catch (error) {
    console.error('❌ Error creando la base de datos:', error.message);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}


async function insertarDatosIniciales() {
  try {

    // productos
    await pool.query(`
      INSERT INTO productos (nombre, descripcion, precio_unidad, categoria, imagen_url) VALUES
      ('Reloj antiguo', 'Reloj de pared vintage de los años 60', 120.00, 'Relojes antiguos', 'https://via.placeholder'),
      ('Cámara clásica', 'Cámara analógica de colección', 95.50, 'Cámaras antiguas', 'https://via.placeholder'),
      ('Libro antiguo', 'Libro histórico del siglo XIX', 45.00, 'Libros antiguos', 'https://via.placeholder')
    `);
    console.log('✅ Especialidades insertadas');

    // pedidos
    await pool.query(`
      INSERT INTO pedidos (nombre_cliente, email, telefono, direccion_entrega, producto_id, cantidad, total, comentarios)
      VALUES ('Juan Pérez','juan@email.com','600123123','Sevilla',1,1,120.00,'Entrega lo antes posible') 
    `);
    console.log('✅ pedidos insertados');


    console.log('\n🎉 ¡Base de datos inicializada correctamente!');

  } catch (error) {
    console.error('❌ Error insertando datos:', error.message);
    throw error;
  }
}

// Ejecutar script

(async () => {
  try {
    await crearBBDD();
    await insertarDatosIniciales();
  } catch (error) {
    console.error('💥 Error fatal:', error);
  } finally {
    await pool.end();
    process.exit(0);
  }
})();
