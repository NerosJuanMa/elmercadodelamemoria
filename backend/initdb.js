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
        stock INT DEFAULT 1, 
        activo BOOL DEFAULT 1, 
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log('✅ Tabla productos creada');

    // TABLA pedidos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre_cliente VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          telefono VARCHAR(20),
          direccion_entrega TEXT NOT NULL,
          total DECIMAL(10,2) NOT NULL,
          comentarios TEXT,
          estado ENUM('Pendiente', 'Pagado', 'Enviado', 'Entregado') DEFAULT 'Pendiente',
          creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla pedidos creada');
    
    // TABLA pedido_items
    await connection.query(`
      CREATE TABLE IF NOT EXISTS pedido_items (
          id INT AUTO_INCREMENT PRIMARY KEY,
          pedido_id INT,
          producto_id INT,
          cantidad INT NOT NULL,
          precio_unitario DECIMAL(10,2) NOT NULL,
          FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
          FOREIGN KEY (producto_id) REFERENCES productos(id)
      )
    `);
    console.log('✅ Tabla pedido_items creada');
    


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
  INSERT INTO productos (nombre, descripcion, precio_unidad, categoria, imagen_url, stock) VALUES
('Reloj de Bolsillo Antiguo', 'Plata s.XIX, maquinaria a la vista.', 120.50, 'Relojes', 'https://loremflickr.com/1280/720', 25),
('Cámara Vintage Kodak', 'Años 70, incluye funda de cuero original.', 85.00, 'Cámaras', 'https://placebear.com/1280/720', 3),
('Libro de Cuero', 'Manuscrito medieval (réplica), papel pergamino.', 45.00, 'Libros', 'https://placebeard.it/1280x720', 5),
('Mapa Estelar Antiguo', 'Grabado del s.XVII, marco de madera.', 95.00, 'Objetos de colección', 'https://via.assets.so/game.jpg?w=1280&h=720', 10),
('Tintero de Bronce', 'Estilo victoriano con pluma de ave.', 30.00, 'Decoración', 'https://baconmockup.com/1280/720', 3),
('Brújula de Latón', 'Navegación clásica, funcional.', 55.00, 'Objetos de colección', 'https://baconmockup.com/1280/720', 5),
('Silla Luis XV', 'Madera tallada a mano, tapizado seda.', 250.00, 'Muebles', 'https://loremflickr.com/1280/720', 4),
('Reloj de Pared Cucú', 'Madera de la Selva Negra, tallado a mano.', 185.00, 'Relojes', 'https://placebeard.it/1280x720', 15),
('Cámara Leica M3', 'Clásica de 35mm, excelente estado óptico.', 450.00, 'Cámaras', 'https://via.assets.so/game.jpg?w=1280&h=720', 5),
('Primera Edición Quijote', 'Edición facsímil con grabados antiguos.', 95.00, 'Libros', 'https://via.assets.so/game.jpg?w=1280&h=720', 2),
('Moneda de Oro Escudo', 'Reproducción histórica de alta calidad.', 40.00, 'Objetos de colección', 'https://placebear.com/1280/720', 50),
('Candelabro de Plata', 'Tres brazos, diseño barroco.', 75.00, 'Decoración', 'https://placebeard.it/1280x720', 6),
('Escritorio Secreter', 'Madera de caoba con compartimentos ocultos.', 320.00, 'Muebles', 'https://picsum.photos/1280/720', 2);`);
    console.log('✅ Especialidades insertadas');

    // pedidos
    await pool.query(`
      INSERT INTO pedidos (nombre_cliente, email, telefono, direccion_entrega, total, comentarios, estado)
      VALUES ('Juan Pérez','juan@email.com','600123123','Sevilla', 120.00,'Entrega lo antes posible', 'Pendiente') 
    `);
    console.log('✅ pedidos insertados');
    // pedidos_items
    await pool.query(`
      INSERT INTO pedido_items ( pedido_id, producto_id, cantidad, precio_unitario)
      VALUES (1,2,5, 120.00) 
    `);
    console.log('✅ pedidos_items insertados');


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
