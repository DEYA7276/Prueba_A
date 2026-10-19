const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { login } = require('../login');

let respuesta = null;

// DADO (Contexto inicial)
Given('que el usuario tiene credenciales válidas', () => {});
Given('que el usuario intenta ingresar al sistema', () => {});
Given('que el usuario no completa los campos', () => {});

// CUANDO (Acción del usuario)
When('ingresa el usuario {string} y la contraseña {string}', (usuario, password) => {
  respuesta = login(usuario, password);
});

// ENTONCES (Comprobación de resultados)
Then('el sistema debe permitir el acceso', () => {
  assert.strictEqual(respuesta, 'Acceso concedido');
});

Then('el sistema debe denegar el acceso', () => {
  assert.strictEqual(respuesta !== 'Acceso concedido', true);
});

Then('debe mostrar el mensaje {string}', (mensajeEsperado) => {
  assert.strictEqual(respuesta, mensajeEsperado);
});
