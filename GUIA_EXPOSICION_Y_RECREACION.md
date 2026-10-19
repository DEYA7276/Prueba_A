# 📘 Guía Completa: Pruebas de Aceptación, Exposición y Recreación desde Cero

Este documento está diseñado para ayudarte a **comprender**, **exponer** con total seguridad y permitir que tus **compañeros recreen este proyecto desde cero** en sus computadoras.

---

## 📌 PARTE 1: Conceptos Fundamentales (Explicado desde 0)

### 1. ¿Qué es una Prueba de Aceptación?
Una **Prueba de Aceptación** es una prueba formal que se realiza para determinar si un sistema satisface los **criterios de aceptación** definidos por el cliente o los interesados del negocio (*Product Owner*, usuarios finales).

> **En palabras sencillas:**  
> *"No nos interesa cómo está programada la función por dentro; nos interesa que haga exactamente lo que el usuario final necesita que haga."*

### 2. Diferencia Clave frente a otros tipos de pruebas
| Tipo de Prueba | ¿Qué evalúa? | ¿Quién la escribe? | Ejemplo |
| :--- | :--- | :--- | :--- |
| **Prueba Unitaria** | Valida una función o método aislado a nivel de código. | Desarrollador | ¿La función `sumar(2, 3)` retorna `5`? |
| **Prueba de Integración** | Valida la comunicación entre dos o más módulos (ej. API con Base de Datos). | Desarrollador / QA | ¿El servicio de login logra consultar la tabla `usuarios` en MySQL? |
| **Prueba de Aceptación** | Valida el **flujo completo y las reglas de negocio** desde la perspectiva del usuario. | Negocio + QA + Dev (BDD) | ¿Si el usuario ingresa sus datos válidos, el sistema le permite entrar y le da la bienvenida? |

### 3. El Lenguaje Gherkin (BDD: Behavior-Driven Development)
Para que tanto un cliente (que no sabe programar) como un desarrollador entiendan la prueba, se utiliza el estándar **Gherkin**:
- **Dado que (Given):** Establece el punto de partida o contexto (*"Dado que el usuario tiene credenciales válidas"*).
- **Cuando (When):** La acción que el usuario ejecuta (*"Cuando ingresa usuario 'admin' y clave '1234'"*).
- **Entonces (Then):** La consecuencia esperada según el negocio (*"Entonces el sistema debe permitir el acceso"*).

---

## 🎤 PARTE 2: Guion de Exposición para la Clase

*(Usa este guion para tu presentación frente al profesor y tus compañeros. Puedes apoyarte mostrando tu pantalla).*

### ⏱️ Minuto 1: Introducción y Definición
> *"Buenos días, profesor y compañeros. Hoy les vamos a presentar las **Pruebas de Aceptación**.*  
> *A diferencia de las pruebas unitarias que revisan líneas de código individuales, las pruebas de aceptación validan que el software **cumpla con los requisitos del negocio y del usuario final**.*  
> *Para este ejemplo elegimos un caso que todos conocemos: un **Sistema de Inicio de Sesión (Login)**."*

### ⏱️ Minuto 2: Los Criterios de Aceptación del Negocio
> *"El cliente nos dio 3 criterios de aceptación:*  
> *1. Si el usuario y contraseña son correctos, el sistema debe dar acceso y mostrar 'Acceso concedido'.*  
> *2. Si la contraseña es incorrecta, debe bloquear el acceso y decir 'Credenciales incorrectas'.*  
> *3. Si se dejan campos en blanco, debe advertir que todos los campos son obligatorios.*  
>  
> *Para automatizar esto usamos **Cucumber** y lenguaje **Gherkin**, que nos permite escribir las pruebas en español legible por humanos."*

### ⏱️ Minuto 3: Mostrando el archivo `.feature` y el código
*(Muestra en pantalla el archivo `features/login.feature` y luego `features/step_definitions/login_steps.js`)*
> *"Miren el archivo `login.feature`: está en español neutro con la estructura `Dado`, `Cuando`, `Entonces`. Cualquier persona del negocio puede leerlo y aprobarlo.*  
> *Luego, en `login_steps.js`, conectamos cada frase con una pequeña función de JavaScript que ejecuta la acción y comprueba el resultado con aserciones."*

