# US-101: Búsqueda de Cardholder por ID

**Como** operador de soporte autenticado
**Quiero** buscar a un titular de tarjeta (cardholder) por su ID único
**Para** poder ver el estado actual de su cuenta rápidamente.

## Criterios de Aceptación (AC)
1. El usuario debe estar autenticado para acceder a la ruta `/cardholders`.
2. Al ingresar un ID válido (ej. "12345") y presionar "Search", el sistema debe mostrar una tabla.
3. La fila correspondiente a ese ID debe mostrar el nombre del titular y su estado (ej. "Active").
4. Si el ID no existe, debe mostrar el mensaje "No records found".