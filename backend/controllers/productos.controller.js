// controllers/productos.controller.js
import * as productosModel from '../models/productos.model.js';

/*
 * ==========================================
 * 📦 CONTROLADOR DE PRODUCTOS
 * ==========================================
 * 
 * Funciones para gestión de productos del bazar
 * - Obtener todos los productos
 * - Obtener producto por ID
 * Crear Producto SOLO ADMIN
 */
export async function getProductos(req, res) {
  try {
    console.log('📦 Obteniendo productos...');
    
    const productos = await productosModel.obtenerTodos();
    
    res.status(200).json({
      success: true,
      message: `Se encontraron ${productos.length} productos`,
      data: productos
    });
    
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}


export async function getProductoById(req, res) {
  try {
    const { id } = req.params;
    console.log(`🔍 Buscando producto ID: ${id}`);
    
    const producto = await productosModel.obtenerPorId(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Producto encontrado',
      data: producto
    });
    
  } catch (error) {
    console.error('❌ Error al obtener producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}


export async function getProductoByCategoria(req, res) {
  try {
    const { categoria } = req.params;
    console.log(`🔍 Buscando producto Categoria: ${categoria}`);
    
    const producto = await productosModel.obtenerPorCategoria(categoria);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado con esa categoria'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Producto encontrado con esa categoria',
      data: producto
    });
    
  } catch (error) {
    console.error('❌ Error al obtener producto con esa categoria:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}

export async function createProducto(req, res) {
  try {
    // Extraemos los datos que vienen en el cuerpo del JSON (body)
    const { nombre, descripcion, precio_unidad, categoria, imagen_url, stock, activo } = req.body;

    // Validación básica: el nombre y el precio son obligatorios
    if (!nombre || !precio_unidad || !categoria) {
      return res.status(400).json({
        success: false,
        message: 'El nombre, el precio y la categoria son obligatorios.'
      });
    }

    // Llamamos a la función del modelo enviando los datos
    const nuevoProducto = await productosModel.crearproducto({
      nombre,
      descripcion,
      precio_unidad,
      categoria,
      imagen_url,
      stock,
      activo
    });

    // Respuesta de éxito
    res.status(201).json({
      success: true,
      message: 'Producto creado correctamente',
      data: nuevoProducto
    });

  } catch (error) {
    console.error('❌ Error en el controlador al crear producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}

export async function updateProducto(req, res) {
  try {
    const { id } = req.params; // El ID viene de la URL: /api/productos/4
    const datosNuevos = req.body;

    const productoActualizado = await productosModel.actualizarProducto(id, datosNuevos);

    if (!productoActualizado) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Producto actualizado con éxito',
      data: productoActualizado
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// export async function deleteProducto(req, res) {
//   try {
//     const { id } = req.params;
//     const eliminado = await productosModel.eliminarProducto(id);

//     if (!eliminado) {
//       return res.status(404).json({
//         success: false,
//         message: 'No se pudo eliminar: Producto no encontrado'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: `Producto con ID ${id} eliminado correctamente`
//     });

//   } catch (error) {
//     console.error('❌ Error al eliminar producto:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error interno del servidor',
//       error: error.message
//     });
//   }
// }

export async function softDeleteProducto(req, res) {
  try {
    const { id } = req.params;
    const desactivado = await productosModel.borrarLogicoProducto(id);

    if (!desactivado) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: `Producto con ID ${id} ha sido marcado como inactivo (borrado lógico)`
    });

  } catch (error) {
    console.error('❌ Error en borrado lógico:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}

// Obtener todos para el panel de admin
export async function getProductosAdmin(req, res) {
  try {
    const productos = await productosModel.obtenerTodosAdmin();
    res.status(200).json({ success: true, data: productos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Restaurar un producto borrado
export async function restoreProducto(req, res) {
  try {
    const { id } = req.params;
    const reactivado = await productosModel.reactivarProducto(id);

    if (!reactivado) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    res.status(200).json({ success: true, message: 'Producto reactivado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}