### ⏱️ Minuto 4: Demostración en vivo en la Terminal
*(Abre la terminal en la carpeta del proyecto y ejecuta `npm test`)*
> *"Ahora voy a correr la prueba en vivo ejecutando `npm test`:*  
> *(Esperas 2 segundos a que aparezca la salida en verde)*  
> *Como ven, se ejecutaron 3 escenarios con 12 pasos en milisegundos, y todos pasaron con éxito."*

### ⏱️ Minuto 5: Demostración en Entorno DevOps (GitHub Actions)
*(Abre el navegador en tu repositorio de GitHub y ve a la pestaña **Actions**)*
> *"En el entorno profesional moderno no basta con correr las pruebas en nuestra computadora. Usamos **DevOps e Integración Continua (CI/CD)**.*  
> *En nuestro repositorio de GitHub configuramos **GitHub Actions** (que es una plataforma libre y gratuita).*  
> *Cada vez que alguien hace un `git push`, un servidor en la nube de GitHub clona el proyecto, instala las dependencias y ejecuta las pruebas de aceptación de forma automática.*  
> *Si todas las pruebas de aceptación pasan, el commit se marca con un check verde. Si fallara un criterio de aceptación, el sistema alerta al equipo de inmediato."*

---

## 🛠️ PARTE 3: Procedimientos Claros para Recrearlo desde Cero (Paso a Paso)

Pasa esta sección a tus compañeros para que puedan construir el proyecto desde una carpeta vacía en menos de 5 minutos:

### Paso 1: Crear la carpeta de trabajo
Abre la terminal (PowerShell, CMD o Terminal de VS Code) y escribe:
```bash
mkdir mi-prueba-aceptacion
cd mi-prueba-aceptacion
```

### Paso 2: Inicializar el proyecto e instalar Cucumber
```bash
npm init -y
npm install --save-dev @cucumber/cucumber
```

### Paso 3: Crear la carpeta `src` y el archivo `src/login.js`
Crea una carpeta llamada `src` y adentro un archivo llamado `login.js`:
```javascript
// src/login.js
function autenticarUsuario(usuario, password) {
  // Validación 1: Campos vacíos
  if (!usuario || !password || usuario.trim() === '' || password.trim() === '') {
    return { accesoConcedido: false, mensaje: "Todos los campos son obligatorios" };
  }

  // Validación 2: Credenciales correctas
  if (usuario === "admin" && password === "1234") {
    return { accesoConcedido: true, mensaje: "Acceso concedido" };
  }

  // Validación 3: Credenciales equivocadas
  return { accesoConcedido: false, mensaje: "Credenciales incorrectas" };
}

module.exports = { autenticarUsuario };
```

### Paso 4: Crear la carpeta `features` y el archivo `features/login.feature`
Crea una carpeta llamada `features` y adentro el archivo `login.feature`:
```gherkin
# language: es
Característica: Inicio de Sesión de Usuario

  Escenario: Inicio de sesión exitoso
    Dado que el usuario tiene credenciales válidas
    Cuando ingresa el usuario "admin" y la contraseña "1234"
    Entonces el sistema debe permitir el acceso
    Y debe mostrar el mensaje "Acceso concedido"

  Escenario: Inicio de sesión con contraseña equivocada
    Dado que el usuario intenta ingresar al sistema
    Cuando ingresa el usuario "admin" y la contraseña "clave_mala"
    Entonces el sistema debe denegar el acceso
    Y debe mostrar el mensaje "Credenciales incorrectas"

  Escenario: Intento de inicio de sesión con campos vacíos
    Dado que el usuario no completa los campos
    Cuando ingresa el usuario "" y la contraseña ""
    Entonces el sistema debe denegar el acceso
    Y debe mostrar el mensaje "Todos los campos son obligatorios"
```

### Paso 5: Crear los pasos en `features/step_definitions/login_steps.js`
Crea la subcarpeta `features/step_definitions/` y adentro el archivo `login_steps.js`:
```javascript
// features/step_definitions/login_steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { autenticarUsuario } = require('../../src/login');

let resultado = null;

Given('que el usuario tiene credenciales válidas', function () {});
Given('que el usuario intenta ingresar al sistema', function () {});
Given('que el usuario no completa los campos', function () {});

When('ingresa el usuario {string} y la contraseña {string}', function (usuario, password) {
  resultado = autenticarUsuario(usuario, password);
});

Then('el sistema debe permitir el acceso', function () {
  assert.strictEqual(resultado.accesoConcedido, true);
});

Then('el sistema debe denegar el acceso', function () {
  assert.strictEqual(resultado.accesoConcedido, false);
});

Then('debe mostrar el mensaje {string}', function (mensajeEsperado) {
  assert.strictEqual(resultado.mensaje, mensajeEsperado);
});
```

