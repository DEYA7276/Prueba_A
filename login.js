/**
 * login.js - SISTEMA BAJO PRUEBA
 * 
 * Esta es la lógica de negocio que valida las credenciales del usuario.
 */

function login(usuario, password) {
  // Criterio 3: Validar que no haya campos vacíos
  if (!usuario || !password || usuario.trim() === '' || password.trim() === '') {
    return 'Todos los campos son obligatorios';
  }

  // Criterio 1: Validar credenciales correctas
  if (usuario === 'admin' && password === '1234') {
    return 'Acceso concedido';
  }

  // Criterio 2: Bloquear credenciales incorrectas
  return 'Credenciales incorrectas';
}

// Exportamos la función para que el archivo de pruebas pueda usarla
module.exports = { login };
