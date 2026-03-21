// seeds.js
import { pool } from "./db.js";

async function seedDB() {
  try {
    console.log("🌱 Insertando datos de ejemplo...");

    // Limpiar tablas (opcional)
    await pool.query("DELETE FROM productos");
    await pool.query("DELETE FROM pedidos");
    await pool.query("DELETE FROM pedido_items");
    
    
    // Insertar productos
    const productos = [
      ['Reloj antiguo', 'Reloj de pared vintage de los años 60', 120.00, 'Relojes', 'https://via.placeholder'],
      ['Cámara clásica', 'Cámara analógica de colección', 95.50, 'Cámaras', 'https://via.placeholder'],
      ['Libro antiguo', 'Libro histórico del siglo XIX', 45.00, 'Libros', 'https://via.placeholder'],
      ['Libro antiguo2', 'Libro histórico del siglo XX', 145.00, 'Libros', 'https://via.placeholder']
    ];

    for (const ev of productos) {
      await pool.query(
        "INSERT INTO productos (nombre, descripcion, precio_unidad, categoria, imagen_url) VALUES (?, ?, ?, ?, ?)",
        ev
      );
    }


    // Insertar pedidos de ejemplo
    await pool.query(`
      INSERT INTO pedidos (nombre_cliente, email, telefono, direccion_entrega, total, comentarios, estado)
      VALUES         
        ('Juan Pérez','juan@email.com','600123123','Sevilla', 120.00,'Entrega lo antes posible', 'Pendiente'),
        ('Marta López','marta@email.com','678656862','Huelva', 240.00,'Entrega lo antes posible2', 'Pendiente');
    `);


    // Insertar pedido_items de ejemplo
    await pool.query(`
      INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario)
      VALUES         
        (1,2,5, 120.00'),
        (1,1,2, 120.00),
        (2,2,3, 120.00);
    `);


    console.log("✅ Datos insertados correctamente.");
    process.exit();
  } catch (error) {
    console.error("❌ Error insertando datos:", error);
    process.exit(1);
  }
}

seedDB();
