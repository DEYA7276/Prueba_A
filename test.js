/**
 * test.js - PRUEBAS DE ACEPTACIÓN
 * 
 * En este archivo validamos los 3 criterios de negocio acordados con el cliente.
 */

const { test, describe } = require('node:test');
const assert = require('node:assert');

// Importamos la función de login desde el archivo login.js
const { login } = require('./login');

describe('Criterios de Aceptación para Inicio de Sesión', () => {

  test('Criterio 1: Debe permitir el acceso cuando el usuario y clave son correctos', () => {
    // DADO: que el usuario es "admin" y la clave "1234"
    // CUANDO: intenta iniciar sesión
    const resultado = login('admin', '1234');
    // ENTONCES: debe responder "Acceso concedido"
    assert.strictEqual(resultado, 'Acceso concedido');
  });

  test('Criterio 2: Debe rechazar el acceso cuando la contraseña no coincide', () => {
    const resultado = login('admin', 'clave_falsa');
    assert.strictEqual(resultado, 'Credenciales incorrectas');
  });

  test('Criterio 3: Debe avisar que faltan datos cuando los campos están vacíos', () => {
    const resultado = login('', '');
    assert.strictEqual(resultado, 'Todos los campos son obligatorios');
  });

});
