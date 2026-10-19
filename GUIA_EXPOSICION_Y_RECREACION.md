# 📘 Manual Práctico y Taller: Pruebas de Aceptación desde Cero

Este documento está diseñado para que **tú guíes a tus compañeros paso a paso** y cada uno de ellos pueda **recrear exactamente el mismo proyecto** en su propia computadora sin perderse ni tener errores.

---

## 🎯 ¿Qué vamos a construir juntos?

Vamos a construir un sistema muy sencillo de **Inicio de Sesión (Login)** y validar sus **Criterios de Aceptación** usando **Cucumber.js** y **GitHub Actions**.

### ¿Qué es una Prueba de Aceptación en palabras simples?
> Una prueba de aceptación **no revisa si tu código está bonito**.  
> Revisa **si el programa hace lo que el cliente pidió**.  
> Por eso se escribe en **lenguaje humano (español)** usando tres palabras mágicas:
> - **Dado que:** El punto de partida.
> - **Cuando:** Lo que hace el usuario.
> - **Entonces:** Lo que el sistema debe responder.

---

## 📋 REQUISITOS PREVIOS (Antes de empezar el taller)

Pide a tus compañeros que verifiquen que tienen instalado:
1. **Node.js** (Cualquier versión 18 o superior).  
   *Para comprobarlo, abren la terminal y escriben: `node -v`.*
2. **Visual Studio Code** (o su editor preferido).
3. **Git** (Para la parte de DevOps).

---

## 🛠️ PASO A PASO PARA CADA COMPAÑERO

Guía a tus compañeros siguiendo exactamente estos **8 pasos**:

---

### 🔹 PASO 1: Crear una carpeta limpia y abrir la terminal
Diles a tus compañeros:
1. Creen una nueva carpeta en su escritorio llamada `pruebas-aceptacion`.
2. Abran **Visual Studio Code**, vayan a `Archivo > Abrir carpeta` y elijan esa carpeta.
3. Abran la terminal integrada de VS Code (`Ctrl + ñ` o `Terminal > Nueva Terminal`).

---

### 🔹 PASO 2: Inicializar el proyecto e instalar Cucumber
En la terminal, escribir estos dos comandos (uno a la vez):

```bash
npm init -y
```
*(Esto crea el archivo `package.json` base).*

```bash
npm install --save-dev @cucumber/cucumber
```
*(Esto descarga e instala la herramienta **Cucumber**, que interpreta el lenguaje Gherkin).*

---

### 🔹 PASO 3: Crear el código del sistema (`src/login.js`)
1. En VS Code, creen una carpeta llamada `src`.
2. Dentro de `src`, creen el archivo `login.js`.
3. Peguen este código:

```javascript
/*
 En una PRUEBA DE ACEPTACIÓN, validamos que este módulo cumpla con los
 requerimientos acordados con el cliente/negocio:
 
 Criterios de Aceptación:
 1. Si el usuario es "admin" y la clave es "1234", el acceso es PERMITIDO.
 2. Si la clave o el usuario son incorrectos, el acceso es DENEGADO.
 3. Si se dejan campos vacíos, el sistema debe avisar que son obligatorios.
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

// Exportamos la función para que las pruebas puedan utilizarla
module.exports = { autenticarUsuario };
```

---

### 🔹 PASO 4: Escribir los Criterios de Aceptación en Español (`features/login.feature`)
1. Creen una carpeta en la raíz llamada `features`.
2. Adentro creen un archivo llamado `login.feature`.
3. Peguen este texto (es lenguaje **Gherkin** en español):

```gherkin
# language: es
Característica: Inicio de Sesión de Usuario
  Como usuario del sistema
  Quiero ingresar mis credenciales
  Para acceder a mi cuenta de manera segura

  # Criterio 1: Acceso exitoso con datos correctos
  Escenario: Inicio de sesión exitoso
    Dado que el usuario tiene credenciales válidas
    Cuando ingresa el usuario "admin" y la contraseña "1234"
    Entonces el sistema debe permitir el acceso
    Y debe mostrar el mensaje "Acceso concedido"

  # Criterio 2: Bloqueo por contraseña incorrecta
  Escenario: Inicio de sesión con contraseña equivocada
    Dado que el usuario intenta ingresar al sistema
    Cuando ingresa el usuario "admin" y la contraseña "clave_mala"
    Entonces el sistema debe denegar el acceso
    Y debe mostrar el mensaje "Credenciales incorrectas"

  # Criterio 3: Bloqueo si faltan datos
  Escenario: Intento de inicio de sesión con campos vacíos
    Dado que el usuario no completa los campos
    Cuando ingresa el usuario "" y la contraseña ""
    Entonces el sistema debe denegar el acceso
    Y debe mostrar el mensaje "Todos los campos son obligatorios"
```

> **Explicación para tus compañeros:**  
> *"Fíjense que este archivo no tiene código raro. Parece un documento en Word que cualquier cliente o gerente puede leer y entender."*

---

### 🔹 PASO 5: Conectar el texto con el código (`features/step_definitions/login_steps.js`)
1. Dentro de la carpeta `features`, creen una subcarpeta llamada `step_definitions`.
2. Adentro creen el archivo `login_steps.js`.
3. Peguen este código:

