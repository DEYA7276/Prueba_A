# 📘 Guía Rápida: Explicación de Archivos y Taller por WhatsApp

Esta guía te explica **de dónde sale cada archivo** para que puedas responder cualquier pregunta y te da el **paso a paso exacto para enviar los códigos por WhatsApp** a tus compañeros.

---

## 🧐 1. ¿De dónde sale cada archivo? (Para que sepas explicárselos)

| Archivo / Carpeta | ¿De dónde sale? | ¿Para qué sirve? |
| :--- | :--- | :--- |
| **`package.json`** | Se crea automáticamente con el comando `npm init -y`. | Es el carnet de identidad del proyecto. Guarda el nombre, la versión y los comandos (como `npm test`). |
| **`node_modules/`** | Se crea cuando instalas librerías con `npm install`. | Es la carpeta donde se descargan los paquetes externos. *(En nuestro ejemplo usamos `node:test` que ya viene dentro de Node.js, por lo que tus compañeros ni siquiera necesitan descargar paquetes pesados).* |
| **`package-lock.json`** | Se genera solo al usar `npm install`. | Bloquea las versiones exactas de las librerías para que todos tengan las mismas. |
| **`login.js`** | Lo creas tú a mano. | Es el **programa a probar** (la función con la lógica del negocio). |
| **`test.js`** | Lo creas tú a mano. | Es la **prueba de aceptación** que valida que `login.js` cumpla los criterios del cliente. |
| **`.github/workflows/ci.yml`** | Creas la carpeta y el archivo a mano. | Le indica a **GitHub Actions** (la nube gratuita) que ejecute las pruebas automáticamente en cada `git push`. |

---

## 📲 2. Paso a Paso en Clase (Pasándoles el código por WhatsApp)

Diles a tus compañeros que sigan estos sencillos pasos:

### 🔹 Paso 1: Abrir terminal y crear el `package.json`
Diles: *"Abran VS Code en una carpeta vacía, abran la terminal (`Ctrl + ñ`) y escriban:"*
```bash
npm init -y
```
*(Explícales: Esto les creará automáticamente el archivo `package.json`).*

---

### 🔹 Paso 2: Crear `login.js` (Pásales este mensaje por WhatsApp)
Diles: *"Creen un archivo llamado `login.js` y peguen este código que les mandé:"*

```javascript
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
```

---

### 🔹 Paso 3: Crear `test.js` (Pásales este mensaje por WhatsApp)
Diles: *"Ahora creen otro archivo llamado `test.js` y peguen esto:"*

```javascript
const { test, describe } = require('node:test');
const assert = require('node:assert');
const { login } = require('./login');

describe('Criterios de Aceptación para Inicio de Sesión', () => {

  test('Criterio 1: Debe permitir el acceso cuando el usuario y clave son válidos', () => {
    assert.strictEqual(login('admin', '1234'), 'Acceso concedido');
  });

  test('Criterio 2: Debe rechazar el acceso cuando la contraseña no coincide', () => {
    assert.strictEqual(login('admin', 'clave_falsa'), 'Credenciales incorrectas');
  });

  test('Criterio 3: Debe avisar que faltan datos cuando los campos están vacíos', () => {
    assert.strictEqual(login('', ''), 'Todos los campos son obligatorios');
  });

});
```

---

### 🔹 Paso 4: Ejecutar la prueba
Diles: *"Ahora en la terminal escriban:"*
```bash
node --test test.js
```
*(O modifiquen en `package.json` la línea `"test": "node --test test.js"` y corran `npm test`).*

**Resultado que verán en pantalla:**
```text
✔ Criterio 1: Debe permitir el acceso cuando el usuario y clave son válidos
✔ Criterio 2: Debe rechazar el acceso cuando la contraseña no coincide
✔ Criterio 3: Debe avisar que faltan datos cuando los campos están vacíos
ℹ tests 3
ℹ pass 3
ℹ fail 0
```

---

## ☁️ 3. Entorno DevOps (GitHub Actions)

Explícales:
1. Creamos una carpeta `.github/workflows/` y adentro el archivo `ci.yml`.
2. Ese archivo le dice a GitHub: *"Cada vez que alguien suba código, préndete una máquina virtual Linux y corre `node --test test.js`"*.
3. Muestra en tu proyector o pantalla la pestaña **Actions** de tu repositorio:  
   👉 [https://github.com/DEYA7276/Prueba_A/actions](https://github.com/DEYA7276/Prueba_A/actions) con el **check verde (✔)**.

---

## 🎤 4. Guion para exponer (3 minutos)
1. *"Buenos días. Las **pruebas de aceptación** validan que el sistema cumpla los requisitos que el usuario final necesita para aceptar el software."*
2. *"Aquí tenemos 2 archivos sencillos: `login.js` con el sistema, y `test.js` con los 3 criterios de aceptación del cliente."*
3. *"Al ejecutarlo, Node valida en milisegundos que los 3 criterios se cumplan."*
4. *"Y en GitHub Actions (plataforma libre de DevOps), esto se corre solo en la nube para garantizar que el código entregado siempre funcione."*
