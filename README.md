# 🧪 Pruebas de Aceptación (Ejemplo Súper Sencillo en 1 Solo Archivo)

Este proyecto es el ejemplo más conciso, limpio y fácil de entender sobre **Pruebas de Aceptación**.  
No requiere crear múltiples carpetas ni instalar librerías pesadas: **todo está en un solo archivo (`test.js`)** usando las herramientas nativas de Node.js.

---

## 🎯 ¿Qué es una Prueba de Aceptación?
Una prueba de aceptación valida **si el sistema cumple con las necesidades del cliente y las reglas del negocio**, sin importar cómo esté programado internamente.

En este ejemplo validamos 3 criterios de aceptación para un **Login**:
1. **Éxito:** Si el usuario es `"admin"` y la contraseña es `"1234"`, responde `"Acceso concedido"`.
2. **Contraseña incorrecta:** Si la clave no coincide, responde `"Credenciales incorrectas"`.
3. **Campos vacíos:** Si falta algún dato, responde `"Todos los campos son obligatorios"`.

---

## 🚀 Cómo Recrearlo en 1 Minuto (Para tus compañeros)

### 1. Crear una carpeta y abrirla en VS Code
```bash
mkdir pruebas-aceptacion
cd pruebas-aceptacion
```

### 2. Crear un único archivo llamado `test.js`
Copia y pega este contenido en `test.js`:

```javascript
const { test, describe } = require('node:test');
const assert = require('node:assert');

// 1. SISTEMA BAJO PRUEBA (Función de Login)
function login(usuario, password) {
  if (!usuario || !password || usuario.trim() === '' || password.trim() === '') {
    return 'Todos los campos son obligatorios';
  }
  if (usuario === 'admin' && password === '1234') {
    return 'Acceso concedido';
  }
  return 'Credenciales incorrectas';
}

// 2. PRUEBAS DE ACEPTACIÓN (Validación de criterios de negocio)
describe('Criterios de Aceptación para Inicio de Sesión', () => {

  test('Criterio 1: Debe permitir el acceso cuando el usuario y clave son válidos', () => {
    const resultado = login('admin', '1234');
    assert.strictEqual(resultado, 'Acceso concedido');
  });

  test('Criterio 2: Debe rechazar el acceso cuando la contraseña no coincide', () => {
    const resultado = login('admin', 'clave_erronea');
    assert.strictEqual(resultado, 'Credenciales incorrectas');
  });

  test('Criterio 3: Debe avisar que faltan datos cuando los campos están vacíos', () => {
    const resultado = login('', '');
    assert.strictEqual(resultado, 'Todos los campos son obligatorios');
  });

});
```

### 3. Ejecutar la prueba
En la terminal de VS Code, escribe:
```bash
node --test test.js
```

¡Y listo! Verás los 3 criterios de aceptación aprobados con sus checks verdes (`✔`).

---

## ☁️ Entorno DevOps (GitHub Actions)
El archivo `.github/workflows/ci.yml` ejecuta automáticamente estas pruebas de aceptación en una máquina Linux en la nube en cada `push`.
