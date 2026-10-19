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
