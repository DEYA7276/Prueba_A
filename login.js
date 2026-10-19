// login.js
function login(usuario, password) {
  // Criterio 3: No permitir campos vacíos
  if (!usuario || !password || usuario.trim() === '' || password.trim() === '') {
    return 'Todos los campos son obligatorios';
  }

  // Criterio 1: Permitir acceso con datos correctos
  if (usuario === 'admin' && password === '1234') {
    return 'Acceso concedido';
  }

  // Criterio 2: Rechazar datos equivocados
  return 'Credenciales incorrectas';
}

module.exports = { login };
