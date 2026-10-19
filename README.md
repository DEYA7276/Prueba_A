# 🧪 Pruebas de Aceptación - Ejemplo Sencillo de Inicio de Sesión (Login)

Este proyecto es un ejemplo práctico, conciso y fácil de entender sobre cómo implementar **Pruebas de Aceptación automatizadas** utilizando **BDD (Behavior-Driven Development)** con **Cucumber.js** y su ejecución en un entorno **DevOps gratuito** mediante **GitHub Actions**.

---

## 🎯 ¿Qué es una Prueba de Aceptación?

Una **Prueba de Aceptación** no busca verificar algoritmos internos ni la sintaxis del código (eso lo hacen las pruebas unitarias). Su objetivo es **validar que el software cumpla con los criterios y expectativas del usuario final y del negocio**.

Se escriben en un formato entendible por cualquier persona (lenguaje **Gherkin**):
- **Dado que (Given):** El contexto o situación inicial.
- **Cuando (When):** La acción que realiza el usuario.
- **Entonces (Then):** El resultado esperado por el negocio.

---

## 📂 Estructura del Proyecto

El proyecto contiene únicamente los archivos esenciales para que sea fácil de entender y recrear:

```text
Pruebas_Ac/
├── .github/
│   └── workflows/
│       └── ci.yml                     <- Flujo de DevOps en GitHub Actions
├── features/
│   ├── login.feature                  <- Criterios de aceptación en lenguaje natural (Gherkin)
│   └── step_definitions/
│       └── login_steps.js             <- Código que conecta el texto con la prueba real
├── src/
│   └── login.js                       <- Lógica del sistema bajo prueba
├── cucumber.json                      <- Configuración básica de Cucumber
├── package.json                       <- Configuración del proyecto y scripts
├── GUIA_EXPOSICION_Y_RECREACION.md    <- Guion completo para exponer y recrear desde cero
└── README.md                          <- Este archivo
```

---

## 🚀 Cómo Ejecutar el Proyecto (En 2 Pasos)

### Requisitos Previos:
- Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

### Paso 1: Instalar dependencias
Abre la terminal en la carpeta del proyecto y ejecuta:
```bash
npm install
```

### Paso 2: Ejecutar las pruebas de aceptación
```bash
npm test
```

Verás una salida como esta en tu consola:
```text
3 scenarios (3 passed)
12 steps (12 passed)
0m 0.034s
```

---

## 🔄 Ejecución en Entorno DevOps (GitHub Actions)

Cada vez que se sube un cambio a GitHub (`git push`), el pipeline definido en `.github/workflows/ci.yml` se dispara automáticamente en una máquina virtual Linux en la nube:
1. Descarga el repositorio.
2. Configura Node.js.
3. Instala dependencias (`npm install`).
4. Ejecuta las pruebas de aceptación (`npm test`).
5. Marca el commit con un **check verde (✔)** si todas las pruebas de aceptación fueron aprobadas.

---

## 📖 Documentación Completa y Guion de Exposición

Para aprender cómo recrear este proyecto desde una carpeta vacía y ver el guion exacto para explicarlo en clase frente a tus compañeros y profesor, consulta el archivo:
👉 **[GUIA_EXPOSICION_Y_RECREACION.md](./GUIA_EXPOSICION_Y_RECREACION.md)**