```javascript
/*
  AUTOMATIZACIÓN DE PASOS DE ACEPTACIÓN (STEP DEFINITIONS)
  Este archivo conecta el texto en español de 'login.feature' con el código JavaScript.
  Cada paso de Gherkin (Dado, Cuando, Entonces) tiene su función equivalente aquí.
*/

const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

// Importamos la función real que vamos a probar
const { autenticarUsuario } = require('../../src/login');

let resultado = null;

// 1. DADO (Contexto inicial)
Given('que el usuario tiene credenciales válidas', function () {});
Given('que el usuario intenta ingresar al sistema', function () {});
Given('que el usuario no completa los campos', function () {});

// 2. CUANDO (Acción del usuario)
When('ingresa el usuario {string} y la contraseña {string}', function (usuario, password) {
  // Ejecutamos la función con los datos del escenario
  resultado = autenticarUsuario(usuario, password);
});

// 3. ENTONCES (Comprobación con assert)
Then('el sistema debe permitir el acceso', function () {
  assert.strictEqual(resultado.accesoConcedido, true, "Se esperaba que el acceso fuera permitido");
});

Then('el sistema debe denegar el acceso', function () {
  assert.strictEqual(resultado.accesoConcedido, false, "Se esperaba que el acceso fuera denegado");
});

Then('debe mostrar el mensaje {string}', function (mensajeEsperado) {
  assert.strictEqual(resultado.mensaje, mensajeEsperado);
});
```

---

### 🔹 PASO 6: Configurar Cucumber y el comando de prueba
1. En la raíz del proyecto, creen un archivo llamado `cucumber.json`:
```json
{
  "default": {
    "paths": ["features/**/*.feature"],
    "require": ["features/step_definitions/**/*.js"],
    "format": ["summary"]
  }
}
```

2. Abran el archivo `package.json` y modifiquen la parte de `"scripts"` para que quede así:
```json
"scripts": {
  "test": "cucumber-js --exit"
}
```

---

### 🔹 PASO 7: ¡Ejecutar la prueba en vivo!
En la terminal, escriban:
```bash
npm test
```

**Lo que verán en pantalla:**
```text
3 scenarios (3 passed)
12 steps (12 passed)
0m 0.043s (0m 0.003s executing your code)
```

🎉 **¡Listo!** En este punto, todos tus compañeros ya tienen sus pruebas de aceptación corriendo localmente.

---

### 🔹 PASO 8: Ejecución en Entorno DevOps (GitHub Actions - Plataforma Libre)
Ahora le explicas a tus compañeros cómo llevar esto a la nube para que se ejecute solo en cada cambio:

1. En la raíz, creen la carpeta `.github` y adentro la carpeta `workflows`.
2. Adentro creen el archivo `.github/workflows/ci.yml`:

```yaml
name: Pipeline CI - Pruebas de Aceptacion

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  pruebas:
    name: Ejecutar Pruebas de Aceptacion en Servidor Linux
    runs-on: ubuntu-latest

    steps:
      - name: Descargar codigo
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Instalar dependencias
        run: npm install

      - name: Ejecutar pruebas
        run: npm test
```

3. Cada compañero sube su proyecto a su GitHub con:
```bash
git init
git add .
git commit -m "feat: pruebas de aceptacion con cucumber"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```
4. Van a la pestaña **Actions** en su GitHub y verán su pipeline corriendo automáticamente en una máquina Linux gratuita y terminando en **verde (✔ Passed)**.

---

## 🎤 GUION DE LO QUE DEBES DECIR MIENTRAS LO EXPLICAS

### 1. Presentación Inicial (1 min)
> *"Compañeros y profesor, hoy vamos a ver **Pruebas de Aceptación**. A diferencia de una prueba unitaria donde el programador prueba si una función suma bien, la prueba de aceptación evalúa **si el software hace exactamente lo que el usuario final necesita para dar por aceptado el proyecto**.*  
> *Para que todos lo entendamos y lo hagamos juntos, elegimos un módulo de Login."*

### 2. Mientras crean el archivo `features/login.feature` (1 min)
> *"Observen la pantalla. Estamos usando una herramienta llamada **Cucumber** con un estándar llamado **Gherkin**.*  
> *¿Por qué usamos 'Dado que', 'Cuando' y 'Entonces'? Porque de esa manera el cliente, el maestro o el dueño del negocio puede leer las pruebas sin saber programar y decir: 'Sí, exactamente eso es lo que quiero que haga mi sistema'."*

### 3. Mientras ejecutan `npm test` (1 min)
> *"Al escribir `npm test`, Cucumber lee el archivo en español, busca su función correspondiente en `login_steps.js`, ejecuta la lógica real en `src/login.js` y valida las respuestas.*  
> *Si las credenciales son correctas, aprueba. Si la contraseña es mala o hay campos vacíos, verifica que el sistema lo rechace con el mensaje adecuado."*

### 4. Al mostrar GitHub Actions (1 min)
> *"Por último, en un entorno DevOps profesional no dependemos de decir 'en mi máquina sí funciona'.*  
> *Con **GitHub Actions**, que es una plataforma libre y gratuita, cada vez que enviamos código, un servidor en la nube ejecuta estas pruebas de aceptación automáticamente. Si todo pasa, nos da el check verde que garantiza la calidad del software."*

---

## ⚠️ Solución a dudas comunes de tus compañeros

- **¿Qué pasa si les sale `cucumber-js no se reconoce como un comando interno`?**  
  *Solución:* Asegurarse de ejecutar `npm install` primero para que se descarguen las dependencias.
- **¿Qué pasa si modifican la clave en `login.js` a otra cosa?**  
  *Solución:* La prueba fallará en rojo de inmediato, demostrando que el criterio de aceptación detectó un cambio que rompe la expectativa del negocio.
