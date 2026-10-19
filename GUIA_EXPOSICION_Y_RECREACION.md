# 📘 Guía de Pruebas de Aceptación: Exposición y Taller en 1 Minuto

Esta guía está diseñada para que **no pierdas tiempo** y tus compañeros puedan recrear y entender la prueba de aceptación **en menos de 2 minutos y con 1 solo archivo**.

---

## 🎯 1. ¿Qué es una Prueba de Aceptación? (Para explicar al grupo)

> **Definición rápida:**  
> *"Una prueba de aceptación no verifica si una línea de código está bien escrita (eso es una prueba unitaria). La prueba de aceptación verifica **si el sistema hace lo que el cliente o usuario final necesita para aceptar el software**."*

### Ejemplo del Mundo Real:
El cliente solicita un Login y define 3 reglas claras:
1. Si pongo `admin` y `1234`, quiero que me deje entrar (`Acceso concedido`).
2. Si me equivoco en la clave, quiero que me bloquee (`Credenciales incorrectas`).
3. Si lo dejo vacío, quiero que me avise (`Todos los campos son obligatorios`).

Nuestra prueba de aceptación automatizada comprueba que esas 3 reglas se cumplan sí o sí.

---

## 🚀 2. Taller Práctico: Instrucciones para tus Compañeros (Solo 3 Pasos)

Diles a tus compañeros que sigan estos 3 pasos en su computadora:

### Paso 1: Abrir VS Code en una carpeta vacía
1. Creen una carpeta en su escritorio llamada `pruebas`.
2. Abran esa carpeta en Visual Studio Code.
3. Abran la terminal (`Ctrl + ñ`).

---

### Paso 2: Crear un único archivo llamado `test.js`
Creen el archivo `test.js` y peguen este código completo:

```javascript
// test.js
const { test, describe } = require('node:test');
const assert = require('node:assert');

// ========================================================
// 1. SISTEMA A PROBAR (La función de Login)
// ========================================================
function login(usuario, password) {
  // Criterio 3: No permitir campos vacíos
  if (!usuario || !password || usuario.trim() === '' || password.trim() === '') {
    return 'Todos los campos son obligatorios';
  }

  // Criterio 1: Permitir acceso con credenciales válidas
  if (usuario === 'admin' && password === '1234') {
    return 'Acceso concedido';
  }

  // Criterio 2: Bloquear si los datos no coinciden
  return 'Credenciales incorrectas';
}

// ========================================================
// 2. PRUEBAS DE ACEPTACIÓN (Validación de los criterios)
// ========================================================
describe('Criterios de Aceptación del Sistema de Login', () => {

  test('Criterio 1: Debe permitir el acceso cuando el usuario y clave son válidos', () => {
    // DADO: Usuario "admin" y clave "1234"
    // CUANDO: Intenta entrar al sistema
    const respuesta = login('admin', '1234');
    // ENTONCES: Debe responder "Acceso concedido"
    assert.strictEqual(respuesta, 'Acceso concedido');
  });

  test('Criterio 2: Debe rechazar el acceso cuando la contraseña no coincide', () => {
    const respuesta = login('admin', 'clave_falsa');
    assert.strictEqual(respuesta, 'Credenciales incorrectas');
  });

  test('Criterio 3: Debe avisar que faltan datos cuando los campos están vacíos', () => {
    const respuesta = login('', '');
    assert.strictEqual(respuesta, 'Todos los campos son obligatorios');
  });

});
```

---

### Paso 3: Ejecutar la prueba
En la terminal de VS Code, solo tienen que escribir:

```bash
node --test test.js
```

*(No tienen que instalar nada ni crear carpetas, `node:test` ya viene incluido en Node.js).*

**Lo que verán en su pantalla:**
```text
▶ Criterios de Aceptación del Sistema de Login
  ✔ Criterio 1: Debe permitir el acceso cuando el usuario y clave son válidos (1.5ms)
  ✔ Criterio 2: Debe rechazar el acceso cuando la contraseña no coincide (0.3ms)
  ✔ Criterio 3: Debe avisar que faltan datos cuando los campos están vacíos (0.2ms)
✔ Criterios de Aceptación del Sistema de Login (4.4ms)
ℹ tests 3
ℹ pass 3
ℹ fail 0
```

---

## ☁️ 3. Ejecución en Entorno DevOps (GitHub Actions - Plataforma Libre)

Para cumplir con el requerimiento de DevOps en una plataforma gratuita:

En el proyecto ya está creado el archivo `.github/workflows/ci.yml`:

```yaml
name: Pruebas de Aceptacion CI

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  ejecutar-pruebas:
    name: Pruebas de Aceptacion en Linux
    runs-on: ubuntu-latest

    steps:
      - name: Descargar codigo
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Correr pruebas de aceptacion
        run: node --test test.js
```

### ¿Cómo demostrarlo en clase?
1. Abre tu repositorio en el navegador: [https://github.com/DEYA7276/Prueba_A/actions](https://github.com/DEYA7276/Prueba_A/actions)
2. Muestra a tus compañeros y profesor la ejecución del pipeline con el **check verde (✔ Passed)**.
3. Explica: *"Cada vez que hacemos un cambio y lo subimos a GitHub, un servidor Linux en la nube ejecuta automáticamente `node --test test.js` y valida que no hayamos roto ningún criterio de aceptación del negocio"*.

---

## 🎤 4. Guion para tu Exposición (Qué decir palabra por palabra)

- **Minuto 1:** *"Buenos días. Nuestro tema son las **Pruebas de Aceptación**. Su propósito es validar que el software cumpla con lo que el cliente pidió para aceptar la entrega."*
- **Minuto 2:** *"Para demostrarlo, creamos un ejemplo súper directo en `test.js`. Definimos un sistema de Login y 3 criterios de aceptación: acceso exitoso, contraseña mala y campos vacíos."*
- **Minuto 3:** *(Corres `node --test test.js` en vivo)* *"Al correrlo, vemos cómo se validan los 3 criterios en 4 milisegundos."*
- **Minuto 4:** *(Abres la pestaña Actions de tu GitHub)* *"Y para el entorno DevOps, usamos GitHub Actions (que es gratuito). El servidor en la nube corre las pruebas solo en cada push y nos da este check verde."*
