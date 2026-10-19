/**
 * ==============================================================================
 * AUTOMATIZACIÓN DE PASOS DE ACEPTACIÓN (STEP DEFINITIONS)
 * ==============================================================================
 * 
 * Este archivo conecta el texto en español de 'login.feature' con el código JavaScript.
 * Cada paso de Gherkin (Dado, Cuando, Entonces) tiene su función equivalente aquí.
 */

const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
// Importamos la función real que vamos a probar
const { autenticarUsuario } = require('../../src/login');

// Variable para almacenar el resultado que devuelve la función
let resultado = null;

// ------------------------------------------------------------------------------
// 1. DADO (Contexto inicial)
// ------------------------------------------------------------------------------
Given('que el usuario tiene credenciales válidas', function () {
  // Prepara el escenario (aquí podríamos inicializar datos si fuera necesario)
});

Given('que el usuario intenta ingresar al sistema', function () {
  // Estado inicial antes del intento
});

Given('que el usuario no completa los campos', function () {
  // Estado inicial con campos pendientes
});

// ------------------------------------------------------------------------------
// 2. CUANDO (Acción del usuario)
// ------------------------------------------------------------------------------
// Cucumber extrae automáticamente los textos entre comillas como variables
When('ingresa el usuario {string} y la contraseña {string}', function (usuario, password) {
  // Ejecutamos la función de login con los datos del escenario
  resultado = autenticarUsuario(usuario, password);
});

// ------------------------------------------------------------------------------
// 3. ENTONCES (Validación del Criterio de Aceptación)
// ------------------------------------------------------------------------------
Then('el sistema debe permitir el acceso', function () {
  // Verificamos que el accesoConcedido sea estrictamente true
  assert.strictEqual(resultado.accesoConcedido, true, "Se esperaba que el acceso fuera permitido");
});

Then('el sistema debe denegar el acceso', function () {
  // Verificamos que el accesoConcedido sea estrictamente false
  assert.strictEqual(resultado.accesoConcedido, false, "Se esperaba que el acceso fuera denegado");
});

Then('debe mostrar el mensaje {string}', function (mensajeEsperado) {
  // Comprobamos que el mensaje del sistema sea exactamente el esperado por el cliente
  assert.strictEqual(resultado.mensaje, mensajeEsperado, `El mensaje recibido fue "${resultado.mensaje}" pero se esperaba "${mensajeEsperado}"`);
});
