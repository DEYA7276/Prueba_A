#  Guía Completa de Pruebas de Aceptación con Cucumber.js

Esta guía te explica **qué es Cucumber**, **de dónde sale cada archivo** (para que sepas explicárselo al profesor y compañeros), y te da el **paso a paso exacto para pasarles los códigos por WhatsApp**.

---

##  1. ¿Qué es Cucumber y por qué se usa aquí?

> **En palabras sencillas:**  
> En una prueba unitaria, el programador escribe código técnico.  
> Pero en una **Prueba de Aceptación**, el que define qué debe hacer el software es el **cliente** (que no sabe programar).  
>  
> **Cucumber** es la herramienta que sirve de **traductor**:  
> Permite que el cliente escriba los criterios en **español normal** (`Dado que`, `Cuando`, `Entonces`) y Cucumber los lee y los ejecuta automáticamente contra el código real.

---

##  2. ¿De dónde sale cada archivo? (Para responder dudas en clase)

| Elemento | ¿De dónde sale? | ¿Para qué sirve? |
| :--- | :--- | :--- |
| **`package.json`** | Escribiendo en la terminal: `npm init -y` | Es la configuración del proyecto. Guarda el nombre y el comando para correr las pruebas (`npm test`). |
| **`node_modules/`** | Al escribir: `npm install --save-dev @cucumber/cucumber` | **¡Aquí es donde se descarga Cucumber de internet!** Node crea esta carpeta automáticamente para guardar los paquetes de Cucumber. |
| **`package-lock.json`** | Se crea automáticamente junto con `node_modules` | Registra las versiones exactas que se descargaron de internet. |
| **`login.js`** | Lo creas tú a mano en la raíz. | Es el **sistema bajo prueba** (la función con la lógica de usuario y contraseña). |
| **`features/login.feature`** | Lo creas tú a mano dentro de la carpeta `features`. | Es el archivo de **criterios de aceptación en español** (lenguaje Gherkin: Dado, Cuando, Entonces). |
| **`features/login_steps.js`** | Lo creas tú a mano dentro de la carpeta `features`. | Es el **puente**: toma las frases en español del `.feature` y llama a la función de `login.js`. |
| **`.github/workflows/ci.yml`** | Creas la carpeta y el archivo a mano. | Le indica a **GitHub Actions** (la nube gratuita) que ejecute `npm test` solo en cada `push`. |

---

##  3. Taller en Clase por WhatsApp (Paso a Paso)

Guía a tus compañeros con estos sencillos pasos:

### 🔹 Paso 1: Inicializar el proyecto e instalar Cucumber
Diles: *"Abran VS Code en una carpeta vacía, abran la terminal (`Ctrl + ñ`) y escriban estos dos comandos:"*

```bash
npm init -y
```
*(Explícales: Esto crea el `package.json`).*

```bash
npm install --save-dev @cucumber/cucumber
```
*(Explícales: Esto descarga la herramienta Cucumber de internet y crea la carpeta `node_modules`).*

---

### 🔹 Paso 2: Crear el archivo `login.js`
Diles: *"En la raíz de la carpeta, creen un archivo llamado `login.js` y péguenle este código:"*

*(Pásales este código por WhatsApp):*
```javascript
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
```

---

### 🔹 Paso 3: Crear la carpeta `features` y los 2 archivos
Diles: *"Creen una carpeta llamada `features`. Adentro van a crear dos archivos:"*

