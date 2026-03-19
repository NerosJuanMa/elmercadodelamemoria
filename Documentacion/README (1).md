# 🧠 El Mercado de la Memoria

Proyecto desarrollado para el **Proyecto 34-2026 – Antea S.L.**

---

## 📌 Descripción

**El Mercado de la Memoria** es una aplicación web que permite visualizar productos y gestionar pedidos realizados por los usuarios.

El sistema está dividido en tres capas principales:

- 🗄 Base de datos (MySQL)
- ⚙️ Backend (Node.js + Express)
- 🎨 Frontend (HTML, CSS y JavaScript)

---

## 🚀 Funcionalidades

- Mostrar catálogo de productos
- Consultar producto por ID
- Crear, editar y eliminar productos
- Registrar pedidos de clientes
- Conexión completa entre frontend y backend mediante API REST

---

## 🛠 Tecnologías utilizadas

- MySQL
- Node.js
- Express
- HTML5
- CSS3
- JavaScript
- Thunder Client / Postman

---

## 📂 Estructura del proyecto

```
mercado-memoria/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   └── routes/
│       ├── productos.js
│       └── pedidos.js
│
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── productos.js
│       └── pedidos.js
│
├── database/
│   └── script.sql
│
└── README.md
```

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

```
git clone https://github.com/usuario/mercado-memoria.git
```

### 2. Instalar dependencias

```
npm install
```

### 3. Configurar la base de datos

- Crear la base de datos en MySQL
- Ejecutar el archivo `script.sql`

### 4. Ejecutar el servidor

```
node server.js
```

Servidor disponible en:
```
http://localhost:3000
```

### 5. Abrir el frontend

Abrir el archivo:
```
frontend/index.html
```

---

## 🔌 API REST

### 📦 Productos

- GET /api/productos  
- GET /api/productos/:id  
- POST /api/productos  
- PUT /api/productos/:id  
- DELETE /api/productos/:id  

### 🧾 Pedidos

- POST /api/pedidos  

---

## 📸 Evidencias del proyecto

- Listado de productos en la web
- Creación de producto (POST)
- Edición de producto (PUT)
- Eliminación de producto (DELETE)
- Registro de pedido
- Respuesta JSON del servidor

---

## 🔮 Mejoras futuras

- Sistema de autenticación de usuarios
- Carrito de compra
- Integración de pagos online
- Almacenamiento de imágenes en la nube
- Mejora del diseño visual

---

## 👨‍💻 Autor

Proyecto académico

---

## 📄 Licencia

Uso educativo
