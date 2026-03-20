-- Crear base de datos
CREATE DATABASE mercado_memoria;
USE mercado_memoria;
-- Tabla productos
CREATE TABLE productos (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255) NOT NULL,
descripcion TEXT,
precio DECIMAL(10,2),
categoria VARCHAR(100),
imagen_url VARCHAR(500)
);

-- ---- Opcion para que el cliente pueda realizar un pedido con un SOLO producto
-- Tabla pedidos
CREATE TABLE pedidos (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre_cliente VARCHAR(255),
email VARCHAR(255),
telefono VARCHAR(50),
producto_id INT,
cantidad INT,
comentarios TEXT,
FOREIGN KEY (producto_id) REFERENCES productos(id)
);
-- Insertar productos de prueba
INSERT INTO productos (nombre, descripcion, precio, categoria, imagen_url) VALUES
('Reloj antiguo', 'Reloj de pared vintage de los años 60', 120.00, 'Relojes antiguos', 'https://via.placeholder'),
('Cámara clásica', 'Cámara analógica de colección', 95.50, 'Cámaras antiguas', 'https://via.placeholder'),
('Libro antiguo', 'Libro histórico del siglo XIX', 45.00, 'Libros antiguos', 'https://via.placeholder');

-- Insertar pedido de prueba
INSERT INTO pedidos (nombre_cliente, email, telefono, producto_id, cantidad, comentarios)
VALUES ('Juan Pérez','juan@email.com','600123123',1,1,'Entrega lo antes posible');


-- ---- Opcion para que el cliente pueda realizar un pedido con varios productos
-- 1. Cabecera del pedido (Quién compra)
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cliente VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion_entrega TEXT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    comentarios TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Líneas del pedido (Qué compra)
CREATE TABLE IF NOT EXISTS pedido_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);