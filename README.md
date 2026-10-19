#  Pruebas de Aceptación con Cucumber.js y Gherkin

Este proyecto es un ejemplo práctico, claro y conciso de **Pruebas de Aceptación automatizadas** utilizando **Cucumber.js** (BDD) y su ejecución en un entorno **DevOps gratuito** con **GitHub Actions**.

---

##  ¿Qué es Cucumber y por qué se usa en Pruebas de Aceptación?

En las pruebas de aceptación, el cliente o dueño del negocio no sabe programar.  
**Cucumber** soluciona esto permitiendo escribir las pruebas en **lenguaje humano (español)** con el estándar **Gherkin**:
- **Dado que (Given):** El contexto o situación inicial.
- **Cuando (When):** La acción que realiza el usuario.
- **Entonces (Then):** Lo que el sistema debe responder.

Cucumber se encarga de leer ese texto en español y ejecutar el código para comprobar si el sistema cumple los criterios.

---

##  Estructura Simple del Proyecto (Solo 3 archivos)

```text
Pruebas_Ac/
├── login.js                     <- 1. El sistema a probar (función de Login)
├── features/
│   ├── login.feature            <- 2. Criterios de aceptación en español (Gherkin)
│   └── login_steps.js           <- 3. Conexión entre el texto y el código
├── package.json                 <- Configuración de npm y scripts
└── .github/workflows/ci.yml     <- Pipeline DevOps en GitHub Actions
```

---

##  Cómo Recrearlo en Clase (Paso a Paso)

### 1. Inicializar e instalar Cucumber
En una carpeta vacía, abre la terminal y escribe:
```bash
npm init -y
npm install --save-dev @cucumber/cucumber
```
*(Esto crea automáticamente el `package.json` y la carpeta `node_modules`).*

### 2. Crear `login.js`
Copia el archivo con la lógica de usuario y contraseña.

### 3. Crear la carpeta `features` con:
- `login.feature`: Los escenarios de prueba en español.
- `login_steps.js`: Las funciones que conectan las frases con el login.

### 4. Configurar el script en `package.json`
Asegúrate de tener:
```json
"scripts": {
  "test": "cucumber-js --exit"
}
```

### 5. Correr la prueba
```bash
npm test
```

---

##  Entorno DevOps (GitHub Actions)
En cada `git push`, GitHub Actions ejecuta automáticamente `npm test` en una máquina Linux gratuita y valida los criterios de aceptación con un **check verde (✔ Passed)**.