### Paso 6: Configurar el script de ejecución en `package.json`
Abre `package.json` y asegúrate de que la sección `"scripts"` tenga lo siguiente:
```json
"scripts": {
  "test": "cucumber-js --format summary"
}
```

### Paso 7: Ejecutar las pruebas
En la terminal, corre:
```bash
npm test
```
¡Listo! Verás los 3 escenarios aprobados.

---

## ☁️ PARTE 4: Configuración DevOps en GitHub Actions (Plataforma Libre)

Para cumplir con el requerimiento de DevOps en una plataforma gratuita:

1. Crea las carpetas `.github/workflows/` en la raíz de tu proyecto.
2. Crea el archivo `.github/workflows/ci.yml`:
```yaml
name: Pipeline CI - Pruebas de Aceptacion

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  pruebas-aceptacion:
    runs-on: ubuntu-latest
    steps:
      - name: Descargar codigo
        uses: actions/checkout@v4

      - name: Instalar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Instalar dependencias
        run: npm install

      - name: Ejecutar pruebas de aceptacion
        run: npm test
```

### Comandos Git para subirlo a tu repositorio:
```bash
git init
git remote add origin https://github.com/DEYA7276/Prueba_A.git
git add .
git commit -m "feat: implementacion de pruebas de aceptacion con cucumber y devops"
git branch -M main
git push -u origin main
```

---

## 📊 PARTE 5: Demostración de Resultados

### 1. Salida en Consola Local
Al ejecutar `npm test`, la terminal entrega el siguiente resumen:
```text
> pruebas-aceptacion-login@1.0.0 test
> cucumber-js --format summary

3 scenarios (3 passed)
12 steps (12 passed)
0m 0.034s (0m 0.002s executing your code)
```

**Interpretación de los Resultados:**
- `3 scenarios (3 passed)`: Los 3 criterios de negocio (éxito, contraseña mala y campos vacíos) fueron validados y cumplidos al 100%.
- `12 steps (12 passed)`: Cada una de las 12 cláusulas (`Dado`, `Cuando`, `Entonces`, `Y`) ejecutó su aserción correspondiente sin ninguna discrepancia.
- `0m 0.034s`: La suite completa se ejecutó en una fracción de segundo, lo que demuestra la eficiencia del framework.

### 2. Resultado en la Plataforma DevOps (GitHub Actions)
- Al entrar a `https://github.com/DEYA7276/Prueba_A/actions`:
  - Se visualiza el flujo de trabajo: `Pipeline CI - Pruebas de Aceptacion`.
  - Aparece el icono verde con el check (**✔ Passed**).
  - Al dar clic en el trabajo `pruebas-aceptacion`, se puede inspeccionar en vivo el log con los mismos 3 escenarios ejecutados en un contenedor Linux en la nube.

---

## ❓ Preguntas Frecuentes del Profesor y Cómo Responderlas

1. **¿Por qué usaron Cucumber / Gherkin para las pruebas de aceptación?**  
   *Respuesta:* "Porque Gherkin permite escribir los criterios de aceptación en lenguaje natural (español) usando el formato Dado-Cuando-Entonces. Esto permite que el cliente, el Product Owner y el equipo de desarrollo compartan exactamente la misma visión de qué debe hacer el sistema."

2. **¿Cuál es la diferencia entre esta prueba de aceptación y una prueba unitaria hecha con Jest?**  
   *Respuesta:* "Una prueba unitaria evalúa si una función matemática o método no falla internamente. La prueba de aceptación evalúa la historia de usuario completa y si el resultado final cumple los términos que el usuario final espera para aceptar el software."

3. **¿Por qué GitHub Actions representa un entorno DevOps?**  
   *Respuesta:* "Porque implementa Integración Continua (CI). En lugar de depender de que el desarrollador pruebe en su máquina local ('en mi máquina sí funciona'), cada cambio de código enviado al repositorio pasa por un pipeline automatizado en un servidor neutral que garantiza la calidad del software antes de que pase a producción."