#### 1. Archivo `features/login.feature` (En español)
*(Pásales este texto por WhatsApp):*
```gherkin
# language: es
Característica: Inicio de Sesión de Usuario
  Como usuario del sistema
  Quiero ingresar mis credenciales
  Para acceder a mi cuenta

  Escenario: Inicio de sesión exitoso
    Dado que el usuario tiene credenciales válidas
    Cuando ingresa el usuario "admin" y la contraseña "1234"
    Entonces el sistema debe permitir el acceso
    Y debe mostrar el mensaje "Acceso concedido"

  Escenario: Contraseña incorrecta
    Dado que el usuario intenta ingresar al sistema
    Cuando ingresa el usuario "admin" y la contraseña "clave_falsa"
    Entonces el sistema debe denegar el acceso
    Y debe mostrar el mensaje "Credenciales incorrectas"

  Escenario: Campos vacíos
    Dado que el usuario no completa los campos
    Cuando ingresa el usuario "" y la contraseña ""
    Entonces el sistema debe denegar el acceso
    Y debe mostrar el mensaje "Todos los campos son obligatorios"
```

#### 2. Archivo `features/login_steps.js` (La automatización)
*(Pásales este código por WhatsApp):*
```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { login } = require('../login');

let respuesta = null;

// DADO (Contexto inicial)
Given('que el usuario tiene credenciales válidas', () => {});
Given('que el usuario intenta ingresar al sistema', () => {});
Given('que el usuario no completa los campos', () => {});

// CUANDO (Acción del usuario - Cucumber saca los textos entre comillas)
When('ingresa el usuario {string} y la contraseña {string}', (usuario, password) => {
  respuesta = login(usuario, password);
});

// ENTONCES (Comprobación con assert)
Then('el sistema debe permitir el acceso', () => {
  assert.strictEqual(respuesta, 'Acceso concedido');
});

Then('el sistema debe denegar el acceso', () => {
  assert.strictEqual(respuesta !== 'Acceso concedido', true);
});

Then('debe mostrar el mensaje {string}', (mensajeEsperado) => {
  assert.strictEqual(respuesta, mensajeEsperado);
});
```

---

### 🔹 Paso 4: Ajustar el comando en `package.json`
Diles: *"Abran `package.json` y asegúrense de que en `scripts` diga:"*
```json
"scripts": {
  "test": "cucumber-js --exit"
}
```

---

### 🔹 Paso 5: Correr la prueba
Diles: *"Escriban en su terminal:"*
```bash
npm test
```

**Resultado que verán en pantalla:**
```text
3 scenarios (3 passed)
12 steps (12 passed)
0m 0.039s
```

---

## ☁️ 4. Entorno DevOps (GitHub Actions)

Explícales al profesor y al grupo:
1. Creamos la carpeta `.github/workflows/` con el archivo `ci.yml`.
2. Ese archivo le dice a GitHub:
   ```yaml
   name: Pruebas de Aceptacion con Cucumber (DevOps)
   on: [push]
   jobs:
     ejecutar-pruebas:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm install
         - run: npm test
   ```
3. Cada vez que alguien sube un cambio a GitHub, una máquina Linux en la nube instala las dependencias y ejecuta `npm test`.
4. Muestra en tu proyector la pestaña **Actions** de tu repositorio:  
    [https://github.com/DEYA7276/Prueba_A/actions](https://github.com/DEYA7276/Prueba_A/actions) con el **check verde (✔ Passed)**.

---

## 🎤 5. Guion para tu Exposición (3 minutos)
1. *"Buenos días. Nuestro tema son las **Pruebas de Aceptación**."*
2. *"A diferencia de una prueba unitaria, la prueba de aceptación valida **los criterios del negocio desde la perspectiva del usuario final**."*
3. *"Para implementarlo utilizamos **Cucumber**, que es la herramienta estándar de la industria. Cucumber permite escribir las pruebas en lenguaje humano con **Gherkin** (Dado, Cuando, Entonces) en el archivo `.feature`."*
4. *(Muestras la ejecución en vivo)* *"Al correr `npm test`, Cucumber conecta las frases en español con nuestra lógica y comprueba que se cumplan los 3 escenarios."*
5. *(Muestras GitHub Actions)* *"Y con GitHub Actions demostramos la Integración Continua (CI): cada commit se valida automáticamente en la nube sin depender de la máquina del programador."*
