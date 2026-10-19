/**
 * PRUEBA DE ACEPTACIÓN - SISTEMA DE LOGIN
 * 
 * En pruebas de aceptación validamos que el sistema cumpla con los
 * requerimientos acordados con el usuario o cliente.
 */

const { test, describe } = require('node:test');
const assert = require('node:assert');

// 1. SISTEMA BAJO PRUEBA (La función que simula el Login)
function login(usuario, password) {
  // Criterio 3: No permitir campos vacíos
  if (!usuario || !password || usuario.trim() === '' || password.trim() === '') {
    return 'Todos los campos son obligatorios';
  }

  // Criterio 1: Permitir acceso solo con datos correctos
  if (usuario === 'admin' && password === '1234') {
    return 'Acceso concedido';
  }

  // Criterio 2: Rechazar datos incorrectos
  return 'Credenciales incorrectas';
}

// 2. PRUEBAS DE ACEPTACIÓN (Validación de los criterios del cliente)
describe('Criterios de Aceptación para Inicio de Sesión', () => {

  test('Criterio 1: Debe permitir el acceso cuando el usuario y clave son válidos', () => {
    // DADO: que el usuario es "admin" y la clave "1234"
    // CUANDO: intenta iniciar sesión
    const resultado = login('admin', '1234');
    // ENTONCES: el sistema debe responder "Acceso concedido"
    assert.strictEqual(resultado, 'Acceso concedido');
  });

  test('Criterio 2: Debe rechazar el acceso cuando la contraseña no coincide', () => {
    const resultado = login('admin', 'clave_erronea');
    assert.strictEqual(resultado, 'Credenciales incorrectas');
  });

  test('Criterio 3: Debe avisar que faltan datos cuando los campos están vacíos', () => {
    const resultado = login('', '');
    assert.strictEqual(resultado, 'Todos los campos son obligatorios');
  });

});
