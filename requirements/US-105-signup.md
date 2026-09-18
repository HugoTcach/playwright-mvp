# US-105: Flujo de Registro de Usuario (Sign Up) en DemoBlaze

**Como** usuario nuevo de DemoBlaze
**Quiero** registrarme utilizando el modal de Sign up
**Para** poder tener una cuenta en la plataforma

## Criterios de Aceptación (AC)

**AC1: Registro exitoso**
- **Dado** que el usuario abre el modal de "Sign up"
- **Cuando** ingresa un nombre de usuario nuevo y una contraseña
- **Y** hace clic en el botón "Sign up" del modal
- **Entonces** el sistema debe emitir una alerta nativa indicando "Sign up successful."

**AC2: Usuario existente**
- **Dado** que el usuario abre el modal de "Sign up"
- **Cuando** ingresa un nombre de usuario que ya existe y una contraseña
- **Y** hace clic en el botón "Sign up" del modal
- **Entonces** el sistema debe emitir una alerta nativa indicando "This user already exist."