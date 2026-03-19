import pool from './config/db.js';

async function crearBBDD() {
  let connection;
  
  try {
    // Obtener una conexión sin especificar base de datos para poder crearla
    connection = await pool.getConnection();
    
    // Crear/recrear base de datos
    await connection.query('DROP DATABASE IF EXISTS cursos');
    await connection.query('CREATE DATABASE cursos');
    await connection.query('USE cursos');
    
    console.log('✅ Base de datos creada');

    // TABLA likes (sin FK, va primero)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS likes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_id VARCHAR(255) NOT NULL,
        user_ip VARCHAR(45) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_like (page_id, user_ip)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Tabla likes creada');

    // TABLA especialidad
    await connection.query(`
      CREATE TABLE IF NOT EXISTS especialidad (
        id_especialidad INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50) DEFAULT NULL,
        familia VARCHAR(50) DEFAULT NULL,
        aplicaciones TEXT DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Tabla especialidad creada');

    // TABLA empresas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS empresas (
        id_empresa INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50) DEFAULT NULL,
        ubicacion VARCHAR(50) DEFAULT NULL,
        telefono VARCHAR(20) DEFAULT NULL,
        web VARCHAR(50) DEFAULT NULL,
        email VARCHAR(50) DEFAULT NULL,
        persona_contacto VARCHAR(50) DEFAULT NULL,
        mobil_contacto VARCHAR(20) DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Tabla empresas creada');

    // TABLA practicas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS practicas (
        id_practica INT AUTO_INCREMENT PRIMARY KEY,
        id_empresa INT NOT NULL,
        duracion VARCHAR(10) DEFAULT NULL,
        feed_back TEXT DEFAULT NULL,
        aptitudes_adquiridas TEXT DEFAULT NULL,
        observaciones TEXT DEFAULT NULL,
        CONSTRAINT fk_practicas_empresa
          FOREIGN KEY (id_empresa)
          REFERENCES empresas (id_empresa)
          ON DELETE RESTRICT
          ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Tabla practicas creada');

    // TABLA cursos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cursos (
        id_curso INT AUTO_INCREMENT PRIMARY KEY,
        id_especialidad INT DEFAULT NULL,
        nombre_curso VARCHAR(150) DEFAULT NULL,
        fecha_realizacion VARCHAR(50) DEFAULT NULL,
        FechaCalculadaAño YEAR DEFAULT NULL,
        practicas TINYINT(1) DEFAULT NULL,
        id_practicas INT DEFAULT NULL,
        duracion_curso VARCHAR(50) DEFAULT NULL,
        conocimientos_adquiridos VARCHAR(500) DEFAULT NULL,
        Centro_Estudio VARCHAR(50) DEFAULT NULL,
        CONSTRAINT fk_cursos_especialidad
          FOREIGN KEY (id_especialidad)
          REFERENCES especialidad (id_especialidad)
          ON DELETE CASCADE
          ON UPDATE CASCADE,
        CONSTRAINT fk_cursos_practicas
          FOREIGN KEY (id_practicas)
          REFERENCES practicas (id_practica)
          ON DELETE SET NULL
          ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Tabla cursos creada');

    // TABLA apuntes
    await connection.query(`
      CREATE TABLE IF NOT EXISTS apuntes (
        id_apunte INT AUTO_INCREMENT PRIMARY KEY,
        id_curso INT DEFAULT NULL,
        modulo VARCHAR(10) DEFAULT NULL,
        unidad_formativa VARCHAR(10) DEFAULT NULL,
        tema VARCHAR(50) DEFAULT NULL,
        pdf LONGBLOB DEFAULT NULL,
        resumen TEXT DEFAULT NULL,
        CONSTRAINT fk_apuntes_curso
          FOREIGN KEY (id_curso)
          REFERENCES cursos (id_curso)
          ON DELETE CASCADE
          ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Tabla apuntes creada');

    // TABLA usuarios
    await connection.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        password VARCHAR(255) NOT NULL,
        fecha_nacimiento DATE,
        rol VARCHAR(50) NOT NULL DEFAULT 'user',
        activo TINYINT(1) DEFAULT 1
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Tabla usuarios creada');

  } catch (error) {
    console.error('❌ Error creando la base de datos:', error.message);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}


async function insertarDatosIniciales() {
  try {
    
    // ESPECIALIDAD
    await pool.query(`
      INSERT INTO especialidad (nombre, familia, aplicaciones) VALUES
      ('5G', 'Informatica', NULL),
      ('Ofimatica', 'Administracion', 'Escribir cartas, etc.'),
      ('Tecnico Hardware', 'Informatica', NULL),
      ('Diseño Gráfico', 'Diseño', NULL),
      ('Empresa', 'Administracion', 'Creacion de empresa, tramites, decrechos y obligaciones')
    `);
    console.log('✅ Especialidades insertadas');

    // EMPRESAS
    await pool.query(`
      INSERT INTO empresas (nombre, ubicacion, telefono, web, email, persona_contacto, mobil_contacto) VALUES
      ('Laybet', 'Sevilla', NULL, NULL, NULL, 'Laybet Colmenares', NULL)
    `);
    console.log('✅ Empresas insertadas');

    // CURSOS
    await pool.query(`
      INSERT INTO cursos (
        id_especialidad,
        nombre_curso,
        fecha_realizacion,
        FechaCalculadaAño,
        practicas,
        id_practicas,
        duracion_curso,
        conocimientos_adquiridos,
        Centro_Estudio
      ) VALUES
      (2, 'Técnico en Ofimática', 'JUL. 1999', 1999, 0, NULL, '184 horas', NULL, 'Instituto Informático Hispalense'),
      (3, 'TÉCNICO EN EQUIPOS INFORMÁTICOS', 'JUN. 2001', 2001, 0, NULL, '171 horas', NULL, 'Instituto Informático Hispalense'),
      (4, 'TECNICO AUXILIAR DE DISEÑO GRAFICO', 'OCT.03- MAY.04', 2004, 0, NULL, '630 horas.', 'Diseño gráfico, composición, reproducción gráfica, ilustración', 'B.C. PROYECTOS Y SISTEMAS DE CONTROL, S.C.'),
      (4, 'DISEÑO DE PAGINAS WEB', 'ENE.- ABR. 2005', 2005, 0, NULL, '300 horas', 'Diseño multimedia', 'ACADEMIA E.A.I.G'),
      (5, 'TRÁMITES DE CONSTITUCIÓN DEL EMPRESARIO INDIVIDUAL', 'JUN. 2005', 2005, 0, NULL, '8 horas', 'Pequeña empresa e iniciativa emprendedora', 'FUNDACIÓN FORJA XXI'),
      (5, 'DERECHOS Y OBLIGACIONES, CONTROL DE INGRESOS Y GASTOS DEL EMPRESARIO INDIVIDUAL', 'JUN. 2005', 2005, 0, NULL, '6 horas', 'Pequeña empresa e iniciativa emprendedora', 'FUNDACIÓN FORJA XXI'),
      (1, 'F.P.E. PROGRAMACION PARA SOLUCIONES DE IOT Y SMART CITY APLICABLES A ENTORNOS 5G, (IFCD97)', 'MAY. 2023 — JUN. 2023', 2023, 0, NULL, '150 horas.', 'Formación en tecnología 5G', 'VODAFONE ESPAÑA & INTEGRA CONOCIMIENT')
    `);
    console.log('✅ Cursos insertados');

    // USUARIOS (password aumentado a 255 caracteres)
    await pool.query(`
      INSERT INTO usuarios (nombre, email, password, fecha_nacimiento, rol, activo) VALUES
      ('admin', 'jmmudarra@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.JfVK7fCQpNpCPq9QdoW6lQk1K6kMSO', '1979-04-09', 'admin', 1),
      ('invitado', 'invitado@example.es', '$2a$10$N9qo8uLOickgx2ZMRZoMye.JfVK7fCQpNpCPq9QdoW6lQk1K6kMSO', '0000-00-00', 'user', 0)
    `);
    console.log('✅ Usuarios insertados');

    // LIKES
    await pool.query(`
      INSERT INTO likes (page_id, user_ip, created_at) VALUES
      ('mi_pagina_unica', '::1', '2026-01-07 11:21:47')
    `);
    console.log('✅ Likes insertados');

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
