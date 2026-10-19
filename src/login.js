/**
 * ==============================================================================
 * SISTEMA A PROBAR: FUNCIÓN DE INICIO DE SESIÓN (LOGIN)
 * ==============================================================================
 * 
 * En una PRUEBA DE ACEPTACIÓN, validamos que este módulo cumpla con los
 * requerimientos acordados con el cliente/negocio:
 * 
 * Criterios de Aceptación:
 * 1. Si el usuario es "admin" y la clave es "1234", el acceso es PERMITIDO.
 * 2. Si la clave o el usuario son incorrectos, el acceso es DENEGADO.
 * 3. Si se dejan campos vacíos, el sistema debe avisar que son obligatorios.
 */

function autenticarUsuario(usuario, password) {
  // Regla 1: Validar que no se envíen campos vacíos
  if (!usuario || !password || usuario.trim() === '' || password.trim() === '') {
    return {
      accesoConcedido: false,
      mensaje: "Todos los campos son obligatorios"
    };
  }

  // Regla 2: Validar credenciales correctas (simulación de base de datos)
  if (usuario === "admin" && password === "1234") {
    return {
      accesoConcedido: true,
      mensaje: "Acceso concedido"
    };
  }

  // Regla 3: Si las credenciales no coinciden, rechazar acceso
  return {
    accesoConcedido: false,
    mensaje: "Credenciales incorrectas"
  };
}

// Exportamos la función para poder usarla en nuestras pruebas de aceptación
module.exports = { autenticarUsuario };
