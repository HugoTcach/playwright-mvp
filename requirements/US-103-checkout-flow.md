# US-103: Autenticación, Validación de Formularios y Flujo de Checkout en Swag Labs

**Como** cliente del sitio de e-commerce Swag Labs
**Quiero** autenticarme, validar el comportamiento ante errores de formulario, agregar productos y completar el proceso de compra
**Para** asegurar que el flujo de transaccionalidad de la tienda funcione de extremo a extremo.

## Criterios de Aceptación (AC)
1. **Autenticación Exitosa:** Ingresar con el usuario estándar (`standard_user`) y contraseña (`secret_sauce`) debe redirigir exitosamente a la página de inventario (`/inventory.html`).
2. **Validación de Login Fallido:** Intentar iniciar sesión con un usuario bloqueado (`locked_out_user`) debe mostrar un mensaje de error visible indicando que el usuario está bloqueado.
3. **Gestión de Carrito:** Desde el inventario, agregar un producto (ej. "Sauce Labs Backpack") debe incrementar el contador del carrito a "1".
4. **Validación de Formulario de Checkout:** Al avanzar al checkout, intentar continuar con los campos de nombre, apellido o código postal vacíos debe mostrar un mensaje de error de validación.
5. **Finalización de Compra:** Ingresar datos válidos en el formulario de checkout, avanzar y confirmar la orden debe mostrar la pantalla de éxito con el mensaje "Thank you for your order!".
